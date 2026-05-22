"use client";

import React from "react";

import { FaInstagram, FaPhoneAlt, FaEnvelope, FaCar } from "react-icons/fa";

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

    section?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <footer id="footer" className={styles.footer}>
      <div className={styles.content}>
        {/* PRESENTACIÓN */}
        <div className={styles.section}>
          <h3 className={styles.title}>
            <FaCar className={styles.iconLeaf} />
            MV Car Detail
          </h3>

          <p className={styles.description}>
            Especialistas en estética vehicular, detailing y tratamientos
            premium para proteger, restaurar y potenciar la apariencia de tu
            vehículo.
          </p>
        </div>

        {isHome && (
          <>
            {/* LINKS */}
            <div className={styles.section}>
              <h4 className={styles.subtitle}>Navegación</h4>

              <ul className={styles.list}>
                <li>
                  <a
                    href="#hero"
                    onClick={(e) => handleInternalLinkClick(e, "hero")}
                  >
                    Inicio
                  </a>
                </li>

                <li>
                  <a
                    href="#services"
                    onClick={(e) => handleInternalLinkClick(e, "services")}
                  >
                    Servicios
                  </a>
                </li>

                <li>
                  <a
                    href="#about"
                    onClick={(e) => handleInternalLinkClick(e, "about")}
                  >
                    Nosotros
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

            {/* CONTACTO */}
            <div className={styles.section}>
              <h4 className={styles.subtitle}>Contacto</h4>

              <p className={styles.contact}>
                <FaPhoneAlt />
                +54 9 264 585-6333
              </p>

              <p className={styles.contact}>
                <FaEnvelope />
                contacto@mvcardetail.com
              </p>

              <a
                href="https://www.instagram.com/mv.cardetail"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contact}
                aria-label="Instagram"
              >
                <FaInstagram />
                @mv.cardetail
              </a>
            </div>
          </>
        )}
      </div>

      {/* FOOTER INFERIOR */}
      <div className={styles.bottomBar}>
        <p className={styles.copy}>
          © 2026 MV Car Detail. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
