"use client";

import { TimelineItem as TimelineItemType } from "@/types/timeline";
import { motion } from "framer-motion";
import Link from "next/link";

interface TimelineItemProps {
  item: TimelineItemType;
  index: number;
  isLast: boolean;
  activeSection: string;
  sectionId: string;
}

export function TimelineItem({ item, index, isLast, activeSection, sectionId }: TimelineItemProps) {
  const isEven = index % 2 === 0;
  const isActive = activeSection === sectionId;

  const cardVariants = {
    hidden: { opacity: 0, x: isEven ? -50 : 50, y: 0 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: index * 0.2 },
    },
  };

  const mobileCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.2 },
    },
  };

  return (
    <div className="relative w-full">
      {/* Desktop View */}
      <div className="hidden md:flex w-full">
        {/* Left Side (Even Index) */}
        {isEven ? (
          <div className="w-1/2 pr-8 flex justify-end">
            <motion.div
              className="w-full max-w-2xl"
              initial="hidden"
              animate={isActive ? "visible" : "hidden"}
              variants={cardVariants}
            >
              <TimelineCard item={item} />
            </motion.div>
          </div>
        ) : (
          <div className="w-1/2"></div>
        )}

        {/* Center Line & Dot */}
        <div className="flex flex-col items-center w-12 flex-shrink-0">
          <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-gray-900 z-10"></div>
          {!isLast && <div className="w-0.5 h-full bg-gray-700"></div>}
        </div>

        {/* Right Side (Odd Index) */}
        {!isEven ? (
          <div className="w-1/2 pl-8">
            <motion.div
              className="w-full max-w-2xl"
              initial="hidden"
              animate={isActive ? "visible" : "hidden"}
              variants={cardVariants}
            >
              <TimelineCard item={item} />
            </motion.div>
          </div>
        ) : (
          <div className="w-1/2"></div>
        )}
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex w-full">
        {/* Line & Dot */}
        <div className="flex flex-col items-center w-12 flex-shrink-0">
          <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-gray-900 z-10"></div>
          {!isLast && <div className="w-0.5 h-full bg-gray-700"></div>}
        </div>

        {/* Content */}
        <div className="pl-6 w-full">
          <motion.div
            className="w-full"
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            variants={mobileCardVariants}
          >
            <TimelineCard item={item} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Separate component for the card to avoid code duplication
function TimelineCard({ item }: { item: TimelineItemType }) {
  const renderDescription = (description: string) => {
    const lines = description.split("\n");
    return lines.map((line, index) => {
      if (line.startsWith("-")) {
        const parts = line.substring(1).split("**");
        return (
          <li key={index} className="mb-2">
            {parts.map((part, i) =>
              i % 2 === 1 ? <strong key={i}>{part}</strong> : part
            )}
          </li>
        );
      }
      const parts = line.split("**");
      return (
        <p key={index} className="text-gray-400 mb-2">
          {parts.map((part, i) =>
            i % 2 === 1 ? <strong key={i}>{part}</strong> : part
          )}
        </p>
      );
    });
  };

  return (
    <div
      className={`relative p-6 rounded-xl bg-gray-800/20 backdrop-blur-sm border border-gray-700/50 shadow-lg`}
    >
      <div className="relative">
        <div className="flex items-center mb-2">
          {item.icon && <div className="text-2xl text-blue-400 mr-3">{item.icon}</div>}
          <h3 className="text-xl font-bold text-white">
            {item.url ? (
              <Link href={item.url} className="text-blue-400 hover:text-blue-300 transition-colors">
                {item.title}
              </Link>
            ) : (
              <span className="text-white">{item.title}</span>
            )}
          </h3>
        </div>
        {item.minor && (
          <p className="text-blue-400 text-md font-semibold mb-2 ml-9">{item.minor}</p>
        )}

        {item.coursework ? (
          <div className="ml-9">
            <p className="text-gray-400 mb-2 whitespace-pre-line">{item.description}</p>
            <p className="text-gray-400 text-sm mb-4">{item.date}</p>
            <h4 className="font-semibold text-white mb-2">Relevant Coursework:</h4>
            <div className="flex flex-wrap gap-2">
              {item.coursework.map((course, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-gray-700/50 text-gray-300 border border-gray-600/80"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="ml-9">
            <ul className="list-disc list-inside text-gray-400">
              {renderDescription(item.description)}
            </ul>
            <p className="text-gray-400 text-sm mt-4">{item.date}</p>
          </div>
        )}
      </div>
    </div>
  );
}
