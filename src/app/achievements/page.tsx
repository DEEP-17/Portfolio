"use client";

import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { TextReveal } from "@/components/effects/text-reveal";

export default function AchievementsPage() {
  const [activeSection, setActiveSection] = useState<string>("achievements");
  const [sections, setSections] = useState<HTMLElement[]>([]);

  useEffect(() => {
    console.log('Setting up IntersectionObserver...');
    const sectionElements = Array.from(
      document.querySelectorAll("section")
    ) as HTMLElement[];
    
    console.log('Found sections:', sectionElements);
    setSections(sectionElements);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log('Intersection entry:', entry.target.id, entry.isIntersecting);
          if (entry.isIntersecting) {
            console.log('Setting active section to:', entry.target.id);
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50% 0px'
      }
    );

    sectionElements.forEach((section) => {
      console.log('Observing section:', section.id);
      observer.observe(section);
    });
    
    return () => {
      console.log('Cleaning up observer');
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (index: number) => {
    if (index >= 0 && index < sections.length) {
      sections[index].scrollIntoView({ behavior: "smooth" });
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: "easeOut" as const },
  };
  const achievements = [
    {
      title: "AWS Academy Graduate – Cloud Foundations",
      description: "Completed hands-on labs in EC2, S3, VPC, IAM, Lambda, and RDS.",
    },
    {
      title: "Merit-Based Scholarship",
      description: "Awarded by Nirma University for academic excellence.",
    },
    {
      title: "Scholar's Certificate",
      description: "Received four times for academic excellence and dedication during undergraduate studies.",
    },
  ];

  const colorGradients = [
    'from-cyan-400 to-blue-500',
    'from-green-400 to-emerald-500',
    'from-purple-400 to-indigo-500',
    'from-amber-400 to-orange-500',
    'from-violet-400 to-fuchsia-500',
    'from-blue-400 to-sky-500',
  ];

  const activities = [
    {
      title: "Smart India Hackathon | Group Member",
      description: [
        "Worked as a team to take part in the Smart India Hackathon.",
        "Proposed the idea of Self-identifying the mental health status and get guidance for support."
      ],
    },
    {
      title: "CodeAdda | Member",
      description: [
        "Involved in the club centered around Competitive Programming."
      ],
    },
    {
      title: "Computer Society of India | Member",
      description: [
        "Involved in the club centered around programming and development."
      ],
    },
  ];

  return (
    <MaxWidthWrapper className="pt-32 pb-20 px-4">
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-[9999]">
        <div className="space-y-4">
          {sections.map((section, index) => (
            <motion.div
              key={section.id}
              className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 ${
                activeSection === section.id
                  ? "bg-blue-500 scale-125 shadow-md shadow-blue-500/30"
                  : "bg-gray-300 dark:bg-gray-600 border border-gray-400 dark:border-transparent"
              }`}
              onClick={() => scrollToSection(index)}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </nav>

      <div className="max-w-4xl mx-auto">
        {/* Achievements Section */}
        <section id="achievements" className="mb-16 text-center">
          <ScrollReveal variant="fadeUp">
            <TextReveal as="h2" className="text-2xl font-semibold mb-6">
              Achievements
            </TextReveal>
          </ScrollReveal>
          <div className="space-y-6">
            {achievements.map((achievement, index) => {
              const gradient = colorGradients[index % colorGradients.length];
              const gradientColor = gradient.split(' ')[0].split('-')[1];
              
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className={`
                    relative p-6 rounded-xl
                    bg-gray-600/10 dark:bg-gray-600/20 backdrop-blur-sm
                    group hover:border-${gradientColor}-500/50
                    hover:shadow-lg hover:shadow-${gradientColor}-500/20
                    transition-all duration-300
                    gradient-border glass-card
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
                  <div className="relative">
                    <h3 className={`text-xl font-medium mb-2 group-hover:text-transparent bg-clip-text bg-gradient-to-r ${gradient} transition-colors`}>
                      {achievement.title}
                    </h3>
                    <p className="text-muted-foreground">{achievement.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

      </div>

      <div className="max-w-4xl mx-auto">
        {/* Extracurricular Activities Section */}
        <section id="activities" className="text-center">
          <ScrollReveal variant="fadeUp">
            <TextReveal as="h2" className="text-2xl font-semibold mb-6">
              Extracurricular Activities
            </TextReveal>
          </ScrollReveal>
          <div className="space-y-6">
            {activities.map((activity, index) => {
              const gradient = colorGradients[(index + achievements.length) % colorGradients.length];
              const gradientColor = gradient.split(' ')[0].split('-')[1];
              
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index + achievements.length) * 0.1, duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className={`
                    relative p-6 rounded-xl
                    bg-gray-600/10 dark:bg-gray-600/20 backdrop-blur-sm
                    group hover:border-${gradientColor}-500/50
                    hover:shadow-lg hover:shadow-${gradientColor}-500/20
                    transition-all duration-300
                    gradient-border glass-card
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
                  <div className="relative">
                    <h3 className={`text-xl font-medium mb-3 group-hover:text-transparent bg-clip-text bg-gradient-to-r ${gradient} transition-colors`}>
                      {activity.title}
                    </h3>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                      {activity.description.map((item, i) => (
                        <li key={i}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </MaxWidthWrapper>
  );
}
