"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const TypewriterEffect = ({
  words,
  className,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
}) => {
  const [mounted, setMounted] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fullText = words.map(word => word.text).join("");
    
    if (!isPaused) {
      if (!isDeleting && currentIndex < fullText.length) {
        // Typing
        const timeout = setTimeout(() => {
          setCurrentText(prevText => prevText + fullText[currentIndex]);
          setCurrentIndex(prevIndex => prevIndex + 1);
        }, 100);

        return () => clearTimeout(timeout);
      } else if (isDeleting && currentIndex > 0) {
        // Backspacing
        const timeout = setTimeout(() => {
          setCurrentText(prevText => prevText.slice(0, -1));
          setCurrentIndex(prevIndex => prevIndex - 1);
        }, 50); // Faster backspacing

        return () => clearTimeout(timeout);
      } else if (currentIndex === fullText.length) {
        // Pause at the end of typing
        setIsPaused(true);
        setTimeout(() => {
          setIsDeleting(true);
          setIsPaused(false);
        }, 2000); // Pause for 2 seconds before backspacing
      } else if (currentIndex === 0 && isDeleting) {
        // Pause at the beginning after backspacing
        setIsPaused(true);
        setTimeout(() => {
          setIsDeleting(false);
          setIsPaused(false);
        }, 1000); // Pause for 1 second before typing again
      }
    }
  }, [currentIndex, mounted, words, isDeleting, isPaused]);

  if (!mounted) {
    return (
      <div className={cn("flex flex-wrap items-center justify-center", className)}>
        {words.map((word, idx) => (
          <span key={`${word}-${idx}`} className={cn("inline-block", word.className)}>
            {word.text}
            {idx !== words.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={cn("flex flex-wrap items-center justify-center", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="inline-block">
        {currentText}
        <span className="animate-pulse">|</span>
      </span>
    </motion.div>
  );
};
