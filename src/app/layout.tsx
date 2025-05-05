"use client";

import { Poppins } from "next/font/google";
import "./globals.css";
import { Provider } from "@/components/themes/provides";
import Navbar from "@/components/navbar/navbar";
import { CircleAnimation } from "@/components/effects/growing-circle";
import { Background } from "@/components/effects/background";
import CustomCursor from "@/components/cursor/custom-cursor";
import { Chatbot } from "@/components/chat/chatbot";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    console.log("Current theme:", theme);
  }, [theme]);

  if (!mounted) {
    return (
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="canonical" href="https://yuvrajsinh.me" />
          <script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id="af1b100f-9515-440f-9a17-f9a50a32eb6f"
          ></script>
        </head>
        <body className={poppins.className}>
          <Provider>
            <Background />
            <CircleAnimation />
            <CustomCursor />
            <Navbar />
            <div className="z-30 relative">{children}</div>
            <div className="fixed bottom-6 right-6 z-50">
              <div className="relative group flex justify-center items-center expand-cursor">
                <div className="flex justify-center items-center rounded-full h-12 w-12 transition-all duration-200 overflow-hidden p-1.5">
                  <button
                    onClick={() => setIsChatOpen(true)}
                    className="group/social flex items-center justify-center rounded-full relative overflow-hidden w-full h-full"
                    aria-label="Open chatbot"
                  >
                    <FaRobot className="text-2xl" />
                  </button>
                </div>
              </div>
            </div>
            <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
          </Provider>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://yuvrajsinh.me" />
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="af1b100f-9515-440f-9a17-f9a50a32eb6f"
        ></script>
      </head>
      <body className={poppins.className}>
        <Provider>
          <Background />
          <CircleAnimation />
          <CustomCursor />
          <Navbar />
          <div className="z-30 relative">{children}</div>
          <div className="fixed bottom-6 right-6 z-50">
            <motion.div
              className="relative group flex justify-center items-center expand-cursor"
            >
              <div
                className="flex justify-center items-center rounded-md h-12 w-12 transition-all duration-200 overflow-hidden p-1.5 group-hover:bg-[#4dc6ff]/10 group-hover:shadow-lg group-hover:shadow-[#4dc6ff]/10"
              >
                <motion.button
                  onClick={() => setIsChatOpen(true)}
                  onMouseEnter={() => setHoveredCard("chat")}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group/social flex items-center justify-center rounded-full relative overflow-hidden w-full h-full"
                  aria-label="Open chatbot"
                >
                  <div
                    className="transition-transform group-hover/social:scale-110"
                    style={{
                      color: "currentColor",
                    }}
                  >
                    <FaRobot className="text-2xl" />
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </div>
          <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        </Provider>
      </body>
    </html>
  );
}