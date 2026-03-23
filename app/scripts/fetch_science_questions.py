#!/usr/bin/env python3

import html
import json
import sys
import time
from pathlib import Path
from urllib.parse import quote, unquote
from urllib.error import HTTPError
from urllib.request import urlopen


BASE_URL = "https://opentdb.com"
CATEGORY_ID = 17
MAX_PER_CALL = 50
TARGET_COUNT = 180
MAX_RETRIES = 5


def fetch_json(url: str) -> dict:
    for attempt in range(MAX_RETRIES):
        try:
            with urlopen(url, timeout=30) as response:
                return json.load(response)
        except HTTPError as error:
            if error.code != 429 or attempt == MAX_RETRIES - 1:
                raise
            time.sleep(2 * (attempt + 1))
    raise RuntimeError(f"could not fetch {url}")


def decode_text(value: str) -> str:
    return html.unescape(unquote(value)).strip()


def main() -> int:
    default_output_path = Path(__file__).resolve().parents[1] / "science-questions.js"
    output_path = Path(sys.argv[1]) if len(sys.argv) > 1 else default_output_path

    token_data = fetch_json(f"{BASE_URL}/api_token.php?command=request")
    token = token_data.get("token")
    if not token:
        print("could not get session token", file=sys.stderr)
        return 1

    count_data = fetch_json(f"{BASE_URL}/api_count.php?category={CATEGORY_ID}")
    print(json.dumps(count_data, indent=2))
    easy_count = count_data.get("category_question_count", {}).get("total_easy_question_count", 0)
    target_count = min(TARGET_COUNT, easy_count or TARGET_COUNT)

    collected = []
    seen_questions = set()

    time.sleep(1)

    while len(collected) < target_count:
        amount = min(MAX_PER_CALL, target_count - len(collected))
        url = (
            f"{BASE_URL}/api.php?amount={amount}&category={CATEGORY_ID}&difficulty=easy"
            f"&type=multiple&encode=url3986&token={quote(token)}"
        )
        payload = fetch_json(url)
        response_code = payload.get("response_code")

        if response_code == 4:
            break
        if response_code != 0:
            print(f"unexpected response code: {response_code}", file=sys.stderr)
            return 1

        results = payload.get("results", [])
        if not results:
            break

        for raw_item in results:
            question_text = decode_text(raw_item["question"])
            if question_text in seen_questions:
                continue

            incorrect_answers = [decode_text(answer) for answer in raw_item["incorrect_answers"]]
            if len(incorrect_answers) != 3:
                continue

            seen_questions.add(question_text)
            collected.append(
                {
                    "question": question_text,
                    "correctAnswer": decode_text(raw_item["correct_answer"]),
                    "incorrectAnswers": incorrect_answers,
                    "category": decode_text(raw_item["category"]),
                    "difficulty": decode_text(raw_item["difficulty"]),
                }
            )

    if not collected:
        print("no science questions collected", file=sys.stderr)
        return 1

    with output_path.open("w", encoding="utf-8") as output_file:
        output_file.write("// Generated from Open Trivia DB Science & Nature easy multiple-choice questions.\n")
        output_file.write(
            f"const SCIENCE_QUESTIONS = {json.dumps(collected, ensure_ascii=False, indent=2)};\n"
        )

    print(f"wrote {len(collected)} questions to {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
