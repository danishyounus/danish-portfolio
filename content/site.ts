export const site = {
  /**
   * Set NEXT_PUBLIC_SITE_URL after deployment, e.g. https://yourdomain.com.
   * Until then, metadata falls back to localhost and is not intended for production.
   */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Mohammed Danish Y. is a Technology Analyst at Deloitte working across data analytics, digital adoption and experience design — building intelligent digital experiences in Bengaluru, India.",
  keywords: [
    "Mohammed Danish Y",
    "Danish Y",
    "Technology Analyst",
    "Digital Adoption",
    "WalkMe",
    "Power BI",
    "Data Analytics",
    "Machine Learning",
    "Python",
    "SQL",
    "Bengaluru",
    "Deloitte",
  ],
  nav: [
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About", href: "#about" },
    { id: "experience", label: "Experience", href: "#experience" },
    { id: "skills", label: "Skills", href: "#skills" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "education", label: "Education", href: "#education" },
    { id: "certifications", label: "Certifications", href: "#certifications" },
    { id: "contact", label: "Contact", href: "#contact" },
  ],
} as const;

export type NavItem = (typeof site.nav)[number];
