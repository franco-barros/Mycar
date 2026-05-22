"use client";

import React from "react";

import { motion, AnimatePresence } from "framer-motion";

import styles from "../../styles/hero/AnimatedWelcome.module.css";

const messages = [
  "BIENVENIDO A MY CAR DETAIL",
  "ESTETICA VEHICULAR DE CALIDAD ",
];

export default function AnimatedWelcome() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev === messages.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className={styles.message}
          initial={{
            opacity: 0,
            y: -25,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            y: 25,
            filter: "blur(10px)",
          }}
          transition={{
            duration: 0.9,
            ease: "easeOut",
          }}
        >
          {messages[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
