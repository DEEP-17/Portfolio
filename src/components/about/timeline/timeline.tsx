"use client";

import { TimelineItem as TimelineItemType } from "@/types/timeline";
import { TimelineItem } from "./timeline-item";
import { TimelineProps } from "@/types/timeline";

export function Timeline({ items, sectionTitle }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-700 -translate-x-1/2"></div>
      
      {/* Mobile line */}
      <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gray-700"></div>
      
      <div className="space-y-12">
        {items.map((item, index) => (
          <TimelineItem 
            key={item.id}
            item={item}
            index={index}
            isLast={index === items.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
