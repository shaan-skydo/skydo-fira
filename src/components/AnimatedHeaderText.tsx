
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["FIRA", "FIRC", "BIRC"];

export const AnimatedHeaderText = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000); // Change word every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentWordIndex}
          initial={{ opacity: 0, y: 20, rotateX: 90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -20, rotateX: -90 }}
          transition={{ 
            duration: 0.5,
            ease: "easeInOut"
          }}
          className="text-blue-600 inline-block"
          style={{ transformOrigin: "center" }}
        >
          {words[currentWordIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};
