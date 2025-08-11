import '../css/Donaciones.css';
import { ReactComponent as Paypal } from '../svg/Paypal.svg';
import Patreon from '../img/Patreon.png';

function Donaciones() {
  return (
    <div className="donaciones-wrapper">
      <p className="donaciones-text">
        Si deseas apoyar a la comunidad, puedes hacerlo mediante una donación a través de Patreon o
        PayPal.
      </p>
      <div className="donaciones-flex">
        <div className="donacion-card paypal-card surface">
          <a
            href={`https://www.paypal.com/paypalme/kevindperezm/100`}
            target="_blank"
            rel="noopener noreferrer"
            className="donar-link"
          >
            <Paypal className="paypal-svg" />
            Donar con PayPal
          </a>
        </div>

        <div className="donacion-card patreon-card surface">
          <a
            href={`https://patreon.com/PlayasOnTech`}
            target="_blank"
            rel="noopener noreferrer"
            className="donar-link"
          >
            <img src={Patreon} alt="Patreon" className="patreon-png" />
            Apóyanos en Patreon
          </a>
        </div>
      </div>
    </div>
  );
}
export default Donaciones;
