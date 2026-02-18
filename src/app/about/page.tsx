"use client";

import { ContactUs } from "@/components/about/contact";
import { Intro } from "@/components/about/intro";
import { Skills } from "@/components/about/skills";
import { Timeline } from "@/components/about/timeline/timeline";
import MaxWidthWrapper from "@/components/ui/max-width-wrapper";
import { education, experience } from "@/data/timeline";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("introduction");
  const [sections, setSections] = useState<HTMLElement[]>([]);

  useEffect(() => {
    const sectionElements = Array.from(
      document.querySelectorAll("section")
    ) as HTMLElement[];
    setSections(sectionElements);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    sectionElements.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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
    transition: { duration: 0.8, ease: "easeOut" },
  };

  return (
    <MaxWidthWrapper className="px-4">
      <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {["introduction", "education", "experience", "skills", "contact"].map((section, index) => (
            <motion.div
              key={section}
              className={`h-3 w-3 rounded-full cursor-pointer transition-all duration-300 ${
                activeSection === section ? "bg-white scale-125" : "bg-gray-600"
              }`}
              onClick={() => scrollToSection(index)}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </motion.div>
      </nav>

      <section
        className="min-h-screen flex flex-col justify-center max-sm:pt-24 relative pt-32"
        id="introduction"
      >
        <Intro activeSection={activeSection} fadeIn={fadeIn} />
      </section>

      <section className="py-24" id="education">
        <div>
          <h2 className="text-3xl font-bold text-center mb-12 force-light-black-headings">Education</h2>
          <Timeline 
            items={education} 
            sectionTitle="education" 
            activeSection={activeSection} 
            fadeIn={fadeIn} 
          />
        </div>
      </section>

      <section className="py-24" id="experience">
        <div>
          <h2 className="text-3xl font-bold text-center mb-12 force-light-black-headings">
            Work Experience
          </h2>
          <Timeline 
            items={experience} 
            sectionTitle="experience" 
            activeSection={activeSection} 
            fadeIn={fadeIn} 
          />
        </div>
      </section>

      <section
        className="min-h-screen flex flex-col justify-center relative"
        id="skills"
      >
        <Skills activeSection={activeSection} fadeIn={fadeIn} />
      </section>

      <section
        className="min-h-screen flex flex-col justify-center relative"
        id="contact"
      >
        <ContactUs activeSection={activeSection} fadeIn={fadeIn} />
      </section>
    </MaxWidthWrapper>
  );
}
