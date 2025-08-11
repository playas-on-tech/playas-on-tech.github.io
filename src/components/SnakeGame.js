import React, { useEffect, useRef, useState } from 'react';
import '../css/SnakeGame.css';
import appIcon from '../app-icon.webp';

const GRID_SIZE = 20; // 20x20 grid
const CELL_SIZE = 20; // pixels per cell (canvas size will be 400x400)
const INITIAL_SPEED_MS = 140;

function getRandomFoodPosition(excludePositions) {
  while (true) {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    const conflict = excludePositions.some((p) => p.x === x && p.y === y);
    if (!conflict) return { x, y };
  }
}

export default function SnakeGame({ onClose }) {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const directionRef = useRef({ x: 1, y: 0 });
  const nextDirectionRef = useRef({ x: 1, y: 0 });
  const snakeRef = useRef([{ x: 8, y: 10 }, { x: 9, y: 10 }, { x: 10, y: 10 }]);
  const foodRef = useRef(getRandomFoodPosition(snakeRef.current));
  const speedRef = useRef(INITIAL_SPEED_MS);
  const intervalRef = useRef(null);
  const foodImageRef = useRef({ img: null, loaded: false });

  const resetGame = () => {
    snakeRef.current = [{ x: 8, y: 10 }, { x: 9, y: 10 }, { x: 10, y: 10 }];
    directionRef.current = { x: 1, y: 0 };
    nextDirectionRef.current = { x: 1, y: 0 };
    foodRef.current = getRandomFoodPosition(snakeRef.current);
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setIsWin(false);
    speedRef.current = INITIAL_SPEED_MS;
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // background
    ctx.fillStyle = 'rgba(0,0,0,0.85)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // grid (optional subtle)
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    for (let i = 0; i <= GRID_SIZE; i += 1) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE + 0.5, 0);
      ctx.lineTo(i * CELL_SIZE + 0.5, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE + 0.5);
      ctx.lineTo(canvas.width, i * CELL_SIZE + 0.5);
      ctx.stroke();
    }

    // food (sprite logo)
    const fx = foodRef.current.x * CELL_SIZE;
    const fy = foodRef.current.y * CELL_SIZE;
    const padding = 2; // small inset for nicer look
    if (foodImageRef.current.loaded && foodImageRef.current.img) {
      ctx.drawImage(
        foodImageRef.current.img,
        fx + padding,
        fy + padding,
        CELL_SIZE - padding * 2,
        CELL_SIZE - padding * 2
      );
    } else {
      // fallback while loading
      ctx.fillStyle = '#e74c3c';
      ctx.fillRect(fx + padding, fy + padding, CELL_SIZE - padding * 2, CELL_SIZE - padding * 2);
    }

    // snake
    snakeRef.current.forEach((segment, idx) => {
      ctx.fillStyle = idx === snakeRef.current.length - 1 ? '#2ecc71' : '#27ae60';
      ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    });
  };

  const tick = () => {
    if (isPaused || isGameOver || isWin) return;
    // update direction once per tick to avoid double turns in one frame
    directionRef.current = nextDirectionRef.current;

    const snake = [...snakeRef.current];
    const head = { ...snake[snake.length - 1] };
    head.x += directionRef.current.x;
    head.y += directionRef.current.y;

    // walls collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      setIsGameOver(true);
      return;
    }

    // self collision
    if (snake.some((s) => s.x === head.x && s.y === head.y)) {
      setIsGameOver(true);
      return;
    }

    snake.push(head);

    // food
    if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
      setScore((prev) => prev + 1);
      // increase speed modestly (min 70ms)
      speedRef.current = Math.max(70, speedRef.current - 5);
      foodRef.current = getRandomFoodPosition(snake);
      // keep tail (grow)
    } else {
      // move: remove tail
      snake.shift();
    }

    // win condition: snake fills the entire grid
    if (snake.length >= GRID_SIZE * GRID_SIZE) {
      snakeRef.current = snake;
      draw();
      setIsWin(true);
      return;
    }

    snakeRef.current = snake;
    draw();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Ensure crisp pixels
    canvas.width = GRID_SIZE * CELL_SIZE;
    canvas.height = GRID_SIZE * CELL_SIZE;

    // Load food sprite (logo)
    const img = new Image();
    img.src = appIcon;
    img.onload = () => {
      foodImageRef.current = { img, loaded: true };
      draw();
    };

    draw();

    // main loop managed by interval based on speed
    const startLoop = () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        tick();
      }, speedRef.current);
    };

    startLoop();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recreate loop when speed changes or when pause state toggles
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (isPaused || isGameOver) return;
    intervalRef.current = setInterval(() => {
      tick();
    }, speedRef.current);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, isGameOver]);

  // Keyboard controls
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
        return;
      }

      const isArrow = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key);
      const isWASD = ['w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(e.key);
      if (!isArrow && !isWASD && e.key !== ' ') return;

      e.preventDefault();

      const current = directionRef.current;
      const setNext = (x, y) => {
        // Prevent immediate reverse
        if (current.x + x === 0 && current.y + y === 0) return;
        nextDirectionRef.current = { x, y };
      };

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          setNext(0, -1);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          setNext(0, 1);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          setNext(-1, 0);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          setNext(1, 0);
          break;
        case ' ':
          setIsPaused((p) => !p);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKey, { passive: false });
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    if (!isGameOver) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [isGameOver]);

  useEffect(() => {
    if (!isWin) return;
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, [isWin]);

  const handleRestart = () => {
    resetGame();
  };

  return (
    <div className="snake-overlay" role="dialog" aria-modal="true" aria-label="Snake Game">
      <div className="snake-container">
        <div className="snake-topbar">
          <div className="snake-title">
            <span>🐍 Snake</span>
          </div>
          <div className="snake-controls">
            <span className="snake-score" aria-live="polite">Puntuación: {score}</span>
            <button className="snake-btn" onClick={() => setIsPaused((p) => !p)}>
              {isPaused ? 'Reanudar' : 'Pausa'}
            </button>
            <button className="snake-btn" onClick={handleRestart}>Reiniciar</button>
            <button className="snake-btn snake-close" aria-label="Cerrar" title="Cerrar (Esc)" onClick={onClose}>✕</button>
          </div>
        </div>
        <div className="snake-canvas-wrapper">
          <canvas ref={canvasRef} className="snake-canvas" width={GRID_SIZE * CELL_SIZE} height={GRID_SIZE * CELL_SIZE} />
          {(isGameOver || isWin) && (
            <div className="snake-overlay-message">
              <div className="snake-message-box">
                <div className="snake-message-title">{isWin ? '¡Ganaste!' : 'Game Over'}</div>
                <div className="snake-message-body">Puntuación: {score}</div>
                <div className="snake-message-actions">
                  <button className="snake-btn" onClick={handleRestart}>Jugar de nuevo</button>
                  <button className="snake-btn" onClick={onClose}>Salir</button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="snake-help">
          Usa flechas o WASD para mover. Barra espaciadora: Pausa. Esc: Cerrar.
        </div>
      </div>
    </div>
  );
}


