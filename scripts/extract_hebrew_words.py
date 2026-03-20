#!/usr/bin/env python3

import json
import re
import sys
from html import unescape
from html.parser import HTMLParser


HEADER_SEQUENCE = ["Category", "English", "Transliteration", "Hebrew"]
CATEGORY_NAMES = {
    "Adjectives, Adverbs",
    "Conjunctions, prepositions",
    "Nouns",
    "Phrases",
    "Question Words",
}


def cleanup(text: str) -> str:
    text = unescape(text)
    text = text.replace("\xa0", " ")
    text = re.sub(r"\s+", " ", text).strip()
    return text


class TableCellParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.cells: list[str] = []
        self._in_table = False
        self._in_cell = False
        self._parts: list[str] = []

    def _flush_cell(self) -> None:
        if self._in_cell:
            text = cleanup("".join(self._parts))
            self.cells.append(text)
            self._parts = []
            self._in_cell = False

    def handle_starttag(self, tag: str, attrs) -> None:
        if tag == "table" and not self._in_table:
            self._in_table = True
            return
        if not self._in_table:
            return
        if tag in {"td", "th"}:
            self._flush_cell()
            self._in_cell = True
            self._parts = []
            return
        if tag == "tr":
            self._flush_cell()

    def handle_endtag(self, tag: str) -> None:
        if not self._in_table:
            return
        if tag in {"td", "th", "tr"}:
            self._flush_cell()
            return
        if tag == "table":
            self._flush_cell()
            self._in_table = False

    def handle_data(self, data: str) -> None:
        if self._in_table and self._in_cell:
            self._parts.append(data)


def main() -> int:
    if len(sys.argv) != 3:
        print("usage: extract_hebrew_words.py INPUT_HTML OUTPUT_JS", file=sys.stderr)
        return 1

    input_path, output_path = sys.argv[1], sys.argv[2]
    html = open(input_path, encoding="utf-8").read()
    parser = TableCellParser()
    parser.feed(html)
    cleaned = [cell for cell in parser.cells if cell]

    start_index = None
    for index in range(len(cleaned) - len(HEADER_SEQUENCE) + 1):
        if cleaned[index : index + len(HEADER_SEQUENCE)] == HEADER_SEQUENCE:
            start_index = index + len(HEADER_SEQUENCE)
            break
    if start_index is None:
        print("could not find table header row", file=sys.stderr)
        print("first cells:", cleaned[:20], file=sys.stderr)
        return 1

    entries = []
    category = None
    i = start_index
    while i < len(cleaned):
        token = cleaned[i]
        if not token:
            i += 1
            continue
        if token in CATEGORY_NAMES:
            category = token
            i += 1
            continue
        if i + 2 >= len(cleaned):
            break

        english = token
        transliteration = cleaned[i + 1]
        hebrew = cleaned[i + 2]
        entries.append(
            {
                "category": category,
                "english": english,
                "transliteration": transliteration,
                "hebrew": hebrew,
            }
        )
        i += 3

    if not entries:
        print("no entries extracted", file=sys.stderr)
        return 1

    with open(output_path, "w", encoding="utf-8") as output_file:
        output_file.write("// Generated from eHebrew common-words source.\n")
        output_file.write(f"const HEBREW_WORDS = {json.dumps(entries, ensure_ascii=False, indent=2)};\n")

    print(f"wrote {len(entries)} entries to {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
