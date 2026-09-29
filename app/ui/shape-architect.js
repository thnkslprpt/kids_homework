function renderShapeArchitectQuestion(question, config, {readOnly = false, selectedTokens = []} = {}) {
  const model = globalThis.HomeworkShapeArchitect;
  if (!model?.isValidConfig(config)) return;
  const answer = model.parseTokens(config, selectedTokens) || model.initial(config);
  const tokens = () => [JSON.stringify(answer)];
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
  const shell = make('div', 'interactive-question shape-architect-question');
  shell.dir = 'ltr';
  const requirements = make('ul', 'shape-architect-requirements');
  for (const text of [`Area: ${config.area} square units`, 'Connectivity: one shape joined along shared edges',
    ...(config.perimeter === null ? [] : [`Perimeter: ${config.perimeter} units`]),
    ...(config.symmetry ? [`Symmetry: across the marked ${config.symmetry} line`] : []),
    ...(config.blocked.length ? ['Leave the × squares empty.'] : [])]) requirements.appendChild(make('li', '', text));
  shell.appendChild(requirements);
  shell.appendChild(make('p', '', 'Tap a square to fill or empty it. Each square is 1 × 1 unit. Corner-touching alone does not connect squares.'));
  const board = make('div', 'shape-architect-board');
  board.style.setProperty('--shape-size', config.size);
  board.setAttribute('role', 'group');
  board.setAttribute('aria-label', `${config.size} by ${config.size} construction grid${config.symmetry ? `, ${config.symmetry} symmetry line through its centre` : ''}`);
  if (config.symmetry) board.classList.add(`shape-symmetry-${config.symmetry}`);
  const flip = index => { answer.cells = answer.cells.slice(0, index) + (answer.cells[index] === '1' ? '0' : '1') + answer.cells.slice(index + 1); };
  const cells = Array.from({length: config.size * config.size}, (_, index) => {
    const blocked = config.blocked.includes(index);
    const cell = button('shape-architect-cell', '', () => {
      flip(index);
      answer.undo.push(index);
      if (answer.undo.length > model.MAX_UNDO) answer.undo.shift();
      sync(true);
    });
    cell.dataset.cell = index;
    cell.disabled = readOnly || blocked;
    if (blocked) cell.classList.add('shape-cell-blocked');
    cell.addEventListener('keydown', event => {
      const moves = {ArrowLeft: -1, ArrowRight: 1, ArrowUp: -config.size, ArrowDown: config.size};
      if (!Object.hasOwn(moves, event.key)) return;
      event.preventDefault();
      const target = index + moves[event.key];
      if (target < 0 || target >= cells.length ||
          (Math.abs(moves[event.key]) === 1 && Math.floor(index / config.size) !== Math.floor(target / config.size))) return;
      cells[target].focus();
    });
    board.appendChild(cell);
    return cell;
  });
  shell.appendChild(board);
  if (config.symmetry) shell.appendChild(make('p', 'shape-architect-axis-label', `Dashed line: ${config.symmetry} line of symmetry through the centre.`));
  const undo = button('secondary-button shape-architect-undo', 'Undo last square', () => {
    if (!answer.undo.length) return;
    flip(answer.undo.pop());
    sync(true);
  });
  shell.appendChild(undo);
  const status = make('p', 'interactive-status shape-architect-status');
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  shell.appendChild(status);
  if (!readOnly) shell.appendChild(button('primary-button interactive-check-button', 'Check shape', () => {
    const result = model.evaluate(config, tokens());
    if (!result.complete) { status.textContent = result.feedback; return; }
    question.explanation = result.feedback;
    handleAnswer(question, result.isCorrect, result.value, {tokens: tokens()});
  }));
  elements.choicesArea.appendChild(shell);
  function sync(save = false) {
    cells.forEach((cell, index) => {
      const filled = answer.cells[index] === '1', blocked = config.blocked.includes(index);
      cell.textContent = blocked ? '×' : filled ? '■' : '';
      cell.setAttribute('aria-pressed', String(filled));
      cell.setAttribute('aria-label', `Row ${Math.floor(index / config.size) + 1}, column ${index % config.size + 1}: ${blocked ? 'blocked' : filled ? 'filled' : 'empty'}`);
    });
    undo.disabled = readOnly || !answer.undo.length;
    status.textContent = readOnly ? model.evaluate(config, tokens()).feedback : 'Count your shape, then check it. You can undo your last 40 square changes.';
    if (!readOnly) {
      updatePendingAnswer({value: '', tokens: tokens()});
      if (save) document.dispatchEvent(new CustomEvent('homework:answer-recorded'));
    }
  }
  sync();
}
