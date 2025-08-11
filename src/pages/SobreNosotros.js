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
          Somos una Comudidad de estusiastas y apasionado por la tecnología y la innovación. Que se
          reunen para compartir conocimientos y experiencias.
        </p>
        <p>
          En PlayasOnTech, creemos que las grandes ideas nacen cuando las personas correctas se
          reúnen. Por eso, organizamos charlas bimestrales gratuitas abiertas a todos los sectores:
          ya seas estudiante, profesional o empresario, este espacio es para ti. Aquí, el
          conocimiento, la inspiración y la colaboración fluyen libremente impulsando el crecimiento
          personal y colaborativo.
        </p>
        <p className="Listado">🔹 +20 charlas realizadas</p>
        <p className="Listado">🔹 +30 asistentes en cada encuentro</p>
        <p className="Listado">🔹 Ambiente relajado con networking y pizza gratis 🍕</p>
        <p className="Listado">🔹 Ubicados en el bello puerto de Manzanillo, Colima 🌊</p>
      </div>

      <section className="sponsors-section">
        <h2>
          <strong>Estamos buscando Patrocinadores</strong>
        </h2>
        <p className="sponsors-subtext">
          Puedes ser <strong>patrocinador</strong> y <strong>apoyar a la comunidad</strong> de
          distintas maneras.
          <br />
          <em>
            Tu logotipo o marca estará en nuestro flyer del mes en todas nuestras redes sociales
          </em>
        </p>

        <div className="sponsor-options">
          <div className="sponsor-card">
            <Altavoz className="Altavoz-svg" />
            <h3>Speaker</h3>
            <p>Compartiendo una charla con la comunidad</p>
          </div>
          <div className="sponsor-card">
            <Venue className="Venue-svg" />
            <h3>Venue</h3>
            <p>Como anfitrión de la sede bimestral</p>
          </div>
          <div className="sponsor-card">
            <Gift className="EnEspecie-svg" />
            <h3>En especie</h3>
            <p>Souvenirs para la comunidad, para rifar o regalar</p>
          </div>
          <div className="sponsor-card">
            <Money className="Monetario-svg" />
            <h3>Apoyo Económico</h3>
            <p>Aportaciones económicas de forma bimestral</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SobreNosotros;
