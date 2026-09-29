function renderEquationBalanceQuestion(question, config, {readOnly = false, selectedTokens = []} = {}) {
  const model = globalThis.HomeworkEquationBalance;
  if (!model?.isValidConfig(config)) return;
  const answer = model.parseTokens(config, selectedTokens) || model.initial();
  const tokens = () => [JSON.stringify(answer)];
  const symbol = config.visual ? '□' : 'x';
  const make = (tag, className, text = '') => {
    const el = document.createElement(tag);
    el.className = className;
    el.textContent = text;
    return el;
  };
  const button = (className, text, action) => {
    const el = make('button', className, text);
    el.type = 'button';
    el.disabled = readOnly;
    if (!readOnly) el.addEventListener('click', action);
    return el;
  };
  const shell = make('div', 'interactive-question equation-balance-question');
  shell.dir = 'ltr';
  shell.appendChild(make('p', '', config.visual ? '□ is a mystery box. Each ● is one counter. Every box holds the same number.' :
    'Goal: x alone on either side. Every operation acts on both sides.'));
  const current = make('p', 'equation-balance-current');
  current.setAttribute('aria-label', 'Current equation');
  shell.appendChild(current);
  const picture = make('div', 'equation-balance-picture');
  picture.setAttribute('aria-hidden', 'true');
  if (config.visual) shell.appendChild(picture);

  const label = make('label', 'equation-balance-amount-label', 'Amount (whole number or fraction, for example 3/2)');
  const input = make('input', 'equation-balance-amount');
  input.type = 'text';
  input.maxLength = 24;
  input.autocomplete = 'off';
  input.spellcheck = false;
  input.value = answer.amount;
  input.disabled = readOnly;
  input.addEventListener('input', () => {
    if (readOnly) return;
    answer.amount = input.value;
    sync(true);
  });
  label.appendChild(input);
  shell.appendChild(label);
  const palette = make('div', 'equation-balance-palette');
  palette.setAttribute('role', 'group');
  palette.setAttribute('aria-label', 'Apply the amount to both sides');
  const labels = {add: 'Add to both sides', subtract: 'Subtract from both sides',
    multiply: 'Multiply both sides', divide: 'Divide both sides',
    'add-x': 'Add x terms to both sides', 'subtract-x': 'Subtract x terms from both sides'};
  const cards = Object.keys(model.operations).filter(op => !op.endsWith('-x') || config.right.a > 0).map(op => {
    const card = button('secondary-button equation-balance-operation', labels[op], () => {
      if (answer.moves.length >= model.MAX_MOVES) return;
      const move = {op, value: answer.amount};
      const result = model.applyMove(model.replay(config, answer.moves).equation, move);
      if (!result.ok) { status.textContent = result.feedback; return; }
      answer.moves.push(move);
      sync(true);
      status.textContent = result.feedback;
    });
    card.dataset.operation = op;
    palette.appendChild(card);
    return card;
  });
  shell.appendChild(palette);
  const actions = make('div', 'equation-balance-actions');
  const undo = button('secondary-button equation-balance-undo', 'Undo last move', () => {
    if (!answer.moves.length) return;
    answer.moves.pop();
    sync(true);
    status.textContent = 'Last move undone. You can choose a different operation.';
  });
  actions.appendChild(undo);
  shell.appendChild(actions);
  const status = make('p', 'interactive-status equation-balance-status');
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  shell.appendChild(status);
  shell.appendChild(make('h3', 'equation-balance-history-title', 'Your moves'));
  const history = make('ol', 'equation-balance-history');
  history.setAttribute('aria-label', 'Equation move history');
  history.tabIndex = 0;
  shell.appendChild(history);
  if (!readOnly) shell.appendChild(button('primary-button interactive-check-button', 'Check solution', () => {
    const result = model.evaluate(config, tokens());
    if (!result.complete) { status.textContent = result.feedback; return; }
    question.explanation = result.feedback;
    handleAnswer(question, result.isCorrect, result.value, {tokens: tokens()});
  }));
  elements.choicesArea.appendChild(shell);

  function sync(save = false) {
    const result = model.replay(config, answer.moves);
    current.textContent = model.formatEquation(result.equation, symbol);
    current.setAttribute('aria-label', `Current equation: ${model.formatEquation(result.equation, config.visual ? 'box' : 'x')}`);
    picture.replaceChildren();
    if (config.visual) {
      const sides = [result.equation.left, result.equation.right];
      const drawable = sides.every(side => [side.a, side.b].every(v => v.d === 1 && v.n >= 0 && v.n <= 24));
      picture.hidden = !drawable;
      if (drawable) sides.forEach((side, i) => {
        if (i) picture.appendChild(make('span', 'equation-balance-equals', '='));
        const pan = make('div', 'equation-balance-pan');
        for (let count = 0; count < side.a.n; count++) pan.appendChild(make('span', 'equation-balance-box', '?'));
        for (let count = 0; count < side.b.n; count++) pan.appendChild(make('span', 'equation-balance-counter', '●'));
        if (!side.a.n && !side.b.n) pan.appendChild(make('span', '', '0'));
        picture.appendChild(pan);
      });
    }
    undo.disabled = readOnly || !answer.moves.length;
    cards.forEach(card => { card.disabled = readOnly || answer.moves.length >= model.MAX_MOVES; });
    history.replaceChildren();
    result.history.forEach((row, index) => {
      const item = make('li', '');
      item.appendChild(make('span', '', index ? model.moveLabel(row.move, symbol) : 'Start'));
      item.appendChild(make('strong', '', model.formatEquation(row.equation, symbol)));
      history.appendChild(item);
    });
    status.textContent = readOnly ? model.evaluate(config, tokens()).feedback :
      answer.moves.length >= model.MAX_MOVES ? 'The move history is full. Undo some moves to continue; this is an activity limit, not a mathematical error.' :
      model.solved(result.equation) ? 'The unknown is isolated. Check your solution when you are ready.' :
      'Choose an amount, then an operation. Legal detours and undo do not lower your score.';
    if (!readOnly) {
      updatePendingAnswer({value: '', tokens: tokens()});
      if (save) document.dispatchEvent(new CustomEvent('homework:answer-recorded'));
    }
  }
  sync();
}
