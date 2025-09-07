import { TimelineItem } from "@/types/timeline";
import { FaUniversity, FaSchool, FaBriefcase } from "react-icons/fa";

export const education: TimelineItem[] = [
  {
    id: 1,
    title: "Bachelor of Technology - Computer Science",
    description: "Nirma University, Ahmedabad
GPA: 8.57/10",
    date: "2022-2026",
    icon: <FaUniversity />,
    color: "from-blue-400 to-sky-500",
    shadowColor: "blue",
    minor: "Minor in Cyber Security",
    coursework: [
      "Full Stack Development",
      "Data Structures & Algorithms",
      "Operating Systems",
      "Database Management System",
      "Object Oriented Programming",
      "Computer Networks",
    ],
  },
  {
    id: 2,
    title: "Class 12",
    description: "Kameshwar Vidhyamandir
PCM Percentage: 93%",
    date: "2020-2021",
    icon: <FaSchool />,
    color: "from-green-400 to-emerald-500",
    shadowColor: "green",
  },
  {
    id: 3,
    title: "Class 10",
    description: "Shree Sahajanand Secondary and Higher Secondary School
Percentage: 91%",
    date: "2019-2020",
    icon: <FaSchool />,
    color: "from-yellow-400 to-amber-500",
    shadowColor: "yellow",
  },
];

export const experience: TimelineItem[] = [
  {
    id: 1,
    title: "Web Developer Intern",
    description:
      "**SecureWave Technologies**
- Spearheaded the development of responsive and performant user interfaces using **React.js**, resulting in a **25%** improvement in page load times.
- Engineered and deployed over **12 RESTful API endpoints**, which decreased data retrieval latency by **30%** for more than **1,000** active users.
- Authored and executed **100+** comprehensive test cases using **Postman**, ensuring **99.9%** API uptime and reliability.
- Implemented and automated multi-stage **Docker** builds within **Jenkins** CI/CD pipelines, achieving a **40%** reduction in Docker image size and accelerating release cycles by **50%**.
- Managed and orchestrated a cluster of **20+ microservices** on **Kubernetes** using **Helm charts**, which boosted application scalability by **70%**.
- Deployed a robust monitoring stack using **Grafana**, **Prometheus**, and **Loki**, enabling real-time system health tracking and maintaining **99.95%** service uptime.",
    date: "June 2023 - July 2023",
    icon: <FaBriefcase />,
    color: "from-purple-400 to-indigo-500",
    shadowColor: "purple",
  },
  {
    id: 2,
    title: "Social Internship",
    description:
      "**Hamari Pehchan Weller**
- Led social awareness initiatives for the NGO, utilizing social media platforms to engage with a diverse audience.
- Developed and curated compelling content to highlight critical social issues, fostering meaningful community interaction and promoting a culture of social responsibility.
- Focused on advocacy and awareness campaigns for sensitive topics, including **child labor** and **women's empowerment**.",
    date: "August 2023",
    icon: <FaBriefcase />,
    color: "from-pink-400 to-rose-500",
    shadowColor: "pink",
  },
];
