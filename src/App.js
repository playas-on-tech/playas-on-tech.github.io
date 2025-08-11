import appLogo from './app-logo.webp';
import appIcon from './app-icon.webp';
import Header from './Header.js';
import SobreNosotros from './pages/SobreNosotros';
import Venue from './pages/Venue.js';
import CodigoConducta from './pages/CodigoConducta';
import Donaciones from './pages/Donaciones';
import { Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import SnakeGame from './components/SnakeGame';
import ConwayLife from './components/ConwayLife';
import DoomMini from './components/DoomMini';
import FlappyBird from './components/FlappyBird';
import PokemonGame from './components/PokemonGame';

function App() {
  const location = useLocation();
  const [showSnake, setShowSnake] = useState(false);
  const [showLife, setShowLife] = useState(false);
  const [showDoom, setShowDoom] = useState(false);
  const [showFlappy, setShowFlappy] = useState(false);
  const [showPokemon, setShowPokemon] = useState(false);
  // Animación de entrada siempre en Home
  const [playIntro, setPlayIntro] = useState(location.pathname === '/');
  const konamiIndexRef = useRef(0);
  const vidaIndexRef = useRef(0);
  const pokemonIndexRef = useRef(0);

  // Konami code easter egg + "vida" easter egg
  useEffect(() => {
    const KONAMI = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];

    const VIDA = ['v', 'i', 'd', 'a'];
    const POKEMON = ['p', 'o', 'k', 'e', 'm', 'o', 'n'];

    const onKeyDown = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key; // normalize letters
      const expected = KONAMI[konamiIndexRef.current];
      if (key === expected) {
        konamiIndexRef.current += 1;
        if (konamiIndexRef.current === KONAMI.length) {
          setShowSnake(true);
          konamiIndexRef.current = 0;
        }
      } else {
        // reset or check if this key could be the start of the sequence
        konamiIndexRef.current = key === KONAMI[0] ? 1 : 0;
      }

      // VIDA secret word
      const expectedVida = VIDA[vidaIndexRef.current];
      if (key === expectedVida) {
        vidaIndexRef.current += 1;
        if (vidaIndexRef.current === VIDA.length) {
          setShowLife(true);
          vidaIndexRef.current = 0;
        }
      } else {
        vidaIndexRef.current = key === VIDA[0] ? 1 : 0;
      }

      // POKEMON secret word
      const expectedPokemon = POKEMON[pokemonIndexRef.current];
      if (key === expectedPokemon) {
        pokemonIndexRef.current += 1;
        if (pokemonIndexRef.current === POKEMON.length) {
          setShowPokemon(true);
          pokemonIndexRef.current = 0;
        }
      } else {
        pokemonIndexRef.current = key === POKEMON[0] ? 1 : 0;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  // Controlar animación de entrada en Home en cada visita
  useEffect(() => {
    if (location.pathname === '/') {
      setPlayIntro(true);
    } else {
      setPlayIntro(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const updateBodyOverflow = () => {
      // Esperar al siguiente "frame" para asegurar que DOM se haya actualizado
      requestAnimationFrame(() => {
        const doc = document.documentElement;
        const body = document.body;
        const root = document.getElementById('root');

        const totalHeight = Math.max(doc.scrollHeight, body.scrollHeight, root?.scrollHeight || 0);

        if (totalHeight <= window.innerHeight) {
          body.style.overflow = 'hidden';
        } else {
          body.style.overflow = '';
        }
      });
    };

    // Ejecutar al montar y al cambiar de ruta
    updateBodyOverflow();

    // Detectar resize
    window.addEventListener('resize', updateBodyOverflow);

    // Detectar cambios en el DOM
    const observer = new MutationObserver(updateBodyOverflow);
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      window.removeEventListener('resize', updateBodyOverflow);
      observer.disconnect();
      document.body.style.overflow = '';
    };
  }, [location]);

  return (
    <div className="App">
      {showSnake && <SnakeGame onClose={() => setShowSnake(false)} />}
      {showLife && <ConwayLife onClose={() => setShowLife(false)} />}
      {showDoom && <DoomMini onClose={() => setShowDoom(false)} />}
      {showFlappy && <FlappyBird onClose={() => setShowFlappy(false)} />}
      {showPokemon && <PokemonGame onClose={() => setShowPokemon(false)} />}
      <Header onLogoTripleClick={() => setShowDoom(true)} onDarkModeLongPress={() => setShowFlappy(true)} />

      <Routes>
        <Route
          path="/"
          element={
            <main className={`App-main ${playIntro ? 'intro-playing' : ''}`}>
              <img
                src={appIcon}
                className={`App-icon-body ${playIntro ? 'intro-icon' : ''}`}
                alt="PlayasOnTech"
                onAnimationEnd={() => {
                  // La animación del icono ahora dura más y mantiene un hold; damos más tiempo a los fades
                  setTimeout(() => setPlayIntro(false), 1100);
                }}
              />
              <img src={appLogo} className="App-logo-body" alt="PlayasOnTech" />
              <p className="App-description">
                Somos una comunidad de entusiastas de la tecnología que se reúnen para compartir
                conocimientos y experiencias
              </p>
            </main>
          }
        />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/venue" element={<Venue />} />
        <Route path="/codigo-conducta" element={<CodigoConducta />} />
        <Route path="/donaciones" element={<Donaciones />} />
      </Routes>
    </div>
  );
}

export default App;
