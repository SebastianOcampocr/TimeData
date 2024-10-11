import styles from './Donaciones.module.css';
import fotoninos from './templates/fotoninos.png';

const Donaciones = () => {
  return (
    <div className={styles.donaciones}>
      {/* Imagen fuera del contenedor de texto */}
      <div className={styles.donaciones1}>
        <img className={styles.fotoniosIcon} alt="Niños en clase" src={fotoninos} />
      </div>

      {/* Contenedor para el texto */}
      <div className={styles.esteProyectoDestinaContainer}>
        <div className={styles.donaciones2}>DONACIONES</div>
        <p className={styles.esteProyectoDestina}>
          Este proyecto destina el 80% de las donaciones al Programa de Becas del Colegio Técnico Profesional Don Bosco, para apoyar a estudiantes que necesitan asistencia financiera. El 20% restante se utilizará para el mantenimiento de la página web del proyecto.
        </p>
        <p className={styles.esteProyectoDestina}>
          Las donaciones se realizarán a través de PayPal. Como agradecimiento, los donantes recibirán una medalla especial en su perfil. ¡Su apoyo es fundamental para brindar oportunidades educativas y mantener nuestra plataforma en funcionamiento!
        </p>
      </div>
    </div>
  );
};

export default Donaciones;
