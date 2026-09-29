function renderMysteryRuleQuestion(question, config, { readOnly = false, selectedTokens = [] } = {}) {
  const model = globalThis.HomeworkMysteryRule;
  if (!model?.isValidConfig(config)) return;
  const answer = model.parseTokens(config, selectedTokens) || model.initial(config);
  const tokens = () => [JSON.stringify(answer)];
  const make = (tag, className, text = '') => {
    const el = document.createElement(tag);
    el.className = className;
    el.textContent = text;
    return el;
  };
  const button = (className, text, click) => {
    const el = make('button', className, text);
    el.type = 'button';
    el.disabled = readOnly;
    if (!readOnly) el.addEventListener('click', click);
    return el;
  };
  const shell = make('div', 'interactive-question mystery-rule-question');
  shell.dir = 'ltr';
  shell.appendChild(make('p', 'mystery-rule-intro', 'One machine. These are the only possible rules. Which fit your evidence?'));
  const candidates = make('div', 'mystery-rule-candidates');
  candidates.setAttribute('role', 'group');
  candidates.setAttribute('aria-label', 'Candidate rules — choose one that fits');
  const cards = config.rules.map((rule, index) => {
    const card = button('secondary-button mystery-rule-card', model.label(rule), () => {
      answer.choice = index;
      sync(true);
    });
    card.dataset.rule = String(index);
    candidates.appendChild(card);
    return card;
  });
  shell.appendChild(candidates);

  const controls = make('div', 'mystery-rule-controls');
  const inputLabel = make('label', '', 'Input to test');
  const input = make('select', 'mystery-rule-input');
  input.disabled = readOnly;
  for (let value = config.min; value <= config.max; value++) {
    const option = make('option', '', String(value));
    option.value = String(value);
    input.appendChild(option);
  }
  input.addEventListener('change', () => {
    if (readOnly) return;
    answer.input = Number(input.value);
    sync(true);
  });
  inputLabel.appendChild(input);
  controls.appendChild(inputLabel);
  const testButton = button('primary-button mystery-rule-test', 'Test input', () => {
    if (answer.tests.length >= config.maxTests || answer.tests.includes(answer.input)) return;
    answer.tests.push(answer.input);
    sync(true);
  });
  controls.appendChild(testButton);
  shell.appendChild(controls);
  const budget = make('p', 'mystery-rule-budget');
  shell.appendChild(budget);
  const history = make('table', 'mystery-rule-history');
  history.appendChild(make('caption', '', 'Machine observations'));
  const head = make('thead', '');
  const headings = make('tr', '');
  for (const text of ['Test', 'Input', 'Output']) {
    const cell = make('th', '', text);
    cell.scope = 'col';
    headings.appendChild(cell);
  }
  head.appendChild(headings);
  history.appendChild(head);
  const rows = make('tbody', '');
  history.appendChild(rows);
  shell.appendChild(history);

  let evidence, reason;
  if (config.requireReason) {
    const explanation = make('fieldset', 'mystery-rule-explanation');
    explanation.appendChild(make('legend', '', 'Explain your investigation'));
    explanation.appendChild(make('p', '', 'Choose a test that separated rules still possible immediately before you ran it.'));
    const evidenceLabel = make('label', '', 'Which of your tests helped?');
    evidence = make('select', 'mystery-rule-evidence');
    evidence.disabled = readOnly;
    evidence.addEventListener('change', () => {
      if (readOnly) return;
      answer.evidence = evidence.value === '' ? null : Number(evidence.value);
      sync(true);
    });
    evidenceLabel.appendChild(evidence);
    explanation.appendChild(evidenceLabel);
    const reasonLabel = make('label', '', 'Why did it help?');
    reason = make('select', 'mystery-rule-reason');
    reason.disabled = readOnly;
    const placeholder = make('option', '', 'Choose a reason');
    placeholder.value = '';
    reason.appendChild(placeholder);
    // Keep choices short enough for a native select on a narrow phone.
    for (const [value, text] of [['different', 'Different predicted outputs'], ['same', 'Same predicted output'], ['larger', 'Bigger inputs always prove it']]) {
      const option = make('option', '', text);
      option.value = value;
      reason.appendChild(option);
    }
    reason.addEventListener('change', () => {
      if (readOnly) return;
      answer.reason = reason.value || null;
      sync(true);
    });
    reasonLabel.appendChild(reason);
    explanation.appendChild(reasonLabel);
    shell.appendChild(explanation);
  }
  const status = make('p', 'interactive-status mystery-rule-status');
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  shell.appendChild(status);
  if (!readOnly) {
    shell.appendChild(button('secondary-button mystery-rule-clear', 'Clear conclusion', () => {
      answer.choice = answer.evidence = answer.reason = null;
      sync(true);
    }));
    shell.appendChild(button('primary-button interactive-check-button', 'Check rule', () => {
      const result = model.evaluate(config, tokens());
      if (!result.complete) { status.textContent = result.feedback; return; }
      question.explanation = result.feedback;
      // Review must describe the actual evidence, including valid ambiguous conclusions.
      question.answerLabel = model.remaining(config, answer.tests).map(i => model.label(config.rules[i])).join(' or ') +
        (config.requireReason ? '. Explain a test with different predicted outputs.' : '');
      handleAnswer(question, result.isCorrect, result.value, { tokens: tokens() });
    }));
  }
  elements.choicesArea.appendChild(shell);

  function sync(save = false) {
    input.value = String(answer.input);
    cards.forEach((card, index) => {
      const selected = answer.choice === index;
      card.setAttribute('aria-pressed', String(selected));
      card.classList.toggle('selected', selected);
    });
    testButton.disabled = readOnly || answer.tests.length >= config.maxTests || answer.tests.includes(answer.input);
    budget.textContent = `${answer.tests.length} of ${config.maxTests} free tests used.` +
      (answer.tests.length === config.maxTests ? ' Use your evidence to choose a rule.' :
        answer.tests.includes(answer.input) ? ' This input is already in your history. Choose another input.' : ' Exploring does not lower your score.');
    rows.replaceChildren();
    [config.initialInput, ...answer.tests].forEach((x, index) => {
      const row = make('tr', '');
      const name = make('th', '', index === 0 ? 'Given' : String(index));
      name.scope = 'row';
      row.appendChild(name);
      row.appendChild(make('td', '', String(x)));
      row.appendChild(make('td', '', String(model.output(config.rules[config.hidden], x))));
      rows.appendChild(row);
    });
    if (evidence) {
      evidence.replaceChildren();
      const empty = make('option', '', 'Choose a test');
      empty.value = '';
      evidence.appendChild(empty);
      answer.tests.forEach((x, index) => {
        const option = make('option', '', `Test ${index + 1}: ${x} → ${model.output(config.rules[config.hidden], x)}`);
        option.value = String(index);
        evidence.appendChild(option);
      });
      evidence.value = answer.evidence === null ? '' : String(answer.evidence);
      reason.value = answer.reason || '';
    }
    if (readOnly) status.textContent = model.evaluate(config, tokens()).feedback;
    else {
      status.textContent = answer.tests.length
        ? `Latest observation: ${answer.tests.at(-1)} → ${model.output(config.rules[config.hidden], answer.tests.at(-1))}. Choose any rule that fits every row.`
        : 'Run a test, then choose a rule. You can change your conclusion before checking.';
      updatePendingAnswer({ value: '', tokens: tokens() });
      if (save) document.dispatchEvent(new CustomEvent('homework:answer-recorded'));
    }
  }
  sync();
}
