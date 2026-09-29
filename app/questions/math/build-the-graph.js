// E04: construct a representation, then grade its values rather than a preferred scale.
globalThis.HomeworkBuildGraph = (() => {
  function scaleFits(config, scale) {
    return config.values.every(value => value % scale === 0 && value / scale <= config.maxSteps);
  }

  function isValidConfig(config) {
    if (!config || config.layout !== 'build-graph' ||
        !['vertical', 'horizontal'].includes(config.orientation) ||
        !Number.isInteger(config.maxSteps) || config.maxSteps < 1 || config.maxSteps > 8 ||
        !Array.isArray(config.labels) || config.labels.length < 3 || config.labels.length > 5 ||
        (config.orientation === 'vertical' && config.labels.length !== 3) ||
        config.labels.some(label => typeof label !== 'string' || !label.trim() || label.length > 40) ||
        new Set(config.labels).size !== config.labels.length ||
        !Array.isArray(config.values) || config.values.length !== config.labels.length ||
        config.values.some(value => !Number.isInteger(value) || value < 0 || value > 160) ||
        !Array.isArray(config.scales) || config.scales.length < 1 || config.scales.length > 5 ||
        config.scales.some(scale => !Number.isInteger(scale) || scale < 1 || scale > 20) ||
        new Set(config.scales).size !== config.scales.length ||
        typeof config.unit !== 'string' || !config.unit.trim() || config.unit.length > 40 ||
        typeof config.title !== 'string' || !config.title.trim() || config.title.length > 100) return false;
    return config.scales.some(scale => scaleFits(config, scale));
  }

  function parseTokens(config, tokens) {
    if (!isValidConfig(config) || !Array.isArray(tokens) || tokens.length !== config.labels.length + 1 ||
        tokens.some(token => typeof token !== 'string' || !/^(0|[1-9]\d*)$/.test(token))) return null;
    const [scale, ...steps] = tokens.map(Number);
    if (!config.scales.includes(scale) || steps.some(step => step > config.maxSteps)) return null;
    return { scale, steps };
  }

  function describe(config, scale, steps) {
    return `Scale: ${scale} ${config.unit} per step; ` + config.labels.map((label, index) =>
      `${label}: ${steps[index] * scale} ${config.unit} (${steps[index]} steps)`
    ).join('; ');
  }

  function evaluate(config, tokens) {
    const answer = parseTokens(config, tokens);
    if (!answer) return { complete: false, isCorrect: false, value: '', feedback: 'Set a scale and every bar using whole steps from 0 to 8.' };
    const { scale, steps } = answer;
    const value = describe(config, scale, steps);
    if (!scaleFits(config, scale)) {
      return { complete: true, isCorrect: false, value,
        feedback: `The scale of ${scale} ${config.unit} per step cannot show every table value exactly within ${config.maxSteps} whole steps. Choose a scale that can.` };
    }
    const index = config.values.findIndex((target, i) => target !== steps[i] * scale);
    return { complete: true, isCorrect: index === -1, value,
      feedback: index === -1
        ? `Every bar matches the table. Each step represents ${scale} ${config.unit}.`
        : `${config.labels[index]} shows ${steps[index] * scale} ${config.unit} (${steps[index]} steps × ${scale}), but the table says ${config.values[index]}. Use ${config.values[index] / scale} steps at this scale.` };
  }

  const contexts = [
    { title: 'Favourite fruit', unit: 'votes', labels: ['Apples', 'Bananas', 'Pears', 'Grapes', 'Oranges'] },
    { title: 'Library books', unit: 'books', labels: ['Animals', 'Space', 'Stories', 'Nature', 'Sports'] },
    { title: 'Favourite activities', unit: 'votes', labels: ['Art', 'Music', 'Reading', 'Games', 'Dance'] },
    { title: 'Collected stickers', unit: 'stickers', labels: ['Stars', 'Hearts', 'Moons', 'Flowers', 'Suns'] },
  ];
  const pick = values => values[Math.floor(Math.random() * values.length)];

  function createEntry(level) {
    if (!Number.isInteger(level) || level < 2 || level > 8) return null;
    const context = pick(contexts);
    const count = level === 8 ? 5 : level === 7 ? 4 : 3;
    const scales = level <= 3 ? [1] : level === 4 ? [2] : level === 5 ? [5]
      : level === 6 ? [1, 2, 3, 4] : level === 7 ? [2, 4, 5, 8] : [5, 10, 15, 20];
    const valueStep = level <= 3 ? 1 : level === 4 ? 2 : level === 5 ? 5 : level === 6 ? 2 : level === 7 ? 4 : 10;
    const range = level < 6 ? 8 : 4;
    const values = Array.from({ length: count }, () => Math.floor(Math.random() * (range + 1)) * valueStep);
    // Include different heights, and never produce an already-solved all-zero board.
    if (values.every(value => value === values[0])) values[count - 1] = values[0] === 0 ? valueStep : 0;
    const config = { layout: 'build-graph', title: context.title, labels: context.labels.slice(0, count),
      values, scales, maxSteps: 8, unit: context.unit, orientation: count > 3 ? 'horizontal' : 'vertical' };
    const exampleScale = scales.find(scale => scaleFits(config, scale));
    const answer = describe(config, exampleScale, values.map(value => value / exampleScale));
    return {
      mode: 'interactive', difficulty: level, category: 'charts-and-graphs',
      contentId: `build-graph-${level}-${context.labels[0]}-${values.join('-')}`,
      skill: 'construct-bar-graph', question: `Build the graph: ${context.title.toLowerCase()}.`,
      extraText: scales.length === 1
        ? `Use + and − to match the table. Each step represents ${scales[0]} ${context.unit}. A value of zero needs no bar.`
        : `Choose a scale and match every table value using 0–8 whole steps. More than one scale can work. Changing the scale keeps the number of steps and changes the values.`,
      reviewText: `Source table (${context.unit}): ${config.labels.map((label, i) => `${label} ${values[i]}`).join('; ')}.`,
      answer, answerLabel: scales.length > 1 ? `One valid graph: ${answer}` : answer,
      explanation: 'Multiply each bar’s number of steps by the scale to find its value. Match each labelled bar to the same row in the table.',
      hints: ['Read one row at a time. Find the bar with the same label.',
        'Bar value = steps × scale. Divide a table value by the scale to find the number of steps.'],
      interactive: config,
    };
  }

  return { isValidConfig, parseTokens, evaluate, createEntry };
})();
