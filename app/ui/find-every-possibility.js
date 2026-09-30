function renderPossibilitiesQuestion(question, config, {readOnly = false, selectedTokens = []} = {}) {
  const model = globalThis.HomeworkPossibilities;
  if (!model?.isValidConfig(config)) return;
  const answer = model.parseTokens(config,selectedTokens) || model.initial();
  const tokens = () => [JSON.stringify(answer)];
  const make = (tag, className, text = '') => {
    const el = document.createElement(tag);
    el.className = className;
    el.textContent = text;
    return el;
  };
  const button = (className, text, action) => {
    const el = make('button',className,text);
    el.type = 'button';
    el.disabled = readOnly;
    if (!readOnly) el.addEventListener('click',action);
    return el;
  };
  const shell = make('div','interactive-question possibilities-question');
  shell.dir = 'ltr';
  shell.appendChild(make('p','possibilities-rules',model.requirements(config)));
  shell.appendChild(make('p','',readOnly ? 'Your submitted collection:' : 'Choose one item from each row, then Add. Tap a card to remove it. Check when you think you have found them all.'));
  const rows = [config.left,config.right].map((ids,row) => {
    const group = make('fieldset','possibilities-choices');
    const title = config.kind === 'outfits' ? (row ? 'Choose a hat' : 'Choose a shirt') :
      config.kind === 'ordered' ? (row ? 'Second badge' : 'First badge') : (row ? 'Other badge' : 'One badge');
    group.appendChild(make('legend','',title));
    ids.forEach((id,index) => {
      const item = model.items[id];
      const el = button('secondary-button possibilities-choice',`${item.icon} ${item.label}`,() => {
        answer.selected[row] = index;
        sync(true);
      });
      el.dataset.row = row;
      el.dataset.index = index;
      el.setAttribute('aria-label',`${title}: ${item.label}`);
      group.appendChild(el);
    });
    shell.appendChild(group);
    return group;
  });
  const add = button('secondary-button possibilities-add','Add possibility',() => {
    if (answer.selected.includes(-1) || answer.pairs.length >= model.MAX_CARDS) return;
    change([...answer.pairs,answer.selected.join('')]);
  });
  shell.appendChild(add);
  const tray = make('div','possibilities-tray');
  tray.setAttribute('role','group');
  tray.setAttribute('aria-label','Your collection; activate a card to remove it');
  shell.appendChild(tray);
  const undo = button('secondary-button possibilities-undo','Undo last tray change',() => {
    if (!answer.undo.length) return;
    const previous = answer.undo.pop();
    answer.pairs = previous ? previous.split(',') : [];
    sync(true);
  });
  shell.appendChild(undo);
  const status = make('p','interactive-status possibilities-status');
  status.setAttribute('role','status');
  status.setAttribute('aria-live','polite');
  shell.appendChild(status);
  if (!readOnly) shell.appendChild(button('primary-button interactive-check-button','Check collection',() => {
    const result = model.evaluate(config,tokens());
    if (!result.complete) { status.textContent = result.feedback; return; }
    question.explanation = result.feedback;
    handleAnswer(question,result.isCorrect,result.value,{tokens:tokens()});
  }));
  elements.choicesArea.appendChild(shell);
  function change(pairs) {
    answer.undo.push(answer.pairs.join(','));
    if (answer.undo.length > model.MAX_UNDO) answer.undo.shift();
    answer.pairs = pairs;
    sync(true);
  }
  function sync(save = false) {
    rows.forEach((group,row) => [...group.querySelectorAll('button')].forEach((el,index) => {
      el.setAttribute('aria-pressed',String(answer.selected[row] === index));
    }));
    tray.replaceChildren();
    if (!answer.pairs.length) tray.appendChild(make('p','','Your collection is empty.'));
    answer.pairs.forEach((pair,index) => {
      const label = model.describePair(config,pair);
      const card = button('secondary-button possibilities-card',`${label}${readOnly ? '' : ' ×'}`,() => {
        change(answer.pairs.filter((_,i) => i !== index));
        const remaining = tray.querySelectorAll('button');
        (remaining[Math.min(index,remaining.length-1)] || add).focus();
      });
      card.dataset.pair = pair;
      card.setAttribute('aria-label',readOnly ? label : `Remove card ${index+1}: ${label}`);
      tray.appendChild(card);
    });
    add.disabled = readOnly || answer.selected.includes(-1) || answer.pairs.length >= model.MAX_CARDS;
    undo.disabled = readOnly || !answer.undo.length;
    status.textContent = readOnly ? model.evaluate(config,tokens()).feedback :
      `${answer.pairs.length} ${answer.pairs.length === 1 ? 'card' : 'cards'} in your collection.` +
      (answer.pairs.length >= model.MAX_CARDS ? ' Tray full. Remove a card to make room.' : ' Find every allowed possibility exactly once.');
    if (!readOnly) {
      updatePendingAnswer({value:'',tokens:tokens()});
      if (save) document.dispatchEvent(new CustomEvent('homework:answer-recorded'));
    }
  }
  sync();
}
