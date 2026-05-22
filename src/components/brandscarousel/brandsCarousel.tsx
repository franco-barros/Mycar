"use client";

import React, { useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import { motion, useAnimation, useMotionValue } from "framer-motion";
import styles from "../../styles/BrandsCarousel.module.css";

const brands = [
  { id: 0, src: "/logosempresas/bitacorablanco1.png" },
  { id: 1, src: "/logosempresas/CAFAAMLAT_blanco.png" },
  { id: 2, src: "/logosempresas/caforiginalcaribeh-esp-01.png" },
  { id: 3, src: "/logosempresas/Casa.png" },
  { id: 4, src: "/logosempresas/JAE-01.png" },
  { id: 5, src: "/logosempresas/logo-defensoria.png" },
  { id: 6, src: "/logosempresas/LogoAHBlanco.png" },
  { id: 7, src: "/logosempresas/LogoCreando.png" },
  { id: 8, src: "/logosempresas/Logos-AFS.png" },
  { id: 9, src: "/logosempresas/pocito_logo.png" },
  { id: 10, src: "/logosempresas/Rawson-01.png" },
  { id: 11, src: "/logosempresas/RONATBlanco.png" },
  { id: 12, src: "/logosempresas/Universidad.png" },
];

export default function BrandsCarousel() {
  const controls = useAnimation();
  const carouselRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const speed = 60; // velocidad del scroll
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const items = useMemo(() => {
    return [...brands, ...brands];
  }, []);

  const startAnimation = useCallback(() => {
    if (!carouselRef.current) return;

    const fullWidth = carouselRef.current.scrollWidth / 2;
    const duration = fullWidth / speed;

    controls.set({ x: 0 });

    controls.start({
      x: -fullWidth,
      transition: {
        duration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  }, [controls, speed]);

  const stopAnimation = useCallback(() => {
    controls.stop();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [controls]);

  const resumeAnimation = useCallback(() => {
    stopAnimation();

    timeoutRef.current = setTimeout(() => {
      startAnimation();
    }, 2000);
  }, [startAnimation, stopAnimation]);

  useEffect(() => {
    startAnimation();

    return () => {
      stopAnimation();
    };
  }, [startAnimation, stopAnimation]);

  useEffect(() => {
    const element = carouselRef.current;
    if (!element) return;

    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();

      stopAnimation();
      x.set(x.get() + e.deltaY);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        startAnimation();
      }, 2000);
    };

    element.addEventListener("wheel", wheelHandler, { passive: false });

    return () => {
      element.removeEventListener("wheel", wheelHandler);
    };
  }, [x, startAnimation, stopAnimation]);

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>
        Las marcas que trabajan con nosotros y confían en nuestro servicio de
        estética
      </h2>

      <div className={styles.carouselWrapper}>
        <motion.div
          ref={carouselRef}
          className={styles.track}
          style={{ x }}
          animate={controls}
          drag="x"
          dragElastic={0.15}
          whileTap={{ cursor: "grabbing" }}
          onDragStart={stopAnimation}
          onDragEnd={resumeAnimation}
          onMouseEnter={stopAnimation}
          onMouseLeave={resumeAnimation}
        >
          {items.map((brand, copyIndex) => (
            <div key={`${brand.id}-${copyIndex}`} className={styles.logoBox}>
              <Image
                src={brand.src}
                alt="brand logo"
                width={180}
                height={90}
                className={styles.logo}
                priority={brand.id < 3}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
