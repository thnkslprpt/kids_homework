// E12: compare finite canonical sets while keeping repeats visible to the learner.
globalThis.HomeworkPossibilities = (() => {
  const MAX_UNDO = 20, MAX_CARDS = 8;
  const items = {
    stripe: {label: 'Striped shirt', icon: '▤', group: 'shirt'},
    dot: {label: 'Dotted shirt', icon: '⠿', group: 'shirt'},
    plain: {label: 'Plain shirt', icon: '□', group: 'shirt'},
    cap: {label: 'Cap', icon: '🧢', group: 'hat'},
    sun: {label: 'Sun hat', icon: '👒', group: 'hat'},
    wool: {label: 'Wool hat', icon: '❄', group: 'hat'},
    star: {label: 'Star badge', icon: '★', group: 'badge'},
    moon: {label: 'Moon badge', icon: '☾', group: 'badge'},
    heart: {label: 'Heart badge', icon: '♥', group: 'badge'},
    diamond: {label: 'Diamond badge', icon: '◆', group: 'badge'},
  };
  const canonical = (c, pair) => c.kind === 'unordered' ? [...pair].sort().join('') : pair;
  function validPair(c, pair) {
    return typeof pair === 'string' && /^[0-3]{2}$/.test(pair) && Number(pair[0]) < c.left.length && Number(pair[1]) < c.right.length;
  }
  function allowed(c, pair) {
    return (c.kind === 'outfits' || pair[0] !== pair[1]) && !c.excluded.includes(canonical(c, pair));
  }
  function enumerate(c) {
    const pairs = new Set();
    c.left.forEach((_, a) => c.right.forEach((_, b) => {
      const pair = `${a}${b}`;
      if (allowed(c, pair)) pairs.add(canonical(c, pair));
    }));
    return [...pairs];
  }
  function isValidConfig(c) {
    if (!c || c.layout !== 'find-every-possibility' || !['outfits','ordered','unordered'].includes(c.kind) ||
        ![c.left,c.right].every(row => Array.isArray(row) && row.length >= 2 && row.length <= 4 &&
          row.every(id => Object.hasOwn(items,id)) && new Set(row).size === row.length) ||
        !Array.isArray(c.excluded) || c.excluded.length > 1 ||
        !c.excluded.every(pair => validPair(c,pair) && canonical(c,pair) === pair && (c.kind === 'outfits' || pair[0] !== pair[1]))) return false;
    if (c.kind === 'outfits') {
      if (!c.left.every(id => items[id].group === 'shirt') || !c.right.every(id => items[id].group === 'hat')) return false;
    } else if (c.left.join(',') !== c.right.join(',') || !c.left.every(id => items[id].group === 'badge')) return false;
    const size = enumerate(c).length;
    return size >= 3 && size <= 6;
  }
  const initial = () => ({pairs: [], selected: [-1,-1], undo: []});
  function parseTokens(c, tokens) {
    if (!isValidConfig(c) || !Array.isArray(tokens) || tokens.length !== 1 || typeof tokens[0] !== 'string' || tokens[0].length > 1000) return null;
    let a;
    try { a = JSON.parse(tokens[0]); } catch { return null; }
    const validTray = pairs => Array.isArray(pairs) && pairs.length <= MAX_CARDS && pairs.every(pair => validPair(c,pair));
    if (!a || Object.keys(a).length !== 3 || !validTray(a.pairs) ||
        !Array.isArray(a.selected) || a.selected.length !== 2 ||
        !a.selected.every((n,i) => Number.isInteger(n) && n >= -1 && n < (i ? c.right : c.left).length) ||
        !Array.isArray(a.undo) || a.undo.length > MAX_UNDO ||
        !a.undo.every(value => typeof value === 'string' && validTray(value ? value.split(',') : []))) return null;
    return {pairs: [...a.pairs], selected: [...a.selected], undo: [...a.undo]};
  }
  const solution = c => isValidConfig(c) ? enumerate(c) : null;
  function describePair(c, pair) {
    return `${items[c.left[Number(pair[0])]].label}${c.kind === 'ordered' ? ' → ' : ' + '}${items[c.right[Number(pair[1])]].label}`;
  }
  const describe = (c, pairs) => pairs.map(pair => describePair(c,pair)).join('; ');
  function requirements(c) {
    const text = c.kind === 'outfits'
      ? 'Choose one shirt and one hat for each outfit. List every outfit once. Choosing the hat first does not make a different outfit.'
      : c.kind === 'ordered'
        ? 'Choose two different badges for a line. First and second positions matter: swapping the badges makes a different line. List every line once.'
        : 'Choose two different badges for a collection. Order does not matter: swapping the badges makes the same collection. List every collection once.';
    return text + (c.excluded.length ? ` Rule: do not include ${describePair(c,c.excluded[0])}.` : '');
  }
  function evaluate(c, tokens) {
    const a = parseTokens(c,tokens);
    if (!a) return {complete:false,isCorrect:false,value:'',feedback:'This collection could not be read.'};
    if (!a.pairs.length) return {complete:false,isCorrect:false,value:'',feedback:'Add a possibility before checking your collection.'};
    const expected = solution(c), keys = a.pairs.map(pair => canonical(c,pair));
    const repeats = keys.length - new Set(keys).size;
    const forbidden = a.pairs.filter(pair => !allowed(c,pair));
    const missing = expected.filter(pair => !keys.includes(pair));
    const feedback = [];
    if (repeats) feedback.push(`${repeats} repeated ${repeats === 1 ? 'card' : 'cards'}: each possibility belongs only once.`);
    if (forbidden.length) feedback.push(`${describePair(c,forbidden[0])} breaks the rule. ${requirements(c)}`);
    if (missing.length) feedback.push(`${missing.length} ${missing.length === 1 ? 'possibility is' : 'possibilities are'} missing. Check the combinations involving ${items[c.left[Number(missing[0][0])]].label.toLowerCase()}.`);
    const isCorrect = !repeats && !forbidden.length && !missing.length;
    if (isCorrect) feedback.push(`You found all ${expected.length} possibilities exactly once! Grouping by one item helps show that none are missing.`);
    return {complete:true,isCorrect,value:describe(c,a.pairs),feedback:feedback.join(' ')};
  }
  const shuffle = values => {
    const copy = [...values];
    for (let i=copy.length-1;i>0;i--) { const j=Math.floor(Math.random()*(i+1)); [copy[i],copy[j]]=[copy[j],copy[i]]; }
    return copy;
  };
  function createEntry(level) {
    if (!Number.isInteger(level) || level < 2 || level > 8) return null;
    const kind = level <= 5 ? 'outfits' : level === 6 ? 'ordered' : 'unordered';
    const left = kind === 'outfits' ? shuffle(['stripe','dot','plain']).slice(0,2) : shuffle(['star','moon','heart','diamond']).slice(0,kind === 'ordered' ? 3 : 4);
    const right = kind === 'outfits' ? shuffle(['cap','sun','wool']).slice(0,level === 2 ? 2 : 3) : [...left];
    const c = {layout:'find-every-possibility',kind,left,right,excluded:[]};
    if ([4,5,8].includes(level)) {
      const pairs = enumerate(c);
      c.excluded = [pairs[Math.floor(Math.random()*pairs.length)]];
    }
    const answer = `Complete collection: ${describe(c,solution(c))}.`;
    return {mode:'interactive',difficulty:level,category:'probability',skill:'find-every-possibility',
      contentId:`find-every-possibility-${level}-${kind}-${left.join('-')}-${right.join('-')}-${c.excluded.join('-')}`,
      question:'Find every possibility',interactive:c,answer,answerLabel:answer,
      extraText:requirements(c),reviewText:requirements(c),
      explanation:'Work systematically: keep one item fixed, find each allowed partner, then move to the next item. Check for repeats and exclusions.',
      hints:['Keep one choice fixed and try each allowed partner before moving on.',
        kind === 'ordered' ? 'Swapping first and second makes a new line. A badge cannot be used twice in one line.' :
        kind === 'unordered' ? 'A reversed pair is already in your collection. Each pair needs two different badges.' : 'Group your outfits by shirt, then check each hat.',
        c.excluded.length ? 'Leave out the forbidden pair, but keep every other allowed pair.' : 'Review each group to make sure nothing is missing or repeated.']};
  }
  return {MAX_UNDO,MAX_CARDS,items,canonical,isValidConfig,initial,parseTokens,solution,describePair,describe,requirements,evaluate,createEntry};
})();
