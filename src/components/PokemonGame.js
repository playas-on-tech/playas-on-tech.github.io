import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../css/PokemonGame.css';
import dannySprite from '../img/staff/danny.png';
import frankySprite from '../img/staff/franky.png';
import hSprite from '../img/staff/h.png';
import juanequeSprite from '../img/staff/juaneque.png';
import kevSprite from '../img/staff/kev.png';
import unpaidSprite from '../img/staff/unpaid dev.png';
import playachuSprite from '../app-icon.webp';

const POKEMON_DATA = {
  dannysaur: {
    name: 'DANNYSAUR',
    sprite: dannySprite,
    level: Math.floor(Math.random() * 10) + 5,
    maxHp: 25,
    type: 'GRASS'
  },
  frankymander: {
    name: 'FRANKYMANDER',
    sprite: frankySprite,
    level: Math.floor(Math.random() * 10) + 5,
    maxHp: 22,
    type: 'FIRE'
  },
  hturtle: {
    name: 'H-TURTLE',
    sprite: hSprite,
    level: Math.floor(Math.random() * 10) + 5,
    maxHp: 28,
    type: 'WATER'
  },
  juanequechu: {
    name: 'JUANEQUE-CHU',
    sprite: juanequeSprite,
    level: Math.floor(Math.random() * 10) + 5,
    maxHp: 20,
    type: 'ELECTRIC'
  },
  kevtwo: {
    name: 'KEVTWO',
    sprite: kevSprite,
    level: Math.floor(Math.random() * 10) + 5,
    maxHp: 35,
    type: 'PSYCHIC'
  },
  missingno: {
    name: 'MISSINGNO',
    sprite: unpaidSprite,
    level: Math.floor(Math.random() * 5) + 1,
    maxHp: 15,
    type: 'GLITCH'
  }
};

const PLAYER_POKEMON = {
  name: 'PLAYACHU',
  level: 5,
  maxHp: 19,
  currentHp: 19,
  type: 'ELECTRIC',
  sprite: playachuSprite
};

function PokemonGame({ onClose }) {
  const [gameState, setGameState] = useState('overworld'); // 'overworld', 'battle', 'victory'
  const [playerPos, setPlayerPos] = useState({ x: 3, y: 1 });
  const [wildPokemon, setWildPokemon] = useState(null);
  const [playerPokemon, setPlayerPokemon] = useState({ ...PLAYER_POKEMON });
  const [battleText, setBattleText] = useState('');
  const [showBattleMenu, setShowBattleMenu] = useState(true);
  const [battleStep, setBattleStep] = useState('menu'); // 'menu', 'intro', 'attacking', 'enemy_turn'
  const [animationState, setAnimationState] = useState(''); // 'enemy-enter', 'player-attack', 'enemy-attack', 'enemy-damage', 'player-damage'
  const [showEnemyPokemon, setShowEnemyPokemon] = useState(false);
  const [textAnimation, setTextAnimation] = useState('');
  const [shakeEffect, setShakeEffect] = useState('');
  const mapRef = useRef(null);
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const currentMusicRef = useRef(null);
  const textTimeoutRef = useRef(null);

  // Initialize audio context
  useEffect(() => {
    const initAudio = () => {
      try {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      } catch (error) {
        console.log('Audio not supported');
      }
    };

    initAudio();

    return () => {
      if (currentMusicRef.current) {
        currentMusicRef.current.stop();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (textTimeoutRef.current) {
        clearTimeout(textTimeoutRef.current);
      }
    };
  }, []);

  // Typewriter effect for battle text
  const animateText = useCallback((text, callback) => {
    // Clear any existing timeout
    if (textTimeoutRef.current) {
      clearTimeout(textTimeoutRef.current);
    }
    
    setBattleText('');
    setTextAnimation('typing');
    let currentIndex = 0;
    const textString = String(text || ''); // Ensure text is a string
    
    const typeChar = () => {
      if (currentIndex < textString.length) {
        setBattleText(textString.slice(0, currentIndex + 1));
        currentIndex++;
        textTimeoutRef.current = setTimeout(typeChar, 50);
      } else {
        setTextAnimation('');
        if (callback && typeof callback === 'function') {
          setTimeout(callback, 1000);
        }
      }
    };
    
    typeChar();
  }, []);

  // Battle animation effects
  const playAttackAnimation = useCallback((attacker, callback) => {
    if (attacker === 'player') {
      setAnimationState('player-attack');
      setShakeEffect('enemy-shake');
    } else {
      setAnimationState('enemy-attack');
      setShakeEffect('player-shake');
    }
    
    setTimeout(() => {
      setAnimationState('');
      setShakeEffect('');
      if (callback) callback();
    }, 800);
  }, []);

  const playDamageAnimation = useCallback((target, callback) => {
    if (target === 'enemy') {
      setAnimationState('enemy-damage');
    } else {
      setAnimationState('player-damage');
    }
    
    setTimeout(() => {
      setAnimationState('');
      if (callback) callback();
    }, 500);
  }, []);

  // Play different music based on game state
  useEffect(() => {
    if (!audioContextRef.current) return;

    // Stop current music
    if (currentMusicRef.current) {
      currentMusicRef.current.stop();
    }

    // Start appropriate music
    if (gameState === 'overworld') {
      playOverworldMusic();
    } else if (gameState === 'battle') {
      playBattleMusic();
    }
  }, [gameState]);

  const playOverworldMusic = useCallback(() => {
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Peaceful overworld melody (Pallet Town style)
    const overworldNotes = [261.63, 329.63, 392.00, 349.23, 293.66, 261.63, 293.66, 329.63]; // C-E-G-F-D-C-D-E
    let noteIndex = 0;

    const playNote = () => {
      oscillator.frequency.setValueAtTime(overworldNotes[noteIndex % overworldNotes.length], ctx.currentTime);
      noteIndex++;
      if (noteIndex >= overworldNotes.length * 4) noteIndex = 0;
    };

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(261.63, ctx.currentTime);
    gainNode.gain.setValueAtTime(0.08, ctx.currentTime);

    oscillator.start();
    currentMusicRef.current = oscillator;

    // Change notes every 600ms (slower, peaceful)
    const interval = setInterval(playNote, 600);

    oscillator.onended = () => {
      clearInterval(interval);
    };
  }, []);

  const playBattleMusic = useCallback(() => {
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Intense battle melody (wild Pokemon battle style)
    const battleNotes = [329.63, 392.00, 440.00, 523.25, 493.88, 440.00, 392.00, 349.23]; // E-G-A-C5-B-A-G-F
    let noteIndex = 0;

    const playNote = () => {
      oscillator.frequency.setValueAtTime(battleNotes[noteIndex % battleNotes.length], ctx.currentTime);
      noteIndex++;
      if (noteIndex >= battleNotes.length * 6) noteIndex = 0;
    };

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(329.63, ctx.currentTime);
    gainNode.gain.setValueAtTime(0.12, ctx.currentTime);

    oscillator.start();
    currentMusicRef.current = oscillator;

    // Change notes every 300ms (faster, intense)
    const interval = setInterval(playNote, 300);

    oscillator.onended = () => {
      clearInterval(interval);
    };
  }, []);

  // Handle player movement in overworld
  useEffect(() => {
    if (gameState !== 'overworld') return;

    const mapLayout = [
      ['🏠', '🏠', '🏠', '⬜', '⬜', '⬜', '🏠', '🏠', '🏠', '⬜'],
      ['🏠', '⬜', '⬜', '⬜', '🌿', '🌿', '⬜', '⬜', '🏠', '⬜'],
      ['⬜', '⬜', '⬜', '🌿', '🌿', '🌿', '🌿', '⬜', '⬜', '⬜'],
      ['⬜', '🌿', '🌿', '🌿', '🌿', '🌿', '🌿', '🌿', '⬜', '⬜'],
      ['⬜', '🌿', '🌿', '🌿', '🌊', '🌊', '🌿', '🌿', '🌿', '⬜'],
      ['⬜', '🌿', '🌿', '🌊', '🌊', '🌊', '🌊', '🌿', '🌿', '⬜'],
      ['⬜', '⬜', '🌿', '🌿', '🌊', '🌊', '🌿', '🌿', '⬜', '⬜'],
      ['⬜', '⬜', '⬜', '🌿', '🌿', '🌿', '🌿', '⬜', '⬜', '⬜'],
      ['🏪', '🏪', '⬜', '⬜', '🌿', '🌿', '⬜', '⬜', '🏪', '🏪'],
      ['🏪', '🏪', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '🏪', '🏪']
    ];

    const isWalkable = (x, y) => {
      if (x < 0 || x >= 10 || y < 0 || y >= 10) return false;
      const tile = mapLayout[y][x];
      return tile !== '🏠' && tile !== '🏪' && tile !== '🌊'; // Can't walk on houses, buildings, or water
    };

    const handleKeyPress = (e) => {
      const { x, y } = playerPos;
      let newX = x, newY = y;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          newY = y - 1;
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          newY = y + 1;
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          newX = x - 1;
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          newX = x + 1;
          break;
        case 'Escape':
          onClose();
          return;
        default:
          return;
      }

      // Check if the new position is walkable
      if (!isWalkable(newX, newY)) {
        return; // Don't move if the tile is not walkable
      }

      setPlayerPos({ x: newX, y: newY });

      // Random encounter chance only in grass
      const currentTile = mapLayout[newY][newX];
      if (currentTile === '🌿' && Math.random() < 0.15) {
        const pokemonNames = Object.keys(POKEMON_DATA);
        const randomPokemon = pokemonNames[Math.floor(Math.random() * pokemonNames.length)];
        const pokemon = { ...POKEMON_DATA[randomPokemon] };
        pokemon.currentHp = pokemon.maxHp;
        setWildPokemon(pokemon);
        setGameState('battle');
        
        // Animated Pokemon entrance
        setShowEnemyPokemon(false);
        setAnimationState('enemy-enter');
        setShowBattleMenu(false);
        setBattleStep('intro');
        
        // Animate the appearance text
        animateText(`A wild ${pokemon.name} appeared!`, () => {
          setShowEnemyPokemon(true);
          setTimeout(() => {
            setAnimationState('');
            setShowBattleMenu(true);
            setBattleStep('menu');
          }, 500);
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, playerPos, onClose, animateText]);

  // Handle battle actions
  const handleBattleAction = (action) => {
    if (battleStep !== 'menu') return;

    switch (action) {
      case 'FIGHT':
        setBattleStep('attacking');
        setShowBattleMenu(false);
        const damage = Math.floor(Math.random() * 8) + 3;
        const newWildHp = Math.max(0, wildPokemon.currentHp - damage);
        
        // Animate attack text
        animateText(`${playerPokemon.name} used TACKLE!`, () => {
          // Play attack animation
          playAttackAnimation('player', () => {
            // Apply damage with animation
            playDamageAnimation('enemy', () => {
              setWildPokemon(prev => ({ ...prev, currentHp: newWildHp }));
              
              if (newWildHp <= 0) {
                animateText(`${wildPokemon.name} fainted!`, () => {
                  setAnimationState('enemy-faint');
                  setTimeout(() => {
                    setGameState('overworld');
                    setWildPokemon(null);
                    setPlayerPokemon(prev => ({ ...prev, currentHp: prev.maxHp }));
                    setShowEnemyPokemon(false);
                    setAnimationState('');
                  }, 1000);
                });
              } else {
                // Enemy turn
                setBattleStep('enemy_turn');
                setTimeout(() => {
                  const enemyDamage = Math.floor(Math.random() * 6) + 2;
                  const newPlayerHp = Math.max(0, playerPokemon.currentHp - enemyDamage);
                  
                  animateText(`${wildPokemon.name} used SCRATCH!`, () => {
                    playAttackAnimation('enemy', () => {
                      playDamageAnimation('player', () => {
                        setPlayerPokemon(prev => ({ ...prev, currentHp: newPlayerHp }));
                        
                        if (newPlayerHp <= 0) {
                          animateText(`${playerPokemon.name} fainted!`, () => {
                            setTimeout(() => {
                              setGameState('overworld');
                              setWildPokemon(null);
                              setPlayerPokemon({ ...PLAYER_POKEMON });
                              setShowEnemyPokemon(false);
                              setAnimationState('');
                            }, 1000);
                          });
                        } else {
                          setTimeout(() => {
                            setShowBattleMenu(true);
                            setBattleStep('menu');
                            setBattleText('');
                          }, 500);
                        }
                      });
                    });
                  });
                }, 800);
              }
            });
          });
        });
        break;

      case 'RUN':
        animateText('Got away safely!', () => {
          setGameState('overworld');
          setWildPokemon(null);
          setPlayerPokemon(prev => ({ ...prev, currentHp: prev.maxHp }));
          setShowEnemyPokemon(false);
          setAnimationState('');
        });
        break;

      default:
        animateText('No effect!', () => {
          setTimeout(() => setBattleText(''), 500);
        });
        break;
    }
  };

  const renderOverworld = () => {
    const tiles = [];
    
    // Define a more complex map layout
    const mapLayout = [
      ['🏠', '🏠', '🏠', '⬜', '⬜', '⬜', '🏠', '🏠', '🏠', '⬜'],
      ['🏠', '⬜', '⬜', '⬜', '🌿', '🌿', '⬜', '⬜', '🏠', '⬜'],
      ['⬜', '⬜', '⬜', '🌿', '🌿', '🌿', '🌿', '⬜', '⬜', '⬜'],
      ['⬜', '🌿', '🌿', '🌿', '🌿', '🌿', '🌿', '🌿', '⬜', '⬜'],
      ['⬜', '🌿', '🌿', '🌿', '🌊', '🌊', '🌿', '🌿', '🌿', '⬜'],
      ['⬜', '🌿', '🌿', '🌊', '🌊', '🌊', '🌊', '🌿', '🌿', '⬜'],
      ['⬜', '⬜', '🌿', '🌿', '🌊', '🌊', '🌿', '🌿', '⬜', '⬜'],
      ['⬜', '⬜', '⬜', '🌿', '🌿', '🌿', '🌿', '⬜', '⬜', '⬜'],
      ['🏪', '🏪', '⬜', '⬜', '🌿', '🌿', '⬜', '⬜', '🏪', '🏪'],
      ['🏪', '🏪', '⬜', '⬜', '⬜', '⬜', '⬜', '⬜', '🏪', '🏪']
    ];

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const isPlayer = playerPos.x === x && playerPos.y === y;
        const tileType = mapLayout[y][x];
        let className = 'tile ';
        
        switch (tileType) {
          case '🏠': className += 'house'; break;
          case '🏪': className += 'building'; break;
          case '🌿': className += 'grass'; break;
          case '🌊': className += 'water'; break;
          default: className += 'path'; break;
        }
        
        if (isPlayer) className += ' player';
        
        tiles.push(
          <div
            key={`${x}-${y}`}
            className={className}
            data-tile={tileType}
          >
            {isPlayer ? '●' : tileType === '⬜' ? '' : tileType}
          </div>
        );
      }
    }
    return tiles;
  };

  const getHpBarWidth = (current, max) => {
    return Math.max(0, (current / max) * 100);
  };

  if (gameState === 'overworld') {
    return (
      <div className="pokemon-game">
        <div className="pokemon-overworld">
          <div className="overworld-header">
            <h2>POKEMON PLAYASON</h2>
            <button onClick={onClose} className="pokemon-close">×</button>
          </div>
          <div className="overworld-map" ref={mapRef}>
            {renderOverworld()}
          </div>
          <div className="overworld-controls">
            <p>Use WASD or Arrow Keys to move</p>
            <p>Walk into grass to find wild Pokemon!</p>
            <p>Press ESC to exit</p>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'battle' && wildPokemon) {
    return (
      <div className="pokemon-game">
        <div className="pokemon-battle">
          <div className="battle-header">
            <h2>POKEMON BATTLE</h2>
            <button onClick={onClose} className="pokemon-close">×</button>
          </div>
          
          <div className="battle-area">
            <div className="enemy-section">
              <div className="enemy-info">
                <div className="pokemon-name">{wildPokemon.name}</div>
                <div className="pokemon-level">:L{wildPokemon.level}</div>
                <div className="hp-container">
                  <div className="hp-label">HP:</div>
                  <div className="hp-bar">
                    <div 
                      className={`hp-fill ${animationState === 'enemy-damage' ? 'hp-damage' : ''}`}
                      style={{ width: `${getHpBarWidth(wildPokemon.currentHp, wildPokemon.maxHp)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className={`enemy-sprite ${animationState} ${shakeEffect === 'enemy-shake' ? 'shake' : ''}`}>
                {showEnemyPokemon && (
                  <img 
                    src={wildPokemon.sprite} 
                    alt={wildPokemon.name} 
                    className={animationState === 'enemy-enter' ? 'pokemon-enter' : ''}
                  />
                )}
              </div>
            </div>

            <div className="player-section">
              <div className={`player-sprite ${animationState} ${shakeEffect === 'player-shake' ? 'shake' : ''}`}>
                <img 
                  src={playerPokemon.sprite} 
                  alt={playerPokemon.name}
                  className={animationState === 'player-attack' ? 'attack-bounce' : ''}
                />
              </div>
              <div className="player-info">
                <div className="pokemon-name">{playerPokemon.name}</div>
                <div className="pokemon-level">:L{playerPokemon.level}</div>
                <div className="hp-container">
                  <div className="hp-label">HP:</div>
                  <div className="hp-bar">
                    <div 
                      className={`hp-fill ${animationState === 'player-damage' ? 'hp-damage' : ''}`}
                      style={{ width: `${getHpBarWidth(playerPokemon.currentHp, playerPokemon.maxHp)}%` }}
                    ></div>
                  </div>
                  <div className="hp-numbers">
                    {playerPokemon.currentHp}/ {playerPokemon.maxHp}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="battle-ui">
            {battleText && (
              <div className={`battle-text ${textAnimation || ''}`}>
                {battleText}
                {textAnimation === 'typing' && <span className="cursor">|</span>}
              </div>
            )}
            
            {showBattleMenu && battleStep === 'menu' && (
              <div className="battle-menu">
                <button onClick={() => handleBattleAction('FIGHT')} className="battle-button">
                  ▶FIGHT
                </button>
                <button onClick={() => handleBattleAction('ITEM')} className="battle-button">
                  ITEM
                </button>
                <button onClick={() => handleBattleAction('PKM')} className="battle-button">
                  PKM
                </button>
                <button onClick={() => handleBattleAction('RUN')} className="battle-button">
                  RUN
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default PokemonGame;
