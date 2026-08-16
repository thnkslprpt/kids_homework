function playConfetti(durationMs) {
  stopConfetti();

  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const layer = document.createElement("div");
  layer.className = "confetti-layer";
  const colors = ["#ff6b6b", "#ffd166", "#06d6a0", "#118ab2", "#ef476f", "#7cc576"];
  document.body.appendChild(layer);

  confettiRuntime.layer = layer;
  confettiRuntime.pieces = [];
  confettiRuntime.pointer = null;
  confettiRuntime.startTime = getNow();
  confettiRuntime.lastFrameTime = confettiRuntime.startTime;

  const viewportWidth = getViewportWidth();
  for (let index = 0; index < 180; index += 1) {
    const piece = createConfettiPiece(layer, colors);
    resetConfettiPiece(piece, 0, durationMs, viewportWidth, true);
    confettiRuntime.pieces.push(piece);
  }

  confettiRuntime.moveHandler = (event) => {
    confettiRuntime.pointer = {
      x: event.clientX,
      y: event.clientY,
    };
  };
  window.addEventListener("pointermove", confettiRuntime.moveHandler, { passive: true });

  const maxLifetimeMs = durationMs + 18000;
  confettiRuntime.cleanupTimerId = window.setTimeout(stopConfetti, maxLifetimeMs);
  confettiRuntime.frameId = window.requestAnimationFrame((now) => animateConfetti(now, durationMs));
}

function stopConfetti() {
  if (confettiRuntime.frameId !== null) {
    window.cancelAnimationFrame(confettiRuntime.frameId);
    confettiRuntime.frameId = null;
  }

  if (confettiRuntime.cleanupTimerId !== null) {
    window.clearTimeout(confettiRuntime.cleanupTimerId);
    confettiRuntime.cleanupTimerId = null;
  }

  if (confettiRuntime.moveHandler) {
    window.removeEventListener("pointermove", confettiRuntime.moveHandler);
    confettiRuntime.moveHandler = null;
  }

  if (confettiRuntime.layer) {
    confettiRuntime.layer.remove();
    confettiRuntime.layer = null;
  }

  confettiRuntime.pieces = [];
  confettiRuntime.pointer = null;
  confettiRuntime.startTime = 0;
  confettiRuntime.lastFrameTime = 0;

  document.querySelectorAll(".confetti-layer").forEach((layer) => layer.remove());
}

function createConfettiPiece(layer, colors) {
  const piece = document.createElement("span");
  piece.className = "confetti-piece";
  piece.style.background = randomChoice(colors);
  piece.style.display = "none";
  layer.appendChild(piece);

  return {
    active: false,
    element: piece,
    gravity: 0,
    height: 0,
    rotation: 0,
    rotationSpeed: 0,
    spawnAt: 0,
    wobbleAmount: 0,
    wobblePhase: 0,
    wobbleSpeed: 0,
    width: 0,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
  };
}

function resetConfettiPiece(piece, elapsedMs, durationMs, viewportWidth, allowFullSpawnWindow) {
  const maxDelay = allowFullSpawnWindow
    ? durationMs
    : Math.min(1400, Math.max(250, durationMs - elapsedMs));

  piece.active = false;
  piece.spawnAt = elapsedMs + randomInt(0, maxDelay);
  piece.width = randomInt(8, 14);
  piece.height = randomInt(12, 22);
  piece.x = Math.random() * viewportWidth;
  piece.y = -randomInt(30, 220);
  piece.vx = randomInt(-40, 40);
  piece.vy = randomInt(18, 55);
  piece.gravity = randomInt(80, 160);
  piece.rotation = randomInt(0, 360);
  piece.rotationSpeed = randomInt(-260, 260);
  piece.wobbleAmount = randomInt(18, 46);
  piece.wobbleSpeed = 1.2 + Math.random() * 2.4;
  piece.wobblePhase = Math.random() * Math.PI * 2;

  piece.element.style.width = `${piece.width}px`;
  piece.element.style.height = `${piece.height}px`;
  piece.element.style.left = "0";
  piece.element.style.top = "0";
  piece.element.style.opacity = `${0.78 + Math.random() * 0.22}`;
  piece.element.style.display = "none";
}

function animateConfetti(now, durationMs) {
  if (!confettiRuntime.layer) {
    return;
  }

  const elapsedMs = now - confettiRuntime.startTime;
  const deltaMs = Math.min(32, now - confettiRuntime.lastFrameTime || 16);
  const deltaSeconds = deltaMs / 1000;
  const viewportWidth = getViewportWidth();
  const viewportHeight = getViewportHeight();
  const pointer = confettiRuntime.pointer;
  let activeCount = 0;

  confettiRuntime.lastFrameTime = now;

  for (const piece of confettiRuntime.pieces) {
    if (!piece.active) {
      if (elapsedMs >= piece.spawnAt) {
        piece.active = true;
        piece.element.style.display = "block";
      } else {
        continue;
      }
    }

    if (pointer) {
      applyConfettiRepulsion(piece, pointer, deltaSeconds);
    }

    piece.vx *= 0.996;
    piece.vy += piece.gravity * deltaSeconds;
    piece.x +=
      (piece.vx + Math.sin(elapsedMs / 1000 * piece.wobbleSpeed + piece.wobblePhase) * piece.wobbleAmount) *
      deltaSeconds;
    piece.y += piece.vy * deltaSeconds;
    piece.rotation += piece.rotationSpeed * deltaSeconds;

    piece.element.style.transform =
      `translate3d(${piece.x}px, ${piece.y}px, 0) rotate(${piece.rotation}deg)`;

    if (piece.y > viewportHeight + 140 || piece.x < -180 || piece.x > viewportWidth + 180) {
      if (elapsedMs < durationMs) {
        resetConfettiPiece(piece, elapsedMs, durationMs, viewportWidth, false);
      } else {
        piece.active = false;
        piece.element.style.display = "none";
      }
      continue;
    }

    activeCount += 1;
  }

  if (elapsedMs < durationMs || activeCount > 0) {
    confettiRuntime.frameId = window.requestAnimationFrame((frameNow) =>
      animateConfetti(frameNow, durationMs)
    );
    return;
  }

  stopConfetti();
}

function applyConfettiRepulsion(piece, pointer, deltaSeconds) {
  const dx = piece.x - pointer.x;
  const dy = piece.y - pointer.y;
  const distance = Math.hypot(dx, dy) || 1;
  const radius = 170;

  if (distance > radius) {
    return;
  }

  const force = (1 - distance / radius) * 1900;
  piece.vx += (dx / distance) * force * deltaSeconds;
  piece.vy += (dy / distance) * force * deltaSeconds;
}

function getNow() {
  if (typeof performance !== "undefined" && typeof performance.now === "function") {
    return performance.now();
  }

  return Date.now();
}

function getViewportWidth() {
  return window.innerWidth || document.documentElement.clientWidth || 1024;
}

function getViewportHeight() {
  return window.innerHeight || document.documentElement.clientHeight || 768;
}
