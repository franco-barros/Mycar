"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ServicePreviewCarousel from "../servicepreviewcarousel/ServicePreviewCarousel";
import styles from "../../styles/Services.module.css";

interface Service {
  name: string;
  description: string;
  images: string[];
}

export const Services = () => {
  const serviceList: Service[] = [
    {
      name: "PARA GRANIZO",
      description:
        "Reparación y restauración de daños ocasionados por granizo, dejando tu vehículo como nuevo.",
      images: ["/images/Auto6.jpg", "/images/Auto5.jpg"],
    },
    {
      name: "SACABOLLOS",
      description:
        "Reparaciones artesanales sin métodos invasivos para eliminar abolladuras y restaurar la carrocería.",
      images: ["/images/Sacabollo1.jpg", "/images/Sacabollo.jpg"],
    },
    {
      name: "TRATAMIENTO CERÁMICO",
      description:
        "Aplicación de recubrimientos cerámicos para proteger y embellecer la superficie de tu vehículo.",
      images: ["/images/Ceramica1.jpg", "/images/Ceramica2.jpg"],
    },
    {
      name: "TRATAMIENTO ACRÍLICO",
      description:
        "Protección y realce de la estética con tratamientos acrílicos de alta calidad.",
      images: ["/images/Auto8.jpg", "/images/Auto7.jpg"],
    },
    {
      name: "PULIDO DE ÓPTICAS",
      description:
        "Limpieza y pulido profesional de ópticas para una visión clara y sin rayones.",
      images: ["/images/Auto4.jpg", "/images/Auto3.jpg"],
    },
    {
      name: "LAVADO DE MOTOR",
      description:
        "Limpieza profunda y cuidadosa del motor, eliminando residuos y asegurando su funcionamiento óptimo.",
      images: ["/images/Auto3.jpg", "/images/Auto4.jpg"],
    },
    {
      name: "ABRILLANTADO",
      description:
        "Proceso de abrillantado para devolverle el brillo y la apariencia original a la carrocería de tu vehículo.",
      images: ["/images/Auto4.jpg", "/images/Auto3.jpg"],
    },
    {
      name: "LIMPIEZA DE TAPIZADO",
      description:
        "Limpieza y revitalización de tapizados para renovar el interior de tu vehículo.",
      images: [
        "/images/LimpiezaInteriores.jpg",
        "/images/LimpiezaInteriores2.jpg",
      ],
    },
    {
      name: "SERVICIO PRE-VENTA",
      description:
        "Inspección y preparación del vehículo para la venta, garantizando un estado óptimo y una excelente presentación.",
      images: ["/images/Auto1.jpg", "/images/Auto3.jpg"],
    },
  ];

  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section id="services" className={styles.services}>
      <h2>Nuestros Servicios</h2>

      <ul>
        {serviceList.map((service, index) => (
          <li key={index} onClick={() => setSelectedService(service)}>
            <h3>{service.name}</h3>

            {service.description && (
              <p>{service.description.substring(0, 60)}...</p>
            )}

            <ServicePreviewCarousel images={service.images} />
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {selectedService && (
          <motion.div
            className={styles.modalOverlay}
            onClick={() => setSelectedService(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                className={styles.closeButton}
                onClick={() => setSelectedService(null)}
              >
                &times;
              </button>

              <h3>{selectedService.name}</h3>

              <p>{selectedService.description}</p>

              <div className={styles.modalImages}>
                {selectedService.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${selectedService.name} ${idx + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Services;
