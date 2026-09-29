function renderBuildGraphQuestion(question, config, { readOnly = false, selectedTokens = [] } = {}) {
  const model = globalThis.HomeworkBuildGraph;
  if (!model?.isValidConfig(config)) return;
  const initial = () => ({ scale: config.scales[0], steps: config.labels.map(() => 0) });
  let answer = model.parseTokens(config, selectedTokens) || initial();
  const undoStack = [];
  const tokens = () => [answer.scale, ...answer.steps].map(String);
  const make = (tag, className, text = '') => {
    const element = document.createElement(tag);
    element.className = className;
    element.textContent = text;
    return element;
  };
  const button = (className, text, onClick) => {
    const element = make('button', className, text);
    element.type = 'button';
    element.disabled = readOnly;
    if (!readOnly) element.addEventListener('click', onClick);
    return element;
  };
  const shell = make('div', 'interactive-question build-graph-question');
  shell.dir = 'ltr';
  const table = make('table', 'build-graph-source');
  table.appendChild(make('caption', '', `${config.title} — source data`));
  const head = make('thead', '');
  const heading = make('tr', '');
  for (const label of ['Category', config.unit]) {
    const cell = make('th', '', label);
    cell.scope = 'col';
    heading.appendChild(cell);
  }
  head.appendChild(heading);
  table.appendChild(head);
  const body = make('tbody', '');
  config.labels.forEach((label, index) => {
    const row = make('tr', '');
    const name = make('th', '', label);
    name.scope = 'row';
    row.appendChild(name);
    row.appendChild(make('td', '', String(config.values[index])));
    body.appendChild(row);
  });
  table.appendChild(body);
  shell.appendChild(table);

  let scaleSelect;
  if (config.scales.length > 1) {
    const scaleLabel = make('label', 'build-graph-scale-label', `Scale (${config.unit} per step)`);
    scaleSelect = make('select', 'build-graph-scale');
    scaleSelect.disabled = readOnly;
    config.scales.forEach(scale => {
      const option = make('option', '', String(scale));
      option.value = String(scale);
      scaleSelect.appendChild(option);
    });
    scaleSelect.addEventListener('change', () => {
      if (readOnly) return;
      const scale = Number(scaleSelect.value);
      if (config.scales.includes(scale) && scale !== answer.scale) edit(() => { answer.scale = scale; });
    });
    scaleLabel.appendChild(scaleSelect);
    shell.appendChild(scaleLabel);
  }
  const scaleText = make('p', 'build-graph-scale-text');
  shell.appendChild(scaleText);
  shell.appendChild(make('p', 'build-graph-instructions', readOnly
    ? 'Your submitted graph'
    : 'Use + to add a step and − to remove a step. You can undo edits before checking.'));

  const chart = make('div', `build-graph-chart ${config.orientation}`);
  chart.setAttribute('role', 'group');
  chart.setAttribute('aria-label', `${config.title}, your graph in ${config.unit}`);
  const axis = make('div', 'build-graph-axis');
  axis.setAttribute('aria-hidden', 'true');
  const ticks = Array.from({ length: config.maxSteps + 1 }, (_, index) => {
    const tick = make('span', 'build-graph-tick');
    tick.style[config.orientation === 'vertical' ? 'bottom' : 'left'] = `${index / config.maxSteps * 100}%`;
    axis.appendChild(tick);
    return tick;
  });
  chart.appendChild(axis);
  const bars = config.labels.map((label, index) => {
    const bar = make('div', 'build-graph-bar');
    const track = make('div', 'build-graph-track');
    track.style.setProperty('--graph-steps', String(config.maxSteps));
    track.setAttribute('aria-hidden', 'true');
    const fill = make('div', 'build-graph-fill');
    track.appendChild(fill);
    bar.appendChild(track);
    bar.appendChild(make('strong', 'build-graph-label', label));
    const value = make('span', 'build-graph-value');
    value.dataset.barValue = String(index);
    bar.appendChild(value);
    const controls = make('div', 'build-graph-controls');
    const decrease = button('secondary-button build-graph-decrease', '−', () => {
      if (answer.steps[index] > 0) edit(() => { answer.steps[index] -= 1; });
    });
    const increase = button('secondary-button build-graph-increase', '+', () => {
      if (answer.steps[index] < config.maxSteps) edit(() => { answer.steps[index] += 1; });
    });
    decrease.dataset.index = increase.dataset.index = String(index);
    decrease.setAttribute('aria-label', `Remove one step from ${label}`);
    increase.setAttribute('aria-label', `Add one step to ${label}`);
    controls.appendChild(increase);
    controls.appendChild(decrease);
    bar.appendChild(controls);
    chart.appendChild(bar);
    return { fill, value, decrease, increase };
  });
  shell.appendChild(chart);
  const status = make('p', 'interactive-status build-graph-status');
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  shell.appendChild(status);
  let undoButton;
  if (!readOnly) {
    const actions = make('div', 'build-graph-actions');
    undoButton = button('secondary-button build-graph-undo', 'Undo', () => {
      if (undoStack.length) {
        answer = undoStack.pop();
        sync(true);
      }
    });
    actions.appendChild(undoButton);
    actions.appendChild(button('secondary-button build-graph-reset', 'Reset', () => edit(() => { answer = initial(); })));
    shell.appendChild(actions);
    shell.appendChild(button('primary-button interactive-check-button', 'Check graph', () => {
      const result = model.evaluate(config, tokens());
      if (!result.complete) { status.textContent = result.feedback; return; }
      // The submitted explanation travels with the question and its history record.
      question.explanation = result.feedback;
      handleAnswer(question, result.isCorrect, result.value, { tokens: tokens() });
    }));
  }
  elements.choicesArea.appendChild(shell);

  function edit(change) {
    undoStack.push({ scale: answer.scale, steps: [...answer.steps] });
    if (undoStack.length > 100) undoStack.shift();
    change();
    sync(true);
  }

  function sync(save = false) {
    if (scaleSelect) scaleSelect.value = String(answer.scale);
    scaleText.textContent = `Each step = ${answer.scale} ${config.unit}. Axis: 0–${config.maxSteps * answer.scale} ${config.unit}.`;
    ticks.forEach((tick, index) => { tick.textContent = String(index * answer.scale); });
    bars.forEach((bar, index) => {
      const steps = answer.steps[index];
      bar.fill.style[config.orientation === 'vertical' ? 'height' : 'width'] = `${steps / config.maxSteps * 100}%`;
      bar.value.textContent = `${steps * answer.scale} ${config.unit} · ${steps} steps`;
      bar.increase.disabled = readOnly || steps === config.maxSteps;
      bar.decrease.disabled = readOnly || steps === 0;
    });
    if (undoButton) undoButton.disabled = !undoStack.length;
    if (readOnly) {
      status.textContent = model.evaluate(config, tokens()).feedback;
    } else {
      status.textContent = model.evaluate(config, tokens()).value;
      updatePendingAnswer({ value: '', tokens: tokens() });
      if (save) document.dispatchEvent(new CustomEvent('homework:answer-recorded'));
    }
  }
  sync();
}
