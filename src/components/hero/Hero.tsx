"use client";

import { motion } from "framer-motion";

import Image from "next/image";

import AnimatedWelcome from "../animatedwelcome/AnimatedWelcome";

import styles from "../../styles/hero/Hero.module.css";

export const Hero = () => {
  return (
    <section id="hero" className={styles.hero}>
      {/* VIDEO */}
      <video
        className={styles.backgroundVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/Pulido.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className={styles.overlay} />

      {/* CONTENIDO */}
      <div className={styles.content}>
        <motion.div
          className={styles.glassCard}
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
        >
          {/* LOGO */}
          <div className={styles.logoWrapper}>
            <Image
              src="/mycar1.png"
              alt="Logo estética vehicular"
              fill
              priority
              className={styles.logo}
            />
          </div>

          <div className={styles.animatedWelcome}>
            <AnimatedWelcome />
          </div>

          <motion.p
            className={styles.mainText}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
              delay: 0.3,
            }}
          >
            Transformamos y protegemos tu vehículo con servicios premium de
            estética vehicular, detailing y tratamientos especializados.
          </motion.p>

          <motion.div
            className={styles.description}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
              delay: 0.5,
            }}
          >
            <p>
              Somos especialistas en restauración, protección y mantenimiento
              estético para todo tipo de vehículos. Aplicamos tratamientos de
              alta calidad que preservan el brillo, la pintura y cada detalle
              para mantener tu vehículo impecable por mucho más tiempo.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
