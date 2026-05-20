import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../styles/AnimatedWelcome.module.css";

const messages = ["¡Bienvenido a !", "¡Gracias por elegirnos!"];

export default function AnimatedWelcome() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIndex(1);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className={styles.message}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 1 }}
        >
          {messages[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
