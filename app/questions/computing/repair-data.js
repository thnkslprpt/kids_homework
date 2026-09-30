// E11 uses paired selection: both the action and its justification must match.
globalThis.HomeworkRepairData = (() => {
  const pick = values => values[Math.floor(Math.random() * values.length)];
  const escape = value => String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]);
  function shuffle(values) {
    const result = [...values];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  const field = (key, label) => ({key, label});
  const display = value => value === null ? 'Not recorded' : String(value);

  function library(kind) {
    const id = 100 + Math.floor(Math.random() * 800);
    const title = pick(['Moon Walk', 'The Red Kite', 'Ocean Life', 'The Tree House']);
    const other = pick(['Garden Birds', 'Robot Rescue', 'River Journey']);
    const records = [
      {id: `C${id}`, title},
      {id: `C${id + 1}`, title},
      {id: `C${id + 2}`, title: other},
    ];
    if (kind !== 'distinct') records.push({id: records[0].id, title: kind === 'conflicting-id' ? other : title});
    const row = records.length - 1;
    if (kind === 'distinct') records[row].title = title;
    const rule = 'Each checkout has its own unique ID. Different IDs are different checkouts, even for the same book. For an exact repeated record, keep the first row and mark the later copy as a duplicate.';
    const evidence = kind === 'conflicting-id'
      ? 'These are the exported rows. The original checkout slips are unavailable, so neither conflicting title has been confirmed.'
      : 'These are all the exported rows. Compare both the checkout IDs and the titles.';
    const action = kind === 'duplicate' ? `Mark row ${row + 1} as a duplicate; keep the first copy`
      : kind === 'distinct' ? `Keep row ${row + 1} as a separate checkout`
        : 'Cannot determine the correct title; flag the conflict and check the source';
    const reason = kind === 'duplicate' ? 'The same checkout ID and title already appear in an earlier row.'
      : kind === 'distinct' ? 'The rows have different checkout IDs, so the same title does not make them duplicates.'
        : 'The same ID has conflicting titles, and there is no source to show which title is correct.';
    return {
      kind, records, fields: [field('id', 'Checkout ID'), field('title', 'Book title')],
      focus: {row, field: 'id'}, rule, evidence, source: null, action, reason,
      actions: [action,
        kind === 'duplicate' ? `Keep row ${row + 1} as another checkout` : `Mark row ${row + 1} as an exact duplicate`,
        'Mark every row with the same book title as a duplicate'],
      reasons: [reason, 'Matching book titles always mean the same checkout.',
        kind === 'duplicate' ? 'Every exported row must be a different checkout.' : 'The last row is always the most reliable.'],
      review: `${action}. ${reason} ${kind === 'conflicting-id' ? 'A conflicting record needs checking, not an invented correction.' : 'Record identity comes from the unique ID, not the title.'}`,
    };
  }

  function units(level) {
    const unit = pick(level === 5 ? [
      {small: 'cm', large: 'm', factor: 100, label: 'Length'},
    ] : [
      {small: 'cm', large: 'm', factor: 100, label: 'Length'},
      {small: 'g', large: 'kg', factor: 1000, label: 'Mass'},
      {small: 'mL', large: 'L', factor: 1000, label: 'Volume'},
    ]);
    const value = pick(level === 5 ? [1, 2, 3, 4] : [0.25, 0.5, 0.75, 1.2, 1.5, 2.5]);
    const amount = Math.round(value * unit.factor);
    const row = Math.floor(Math.random() * 3), base = 10 + Math.floor(Math.random() * 80);
    const records = [1, 2, 3].map((n, i) => ({id: `M${base + i}`, measurement: `${n} ${unit.large}`}));
    records[row].measurement = `${amount} ${unit.small}`;
    const rule = `Every ${unit.label.toLowerCase()} must be stored in ${unit.large}. ${unit.factor} ${unit.small} = 1 ${unit.large}. Keep the measured quantity unchanged.`;
    const evidence = `The original label for ${records[row].id} confirms ${amount} ${unit.small}. The other rows already use ${unit.large}.`;
    const action = `Set row ${row + 1} to ${value} ${unit.large}`;
    const reason = `Divide ${amount} by ${unit.factor} to express the same quantity in ${unit.large}.`;
    return {
      kind: 'units', records, fields: [field('id', 'Record ID'), field('measurement', unit.label)],
      focus: {row, field: 'measurement'}, rule, evidence, source: {id: records[row].id, value: amount, unit: unit.small}, action, reason,
      actions: [action, `Change only the unit: ${amount} ${unit.large}`, `Keep ${amount} ${unit.small}`],
      reasons: [reason, 'Changing the unit label never changes the quantity.', 'A confirmed measurement never needs its unit converted.'],
      review: `${amount} ${unit.small} = ${value} ${unit.large}. Convert the number and the unit together; changing only the unit would change the quantity.`,
    };
  }

  function missing(kind) {
    const row = Math.floor(Math.random() * 3), base = 10 + Math.floor(Math.random() * 80);
    const records = [2, 4, 3].map((count, i) => ({id: `B${base + i}`, count}));
    records[row].count = null;
    const known = kind === 'missing-known', value = pick([0, 1, 5, 6]);
    const source = known ? {id: records[row].id, value} : null;
    const rule = 'Each visit has a unique ID and a count of books borrowed. Zero means a recorded count of no books; a blank means the count is unknown. Fill a blank only from a source for that same ID.';
    const evidence = known ? `The original desk log for ${source.id} records ${value} books borrowed.`
      : `The desk log for ${records[row].id} is missing. There is no recorded count for this visit.`;
    const action = known ? `Set row ${row + 1} to ${value} books` : 'Cannot determine the count; leave it unknown and ask for the source';
    const reason = known ? 'The original log supplies the count for this exact visit ID.'
      : 'There is no recorded count for this ID; another visit cannot supply its value.';
    return {
      kind, records, fields: [field('id', 'Visit ID'), field('count', 'Books borrowed')],
      focus: {row, field: 'count'}, rule, evidence, source, action, reason,
      actions: [action, known ? 'Leave the count unknown despite the matching log' : `Set row ${row + 1} to 0 books`,
        `Copy ${records[(row + 1) % 3].count} books from another visit`],
      reasons: [reason, 'A blank always means zero.', 'Nearby records must have the same count.'],
      review: `${action}. ${reason} Missing data is not zero, and a neighbouring row is not evidence about this visit.`,
    };
  }

  function observation(kind) {
    const base = 10 + Math.floor(Math.random() * 80), row = Math.floor(Math.random() * 3);
    const normal = pick([12, 14, 16, 18]), unusual = normal * 10;
    const records = [normal - 1, normal + 1, normal + 2].map((n, i) => ({id: `P${base + i}`, measurement: `${n} cm`}));
    records[row].measurement = `${unusual} cm`;
    const source = kind === 'unverified-unusual' ? null : {id: records[row].id, value: kind === 'verified-error' ? normal : unusual};
    const rule = 'Each plant has a unique ID. Heights are recorded in cm and may differ. Correct a value only when the source for that plant supports the correction.';
    const evidence = kind === 'verified-error' ? `The original measurement sheet for ${source.id} says ${source.value} cm. A teacher checked that sheet against the export.`
      : kind === 'verified-unusual' ? `The gardener remeasured ${source.id}: ${source.value} cm. This plant is a tall climbing variety; the other plants are seedlings.`
        : `The source sheet for ${records[row].id} is unavailable. Nobody has remeasured this plant or checked its variety.`;
    const action = kind === 'verified-error' ? `Set row ${row + 1} to ${normal} cm`
      : kind === 'verified-unusual' ? `Keep row ${row + 1} at ${unusual} cm`
        : 'Cannot determine whether it is an error; keep it flagged for checking';
    const reason = kind === 'verified-error' ? 'The checked source for the same plant ID gives a different height.'
      : kind === 'verified-unusual' ? 'A new measurement confirms this tall plant really has that height.'
        : 'An unusual height is not automatically an error; there is no confirming evidence.';
    return {
      kind, records, fields: [field('id', 'Plant ID'), field('measurement', 'Height')],
      focus: {row, field: 'measurement'}, rule, evidence, source, action, reason,
      actions: [action, kind === 'verified-error' ? `Keep row ${row + 1} at ${unusual} cm without checking` : `Set row ${row + 1} to ${normal} cm`,
        `Delete row ${row + 1} because it is much taller`],
      reasons: [reason, 'Any value far from the others must be wrong.', 'All plants must have nearly the same height.'],
      review: `${action}. ${reason} An outlier is a reason to investigate, not permission to delete or invent data.`,
    };
  }

  function render(data) {
    return `<section class="repair-data" aria-label="Records, rules and evidence">
      <p class="repair-data-rule"><strong>Rule:</strong> ${escape(data.rule)}</p>
      <div class="repair-data-records">${data.records.map((record, index) => `<article class="repair-data-record" aria-label="Row ${index + 1}">
        <strong>Row ${index + 1}${index === data.focus.row ? ' · Check this field' : ''}</strong>
        <dl>${data.fields.map(({key, label}) => `<div${index === data.focus.row && key === data.focus.field ? ' class="repair-data-focus"' : ''}>
          <dt>${escape(label)}${index === data.focus.row && key === data.focus.field ? " (check)" : ""}</dt><dd>${escape(display(record[key]))}</dd></div>`).join('')}</dl>
      </article>`).join('')}</div>
      <p class="repair-data-evidence"><strong>Evidence:</strong> ${escape(data.evidence)}</p>
    </section>`;
  }

  function createEntry(level) {
    if (!Number.isInteger(level) || level < 4 || level > 10) return null;
    const kinds = level === 4 ? ['duplicate', 'distinct'] : level <= 6 ? ['units']
      : level === 7 ? ['missing-known', 'missing-unknown']
        : level <= 9 ? ['verified-error', 'verified-unusual', 'unverified-unusual']
          : ['duplicate', 'distinct', 'conflicting-id', 'units', 'missing-known', 'missing-unknown', 'verified-error', 'verified-unusual', 'unverified-unusual'];
    const kind = pick(kinds);
    const scenario = ['duplicate', 'distinct', 'conflicting-id'].includes(kind) ? library(kind)
      : kind === 'units' ? units(level) : kind.startsWith('missing-') ? missing(kind) : observation(kind);
    const {action, reason, actions, reasons, review, ...repair} = scenario;
    const items = shuffle(actions).map(summary => ({summary}));
    const reasonItems = shuffle(reasons).map(summary => ({summary}));
    const answerItemIndex = items.findIndex(item => item.summary === action);
    const answerReasonIndex = reasonItems.findIndex(item => item.summary === reason);
    const visualSummary = `Rule: ${repair.rule} ${repair.records.map((record, index) =>
      `Row ${index + 1}: ${repair.fields.map(({key, label}) => `${label}: ${display(record[key])}`).join('; ')}.`).join(' ')} Evidence: ${repair.evidence}`;
    return {
      mode: 'interactive', difficulty: level, gradeMin: level, gradeMax: level,
      topic: 'Repair the data', skill: 'computing.repair-data', reviewStatus: 'template-verified',
      contentId: globalThis.HomeworkQuestionUtils.stableContentId('repair-data', `${level}|${JSON.stringify(repair)}`),
      question: `Repair the data: what should you do about row ${repair.focus.row + 1}, and why?`,
      answer: `${action} — ${reason}`, answerLabel: `${action} — ${reason}`,
      visualHtml: render(repair), visualSummary, reviewText: review, explanation: review,
      interactive: {
        type: 'repair-data', layout: 'paired-select', repair, items, reasons: reasonItems,
        answerIndexes: [answerItemIndex], answerItemIndex, answerReasonIndex,
        prompt: 'Use the rule and evidence. Choose one action and the reason that supports it.',
        itemHeading: 'Action', reasonHeading: 'Evidence / reason', checkLabel: 'Check repair',
      },
    };
  }
  return {createEntry};
})();
