import React, { useEffect, useRef, useState } from 'react';
import '../css/DoomMini.css';
import appIcon from '../app-icon.webp';
import dannyPng from '../img/staff/danny.png';
import frankyPng from '../img/staff/franky.png';
import hPng from '../img/staff/h.png';
import juanequePng from '../img/staff/juaneque.png';
import kevPng from '../img/staff/kev.png';
import unpaidDevPng from '../img/staff/unpaid dev.png';

// Mini raycaster (Wolf3D-like) as a Doom-style easter egg
const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 300;

// Simple map: 1 = wall
const worldMap = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

export default function DoomMini({ onClose }) {
  const canvasRef = useRef(null);
  const [fps, setFps] = useState(0);
  const keysRef = useRef({});
  const requestRef = useRef(0);
  const lastTimeRef = useRef(0);
  const zBufferRef = useRef(new Float32Array(CANVAS_WIDTH));

  // Wall textures (staff images)
  const wallTexturesRef = useRef({ images: [], loaded: false });

  // Proyectiles (bolas de fuego)
  const projectilesRef = useRef([]);
  const lastShotRef = useRef(0);

  // Constantes de combate
  const FIRE_COOLDOWN = 0.25; // s
  const FIRE_SPEED = 6.0; // units/s
  const FIREBALL_RADIUS = 0.18; // unidades de mapa
  const ENEMY_RADIUS = 0.35;

  // Audio 8-bit (WebAudio)
  const audioContextRef = useRef(null);
  const audioReadyRef = useRef(false);
  const musicRef = useRef({
    started: false,
    intervals: [],
    leadOsc: null,
    leadGain: null,
    bassOsc: null,
    bassGain: null,
    masterGain: null
  });

  const initAudioIfNeeded = () => {
    if (audioContextRef.current) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      audioContextRef.current = ctx;
      audioReadyRef.current = true;
      if (ctx.state === 'suspended') ctx.resume();
      // arrancar música si no está
      startMusic();
    } catch (_) {
      // ignore
    }
  };

  const unlockAudio = async () => {
    try {
      if (!audioContextRef.current) initAudioIfNeeded();
      const ctx = audioContextRef.current;
      if (!ctx) return;
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      if (!musicRef.current.started) startMusic();
    } catch (_) {
      // ignore
    }
  };

  const playChirp = (startHz, endHz, durationSec, type = 'square', volume = 0.08) => {
    const ctx = audioContextRef.current;
    if (!ctx) return;
    const now = ctx.currentTime;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + durationSec);
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.setValueAtTime(Math.max(10, startHz), now);
    osc.frequency.linearRampToValueAtTime(Math.max(10, endHz), now + durationSec);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + durationSec);
  };

  const playShootSound = () => {
    initAudioIfNeeded();
    if (!audioContextRef.current) return;
    // Disparo estilo 8-bit: barrido descendente corto
    playChirp(900, 300, 0.12, 'square', 0.09);
  };

  const playHitSound = () => {
    initAudioIfNeeded();
    if (!audioContextRef.current) return;
    // Golpe: dos chirps cortos
    playChirp(220, 110, 0.07, 'square', 0.11);
    setTimeout(() => playChirp(660, 330, 0.05, 'square', 0.08), 20);
  };

  // Música 8-bit de fondo
  const midiToFreq = (m) => 440 * Math.pow(2, (m - 69) / 12);

  const createDistortionCurve = (amount = 20) => {
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
    }
    return curve;
  };

  const playNoiseBurst = (durationSec, volume, type = 'snare') => {
    const ctx = audioContextRef.current;
    if (!ctx) return;
    const bufferSize = Math.floor(ctx.sampleRate * durationSec);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i += 1) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durationSec);
    let node = src;
    if (type === 'snare') {
      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = 1200;
      node.connect(hp);
      node = hp;
    }
    node.connect(gain);
    gain.connect(ctx.destination);
    src.start();
    src.stop(ctx.currentTime + durationSec);
  };

  const startMusic = () => {
    if (musicRef.current.started) return;
    const ctx = audioContextRef.current;
    if (!ctx) return;

    // Master con ligera distorsión para un tono más agresivo
    const master = ctx.createGain();
    master.gain.value = 0.14;
    const shaper = ctx.createWaveShaper();
    shaper.curve = createDistortionCurve(35);
    shaper.oversample = '2x';
    master.connect(shaper);
    shaper.connect(ctx.destination);

    // Canales lead y bass
    const leadGain = ctx.createGain();
    leadGain.gain.value = 0.0;
    const leadPan = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    if (leadPan) {
      leadPan.pan.value = -0.2;
      leadGain.connect(leadPan);
      leadPan.connect(master);
    } else {
      leadGain.connect(master);
    }
    const lead = ctx.createOscillator();
    lead.type = 'square';
    lead.frequency.value = midiToFreq(76); // E5 inicial
    lead.connect(leadGain);
    lead.start();

    // (Guitarra removida)

    const bassGain = ctx.createGain();
    bassGain.gain.value = 0.0;
    bassGain.connect(master);
    const bass = ctx.createOscillator();
    bass.type = 'square';
    bass.frequency.value = midiToFreq(40); // E2 inicial
    bass.connect(bassGain);
    bass.start();

    // Patrón intenso tipo power-chords/arpegios (sin copiar melodías)
    const bpm = 140;
    const step = 60 / bpm / 4; // semicorcheas
    let i = 0;

    // Rutas armónicas: E, D, C, B (en bucle)
    const bassRoots = [40, 38, 36, 35]; // E2, D2, C2, B1

    const tick = () => {
      const t = ctx.currentTime + 0.005;
      const barPos = i % 16; // 16 pasos por compás
      const barIdx = Math.floor(i / 16);
      const root = bassRoots[barIdx % bassRoots.length];

      // Bajo: patrón de galope (acento en 0, 3, 6, 8, 11, 14)
      const gallopAccents = new Set([0, 3, 6, 8, 11, 14]);
      const bassNote = barPos % 4 === 3 ? root + 7 : root; // añadir quinta en el cuarto paso
      if (barPos % 2 === 0) {
        bass.frequency.setValueAtTime(midiToFreq(bassNote), t);
        bassGain.gain.cancelScheduledValues(t);
        const bassVol = gallopAccents.has(barPos) ? 0.09 : 0.06;
        bassGain.gain.setValueAtTime(0.0, t);
        bassGain.gain.linearRampToValueAtTime(bassVol, t + 0.004);
        bassGain.gain.exponentialRampToValueAtTime(0.0001, t + step * 0.95);
      }

      // Lead: arpegio agresivo root-fifth-octave con saltos cromáticos ocasionales
      const arp = [0, 7, 12, 7, 0, 7, 12, 15, 12, 7, 0, 7, 12, 10, 7, 12];
      const leadMidi = root + 36 + arp[barPos]; // subir dos octavas + arpegio
      lead.frequency.setValueAtTime(midiToFreq(leadMidi), t);
      leadGain.gain.cancelScheduledValues(t);
      const leadVol = gallopAccents.has(barPos) ? 0.08 : 0.06;
      leadGain.gain.setValueAtTime(0.0, t);
      leadGain.gain.linearRampToValueAtTime(leadVol, t + 0.006);
      leadGain.gain.exponentialRampToValueAtTime(0.0001, t + step * 0.85);

      // Percusión: kick en 0,4,8,12; snare en 4 y 12 offbeats; hihat cada paso
      if (barPos % 4 === 0) {
        // kick (seno grave corto)
        const kick = ctx.createOscillator();
        const g = ctx.createGain();
        kick.type = 'sine';
        kick.frequency.setValueAtTime(90, t);
        kick.frequency.exponentialRampToValueAtTime(40, t + 0.08);
        g.gain.setValueAtTime(0.18, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
        kick.connect(g);
        g.connect(master);
        kick.start(t);
        kick.stop(t + 0.14);
      }

      if (barPos === 4 || barPos === 12) {
        // snare (ruido breve)
        playNoiseBurst(0.06, 0.12, 'snare');
      }

      // hi-hat/clave
      const hat = ctx.createOscillator();
      const hatGain = ctx.createGain();
      hat.type = 'square';
      hat.frequency.setValueAtTime(2000, t);
      hatGain.gain.setValueAtTime(barPos % 2 === 0 ? 0.05 : 0.035, t);
      hatGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
      hat.connect(hatGain);
      hatGain.connect(master);
      hat.start(t);
      hat.stop(t + 0.05);

      i += 1;
    };

    tick();
    const id = setInterval(tick, step * 1000);
    musicRef.current = {
      started: true,
      intervals: [id],
      leadOsc: lead,
      leadGain,
      bassOsc: bass,
      bassGain,
      masterGain: master
    };
  };

  const stopMusic = () => {
    // const ctx = audioContextRef.current;
    const m = musicRef.current;
    if (!m.started) return;
    m.intervals.forEach((id) => clearInterval(id));
    try {
      m.leadOsc?.stop();
      m.bassOsc?.stop();
    } catch (_) {
      // Error handled
    }
    m.leadGain?.disconnect();
    m.bassGain?.disconnect();
    m.masterGain?.disconnect();
    musicRef.current = {
      started: false,
      intervals: [],
      leadOsc: null,
      leadGain: null,
      bassOsc: null,
      bassGain: null,
      masterGain: null
    };
    // no cerramos el contexto para permitir sonidos SFX
  };

  // Sprite (enemy) state
  const enemyRef = useRef([
    // Posición inicial visible cerca del jugador en el pasillo superior
    { x: 6.5, y: 3.5, texture: null, hitTexture: null, loaded: false, waypointIdx: 0 }
  ]);

  // Patrol waypoints (square loop inside the central room)
  const enemyWaypointsRef = useRef([
    [
      // Ruta amplia alrededor del mapa evitando el bloque central
      { x: 6.5, y: 3.5 },
      { x: 12.5, y: 3.5 },
      { x: 12.5, y: 6.5 },
      { x: 12.5, y: 8.5 },
      { x: 12.5, y: 12.5 },
      { x: 3.5, y: 12.5 },
      { x: 3.5, y: 8.5 },
      { x: 3.5, y: 6.5 },
      { x: 3.5, y: 3.5 }
    ]
  ]);

  // Player state
  const playerRef = useRef({
    x: 3.5,
    y: 3.5,
    dirX: 1, // facing east
    dirY: 0,
    planeX: 0,
    planeY: 0.66 // FOV (~66 degrees)
  });

  const mapWidth = worldMap[0].length;
  const mapHeight = worldMap.length;

  const handleKeyDown = (e) => {
    // normalize letters to lowercase, keep special keys (Arrow*, Shift, Escape)
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    // Close
    if (key === 'Escape') {
      onClose?.();
      return;
    }
    // prevent page scroll with arrows / space or WASD
    const prevent =
      ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key) ||
      ['w', 'a', 's', 'd', 'q', 'e'].includes(key);
    if (prevent) e.preventDefault();
    keysRef.current[key] = true;

    // Disparo con Space
    if (key === ' ' || key === 'Spacebar' || e.code === 'Space') {
      tryShoot();
    }
  };

  const handleKeyUp = (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    keysRef.current[key] = false;
  };

  const moveAndRotate = (dt) => {
    const player = playerRef.current;
    const speed = (keysRef.current.Shift ? 4.0 : 2.5) * dt; // units/sec
    const rotSpeed = (keysRef.current.Shift ? 3.0 : 2.0) * dt; // rad/sec

    // Forward/back
    if (keysRef.current['w'] || keysRef.current['ArrowUp']) {
      const nx = player.x + player.dirX * speed;
      const ny = player.y + player.dirY * speed;
      if (worldMap[Math.floor(player.y)][Math.floor(nx)] === 0) player.x = nx;
      if (worldMap[Math.floor(ny)][Math.floor(player.x)] === 0) player.y = ny;
    }
    if (keysRef.current['s'] || keysRef.current['ArrowDown']) {
      const nx = player.x - player.dirX * speed;
      const ny = player.y - player.dirY * speed;
      if (worldMap[Math.floor(player.y)][Math.floor(nx)] === 0) player.x = nx;
      if (worldMap[Math.floor(ny)][Math.floor(player.x)] === 0) player.y = ny;
    }

    // Strafe left/right (A/D)
    const strafeX = -player.dirY;
    const strafeY = player.dirX;
    if (keysRef.current['a']) {
      const nx = player.x + strafeX * speed;
      const ny = player.y + strafeY * speed;
      if (worldMap[Math.floor(player.y)][Math.floor(nx)] === 0) player.x = nx;
      if (worldMap[Math.floor(ny)][Math.floor(player.x)] === 0) player.y = ny;
    }
    if (keysRef.current['d']) {
      const nx = player.x - strafeX * speed;
      const ny = player.y - strafeY * speed;
      if (worldMap[Math.floor(player.y)][Math.floor(nx)] === 0) player.x = nx;
      if (worldMap[Math.floor(ny)][Math.floor(player.x)] === 0) player.y = ny;
    }

    // Rotate left/right (Q/E or arrows)
    if (keysRef.current['q'] || keysRef.current['ArrowLeft']) {
      rotate(-rotSpeed);
    }
    if (keysRef.current['e'] || keysRef.current['ArrowRight']) {
      rotate(rotSpeed);
    }
  };

  const tryShoot = () => {
    initAudioIfNeeded();
    const now = lastTimeRef.current || 0;
    if (now - (lastShotRef.current || 0) < FIRE_COOLDOWN) return;
    lastShotRef.current = now;
    const p = playerRef.current;
    // origen algo adelantado para no colisionar con el jugador
    const originX = p.x + p.dirX * 0.4;
    const originY = p.y + p.dirY * 0.4;
    const projectile = {
      x: originX,
      y: originY,
      vx: p.dirX * FIRE_SPEED,
      vy: p.dirY * FIRE_SPEED,
      alive: true,
      age: 0,
      maxAge: 2.0 // segundos de vida
    };
    projectilesRef.current.push(projectile);
    playShootSound();
  };

  const isWalkable = (x, y) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    if (xi < 0 || yi < 0 || xi >= mapWidth || yi >= mapHeight) return false;
    return worldMap[yi][xi] === 0;
  };

  const updateEnemies = (dt) => {
    const speed = 1.6; // units/sec (ligeramente más rápido)
    enemyRef.current.forEach((en, idx) => {
      const waypoints = enemyWaypointsRef.current[idx] || [];
      if (waypoints.length === 0) return;
      const target = waypoints[en.waypointIdx % waypoints.length];
      const dx = target.x - en.x;
      const dy = target.y - en.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 0.05) {
        en.waypointIdx = (en.waypointIdx + 1) % waypoints.length;
        return;
      }
      const step = speed * dt;
      const nx = en.x + (dx / (dist || 1e-9)) * step;
      const ny = en.y + (dy / (dist || 1e-9)) * step;
      if (isWalkable(nx, ny)) {
        en.x = nx;
        en.y = ny;
      } else if (isWalkable(nx, en.y)) {
        en.x = nx;
      } else if (isWalkable(en.x, ny)) {
        en.y = ny;
      } else {
        en.waypointIdx = (en.waypointIdx + 1) % waypoints.length; // avoid stuck
      }
    });
  };

  const updateProjectiles = (dt) => {
    const proj = projectilesRef.current;
    for (let i = 0; i < proj.length; i += 1) {
      const b = proj[i];
      if (!b.alive) continue;
      b.age += dt;
      if (b.age > b.maxAge) {
        b.alive = false;
        continue;
      }
      const nextX = b.x + b.vx * dt;
      const nextY = b.y + b.vy * dt;
      // colisión con paredes
      if (!isWalkable(nextX, nextY)) {
        b.alive = false;
        continue;
      }
      b.x = nextX;
      b.y = nextY;
      // impacto con enemigos (simple círculo)
      for (const en of enemyRef.current) {
        const dx = en.x - b.x;
        const dy = en.y - b.y;
        const r = ENEMY_RADIUS + FIREBALL_RADIUS;
        if (dx * dx + dy * dy <= r * r) {
          b.alive = false;
          // marcar daño/flash en enemigo
          en.hitTimer = 0.15; // segundos en rojo
          playHitSound();
          break;
        }
      }
    }
    // limpiar muertos
    projectilesRef.current = proj.filter((b) => b.alive);
  };

  const rotate = (angle) => {
    const player = playerRef.current;
    const oldDirX = player.dirX;
    const oldPlaneX = player.planeX;
    player.dirX = player.dirX * Math.cos(angle) - player.dirY * Math.sin(angle);
    player.dirY = oldDirX * Math.sin(angle) + player.dirY * Math.cos(angle);
    player.planeX = player.planeX * Math.cos(angle) - player.planeY * Math.sin(angle);
    player.planeY = oldPlaneX * Math.sin(angle) + player.planeY * Math.cos(angle);
  };

  const createHitTexture = (originalTexture) => {
    if (!originalTexture) return null;

    const canvas = document.createElement('canvas');
    canvas.width = originalTexture.width;
    canvas.height = originalTexture.height;
    const ctx = canvas.getContext('2d');

    // Dibujar la imagen original
    ctx.drawImage(originalTexture, 0, 0);

    // Aplicar el tinte rojo
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = 'rgba(255,0,0,0.6)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return canvas;
  };

  const drawFrame = (dt) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const player = playerRef.current;

    // sky and floor
    const mid = CANVAS_HEIGHT / 2;
    const sky = ctx.createLinearGradient(0, 0, 0, mid);
    sky.addColorStop(0, '#1f2937');
    sky.addColorStop(1, '#0f172a');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, CANVAS_WIDTH, mid);

    const floor = ctx.createLinearGradient(0, mid, 0, CANVAS_HEIGHT);
    floor.addColorStop(0, '#111827');
    floor.addColorStop(1, '#0b1220');
    ctx.fillStyle = floor;
    ctx.fillRect(0, mid, CANVAS_WIDTH, CANVAS_HEIGHT - mid);

    for (let x = 0; x < CANVAS_WIDTH; x += 1) {
      const cameraX = (2 * x) / CANVAS_WIDTH - 1; // -1 .. 1
      const rayDirX = player.dirX + player.planeX * cameraX;
      const rayDirY = player.dirY + player.planeY * cameraX;

      let mapX = Math.floor(player.x);
      let mapY = Math.floor(player.y);

      const deltaDistX = Math.abs(1 / (rayDirX || 1e-9));
      const deltaDistY = Math.abs(1 / (rayDirY || 1e-9));
      let stepX = 0;
      let stepY = 0;
      let sideDistX = 0;
      let sideDistY = 0;

      if (rayDirX < 0) {
        stepX = -1;
        sideDistX = (player.x - mapX) * deltaDistX;
      } else {
        stepX = 1;
        sideDistX = (mapX + 1.0 - player.x) * deltaDistX;
      }
      if (rayDirY < 0) {
        stepY = -1;
        sideDistY = (player.y - mapY) * deltaDistY;
      } else {
        stepY = 1;
        sideDistY = (mapY + 1.0 - player.y) * deltaDistY;
      }

      let hit = 0;
      let side = 0; // 0 x-side, 1 y-side
      while (hit === 0) {
        if (sideDistX < sideDistY) {
          sideDistX += deltaDistX;
          mapX += stepX;
          side = 0;
        } else {
          sideDistY += deltaDistY;
          mapY += stepY;
          side = 1;
        }
        if (mapX < 0 || mapX >= mapWidth || mapY < 0 || mapY >= mapHeight) {
          hit = 1;
          break;
        }
        if (worldMap[mapY][mapX] > 0) hit = 1;
      }

      let perpWallDist = 1;
      if (side === 0) {
        perpWallDist = Math.abs((mapX - player.x + (1 - stepX) / 2) / (rayDirX || 1e-9));
      } else {
        perpWallDist = Math.abs((mapY - player.y + (1 - stepY) / 2) / (rayDirY || 1e-9));
      }

      const lineHeight = Math.floor(CANVAS_HEIGHT / (perpWallDist || 1e-9));
      let drawStart = -lineHeight / 2 + CANVAS_HEIGHT / 2;
      let drawEnd = lineHeight / 2 + CANVAS_HEIGHT / 2;
      if (drawStart < 0) drawStart = 0;
      if (drawEnd >= CANVAS_HEIGHT) drawEnd = CANVAS_HEIGHT - 1;

      // Textured walls using staff images (fallback to color if not loaded)
      const wallTex = wallTexturesRef.current;
      const sliceHeight = drawEnd - drawStart;
      if (wallTex.loaded && wallTex.images.length > 0 && sliceHeight > 0) {
        // Choose texture deterministically per cell to distribute faces
        const texImg = wallTex.images[((mapX + mapY) >>> 0) % wallTex.images.length];
        // Compute exact hit point on wall to get texX
        let wallX;
        if (side === 0) wallX = player.y + perpWallDist * rayDirY;
        else wallX = player.x + perpWallDist * rayDirX;
        wallX -= Math.floor(wallX);
        let texX = Math.floor(wallX * texImg.width);
        // flip texture coordinate for certain directions to avoid mirroring
        if (side === 0 && rayDirX > 0) texX = texImg.width - texX - 1;
        if (side === 1 && rayDirY < 0) texX = texImg.width - texX - 1;
        // Draw one-pixel vertical slice scaled to screen height
        try {
          ctx.drawImage(texImg, texX, 0, 1, texImg.height, x, drawStart, 1, sliceHeight);
        } catch (_) {
          // fallback color if drawImage fails
          ctx.fillStyle = '#444';
          ctx.fillRect(x, drawStart, 1, sliceHeight);
        }
        // Apply simple shading by distance and side
        const darkness = Math.max(0, Math.min(0.65, perpWallDist * 0.12 + (side === 1 ? 0.12 : 0)));
        if (darkness > 0.01) {
          ctx.fillStyle = `rgba(0,0,0,${darkness})`;
          ctx.fillRect(x, drawStart, 1, sliceHeight);
        }
      } else {
        // Color by distance and side (fallback while textures load)
        const base = side === 1 ? 180 : 210;
        const shade = Math.max(0, Math.min(1, 1.2 - perpWallDist * 0.15));
        const color = `hsl(${base}, 60%, ${Math.floor(20 + 50 * shade)}%)`;
        ctx.fillStyle = color;
        ctx.fillRect(x, drawStart, 1, sliceHeight);
      }
      zBufferRef.current[x] = perpWallDist;
    }

    // Draw sprites (enemies)
    const sprites = enemyRef.current
      .filter((s) => s.loaded)
      .map((s) => ({ ...s, dist: (s.x - player.x) ** 2 + (s.y - player.y) ** 2 }))
      .sort((a, b) => b.dist - a.dist); // far to near

    const SPRITE_SCALE = 2.0; // "en grande"
    for (const spr of sprites) {
      const spriteX = spr.x - player.x;
      const spriteY = spr.y - player.y;

      const invDet = 1.0 / (player.planeX * player.dirY - player.dirX * player.planeY || 1e-9);
      const transformX = invDet * (player.dirY * spriteX - player.dirX * spriteY);
      const transformY = invDet * (-player.planeY * spriteX + player.planeX * spriteY);
      if (transformY <= 0) continue; // behind camera

      const spriteScreenX = Math.floor((CANVAS_WIDTH / 2) * (1 + transformX / transformY));
      // Limitar el tamaño máximo del sprite para evitar distorsión cuando se está muy cerca
      const maxSpriteHeight = CANVAS_HEIGHT * 1.5; // Límite máximo razonable
      const rawSpriteHeight = Math.abs(Math.floor((CANVAS_HEIGHT / transformY) * SPRITE_SCALE));
      const spriteHeight = Math.min(rawSpriteHeight, maxSpriteHeight);
      let drawStartY = -spriteHeight / 2 + CANVAS_HEIGHT / 2;
      let drawEndY = spriteHeight / 2 + CANVAS_HEIGHT / 2;
      if (drawStartY < 0) drawStartY = 0;
      if (drawEndY >= CANVAS_HEIGHT) drawEndY = CANVAS_HEIGHT - 1;

      const img = spr.texture;
      if (!img) continue;

      // Mantener la relación de aspecto del logo
      const aspect = img.height > 0 ? img.width / img.height : 1;
      const spriteWidth = Math.max(1, Math.abs(Math.floor(spriteHeight * aspect)));

      // Calcular límites sin recorte para mapear correctamente texX
      const spriteLeft = Math.floor(spriteScreenX - spriteWidth / 2);
      const spriteRight = spriteLeft + spriteWidth;
      const drawStartX = Math.max(0, spriteLeft);
      const drawEndX = Math.min(CANVAS_WIDTH - 1, spriteRight - 1);

      for (let stripe = drawStartX; stripe <= drawEndX; stripe += 1) {
        // Comparación con pequeña tolerancia para evitar parpadeo por empate con la pared
        if (
          transformY > 0 &&
          stripe >= 0 &&
          stripe < CANVAS_WIDTH &&
          transformY <= zBufferRef.current[stripe] + 0.01
        ) {
          const texX = Math.floor(((stripe - spriteLeft) * img.width) / spriteWidth);
          // draw one-pixel wide vertical slice scaled
          const destHeight = drawEndY - drawStartY;
          if (destHeight > 0) {
            const textureToUse =
              spr.hitTimer && spr.hitTimer > 0 && spr.hitTexture ? spr.hitTexture : img;
            ctx.drawImage(
              textureToUse,
              texX,
              0,
              1,
              textureToUse.height,
              stripe,
              drawStartY,
              1,
              destHeight
            );
          }
        }
      }
    }

    // Dibujar proyectiles (simple billboard naranja/amarillo por encima del piso y detrás de paredes según zbuffer)
    for (const b of projectilesRef.current) {
      // transformar a espacio de cámara
      const relX = b.x - player.x;
      const relY = b.y - player.y;
      const invDet = 1.0 / (player.planeX * player.dirY - player.dirX * player.planeY || 1e-9);
      const transformX = invDet * (player.dirY * relX - player.dirX * relY);
      const transformY = invDet * (-player.planeY * relX + player.planeX * relY);
      if (transformY <= 0) continue;
      const screenX = Math.floor((CANVAS_WIDTH / 2) * (1 + transformX / transformY));
      const size = Math.max(2, Math.floor((CANVAS_HEIGHT / transformY) * 0.4));
      let drawStartY = -size / 2 + CANVAS_HEIGHT / 2;
      let drawEndY = size / 2 + CANVAS_HEIGHT / 2;
      if (drawStartY < 0) drawStartY = 0;
      if (drawEndY >= CANVAS_HEIGHT) drawEndY = CANVAS_HEIGHT - 1;
      let drawStartX = -size / 2 + screenX;
      let drawEndX = size / 2 + screenX;
      if (drawStartX < 0) drawStartX = 0;
      if (drawEndX >= CANVAS_WIDTH) drawEndX = CANVAS_WIDTH - 1;
      for (let x = drawStartX; x <= drawEndX; x += 1) {
        if (transformY <= zBufferRef.current[x] + 0.01) {
          ctx.fillStyle = '#ffb020';
          ctx.fillRect(x, drawStartY, 1, drawEndY - drawStartY);
        }
      }
    }

    moveAndRotate(dt);
  };

  const animate = (t) => {
    const now = t * 0.001; // seconds
    const dt = Math.min(0.05, now - (lastTimeRef.current || now));
    lastTimeRef.current = now;
    if (dt > 0) setFps(Math.round(1 / dt));
    // actualizar timers de impacto del enemigo
    enemyRef.current.forEach((e) => {
      if (e.hitTimer && e.hitTimer > 0) e.hitTimer = Math.max(0, e.hitTimer - dt);
    });
    updateEnemies(dt);
    updateProjectiles(dt);
    drawFrame(dt);
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
    }
    // Load wall textures (staff faces)
    const staffSources = [dannyPng, frankyPng, hPng, juanequePng, kevPng, unpaidDevPng];
    const staffImages = staffSources.map((src) => {
      const im = new Image();
      im.src = src;
      return im;
    });
    Promise.all(
      staffImages.map(
        (im) =>
          new Promise((resolve) => {
            if (im.complete) resolve();
            else im.onload = () => resolve();
          })
      )
    ).then(() => {
      wallTexturesRef.current = { images: staffImages, loaded: true };
    });
    // Cargar textura del sprite (icono en grande)
    const img = new Image();
    img.src = appIcon;
    img.onload = () => {
      const hitTexture = createHitTexture(img);
      enemyRef.current.forEach((e) => {
        e.texture = img;
        e.hitTexture = hitTexture;
        e.loaded = true;
      });
    };
    requestRef.current = requestAnimationFrame(animate);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    // Intento de desbloqueo de audio con gesto del usuario
    const onUserGesture = () => {
      unlockAudio();
      window.removeEventListener('pointerdown', onUserGesture);
      window.removeEventListener('keydown', onUserGesture);
    };
    window.addEventListener('pointerdown', onUserGesture);
    window.addEventListener('keydown', onUserGesture);
    // Para browsers permisivos, intentar iniciar directamente
    unlockAudio();
    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('pointerdown', onUserGesture);
      window.removeEventListener('keydown', onUserGesture);
      stopMusic();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="doom-overlay" role="dialog" aria-modal="true" aria-label="Doom Mini">
      <div className="doom-container">
        <div className="doom-topbar">
          <div className="doom-title">DOOM (mini)</div>
          <div className="doom-controls">
            <span className="doom-stat">FPS: {fps}</span>
            <span className="doom-help-short">WASD/E/Q/Arrows, Shift: correr, Esc: cerrar</span>
            <button
              className="doom-btn doom-close"
              onClick={onClose}
              title="Cerrar (Esc)"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="doom-canvas-wrapper">
          <canvas ref={canvasRef} className="doom-canvas" />
        </div>
      </div>
    </div>
  );
}
