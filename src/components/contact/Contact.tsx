"use client";

import React, { useState } from "react";

import styles from "../../styles/contact/Contact.module.css";

import { User, Mail, MessageSquare, ListChecks } from "lucide-react";

import { FaInstagram, FaStar } from "react-icons/fa";

import Link from "next/link";

import { FadeInOnScroll } from "../shared/fadeInonscroll";

import toast from "react-hot-toast";

const Contact: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const form = e.currentTarget;

    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      reason: formData.get("reason"),
      message: formData.get("message"),
    };

    const toastId = toast.loading("Enviando mensaje...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.error || "Error al enviar el mensaje", {
          id: toastId,
        });

        setLoading(false);

        return;
      }

      toast.success("Mensaje enviado correctamente 🚗", {
        id: toastId,
      });

      form.reset();
    } catch {
      toast.error("Error de conexión", {
        id: toastId,
      });
    }

    setLoading(false);
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.contactContent}>
        {/* HEADER */}
        <FadeInOnScroll>
          <div className={styles.badgeWrapper}>
            <span className={styles.badge}>
              <FaStar size={14} />
              Contacto
            </span>
          </div>

          <h2 className={styles.title}>
            <span>Dejá tu vehículo en </span>

            <span>manos profesionales</span>
          </h2>
        </FadeInOnScroll>

        {/* FORM */}
        <FadeInOnScroll delay={0.1}>
          <div className={styles.formWrapper}>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <div className={styles.labelWithIcon}>
                  <User size={16} />

                  <label htmlFor="name">Nombre y apellido</label>
                </div>

                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Tu nombre completo"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <div className={styles.labelWithIcon}>
                  <Mail size={16} />

                  <label htmlFor="email">Email</label>
                </div>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="tuemail@mail.com"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <div className={styles.labelWithIcon}>
                  <ListChecks size={16} />

                  <label htmlFor="reason">Servicio de interés</label>
                </div>

                <select id="reason" name="reason" required>
                  <option value="">Seleccioná una opción</option>

                  <option value="pulido">Pulido y abrillantado</option>

                  <option value="ceramico">Tratamiento cerámico</option>

                  <option value="interior">Limpieza de interiores</option>

                  <option value="granizo">Reparación de granizo</option>

                  <option value="otro">Otro</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <div className={styles.labelWithIcon}>
                  <MessageSquare size={16} />

                  <label htmlFor="message">Mensaje</label>
                </div>

                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Contanos qué necesita tu vehículo"
                  required
                />
              </div>

              <button
                type="submit"
                className={`${styles.submitButton} ${
                  loading ? styles.loading : ""
                }`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className={styles.spinner}></span>
                    Enviando...
                  </>
                ) : (
                  "Enviar consulta"
                )}
              </button>
            </form>
          </div>
        </FadeInOnScroll>

        {/* INSTAGRAM */}
        <FadeInOnScroll delay={0.2}>
          <div className={styles.instagramCard}>
            <FaInstagram className={styles.instagramCardIcon} size={100} />

            <p className={styles.instagramCardText}>
              Seguinos en Instagram y descubrí nuestros trabajos, tratamientos y
              resultados.
            </p>

            <Link
              href="https://www.instagram.com/mv.cardetail"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.instagramCardButton}
            >
              <FaInstagram />
              @mv.cardetail
            </Link>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};

export default Contact;
