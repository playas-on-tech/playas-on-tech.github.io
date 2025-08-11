import React, { useEffect, useRef, useState } from 'react';
import '../css/FlappyBird.css';
import appIcon from '../app-icon.webp';

// Simple Flappy Bird clone with app icon as the bird sprite
const CANVAS_WIDTH = 420;
const CANVAS_HEIGHT = 640;
const GROUND_HEIGHT = 80;
const GRAVITY = 1200; // px/s^2
const FLAP_VELOCITY = -380; // px/s
const PIPE_SPEED = 160; // px/s
const PIPE_GAP = 160; // px
const PIPE_WIDTH = 70; // px
const PIPE_DISTANCE = 220; // px between pipes

export default function FlappyBird({ onClose }) {
  const canvasRef = useRef(null);
  const requestRef = useRef(0);
  const lastTimeRef = useRef(0);
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const [best, setBest] = useState(() => {
    const v = Number(localStorage.getItem('flappy_best') || '0');
    return Number.isFinite(v) ? v : 0;
  });
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [started, setStarted] = useState(false);
  const startedRef = useRef(false);
  const isGameOverRef = useRef(false);

  const birdRef = useRef({ x: 120, y: CANVAS_HEIGHT / 2, vy: 0, size: 36 });
  const pipesRef = useRef([]); // each: { x, gapY }
  const spawnTimerRef = useRef(0);
  const iconImageRef = useRef({ img: null, loaded: false });

  const resetGame = () => {
    birdRef.current = { x: 120, y: CANVAS_HEIGHT / 2, vy: 0, size: 36 };
    pipesRef.current = [];
    spawnTimerRef.current = 0;
    setScore(0);
    scoreRef.current = 0;
    setIsGameOver(false);
    setIsPaused(false);
    setStarted(false);
    startedRef.current = false;
    isGameOverRef.current = false;
  };

  const flap = () => {
    if (!startedRef.current) {
      setStarted(true);
      startedRef.current = true;
    }
    birdRef.current.vy = FLAP_VELOCITY;
  };

  const spawnPipe = () => {
    const marginTop = 60;
    const marginBottom = 60 + GROUND_HEIGHT;
    const available = CANVAS_HEIGHT - marginTop - marginBottom - PIPE_GAP;
    const gapTop = marginTop + Math.random() * Math.max(40, available);
    pipesRef.current.push({ x: CANVAS_WIDTH + 10, gapY: gapTop });
  };

  const checkCollision = () => {
    const b = birdRef.current;
    const half = b.size / 2;
    const birdRect = { left: b.x - half, right: b.x + half, top: b.y - half, bottom: b.y + half };

    // Death if hits ceiling or ground area or falls completely out of view
    if (birdRect.top <= 0) return true;
    if (birdRect.bottom >= CANVAS_HEIGHT - GROUND_HEIGHT) return true;
    if (birdRect.top > CANVAS_HEIGHT) return true;

    // Pipes (AABB vs AABB)
    for (const p of pipesRef.current) {
      const gapTop = p.gapY;
      const gapBottom = p.gapY + PIPE_GAP;
      // Upper pipe rect
      const up = { left: p.x, right: p.x + PIPE_WIDTH, top: 0, bottom: gapTop };
      // Lower pipe rect
      const low = { left: p.x, right: p.x + PIPE_WIDTH, top: gapBottom, bottom: CANVAS_HEIGHT - GROUND_HEIGHT };
      const overlap = (r1, r2) => !(r1.right <= r2.left || r1.left >= r2.right || r1.bottom <= r2.top || r1.top >= r2.bottom);
      if (overlap(birdRect, up) || overlap(birdRect, low)) return true;
    }
    return false;
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Sky background
    const sky = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    sky.addColorStop(0, '#60a5fa');
    sky.addColorStop(1, '#93c5fd');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Pipes
    ctx.fillStyle = '#10b981';
    ctx.strokeStyle = '#047857';
    pipesRef.current.forEach((p) => {
      // Upper pipe
      const topHeight = p.gapY;
      ctx.fillRect(p.x, 0, PIPE_WIDTH, topHeight);
      ctx.strokeRect(p.x + 0.5, 0.5, PIPE_WIDTH - 1, topHeight - 1);
      // Lower pipe
      const bottomY = p.gapY + PIPE_GAP;
      const bottomHeight = CANVAS_HEIGHT - GROUND_HEIGHT - bottomY;
      ctx.fillRect(p.x, bottomY, PIPE_WIDTH, bottomHeight);
      ctx.strokeRect(p.x + 0.5, bottomY + 0.5, PIPE_WIDTH - 1, bottomHeight - 1);
      // Pipe rims
      ctx.fillStyle = '#059669';
      ctx.fillRect(p.x - 6, topHeight - 16, PIPE_WIDTH + 12, 16);
      ctx.fillRect(p.x - 6, bottomY, PIPE_WIDTH + 12, 16);
      ctx.fillStyle = '#10b981';
    });

    // Ground
    const groundGrad = ctx.createLinearGradient(0, CANVAS_HEIGHT - GROUND_HEIGHT, 0, CANVAS_HEIGHT);
    groundGrad.addColorStop(0, '#065f46');
    groundGrad.addColorStop(1, '#064e3b');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, CANVAS_HEIGHT - GROUND_HEIGHT, CANVAS_WIDTH, GROUND_HEIGHT);

    // Bird (app icon)
    const b = birdRef.current;
    const size = b.size;
    if (iconImageRef.current.loaded && iconImageRef.current.img) {
      // slight rotation based on velocity
      const angle = Math.max(-0.5, Math.min(0.5, b.vy / 600));
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(angle);
      ctx.drawImage(iconImageRef.current.img, -size / 2, -size / 2, size, size);
      ctx.restore();
    } else {
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(b.x, b.y, size / 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // HUD
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(8, 8, 120, 44);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 18px system-ui, -apple-system, Segoe UI, Roboto, Arial';
    ctx.fillText(`Puntos: ${scoreRef.current}`, 16, 30);
    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.font = 'normal 12px system-ui, -apple-system, Segoe UI, Roboto, Arial';
    ctx.fillText(`Mejor: ${best}`, 16, 48);

    if (!startedRef.current && !isGameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 24px system-ui, -apple-system, Segoe UI, Roboto, Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Toca, clic o espacio para saltar', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
      ctx.textAlign = 'start';
    }

    if (isGameOver) {
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 28px system-ui, -apple-system, Segoe UI, Roboto, Arial';
      ctx.textAlign = 'center';
      ctx.fillText('Game Over', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);
      ctx.font = '16px system-ui, -apple-system, Segoe UI, Roboto, Arial';
      ctx.fillText(`Puntos: ${score}  •  Mejor: ${best}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 8);
      ctx.fillText('R para reiniciar  —  Esc para salir', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 34);
      ctx.textAlign = 'start';
    }
  };

  const update = (dt) => {
    if (isPaused || isGameOverRef.current) return;
    const b = birdRef.current;
    if (startedRef.current) {
      b.vy += GRAVITY * dt;
      b.y += b.vy * dt;
    }

    // Spawn and move pipes
    spawnTimerRef.current += dt * PIPE_SPEED;
    if (spawnTimerRef.current >= PIPE_DISTANCE) {
      spawnTimerRef.current -= PIPE_DISTANCE;
      spawnPipe();
    }
    pipesRef.current.forEach((p) => (p.x -= PIPE_SPEED * dt));
    // Remove off-screen
    pipesRef.current = pipesRef.current.filter((p) => p.x + PIPE_WIDTH > -10);

    // Score: when bird passes pipe center (robust against frame skips)
    for (const p of pipesRef.current) {
      const pipeCenter = p.x + PIPE_WIDTH / 2;
      if (!p.passed && pipeCenter < b.x) {
        p.passed = true;
        setScore((s) => {
          const next = s + 1;
          scoreRef.current = next;
          return next;
        });
      }
    }

    // Collisions
    if (checkCollision()) {
      setIsGameOver(true);
      isGameOverRef.current = true;
      setBest((prev) => {
        const next = Math.max(prev, score);
        localStorage.setItem('flappy_best', String(next));
        return next;
      });
    }
  };

  const animate = (tMs) => {
    const now = tMs * 0.001;
    const dt = Math.min(0.05, now - (lastTimeRef.current || now));
    lastTimeRef.current = now;
    if (dt > 0) update(dt);
    draw();
    requestRef.current = requestAnimationFrame(animate);
  };

  // Input (stable handlers using refs)
  useEffect(() => {
    const onPointer = (e) => {
      e.preventDefault();
      if (isGameOverRef.current) return;
      flap();
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
        return;
      }
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        if (!isGameOverRef.current) flap();
      }
      if (e.key.toLowerCase() === 'p') setIsPaused((p) => !p);
      if (e.key.toLowerCase() === 'r') {
        if (isGameOverRef.current) resetGame();
      }
    };
    window.addEventListener('pointerdown', onPointer, { passive: false });
    window.addEventListener('keydown', onKey, { passive: false });
    return () => {
      window.removeEventListener('pointerdown', onPointer);
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
    }
    const img = new Image();
    img.src = appIcon;
    img.onload = () => {
      iconImageRef.current = { img, loaded: true };
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isGameOver) return;
    setBest((prev) => {
      const next = Math.max(prev, score);
      localStorage.setItem('flappy_best', String(next));
      return next;
    });
  }, [isGameOver, score]);

  const handleRestart = () => {
    resetGame();
  };

  return (
    <div className="flappy-overlay" role="dialog" aria-modal="true" aria-label="Flappy Bird">
      <div className="flappy-container">
        <div className="flappy-topbar">
          <div className="flappy-title">Flappy</div>
          <div className="flappy-controls">
            <span className="flappy-score" aria-live="polite">Puntos: {score}</span>
            <button className="flappy-btn" onClick={() => setIsPaused((p) => !p)}>
              {isPaused ? 'Reanudar' : 'Pausa'}
            </button>
            <button className="flappy-btn" onClick={handleRestart}>Reiniciar</button>
            <button className="flappy-btn flappy-close" onClick={onClose} title="Cerrar (Esc)" aria-label="Cerrar">✕</button>
          </div>
        </div>
        <div className="flappy-canvas-wrapper">
          <canvas ref={canvasRef} className="flappy-canvas" />
          <div className="flappy-help">Clic/Toque/Espacio: Saltar. P: Pausa. R: Reiniciar. Esc: Cerrar.</div>
        </div>
      </div>
    </div>
  );
}


