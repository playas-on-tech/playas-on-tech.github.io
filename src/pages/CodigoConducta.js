import '../css/CodigoConducta.css';

function CodigoConducta() {
  return (
    <main className="coc-container">
      <h1 className="coc-title">Código de Conducta</h1>

      <section className="coc-section">
        <h2>Nuestro compromiso</h2>
        <p>
          Queremos que cada evento sea un espacio seguro y acogedor para todas las personas. No
          toleramos ninguna forma de acoso o discriminación por motivos de género, orientación
          sexual, discapacidad, apariencia, raza, edad o religión.
        </p>
      </section>

      <section className="coc-section">
        <h2>Comportamiento esperado</h2>
        <ul>
          <li>Tratar a los demás con respeto y consideración.</li>
          <li>Contribuir a un ambiente amigable y colaborativo.</li>
          <li>Escuchar y valorar distintos puntos de vista y experiencias.</li>
        </ul>
      </section>

      <section className="coc-section">
        <h2>Comportamiento inaceptable</h2>
        <ul>
          <li>Acoso o intimidación en cualquier forma.</li>
          <li>Lenguaje o imágenes de contenido sexual o inapropiado.</li>
          <li>Comentarios discriminatorios o despectivos hacia otras personas.</li>
          <li>Interrumpir o sabotear charlas, actividades o conversaciones.</li>
        </ul>
      </section>

      <section className="coc-section">
        <h2>Cómo reportar</h2>
        <p>
          Si presencias o experimentas algún comportamiento que infrinja este código, acércate a
          cualquier miembro del equipo organizador. También puedes reportarlo de forma confidencial
          a través de nuestro Instagram:{' '}
          <a href="https://www.instagram.com/playasontech_mzo">@playasontech_mzo</a>.
        </p>
      </section>

      <section className="coc-section">
        <h2>Consecuencias</h2>
        <p>
          El equipo organizador tomará las medidas que considere necesarias, que pueden incluir una
          advertencia, la expulsión del evento o la prohibición de participar en futuros eventos.
        </p>
      </section>

      <footer className="coc-footer">
        <p>Gracias por ayudarnos a mantener un espacio seguro y agradable para todos.</p>
      </footer>
    </main>
  );
}

export default CodigoConducta;
