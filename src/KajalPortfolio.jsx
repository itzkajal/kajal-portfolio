import { useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const SKILLS = {
  "Cloud & Platforms": [
    "AWS (EC2, S3, IAM)",
    "Microsoft Azure",
    "Oracle Cloud (OCI)",
    "Kubernetes",
    "Docker",
    "Linux Administration",
    "Cloud Native",
    "Nginx",
  ],
  "CI/CD & IaC": [
    "GitHub Actions",
    "Jenkins",
    "Terraform",
    "CloudFormation",
    "Infrastructure as Code",
    "CI/CD",
    "Cloud Automation",
    "Infrastructure Automation",
  ],
  "Languages & Backend": [
    "Go",
    "Node.js",
    "Express.js",
    "JavaScript",
    "Java",
    "Python",
    "Bash Scripting",
    "REST APIs",
    "JSON",
  ],
  "Observability & SRE": [
    "Prometheus",
    "Grafana",
    "SRE",
    "Monitoring & Logging",
    "Observability",
  ],
  "Databases & Tools": [
    "MongoDB",
    "SQL",
    "Git",
    "GitHub",
    "Postman",
    "Vercel",
  ],
};

const METRICS = [
  {
    value: "60%",
    label: "Reliability Improvement",
    accent: "cyan",
    sub: "Blue-Green Deployment",
  },
  {
    value: "50–60%",
    label: "Manual Effort Reduced",
    accent: "indigo",
    sub: "CI/CD Automation",
  },
  {
    value: "40–50%",
    label: "Downtime Reduction",
    accent: "emerald",
    sub: "Streaming Platform",
  },
  {
    value: "Real-time",
    label: "Self-Healing",
    accent: "orange",
    sub: "K8s Auto-Recovery",
  },
];

const PROJECTS = [
  {
    title: "Self-Healing Kubernetes Platform",
    desc:
      "Continuously monitors Kubernetes workloads with a custom Go-based monitoring service. Detects CrashLoopBackOff containers in real-time, auto-removes failed pods, triggers Kubernetes self-recovery, and sends incident notifications via Discord webhooks. Visualizes cluster health with Grafana + Prometheus.",
    stack: [
      "Go",
      "Kubernetes",
      "Docker",
      "Prometheus",
      "Grafana",
      "GitHub Actions",
      "Discord Webhooks",
      "SRE",
    ],
    link: "https://github.com/itzkajal/go-kube-self-healer",
    accent: "cyan",
    badge: "SRE · Observability",
  },
  {
    title: "Zero-Downtime Blue-Green Deployment",
    desc:
      "Designed a Blue-Green deployment strategy achieving ~60% reliability improvement. Built automated CI/CD pipeline using Jenkins with Docker containerization for consistent environments. Nginx handles live traffic switching between Blue and Green. Terraform provisions infra as code.",
    stack: ["Jenkins", "Docker", "Nginx", "Terraform", "CI/CD", "IaC"],
    link: "https://github.com/itzkajal/zero-downtime-blue-green-deployment",
    accent: "indigo",
    badge: "Zero Downtime · IaC",
  },
  {
    title: "R Streaming – Marathi Video Platform",
    desc:
      "High-availability video streaming platform focused on optimized content delivery. Containerized with Docker, CI/CD-style deployment workflow simulating production-grade environments. Achieved ~40–50% downtime reduction via optimized deployment strategy.",
    stack: ["Docker", "CI/CD", "Video Streaming", "High Availability", "DevOps"],
    link: null,
    accent: "emerald",
    badge: "High Availability",
  },
  {
    title: "Samaan Saathi – Vendor Web Platform",
    desc:
      "Backend services and REST APIs using Node.js and Express.js. MongoDB for structured data management with scalable architecture. Deployed on Vercel for production-ready, highly available hosting with optimized performance.",
    stack: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Vercel"],
    link: "https://saaman-sathi.vercel.app/",
    accent: "orange",
    badge: "Full Stack · Live",
  },
  {
  title: "Intelligent Chatbot using Django",
  desc: "Built an NLP-powered chatbot using Django that answers user queries through TF-IDF vectorization and cosine similarity algorithms. Designed a clean user interface and implemented intelligent text matching to provide relevant responses in real time.",
  stack: [
    "Django",
    "Python",
    "NLP",
    "TF-IDF",
    "Cosine Similarity",
    "HTML",
    "CSS"
  ],
  link: "https://www.linkedin.com/posts/kajal-jawale-926781298_nlp-django-chatbot-activity-7221516995660238848-3emU?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEgEZ-4BjyMm2842R93HVKCBe0oj78WwBq8",
  accent: "cyan",
  badge: "AI · NLP",
  },
  {
  title: "Key Finder Application",
  desc: "Developed an end-to-end IoT and cloud-native tracking system powered by ESP32, GPS, GSM, Supabase, and Kotlin Android. The platform enables real-time location tracking, device monitoring, push notifications, email alerts, and historical telemetry visualization using Google Maps integration.",
  stack: [
    "ESP32",
    "C++",
    "Kotlin",
    "Android",
    "Supabase",
    "PostgreSQL",
    "Google Maps API",
    "Firebase",
    "FCM",
    "IoT"
  ],
  link: "https://github.com/itzkajal/Key-Finder-Application",
  accent: "orange",
  badge: "IoT · Cloud Native",
  },
];

const CERTS = [
  {
    title: "Oracle Cloud Infrastructure 2025 Foundations Associate",
    issuer: "Oracle University",
    id: "1034524080C125FNDCFA",
    file: "/certificates/oracle cloud infrastructure certificate.pdf",
    accent: "orange",
  },
  {
    title: "AWS Cloud Practitioner Essentials",
    issuer: "AWS Training & Certification",
    date: "Apr 24, 2026",
    file: "/certificates/aws cloud practitioner certficate.pdf",
    accent: "orange",
  },
  {
    title: "Advanced Testing Practices Using AWS DevOps Tools",
    issuer: "AWS Training & Certification",
    date: "Apr 24, 2026",
    file: "/certificates/aws testing practices and devops tools certificate.pdf",
    accent: "orange",
  },
  {
    title: "AWS CloudFormation Getting Started",
    issuer: "AWS Training & Certification",
    date: "Apr 24, 2026",
    file: "/certificates/aws cloud formation getting started certificate.pdf",
    accent: "orange",
  },
  {
    title: "Getting Started with DevOps on AWS",
    issuer: "AWS Training & Certification",
    date: "Apr 24, 2026",
    file: "/certificates/getting started with devops certificate.pdf",
    accent: "orange",
  },
  {
    title: "AZ-900: Microsoft Azure Fundamentals Exam Preparation",
    issuer: "Infosys Springboard",
    date: "Jun 6, 2026",
    file: "/certificates/microsoft azure administrator.jpg",
    verify: "https://verify.onwingspan.com",
    accent: "cyan",
  },
  {
    title: "Cloud Technologies Course Completion",
    issuer: "Infosys Springboard",
    date: "May 7, 2026",
    file: "/certificates/infosys cloud certification.pdf",
    verify: "https://verify.onwingspan.com",
    accent: "cyan",
  },
  {
    title: "Getting Started with Jenkins",
    issuer: "Simplilearn Skillup",
    id: "10164724",
    date: "Apr 29, 2026",
    file: "/certificates/jenkins certificate.pdf",
    accent: "indigo",
  },
  {
    title: "Introduction to Linux (LFS101)",
    issuer: "The Linux Foundation",
    id: "LF-r1pye229f4",
    date: "Apr 27, 2026",
    file: "/certificates/linux certificate.pdf",
    accent: "emerald",
  },
];

const EXPERIENCE = [
  {
    role: "SDE Intern",
    company: "Nirvaa Solutions Pvt. Ltd",
    location: "Pune",
    period: "Current",
    points: [
      "Developing and maintaining web application features using modern JavaScript technologies and backend development practices.",
      "Building and integrating REST APIs, handling data processing workflows, and collaborating on scalable application architecture.",
      "Working with Git-based development workflows, debugging production issues, and contributing to deployment and release activities.",
    ],
  },

  {
    role: "Cloud & DevOps Engineer Intern",
    company: "Adhigama Tech",
    location: "Jalgaon",
    period: "Jan 2025 – Dec 2025",
    points: [
      "Designed CI/CD pipelines using GitHub Actions with automated build, testing, and deployment workflows, reducing manual effort by approximately 50–60%.",
      "Containerized applications using Docker and deployed workloads on Kubernetes for scalable and reliable delivery.",
      "Automated release processes and infrastructure provisioning, reducing deployment time from hours to minutes while improving reliability.",
    ],
  },

  {
    role: "Prompt Engineer Intern",
    company: "Axeron Infotech",
    location: "Remote",
    period: "Jul 2024 – Aug 2024",
    points: [
      "Designed and optimized AI prompts for various business and productivity use cases, improving response quality and consistency.",
      "Conducted prompt testing, evaluation, and refinement to enhance accuracy and user experience across AI-powered applications.",
      "Worked closely with development teams to integrate prompt-engineering techniques into real-world workflows and automation solutions.",
    ],
  },

  {
    role: "Mobile Application Development Intern",
    company: "Elewayte",
    location: "Remote",
    period: "Jan 2024 – Feb 2024",
    points: [
      "Developed and tested Android application features using modern mobile development practices.",
      "Worked on UI implementation, API integration, and performance optimization to improve user experience.",
      "Collaborated on application debugging, feature enhancements, and deployment preparation within an Agile development environment.",
    ],
  },

  {
    role: "Software Developer Intern",
    company: "DigitalEdu IT Solutions",
    location: "Pune",
    period: "Jul 2022 – Aug 2022",
    points: [
      "Contributed to software development activities within an Agile environment while following structured development workflows.",
      "Utilized Git for version control and collaboration, working with JSON data formats and API integrations.",
      "Supported application development, testing, and deployment processes while gaining practical software engineering experience.",
    ],
  },
];

const EDUCATION = [
  {
    degree: "B-Tech in Computer Engineering",
    school: "Khandesh College of Engineering",
    location: "Jalgaon",
    period: "2023 – 2026",
  },
  {
    degree: "Diploma in IT Engineering",
    school: "Government Polytechnic",
    location: "Jalgaon",
    period: "2020 – 2023",
    score: "80.44%",
  },
  {
    degree: "SSC",
    school: "Shree Swaminarayan Gurukul Sanstha Savda",
    location: "Maharashtra",
    period: "2019 – 2020",
    score: "91%",
  },
];

// ─── ACCENT HELPERS ──────────────────────────────────────────────────────────

const A = {
  cyan: {
    border: "border-cyan-500/40",
    hoverBorder: "hover:border-cyan-400/70",
    text: "text-cyan-400",
    bg: "bg-cyan-500/10",
    glow: "hover:shadow-cyan-500/10",
    badge: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30",
    dot: "bg-cyan-400",
    periodBg: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
  },
  indigo: {
    border: "border-indigo-500/40",
    hoverBorder: "hover:border-indigo-400/70",
    text: "text-indigo-400",
    bg: "bg-indigo-500/10",
    glow: "hover:shadow-indigo-500/10",
    badge: "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30",
    dot: "bg-indigo-400",
    periodBg: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400",
  },
  emerald: {
    border: "border-emerald-500/40",
    hoverBorder: "hover:border-emerald-400/70",
    text: "text-emerald-400",
    bg: "bg-emerald-500/10",
    glow: "hover:shadow-emerald-500/10",
    badge: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
    dot: "bg-emerald-400",
    periodBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
  },
  orange: {
    border: "border-orange-500/40",
    hoverBorder: "hover:border-orange-400/70",
    text: "text-orange-400",
    bg: "bg-orange-500/10",
    glow: "hover:shadow-orange-500/10",
    badge: "bg-orange-500/15 text-orange-300 border border-orange-500/30",
    dot: "bg-orange-400",
    periodBg: "bg-orange-500/10 border-orange-500/20 text-orange-400",
  },
};

// ─── ICONS ───────────────────────────────────────────────────────────────────

const IconMail = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);
const IconPhone = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);
const IconPin = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);
const IconGitHub = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const IconLinkedIn = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const IconExternal = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);
const IconArrow = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);
const IconBadge = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);
const IconDownload = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z" />
  </svg>
);
const IconCopy = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);
const IconCheck = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);
const IconChevron = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

// ─── SHARED COMPONENTS ───────────────────────────────────────────────────────

function SectionLabel({ label }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="text-xs font-mono text-slate-500 tracking-widest">{label}</span>
      <span className="flex-1 h-px bg-slate-800" />
    </div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["Skills", "Experience", "Projects", "Certifications", "Education"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/95 backdrop-blur-md border-b border-slate-800/70 shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <span className="font-mono text-sm font-medium text-cyan-400 tracking-wider">
          kj<span className="text-slate-600">/</span>
        </span>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="px-3 py-1.5 text-xs font-mono text-slate-500 hover:text-slate-200 transition-colors rounded-md hover:bg-slate-800/50"
            >
              {l}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="mailto:kjawale2004@gmail.com"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Contact <span className="text-slate-600">→</span>
          </a>
          {/* Mobile menu btn */}
          <button
            className="sm:hidden text-slate-400 hover:text-white p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="sm:hidden bg-slate-950/98 border-t border-slate-800 px-6 py-4 space-y-1">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 text-sm font-mono text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
            >
              {l}
            </a>
          ))}
          <a
            href="mailto:kjawale2004@gmail.com"
            className="block px-3 py-2 text-sm font-mono text-cyan-400 hover:bg-slate-800 rounded-md transition-colors"
          >
            kjawale2004@gmail.com
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── TERMINAL HERO ───────────────────────────────────────────────────────────

const TERMINAL_LINES = [
  { type: "cmd",  content: "whoami",                                              delay: 300  },
  { type: "out",  content: "kajal.jawale  //  Cloud & DevOps Engineer",           delay: 900  },
  { type: "cmd",  content: "kubectl get pods --namespace=career",                 delay: 1500 },
  { type: "out",  content: "ci-cd-automation    Running ✓   50–60% effort ↓",    delay: 2100 },
  { type: "out",  content: "k8s-self-healer     Running ✓   Real-time healing",   delay: 2500 },
  { type: "out",  content: "blue-green-deploy   Running ✓   60% reliability ↑",  delay: 2900 },
  { type: "cmd",  content: "cat tech-stack.txt",                                  delay: 3500 },
  { type: "out",  content: "AWS · Azure · OCI · Docker · Kubernetes · Terraform · Go · GitHub Actions", delay: 4100 },
];

function TerminalHero() {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= TERMINAL_LINES.length) return;
    const t = setTimeout(
      () => setShown((s) => s + 1),
      shown === 0 ? TERMINAL_LINES[0].delay : TERMINAL_LINES[shown].delay - TERMINAL_LINES[shown - 1].delay
    );
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 lg:px-16 pt-24 pb-16">
      <div className="max-w-5xl mx-auto w-full">

        {/* Terminal Window */}
        <div className="rounded-xl border border-slate-700/60 bg-slate-900/80 backdrop-blur-sm shadow-2xl shadow-black/50 overflow-hidden mb-12">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/80 border-b border-slate-700/50">
            <span className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer" />
            <span className="ml-4 text-xs text-slate-500 font-mono">kajal@devops-engineer: ~</span>
          </div>
          {/* Terminal body */}
          <div className="p-5 sm:p-6 font-mono text-sm space-y-1.5 min-h-[200px]">
            {TERMINAL_LINES.slice(0, shown).map((line, i) =>
              line.type === "cmd" ? (
                <div key={i} className="flex gap-2 leading-relaxed">
                  <span className="text-cyan-400 select-none shrink-0">~ $</span>
                  <span className="text-slate-200">{line.content}</span>
                </div>
              ) : (
                <div key={i} className="leading-relaxed pl-6 text-slate-400">
                  {line.content}
                </div>
              )
            )}
            {shown < TERMINAL_LINES.length && (
              <div className="flex gap-2 items-center">
                <span className="text-cyan-400 select-none">~ $</span>
                <span className="inline-block w-2 h-[18px] bg-cyan-400 cursor-blink" />
              </div>
            )}
          </div>
        </div>

        {/* Name + Headline */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-cyan-500/80 tracking-widest uppercase">
              // cloud & devops engineer
            </span>
            <span className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent" />
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[0.9] mb-6">
            Kajal
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500">
              Jawale
            </span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl leading-relaxed">
            Cloud & DevOps Engineer and Software Developer with experience in cloud infrastructure, 
            CI/CD automation, backend development, containerization, and scalable application deployment. 
            Building automated, scalable, and production-ready systems with a focus on{" "}
            <span className="text-cyan-400 font-medium">reliability</span>,{" "}
            <span className="text-indigo-400 font-medium">observability</span>, and{" "}
            <span className="text-emerald-400 font-medium">performance optimization</span>.
          </p>
        </div>

        {/* CTA / Contact row */}
        <div className="flex flex-wrap gap-3">
          <a
            href="mailto:kjawale2004@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 text-sm font-medium hover:bg-cyan-500/25 hover:border-cyan-400/70 transition-all duration-200"
          >
            <IconMail /> kjawale2004@gmail.com
          </a>
          <a
            href="https://github.com/itzkajal"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium hover:border-slate-500 hover:text-white transition-all duration-200"
          >
            <IconGitHub /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/kajal-jawale-926781298/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium hover:border-blue-500/50 hover:text-blue-300 transition-all duration-200"
          >
            <IconLinkedIn /> LinkedIn
          </a>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800/60 border border-slate-800 text-slate-500 text-sm select-none">
            <IconPin /> Pune, India
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── METRICS ─────────────────────────────────────────────────────────────────

function MetricBadges() {
  const styles = {
    cyan:    "border-cyan-500/30    bg-cyan-500/5    shadow-cyan-500/10    text-cyan-300",
    indigo:  "border-indigo-500/30  bg-indigo-500/5  shadow-indigo-500/10  text-indigo-300",
    emerald: "border-emerald-500/30 bg-emerald-500/5 shadow-emerald-500/10 text-emerald-300",
    orange:  "border-orange-500/30  bg-orange-500/5  shadow-orange-500/10  text-orange-300",
  };

  return (
    <section className="px-6 lg:px-16 py-16">
      <div className="max-w-5xl mx-auto">
        <SectionLabel label="// impact metrics" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className={`rounded-xl border p-5 sm:p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${styles[m.accent]}`}
            >
              <div className="text-3xl sm:text-4xl font-bold font-mono mb-1.5 leading-none">
                {m.value}
              </div>
              <div className="text-sm font-semibold text-slate-200 mb-1">{m.label}</div>
              <div className="text-xs text-slate-500 font-mono">{m.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SKILLS ──────────────────────────────────────────────────────────────────

function SkillsSection() {
  return (
    <section id="skills" className="px-6 lg:px-16 py-16 border-t border-slate-800/60">
      <div className="max-w-5xl mx-auto">
        <SectionLabel label="// tech stack" />
        <h2 className="text-3xl font-bold text-white mb-10 mt-2">Skills & Technologies</h2>

        <div className="space-y-8">
          {Object.entries(SKILLS).map(([category, tags]) => (
            <div key={category}>
              <div className="text-[11px] font-mono text-slate-600 mb-3 tracking-widest uppercase">
                {category}
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-md text-xs font-mono bg-slate-800/80 border border-slate-700/60 text-slate-300
                               hover:border-cyan-500/50 hover:text-cyan-300 hover:bg-cyan-500/5
                               transition-all duration-200 cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ──────────────────────────────────────────────────────────────

function ExperienceSection() {
  return (
    <section id="experience" className="px-6 lg:px-16 py-16 border-t border-slate-800/60">
      <div className="max-w-5xl mx-auto">
        <SectionLabel label="// career" />
        <h2 className="text-3xl font-bold text-white mb-10 mt-2">Experience</h2>

        <div className="space-y-10">
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className="relative pl-8 border-l border-slate-800">
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-cyan-500/70 border-2 border-slate-950 shadow-sm shadow-cyan-500/30" />
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white leading-snug">{exp.role}</h3>
                  <div className="text-sm text-slate-400 mt-0.5">
                    {exp.company}
                    <span className="text-slate-700 mx-1.5">·</span>
                    {exp.location}
                  </div>
                </div>
                <span className="shrink-0 self-start text-xs font-mono px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  {exp.period}
                </span>
              </div>
              <ul className="space-y-2.5">
                {exp.points.map((p, j) => (
                  <li key={j} className="flex gap-3 text-sm text-slate-400 leading-relaxed">
                    <span className="text-cyan-600 mt-0.5 shrink-0 font-mono">›</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ────────────────────────────────────────────────────────────────

function ProjectCard({ project: p }) {
  const a = A[p.accent];
  return (
    <div
      className={`rounded-xl border bg-slate-900/60 p-6 flex flex-col
        ${a.border} hover:shadow-xl ${a.glow}
        transition-all duration-300 group relative
        hover:bg-slate-900/80`}
      style={{ borderColor: undefined }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full ${a.badge}`}>
          {p.badge}
        </span>
        {p.link && (
          <a
            href={p.link}
            target="_blank"
            rel="noreferrer"
            className="opacity-0 group-hover:opacity-100 transition-all duration-200 text-slate-500 hover:text-white p-1 rounded hover:bg-slate-700/50"
            aria-label="View Project"
          >
            <IconExternal />
          </a>
        )}
      </div>

      <h3 className="text-base font-semibold text-white mb-2.5 leading-snug">{p.title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed flex-1 mb-4">{p.desc}</p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {p.stack.map((s) => (
          <span
            key={s}
            className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700/60 text-slate-500"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Link */}
      {p.link && (
        <a
          href={p.link}
          target="_blank"
          rel="noreferrer"
          className={`mt-auto inline-flex items-center gap-1.5 text-xs font-mono ${a.text} hover:underline transition-colors`}
        >
          View Project <IconArrow />
        </a>
      )}
    </div>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="px-6 lg:px-16 py-16 border-t border-slate-800/60">
      <div className="max-w-5xl mx-auto">
        <SectionLabel label="// engineering work" />
        <h2 className="text-3xl font-bold text-white mb-10 mt-2">Projects</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CERTIFICATIONS ──────────────────────────────────────────────────────────

function CertCard({ cert: c }) {
  const a = A[c.accent];
  return (
    <div
      className={`rounded-xl border bg-slate-900/60 p-5 flex flex-col
        ${a.border} hover:shadow-lg ${a.glow}
        transition-all duration-300 group hover:bg-slate-900/80`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div
          className={`w-8 h-8 rounded-lg ${a.bg} border ${a.border} flex items-center justify-center shrink-0 mt-0.5 ${a.text}`}
        >
          <IconBadge />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-white leading-snug mb-1">{c.title}</h4>
          <div className="text-xs text-slate-500">{c.issuer}</div>
        </div>
      </div>

      {(c.id || c.date) && (
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] font-mono text-slate-600 mb-3 pl-0">
          {c.id && <span>ID: {c.id}</span>}
          {c.date && <span>{c.date}</span>}
        </div>
      )}

      <div className="flex items-center gap-3 pt-3 border-t border-slate-800 mt-auto">
        <a
          href={c.file}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex items-center gap-1.5 text-xs font-mono ${a.text} hover:underline transition-colors`}
        >
          <IconDownload /> View Certificate
        </a>
        {c.verify && (
          <a
            href={c.verify}
            target="_blank"
            rel="noreferrer"
            className="ml-auto inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors"
          >
            <IconExternal /> Verify
          </a>
        )}
      </div>
    </div>
  );
}

function CertsSection() {
  return (
    <section id="certifications" className="px-6 lg:px-16 py-16 border-t border-slate-800/60">
      <div className="max-w-5xl mx-auto">
        <SectionLabel label="// credentials" />
        <h2 className="text-3xl font-bold text-white mb-10 mt-2">Certifications</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CERTS.map((c) => (
            <CertCard key={c.title} cert={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EDUCATION ───────────────────────────────────────────────────────────────

function EducationSection() {
  return (
    <section id="education" className="px-6 lg:px-16 py-16 border-t border-slate-800/60">
      <div className="max-w-5xl mx-auto">
        <SectionLabel label="// background" />
        <h2 className="text-3xl font-bold text-white mb-10 mt-2">Education</h2>
        <div className="space-y-3">
          {EDUCATION.map((e, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center gap-3 p-5 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/60 transition-all duration-200"
            >
              <div className="flex-1">
                <h3 className="text-base font-semibold text-white mb-0.5">{e.degree}</h3>
                <div className="text-sm text-slate-400">
                  {e.school}
                  <span className="text-slate-700 mx-1.5">·</span>
                  {e.location}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {e.score && (
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded px-2.5 py-1">
                    {e.score}
                  </span>
                )}
                <span className="text-xs font-mono text-slate-600">{e.period}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("kjawale2004@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <footer className="px-6 lg:px-16 py-20 border-t border-slate-800/60">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-600 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Available for Cloud & DevOps roles
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Get in Touch</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">
            Open to cloud & DevOps engineering roles, collaborations, and interesting
            infrastructure challenges.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              copied
                ? "bg-emerald-500/15 border border-emerald-500/40 text-emerald-300"
                : "bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/25 hover:border-cyan-400/70"
            }`}
          >
            {copied ? <><IconCheck /> Copied to clipboard</> : <><IconCopy /> Copy Email</>}
          </button>
          <a
            href="tel:+919637430334"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium hover:border-slate-500 hover:text-white transition-all duration-200"
          >
            <IconPhone /> +91 9637430334
          </a>
          <a
            href="https://github.com/itzkajal"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium hover:border-slate-500 hover:text-white transition-all duration-200"
          >
            <IconGitHub /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/kajal-jawale-926781298/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-sm font-medium hover:border-blue-500/40 hover:text-blue-300 transition-all duration-200"
          >
            <IconLinkedIn /> LinkedIn
          </a>
        </div>

        <div className="border-t border-slate-800/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs font-mono text-slate-700">
            Kajal Jawale · Cloud & DevOps Engineer · Pune, India
          </span>
          <span className="text-xs font-mono text-slate-800">
            built with React + Vite + Tailwind CSS
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────

export default function KajalPortfolio() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden">
      <NavBar />
      <TerminalHero />
      <MetricBadges />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <CertsSection />
      <EducationSection />
      <Footer />
    </div>
  );
}
