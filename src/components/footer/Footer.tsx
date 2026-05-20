"use client";

import React from "react";
import { FaInstagram, FaPhoneAlt, FaEnvelope, FaUsers } from "react-icons/fa";
import { usePathname } from "next/navigation";
import styles from "../../styles/Footer.module.css";

const Footer = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) return null;

  const handleInternalLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.content}>
        {/* Presentación */}
        <div className={styles.section}>
          <h3 className={styles.title}>
            <FaUsers className={styles.iconLeaf} />
            Brigadas Educativas Comunitaria
          </h3>
          <p className={styles.description}>
            Somos una organización comunitaria que promueve la educación
            popular, la inclusión y el desarrollo de los barrios desde la
            solidaridad.
          </p>
        </div>

        {isHome && (
          <>
            {/* Links */}
            <div className={styles.section}>
              <h4 className={styles.subtitle}>Enlaces</h4>
              <ul className={styles.list}>
                <li>
                  <a
                    href="#aboutus"
                    onClick={(e) => handleInternalLinkClick(e, "aboutus")}
                  >
                    Quiénes somos
                  </a>
                </li>
                <li>
                  <a
                    href="#whatwedo"
                    onClick={(e) => handleInternalLinkClick(e, "whatwedo")}
                  >
                    Qué hacemos
                  </a>
                </li>
                <li>
                  <a
                    href="#participate"
                    onClick={(e) => handleInternalLinkClick(e, "participate")}
                  >
                    Cómo participar
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={(e) => handleInternalLinkClick(e, "contact")}
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className={styles.section}>
              <h4 className={styles.subtitle}>Contacto</h4>
              <p className={styles.contact}>
                <FaPhoneAlt /> +54 9 264 585-6333
              </p>
              <p className={styles.contact}>
                <FaEnvelope /> brigadaseducativas.ccion@gmail.com
              </p>
              <a
                href="https://www.instagram.com/brigadaseducativas.sj"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contact}
                aria-label="Instagram"
              >
                <FaInstagram /> @brigadaseducativas.sj
              </a>
            </div>
          </>
        )}
      </div>

      {/* Foot page */}
      <div className={styles.bottomBar}>
        <p className={styles.copy}>
          © 2024 Brigada Educativa Comunitaria. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
