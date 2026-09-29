function renderPixelCodeQuestion(question, config, { readOnly = false, selectedTokens = [] } = {}) {
  const codes = globalThis.HomeworkPixelCodes;
  const encoding = config.variant.endsWith("encode");
  const runEncoding = config.variant === "runs-encode";
  const runs = config.variant.startsWith("runs");
  const size = runEncoding ? config.rows : config.target.length;
  let values = Array.from({ length: size }, (_, index) => runEncoding
    ? String(selectedTokens[index] || "").slice(0, 60)
    : selectedTokens[index] === "1" ? "1" : "0");
  const savedRow = String(selectedTokens[size] || "").match(/^row:(\d)$/);
  let activeRow = savedRow ? Math.min(config.rows - 1, Number(savedRow[1])) : 0;
  const undoStack = [];
  const rowElements = [];
  const controls = [];
  const sourceRows = [];
  let undoButton;

  const make = (tag, className, text = "") => {
    const node = document.createElement(tag);
    node.className = className;
    node.textContent = text;
    return node;
  };
  const button = (className, text, action) => {
    const node = make("button", className, text);
    node.type = "button";
    node.disabled = readOnly;
    node.addEventListener("click", action);
    return node;
  };
  const shell = make("div", "interactive-question pixel-question");
  shell.dir = "ltr";
  shell.lang = "en";
  shell.style.setProperty("--pixel-columns", config.cols);
  shell.appendChild(make("p", "pixel-key", "Key: 0 = empty □ · 1 = filled ■. Read left to right →, then top to bottom ↓."));
  shell.appendChild(make("p", "pixel-instructions", runs
    ? `Run-length code counts consecutive cells. Every row starts with empty, then filled, alternating. Use 0 empty if the row starts filled. Counts add to ${config.cols}. Example: 0, 2, ${config.cols - 2} means 0 empty, 2 filled, ${config.cols - 2} empty → ■ ■ ${Array(config.cols - 2).fill("□").join(" ")}. Long runs can use fewer numbers; alternating pixels may need more.`
    : "Example: 0 1 1 0 means □ ■ ■ □ — only the middle two cells are filled."));
  shell.appendChild(make("p", "pixel-instructions", encoding
    ? runEncoding ? "Write one row of counts at a time. Type counts separated by commas or spaces, or use the count buttons below."
      : "Write the picture as binary. Tap each code cell to switch between 0 and 1."
    : "Tap cells to fill or empty them. Match each row to its code. Use Tab and Enter/Space, or arrow keys between cells."));

  const persist = () => {
    if (!readOnly) updatePendingAnswer({ tokens: [...values, `row:${activeRow}`] });
  };
  const highlight = (row) => {
    activeRow = row;
    rowElements.forEach((node, index) => node.classList.toggle("active", index === row));
    sourceRows.forEach((node, index) => node.classList.toggle("active", index === row));
    persist();
  };
  const sync = () => {
    controls.forEach((control, index) => {
      if (runEncoding) {
        control.value = values[index];
      } else {
        const filled = values[index] === "1";
        control.textContent = encoding ? values[index] : filled ? "■" : "□";
        control.classList.toggle("filled", filled && !encoding);
        control.setAttribute("aria-pressed", String(filled));
        control.setAttribute("aria-label", `Row ${Math.floor(index / config.cols) + 1}, column ${index % config.cols + 1}: ${filled ? "filled (1)" : "empty (0)"}`);
        if (readOnly) control.classList.toggle("mismatch", Number(values[index]) !== config.target[index]);
      }
    });
    if (undoButton) undoButton.disabled = readOnly || !undoStack.length;
    highlight(activeRow);
  };
  const remember = () => {
    undoStack.push({ values: [...values], row: activeRow });
    if (undoStack.length > 100) undoStack.shift();
  };

  shell.appendChild(make("div", "pixel-row-label", encoding ? "Picture to encode" : "Code to decode"));
  const source = make("div", encoding ? "pixel-picture-board" : "pixel-code-list");
  codes.rowsOf(config).forEach((target, row) => {
    const sourceRow = make("div", encoding ? "pixel-source-picture" : "pixel-source-code");
    sourceRows.push(sourceRow);
    if (encoding) {
      target.forEach((bit, column) => {
        const cell = make("span", `pixel-source-cell${bit ? " filled" : ""}`, bit ? "■" : "□");
        cell.setAttribute("role", "img");
        cell.setAttribute("aria-label", `Picture row ${row + 1}, column ${column + 1}: ${bit ? "filled" : "empty"}`);
        sourceRow.appendChild(cell);
      });
    } else {
      sourceRow.textContent = `Row ${row + 1}: ` + (runs
        ? codes.encodeRuns(target).map((count, index) => `${count} ${index % 2 ? "filled" : "empty"}`).join(", ")
        : target.join(" "));
    }
    source.appendChild(sourceRow);
  });
  shell.appendChild(source);
  shell.appendChild(make("div", "pixel-row-label", encoding ? "Your code" : "Your picture"));
  const answerBoard = make("div", runEncoding ? "pixel-run-rows" : "pixel-board");
  shell.appendChild(answerBoard);
  for (let row = 0; row < config.rows; row++) {
    const section = make("div", "pixel-row");
    section.dataset.row = String(row);
    section.setAttribute("role", "group");
    section.setAttribute("aria-label", `Answer row ${row + 1}`);
    rowElements.push(section);
    if (runEncoding) {
      const label = make("label", "pixel-input-label", `Row ${row + 1} counts (empty first)`);
      const input = make("input", "pixel-run-input");
      input.type = "text";
      input.maxLength = 60;
      input.autocomplete = "off";
      input.spellcheck = false;
      input.id = `pixel-run-${row}`;
      label.htmlFor = input.id;
      input.disabled = readOnly;
      input.addEventListener("focus", () => highlight(row));
      input.addEventListener("input", () => {
        if (readOnly) return;
        remember();
        values[row] = input.value.slice(0, 60);
        activeRow = row;
        sync();
      });
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          shell.querySelector(".pixel-check")?.click();
        }
      });
      controls.push(input);
      section.appendChild(label);
      section.appendChild(input);
    } else {
      const grid = make("div", "pixel-cells");
      for (let column = 0; column < config.cols; column++) {
        const index = row * config.cols + column;
        const cell = button("pixel-cell", "", () => {
          if (readOnly) return;
          remember();
          values[index] = values[index] === "1" ? "0" : "1";
          activeRow = row;
          sync();
        });
        cell.dataset.index = String(index);
        cell.addEventListener("focus", () => highlight(row));
        cell.addEventListener("keydown", (event) => {
          const move = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -config.cols, ArrowDown: config.cols }[event.key];
          if (move === undefined) return;
          event.preventDefault();
          controls[Math.max(0, Math.min(config.target.length - 1, index + move))]?.focus();
        });
        controls.push(cell);
        grid.appendChild(cell);
      }
      section.appendChild(grid);
    }
    answerBoard.appendChild(section);
  }

  if (!readOnly) {
    if (runEncoding) {
      const keypad = make("div", "pixel-keypad");
      for (let count = 0; count <= config.cols; count++) {
        const key = button("pixel-count", String(count), () => {
          remember();
          const value = values[activeRow].trim();
          values[activeRow] = `${value}${value ? ", " : ""}${count}`.slice(0, 60);
          sync();
        });
        key.setAttribute("aria-label", `Append count ${count} to the highlighted row`);
        keypad.appendChild(key);
      }
      shell.appendChild(keypad);
    }
    const actions = make("div", "pixel-actions");
    undoButton = button("secondary-button pixel-undo", "Undo", () => {
      const previous = undoStack.pop();
      if (!previous) return;
      values = previous.values;
      activeRow = previous.row;
      sync();
    });
    actions.appendChild(undoButton);
    actions.appendChild(button("secondary-button pixel-clear", "Clear row", () => {
      remember();
      if (runEncoding) values[activeRow] = "";
      else values.fill("0", activeRow * config.cols, (activeRow + 1) * config.cols);
      sync();
    }));
    shell.appendChild(actions);
    const status = make("div", "pixel-status");
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    shell.appendChild(status);
    shell.appendChild(button("primary-button interactive-check-button pixel-check", "Check Answer", () => {
      const result = codes.evaluate(config, values);
      if (!result.complete) {
        status.textContent = result.feedback;
        return;
      }
      handleAnswer({ ...question, explanation: `${result.feedback} ${question.explanation}` }, result.isCorrect, result.value,
        { tokens: [...values, `row:${activeRow}`] });
    }));
  } else {
    const result = codes.evaluate(config, values);
    shell.appendChild(make("p", "pixel-result", result.feedback));
    if (!result.isCorrect) {
      shell.appendChild(make("p", "pixel-solution", `Correct ${runEncoding ? "counts (empty first)" : "binary rows (0 = empty, 1 = filled)"}: ${codes.describe(config, config.target, runEncoding)}`));
    }
  }
  elements.choicesArea.appendChild(shell);
  sync();
}
