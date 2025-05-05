"use client";

import { useState, useEffect, useRef } from "react";
import { sendChatMessage } from "@/lib/api";
import { motion } from "framer-motion";
import { FaTimes, FaRobot, FaPaperPlane } from "react-icons/fa";

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Chatbot({ isOpen, onClose }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatOutputRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatOutputRef.current) {
      chatOutputRef.current.scrollTop = chatOutputRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle sending message
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await sendChatMessage(input);
      if (response.response) {
        const botMessage: Message = { text: response.response, isUser: false };
        setMessages((prev) => [...prev, botMessage]);
      } else if (response.error) {
        const errorMessage: Message = { text: `Error: ${response.error}`, isUser: false };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = { text: "Error: Unable to connect to the server.", isUser: false };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-gray-100 dark:bg-gray-800 rounded-md w-96 h-[500px] flex flex-col relative shadow-xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <FaTimes className="text-xl" />
        </button>

        {/* Header Section */}
        <div className="flex items-center gap-3 py-4 px-6 border-b border-gray-200 dark:border-gray-700">
          <FaRobot className="text-2xl text-blue-500" />
          <h3 className="text-2xl font-bold">AI Assistant</h3>
        </div>

        {/* Chat Section */}
        <div
          ref={chatOutputRef}
          className="flex-1 overflow-y-auto space-y-4 p-6 border-b border-gray-200 dark:border-gray-700"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  msg.isUser
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none"
                }`}
                dangerouslySetInnerHTML={{ __html: msg.text }}
              />
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none">
                Typing...
              </div>
            </div>
          )}
        </div>

        {/* Input Section */}
        <div className="py-2 px-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-2 rounded-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="w-10 h-10 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              <FaPaperPlane className="text-lg" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}