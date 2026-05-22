"use client";

import { motion } from "framer-motion";

import ImageCarousel from "../imagecarrousel/ImageCarousel";

import styles from "../../styles/About.module.css";

const MotionSection = motion.section;

const About = () => {
  return (
    <MotionSection
      id="about"
      className={styles.about}
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
    >
      <div className={styles.badge}>Sobre nosotros</div>

      <h2>
        <span>My Car Detail</span>
      </h2>

      <div className={styles.card}>
        <p>
          En <strong>My Car Detail</strong> trabajamos con pasión por los
          vehículos, ofreciendo servicios de estética vehicular diseñados para
          restaurar, proteger y mantener cada detalle de tu auto en condiciones
          impecables.
        </p>

        <p>
          Nuestro taller está liderado por <strong>Maxi Villegas</strong>,
          especializado en detailing, tratamientos de protección, pulidos,
          abrillantados y restauración estética de vehículos.
        </p>

        <p>
          Utilizamos productos de alta calidad y técnicas profesionales para
          lograr acabados premium, cuidando tanto la estética como la
          conservación de cada superficie.
        </p>

        <p>
          Creemos que cada vehículo merece un tratamiento único, por eso
          trabajamos con dedicación, precisión y atención en cada detalle para
          entregar resultados que realmente marquen la diferencia.
        </p>
      </div>

      <ImageCarousel />
    </MotionSection>
  );
};

export default About;
