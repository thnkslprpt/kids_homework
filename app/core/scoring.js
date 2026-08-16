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
      variants.delete(normalized);
      if (!/^[+-]/.test(innerValue)) {
        variants.add(`-${innerValue}`);
      } else if (innerValue.startsWith("-")) {
        variants.add(innerValue);
      }
    }
  }

  variants.forEach((variant) => {
    const compactValue = variant.replace(/([+-])\s+/g, "$1").trim();
    const fractionValue = parseExplicitFraction(compactValue);
    if (Number.isFinite(fractionValue)) {
      candidates.add(fractionValue);
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

function parseExplicitFraction(value) {
  const normalized = String(value || "").trim();
  const simpleFraction = normalized.match(/^([+-]?\d+)\s*\/\s*(\d+)$/);
  if (simpleFraction) {
    const denominator = Number(simpleFraction[2]);
    return denominator ? Number(simpleFraction[1]) / denominator : Number.NaN;
  }

  // Mixed numbers use a space between the whole and fractional parts. The
  // leading sign applies to the complete value: -1 1/2 means -1.5.
  const mixedFraction = normalized.match(/^([+-]?\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (!mixedFraction) {
    return Number.NaN;
  }
  const whole = Number(mixedFraction[1]);
  const numerator = Number(mixedFraction[2]);
  const denominator = Number(mixedFraction[3]);
  if (!denominator || numerator >= denominator) {
    return Number.NaN;
  }
  const sign = whole < 0 || mixedFraction[1].startsWith("-") ? -1 : 1;
  return sign * (Math.abs(whole) + numerator / denominator);
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

  // A single dot followed by three digits is a valid decimal (for example,
  // 1.000), so do not also reinterpret it as a thousands separator. European
  // grouping is unambiguous when it contains a decimal comma or 2+ groups.
  if (
    /^[+-]?\d{1,3}(?:\.\d{3})+,\d+$/.test(compactValue) ||
    /^[+-]?\d{1,3}(?:\.\d{3}){2,}$/.test(compactValue)
  ) {
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
    parseExplicitFraction,
  };

  globalThis.buildNormalizedFlexibleNumberStrings = buildNormalizedFlexibleNumberStrings;
  globalThis.buildNumericAnswerCandidates = buildNumericAnswerCandidates;
  globalThis.normalizeFlexibleNumericInput = normalizeFlexibleNumericInput;
})();
