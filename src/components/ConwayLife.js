import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import '../css/ConwayLife.css';
import dannyUrl from '../img/staff/danny.png';
import frankyUrl from '../img/staff/franky.png';
import hUrl from '../img/staff/h.png';
import juanequeUrl from '../img/staff/juaneque.png';
import kevUrl from '../img/staff/kev.png';
import unpaidDevUrl from '../img/staff/unpaid dev.png';

const COLS = 40;
const ROWS = 30;
const CELL_SIZE = 12; // canvas: 480x360
const INITIAL_SPEED_MS = 120;
const SPEED_MIN_MS = 40;
const SPEED_MAX_MS = 400;

// Staff sprite assets
const SPRITE_URLS = [dannyUrl, frankyUrl, hUrl, juanequeUrl, kevUrl, unpaidDevUrl];
const SPRITE_COUNT = SPRITE_URLS.length;

function createEmptyGrid() {
  return Array.from({ length: ROWS }, () => Array.from({ length: COLS }, () => 0));
}

function getRandomSpriteIndex(maxExclusive) {
  if (!maxExclusive) return 0;
  return Math.floor(Math.random() * maxExclusive) + 1; // 1..maxExclusive
}

function randomizeGrid(density = 0.33, spriteCount = 1) {
  return Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () =>
      Math.random() < density ? getRandomSpriteIndex(spriteCount) : 0
    )
  );
}

function getNextGridState(grid, spriteCount) {
  const next = createEmptyGrid();
  const get = (r, c) => grid[(r + ROWS) % ROWS][(c + COLS) % COLS]; // wrap-around
  for (let r = 0; r < ROWS; r += 1) {
    for (let c = 0; c < COLS; c += 1) {
      let neighbors = 0;
      neighbors += get(r - 1, c - 1) > 0 ? 1 : 0;
      neighbors += get(r - 1, c) > 0 ? 1 : 0;
      neighbors += get(r - 1, c + 1) > 0 ? 1 : 0;
      neighbors += get(r, c - 1) > 0 ? 1 : 0;
      neighbors += get(r, c + 1) > 0 ? 1 : 0;
      neighbors += get(r + 1, c - 1) > 0 ? 1 : 0;
      neighbors += get(r + 1, c) > 0 ? 1 : 0;
      neighbors += get(r + 1, c + 1) > 0 ? 1 : 0;

      const alive = grid[r][c] > 0;
      if (alive && (neighbors === 2 || neighbors === 3)) {
        next[r][c] = grid[r][c]; // keep sprite
      } else if (!alive && neighbors === 3) {
        next[r][c] = getRandomSpriteIndex(spriteCount); // assign new sprite
      } else {
        next[r][c] = 0;
      }
    }
  }
  return next;
}

export default function ConwayLife({ onClose }) {
  const canvasRef = useRef(null);
  const spriteImagesRef = useRef([]);
  const [grid, setGrid] = useState(() => randomizeGrid(0.3, SPRITE_COUNT));
  const [isRunning, setIsRunning] = useState(true);
  const [speedMs, setSpeedMs] = useState(INITIAL_SPEED_MS);
  const intervalRef = useRef(null);
  const generationRef = useRef(0);

  // Preload sprites once
  useEffect(() => {
    spriteImagesRef.current = SPRITE_URLS.map((url) => {
      const img = new Image();
      img.src = url;
      img.decoding = 'async';
      return img;
    });
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // background
    ctx.fillStyle = 'rgba(0,0,0,0.85)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // subtle grid
    ctx.strokeStyle = 'rgba(255,255,255,0.07)';
    for (let c = 0; c <= COLS; c += 1) {
      ctx.beginPath();
      ctx.moveTo(c * CELL_SIZE + 0.5, 0);
      ctx.lineTo(c * CELL_SIZE + 0.5, canvas.height);
      ctx.stroke();
    }
    for (let r = 0; r <= ROWS; r += 1) {
      ctx.beginPath();
      ctx.moveTo(0, r * CELL_SIZE + 0.5);
      ctx.lineTo(canvas.width, r * CELL_SIZE + 0.5);
      ctx.stroke();
    }

    // cells
    for (let r = 0; r < ROWS; r += 1) {
      for (let c = 0; c < COLS; c += 1) {
        const spriteIndex = grid[r][c];
        if (spriteIndex > 0) {
          const img = spriteImagesRef.current[spriteIndex - 1];
          if (img && img.complete && img.naturalWidth > 0) {
            ctx.drawImage(img, c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          } else {
            ctx.fillStyle = '#38bdf8';
            ctx.fillRect(c * CELL_SIZE, r * CELL_SIZE, CELL_SIZE, CELL_SIZE);
          }
        }
      }
    }
  }, [grid]);

  const step = useCallback(() => {
    generationRef.current += 1;
    setGrid((prev) => getNextGridState(prev, SPRITE_COUNT));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = COLS * CELL_SIZE;
    canvas.height = ROWS * CELL_SIZE;
    draw();
  }, [draw]);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!isRunning) return;
    intervalRef.current = setInterval(() => {
      step();
    }, speedMs);
    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [isRunning, speedMs, step]);

  useEffect(() => {
    draw();
  }, [grid, draw]);

  // toggle cell on click (only when paused to avoid race)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onClick = (e) => {
      if (isRunning) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const c = Math.floor(x / CELL_SIZE);
      const r = Math.floor(y / CELL_SIZE);
      if (c >= 0 && c < COLS && r >= 0 && r < ROWS) {
        setGrid((prev) => {
          const next = prev.map((row) => row.slice());
          next[r][c] = next[r][c] ? 0 : getRandomSpriteIndex(SPRITE_COUNT);
          return next;
        });
      }
    };
    canvas.addEventListener('click', onClick);
    return () => canvas.removeEventListener('click', onClick);
  }, [isRunning]);

  // keyboard shortcuts
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
        return;
      }
      if (e.key === ' ') {
        e.preventDefault();
        setIsRunning((r) => !r);
      }
      if (e.key.toLowerCase() === 'r') {
        setGrid(randomizeGrid(0.3, SPRITE_COUNT));
      }
      if (e.key.toLowerCase() === 'c') {
        setGrid(createEmptyGrid());
      }
      if (e.key.toLowerCase() === 'n') {
        setIsRunning(false);
        step();
      }
    };
    window.addEventListener('keydown', handleKey, { passive: false });
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, step]);

  const aliveCount = useMemo(
    () => grid.reduce((sum, row) => sum + row.reduce((a, b) => a + (b > 0 ? 1 : 0), 0), 0),
    [grid]
  );

  return (
    <div
      className="life-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Conway's Game of Life"
    >
      <div className="life-container">
        <div className="life-topbar">
          <div className="life-title">Conway&apos;s Game of Life</div>
          <div className="life-controls">
            <span className="life-stat">Gen: {generationRef.current}</span>
            <span className="life-stat">Vivas: {aliveCount}</span>
            <label className="life-speed">
              Velocidad
              <input
                type="range"
                min={SPEED_MIN_MS}
                max={SPEED_MAX_MS}
                step="10"
                value={SPEED_MIN_MS + SPEED_MAX_MS - speedMs}
                onChange={(e) => setSpeedMs(SPEED_MIN_MS + SPEED_MAX_MS - Number(e.target.value))}
                aria-label="Velocidad"
              />
            </label>
            <button className="life-btn" onClick={() => setIsRunning((r) => !r)}>
              {isRunning ? 'Pausa' : 'Reanudar'}
            </button>
            <button className="life-btn" onClick={() => setGrid(randomizeGrid(0.3))}>
              Aleatorio
            </button>
            <button
              className="life-btn"
              onClick={() => {
                setIsRunning(false);
                setGrid(createEmptyGrid());
              }}
            >
              Limpiar
            </button>
            <button
              className="life-btn"
              onClick={() => {
                setIsRunning(false);
                step();
              }}
            >
              Paso
            </button>
            <button
              className="life-btn life-close"
              onClick={onClose}
              title="Cerrar (Esc)"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="life-canvas-wrapper">
          <canvas
            ref={canvasRef}
            className="life-canvas"
            width={COLS * CELL_SIZE}
            height={ROWS * CELL_SIZE}
          />
        </div>
        <div className="life-help">
          Click para alternar células (en pausa). Barra espaciadora: Pausa/Reanudar. R: Aleatorio.
          C: Limpiar. N: Paso. Esc: Cerrar.
        </div>
      </div>
    </div>
  );
}
