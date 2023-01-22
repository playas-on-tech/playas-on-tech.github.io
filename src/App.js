import appIcon from './app-icon.png';
import appLogo from './app-logo.png';
import logos from './logos';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="icons-container">
        <img width="auto" height="auto" src={appIcon} className="App-icon" alt="app icon" />
        <img width="auto" height="auto" src={appLogo} className="App-logo" alt="app logo" />
      </header>

      <main>
        <p>
          Somos una comunidad de entusiastas de la tecnología que se reúnen para compartir
          conocimientos y experiencias
        </p>
        <ul className="App-social-networks">
          <li>
            <a href="https://www.facebook.com/playasontech" aria-label="Social media icon">
              <img alt="Social media icon" src={logos.facebook} />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/Playas.OnTech" aria-label="Social media icon">
              <img alt="Social media icon" src={logos.instagram} />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/PlayasOnTech" aria-label="Social media icon">
              <img alt="Social media icon" src={logos.twitter} />
            </a>
          </li>
        </ul>
      </main>

      <footer>
        <span className="Copyright">
          Powered by <a href="https://magmalabs.io">magmalabs.io</a>
        </span>
      </footer>
    </div>
  );
}

export default App;
