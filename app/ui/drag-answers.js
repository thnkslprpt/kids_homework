function shouldUseCompactQuestionMain(question) {
  if (question?.forceCompactMain) {
    return true;
  }

  const displayText = String(question?.displayText || "").trim();
  if (question?.isHebrew || containsHebrewText(displayText)) {
    return false;
  }

  const text = displayText;
  if (!text) {
    return false;
  }

  const wordCount = text.split(/\s+/).filter(Boolean).length;
  const looksLikeEquation = /^[\d\s+\-×÷=.__/()%:,]+$/.test(text);
  const hasSentencePunctuation = /[.!?]/.test(text) || text.includes(":") || text.includes("\n");

  if (looksLikeEquation) {
    return false;
  }

  return wordCount >= 6 || (hasSentencePunctuation && wordCount >= 4) || text.length >= 40;
}

function buildDragTemplateText(templateParts) {
  return templateParts
    .map((part, index) => (index < templateParts.length - 1 ? `${part}_____` : part))
    .join("");
}

function buildFilledDragText(templateParts, tokens) {
  return templateParts
    .map((part, index) => `${part}${index < tokens.length ? tokens[index] : ""}`)
    .join("");
}

function getDragSlotCount(question) {
  if (question.dragLayout === "buckets") {
    return (question.dragBucketColumns || []).reduce(
      (total, bucket) => total + ((bucket?.answers && bucket.answers.length) || 0),
      0
    );
  }

  if (question.dragLayout === "targets") {
    return Array.isArray(question.dragTargets) ? question.dragTargets.length : 0;
  }

  if (Array.isArray(question.dragAnswerTokens) && question.dragAnswerTokens.length) {
    return question.dragAnswerTokens.length;
  }

  return Math.max(0, (question.dragTemplateParts?.length || 0) - 1);
}

function getDragTargetReviewLabel(target, index) {
  if (typeof target?.reviewLabel === "string" && target.reviewLabel.trim()) {
    return target.reviewLabel.trim();
  }

  if (typeof target?.text === "string" && target.text.trim()) {
    return target.text.trim();
  }

  if (typeof target?.position === "string" && target.position.trim()) {
    return capitalize(target.position);
  }

  return `Target ${index + 1}`;
}

function buildDragTargetsSelectionText(question, tokens) {
  return (question.dragTargets || [])
    .map((target, index) => `${getDragTargetReviewLabel(target, index)}: ${tokens[index]}`)
    .join(" | ");
}

function buildDragBucketSelectionText(question, tokens) {
  let offset = 0;

  return (question.dragBucketColumns || [])
    .map((bucket) => {
      const count = bucket?.answers?.length || 0;
      const bucketTokens = tokens.slice(offset, offset + count);
      offset += count;
      return `${bucket.label}: ${bucketTokens.join(", ")}`;
    })
    .join(" | ");
}

function buildDragSelectionText(question, tokens) {
  if (question.dragLayout === "matching") {
    return buildHebrewMatchingAnswerText(question.matchLeftItems || [], tokens);
  }

  if (question.dragLayout === "buckets") {
    return buildDragBucketSelectionText(question, tokens);
  }

  if (question.dragLayout === "targets") {
    return buildDragTargetsSelectionText(question, tokens);
  }

  if (Array.isArray(question.dragTemplateParts) && question.dragTemplateParts.length) {
    return buildFilledDragText(question.dragTemplateParts, tokens);
  }

  return tokens.join(" | ");
}

function buildDragNumericCandidates(value) {
  const normalizedValue = normalizeFlexibleNumericInput(value);
  if (!normalizedValue) {
    return [];
  }

  const variants = new Set([normalizedValue, normalizedValue.replace(/([+-])\s+/g, "$1")]);
  const candidates = new Set();

  variants.forEach((variant) => {
    const directValue = Number(variant);
    if (Number.isFinite(directValue)) {
      candidates.add(directValue);
    }

    buildNormalizedFlexibleNumberStrings(variant).forEach((candidateText) => {
      const parsedValue = Number(candidateText);
      if (Number.isFinite(parsedValue)) {
        candidates.add(parsedValue);
      }
    });
  });

  return Array.from(candidates);
}

function dragTokensMatch(question, selectedToken, answerToken) {
  const normalizedSelected = normalizeFlexibleNumericInput(selectedToken);
  const normalizedAnswer = normalizeFlexibleNumericInput(answerToken);

  if (normalizedSelected === normalizedAnswer) {
    return true;
  }

  if (question?.dragTargetArrangement !== "line") {
    return false;
  }

  const selectedCandidates = buildDragNumericCandidates(normalizedSelected);
  const answerCandidates = buildDragNumericCandidates(normalizedAnswer);

  return (
    selectedCandidates.length > 0 &&
    answerCandidates.length > 0 &&
    selectedCandidates.some((selectedValue) =>
      answerCandidates.some((answerValue) => numericAnswersMatch(selectedValue, answerValue))
    )
  );
}

function isDragSelectionCorrect(question, tokens) {
  if (question.dragLayout === "buckets") {
    let offset = 0;

    return (question.dragBucketColumns || []).every((bucket) => {
      const answers = Array.isArray(bucket?.answers) ? bucket.answers : [];
      const bucketTokens = tokens.slice(offset, offset + answers.length);
      offset += answers.length;

      return (
        bucketTokens.length === answers.length &&
        bucketTokens.every((token) => answers.includes(token)) &&
        answers.every((token) => bucketTokens.includes(token))
      );
    });
  }

  return (
    tokens.length === question.dragAnswerTokens.length &&
    tokens.every((token, index) => dragTokensMatch(question, token, question.dragAnswerTokens[index]))
  );
}

function getVisibleQuestionExtraText(question) {
  const extraText = typeof question?.extraText === "string" ? question.extraText : "";
  if (!extraText) {
    return "";
  }

  return extraText
    .split("\n")
    .map((line) => line.trimEnd())
    .filter((line) => !SNAPSHOT_DATE_PATTERN.test(line.trim()))
    .join("\n")
    .trim();
}

