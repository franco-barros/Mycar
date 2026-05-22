"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X } from "lucide-react";
import styles from "../../styles/Navbar.module.css";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Image
          src="/mycar1.png"
          alt="Logo MyCar"
          width={120}
          height={120}
          className={styles.logo}
          priority
        />
      </div>

      {/* Menú de escritorio */}
      <ul className={styles.desktopMenu}>
        <li>
          <a href="#hero" onClick={handleLinkClick}>
            Inicio
          </a>
        </li>

        <li>
          <a href="#about" onClick={handleLinkClick}>
            Nosotros
          </a>
        </li>

        <li>
          <a href="#services" onClick={handleLinkClick}>
            Servicios
          </a>
        </li>

        <li>
          <a href="#products" onClick={handleLinkClick}>
            Productos
          </a>
        </li>

        <li>
          <a href="#contact" onClick={handleLinkClick}>
            Contacto
          </a>
        </li>
      </ul>

      {/* Botón menú mobile */}
      <motion.button
        className={styles.menuButton}
        onClick={() => setIsOpen(!isOpen)}
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {isOpen ? (
          <X size={24} color="#fff" />
        ) : (
          <Settings size={24} color="#fff" />
        )}
      </motion.button>

      {/* Menú mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <li>
              <a href="#hero" onClick={handleLinkClick}>
                Inicio
              </a>
            </li>

            <li>
              <a href="#about" onClick={handleLinkClick}>
                Nosotros
              </a>
            </li>

            <li>
              <a href="#services" onClick={handleLinkClick}>
                Servicios
              </a>
            </li>

            <li>
              <a href="#instagramprofile" onClick={handleLinkClick}>
                Contacto
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
