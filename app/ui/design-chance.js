function renderDesignChanceQuestion(question, config, {readOnly = false, selectedTokens = []} = {}) {
  const model = globalThis.HomeworkDesignChance;
  if (!model?.isValidConfig(config)) return;
  const answer = model.parseTokens(config, selectedTokens) || model.initial(config);
  let selected = model.palette[config.colours[0]].code;
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
  const shell = make('div', 'interactive-question design-chance-question');
  shell.dir = 'ltr';
  const requirements = make('ul', 'design-chance-requirements');
  model.requirements(config).forEach(text => requirements.appendChild(make('li', '', text)));
  shell.appendChild(requirements);
  shell.appendChild(make('p', '', config.kind === 'bag' ?
    'Fill every bag slot. Each counter is equally likely to be drawn.' :
    'Colour every equal sector. Each sector is equally likely. Sector numbers run clockwise from the top.'));
  const totals = make('div', 'design-chance-totals');
  totals.setAttribute('role', 'group');
  totals.setAttribute('aria-label', 'Choose the total number of spaces');
  if (config.totals.length > 1) {
    shell.appendChild(make('p', '', 'Choose a total that can meet all the targets. Changing the total starts an empty design; Undo brings it back.'));
    config.totals.forEach(n => {
      const el = button('secondary-button', `${n} spaces`, () => {
        if (n !== answer.cells.length) change('.'.repeat(n));
      });
      el.dataset.total = n;
      totals.appendChild(el);
    });
    shell.appendChild(totals);
  }
  const palette = make('div', 'design-chance-palette');
  palette.setAttribute('role', 'group');
  palette.setAttribute('aria-label', 'Choose a colour and symbol or the eraser');
  for (const colour of [...config.colours, null]) {
    const p = colour ? model.palette[colour] : {code: '.', symbol: '×', label: 'Erase', fill: '#fff'};
    const el = button('secondary-button design-chance-swatch', `${p.symbol} ${p.label}`, () => {
      selected = p.code;
      sync();
    });
    el.dataset.colour = p.code;
    el.style.setProperty('--chance-fill', p.fill);
    palette.appendChild(el);
  }
  shell.appendChild(make('p', '', 'Choose a colour and symbol, then tap a numbered space to place it. Use Erase to empty a space.'));
  shell.appendChild(palette);
  const spinner = make('div', 'design-chance-spinner');
  spinner.setAttribute('aria-hidden', 'true');
  if (config.kind === 'spinner') shell.appendChild(spinner);
  const board = make('div', 'design-chance-board');
  board.setAttribute('role', 'group');
  board.setAttribute('aria-label', config.kind === 'bag' ? 'Bag slots' : 'Spinner sector controls');
  shell.appendChild(board);
  const undo = button('secondary-button design-chance-undo', 'Undo last change', () => {
    if (!answer.undo.length) return;
    answer.cells = answer.undo.pop();
    sync(true);
  });
  shell.appendChild(undo);
  const status = make('p', 'interactive-status design-chance-status');
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  shell.appendChild(status);
  if (!readOnly) shell.appendChild(button('primary-button interactive-check-button', 'Check chance', () => {
    const result = model.evaluate(config, tokens());
    if (!result.complete) { status.textContent = result.feedback; return; }
    question.explanation = result.feedback;
    handleAnswer(question, result.isCorrect, result.value, {tokens: tokens()});
  }));
  elements.choicesArea.appendChild(shell);
  function change(cells) {
    if (cells === answer.cells) return;
    answer.undo.push(answer.cells);
    if (answer.undo.length > model.MAX_UNDO) answer.undo.shift();
    answer.cells = cells;
    sync(true);
  }
  function drawSpinner() {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 240 240');
    const point = (angle, radius) => [120 + radius * Math.sin(angle), 120 - radius * Math.cos(angle)];
    [...answer.cells].forEach((code, i) => {
      const p = Object.values(model.palette).find(p => p.code === code);
      const start = 2 * Math.PI * i / answer.cells.length, end = 2 * Math.PI * (i + 1) / answer.cells.length;
      const path = document.createElementNS(ns, 'path');
      path.setAttribute('d', `M120 120 L${point(start, 112).join(' ')} A112 112 0 0 1 ${point(end, 112).join(' ')} Z`);
      path.setAttribute('fill', p?.fill || '#fff');
      path.setAttribute('stroke', '#34445b');
      svg.appendChild(path);
      const text = document.createElementNS(ns, 'text');
      const [x, y] = point((start + end) / 2, 82);
      text.setAttribute('x', x);
      text.setAttribute('y', y);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.textContent = `${i + 1}${p?.symbol || ''}`;
      svg.appendChild(text);
    });
    spinner.replaceChildren(svg);
  }
  function sync(save = false) {
    if (board.children.length !== answer.cells.length) {
      board.replaceChildren();
      [...answer.cells].forEach((_, i) => {
        const el = button('design-chance-cell', '', () => change(answer.cells.slice(0, i) + selected + answer.cells.slice(i + 1)));
        el.dataset.cell = i;
        el.addEventListener('keydown', event => {
          const moves = {ArrowLeft: -1, ArrowRight: 1, ArrowUp: -3, ArrowDown: 3};
          if (!Object.hasOwn(moves, event.key)) return;
          event.preventDefault();
          const next = i + moves[event.key];
          if (next >= 0 && next < board.children.length) board.children[next].focus();
        });
        board.appendChild(el);
      });
    }
    [...board.children].forEach((el, i) => {
      const p = Object.values(model.palette).find(p => p.code === answer.cells[i]);
      el.textContent = `${i + 1} ${p?.symbol || '—'}`;
      el.dataset.value = answer.cells[i];
      el.style.setProperty('--chance-fill', p?.fill || '#fff');
      el.setAttribute('aria-label', `${config.kind === 'bag' ? 'Slot' : 'Sector'} ${i + 1}: ${p?.label || 'empty'}`);
    });
    [...palette.children].forEach(el => el.setAttribute('aria-pressed', String(el.dataset.colour === selected)));
    [...totals.children].forEach(el => el.setAttribute('aria-pressed', String(Number(el.dataset.total) === answer.cells.length)));
    undo.disabled = readOnly || !answer.undo.length;
    if (config.kind === 'spinner') drawSpinner();
    status.textContent = readOnly ? model.evaluate(config, tokens()).feedback : 'Fill every space, then check your design. You can undo your last 40 changes.';
    if (!readOnly) {
      updatePendingAnswer({value: '', tokens: tokens()});
      if (save) document.dispatchEvent(new CustomEvent('homework:answer-recorded'));
    }
  }
  sync();
}
