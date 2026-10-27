import { BriefcaseBusiness, Camera, Globe } from "lucide-react";
import { FaDiscord } from "react-icons/fa6";

export const emailAddress = "langgdeveloper@gmail.com";

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#work" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" }, 
];

export const projectData = [
  {
    number: "01",
    category: "Class website",
    title: "Website XI RPL class",
    description:
      "A class profile website for XI RPL at SMK PGRI 2 Ponorogo, featuring students, teachers, and class activities.",
    technologies: ["HTML", "CSS", "JS"],
    href: "https://11rplsterida.vercel.app/",
    visual: "class",
    visualLabel: "11 RPL",
    visualNote: "Meet the XI RPL class.",
  },
  {
    number: "02",
    category: "Personal portfolio",
    title: "Personal Portfolio",
    description:
      "A personal portfolio showcasing my education, skills, and completed projects.",
    technologies: ["React"],
    href: "https://gilangfaid.vercel.app/",
    visual: "portfolio",
    visualLabel: "GILANG.",
    visualNote: "Get to know me.",
  },
  {
    number: "03",
    category: "Class app",
    title: "App mobile class XI RPL",
    description:
      "An app for XI RPL at SMK PGRI 2 Ponorogo, made as a keepsake before we go our separate ways for internships.",
    technologies: ["Dart", "Flutter"],
    href: "https://download-landing-page.vercel.app/",
    visual: "mobile",
    visualLabel: "CLASS",
    visualNote: "Memories you can carry.",
  },
  {
    number: "04",
    category: "Gateway website",
    title: "GateWay",
    description: "A gateway website that brings all of my projects together.",
    technologies: ["HTML", "CSS", "JS"],
    href: "https://myportals.vercel.app/",
    visual: "gateway",
    visualLabel: "GATEWAY",
    visualNote: "One place for all my projects.",
  },
  {
    number: "05",
    category: "Web Edukasi",
    title: "EduFuture",
    description: "A Website To Provide Quality Education.",
    technologies: ["React", "CSS", "JS"],
    href: "https://itx-2026-web-dev-coppy-paste-smk-pg.vercel.app/",
    visual: "edufuture",
    visualLabel: "EDUFUTURE",
    visualNote: "One place for all my projects.",
  },
];

export const skillGroups = [
  {
    title: "Frontend",
    items: ["HTML", "CSS", "JavaScript", "React.js", "Tailwind CSS"],
  },
  {
    title: "Design",
    items: ["Figma", "UI Design", "UX Thinking", "Responsive Design"],
  },
  {
    title: "Tools",
    items: ["Git & GitHub", "Vercel", "VS Code", "XAMPP", "Laragon", "Herd"],
  },
];

export const educationData = [
  {
    period: "2025 — present",
    school: "SMK PGRI 2 Ponorogo",
    detail:
      "Vocational high school · Grade 11 Software Engineering, focused on frontend and penetration testing.",
  },
  {
    period: "2022 — 2025",
    school: "MTSN Darul Huda Mayak",
    detail: "Junior high school, with a focus on character and good manners.",
  },
  {
    period: "2016 — 2022",
    school: "MI Ma`arif Mayak",
    detail:
      "Elementary school; active in the computer extracurricular program.",
  },
];

export const skillData = [
  { name: "HTML, CSS", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "JavaScript", level: 90 },
  { name: "React.js", level: 30 },
  { name: "Laravel", level: 50 },
];

export const toolList = [
  "VS Code",
  "Git & GitHub",
  "XAMPP",
  "Laragon",
  "Bootstrap",
  "Laravel Herd",
];

export const missions = [
  "Consistently master the fundamentals of web and mobile development.",
  "Build real-world projects to strengthen my problem-solving skills.",
  "Take part in competitions and certifications to challenge myself.",
  "Keep learning new technologies while supporting my teammates.",
];

export const certificates = [
  {
    number: "01",
    title: "Gamelab Indonesia Industry Visit",
    issuer: "Gamelab Indonesia",
    year: "2025",
    image: "/images/certificates/gamelab.webp",
  },
  {
    number: "02",
    title: "GLOW#321 Participation",
    issuer: "GameLAB Indonesia",
    year: "2025",
    image: "/images/certificates/gamelab2.webp",
  },
  {
    number: "03",
    title: "Dicoding METC Participation",
    issuer: "Dicoding Indonesia",
    year: "2025",
    image: "/images/certificates/dicoding.webp",
  },
];

export const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/cadanganacoout-lab",
    icon: Globe,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gilang-nur-naulida-faid-080233400/",
    icon: BriefcaseBusiness,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/gilanzq_/",
    icon: Camera,
  },
  {
    label: "Discord",
    href: "https://discord.com/users/1456261698766897163",
    icon: FaDiscord,
  },
];
