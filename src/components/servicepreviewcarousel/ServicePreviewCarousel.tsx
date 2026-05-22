"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../styles/ServicePreviewCarousel.module.css";

interface ServicePreviewCarouselProps {
  images: string[];
  interval?: number;
}

const MotionImage = motion(Image);

const ServicePreviewCarousel: React.FC<ServicePreviewCarouselProps> = ({
  images,
  interval = 3000,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <div className={styles.carouselWrapper}>
      <AnimatePresence mode="wait">
        <MotionImage
          key={index}
          src={images[index]}
          alt={`Preview ${index + 1}`}
          fill
          priority={index === 0}
          sizes="(max-width: 768px) 100vw, 300px"
          className={styles.previewImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
    </div>
  );
};

export default ServicePreviewCarousel;
