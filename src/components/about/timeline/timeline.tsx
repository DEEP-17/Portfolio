"use client";

import { TimelineItem as TimelineItemType } from "@/types/timeline";
import { TimelineItem } from "./timeline-item";
import { TimelineProps } from "@/types/timeline";
import { motion } from "framer-motion";

export function Timeline({ items, sectionTitle, activeSection, fadeIn }: TimelineProps & { activeSection: string; fadeIn: any }) {
  // Animation variants for the container
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      {...fadeIn}
      variants={container}
      initial="hidden"
      animate={activeSection === sectionTitle.toLowerCase() ? "visible" : "hidden"}
      className="relative"
    >
      {/* Vertical line */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-700 -translate-x-1/2"></div>
      
      {/* Mobile line */}
      <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gray-700"></div>
      
      <motion.div className="space-y-12">
        {items.map((item, index) => (
          <TimelineItem 
            key={item.id}
            item={item}
            index={index}
            isLast={index === items.length - 1}
            activeSection={activeSection}
            sectionId={sectionTitle.toLowerCase()}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
