"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaArrowRight, FaStar } from "react-icons/fa";
import { useKeenSlider } from "keen-slider/react";

import "keen-slider/keen-slider.min.css";

import styles from "../../styles/products/Products.module.css";

interface Product {
  name: string;
  description: string;
  image: string;
  category: string;
}

const productsList: Product[] = [
  {
    name: "Shampoo PH Neutro",
    description:
      "Limpieza profunda sin dañar la pintura ni los tratamientos protectores del vehículo.",
    image: "/images/Product2.png",
    category: "Lavado",
  },

  {
    name: "Espuma Activa Snow Foam",
    description:
      "Genera espuma intensa para remover suciedad y proteger la pintura durante el lavado.",
    image: "/images/Product1.png",
    category: "Lavado",
  },

  {
    name: "Cera Premium",
    description:
      "Aporta brillo intenso y protección prolongada para la carrocería.",
    image: "/images/Product.png",
    category: "Protección",
  },

  {
    name: "Limpiador de Interiores",
    description:
      "Ideal para tapizados, plásticos y superficies interiores del vehículo.",
    image: "/images/Product1.png",
    category: "Interior",
  },

  {
    name: "Restaurador de Plásticos",
    description:
      "Recupera el color y protege plásticos exteriores e interiores.",
    image: "/images/Product2.png",
    category: "Detailing",
  },

  {
    name: "Restaurador",
    description:
      "Recupera el color y protege plásticos exteriores e interiores.",
    image: "/images/Product2.png",
    category: "Detailing",
  },

  {
    name: "Sellador Cerámico",
    description:
      "Protección hidrofóbica avanzada para mantener el brillo por más tiempo.",
    image: "/images/Product1.png",
    category: "Protección",
  },

  {
    name: "Aromatizante Premium",
    description:
      "Fragancias duraderas para mantener el interior fresco y agradable.",
    image: "/images/Product.png",
    category: "Interior",
  },
];

const groupedProducts = productsList.reduce(
  (acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }

    acc[product.category].push(product);

    return acc;
  },
  {} as Record<string, Product[]>,
);

const Products = () => {
  return (
    <section id="products" className={styles.products}>
      <div className={styles.badgeWrapper}>
        <span className={styles.badge}>
          <FaStar size={14} />
          Productos Premium
        </span>
      </div>

      <h2 className={styles.title}>Productos para el cuidado de tu vehículo</h2>

      <p className={styles.subtitle}>
        Trabajamos con productos seleccionados para garantizar limpieza,
        protección y terminaciones profesionales.
      </p>

      {Object.entries(groupedProducts).map(([category, products]) => (
        <ProductsCategory
          key={category}
          category={category}
          products={products}
        />
      ))}

      <motion.div
        className={styles.storeCard}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.storeContent}>
          <span className={styles.storeBadge}>TIENDA ONLINE</span>

          <h3>Descubrí todos nuestros productos</h3>

          <p>
            Ingresá a nuestra tienda y encontrá productos premium para
            detailing, limpieza, protección y cuidado automotriz.
          </p>

          <Link href="/mitienda" className={styles.storeButton}>
            Ir a la tienda
            <FaArrowRight />
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

interface ProductsCategoryProps {
  category: string;
  products: Product[];
}

const ProductsCategory = ({ category, products }: ProductsCategoryProps) => {
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

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
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
    <div className={styles.categorySection}>
      <h3 className={styles.categoryTitle}>{category}</h3>

      <div
        ref={isMobile ? sliderRef : null}
        className={
          isMobile
            ? `keen-slider ${styles.productsSlider}`
            : styles.productsGrid
        }
      >
        {products.map((product, index) => (
          <motion.div
            key={index}
            className={
              isMobile
                ? `keen-slider__slide ${styles.productCard}`
                : styles.productCard
            }
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className={styles.imageContainer}>
              <Image
                src={product.image}
                alt={product.name}
                fill
                className={styles.productImage}
              />
            </div>

            <div className={styles.productContent}>
              <h4>{product.name}</h4>

              <p>{product.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {isMobile && (
        <div className={styles.dots}>
          {products.map((_, idx) => (
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

export default Products;
