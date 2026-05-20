"use client";
import { motion } from "framer-motion";
import AnimatedWelcome from "../animatedwelcome/AnimatedWelcome";
import styles from "../../styles/Hero.module.css";

export const Hero = () => {
  return (
    <section id="hero" className={styles.hero}>
      {/* Video de fondo */}
      <video className={styles.backgroundVideo} autoPlay loop muted playsInline>
        <source src="/videos/Pulido.mp4" type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>

      {/* Superposición oscura */}
      <div className={styles.overlay}></div>

      {/* Contenido del Hero */}
      <div className={styles.content}>
        <div className={styles.animatedWelcome}>
          <AnimatedWelcome />
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          Transformamos y protegemos tu vehículo con nuestros servicios premium.
        </motion.p>
        <motion.div
          className={styles.description}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        >
          <h2>ESTÉTICA VEHICULAR</h2>
          <p>
            Somos un taller enfocado en mejorar la estética de todo tipo de
            vehículos, alargando así la vida útil de sus componentes. Aplicamos
            selladores que con un buen anclaje nos garantizan preservar en el
            tiempo el estado del material.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
