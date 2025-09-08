"use client";

import "./globals.css";
import { Poppins } from "next/font/google";
import { Provider } from "@/components/themes/provides";
import { useTheme } from "next-themes";
import Navbar from "@/components/navbar/navbar";
import { CircleAnimation } from "@/components/effects/growing-circle";
import { Background } from "@/components/effects/background";
import CustomCursor from "@/components/cursor/custom-cursor";
import { Chatbot } from "@/components/chat/chatbot";
import { useState } from "react";
import { motion } from "framer-motion";
import WelcomePage from "./welcome/page";
import { FaRobot } from "react-icons/fa";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showHomePage, setShowHomePage] = useState(false);
  const { theme, setTheme } = useTheme();

  const onAnimationComplete = () => {
    setShowHomePage(true);
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://yuvrajsinh.me" />
        <link rel="icon" href="/images/deep.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/images/deep.png" type="image/png" sizes="180x180" />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="af1b100f-9515-440f-9a17-f9a50a32eb6f"
        ></script>
      </head>
      <body className={`${poppins.className}`}>
        <Provider>
          <Background />
          <CircleAnimation />
          <CustomCursor />
          {!showHomePage ? (
            <WelcomePage onAnimationComplete={onAnimationComplete} />
          ) : (
            <>
              <Navbar />
              <div className="z-30 relative">{children}</div>
              <div className="fixed bottom-6 right-6 z-50">
                <div className="absolute top-1 left-1">
                  <button
                    aria-label="Toggle dark mode"
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                  >
                    {theme === "dark" ? (
                      <i className="fa-solid fa-sun text-white text-xl"></i>
                    ) : (
                      <i className="fa-solid fa-moon text-black text-xl"></i>
                    )}
                  </button>
                </div>
                <motion.div className="relative group flex justify-center items-center expand-cursor">
                  <div className="flex justify-center items-center rounded-full h-12 w-12 transition-all duration-200 overflow-hidden p-1.5 group-hover:bg-[#4dc6ff]/10 group-hover:shadow-lg group-hover:shadow-[#4dc6ff]/10">
                    <motion.button
                      onClick={() => setIsChatOpen(true)}
                      className="group/social flex items-center justify-center rounded-full relative overflow-hidden w-full h-full"
                      aria-label="Open chatbot"
                    >
                     <FaRobot className="text-2xl transition-transform group-hover/social:scale-110" />
                    </motion.button>
                  </div>
                </motion.div>
              </div>
              <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
            </>
          )}
        </Provider>
      </body>
    </html>
  );
}