// Replay a bounded list of operations; never trust a saved result or execute equation text.
globalThis.HomeworkEquationBalance = (() => {
  const MAX_MOVES = 40;
  const LIMIT = 1000000;
  const operations = {
    add: 'Add', subtract: 'Subtract', multiply: 'Multiply by', divide: 'Divide by',
    'add-x': 'Add', 'subtract-x': 'Subtract',
  };
  function fraction(n, d = 1) {
    if (!Number.isSafeInteger(n) || !Number.isSafeInteger(d) || d === 0) throw new Error('Invalid fraction');
    if (d < 0) { n = -n; d = -d; }
    let a = Math.abs(n), b = d;
    while (b) [a, b] = [b, a % b];
    const value = {n: n / a, d: d / a};
    if (Math.abs(value.n) > LIMIT || value.d > LIMIT) throw new Error('Number limit');
    return value;
  }
  const add = (a, b) => fraction(a.n * b.d + b.n * a.d, a.d * b.d);
  const multiply = (a, b) => fraction(a.n * b.n, a.d * b.d);
  const is = (a, n) => a.n === n * a.d;
  const format = a => a.d === 1 ? String(a.n) : `${a.n}/${a.d}`;
  function parseAmount(text) {
    if (typeof text !== 'string' || text.length > 24) return null;
    const match = text.trim().match(/^([+-]?\d+)(?:\s*\/\s*(\d+))?$/);
    if (!match) return null;
    try { return fraction(Number(match[1]), match[2] === undefined ? 1 : Number(match[2])); }
    catch { return null; }
  }
  function isValidConfig(c) {
    const side = s => s && Number.isInteger(s.a) && s.a >= 0 && s.a <= 12 &&
      Number.isInteger(s.b) && Math.abs(s.b) <= 200;
    if (!c || c.layout !== 'equation-balance' || !side(c.left) || !side(c.right) ||
        c.left.a === c.right.a || typeof c.visual !== 'boolean') return false;
    const solution = (c.right.b - c.left.b) / (c.left.a - c.right.a);
    return Number.isInteger(solution) && solution > 0 && solution <= 30;
  }
  function initial() { return {moves: [], amount: '1'}; }
  function start(c) {
    return {left: {a: fraction(c.left.a), b: fraction(c.left.b)},
      right: {a: fraction(c.right.a), b: fraction(c.right.b)}};
  }
  function formatSide(s, symbol = 'x') {
    let text = is(s.a, 0) ? '' : is(s.a, 1) ? symbol : is(s.a, -1) ? `−${symbol}` :
      `${s.a.d === 1 ? format(s.a) : `(${format(s.a)})`}${symbol}`;
    if (!is(s.b, 0) || !text) {
      if (!text) text = format(s.b);
      else text += ` ${s.b.n < 0 ? '−' : '+'} ${format(fraction(Math.abs(s.b.n), s.b.d))}`;
    }
    return text;
  }
  const formatEquation = (e, symbol = 'x') => `${formatSide(e.left, symbol)} = ${formatSide(e.right, symbol)}`;
  function solved(e) {
    const isolated = (left, right) => is(left.a, 1) && is(left.b, 0) && is(right.a, 0);
    return isolated(e.left, e.right) || isolated(e.right, e.left);
  }
  function distance(e) {
    const sideDistance = (l, r) => Math.abs(l.a.n / l.a.d - 1) + Math.abs(l.b.n / l.b.d) + Math.abs(r.a.n / r.a.d);
    return Math.min(sideDistance(e.left, e.right), sideDistance(e.right, e.left));
  }
  function applyMove(e, move) {
    const fail = feedback => ({ok: false, feedback});
    if (!move || !Object.hasOwn(operations, move.op)) return fail('Choose an operation from the cards.');
    const amount = parseAmount(move.value);
    if (!amount) return fail('Enter a whole number or a fraction such as 3/2, with a nonzero denominator.');
    if (is(amount, 0) && move.op === 'divide') return fail('Division by zero is undefined. The equation has not changed.');
    if (is(amount, 0) && move.op === 'multiply') return fail('Multiplying by zero loses the information about the solution. The equation has not changed.');
    try {
      const transform = side => {
        if (move.op === 'multiply' || move.op === 'divide') {
          const factor = move.op === 'divide' ? fraction(amount.d, amount.n) : amount;
          return {a: multiply(side.a, factor), b: multiply(side.b, factor)};
        }
        const delta = move.op.startsWith('subtract') ? fraction(-amount.n, amount.d) : amount;
        return move.op.endsWith('-x') ? {a: add(side.a, delta), b: side.b} : {a: side.a, b: add(side.b, delta)};
      };
      const equation = {left: transform(e.left), right: transform(e.right)};
      const feedback = solved(equation) ? 'Balanced, with the unknown isolated! Check your solution when you are ready.' :
        distance(equation) < distance(e) ? 'Equality is preserved. Keep working toward one unknown on its own.' :
        'This is a legal move: equality is preserved, but the unknown is not closer to being isolated. You can undo or keep exploring.';
      return {ok: true, equation, feedback};
    } catch {
      return fail('That legal operation would make the numbers too large for this activity. Undo a move or try smaller numbers.');
    }
  }
  function moveLabel(move, symbol = 'x') {
    const amount = parseAmount(move.value);
    const value = amount ? format(amount) : move.value;
    const preposition = move.op.startsWith('subtract') ? 'from' : ['multiply', 'divide'].includes(move.op) ? 'on' : 'to';
    return `${operations[move.op]} ${value}${move.op.endsWith('-x') ? symbol : ''} ${preposition} both sides`;
  }
  function replay(c, moves) {
    if (!isValidConfig(c) || !Array.isArray(moves) || moves.length > MAX_MOVES) return null;
    let equation = start(c);
    const history = [{equation}];
    for (const move of moves) {
      if (!move || Object.keys(move).length !== 2 || typeof move.value !== 'string') return null;
      const result = applyMove(equation, move);
      if (!result.ok) return null;
      equation = result.equation;
      history.push({move, equation});
    }
    return {equation, history};
  }
  function parseTokens(c, tokens) {
    if (!Array.isArray(tokens) || tokens.length !== 1 || typeof tokens[0] !== 'string' || tokens[0].length > 6000) return null;
    let answer;
    try { answer = JSON.parse(tokens[0]); } catch { return null; }
    if (!answer || Object.keys(answer).length !== 2 || typeof answer.amount !== 'string' || answer.amount.length > 24 ||
        !Array.isArray(answer.moves) || !replay(c, answer.moves)) return null;
    return {moves: answer.moves.map(m => ({op: m.op, value: m.value})), amount: answer.amount};
  }
  function evaluate(c, tokens) {
    const answer = parseTokens(c, tokens);
    const incomplete = feedback => ({complete: false, isCorrect: false, value: '', feedback});
    if (!answer) return incomplete('These moves could not be read.');
    const result = replay(c, answer.moves);
    if (!answer.moves.length || !solved(result.equation)) return incomplete('The equation is still balanced. Keep going until one unknown is alone on one side, with only a number on the other.');
    const value = result.history.map((row, i) => i ? `${moveLabel(row.move)} → ${formatEquation(row.equation)}` : formatEquation(row.equation)).join('; ');
    return {complete: true, isCorrect: true, value,
      feedback: 'You isolated the unknown using equivalent equations. Each move applied the same operation to both sides, preserving the solution.'};
  }
  function createEntry(level) {
    if (!Number.isInteger(level) || level < 3 || level > 9) return null;
    const {randomInt} = globalThis.HomeworkQuestionUtils;
    const solution = randomInt(1, level <= 4 ? 6 : 12);
    const a = level === 3 ? 1 : randomInt(2, level <= 5 ? 4 : 8);
    const b = level === 4 ? 0 : randomInt(1, level <= 5 ? 5 : 12) * (level >= 6 && randomInt(0, 1) ? -1 : 1);
    const rightA = level >= 7 ? randomInt(1, level >= 9 ? a + 2 : a - 1) : 0;
    // Avoid identities: every prompt has exactly one known positive integer solution.
    const leftA = rightA === a ? a + 1 : a;
    const c = {layout: 'equation-balance', left: {a: leftA, b}, right: {a: rightA, b: (leftA - rightA) * solution + b}, visual: level <= 4};
    const equation = formatEquation(start(c));
    return {mode: 'interactive', difficulty: level, category: 'algebra', skill: 'equation-balance',
      contentId: `equation-balance-${level}-${leftA}-${b}-${rightA}-${solution}`,
      question: 'Keep the equation balanced', interactive: c,
      answer: `x = ${solution}`, answerLabel: `x = ${solution}`,
      reviewText: `Starting equation: ${equation}.`,
      extraText: c.visual ? 'Every mystery box holds the same unknown number. Keep both sides equal until one box is alone.' :
        'Apply the same operation to both sides until x is alone. Different legal solution paths are welcome.',
      explanation: 'Adding or subtracting the same quantity on both sides preserves equality. Multiplying or dividing both sides by a nonzero number also preserves the solution.',
      hints: ['Remove a constant by doing the opposite operation to both sides.',
        rightA ? 'You can subtract the same number of x terms from both sides, then isolate the remaining x.' :
          'Once only a multiple of x remains on one side, divide both sides by that coefficient.'],
    };
  }
  return {MAX_MOVES, operations, format, isValidConfig, initial, parseAmount, formatEquation, solved, applyMove, moveLabel, replay, parseTokens, evaluate, createEntry};
})();
