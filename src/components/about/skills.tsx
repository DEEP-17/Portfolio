import { motion } from "motion/react";
import { MonitorCog } from "lucide-react";
import {
  FaCode,
  FaTerminal,
  FaLightbulb,
  FaDatabase,
  FaCloud,
  FaMobile,
} from "react-icons/fa";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  viewport: { once: true },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export function Skills({
  activeSection,
  fadeIn,
}: {
  activeSection: string;
  fadeIn: any;
}) {
  const skills = [
    {
      icon: <FaTerminal />,
      title: "Programming Languages",
      tags: ["C++", "Java", "Python", "JavaScript", "Bash", "SQL"],
      color: "from-purple-400 to-indigo-500",
      shadowColor: "purple",
    },
    {
      icon: <FaCode />,
      title: "Web Development & Frameworks",
      tags: ["React", "Node.js", "Tailwind CSS", "Bootstrap", "MongoDB"],
      color: "from-cyan-400 to-blue-500",
      shadowColor: "cyan",
    },
    {
      icon: <FaDatabase />,
      title: "Data Streaming & Messaging",
      tags: ["Kafka", "SQL Plus"],
      color: "from-green-400 to-emerald-500",
      shadowColor: "green",
    },
    {
      icon: <FaLightbulb />,
      title: "DevOps & CI/CD",
      tags: ["Docker", "Kubernetes", "Jenkins", "GitHub Actions", "GitLab CI/CD"],
      color: "from-amber-400 to-orange-500",
      shadowColor: "amber",
    },
    {
      icon: <FaCloud />,
      title: "Cloud & Monitoring",
      tags: ["AWS", "Grafana", "Prometheus", "Loki"],
      color: "from-blue-400 to-cyan-500",
      shadowColor: "blue",
    },
    {
      icon: <MonitorCog />,
      title: "Networking & Tools",
      tags: ["Wireshark", "Visual Studio Code", "IntelliJ IDEA", "Kali Linux"],
      color: "from-rose-400 to-pink-500",
      shadowColor: "rose",
    },
  ];

  return (
    <motion.div
      {...fadeIn}
      initial="hidden"
      animate={activeSection === "skills" ? "visible" : "hidden"}
      className="max-w-7xl py-16"
    >
      <motion.h2
        {...fadeInUp}
        className="text-4xl font-bold text-center mb-16 tracking-tight"
      >
        Technical Proficiencies
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -5 }}
            className={`
              relative p-4 rounded-xl h-auto min-h-[180px]
              bg-gray-600/10 dark:bg-gray-600/20 backdrop-blur-sm
              hover:border-${skill.shadowColor}-500/50
              group hover:shadow-lg hover:shadow-${skill.shadowColor}-500/20
              min-w-0 flex flex-col justify-between
            `}
          >
            <div
              className={`
              absolute inset-0 rounded-xl opacity-0
              group-hover:opacity-20 transition-opacity duration-500
              bg-gradient-to-r ${skill.color}
              blur-xl
            `}
            />

            <div className="relative flex flex-col gap-3">
              <div className="flex justify-between items-center mb-3">
                <h3
                  className={`
                  text-xl font-semibold
                  bg-gradient-to-r ${skill.color}
                  bg-clip-text text-transparent
                `}
                >
                  {skill.title}
                </h3>
                <div
                  className={`
                min-w-12 h-12 flex items-center justify-center
                rounded-lg text-2xl -mt-1
                bg-gradient-to-r ${skill.color}
                group-hover:scale-110 transition-transform
              `}
                >
                  {skill.icon}
                </div>
              </div>
              <div>
                <div className="flex flex-wrap gap-1.5">
                  {skill.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`
                        px-2.5 py-0.5 text-xs rounded-full
                        backdrop-blur-sm bg-gray-400/10
                        group-hover:border-${skill.shadowColor}-500/30
                        group-hover:text-${skill.shadowColor}-400
                      `}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
