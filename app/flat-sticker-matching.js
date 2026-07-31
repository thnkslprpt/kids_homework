(() => {
  "use strict";

  const SVG_NS = "http://www.w3.org/2000/svg";
  const SNAP_DISTANCE_PX = 62;
  const MOVE_THRESHOLD_PX = 5;
  const PAIR_COLORS = [
    { color: "#f28a58", dark: "#c75f31", soft: "rgba(242, 138, 88, 0.18)" },
    { color: "#65c7b1", dark: "#348e7b", soft: "rgba(101, 199, 177, 0.19)" },
    { color: "#f178a5", dark: "#c64e7a", soft: "rgba(241, 120, 165, 0.18)" },
    { color: "#9b7bd8", dark: "#6f50ad", soft: "rgba(155, 123, 216, 0.18)" },
    { color: "#68a9e8", dark: "#3d78b3", soft: "rgba(104, 169, 232, 0.18)" },
    { color: "#efbd4d", dark: "#b9871d", soft: "rgba(239, 189, 77, 0.2)" },
    { color: "#e489c7", dark: "#ad5892", soft: "rgba(228, 137, 199, 0.18)" },
    { color: "#82bd62", dark: "#568c39", soft: "rgba(130, 189, 98, 0.18)" },
  ];

  function pairColor(index) {
    if (index < PAIR_COLORS.length) {
      return PAIR_COLORS[index];
    }
    const hue = Math.round((index * 137.508 + 18) % 360);
    return {
      color: `hsl(${hue} 65% 64%)`,
      dark: `hsl(${hue} 48% 41%)`,
      soft: `hsla(${hue}, 65%, 64%, 0.18)`,
    };
  }

  function setPairVariables(element, color) {
    if (!element) {
      return;
    }
    if (!color) {
      element.style.removeProperty("--match-color");
      element.style.removeProperty("--match-color-dark");
      element.style.removeProperty("--match-soft");
      return;
    }
    element.style.setProperty("--match-color", color.color);
    element.style.setProperty("--match-color-dark", color.dark);
    element.style.setProperty("--match-soft", color.soft);
  }

  function renderFlatStickerMatchingQuestion(
    question,
    { readOnly = false, selectedTokens = [] } = {}
  ) {
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

    const lines = document.createElementNS(SVG_NS, "svg");
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
    let dragSession = null;
    let resizeObserver = null;
    let renderFrame = null;

    function getAnchorCenter(anchor) {
      const stageRect = stage.getBoundingClientRect();
      const anchorRect = anchor.getBoundingClientRect();
      return {
        x: anchorRect.left - stageRect.left + anchorRect.width / 2,
        y: anchorRect.top - stageRect.top + anchorRect.height / 2,
      };
    }

    function getStagePoint(clientX, clientY) {
      const rect = stage.getBoundingClientRect();
      return {
        x: Math.max(0, Math.min(rect.width, clientX - rect.left)),
        y: Math.max(0, Math.min(rect.height, clientY - rect.top)),
      };
    }

    function buildCurvePath(start, end) {
      const horizontalDistance = Math.max(1, Math.abs(end.x - start.x));
      const firstControlX = start.x + horizontalDistance * 0.36;
      const secondControlX = end.x - horizontalDistance * 0.36;
      return [
        `M ${start.x.toFixed(1)} ${start.y.toFixed(1)}`,
        `C ${firstControlX.toFixed(1)} ${start.y.toFixed(1)},`,
        `${secondControlX.toFixed(1)} ${end.y.toFixed(1)},`,
        `${end.x.toFixed(1)} ${end.y.toFixed(1)}`,
      ].join(" ");
    }

    function appendPath(d, className, color = null) {
      const path = document.createElementNS(SVG_NS, "path");
      path.setAttribute("d", d);
      path.setAttribute("class", className);
      if (color) {
        path.style.setProperty("--match-color", color.color);
      }
      lines.appendChild(path);
      return path;
    }

    function appendDotTrailLine(start, end, leftIndex, { preview = false, snapped = false } = {}) {
      const d = buildCurvePath(start, end);
      const previewClasses = preview ? ` preview${snapped ? " snapped" : ""}` : "";
      const color = pairColor(Math.max(0, leftIndex));
      appendPath(d, `matching-line trail-halo${previewClasses}`, color);
      appendPath(d, `matching-line trail-dots${previewClasses}`, color);
    }

    function getConnectionForRight(rightIndex) {
      return connections.findIndex((value) => value === rightIndex);
    }

    function applyRowColor(row, anchor, leftIndex) {
      const color = leftIndex >= 0 ? pairColor(leftIndex) : null;
      setPairVariables(row, color);
      setPairVariables(anchor, color);
      if (color) {
        anchor.dataset.matchColor = color.color;
      } else {
        delete anchor.dataset.matchColor;
      }
    }

    function getActiveEndpoint() {
      return dragSession?.source || selectedEndpoint;
    }

    function updateAnchorState() {
      const active = getActiveEndpoint();
      const snap = dragSession?.snapTarget || null;

      leftAnchors.forEach((anchor, index) => {
        const isConnected = connections[index] !== null;
        const isActive = active?.side === "left" && active.index === index;
        const isAvailable = Boolean(active) && active.side === "right";
        const isSnap = snap?.side === "left" && snap.index === index;

        anchor.classList.toggle("connected", isConnected);
        anchor.classList.toggle("active", isActive);
        anchor.classList.toggle("dragging", dragSession?.source.side === "left" && dragSession.source.index === index);
        anchor.classList.toggle("snap-target", isSnap);
        anchor.setAttribute("aria-pressed", isActive ? "true" : "false");

        leftRows[index]?.classList.toggle("connected", isConnected);
        leftRows[index]?.classList.toggle("active", isActive);
        leftRows[index]?.classList.toggle("available-target", isAvailable && !isSnap);
        leftRows[index]?.classList.toggle("snap-target", isSnap);
        applyRowColor(leftRows[index], anchor, isConnected ? index : -1);
      });

      rightAnchors.forEach((anchor, index) => {
        const connectedLeftIndex = getConnectionForRight(index);
        const isConnected = connectedLeftIndex !== -1;
        const isActive = active?.side === "right" && active.index === index;
        const isAvailable = Boolean(active) && active.side === "left";
        const isSnap = snap?.side === "right" && snap.index === index;

        anchor.classList.toggle("connected", isConnected);
        anchor.classList.toggle("occupied", isConnected);
        anchor.classList.toggle("active", isActive);
        anchor.classList.toggle("dragging", dragSession?.source.side === "right" && dragSession.source.index === index);
        anchor.classList.toggle("snap-target", isSnap);
        anchor.setAttribute("aria-pressed", isActive ? "true" : "false");

        rightRows[index]?.classList.toggle("connected", isConnected);
        rightRows[index]?.classList.toggle("active", isActive);
        rightRows[index]?.classList.toggle("available-target", isAvailable && !isSnap);
        rightRows[index]?.classList.toggle("snap-target", isSnap);
        applyRowColor(rightRows[index], anchor, connectedLeftIndex);
      });
    }

    function renderLines() {
      renderFrame = null;
      const width = Math.max(stage.clientWidth, 1);
      const height = Math.max(stage.clientHeight, 1);
      lines.setAttribute("viewBox", `0 0 ${width} ${height}`);
      lines.innerHTML = "";

      connections.forEach((rightIndex, leftIndex) => {
        if (rightIndex === null) {
          return;
        }
        appendDotTrailLine(
          getAnchorCenter(leftAnchors[leftIndex]),
          getAnchorCenter(rightAnchors[rightIndex]),
          leftIndex
        );
      });

      if (dragSession?.point) {
        const sourceAnchors = dragSession.source.side === "left" ? leftAnchors : rightAnchors;
        const sourcePoint = getAnchorCenter(sourceAnchors[dragSession.source.index]);
        let endPoint = dragSession.point;
        if (dragSession.snapTarget) {
          const targetAnchors = dragSession.snapTarget.side === "left" ? leftAnchors : rightAnchors;
          endPoint = getAnchorCenter(targetAnchors[dragSession.snapTarget.index]);
        }
        const start = dragSession.source.side === "left" ? sourcePoint : endPoint;
        const end = dragSession.source.side === "left" ? endPoint : sourcePoint;
        const connectedLeftIndex = dragSession.source.side === "right"
          ? getConnectionForRight(dragSession.source.index)
          : -1;
        const colorIndex = dragSession.source.side === "left"
          ? dragSession.source.index
          : connectedLeftIndex !== -1
            ? connectedLeftIndex
            : dragSession.source.index;
        appendDotTrailLine(start, end, colorIndex, {
          preview: true,
          snapped: Boolean(dragSession.snapTarget),
        });
      }

      updateAnchorState();
    }

    function sync() {
      if (renderFrame !== null || typeof requestAnimationFrame !== "function") {
        if (renderFrame === null) {
          renderLines();
        }
        return;
      }
      renderFrame = requestAnimationFrame(renderLines);
    }

    function connect(leftIndex, rightIndex) {
      if (rightIndex === null || leftIndex === null) {
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

    function connectEndpoints(first, second) {
      if (!first || !second || first.side === second.side) {
        return false;
      }
      const leftIndex = first.side === "left" ? first.index : second.index;
      const rightIndex = first.side === "right" ? first.index : second.index;
      connect(leftIndex, rightIndex);
      return true;
    }

    function selectEndpoint(side, index) {
      if (readOnly) {
        return;
      }
      const next = { side, index };
      if (selectedEndpoint?.side === side && selectedEndpoint.index === index) {
        selectedEndpoint = null;
        sync();
        return;
      }
      if (selectedEndpoint && selectedEndpoint.side !== side) {
        connectEndpoints(selectedEndpoint, next);
        selectedEndpoint = null;
        sync();
        return;
      }
      selectedEndpoint = next;
      sync();
    }

    function findSnapTarget(source, point) {
      const targetSide = source.side === "left" ? "right" : "left";
      const anchors = targetSide === "left" ? leftAnchors : rightAnchors;
      let nearest = null;
      let nearestDistance = SNAP_DISTANCE_PX;
      anchors.forEach((anchor, index) => {
        const center = getAnchorCenter(anchor);
        const distance = Math.hypot(center.x - point.x, center.y - point.y);
        if (distance <= nearestDistance) {
          nearestDistance = distance;
          nearest = { side: targetSide, index };
        }
      });
      return nearest;
    }

    function finishPointerGesture(event, cancelled = false) {
      if (!dragSession || dragSession.pointerId !== event.pointerId) {
        return;
      }
      const session = dragSession;
      dragSession = null;

      if (!cancelled && session.moved && session.snapTarget) {
        connectEndpoints(session.source, session.snapTarget);
        selectedEndpoint = null;
      } else if (!cancelled && !session.moved) {
        selectedEndpoint = session.previousSelection;
        selectEndpoint(session.source.side, session.source.index);
      } else if (session.moved) {
        selectedEndpoint = null;
      }
      sync();
    }

    function attachAnchorInteraction(anchor, side, index) {
      if (readOnly) {
        return;
      }

      let suppressClick = false;
      anchor.addEventListener("pointerdown", (event) => {
        if (event.button !== undefined && event.button !== 0) {
          return;
        }
        event.preventDefault();
        suppressClick = true;
        const source = { side, index };
        dragSession = {
          pointerId: event.pointerId,
          source,
          previousSelection: selectedEndpoint ? { ...selectedEndpoint } : null,
          startClientX: event.clientX,
          startClientY: event.clientY,
          point: getStagePoint(event.clientX, event.clientY),
          moved: false,
          snapTarget: null,
        };
        try {
          anchor.setPointerCapture(event.pointerId);
        } catch (_error) {
          // Pointer capture is an enhancement; the click interaction still works without it.
        }
        sync();
      });

      anchor.addEventListener("pointermove", (event) => {
        if (!dragSession || dragSession.pointerId !== event.pointerId) {
          return;
        }
        const distance = Math.hypot(
          event.clientX - dragSession.startClientX,
          event.clientY - dragSession.startClientY
        );
        if (distance >= MOVE_THRESHOLD_PX) {
          dragSession.moved = true;
        }
        dragSession.point = getStagePoint(event.clientX, event.clientY);
        dragSession.snapTarget = dragSession.moved
          ? findSnapTarget(dragSession.source, dragSession.point)
          : null;
        sync();
      });

      anchor.addEventListener("pointerup", (event) => {
        event.preventDefault();
        finishPointerGesture(event, false);
      });

      anchor.addEventListener("pointercancel", (event) => {
        finishPointerGesture(event, true);
      });

      anchor.addEventListener("click", (event) => {
        event.preventDefault();
        if (suppressClick) {
          suppressClick = false;
          return;
        }
        selectEndpoint(side, index);
      });
    }

    function attachCardInteraction(card, side, index) {
      if (readOnly) {
        return;
      }
      card.addEventListener("click", () => selectEndpoint(side, index));
      card.setAttribute("role", "button");
      card.tabIndex = 0;
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          selectEndpoint(side, index);
        }
      });
    }

    leftItems.forEach((item, index) => {
      const row = document.createElement("div");
      row.className = "matching-row left";

      const card = document.createElement("div");
      card.className = `matching-card${containsHebrewText(item?.text) ? " hebrew" : " english"}`;
      card.textContent = item.text;
      attachCardInteraction(card, "left", index);

      const anchor = document.createElement("button");
      anchor.type = "button";
      anchor.className = "matching-anchor left";
      anchor.setAttribute("aria-label", `Connect ${item.text}`);
      anchor.setAttribute("aria-disabled", readOnly ? "true" : "false");
      anchor.tabIndex = readOnly ? -1 : 0;
      attachAnchorInteraction(anchor, "left", index);

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
      attachAnchorInteraction(anchor, "right", index);

      const card = document.createElement("div");
      card.className = `matching-card${containsHebrewText(item?.text) ? " hebrew" : " english"}`;
      card.textContent = item.text;
      attachCardInteraction(card, "right", index);

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
        dragSession = null;
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
        if (renderFrame !== null && typeof cancelAnimationFrame === "function") {
          cancelAnimationFrame(renderFrame);
        }
      },
    };

    sync();
  }

  window.renderMatchingDragQuestion = renderFlatStickerMatchingQuestion;
})();
