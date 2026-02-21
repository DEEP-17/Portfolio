"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useInView, animate } from "framer-motion";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  label: string;
  gradient: string;
}

function Counter({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
  label,
  gradient,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(count, target, {
      duration,
      ease: [0.25, 0.4, 0.25, 1],
      onUpdate(value) {
        if (displayRef.current) {
          displayRef.current.textContent = `${prefix}${Math.round(value)}${suffix}`;
        }
      },
    });

    return controls.stop;
  }, [isInView, target, duration, prefix, suffix, count]);

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-2 p-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <span
        ref={displayRef}
        className={`text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${gradient}`}
      >
        {prefix}0{suffix}
      </span>
      <span className="text-sm text-gray-400 uppercase tracking-wider font-medium">
        {label}
      </span>
    </motion.div>
  );
}

export function AnimatedStats() {
  const stats = [
    {
      target: 10,
      suffix: "+",
      label: "Projects Built",
      gradient: "from-blue-400 to-cyan-400",
    },
    {
      target: 15,
      suffix: "+",
      label: "Technologies",
      gradient: "from-purple-400 to-indigo-400",
    },
    {
      target: 2,
      suffix: "+",
      label: "Years Experience",
      gradient: "from-cyan-400 to-teal-400",
    },
    {
      target: 3,
      suffix: "",
      label: "Achievements",
      gradient: "from-amber-400 to-orange-400",
    },
  ];

  return (
    <motion.div
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {stats.map((stat, index) => (
        <Counter key={index} {...stat} />
      ))}
    </motion.div>
  );
}
