import '../css/SobreNosotros.css';
import community from '../img/community.jpg';
import { ReactComponent as Altavoz } from '../svg/Altavoz.svg';
import { ReactComponent as Venue } from '../svg/Venue.svg';
import { ReactComponent as Gift } from '../svg/Gift.svg';
import { ReactComponent as Money } from '../svg/Money.svg';

function SobreNosotros() {
  return (
    <div>
      <div className="container">
        <img src={community} alt="Sobre Nosotros" className="sobre-nosotros-img" />
        <h1>Sobre Nosotros</h1>
        <p>
          PlayasOnTech es una comunidad de personas interesadas en tecnología e innovación, con sede
          en Manzanillo, Colima. Nos reunimos de forma bimestral para compartir charlas,
          experiencias y proyectos en un ambiente abierto y sin costo.
        </p>
        <p>
          El espacio está pensado para todo tipo de perfiles: estudiantes, profesionales y
          emprendedores son igualmente bienvenidos. La idea es sencilla: aprender juntos, hacer
          contactos y pasar un buen rato.
        </p>
        <p className="Listado">🔹 6+ años realizando eventos</p>
        <p className="Listado">🔹 +30 asistentes en cada encuentro</p>
        <p className="Listado">🔹 Ambiente relajado con networking y pizza 🍕</p>
        <p className="Listado">🔹 En el puerto de Manzanillo, Colima 🌊</p>
      </div>

      <section className="sponsors-section">
        <h2>
          <strong>¿Quieres patrocinar?</strong>
        </h2>
        <p className="sponsors-subtext">
          Apoya a la comunidad y aparece en nuestros materiales y redes sociales. Hay varias formas
          de participar.
        </p>

        <div className="sponsor-options">
          <div className="sponsor-card">
            <Altavoz className="Altavoz-svg" />
            <h3>Speaker</h3>
            <p>Da una charla y comparte tu conocimiento con la comunidad</p>
          </div>
          <div className="sponsor-card">
            <Venue className="Venue-svg" />
            <h3>Venue</h3>
            <p>Ofrece el espacio para uno de nuestros eventos bimestrales</p>
          </div>
          <div className="sponsor-card">
            <Gift className="EnEspecie-svg" />
            <h3>En especie</h3>
            <p>Dona productos o artículos para sortear o regalar entre los asistentes</p>
          </div>
          <div className="sponsor-card">
            <Money className="Monetario-svg" />
            <h3>Apoyo económico</h3>
            <p>Contribuye con un aporte monetario bimestral</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SobreNosotros;
