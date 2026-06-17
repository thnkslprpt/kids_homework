(() => {
function buildNumericAnswerCandidates(rawValue, question) {
  const strippedValue = stripAcceptedNumericAffixes(rawValue, question);
  if (!strippedValue) {
    return [];
  }

  return Array.from(parseFlexibleNumberCandidates(strippedValue));
}

function stripAcceptedNumericAffixes(rawValue, question) {
  let value = normalizeFlexibleNumericInput(rawValue);
  if (!value) {
    return "";
  }

  value = value.replace(/[.!?]+$/g, "").trim();
  value = stripAcceptedNumericPrefix(value, question?.acceptedAnswerPrefixes);
  value = stripAcceptedNumericSuffix(value, question?.acceptedAnswerSuffixes);

  return value.trim();
}

function stripAcceptedNumericPrefix(value, affixes) {
  const options = Array.isArray(affixes)
    ? [...affixes].map((affix) => String(affix).trim()).filter(Boolean).sort((left, right) => right.length - left.length)
    : [];

  for (const affix of options) {
    const pattern = new RegExp(`^${escapeRegExp(affix)}\\s*`, "i");
    if (pattern.test(value)) {
      return value.replace(pattern, "").trimStart();
    }
  }

  return value;
}

function stripAcceptedNumericSuffix(value, affixes) {
  const options = Array.isArray(affixes)
    ? [...affixes].map((affix) => String(affix).trim()).filter(Boolean).sort((left, right) => right.length - left.length)
    : [];

  for (const affix of options) {
    const pattern = new RegExp(`\\s*${escapeRegExp(affix)}$`, "i");
    if (pattern.test(value)) {
      return value.replace(pattern, "").trimEnd();
    }
  }

  return value;
}

function parseFlexibleNumberCandidates(rawValue) {
  const candidates = new Set();
  const normalized = normalizeFlexibleNumericInput(rawValue);
  if (!normalized) {
    return candidates;
  }

  const variants = new Set([normalized]);
  const parenthesizedMatch = normalized.match(/^\(\s*(.+?)\s*\)$/);
  if (parenthesizedMatch) {
    const innerValue = parenthesizedMatch[1].trim();
    if (innerValue) {
      variants.add(innerValue);
      if (!/^[+-]/.test(innerValue)) {
        variants.add(`-${innerValue}`);
      }
    }
  }

  variants.forEach((variant) => {
    const compactValue = variant.replace(/([+-])\s+/g, "$1").trim();
    const directValue = Number(compactValue);
    if (Number.isFinite(directValue)) {
      candidates.add(directValue);
    }

    buildNormalizedFlexibleNumberStrings(compactValue).forEach((candidateText) => {
      const parsedValue = Number(candidateText);
      if (Number.isFinite(parsedValue)) {
        candidates.add(parsedValue);
      }
    });
  });

  return candidates;
}

function buildNormalizedFlexibleNumberStrings(value) {
  const candidates = new Set();
  const compactValue = value.replace(/(\d)[\s_'’](?=\d)/g, "$1");
  const addCandidate = (candidateText) => {
    if (/^[+-]?(?:\d+(?:\.\d+)?|\.\d+)$/.test(candidateText)) {
      candidates.add(candidateText);
    }
  };

  addCandidate(compactValue);

  if (/^[+-]?\d{1,3}(?:,\d{3})+(?:\.\d+)?$/.test(compactValue)) {
    addCandidate(compactValue.replace(/,/g, ""));
  }

  if (/^[+-]?\d{1,3}(?:\.\d{3})+(?:,\d+)?$/.test(compactValue)) {
    addCandidate(compactValue.replace(/\./g, "").replace(",", "."));
  }

  if (/^[+-]?\d+,\d{1,2}$/.test(compactValue)) {
    addCandidate(compactValue.replace(",", "."));
  }

  return candidates;
}

function normalizeFlexibleNumericInput(value) {
  return String(value ?? "")
    .replace(/[\u00a0\u202f]/g, " ")
    .replace(/[−–—]/g, "-")
    .trim();
}

function numericAnswersMatch(left, right) {
  return Number.isFinite(left) && Number.isFinite(right) && Math.abs(left - right) < 0.000001;
}



  function escapeRegExp(value) {
    return String(value).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
  }

  window.HomeworkApp.scoring = {
    buildNormalizedFlexibleNumberStrings,
    buildNumericAnswerCandidates,
    normalizeFlexibleNumericInput,
    numericAnswersMatch,
  };

  globalThis.buildNormalizedFlexibleNumberStrings = buildNormalizedFlexibleNumberStrings;
  globalThis.buildNumericAnswerCandidates = buildNumericAnswerCandidates;
  globalThis.normalizeFlexibleNumericInput = normalizeFlexibleNumericInput;
})();
