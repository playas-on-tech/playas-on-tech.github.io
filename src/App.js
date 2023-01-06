import appIcon from './app-icon.png';
import appLogo from './app-logo.png';
import logos from './logos';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="icons-container">
        <img src={appIcon} className="App-icon" alt="app icon" />
        <img src={appLogo} className="App-logo" alt="app logo" />
      </header>

      <main>
        <p>
          Somos una comunidad de entusiastas de la tecnología que se reúnen para compartir
          conocimientos y experiencias
        </p>
        <ul className="App-social-networks">
          <li>
            <a href="https://www.facebook.com/playasontech">
              <img src={logos.facebook} />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/Playas.OnTech">
              <img src={logos.instagram} />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/PlayasOnTech">
              <img src={logos.twitter} />
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
