import React, { useEffect, useState } from 'react';

import appLogo from './app-logo.webp';
import logos from './logos';
import { Link } from 'react-router-dom';
import { ReactComponent as Sun } from './svg/Sun.svg';
import { ReactComponent as Moon } from './svg/Moon.svg';
import './css/Header.css';

function Header({ onLogoTripleClick, onDarkModeLongPress }) {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Inicializa el tema desde localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.body.classList.add('dark');
    }
  }, []);

  // Bloquea el scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [menuOpen]);

  // Cierra el menú si se cambia a desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  // Long-press detector for the dark mode button (hidden trigger)
  const longPressRef = React.useRef({ timer: 0, start: 0 });
  const LONG_MS = 900;
  const onDarkPressStart = () => {
    const ref = longPressRef.current;
    ref.start = Date.now();
    clearTimeout(ref.timer);
    ref.timer = setTimeout(() => {
      onDarkModeLongPress && onDarkModeLongPress();
    }, LONG_MS);
  };
  const onDarkPressEnd = () => {
    const ref = longPressRef.current;
    clearTimeout(ref.timer);
    ref.timer = 0;
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="icons-container">
      <div className="App-header">
        <Link to="/" onClick={handleLinkClick} aria-label="Ir al inicio">
          <img
            width="auto"
            height="auto"
            src={appLogo}
            className="App-logo"
            alt="PlayasOnTech"
            onClick={(e) => {
              // naive triple-click detector (within 600ms)
              const img = e.currentTarget;
              const now = Date.now();
              if (!img._clicks) img._clicks = [];
              img._clicks.push(now);
              img._clicks = img._clicks.filter((t) => now - t < 600);
              if (img._clicks.length >= 3) {
                img._clicks = [];
                onLogoTripleClick && onLogoTripleClick();
              }
            }}
          />
        </Link>

        <button
          className="menu-toggle"
          aria-label="Abrir menú"
          aria-controls="primary-navigation"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
        >
          <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
        </button>

        <nav
          id="primary-navigation"
          className={`App-nav-wrapper ${menuOpen ? 'open' : ''}`}
          aria-hidden={!menuOpen}
        >
          <nav className="App-nav">
            <Link to="/sobre-nosotros" onClick={handleLinkClick}>
              Sobre nosotros
            </Link>
            <Link to="/codigo-conducta" onClick={handleLinkClick}>
              Código de conducta
            </Link>
            <Link to="/venue" onClick={handleLinkClick}>
              Venue
            </Link>
            <Link to="/donaciones" onClick={handleLinkClick}>
              Donaciones
            </Link>
            <button
              className="toggle-darkmode"
              onClick={toggleDarkMode}
              onMouseDown={onDarkPressStart}
              onMouseUp={onDarkPressEnd}
              onMouseLeave={onDarkPressEnd}
              onTouchStart={onDarkPressStart}
              onTouchEnd={onDarkPressEnd}
              aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {darkMode ? (
                <Sun className="theme-icon" aria-hidden="true" />
              ) : (
                <Moon className="theme-icon" aria-hidden="true" />
              )}
            </button>
          </nav>
          <div className="social-buttons">
            <ul className="App-social-networks">
              <li>
                <a
                  href="https://www.facebook.com/playasontech"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img alt="Facebook" src={logos.facebook} />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/playasontech_mzo"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img alt="Instagram" src={logos.instagram} />
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/PlayasOnTech"
                  aria-label="Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img alt="Twitter" src={logos.twitter} />
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
