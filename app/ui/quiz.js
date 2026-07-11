function containsHebrewText(value) {
  return /[\u0590-\u05FF]/.test(String(value || ""));
}

function getActiveRoundState() {
  return state.currentRound === "speed" ? state.speedRound : state;
}

function getMainRoundState() {
  return state;
}

function isSpeedRoundActive() {
  return state.currentRound === "speed";
}

function renderCurrentQuestion() {
  cleanupInteractiveDragState();

  if (isViewingResultsScreen()) {
    renderResultsScreen();
    return;
  }

  const round = getActiveRoundState();
  const question = round.questions[round.viewIndex];
  if (!question) {
    if (hasCompletedActiveRound()) {
      round.viewIndex = round.totalQuestions;
      if (state.currentRound === "main") {
        state.currentRound = "results";
        renderResultsScreen();
      } else {
        completeActiveRound();
      }
      return;
    }

    completeActiveRound();
    return;
  }

  const reviewingPreviousQuestion = isViewingPreviousQuestion();
  const answerSelection = round.answerSelections[round.viewIndex] || null;

  updateStatusBar();
  updateQuizNavigation();
  renderQuizFeedback();

  elements.questionNumber.textContent = reviewingPreviousQuestion
    ? `Question ${round.viewIndex + 1} (review):`
    : isSpeedRoundActive()
      ? `Speed Round ${round.viewIndex + 1} of ${SPEED_ROUND_QUESTION_COUNT}:`
      : `Question ${round.viewIndex + 1}:`;
  const questionPromptIsHebrew = containsHebrewText(question.questionText);
  const questionMainIsHebrew = Boolean(question.isHebrew) || containsHebrewText(question.displayText);
  elements.questionPrompt.textContent = question.questionText;
  elements.questionPrompt.hidden = !question.questionText;
  elements.questionPrompt.classList.toggle("hebrew", questionPromptIsHebrew);

  elements.questionMain.textContent = question.displayText;
  elements.questionMain.hidden = !question.displayText;
  elements.questionMain.classList.toggle("hebrew", questionMainIsHebrew);
  elements.questionMain.classList.toggle("compact", shouldUseCompactQuestionMain(question));

  elements.questionVisual.innerHTML = question.visualHtml || "";
  elements.questionVisual.hidden = !question.visualHtml;

  if (question.extraHtml) {
    elements.questionExtra.innerHTML = question.extraHtml;
    elements.questionExtra.hidden = false;
    elements.questionExtra.classList.toggle("hebrew", Boolean(question.isHebrew));
  } else {
    const extraText =
      reviewingPreviousQuestion && question.mode === "drag" ? "" : getVisibleQuestionExtraText(question);
    elements.questionExtra.textContent = extraText;
    elements.questionExtra.hidden = !extraText;
    elements.questionExtra.classList.toggle(
      "hebrew",
      Boolean(question.isHebrew) || containsHebrewText(extraText)
    );
  }

  if (question.mode === "input") {
    elements.answerForm.hidden = false;
    elements.inputArea.hidden = false;
    elements.choicesArea.hidden = true;
    elements.dragArea.hidden = true;
    elements.answerInput.disabled = reviewingPreviousQuestion;
    elements.answerSignButton.disabled = reviewingPreviousQuestion;
    elements.answerSubmitButton.disabled = reviewingPreviousQuestion;
    elements.answerInput.value = reviewingPreviousQuestion ? answerSelection?.value || "" : "";
    if (!reviewingPreviousQuestion && shouldAutoFocusAnswerInput()) {
      focusAnswerInput();
    }
    return;
  }

  if (question.mode === "drag") {
    elements.answerInput.value = "";
    elements.answerInput.disabled = false;
    elements.answerSignButton.disabled = false;
    elements.answerSubmitButton.disabled = false;
    elements.answerForm.hidden = true;
    elements.inputArea.hidden = true;
    elements.choicesArea.hidden = true;
    elements.dragArea.hidden = false;
    renderDragQuestion(question, {
      readOnly: reviewingPreviousQuestion,
      selectedTokens: Array.isArray(answerSelection?.tokens) ? answerSelection.tokens : [],
    });
    return;
  }

  if (question.mode === "practice") {
    elements.answerInput.value = "";
    elements.answerInput.disabled = false;
    elements.answerSignButton.disabled = false;
    elements.answerSubmitButton.disabled = false;
    elements.answerForm.hidden = true;
    elements.inputArea.hidden = true;
    elements.choicesArea.hidden = false;
    elements.dragArea.hidden = true;
    renderPracticeButtons(question, {
      readOnly: reviewingPreviousQuestion,
      selectedValue: answerSelection?.value || "",
    });
    return;
  }

  if (question.mode === "interactive") {
    elements.answerInput.value = "";
    elements.answerInput.disabled = false;
    elements.answerSignButton.disabled = false;
    elements.answerSubmitButton.disabled = false;
    elements.answerForm.hidden = true;
    elements.inputArea.hidden = true;
    elements.choicesArea.hidden = false;
    elements.dragArea.hidden = true;
    renderInteractiveQuestion(question, {
      readOnly: reviewingPreviousQuestion,
      selectedTokens: Array.isArray(answerSelection?.tokens) ? answerSelection.tokens : [],
    });
    return;
  }

  elements.answerInput.value = "";
  elements.answerInput.disabled = false;
  elements.answerSignButton.disabled = false;
  elements.answerSubmitButton.disabled = false;
  elements.answerForm.hidden = true;
  elements.inputArea.hidden = true;
  elements.choicesArea.hidden = false;
  elements.dragArea.hidden = true;
  renderChoiceButtons(question, {
    readOnly: reviewingPreviousQuestion,
    selectedValue: answerSelection?.value || "",
  });

  if (isSpeedRoundActive() && !reviewingPreviousQuestion) {
    startSpeedRoundTimer();
  } else {
    renderSpeedRoundTimer();
  }
}

function renderInteractiveQuestion(question, { readOnly = false, selectedTokens = [] } = {}) {
  elements.choicesArea.innerHTML = "";

  const config = question.interactive && typeof question.interactive === "object"
    ? question.interactive
    : {};
  const layout = config.layout || "option-select";
  if (layout === "command-sequence") {
    renderCommandSequenceQuestion(question, config, { readOnly, selectedTokens });
    return;
  }
  if (layout === "paired-select") {
    renderPairedSelectQuestion(question, config, { readOnly, selectedTokens });
    return;
  }

  const answerIndexes = new Set(
    (Array.isArray(config.answerIndexes) ? config.answerIndexes : [])
      .map((value) => Number.parseInt(value, 10))
      .filter(Number.isFinite)
  );
  const selectedIndexes = new Set(
    (Array.isArray(selectedTokens) ? selectedTokens : [])
      .map((value) => Number.parseInt(value, 10))
      .filter(Number.isFinite)
  );
  const maxSelected = Math.max(1, Number.parseInt(config.maxSelected, 10) || answerIndexes.size || 1);
  const minSelected = Math.max(1, Number.parseInt(config.minSelected, 10) || answerIndexes.size || 1);

  const shell = document.createElement("div");
  shell.className = "interactive-question";

  if (config.prompt) {
    const prompt = document.createElement("div");
    prompt.className = "interactive-prompt";
    prompt.textContent = String(config.prompt);
    shell.appendChild(prompt);
  }

  const board = document.createElement("div");
  board.className = `interactive-board ${layout}`;
  shell.appendChild(board);

  const status = document.createElement("div");
  status.className = "interactive-status";

  const syncStatus = () => {
    if (readOnly) {
      status.textContent = selectedIndexes.size
        ? `${config.selectedLabel || "Selected"}: ${Array.from(selectedIndexes).map((index) => index + 1).join(", ")}`
        : "";
      return;
    }
    status.textContent = `${selectedIndexes.size} selected`;
  };

  const buildSelectedValue = () => {
    const labels = Array.from(selectedIndexes)
      .sort((left, right) => left - right)
      .map((index) => {
        if (layout === "option-select") {
          return config.choices?.[index]?.summary || config.choices?.[index]?.label || String(index + 1);
        }
        return config.parts?.[index]?.summary || config.parts?.[index]?.label || `Part ${index + 1}`;
      });
    return labels.join(", ");
  };

  const isSelectionCorrect = () => {
    if (selectedIndexes.size !== answerIndexes.size) {
      return false;
    }
    return Array.from(answerIndexes).every((index) => selectedIndexes.has(index));
  };

  const syncButtons = () => {
    board.querySelectorAll(".interactive-option").forEach((button) => {
      const index = Number.parseInt(button.dataset.index, 10);
      const isSelected = selectedIndexes.has(index);
      const isCorrect = answerIndexes.has(index);
      button.classList.toggle("selected", isSelected);
      if (readOnly) {
        button.disabled = true;
        button.classList.toggle("is-correct", isCorrect);
        button.classList.toggle("is-wrong", isSelected && !isCorrect);
      }
      button.setAttribute("aria-pressed", isSelected ? "true" : "false");
    });
    syncStatus();
  };

  const toggleIndex = (index) => {
    if (readOnly) {
      return;
    }
    if (layout === "option-select") {
      selectedIndexes.clear();
      selectedIndexes.add(index);
    } else if (selectedIndexes.has(index)) {
      selectedIndexes.delete(index);
    } else {
      if (selectedIndexes.size >= maxSelected) {
        const [firstIndex] = Array.from(selectedIndexes);
        selectedIndexes.delete(firstIndex);
      }
      selectedIndexes.add(index);
    }
    syncButtons();
  };

  const items = layout === "part-select" ? config.parts || [] : config.choices || [];
  items.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "interactive-option";
    button.dataset.index = String(index);
    button.disabled = readOnly;
    button.setAttribute("aria-pressed", selectedIndexes.has(index) ? "true" : "false");

    const label = document.createElement("span");
    label.className = "interactive-option-label";
    label.textContent = layout === "option-select" ? `${item?.label || OPTION_LABELS[index]})` : item?.label || String(index + 1);
    button.appendChild(label);

    const body = document.createElement("span");
    body.className = "interactive-option-body";
    if (item?.html) {
      body.innerHTML = item.html;
    } else {
      body.textContent = item?.summary || item?.label || String(index + 1);
    }
    button.appendChild(body);

    if (!readOnly) {
      button.addEventListener("click", () => toggleIndex(index));
    }
    board.appendChild(button);
  });

  if (!readOnly) {
    const checkButton = document.createElement("button");
    checkButton.type = "button";
    checkButton.className = "primary-button interactive-check-button";
    checkButton.textContent = config.checkLabel || "Check Answer";
    checkButton.addEventListener("click", () => {
      if (selectedIndexes.size < minSelected) {
        state.feedbackMessage =
          minSelected === 1 ? "Choose an answer before checking." : `Choose ${minSelected} items before checking.`;
        state.feedbackTone = "error";
        renderFeedback();
        return;
      }
      const tokens = Array.from(selectedIndexes)
        .sort((left, right) => left - right)
        .map(String);
      handleAnswer(question, isSelectionCorrect(), buildSelectedValue(), { tokens });
    });
    shell.appendChild(status);
    shell.appendChild(checkButton);
  } else {
    shell.appendChild(status);
  }

  elements.choicesArea.appendChild(shell);
  syncButtons();
}

function renderPairedSelectQuestion(question, config, { readOnly = false, selectedTokens = [] } = {}) {
  const items = Array.isArray(config.items) ? config.items : [];
  const reasons = Array.isArray(config.reasons) ? config.reasons : [];
  const answerItemIndex = Number.parseInt(config.answerItemIndex, 10);
  const answerReasonIndex = Number.parseInt(config.answerReasonIndex, 10);
  const selectedItemToken = selectedTokens.find((token) => String(token).startsWith("item:"));
  const selectedReasonToken = selectedTokens.find((token) => String(token).startsWith("reason:"));
  let selectedItemIndex = Number.parseInt(String(selectedItemToken || "").replace("item:", ""), 10);
  let selectedReasonIndex = Number.parseInt(String(selectedReasonToken || "").replace("reason:", ""), 10);

  if (!Number.isFinite(selectedItemIndex)) selectedItemIndex = -1;
  if (!Number.isFinite(selectedReasonIndex)) selectedReasonIndex = -1;

  const shell = document.createElement("div");
  shell.className = "interactive-question paired-select-question";

  if (config.prompt) {
    const prompt = document.createElement("div");
    prompt.className = "interactive-prompt";
    prompt.textContent = String(config.prompt);
    shell.appendChild(prompt);
  }

  const board = document.createElement("div");
  board.className = "paired-select-board";
  shell.appendChild(board);

  const status = document.createElement("div");
  status.className = "interactive-status";

  function selectedLabel(collection, index) {
    return collection[index]?.summary || collection[index]?.label || String(index + 1);
  }

  function buildColumn(title, collection, selectedIndex, correctIndex, group) {
    const column = document.createElement("div");
    column.className = `paired-select-column ${group}`;

    const heading = document.createElement("div");
    heading.className = "paired-select-heading";
    heading.textContent = title;
    column.appendChild(heading);

    collection.forEach((item, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "interactive-option paired-select-option";
      button.dataset.group = group;
      button.dataset.index = String(index);
      button.disabled = readOnly;

      const isSelected = index === selectedIndex;
      const isCorrect = index === correctIndex;
      button.classList.toggle("selected", isSelected);
      if (readOnly) {
        button.classList.toggle("is-correct", isCorrect);
        button.classList.toggle("is-wrong", isSelected && !isCorrect);
      }
      button.setAttribute("aria-pressed", isSelected ? "true" : "false");

      const label = document.createElement("span");
      label.className = "interactive-option-label";
      label.textContent = item?.label || String(index + 1);
      button.appendChild(label);

      const body = document.createElement("span");
      body.className = "interactive-option-body";
      if (item?.html) {
        body.innerHTML = item.html;
      } else {
        body.textContent = item?.summary || item?.label || String(index + 1);
      }
      button.appendChild(body);

      if (!readOnly) {
        button.addEventListener("click", () => {
          if (group === "items") {
            selectedItemIndex = index;
          } else {
            selectedReasonIndex = index;
          }
          sync();
        });
      }

      column.appendChild(button);
    });

    return column;
  }

  function sync() {
    board.innerHTML = "";
    board.appendChild(buildColumn(config.itemHeading || "Pick one", items, selectedItemIndex, answerItemIndex, "items"));
    board.appendChild(buildColumn(config.reasonHeading || "Pick why", reasons, selectedReasonIndex, answerReasonIndex, "reasons"));

    if (readOnly) {
      status.textContent =
        selectedItemIndex >= 0 && selectedReasonIndex >= 0
          ? `Answer: ${selectedLabel(items, selectedItemIndex)} because ${selectedLabel(reasons, selectedReasonIndex)}`
          : "";
      return;
    }

    const itemDone = selectedItemIndex >= 0 ? "item selected" : "pick an item";
    const reasonDone = selectedReasonIndex >= 0 ? "reason selected" : "pick a reason";
    status.textContent = `${itemDone}; ${reasonDone}`;
  }

  if (!readOnly) {
    const checkButton = document.createElement("button");
    checkButton.type = "button";
    checkButton.className = "primary-button interactive-check-button";
    checkButton.textContent = config.checkLabel || "Check Answer";
    checkButton.addEventListener("click", () => {
      if (selectedItemIndex < 0 || selectedReasonIndex < 0) {
        state.feedbackMessage = "Choose one item and one reason before checking.";
        state.feedbackTone = "error";
        renderFeedback();
        return;
      }

      const isCorrect = selectedItemIndex === answerItemIndex && selectedReasonIndex === answerReasonIndex;
      const selectedValue = `${selectedLabel(items, selectedItemIndex)} because ${selectedLabel(reasons, selectedReasonIndex)}`;
      handleAnswer(question, isCorrect, selectedValue, {
        tokens: [`item:${selectedItemIndex}`, `reason:${selectedReasonIndex}`],
      });
    });
    shell.appendChild(status);
    shell.appendChild(checkButton);
  } else {
    shell.appendChild(status);
  }

  elements.choicesArea.appendChild(shell);
  sync();
}

function renderCommandSequenceQuestion(question, config, { readOnly = false, selectedTokens = [] } = {}) {
  const grid = config.grid && typeof config.grid === "object" ? config.grid : {};
  const rows = Math.max(2, Math.min(6, Number.parseInt(grid.rows, 10) || 4));
  const cols = Math.max(2, Math.min(6, Number.parseInt(grid.cols, 10) || 4));
  const start = normalizeGridPoint(grid.start, rows, cols, { row: rows - 1, col: 0 });
  const treasure = normalizeGridPoint(grid.treasure, rows, cols, { row: 0, col: cols - 1 });
  const landmarks = Array.isArray(grid.landmarks) ? grid.landmarks : [];
  const answerSequence = Array.isArray(config.answerSequence)
    ? config.answerSequence.map((value) => String(value).toUpperCase()).filter(Boolean)
    : [];
  const selectedSequence = Array.isArray(selectedTokens)
    ? selectedTokens.map((value) => String(value).toUpperCase()).filter(Boolean)
    : [];
  const currentSequence = readOnly ? selectedSequence : [];
  const maxCommands = Math.max(answerSequence.length + 2, Number.parseInt(config.maxCommands, 10) || answerSequence.length + 2);
  const commandLabels = {
    N: "North",
    E: "East",
    S: "South",
    W: "West",
  };
  const commandDelta = {
    N: { row: -1, col: 0 },
    E: { row: 0, col: 1 },
    S: { row: 1, col: 0 },
    W: { row: 0, col: -1 },
  };

  const shell = document.createElement("div");
  shell.className = "interactive-question command-sequence-question";

  if (config.prompt) {
    const prompt = document.createElement("div");
    prompt.className = "interactive-prompt";
    prompt.textContent = String(config.prompt);
    shell.appendChild(prompt);
  }

  const board = document.createElement("div");
  board.className = "command-grid";
  board.style.setProperty("--command-grid-cols", String(cols));
  shell.appendChild(board);

  const sequencePanel = document.createElement("div");
  sequencePanel.className = "command-sequence-panel";
  shell.appendChild(sequencePanel);

  const actions = document.createElement("div");
  actions.className = "command-actions";

  const status = document.createElement("div");
  status.className = "interactive-status";

  function samePoint(left, right) {
    return left.row === right.row && left.col === right.col;
  }

  function pointKey(point) {
    return `${point.row},${point.col}`;
  }

  function getPath(sequence) {
    const path = [start];
    let current = start;
    sequence.forEach((command) => {
      const delta = commandDelta[command];
      if (!delta) {
        path.push(current);
        return;
      }
      const next = {
        row: Math.max(0, Math.min(rows - 1, current.row + delta.row)),
        col: Math.max(0, Math.min(cols - 1, current.col + delta.col)),
      };
      path.push(next);
      current = next;
    });
    return path;
  }

  function getLandmarkLabel(row, col) {
    const landmark = landmarks.find((item) => {
      const point = normalizeGridPoint(item, rows, cols, null);
      return point && point.row === row && point.col === col;
    });
    return landmark?.label || "";
  }

  function renderBoard() {
    board.innerHTML = "";
    const path = getPath(currentSequence);
    const pathKeys = new Set(path.map(pointKey));
    const current = path[path.length - 1] || start;

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const cellPoint = { row, col };
        const cell = document.createElement("div");
        cell.className = "command-cell";
        cell.classList.toggle("is-path", pathKeys.has(pointKey(cellPoint)));
        cell.classList.toggle("is-start", samePoint(cellPoint, start));
        cell.classList.toggle("is-treasure", samePoint(cellPoint, treasure));
        cell.classList.toggle("is-current", samePoint(cellPoint, current));

        const marker = document.createElement("span");
        marker.className = "command-cell-marker";
        if (samePoint(cellPoint, current)) {
          marker.textContent = config.robotLabel || "R";
        } else if (samePoint(cellPoint, treasure)) {
          marker.textContent = config.treasureLabel || "T";
        } else if (samePoint(cellPoint, start)) {
          marker.textContent = "S";
        } else {
          marker.textContent = getLandmarkLabel(row, col);
        }
        cell.appendChild(marker);
        board.appendChild(cell);
      }
    }
  }

  function renderSequence() {
    sequencePanel.innerHTML = "";
    const label = document.createElement("div");
    label.className = "command-sequence-label";
    label.textContent = "Commands";
    sequencePanel.appendChild(label);

    const slots = document.createElement("div");
    slots.className = "command-sequence-slots";
    const slotCount = Math.max(answerSequence.length, currentSequence.length, 1);
    for (let index = 0; index < slotCount; index += 1) {
      const slot = document.createElement("span");
      slot.className = "command-sequence-slot";
      slot.textContent = currentSequence[index] || "";
      slots.appendChild(slot);
    }
    sequencePanel.appendChild(slots);
  }

  function sync() {
    renderBoard();
    renderSequence();
    status.textContent = readOnly
      ? currentSequence.length
        ? `Answer: ${currentSequence.join(" ")}`
        : ""
      : `${currentSequence.length} command${currentSequence.length === 1 ? "" : "s"}`;
  }

  function addCommand(command) {
    if (readOnly || currentSequence.length >= maxCommands) {
      return;
    }
    currentSequence.push(command);
    sync();
  }

  if (!readOnly) {
    (Array.isArray(config.commands) ? config.commands : ["N", "E", "S", "W"]).forEach((rawCommand) => {
      const command = String(rawCommand).toUpperCase();
      if (!commandDelta[command]) {
        return;
      }
      const button = document.createElement("button");
      button.type = "button";
      button.className = "command-button";
      button.dataset.command = command;
      button.textContent = command;
      button.setAttribute("aria-label", commandLabels[command]);
      button.addEventListener("click", () => addCommand(command));
      actions.appendChild(button);
    });

    const undoButton = document.createElement("button");
    undoButton.type = "button";
    undoButton.className = "secondary-button command-edit-button";
    undoButton.textContent = "Undo";
    undoButton.addEventListener("click", () => {
      currentSequence.pop();
      sync();
    });
    actions.appendChild(undoButton);

    const clearButton = document.createElement("button");
    clearButton.type = "button";
    clearButton.className = "secondary-button command-edit-button";
    clearButton.textContent = "Clear";
    clearButton.addEventListener("click", () => {
      currentSequence.length = 0;
      sync();
    });
    actions.appendChild(clearButton);
  }

  if (!readOnly) {
    const checkButton = document.createElement("button");
    checkButton.type = "button";
    checkButton.className = "primary-button interactive-check-button";
    checkButton.textContent = config.checkLabel || "Check Answer";
    checkButton.addEventListener("click", () => {
      if (!currentSequence.length) {
        state.feedbackMessage = "Add commands before checking.";
        state.feedbackTone = "error";
        renderFeedback();
        return;
      }
      const selectedValue = currentSequence.join(" ");
      const path = getPath(currentSequence);
      const finalPoint = path[path.length - 1] || start;
      const shortestPathLength =
        Math.abs(treasure.row - start.row) + Math.abs(treasure.col - start.col);
      const isCorrect =
        samePoint(finalPoint, treasure) && currentSequence.length === shortestPathLength;
      handleAnswer(question, isCorrect, selectedValue, { tokens: currentSequence.slice() });
    });
    shell.appendChild(actions);
    shell.appendChild(status);
    shell.appendChild(checkButton);
  } else {
    shell.appendChild(status);
  }

  elements.choicesArea.appendChild(shell);
  sync();
}

function normalizeGridPoint(value, rows, cols, fallback) {
  const row = Number.parseInt(value?.row, 10);
  const col = Number.parseInt(value?.col, 10);
  if (!Number.isFinite(row) || !Number.isFinite(col)) {
    return fallback;
  }

  return {
    row: Math.max(0, Math.min(rows - 1, row)),
    col: Math.max(0, Math.min(cols - 1, col)),
  };
}

function renderChoiceButtons(question, { readOnly = false, selectedValue = "" } = {}) {
  elements.choicesArea.innerHTML = "";

  question.options.forEach((option, index) => {
    const optionText = String(option);
    const optionIsHebrew = containsHebrewText(optionText);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `choice-button${optionIsHebrew ? " hebrew" : ""}`;
    button.dataset.value = optionText;
    button.disabled = readOnly;

    if (readOnly) {
      if (optionText === question.answerValue) {
        button.classList.add("is-correct");
      } else if (optionText === selectedValue) {
        button.classList.add("is-wrong");
      }
    }

    const labelSpan = document.createElement("span");
    labelSpan.className = "choice-label";
    labelSpan.textContent = `${OPTION_LABELS[index]})`;

    const textSpan = document.createElement("span");
    textSpan.className = `choice-text${optionIsHebrew ? " hebrew" : ""}`;
    textSpan.textContent = optionText;
    if (optionIsHebrew) {
      textSpan.setAttribute("dir", "rtl");
    }

    button.appendChild(labelSpan);
    button.appendChild(textSpan);
    if (!readOnly) {
      button.addEventListener("click", () =>
        handleAnswer(question, optionText === question.answerValue, optionText)
      );
    }
    elements.choicesArea.appendChild(button);
  });
}

function renderPracticeButtons(question, { readOnly = false, selectedValue = "" } = {}) {
  elements.choicesArea.innerHTML = "";

  const actions = document.createElement("div");
  actions.className = "practice-actions";

  const button = document.createElement("button");
  button.type = "button";
  button.className = "primary-button practice-button";
  button.textContent = readOnly
    ? selectedValue || question.completionValue || "Done"
    : question.actionLabel || "Mark Done";
  button.disabled = readOnly;

  if (!readOnly) {
    button.addEventListener("click", () =>
      handleAnswer(question, true, question.completionValue || "Done")
    );
  }

  actions.appendChild(button);
  elements.choicesArea.appendChild(actions);
}

function renderDragQuestion(question, { readOnly = false, selectedTokens = [] } = {}) {
  elements.dragArea.innerHTML = "";
  if (question.dragLayout === "matching") {
    renderMatchingDragQuestion(question, { readOnly, selectedTokens });
    return;
  }

  const dragLayout = question.dragLayout || "sentence";
  const choiceLookup = new Map(question.dragChoices.map((token) => [token.id, token]));
  const isComparisonLayout = dragLayout === "comparison";
  const isTargetsLayout = dragLayout === "targets";
  const isBucketLayout = dragLayout === "buckets";
  const dragQuestionIsHebrew =
    Boolean(question.isHebrew) ||
    containsHebrewText(question.questionText) ||
    containsHebrewText(question.displayText) ||
    (question.dragChoices || []).some((token) => containsHebrewText(token?.text)) ||
    (question.dragTemplateParts || []).some((part) => containsHebrewText(part)) ||
    (question.dragTargets || []).some(
      (target) =>
        containsHebrewText(target?.text) ||
        containsHebrewText(target?.reviewLabel) ||
        containsHebrewText(target?.html)
    ) ||
    (question.dragBucketColumns || []).some(
      (bucket) =>
        containsHebrewText(bucket?.label) ||
        (bucket?.answers || []).some((answer) => containsHebrewText(answer))
    );
  const slotValues = Array.from({ length: getDragSlotCount(question) }, (_, index) => {
    if (!readOnly || !Array.isArray(selectedTokens)) {
      return null;
    }

    const text = selectedTokens[index];
    if (!text) {
      return null;
    }

    return question.dragChoices.find((token) => token.text === text) || {
      id: `review-${index}-${text}`,
      text,
    };
  });

  const placeToken = (slotIndex, tokenId) => {
    if (readOnly) {
      return;
    }

    const token = choiceLookup.get(tokenId);
    if (!token) {
      return;
    }

    const existingIndex = slotValues.findIndex((value) => value?.id === tokenId);
    if (existingIndex !== -1) {
      slotValues[existingIndex] = null;
    }

    slotValues[slotIndex] = token;
    sync();
  };

  const placeTokenInFirstOpenSlot = (tokenId) => {
    if (readOnly) {
      return;
    }

    const emptyIndex = slotValues.findIndex((value) => value === null);
    if (emptyIndex !== -1) {
      placeToken(emptyIndex, tokenId);
    }
  };

  const clearSlot = (slotIndex) => {
    if (readOnly) {
      return;
    }

    slotValues[slotIndex] = null;
    sync();
  };

  function createSlotButton(slotIndex, { placeholderText = "Drop here", comparison = false, extraClass = "" } = {}) {
    const slotButton = document.createElement("button");
    slotButton.type = "button";
    slotButton.className = [
      "drag-slot",
      dragQuestionIsHebrew ? "hebrew" : "",
      comparison ? "comparison" : "",
      extraClass,
      slotValues[slotIndex] ? "filled" : "",
    ]
      .filter(Boolean)
      .join(" ");
    slotButton.textContent = slotValues[slotIndex]?.text || placeholderText || "\u00a0";
    slotButton.disabled = readOnly;
    if (!readOnly) {
      slotButton.addEventListener("click", () => {
        if (slotValues[slotIndex]) {
          clearSlot(slotIndex);
        }
      });
      slotButton.addEventListener("dragover", (event) => {
        event.preventDefault();
      });
      slotButton.addEventListener("drop", (event) => {
        event.preventDefault();
        const tokenId = event.dataTransfer?.getData("text/plain");
        if (tokenId) {
          placeToken(slotIndex, tokenId);
        }
      });
    }
    return slotButton;
  }

  function fillTargetPrompt(prompt, target, index) {
    if (target?.html) {
      prompt.innerHTML = target.html;
      return;
    }

    prompt.textContent = target?.text || getDragTargetReviewLabel(target, index);
  }

  function createSentenceLayout() {
    const sentence = document.createElement("div");
    sentence.className = `drag-sentence${dragQuestionIsHebrew ? " hebrew" : ""}`;

    question.dragTemplateParts.forEach((part, index) => {
      if (part) {
        const partSpan = document.createElement("span");
        partSpan.className = "drag-text";
        partSpan.textContent = part;
        sentence.appendChild(partSpan);
      }

      if (index < slotValues.length) {
        sentence.appendChild(createSlotButton(index));
      }
    });

    return sentence;
  }

  function createComparisonLayout() {
    const comparison = document.createElement("div");
    comparison.className = "drag-comparison";

    const leftNumber = document.createElement("div");
    leftNumber.className = "drag-compare-number";
    leftNumber.textContent = question.dragComparisonLeftText || question.dragTemplateParts[0].trim();

    const rightNumber = document.createElement("div");
    rightNumber.className = "drag-compare-number";
    rightNumber.textContent = question.dragComparisonRightText || question.dragTemplateParts[1].trim();

    comparison.appendChild(leftNumber);
    comparison.appendChild(
      createSlotButton(0, {
        placeholderText: question.dragPlaceholderText || "?",
        comparison: true,
      })
    );
    comparison.appendChild(rightNumber);

    return comparison;
  }

  function createTargetsRowsLayout() {
    const targets = document.createElement("div");
    targets.className = "drag-targets rows";

    question.dragTargets.forEach((target, index) => {
      const row = document.createElement("div");
      row.className = "drag-target-row";

      const prompt = document.createElement("div");
      const promptIsHebrew =
        dragQuestionIsHebrew ||
        containsHebrewText(target?.text) ||
        containsHebrewText(target?.reviewLabel) ||
        containsHebrewText(target?.html);
      prompt.className = `drag-target-prompt${target?.html ? " visual" : ""}${promptIsHebrew ? " hebrew" : ""}`;
      fillTargetPrompt(prompt, target, index);

      row.appendChild(prompt);
      row.appendChild(
        createSlotButton(index, {
          placeholderText: question.dragPlaceholderText || "Drop here",
          extraClass: "target",
        })
      );
      targets.appendChild(row);
    });

    return targets;
  }

  function createTargetsLineLayout() {
    const shell = document.createElement("div");
    shell.className = "drag-line-shell";

    const line = document.createElement("div");
    line.className = "drag-targets line";

    question.dragTargets.forEach((target, index) => {
      const item = document.createElement("div");
      item.className = "drag-line-target";
      item.appendChild(
        createSlotButton(index, {
          placeholderText: question.dragPlaceholderText || "\u00a0",
          extraClass: "target line",
        })
      );

      const tick = document.createElement("div");
      tick.className = "drag-line-tick";
      item.appendChild(tick);

      if (question.dragShowTargetLabels !== false) {
        const labelText = target?.text || target?.reviewLabel || "";
        if (labelText) {
          const label = document.createElement("div");
          label.className = `drag-line-label${containsHebrewText(labelText) ? " hebrew" : ""}`;
          label.textContent = labelText;
          item.appendChild(label);
        }
      }

      line.appendChild(item);
    });

    shell.appendChild(line);

    if (question.dragLineStartLabel || question.dragLineEndLabel) {
      const edgeLabels = document.createElement("div");
      edgeLabels.className = "drag-line-edge-labels";

      const startLabel = document.createElement("span");
      startLabel.className = "drag-line-edge-label";
      startLabel.textContent = question.dragLineStartLabel || "";

      const endLabel = document.createElement("span");
      endLabel.className = "drag-line-edge-label";
      endLabel.textContent = question.dragLineEndLabel || "";

      edgeLabels.appendChild(startLabel);
      edgeLabels.appendChild(endLabel);
      shell.appendChild(edgeLabels);
    }

    return shell;
  }

  function createTargetsCompassLayout() {
    const compass = document.createElement("div");
    compass.className = "drag-targets compass";
    const targetLookup = new Map(
      (question.dragTargets || []).map((target, index) => [target?.position, { target, index }])
    );
    const positions = [
      "northwest",
      "north",
      "northeast",
      "west",
      "center",
      "east",
      "southwest",
      "south",
      "southeast",
    ];

    positions.forEach((position) => {
      if (position === "center") {
        const center = document.createElement("div");
        center.className = "drag-compass-center";
        center.textContent = question.dragCompassCenterLabel || "Compass";
        compass.appendChild(center);
        return;
      }

      const cell = document.createElement("div");
      cell.className = `drag-compass-cell ${position}`;
      const match = targetLookup.get(position);
      if (match) {
        cell.appendChild(
          createSlotButton(match.index, {
            placeholderText: question.dragPlaceholderText || "\u00a0",
            extraClass: "target compass",
          })
        );
      } else {
        cell.classList.add("empty");
      }
      compass.appendChild(cell);
    });

    return compass;
  }

  function createTargetsLayout() {
    if (question.dragTargetArrangement === "line") {
      return createTargetsLineLayout();
    }

    if (question.dragTargetArrangement === "compass") {
      return createTargetsCompassLayout();
    }

    return createTargetsRowsLayout();
  }

  function createBucketsLayout() {
    const buckets = document.createElement("div");
    buckets.className = "drag-buckets";
    let slotIndex = 0;

    (question.dragBucketColumns || []).forEach((bucket) => {
      const column = document.createElement("div");
      column.className = "drag-bucket";

      const label = document.createElement("div");
      label.className = `drag-bucket-label${dragQuestionIsHebrew || containsHebrewText(bucket.label) ? " hebrew" : ""}`;
      label.textContent = bucket.label;

      const slots = document.createElement("div");
      slots.className = "drag-bucket-slots";

      for (let index = 0; index < (bucket?.answers?.length || 0); index += 1) {
        slots.appendChild(
          createSlotButton(slotIndex, {
            placeholderText: question.dragPlaceholderText || "\u00a0",
            extraClass: "bucket",
          })
        );
        slotIndex += 1;
      }

      column.appendChild(label);
      column.appendChild(slots);
      buckets.appendChild(column);
    });

    return buckets;
  }

  function createBank() {
    const bank = document.createElement("div");
    bank.className = [
      "drag-bank",
      dragQuestionIsHebrew ? "hebrew" : "",
      isComparisonLayout ? "comparison" : "",
      isTargetsLayout ? "targets" : "",
      isBucketLayout ? "buckets" : "",
    ]
      .filter(Boolean)
      .join(" ");

    question.dragChoices.forEach((token) => {
      if (slotValues.some((value) => value?.id === token.id)) {
        return;
      }

      const tokenButton = document.createElement("button");
      tokenButton.type = "button";
      tokenButton.className = [
        "drag-token",
        dragQuestionIsHebrew ? "hebrew" : "",
        isComparisonLayout ? "comparison" : "",
        isTargetsLayout ? "targets" : "",
        isBucketLayout ? "buckets" : "",
      ]
        .filter(Boolean)
        .join(" ");
      tokenButton.draggable = true;
      tokenButton.textContent = token.text;
      tokenButton.addEventListener("click", () => placeTokenInFirstOpenSlot(token.id));
      tokenButton.addEventListener("dragstart", (event) => {
        if (event.dataTransfer) {
          event.dataTransfer.effectAllowed = "move";
          event.dataTransfer.setData("text/plain", token.id);
        }
      });
      bank.appendChild(tokenButton);
    });

    return bank;
  }

  function createCheckButton() {
    const checkButton = document.createElement("button");
    checkButton.type = "button";
    checkButton.className = [
      "primary-button",
      "drag-check-button",
      isComparisonLayout ? "comparison" : "",
      isTargetsLayout || isBucketLayout ? "centered" : "",
    ]
      .filter(Boolean)
      .join(" ");
    checkButton.textContent = "Check Answer";
    checkButton.addEventListener("click", () => {
      if (slotValues.some((value) => value === null)) {
        state.feedbackMessage =
          isTargetsLayout || isBucketLayout
            ? "Fill every spot before checking your answer."
            : "Fill every blank before checking your answer.";
        state.feedbackTone = "error";
        renderFeedback();
        return;
      }

      const currentSelectedTokens = slotValues.map((value) => value.text);
      const selectedValue = buildDragSelectionText(question, currentSelectedTokens);
      const isCorrect = isDragSelectionCorrect(question, currentSelectedTokens);
      handleAnswer(question, isCorrect, selectedValue, { tokens: currentSelectedTokens });
    });

    return checkButton;
  }

  function sync() {
    elements.dragArea.innerHTML = "";

    const board = document.createElement("div");
    board.className = [
      "drag-board",
      isComparisonLayout ? "comparison" : "",
      isTargetsLayout ? "targets" : "",
      isBucketLayout ? "buckets" : "",
    ]
      .filter(Boolean)
      .join(" ");

    if (isComparisonLayout) {
      board.appendChild(createComparisonLayout());
    } else if (isTargetsLayout) {
      board.appendChild(createTargetsLayout());
    } else if (isBucketLayout) {
      board.appendChild(createBucketsLayout());
    } else {
      board.appendChild(createSentenceLayout());
    }

    if (!readOnly) {
      board.appendChild(createBank());
      board.appendChild(createCheckButton());
    }

    elements.dragArea.appendChild(board);
  }

  sync();
}

function renderMatchingDragQuestion(question, { readOnly = false, selectedTokens = [] } = {}) {
  const leftItems = Array.isArray(question.matchLeftItems) ? question.matchLeftItems : [];
  const rightItems = Array.isArray(question.matchRightItems) ? question.matchRightItems : [];
  if (!leftItems.length || !rightItems.length || rightItems.length < leftItems.length) {
    return;
  }

  const rightIndexByText = new Map(rightItems.map((item, index) => [item.text, index]));
  const connections = leftItems.map((_, index) => {
    const token = String(selectedTokens?.[index] || "").trim();
    return token && rightIndexByText.has(token) ? rightIndexByText.get(token) : null;
  });

  const board = document.createElement("div");
  board.className = "drag-board matching";

  const stage = document.createElement("div");
  stage.className = "matching-stage";
  board.appendChild(stage);

  const lines = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  lines.setAttribute("class", "matching-lines");
  lines.setAttribute("aria-hidden", "true");
  stage.appendChild(lines);

  const leftColumn = document.createElement("div");
  leftColumn.className = "matching-column left";
  const rightColumn = document.createElement("div");
  rightColumn.className = "matching-column right";
  stage.appendChild(leftColumn);
  stage.appendChild(rightColumn);

  const leftRows = [];
  const rightRows = [];
  const leftAnchors = [];
  const rightAnchors = [];
  let selectedEndpoint = null;
  let resizeObserver = null;

  function getAnchorCenter(anchor) {
    const stageRect = stage.getBoundingClientRect();
    const anchorRect = anchor.getBoundingClientRect();
    return {
      x: anchorRect.left - stageRect.left + anchorRect.width / 2,
      y: anchorRect.top - stageRect.top + anchorRect.height / 2,
    };
  }

  function appendLine(start, end, className) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", String(start.x));
    line.setAttribute("y1", String(start.y));
    line.setAttribute("x2", String(end.x));
    line.setAttribute("y2", String(end.y));
    line.setAttribute("class", className);
    lines.appendChild(line);
  }

  function updateAnchorState() {
    leftAnchors.forEach((anchor, index) => {
      const isConnected = connections[index] !== null;
      const isActive = selectedEndpoint?.side === "left" && selectedEndpoint.index === index;
      anchor.classList.toggle("connected", isConnected);
      anchor.classList.toggle("active", isActive);
      leftRows[index]?.classList.toggle("connected", isConnected);
      leftRows[index]?.classList.toggle("active", isActive);
    });

    rightAnchors.forEach((anchor, index) => {
      const isConnected = connections.includes(index);
      const isActive = selectedEndpoint?.side === "right" && selectedEndpoint.index === index;
      anchor.classList.toggle("connected", isConnected);
      anchor.classList.toggle("occupied", isConnected);
      anchor.classList.toggle("snap-target", isActive);
      rightRows[index]?.classList.toggle("connected", isConnected);
      rightRows[index]?.classList.toggle("active", isActive);
    });
  }

  function renderLines() {
    const width = Math.max(stage.clientWidth, 1);
    const height = Math.max(stage.clientHeight, 1);
    lines.setAttribute("viewBox", `0 0 ${width} ${height}`);
    lines.innerHTML = "";

    connections.forEach((rightIndex, leftIndex) => {
      if (rightIndex === null) {
        return;
      }

      appendLine(getAnchorCenter(leftAnchors[leftIndex]), getAnchorCenter(rightAnchors[rightIndex]), "matching-line");
    });

    updateAnchorState();
  }

  function sync() {
    if (typeof requestAnimationFrame === "function") {
      requestAnimationFrame(renderLines);
      return;
    }

    renderLines();
  }

  function connect(leftIndex, rightIndex) {
    if (rightIndex === null) {
      return;
    }

    const occupiedLeftIndex = connections.findIndex(
      (currentRightIndex, index) => index !== leftIndex && currentRightIndex === rightIndex
    );
    if (occupiedLeftIndex !== -1) {
      connections[occupiedLeftIndex] = null;
    }

    connections[leftIndex] = rightIndex;
  }

  function selectEndpoint(side, index) {
    if (readOnly) {
      return;
    }

    if (selectedEndpoint?.side === side && selectedEndpoint.index === index) {
      selectedEndpoint = null;
      sync();
      return;
    }

    if (selectedEndpoint && selectedEndpoint.side !== side) {
      const leftIndex = side === "left" ? index : selectedEndpoint.index;
      const rightIndex = side === "right" ? index : selectedEndpoint.index;
      connect(leftIndex, rightIndex);
      selectedEndpoint = null;
      sync();
      return;
    }

    selectedEndpoint = { side, index };
    sync();
  }

  leftItems.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "matching-row left";

    const card = document.createElement("div");
    card.className = `matching-card${containsHebrewText(item?.text) ? " hebrew" : " english"}`;
    card.textContent = item.text;
    if (!readOnly) {
      card.addEventListener("click", () => selectEndpoint("left", index));
      card.setAttribute("role", "button");
      card.tabIndex = 0;
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectEndpoint("left", index);
        }
      });
    }

    const anchor = document.createElement("button");
    anchor.type = "button";
    anchor.className = "matching-anchor left";
    anchor.setAttribute("aria-label", `Connect ${item.text}`);
    anchor.setAttribute("aria-disabled", readOnly ? "true" : "false");
    anchor.tabIndex = readOnly ? -1 : 0;
    if (!readOnly) {
      anchor.addEventListener("click", () => selectEndpoint("left", index));
    }

    row.appendChild(card);
    row.appendChild(anchor);
    leftColumn.appendChild(row);
    leftRows.push(row);
    leftAnchors.push(anchor);
  });

  rightItems.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "matching-row right";

    const anchor = document.createElement("button");
    anchor.type = "button";
    anchor.className = "matching-anchor right";
    anchor.setAttribute("aria-label", `Target ${item.text}`);
    anchor.setAttribute("aria-disabled", readOnly ? "true" : "false");
    anchor.tabIndex = readOnly ? -1 : 0;
    if (!readOnly) {
      anchor.addEventListener("click", () => selectEndpoint("right", index));
    }

    const card = document.createElement("div");
    card.className = `matching-card${containsHebrewText(item?.text) ? " hebrew" : " english"}`;
    card.textContent = item.text;
    if (!readOnly) {
      card.addEventListener("click", () => selectEndpoint("right", index));
      card.setAttribute("role", "button");
      card.tabIndex = 0;
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectEndpoint("right", index);
        }
      });
    }

    row.appendChild(anchor);
    row.appendChild(card);
    rightColumn.appendChild(row);
    rightRows.push(row);
    rightAnchors.push(anchor);
  });

  if (!readOnly) {
    const actions = document.createElement("div");
    actions.className = "matching-actions";

    const clearButton = document.createElement("button");
    clearButton.type = "button";
    clearButton.className = "secondary-button";
    clearButton.textContent = "Clear Lines";
    clearButton.addEventListener("click", () => {
      connections.fill(null);
      selectedEndpoint = null;
      sync();
    });

    const checkButton = document.createElement("button");
    checkButton.type = "button";
    checkButton.className = "primary-button drag-check-button centered";
    checkButton.textContent = "Check Answer";
    checkButton.addEventListener("click", () => {
      if (connections.some((value) => value === null)) {
        state.feedbackMessage = "Connect every item before checking your answer.";
        state.feedbackTone = "error";
        renderFeedback();
        return;
      }

      const currentSelectedTokens = connections.map((rightIndex) => rightItems[rightIndex].text);
      const selectedValue = buildDragSelectionText(question, currentSelectedTokens);
      const isCorrect = isDragSelectionCorrect(question, currentSelectedTokens);
      handleAnswer(question, isCorrect, selectedValue, { tokens: currentSelectedTokens });
    });

    actions.appendChild(clearButton);
    actions.appendChild(checkButton);
    board.appendChild(actions);
  }

  elements.dragArea.appendChild(board);

  const handleResize = () => sync();
  window.addEventListener("resize", handleResize);
  if (typeof ResizeObserver === "function") {
    resizeObserver = new ResizeObserver(() => sync());
    resizeObserver.observe(stage);
  }

  state.dragState = {
    cleanup() {
      window.removeEventListener("resize", handleResize);
      resizeObserver?.disconnect();
    },
  };

  sync();
}

function focusAnswerInput() {
  const focusInput = () => {
    elements.answerInput.focus();
  };

  if (typeof requestAnimationFrame === "function") {
    requestAnimationFrame(focusInput);
    return;
  }

  focusInput();
}

function shouldAutoFocusAnswerInput() {
  if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) {
    return false;
  }

  return true;
}

function scrollAnswerFormIntoView() {
  window.setTimeout(() => {
    elements.answerForm.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "smooth",
    });
  }, 250);
}

function focusAnswerInputWithoutScrolling() {
  try {
    elements.answerInput.focus({ preventScroll: true });
  } catch (_error) {
    elements.answerInput.focus();
  }
}

function toggleAnswerInputSign() {
  if (elements.answerInput.disabled) {
    return;
  }

  const rawValue = elements.answerInput.value;
  const trimmedStartValue = rawValue.trimStart();
  const leadingWhitespace = rawValue.slice(0, rawValue.length - trimmedStartValue.length);
  let nextValue = "";

  if (/^[\u2212\u2013\u2014-]/.test(trimmedStartValue)) {
    nextValue = leadingWhitespace + trimmedStartValue.replace(/^[\u2212\u2013\u2014-]\s*/, "");
  } else if (/^\+/.test(trimmedStartValue)) {
    nextValue = leadingWhitespace + trimmedStartValue.replace(/^\+\s*/, "-");
  } else {
    nextValue = `${leadingWhitespace}-${trimmedStartValue}`;
  }

  elements.answerInput.value = nextValue;
  elements.answerInput.dispatchEvent(new Event("input", { bubbles: true }));
  focusAnswerInputWithoutScrolling();

  const cursorPosition = elements.answerInput.value.length;
  elements.answerInput.setSelectionRange(cursorPosition, cursorPosition);
}

const {
  buildNumericAnswerCandidates,
  numericAnswersMatch,
} = window.HomeworkApp.scoring;

function submitTypedAnswer(event) {
  event.preventDefault();
  const round = getActiveRoundState();

  if (round.viewIndex !== round.currentIndex) {
    return;
  }

  const question = round.questions[round.currentIndex];
  if (!question || question.mode !== "input") {
    return;
  }

  if (round.answerResults[round.currentIndex] !== undefined) {
    return;
  }

  const typedValue = elements.answerInput.value.trim();
  if (typedValue === "") {
    state.feedbackMessage = "Type an answer and press Submit.";
    state.feedbackTone = "error";
    renderFeedback();
    return;
  }

  const parsedCandidates = buildNumericAnswerCandidates(typedValue, question);
  if (!parsedCandidates.length) {
    state.feedbackMessage = "Please type one number. Formats like 4,000 and 5.5 are okay.";
    state.feedbackTone = "error";
    renderFeedback();
    return;
  }

  const correctAnswer = Number(question.answerValue);
  const isCorrect = parsedCandidates.some((candidate) => numericAnswersMatch(candidate, correctAnswer));
  elements.answerSubmitButton.disabled = true;
  handleAnswer(question, isCorrect, typedValue);
}

function handleAnswer(question, isCorrect, selectedValue = "", selectedMeta = null) {
  const round = getActiveRoundState();
  if (isSpeedRoundActive()) {
    clearSpeedRoundTimer();
  }

  round.answeredCount += 1;
  if (isCorrect) {
    round.correctCount += 1;
  }

  round.answerSelections[round.currentIndex] = {
    value: selectedValue === "" ? "" : String(selectedValue),
    ...(Array.isArray(selectedMeta?.tokens) ? { tokens: [...selectedMeta.tokens] } : {}),
  };
  round.answerResults[round.currentIndex] = isCorrect;
  const record = buildSessionRecord(
    round.currentIndex + 1,
    question,
    selectedValue,
    isCorrect,
    selectedMeta
  );
  if (isSpeedRoundActive()) {
    round.records[round.currentIndex] = record;
  } else {
    state.sessionRecords[round.currentIndex] = record;
  }
  state.feedbackMessage = buildOutcomeMessage(question, isCorrect, selectedValue);
  state.feedbackTone = isCorrect ? "success" : "error";

  if (round.currentIndex === round.totalQuestions - 1) {
    round.currentIndex = round.totalQuestions;
    round.viewIndex = round.totalQuestions;
    completeActiveRound();
    return;
  }

  round.currentIndex += 1;
  round.viewIndex = round.currentIndex;
  renderCurrentQuestion();
}

function buildOutcomeMessage(question, isCorrect, selectedValue = "") {
  if (isCorrect) {
    return question?.successMessage ? escapeHtml(String(question.successMessage)) : "Correct!";
  }

  return formatQuestionReview(question, selectedValue, { isCorrect });
}

function formatQuestionReview(question, selectedValue, { isCorrect = false } = {}) {
  const lines = [];
  const addLine = (content, className = "") => {
    const classAttribute = className ? ` class="${className}"` : "";
    lines.push(`<div${classAttribute}>${content}</div>`);
  };

  if (question.questionText) {
    addLine(escapeHtml(question.questionText), "feedback-review-line feedback-review-question");
  }

  if (question.displayText) {
    addLine(escapeHtml(question.displayText), "feedback-review-line");
  }

  if (question.reviewText && question.reviewText !== question.displayText) {
    addLine(escapeHtml(question.reviewText), "feedback-review-line");
  }

  if (
    question.visualSummary &&
    question.visualSummary !== question.displayText &&
    question.visualSummary !== question.reviewText
  ) {
    addLine(escapeHtml(question.visualSummary), "feedback-review-line");
  }

  if (Array.isArray(question.options) && question.options.length) {
    question.options.forEach((option, index) => {
      const optionClasses = ["feedback-review-line", "feedback-review-option"];
      if (option === selectedValue) {
        optionClasses.push("selected");
      }
      if (option === question.answerValue) {
        optionClasses.push("correct");
      }

      addLine(
        `<span class="feedback-review-option-label">${OPTION_LABELS[index]})</span> ` +
          `<span class="feedback-review-option-text">${escapeHtml(option)}</span>`,
        optionClasses.join(" ")
      );
    });
  } else if (selectedValue !== "") {
    const selectedAnswerText = String(selectedValue);
    const canonicalAnswerText = String(question.answerLabel);
    const matchesCanonicalAnswer = selectedAnswerText === canonicalAnswerText;
    const selectedAnswerClass = isCorrect || matchesCanonicalAnswer ? "correct" : "selected";
    const shouldShowCanonicalAnswer = !isCorrect && !matchesCanonicalAnswer;
    lines.push('<div class="feedback-review-spacer"></div>');
    addLine(
      `<span class="feedback-review-label">Your answer:</span> ` +
        `<span class="feedback-review-answer ${selectedAnswerClass}">${escapeHtml(selectedAnswerText)}</span>`,
      "feedback-review-line"
    );
    if (shouldShowCanonicalAnswer) {
      lines.push('<div class="feedback-review-spacer"></div>');
      addLine(
        `<span class="feedback-review-label">Correct answer:</span> ` +
          `<span class="feedback-review-answer correct">${escapeHtml(String(question.answerLabel))}</span>`,
        "feedback-review-line"
      );
    }
  } else {
    lines.push('<div class="feedback-review-spacer"></div>');
    addLine(
      `<span class="feedback-review-label">Correct answer:</span> ` +
        `<span class="feedback-review-answer correct">${escapeHtml(String(question.answerLabel))}</span>`,
      "feedback-review-line"
    );
  }

  return `<div class="feedback-review">${lines.join("")}</div>`;
}
