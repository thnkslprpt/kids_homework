// E08: grade the geometry of a construction, never its resemblance to an example.
globalThis.HomeworkShapeArchitect = (() => {
  const MAX_UNDO = 40;
  function neighbours(size, index) {
    const row = Math.floor(index / size), col = index % size;
    return [row > 0 ? index - size : -1, row < size - 1 ? index + size : -1,
      col > 0 ? index - 1 : -1, col < size - 1 ? index + 1 : -1].filter(i => i >= 0);
  }
  function measure(size, cells) {
    const filled = new Set([...cells].flatMap((v, i) => v === '1' ? [i] : []));
    let perimeter = 0, components = 0;
    for (const i of filled) perimeter += 4 - neighbours(size, i).filter(n => filled.has(n)).length;
    const remaining = new Set(filled);
    while (remaining.size) {
      components++;
      const pending = [remaining.values().next().value];
      remaining.delete(pending[0]);
      while (pending.length) for (const n of neighbours(size, pending.pop())) {
        if (remaining.delete(n)) pending.push(n);
      }
    }
    return {area: filled.size, perimeter, components};
  }
  function mirror(size, index, axis) {
    return axis === 'vertical' ? Math.floor(index / size) * size + size - 1 - index % size :
      (size - 1 - Math.floor(index / size)) * size + index % size;
  }
  function symmetric(c, cells) {
    return !c.symmetry || [...cells].every((value, i) => value === cells[mirror(c.size, i, c.symmetry)]);
  }
  function validCells(c, cells) {
    return typeof cells === 'string' && cells.length === c.size * c.size && /^[01]+$/.test(cells) &&
      c.blocked.every(i => cells[i] === '0');
  }
  function meetsConstraints(c, cells) {
    const totals = measure(c.size, cells);
    return totals.area === c.area && totals.components === 1 &&
      (c.perimeter === null || totals.perimeter === c.perimeter) && symmetric(c, cells);
  }
  function isValidConfig(c) {
    if (!c || c.layout !== 'shape-architect' || ![4, 5].includes(c.size) ||
        !Number.isInteger(c.area) || c.area < 1 || c.area > c.size * c.size ||
        !(c.perimeter === null || (Number.isInteger(c.perimeter) && c.perimeter >= 4 && c.perimeter <= 4 * c.area)) ||
        ![null, 'vertical', 'horizontal'].includes(c.symmetry) || !Array.isArray(c.blocked) ||
        c.blocked.length >= c.size * c.size || new Set(c.blocked).size !== c.blocked.length ||
        c.blocked.some(i => !Number.isInteger(i) || i < 0 || i >= c.size * c.size)) return false;
    // A saved witness also proves every generated or restored prompt is achievable.
    return validCells(c, c.example) && meetsConstraints(c, c.example);
  }
  const initial = c => ({cells: '0'.repeat(c.size * c.size), undo: []});
  function parseTokens(c, tokens) {
    if (!isValidConfig(c) || !Array.isArray(tokens) || tokens.length !== 1 ||
        typeof tokens[0] !== 'string' || tokens[0].length > 300) return null;
    let answer;
    try { answer = JSON.parse(tokens[0]); } catch { return null; }
    if (!answer || Object.keys(answer).length !== 2 || !validCells(c, answer.cells) ||
        !Array.isArray(answer.undo) || answer.undo.length > MAX_UNDO ||
        answer.undo.some(i => !Number.isInteger(i) || i < 0 || i >= c.size * c.size || c.blocked.includes(i))) return null;
    return {cells: answer.cells, undo: [...answer.undo]};
  }
  function describe(c, cells) {
    const totals = measure(c.size, cells);
    const rows = Array.from({length: c.size}, (_, r) => cells.slice(r * c.size, (r + 1) * c.size));
    return `Rows top to bottom (1 = filled, 0 = empty): ${rows.join(' / ')}. Area: ${totals.area} square units; perimeter: ${totals.perimeter} units; ${totals.components} connected component${totals.components === 1 ? '' : 's'}.`;
  }
  function evaluate(c, tokens) {
    const answer = parseTokens(c, tokens);
    if (!answer) return {complete: false, isCorrect: false, value: '', feedback: 'This board could not be read.'};
    const totals = measure(c.size, answer.cells);
    if (!totals.area) return {complete: false, isCorrect: false, value: '', feedback: 'Fill some squares before checking your shape.'};
    const isCorrect = meetsConstraints(c, answer.cells);
    const feedback = [`Area: ${totals.area} square units (target ${c.area}).`,
      `Perimeter: ${totals.perimeter} units${c.perimeter === null ? '' : ` (target ${c.perimeter})`}.`,
      `${totals.components} connected component${totals.components === 1 ? '' : 's'} (target 1).`];
    if (c.symmetry) feedback.push(symmetric(c, answer.cells) ? `Symmetry: matches across the ${c.symmetry} line.` : `Symmetry: some cells do not match across the ${c.symmetry} line.`);
    if (totals.components !== 1) feedback.push('Join the parts along shared edges; touching corners does not connect them.');
    feedback.push(isCorrect ? 'Your shape meets every requirement!' : 'Count filled squares for area and exposed unit edges for perimeter.');
    return {complete: true, isCorrect, value: describe(c, answer.cells), feedback: feedback.join(' ')};
  }
  const pick = values => values[Math.floor(Math.random() * values.length)];
  function createEntry(level) {
    if (!Number.isInteger(level) || level < 2 || level > 9) return null;
    const size = level >= 6 ? 5 : 4;
    const symmetry = level >= 6 ? pick(['vertical', 'horizontal']) : null;
    const filled = new Set([symmetry ? 12 : Math.floor(Math.random() * size * size)]);
    const steps = 1 + Math.floor(Math.random() * (level <= 3 ? 6 : 8));
    for (let step = 0; step < steps; step++) {
      const frontier = [...new Set([...filled].flatMap(i => neighbours(size, i)))].filter(i => !filled.has(i));
      const index = pick(frontier);
      filled.add(index);
      if (symmetry) filled.add(mirror(size, index, symmetry));
    }
    const example = Array.from({length: size * size}, (_, i) => filled.has(i) ? '1' : '0').join('');
    const totals = measure(size, example);
    const blocked = [];
    if (level >= 8) {
      const available = [...example].flatMap((v, i) => v === '0' ? [i] : []);
      for (let i = 0; i < (level === 9 ? 3 : 2) && available.length; i++) {
        const index = pick(available);
        blocked.push(index);
        available.splice(available.indexOf(index), 1);
      }
    }
    const c = {layout: 'shape-architect', size, area: totals.area, perimeter: level >= 4 ? totals.perimeter : null, symmetry, blocked, example};
    const requirements = [`Area ${c.area} square units`, 'one shape connected by shared edges'];
    if (c.perimeter !== null) requirements.push(`perimeter ${c.perimeter} units`);
    if (symmetry) requirements.push(`symmetry across the marked ${symmetry} line`);
    if (blocked.length) requirements.push('leave the × squares empty');
    const answer = `One example: ${describe(c, example)}`;
    return {mode: 'interactive', difficulty: level, category: 'geometry', skill: 'shape-architect',
      contentId: `shape-architect-${level}-${example}-${symmetry}-${blocked.join('-')}`,
      question: 'Shape architect', interactive: c, answer, answerLabel: answer,
      extraText: requirements.join('; ') + '.', reviewText: requirements.join('; ') + '.',
      explanation: 'Each filled square adds one square unit of area. Only exposed edges count toward perimeter, including edges around holes. Shared edges connect squares; corners alone do not.',
      hints: ['Count filled squares for area. Make a path between every pair of filled squares using shared edges.',
        c.perimeter !== null ? 'Count only edges next to an empty square or the outside of the board. Shared edges do not count.' : 'Try starting with a short row and adding squares that share an edge.',
        symmetry ? 'Match every filled square with its reflection across the marked line. Squares on the line reflect onto themselves.' : 'Different arrangements can work. You do not need to copy a particular shape.'],
    };
  }
  return {MAX_UNDO, measure, isValidConfig, initial, parseTokens, describe, evaluate, createEntry};
})();
