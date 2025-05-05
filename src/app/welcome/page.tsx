
"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Background } from "@/components/effects/background";


const welcomeMessages = [
  { lang: "English", message: "Welcome!" },
  { lang: "Spanish", message: "¡Bienvenido!" },
  { lang: "French", message: "Bienvenue !" },
  { lang: "German", message: "Willkommen!" },
  { lang: "Italian", message: "Benvenuto!" },
  { lang: "Japanese", message: "ようこそ！" },
  { lang: "Chinese", message: "欢迎！" },
  { lang: "Korean", message: "환영합니다!" },
  { lang: "Russian", message: "Добро пожаловать!" },
  { lang: "Hindi", message: "स्वागत है!" },
];

const WelcomePage = ({onAnimationComplete}:any) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % welcomeMessages.length);
    }, 500);
    const timeout = setTimeout(() => { 
      onAnimationComplete()

    }, 5000);
    return () => {
      clearInterval(timer);
      clearTimeout(timeout)
    };
  }, []);
  
    const lineVariants = {
        initial: { scaleX: 0, originX: 0.5, opacity: 0 },
        animate: {
            scaleX: 1, opacity: 1,
            transition: { duration: 5, ease: "linear"},
        },
    };

  const pageVariants = {
    initial: { opacity: 1},
    exit: { opacity: 0, transition: { duration: 0.25 } },
  };

  return (
    <AnimatePresence>
        <Background/>
      <motion.div
         variants={pageVariants}
        initial="initial"
        exit="exit"
        className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center text-white z-50"

      >
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div key={currentIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20, transition:{duration:0.25}}} className="text-center">
                <p className="font-bold text-xl">
                    {welcomeMessages[currentIndex].lang}
                </p>
                <p className="text-3xl">
                    {welcomeMessages[currentIndex].message}
                </p>




            </motion.div>
          </AnimatePresence>
        </div>
        <motion.div
          className="w-full h-0.5 bg-blue-500 mt-8 origin-center"
          variants={lineVariants}
          initial="initial"
          animate="animate"
        />
        
      </motion.div>
    </AnimatePresence>
  );
};

export default WelcomePage;