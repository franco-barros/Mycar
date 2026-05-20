"use client";
import React from "react";
import styles from "../../styles/WhatsappButton.module.css";
import { FaWhatsapp } from "react-icons/fa";

interface WhatsappButtonProps {
  phoneNumber: string; // Número sin espacios, ej: "1234567890"
  message?: string;
}

const WhatsappButton: React.FC<WhatsappButtonProps> = ({
  phoneNumber,
  message = "Hola, me gustaría más información.",
}) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.whatsappButton}
    >
      <FaWhatsapp className={styles.icon} />
    </a>
  );
};

export default WhatsappButton;
