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
        <strong>Dirección:</strong> Calle Ejemplo 123, Colonia Centro, Manzanillo, Colima
        <br />
        <strong>Fecha:</strong> 20 de julio, 2025
        <br />
        <strong>Hora:</strong> 18:00 hrs
      </div>
      <iframe
        className="venue-map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.123456789!2d-104.3245678!3d19.1134567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8423a123456789ab%3A0x123456789abcdef!2sBoulevard%20Miguel%20de%20la%20Madrid%201234%2C%20Manzanillo%2C%20Colima!5e0!3m2!1ses-419!2smx!4v1680000000000!5m2!1ses-419!2smx"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación del Venue"></iframe>
    </div>
  );
}
export default Venue;
