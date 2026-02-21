"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
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
  const { theme } = useTheme();
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
            transition: { duration: 5, ease: "linear" as const},
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
 className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center z-50 force-light-black p-4 space-y-8 md:space-y-16"
 >
 <div className="flex justify-center items-center flex-grow">
 <div className="rounded-full p-1 border-2 border-blue-400 h-80 w-80 md:h-96 md:w-96 relative overflow-hidden">
   <Image 
     src="/images/deep.png" 
     alt="Deep's profile" 
     fill
     className="rounded-full object-cover"
     priority
   />
 </div>
 </div>

      {/* Move welcome text and loading line to the bottom */}
 <div className="flex flex-col items-center mt-auto w-full">
 <AnimatePresence mode="wait">
 <motion.div key={`${currentIndex}-${welcomeMessages[currentIndex].lang}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20, transition:{duration:0.25}}} className="text-center">
            <p className="text-4xl md:text-6xl">
              {welcomeMessages[currentIndex].message}
            </p>
          </motion.div>
        </AnimatePresence>
        <motion.div
 className="w-full h-0.5 bg-blue-500 mt-8 origin-center"
        variants={lineVariants}
        initial="initial"
          animate="animate"
        />
      </div>
    </motion.div>
 </AnimatePresence>
 );
};
export default WelcomePage;
// "use client";

// import { useEffect, useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { useTheme } from "next-themes";
// import { Background } from "@/components/effects/background";


// const welcomeMessages = [
//   { lang: "English", message: "Welcome!" },
//   { lang: "Spanish", message: "¡Bienvenido!" },
//   { lang: "French", message: "Bienvenue !" },
//   { lang: "German", message: "Willkommen!" },
//   { lang: "Italian", message: "Benvenuto!" },
//   { lang: "Japanese", message: "ようこそ！" },
//   { lang: "Chinese", message: "欢迎！" },
//   { lang: "Korean", message: "환영합니다!" },
//   { lang: "Russian", message: "Добро пожаловать!" },
//   { lang: "Hindi", message: "स्वागत है!" },
// ];

// const WelcomePage = ({onAnimationComplete}:any) => {
//   const { theme } = useTheme();
//   const [currentIndex, setCurrentIndex] = useState<number>(0);
  
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % welcomeMessages.length);
//     }, 500);
//     const timeout = setTimeout(() => { 
//       onAnimationComplete()

//     }, 5000);
//     return () => {
//       clearInterval(timer);
//       clearTimeout(timeout)
//     };
//   }, []);
  
//     const lineVariants = {
//         initial: { scaleX: 0, originX: 0.5, opacity: 0 },
//         animate: {
//             scaleX: 1, opacity: 1,
//             transition: { duration: 5, ease: "linear"},
//         },
//     };

//   const pageVariants = {
//     initial: { opacity: 1},
//     exit: { opacity: 0, transition: { duration: 0.25 } },
//   };

//   return (
//     <AnimatePresence>
//  <Background/>
//       <motion.div
//  variants={pageVariants}
//         initial="initial"
//         exit="exit"
//  className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center z-50 text-gray-800 dark:text-gray-200 p-4 space-y-8 md:space-y-16"
//  >
//  <div className="flex justify-center items-center flex-grow">
//  <img src="/images/deep.png" alt="" className='rounded-full h-80 w-80 md:h-96 md:w-96 object-cover'/>
//  </div>

//       {/* Move welcome text and loading line to the bottom */}
//  <div className="flex flex-col items-center mt-auto w-full">
//  <AnimatePresence mode="wait">
//  <motion.div key={currentIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20, transition:{duration:0.25}}} className="text-center">
//             <p className="text-4xl md:text-6xl">
//               {welcomeMessages[currentIndex].message}
//             </p>
//           </motion.div>
//         </AnimatePresence>
//         <motion.div
//  className="w-full h-0.5 bg-blue-500 mt-8 origin-center"
//         variants={lineVariants}
//         initial="initial"
//           animate="animate"
//         />
//       </div>
//     </motion.div>
//  </AnimatePresence>
//  );
// };
// export default WelcomePage;