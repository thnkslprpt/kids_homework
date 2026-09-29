// E09: exact probability constraints; position and simulated outcomes never affect grading.
globalThis.HomeworkDesignChance = (() => {
  const MAX_UNDO = 40;
  const palette = {
    blue: {code: 'b', symbol: '●', label: 'Blue circle', fill: '#b9ddff'},
    orange: {code: 'o', symbol: '▲', label: 'Orange triangle', fill: '#ffdbad'},
    purple: {code: 'p', symbol: '★', label: 'Purple star', fill: '#e5c9ff'},
  };
  function countsFor(c, total) {
    const counts = c.conditions.map(x => total * x.numerator / x.denominator);
    if (counts.some(x => !Number.isInteger(x)) || counts.reduce((a, b) => a + b, 0) > total) return null;
    if (c.conditions.length === c.colours.length && counts.reduce((a, b) => a + b, 0) !== total) return null;
    return counts;
  }
  function isValidConfig(c) {
    return Boolean(c && c.layout === 'design-chance' && ['bag', 'spinner'].includes(c.kind) &&
      Array.isArray(c.colours) && c.colours.length >= 2 && c.colours.length <= 3 &&
      c.colours.every(x => Object.hasOwn(palette, x)) && new Set(c.colours).size === c.colours.length &&
      Array.isArray(c.totals) && c.totals.length >= 1 && c.totals.length <= 4 &&
      c.totals.every(n => Number.isInteger(n) && n >= 2 && n <= 12) && new Set(c.totals).size === c.totals.length &&
      Array.isArray(c.conditions) && c.conditions.length >= 1 && c.conditions.length <= 2 &&
      c.conditions.every(x => x && c.colours.includes(x.colour) && Number.isInteger(x.numerator) &&
        Number.isInteger(x.denominator) && x.denominator >= 1 && x.denominator <= 12 &&
        x.numerator >= 0 && x.numerator <= x.denominator) &&
      new Set(c.conditions.map(x => x.colour)).size === c.conditions.length &&
      c.totals.some(n => countsFor(c, n) !== null));
  }
  function validCells(c, cells) {
    return typeof cells === 'string' && c.totals.includes(cells.length) &&
      [...cells].every(x => x === '.' || c.colours.some(colour => palette[colour].code === x));
  }
  const initial = c => ({cells: '.'.repeat(c.totals[0]), undo: []});
  function parseTokens(c, tokens) {
    if (!isValidConfig(c) || !Array.isArray(tokens) || tokens.length !== 1 ||
        typeof tokens[0] !== 'string' || tokens[0].length > 800) return null;
    let a;
    try { a = JSON.parse(tokens[0]); } catch { return null; }
    if (!a || Object.keys(a).length !== 2 || !validCells(c, a.cells) || !Array.isArray(a.undo) ||
        a.undo.length > MAX_UNDO || a.undo.some(cells => !validCells(c, cells))) return null;
    return {cells: a.cells, undo: [...a.undo]};
  }
  function solution(c) {
    if (!isValidConfig(c)) return null;
    const total = c.totals.find(n => countsFor(c, n) !== null);
    const counts = countsFor(c, total);
    let cells = c.conditions.map((x, i) => palette[x.colour].code.repeat(counts[i])).join('');
    const other = c.colours.find(colour => !c.conditions.some(x => x.colour === colour));
    if (other) cells += palette[other].code.repeat(total - cells.length);
    return cells;
  }
  function fraction(x) {
    if (x.numerator === 0) return 'impossible (0)';
    if (x.numerator === x.denominator) return 'certain (1)';
    return `${x.numerator}/${x.denominator}`;
  }
  function requirements(c) {
    return c.conditions.map(x => `Chance of ${palette[x.colour].label.toLowerCase()}: ${fraction(x)}`);
  }
  function describe(c, cells) {
    const counts = c.colours.map(colour => `${palette[colour].label}: ${[...cells].filter(x => x === palette[colour].code).length}/${cells.length}`);
    return `${c.kind === 'bag' ? 'Bag slots' : 'Spinner sectors clockwise from the top'}: ${[...cells].map(x => Object.values(palette).find(p => p.code === x)?.label || 'empty').join(', ')}. ${counts.join('; ')}.`;
  }
  function evaluate(c, tokens) {
    const a = parseTokens(c, tokens);
    if (!a) return {complete: false, isCorrect: false, value: '', feedback: 'This design could not be read.'};
    if (a.cells.includes('.')) return {complete: false, isCorrect: false, value: '', feedback: 'Fill every space before checking your design.'};
    const results = c.conditions.map(x => {
      const count = [...a.cells].filter(code => code === palette[x.colour].code).length;
      return {correct: count * x.denominator === a.cells.length * x.numerator,
        text: `${palette[x.colour].label}: ${count}/${a.cells.length} (target ${fraction(x)}).`};
    });
    const isCorrect = results.every(x => x.correct);
    return {complete: true, isCorrect, value: describe(c, a.cells),
      feedback: results.map(x => x.text).join(' ') + (isCorrect ? ' Your design meets every target!' :
        ' Count the matching spaces out of all spaces. Each space is equally likely.' +
        (c.totals.length > 1 ? ' You may need a different total so every required count is a whole number.' : ''))};
  }
  const pick = xs => xs[Math.floor(Math.random() * xs.length)];
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  const condition = (colour, n, d) => { const g = gcd(n, d); return {colour, numerator: n / g, denominator: d / g}; };
  function createEntry(level) {
    if (!Number.isInteger(level) || level < 1 || level > 9) return null;
    const colours = level >= 6 ? ['blue', 'orange', 'purple'] : ['blue', 'orange'];
    const kind = level <= 4 ? 'bag' : pick(['bag', 'spinner']);
    const total = level <= 4 ? 6 : pick(level >= 8 ? [6, 8, 12] : [4, 6, 8]);
    const first = pick(colours);
    const count = level <= 2 ? pick([0, total]) : level === 3 ? pick([2, 3, 4]) :
      1 + Math.floor(Math.random() * (total - (level >= 6 ? 2 : 1)));
    const conditions = [condition(first, count, total)];
    if (level >= 6) conditions.push(condition(pick(colours.filter(x => x !== first)), 1 + Math.floor(Math.random() * (total - count - 1)), total));
    const c = {layout: 'design-chance', kind, colours, totals: level >= 8 ? [4, 6, 8, 12] : [total], conditions};
    const instructions = `${c.totals.length > 1 ? 'Choose a total that works, then fill' : 'Fill'} all ${c.totals.length > 1 ? 'spaces' : total + ' spaces'}. ${requirements(c).join('; ')}. ` +
      (kind === 'bag' ? 'Each counter is equally likely to be drawn.' : 'All sectors are equal in size and equally likely.');
    const answer = `One possible design: ${describe(c, solution(c))}`;
    return {mode: 'interactive', difficulty: level, category: 'probability', skill: 'design-chance',
      contentId: `design-chance-${level}-${kind}-${total}-${conditions.map(x => `${x.colour}-${x.numerator}-${x.denominator}`).join('-')}`,
      question: 'Design the chance', interactive: c, answer, answerLabel: answer,
      extraText: instructions, reviewText: instructions,
      explanation: 'Probability is the number of matching spaces divided by the total number of equally likely spaces. Different arrangements can have the same probability.',
      hints: ['Every space must be filled. Use the symbols to tell the colours apart.',
        level <= 2 ? 'Impossible means no matching spaces. Certain means every space matches.' : 'Split the total into equal groups using the denominator. The numerator tells you how many groups should match.',
        level >= 8 ? 'Choose a total divisible by both denominators, then check both targets.' : 'Count matching spaces and all spaces. Their fraction must equal the target.'],
    };
  }
  return {MAX_UNDO, palette, isValidConfig, initial, parseTokens, solution, requirements, describe, evaluate, createEntry};
})();
