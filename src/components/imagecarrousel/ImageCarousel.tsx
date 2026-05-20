"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import styles from "../../styles/ImageCarousel.module.css";

const images = [
  "/images/Estetica.jpg",
  "/images/Estetica2.jpg",
  "/images/Pulido.jpg",
  "/images/Auto6.jpg",
  "/images/Auto7.jpg",
  "/images/Auto5.jpg",
];

const duplicatedImages = [...images, ...images];

const ImageCarousel = () => {
  const controls = useAnimation();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setContainerWidth(carouselRef.current.scrollWidth / 2);
    }
  }, []);

  useEffect(() => {
    if (containerWidth > 0) {
      const animateCarousel = async () => {
        // Anima de 0 a -containerWidth de forma lineal
        await controls.start({
          x: -containerWidth,
          transition: { duration: 60, ease: "linear" },
        });
        // Cuando finalice, reinicia instantáneamente a 0 y vuelve a animar
        controls.set({ x: 0 });
        animateCarousel();
      };
      animateCarousel();
    }
  }, [containerWidth, controls]);

  return (
    <div className={styles.carousel} ref={carouselRef}>
      <motion.div className={styles.inner} animate={controls}>
        {duplicatedImages.map((src, index) => (
          <div className={styles.item} key={index}>
            <img src={src} alt={`Imagen ${(index % images.length) + 1}`} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ImageCarousel;
