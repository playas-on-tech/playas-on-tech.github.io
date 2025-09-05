import '../css/Venue.css';

function Venue() {
  return (
    <div className="venue-container">
      <h1 className="venue-title">Venue del Evento</h1>
      <p className="venue-description">
        ¡Te esperamos en nuestro próximo evento! Aquí tienes toda la información sobre el lugar
        donde se llevará a cabo.
      </p>
      <div className="venue-details">
        <strong>Dirección:</strong> Centro Cultural de Salagua, C. Octavio Paz, Nuevo Salahua, 28869
        Manzanillo, Col.
        <br />
        <strong>Fecha:</strong> 18 de septiembre, 2025
        <br />
        <strong>Hora:</strong> 20:00 hrs
      </div>
      <iframe
        className="venue-map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.865000261917!2d-104.32997418768079!3d19.113577450714022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8424d798106c7d59%3A0x616a65f4792270b6!2sCentro%20Cultural%20de%20Salagua!5e0!3m2!1ses-419!2smx!4v1757100501589!5m2!1ses-419!2smx"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación del Venue"
      ></iframe>
    </div>
  );
}
export default Venue;
