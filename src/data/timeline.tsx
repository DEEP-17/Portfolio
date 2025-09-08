import { TimelineItem } from "@/types/timeline";
import { FaUniversity, FaSchool, FaBriefcase } from "react-icons/fa";

export const education: TimelineItem[] = [
  {
    id: 1,
    title: "Bachelor of Technology - Computer Science",
    description: "Nirma University, Ahmedabad\nGPA: 8.57/10",
    date: "2022-2026",
    type: 'education',
    icon: <FaUniversity />,
    color: "from-blue-400 to-cyan-500",
    shadowColor: "blue",
  },
  {
    id: 2,
    title: "Class 12",
    description: "Kameshwar Vidhyamandir\nPCM Percentage: 93%",
    date: "2021-2022",
    type: 'education',
    icon: <FaSchool />,
    color: "from-blue-400 to-cyan-500",
    shadowColor: "blue",
  },
  {
    id: 3,
    title: "Class 10",
    description: "Shree Sahajanand Secondary and Higher Secondary School\nPercentage: 91%",
    date: "2019-2020",
    type: 'education',
    icon: <FaSchool />,
    color: "from-blue-400 to-cyan-500",
    shadowColor: "blue",
  },
];

export const experience: TimelineItem[] = [
  {
    id: 1,
    title: "Web Developer Intern - SecureWave Technologies",
    description:
      "• Developed responsive React.js UIs, boosting page load performance by 25%\n" +
      "• Built 12+ RESTful APIs, cutting latency by 30% for 1K+ users\n" +
      "• Designed API testing with 100+ Postman cases, ensuring 99.9% reliability\n" +
      "• Automated CI/CD with Docker + Jenkins, reducing image size 40% and release time 50%\n" +
      "• Deployed 20+ microservices on Kubernetes via Helm, improving scalability 70%\n" +
      "• Set up monitoring with Grafana, Prometheus, and Loki, achieving 99.95% uptime",
    date: "June 2023 - July 2023",
    type: 'work',
    icon: <FaBriefcase />,
    color: "from-purple-400 to-indigo-500",
    shadowColor: "purple",
  },
  {
    id: 2,
    title: "Social Internship - Hamari Pehchan NGO",
    description:
      "• Led social awareness campaigns, leveraging social media to drive engagement and outreach\n" +
      "• Created impactful content highlighting issues like child labor and women empowerment, fostering meaningful interactions and promoting social responsibility",
    date: "August 2023",
    type: 'work',
    icon: <FaBriefcase />,
    color: "from-pink-400 to-rose-500",
    shadowColor: "pink",
  },
];
