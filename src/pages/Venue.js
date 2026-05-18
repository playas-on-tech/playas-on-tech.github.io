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
        <strong>Dirección:</strong> rootDevLab, Primavera 15, Arboledas, 28869 Manzanillo
        <br />
        <strong>Fecha:</strong> 18 de septiembre, 2025
        <br />
        <strong>Hora:</strong> 20:00 hrs
      </div>
      <iframe
        className="venue-map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.4818!2d-104.3394355!3d19.1226497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8424d73e2dc03b53%3A0x50a0309fe6946305!2srootDevLab!5e0!3m2!1ses-419!2smx!4v1747600000000!5m2!1ses-419!2smx"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación del Venue"
      ></iframe>
    </div>
  );
}
export default Venue;
