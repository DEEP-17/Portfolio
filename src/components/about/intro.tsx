import { IoIosArrowForward } from "react-icons/io";
import { FaCode, FaLightbulb, FaMicrochip } from "react-icons/fa6";
import { motion } from "framer-motion";
import { MagicLink } from "../effects/magiclink";

export function Intro({
  activeSection,
  fadeIn,
}: {
  activeSection: string;
  fadeIn: any;
}) {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      {...fadeIn}
      variants={container}
      viewport={{ once: true }}
      initial="hidden"
      animate={activeSection === "introduction" ? "visible" : "hidden"}
      className="max-w-6xl mx-auto relative"
    >
      <motion.h2
        className="text-3xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        About Me
      </motion.h2>

      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={container}
          className="space-y-6"
        >
          {/* First Card */}
          <motion.div
            variants={item}
            className="relative p-6 rounded-xl bg-gray-600/10 dark:bg-gray-600/20 backdrop-blur-sm hover:border-blue-500/50 group hover:shadow-lg hover:shadow-blue-500/20"
          >
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-blue-400 to-cyan-500 blur-xl" />
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="text-2xl text-blue-400 group-hover:opacity-100 transition-all duration-300 mr-3">
                  <FaCode />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Introduction
                </h3>
              </div>
              <div className="ml-9">
                <p className="text-gray-400">
                  Hey, I'm Deep! I'm a 3rd-year Computer Science B.Tech student at{' '}
                  <MagicLink href="https://nirmauni.ac.in/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-cyan-300 transition-colors">
                    Nirma University
                  </MagicLink>{' '}
                  with a minor in Cyber Physical Systems. I'm passionate about
                  creating innovative solutions that make a difference.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Second Card */}
          <motion.div
            variants={item}
            className="relative p-6 rounded-xl bg-gray-600/10 dark:bg-gray-600/20 backdrop-blur-sm hover:border-purple-500/50 group hover:shadow-lg hover:shadow-purple-500/20"
          >
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-purple-400 to-indigo-500 blur-xl" />
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="text-2xl text-purple-400 group-hover:opacity-100 transition-all duration-300 mr-3">
                  <FaMicrochip />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Skills & Interests
                </h3>
              </div>
              <div className="ml-9">
                <p className="text-gray-400">
                  Besides software development, I enjoy designing PCB circuits and
                  modeling larger systems. Check out my projects{' '}
                  <MagicLink href="https://www.youtube.com/@yuvrajsinh472/videos" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-indigo-300 transition-colors">
                    @Deep
                  </MagicLink>
                  . I love blending software and hardware to bring ideas to life.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Third Card */}
          <motion.div
            variants={item}
            className="relative p-6 rounded-xl bg-gray-600/10 dark:bg-gray-600/20 backdrop-blur-sm hover:border-cyan-500/50 group hover:shadow-lg hover:shadow-cyan-500/20"
          >
            <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-cyan-400 to-teal-500 blur-xl" />
            <div className="relative">
              <div className="flex items-center mb-4">
                <div className="text-2xl text-cyan-400 group-hover:opacity-100 transition-all duration-300 mr-3">
                  <FaLightbulb />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Philosophy & Approach
                </h3>
              </div>
              <div className="ml-9">
                <p className="text-gray-400">
                  In my free time, I participate in hackathons, enhance my coding
                  skills, and stay updated with industry trends. I believe in
                  lifelong learning and embracing new challenges.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
