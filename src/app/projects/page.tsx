"use client";

import { motion } from "motion/react";
import { SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { SiGithub } from "react-icons/si";
import { PROJECTS } from "@/data/project";
import { FaCode, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/effects/scroll-reveal";
import { TextReveal } from "@/components/effects/text-reveal";

export default function Home() {
  const colorGradients = [
    'from-cyan-400 to-blue-500',
    'from-green-400 to-emerald-500',
    'from-purple-400 to-indigo-500',
    'from-amber-400 to-orange-500',
    'from-violet-400 to-fuchsia-500',
    'from-blue-400 to-sky-500',
  ];

  return (
    <div className="flex flex-col items-center min-h-screen pt-32 pb-20 px-4">
      <motion.div
        className="max-w-7xl w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ScrollReveal variant="fadeUp">
          <TextReveal as="h1" className="text-4xl font-bold mb-16 text-center force-light-black">
            Projects
          </TextReveal>
        </ScrollReveal>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          initial="hidden"
          animate="visible"
        >
          {PROJECTS.map((project, index) => {
            const gradient = colorGradients[index % colorGradients.length];
            const gradientColor = gradient.split(' ')[0].split('-')[1];
            
            return (
              <motion.div
                key={index}
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5 },
                  },
                }}
                className="group relative"
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  className={`
                    relative p-6 rounded-xl h-full
                    bg-gray-600/10 dark:bg-gray-600/20 backdrop-blur-sm
                    group gradient-border glass-card
                    hover:border-${gradientColor}-500/50
                    hover:shadow-lg hover:shadow-${gradientColor}-500/20
                  `}
                >
                  <div 
                    className={`
                      absolute inset-0 rounded-xl opacity-0
                      group-hover:opacity-20 transition-opacity duration-500
                      bg-gradient-to-br ${gradient}
                      blur-xl
                    `}
                  />
                  <div className="relative h-full">
                    <div className="flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className={`
                              p-2 min-w-12 h-12 flex items-center justify-center
                              rounded-lg text-2xl
                              bg-gradient-to-br ${gradient}
                              group-hover:scale-110 transition-transform
                            `}
                          >
                            <FaCode className="w-5 h-5 text-white" />
                          </div>
                          <h3 className={`text-xl font-bold transition-colors group-hover:text-transparent bg-clip-text bg-gradient-to-r ${gradient}`}>
                            {project.title}
                          </h3>
                        </div>
                        <div className="flex gap-2">
                          {project.link && (
                            <Link
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                              aria-label="Live Demo"
                            >
                              <FaExternalLinkAlt className="w-4 h-4 force-light-black" />
                            </Link>
                          )}
                          <Link
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                            aria-label="GitHub Repository"
                          >
                            <FaGithub className="w-4 h-4 force-light-black" />
                          </Link>
                        </div>
                      </div>

                      {project.year && (
                        <p className="text-sm force-light-black mb-4">
                          {project.year}
                        </p>
                      )}

                      <p className="force-light-black mb-4 flex-grow">
                        {project.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tag.map((tag, idx) => (
                          <span
                            key={idx}
                            className={`
                              px-3 py-1 text-xs rounded-full force-light-black
                              backdrop-blur-sm bg-gray-400/10
                              group-hover:border-${gradientColor}-500/30
                              group-hover:!text-${gradientColor}-400
                              dark:group-hover:!text-${gradientColor}-400
                            `}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
