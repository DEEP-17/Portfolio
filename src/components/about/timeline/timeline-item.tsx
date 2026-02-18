"use client";

import { TimelineItem as TimelineItemType } from "@/types/timeline";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect } from "react";

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  // Animation variants for desktop
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: isEven ? -50 : 50, 
      y: 20,
      scale: 0.98
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        damping: 15,
        stiffness: 100,
        delay: i * 0.1
      }
    }),
    exit: { 
      opacity: 0, 
      y: 20,
      scale: 0.98,
      transition: { duration: 0.2 }
    }
  };

  // Animation variants for mobile
  const mobileCardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.98 
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        damping: 15,
        stiffness: 100,
        delay: i * 0.1
      }
    }),
    exit: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div 
      ref={ref}
      className="relative w-full"
      initial="hidden"
      animate={isInView && isActive ? "visible" : "hidden"}
      variants={cardVariants}
      custom={index}
      whileHover={{ y: -5 }}
    >
      {/* Desktop View */}
      <div className="hidden md:flex w-full">
        {/* Left Side (Even Index) */}
        {isEven ? (
          <div className="w-1/2 pr-8 flex justify-end">
            <div className="w-full max-w-2xl">
              <TimelineCard item={item} isActive={isInView && isActive} index={index} />
            </div>
          </div>
        ) : (
          <div className="w-1/2"></div>
        )}

        {/* Center Line & Dot */}
        <div className="flex flex-col items-center w-12 flex-shrink-0">
          <motion.div 
            className="w-4 h-4 rounded-full bg-blue-500 border-4 border-gray-900 z-10"
            animate={isInView && isActive ? { 
              scale: [1, 1.2, 1],
              transition: { 
                duration: 0.5,
                delay: index * 0.1 
              }
            } : {}}
          ></motion.div>
          {!isLast && <div className="w-0.5 h-full bg-gray-700"></div>}
        </div>

        {/* Right Side (Odd Index) */}
        {!isEven ? (
          <div className="w-1/2 pl-8">
            <div className="w-full max-w-2xl">
              <TimelineCard item={item} isActive={isInView && isActive} index={index} />
            </div>
          </div>
        ) : (
          <div className="w-1/2"></div>
        )}
      </div>

      {/* Mobile View */}
      <div className="md:hidden flex w-full">
        {/* Line & Dot */}
        <div className="flex flex-col items-center w-12 flex-shrink-0">
          <motion.div 
            className="w-4 h-4 rounded-full bg-blue-500 border-4 border-gray-900 z-10"
            animate={isInView && isActive ? { 
              scale: [1, 1.2, 1],
              transition: { 
                duration: 0.5,
                delay: index * 0.1 
              }
            } : {}}
          ></motion.div>
          {!isLast && <div className="w-0.5 h-full bg-gray-700"></div>}
        </div>

        {/* Content */}
        <div className="pl-6 w-full">
          <motion.div
            className="w-full"
            variants={mobileCardVariants}
            custom={index}
          >
            <TimelineCard item={item} isActive={isInView && isActive} index={index} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Separate component for the card to avoid code duplication
function TimelineCard({ item, isActive, index }: { item: TimelineItemType; isActive: boolean; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.1 });
  
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring",
        damping: 15,
        stiffness: 100,
        delay: i * 0.1
      }
    })
  };
  // Determine color scheme based on item type
  const getColorScheme = (type: string) => {
    switch(type.toLowerCase()) {
      case 'education':
        return {
          gradient: 'from-blue-400 to-cyan-500',
          shadow: 'blue',
          text: 'text-blue-400',
          hoverText: 'hover:text-cyan-300',
          border: 'hover:border-blue-500/50',
          shadowColor: 'shadow-blue-500/20'
        };
      case 'work':
        return {
          gradient: 'from-purple-400 to-indigo-500',
          shadow: 'purple',
          text: 'text-purple-400',
          hoverText: 'hover:text-indigo-300',
          border: 'hover:border-purple-500/50',
          shadowColor: 'shadow-purple-500/20'
        };
      default:
        return {
          gradient: 'from-gray-400 to-gray-500',
          shadow: 'gray',
          text: 'text-gray-400',
          hoverText: 'hover:text-gray-300',
          border: 'hover:border-gray-500/50',
          shadowColor: 'shadow-gray-500/20'
        };
    }
  };

  const colors = getColorScheme(item.type || '');
  const renderDescription = (description: string) => {
    const lines = description.split("\n");
    return (
      <div className="space-y-3">
        {lines.map((line, index) => {
          if (line.startsWith("-")) {
            const parts = line.substring(1).split("**");
            return (
              <div key={index} className="flex items-start">
                <span className="text-blue-400 mr-2 mt-1">•</span>
                <span className="text-muted-foreground">
                  {parts.map((part, i) =>
                    i % 2 === 1 ? (
                      <strong key={i} className="text-foreground font-semibold">
                        {part}
                      </strong>
                    ) : (
                      part
                    )
                  )}
                </span>
              </div>
            );
          }
          
          const parts = line.split("**");
          return (
            <p key={index} className="text-muted-foreground leading-relaxed">
              {parts.map((part, i) =>
                i % 2 === 1 ? (
                  <span key={i} className="text-foreground font-medium">
                    {part}
                  </span>
                ) : (
                  part
                )
              )}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <motion.div
      ref={cardRef}
      className={`
        relative p-6 rounded-xl
        bg-gray-600/10 dark:bg-gray-600/20 backdrop-blur-sm
        ${colors.border}
        group
        hover:shadow-lg ${colors.shadowColor}
      `}
      initial="hidden"
      animate={isInView && isActive ? "visible" : "hidden"}
      variants={cardVariants}
      custom={index % 3}
      whileHover={{ y: -5 }}
    >
      <div
        className={`
          absolute inset-0 rounded-xl opacity-0
          group-hover:opacity-20 transition-opacity duration-500
          bg-gradient-to-r ${colors.gradient}
          blur-xl
        `}
      />
      <div className="relative">
        <div className="flex items-start mb-4">
          {item.icon && (
            <div className={`
              text-2xl ${colors.text} 
              group-hover:scale-110 transition-all duration-300
              mr-4 mt-1 flex-shrink-0
            `}>
              {item.icon}
            </div>
          )}
          <div>
            <h3 className="text-xl font-bold leading-tight mb-1">
              {item.url ? (
                <Link 
                  href={item.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group-hover:text-transparent bg-clip-text bg-gradient-to-r ${colors.gradient} transition-colors hover:opacity-90`}
                >
                  {item.title}
                </Link>
              ) : (
                <span className={`group-hover:text-transparent bg-clip-text bg-gradient-to-r ${colors.gradient} transition-colors`}>
                  {item.title}
                </span>
              )}
            </h3>
            {item.minor && (
              <p className={`${colors.text} text-sm font-medium opacity-90`}>{item.minor}</p>
            )}
          </div>
        </div>

        {item.coursework ? (
          <div className="ml-9">
            <div className="mb-4 space-y-3">
              {renderDescription(item.description)}
            </div>
            <p className="text-sm text-muted-foreground font-medium">{item.date}</p>
            <h4 className="font-semibold text-foreground mb-2">Relevant Coursework:</h4>
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
            <ul className="list-disc list-inside text-muted-foreground">
              {renderDescription(item.description)}
            </ul>
            <p className="text-muted-foreground text-sm mt-4">{item.date}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
