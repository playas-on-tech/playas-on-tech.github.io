import '../css/CodigoConducta.css';

function CodigoConducta() {
  return (
    <main className="coc-container">
      <h1 className="coc-title">Código de Conducta</h1>

      <section className="coc-section">
        <h2>Nuestra promesa</h2>
        <p>
          En este evento, estamos comprometidos a proporcionar una experiencia libre de acoso para
          todos, sin importar género, orientación sexual, discapacidad, apariencia física, tamaño,
          raza, edad o religión.
        </p>
      </section>

      <section className="coc-section">
        <h2>Comportamiento esperado</h2>
        <ul>
          <li>Respeto y consideración hacia los demás.</li>
          <li>Fomentar un ambiente amigable y colaborativo.</li>
          <li>Escuchar y valorar diferentes opiniones y experiencias.</li>
        </ul>
      </section>

      <section className="coc-section">
        <h2>Comportamiento inaceptable</h2>
        <ul>
          <li>Acoso o intimidación de cualquier tipo.</li>
          <li>Lenguaje o imágenes sexualmente explícitas o inapropiadas.</li>
          <li>Discriminación o trato despectivo basado en características personales.</li>
          <li>Interrupción o sabotaje de charlas, actividades o discusiones.</li>
        </ul>
      </section>

      <section className="coc-section">
        <h2>Cómo reportar</h2>
        <p>
          Si experimentas o presencias un comportamiento inapropiado, te invitamos a acercarte a
          cualquier persona del staff o colaborador identificado. También puedes reportarlo de forma
          confidencial a través del siguiente medio
          <a href="https://www.instagram.com/playasontech_mzo"> PlayasOntech</a>
        </p>
      </section>

      <section className="coc-section">
        <h2>Consecuencias</h2>
        <p>
          Los organizadores se reservan el derecho de tomar acciones apropiadas que pueden incluir
          advertencias, expulsión del evento y prohibición de futuras participaciones.
        </p>
      </section>

      <footer className="coc-footer">
        <p>Gracias por ayudarnos a crear un evento seguro y acogedor para todos.</p>
      </footer>
    </main>
  );
}

export default CodigoConducta;
