"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useKeenSlider } from "keen-slider/react";

import "keen-slider/keen-slider.min.css";

import styles from "../../styles/Services.module.css";

interface Service {
  name: string;
  description: string;
  image: string;
}

interface ServiceCategory {
  title: string;
  services: Service[];
}

const serviceCategories: ServiceCategory[] = [
  {
    title: "DETAILING & PROTECCIÓN",
    services: [
      {
        name: "TRATAMIENTO CERÁMICO",
        description:
          "Aplicación de recubrimientos cerámicos para proteger y embellecer la superficie de tu vehículo.",
        image: "/images/Sacabollo1.jpg",
      },

      {
        name: "TRATAMIENTO ACRÍLICO",
        description:
          "Protección y realce de la estética con tratamientos acrílicos de alta calidad.",
        image: "/images/Auto8.jpg",
      },

      {
        name: "ABRILLANTADO",
        description:
          "Proceso de abrillantado para devolverle el brillo y la apariencia original a la carrocería de tu vehículo.",
        image: "/images/Auto4.jpg",
      },
    ],
  },

  {
    title: "REPARACIONES ESTÉTICAS",
    services: [
      {
        name: "PARA GRANIZO",
        description:
          "Reparación y restauración de daños ocasionados por granizo, dejando tu vehículo como nuevo.",
        image: "/images/Auto6.jpg",
      },

      {
        name: "SACABOLLOS",
        description:
          "Reparaciones artesanales sin métodos invasivos para eliminar abolladuras y restaurar la carrocería.",
        image: "/images/Sacabollo1.jpg",
      },

      {
        name: "SERVICIO PRE-VENTA",
        description:
          "Inspección y preparación del vehículo para la venta, garantizando un estado óptimo y una excelente presentación.",
        image: "/images/Auto1.jpg",
      },
    ],
  },

  {
    title: "LIMPIEZA PROFUNDA",
    services: [
      {
        name: "LAVADO DE MOTOR",
        description:
          "Limpieza profunda y cuidadosa del motor, eliminando residuos y asegurando su funcionamiento óptimo.",
        image: "/images/Auto3.jpg",
      },

      {
        name: "LIMPIEZA DE TAPIZADO",
        description:
          "Limpieza y revitalización de tapizados para renovar el interior de tu vehículo.",
        image: "/images/LimpiezaInteriores.jpg",
      },
    ],
  },
];

export const Services = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section id="services" className={styles.services}>
      <div className={styles.badge}>SERVICIOS PREMIUM</div>

      <h2>
        Nuestros <span>Servicios</span>
      </h2>

      {serviceCategories.map((category, categoryIndex) => (
        <CategorySlider
          key={categoryIndex}
          category={category}
          setSelectedService={setSelectedService}
        />
      ))}

      <AnimatePresence>
        {selectedService && (
          <motion.div
            className={styles.modalOverlay}
            onClick={() => setSelectedService(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
              initial={{
                scale: 0.9,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
              }}
            >
              <button
                className={styles.closeButton}
                onClick={() => setSelectedService(null)}
              >
                &times;
              </button>

              <div className={styles.modalImageContainer}>
                <Image
                  src={selectedService.image}
                  alt={selectedService.name}
                  fill
                  sizes="100vw"
                  className={styles.modalImage}
                />
              </div>

              <h3>{selectedService.name}</h3>

              <p>{selectedService.description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

interface CategorySliderProps {
  category: ServiceCategory;
  setSelectedService: (service: Service) => void;
}

const CategorySlider = ({
  category,
  setSelectedService,
}: CategorySliderProps) => {
  const [isMobile, setIsMobile] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLUListElement>(
    isMobile
      ? {
          loop: true,

          slides: {
            perView: 1,
            spacing: 16,
          },

          slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
          },

          created(slider) {
            let timeout: NodeJS.Timeout;

            const nextTimeout = () => {
              clearTimeout(timeout);

              timeout = setTimeout(() => {
                slider.next();
              }, 3000);
            };

            slider.on("created", nextTimeout);
            slider.on("dragStarted", () => clearTimeout(timeout));
            slider.on("animationEnded", nextTimeout);
            slider.on("updated", nextTimeout);
          },
        }
      : undefined,
  );

  return (
    <div className={styles.categoryBlock}>
      <h3 className={styles.categoryTitle}>{category.title}</h3>

      <ul
        ref={isMobile ? sliderRef : null}
        className={
          isMobile ? `keen-slider ${styles.servicesSlider}` : styles.desktopGrid
        }
      >
        {category.services.map((service, index) => (
          <li
            key={index}
            className={
              isMobile
                ? `keen-slider__slide ${styles.serviceCard}`
                : styles.serviceCard
            }
            onClick={() => setSelectedService(service)}
          >
            <div className={styles.imageContainer}>
              <Image
                src={service.image}
                alt={service.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.serviceImage}
              />
            </div>

            <div className={styles.serviceContent}>
              <h4>{service.name}</h4>

              <p>{service.description.substring(0, 85)}...</p>
            </div>
          </li>
        ))}
      </ul>

      {isMobile && (
        <div className={styles.dots}>
          {category.services.map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current?.moveToIdx(idx)}
              className={`${styles.dot} ${
                currentSlide === idx ? styles.activeDot : ""
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
