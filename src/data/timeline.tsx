import { TimelineItem } from "@/types/timeline";
import { FaUniversity, FaSchool, FaBriefcase } from "react-icons/fa";

export const education: TimelineItem[] = [
  {
    id: 1,
    title: "Bachelor of Technology - Computer Science",
    description: "Nirma University, Ahmedabad\nGPA: 8.57/10",
    date: "2022-2026",
    icon: <FaUniversity />,
    color: "from-blue-400 to-sky-500",
    shadowColor: "blue",
  },
  {
    id: 2,
    title: "Class 12",
    description: "Kameshwar Vidhyamandir\nPCM Percentage: 93%",
    date: "2021-2022",
    icon: <FaSchool />,
    color: "from-green-400 to-emerald-500",
    shadowColor: "green",
  },
  {
    id: 3,
    title: "Class 10",
    description: "Shree Sahajanand Secondary and Higher Secondary School\nPercentage: 91%",
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
      "SecureWave Technologies. Developed responsive UIs with React.js, improving load performance by 25%. Constructed 12+ RESTful API endpoints, resulting in a 30% reduction in latency for over 1,000 users. Executed 100+ Postman test cases, achieving 99.9% API reliability. Implemented multi-stage Docker builds with Jenkins pipelines, reducing image size by 40% and shortening release cycles by 50%. Managed 20+ microservices on Kubernetes utilizing Helm charts, enhancing scalability by 70%. Monitored system health with Grafana, leveraging Prometheus for metrics and Loki for logs, achieving 99.95% uptime.",
    date: "June 2023 - July 2023",
    icon: <FaBriefcase />,
    color: "from-purple-400 to-indigo-500",
    shadowColor: "purple",
  },
  {
    id: 2,
    title: "Social Internship",
    description:
      "Hamari Pehchan Weller. Oversaw social awareness campaigns at the NGO Hamari Pehchan using social media to connect and interact with a wide range of people. Curated powerful content that brought attention to social issues resulting in meaningful interactions and promoting a proactive socially responsible culture. Dealt with social issues such as Child labor and Women empowerment.",
    date: "August 2023",
    icon: <FaBriefcase />,
    color: "from-pink-400 to-rose-500",
    shadowColor: "pink",
  },
];
