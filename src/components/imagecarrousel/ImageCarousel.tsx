"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import styles from "../../styles/ImageCarousel.module.css";

const images = ["/images/Auto6.jpg", "/images/Auto7.jpg", "/images/Auto5.jpg"];

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
        await controls.start({
          x: -containerWidth,
          transition: {
            duration: 30,
            ease: "linear",
          },
        });

        controls.set({ x: 0 });

        animateCarousel();
      };

      animateCarousel();
    }
  }, [containerWidth, controls]);

  return (
    <div className={styles.carousel}>
      <motion.div ref={carouselRef} className={styles.inner} animate={controls}>
        {duplicatedImages.map((src, index) => (
          <div className={styles.item} key={index}>
            <Image
              src={src}
              alt={`Imagen ${(index % images.length) + 1}`}
              fill
              priority={index < 3}
              sizes="(max-width: 768px) 80vw, 500px"
              className={styles.image}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ImageCarousel;
