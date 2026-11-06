/**
 * CERTIFICATIONS — extracted from the uploaded certificate images.
 * Dates and IDs are printed on the documents. Never add an unverified credential.
 * WalkMe credentials expire; the UI derives validity from `expires`.
 */

export type CertCategoryId = "professional" | "platform" | "simulation" | "learning";

export type CertCategory = {
  id: CertCategoryId;
  label: string;
  short: string;
  description: string;
};

export type Certificate = {
  id: string;
  category: CertCategoryId;
  title: string;
  issuer: string;
  issuerMark: string;
  issued: string | null;
  issuedLabel: string | null;
  expires: string | null;
  credentialId: string | null;
  verificationUrl: string | null;
  verificationLabel: string | null;
  verificationCode: string | null;
  image: string | null;
  note: string | null;
};

export const certCategories: CertCategory[] = [
  {
    id: "professional",
    label: "Professional Certifications",
    short: "Professional",
    description: "Formal certifications from professional bodies.",
  },
  {
    id: "platform",
    label: "Platform Certifications & Training",
    short: "Platform",
    description: "Vendor credentials for the platforms I build on.",
  },
  {
    id: "simulation",
    label: "Job Simulations",
    short: "Simulations",
    description: "Practical simulations completed with real organisations.",
  },
  {
    id: "learning",
    label: "Additional Learning & Coursework",
    short: "Learning",
    description: "Structured courses and academic learning.",
  },
];

export const certificates: Certificate[] = [
  {
    id: "pspo-ai-essentials",
    category: "professional",
    title: "Professional Scrum Product Owner AI Essentials",
    issuer: "Scrum.org",
    issuerMark: "scrum.org",
    issued: "2026-09-09",
    issuedLabel: "9 September 2026",
    expires: null,
    credentialId: "1347710",
    verificationUrl: "https://scrum.org/certificates/1347710",
    verificationLabel: "Verify on Scrum.org",
    verificationCode: null,
    image: "/assets/certificates/scrum-pspo-ai-essentials.png",
    note: "Professional certification. Certificate issued to Mohammed Danish Y.",
  },
  {
    id: "walkme-builder-1",
    category: "platform",
    title: "Certified WalkMe Builder — Level I",
    issuer: "WalkMe Digital Adoption Institute",
    issuerMark: "walkme",
    issued: "2025-08-15",
    issuedLabel: "15 August 2025",
    expires: "2027-08-15",
    credentialId: "cb8a30d3-586d-4f1f-b0a2-9d228ebf8279",
    verificationUrl: null,
    verificationLabel: null,
    verificationCode: null,
    image: "/assets/certificates/walkme-builder-level-1.png",
    note: "A basic WalkMe tactical expertise designation.",
  },
  {
    id: "walkme-dap-consultant",
    category: "platform",
    title: "Certified WalkMe DAP Consultant",
    issuer: "WalkMe Digital Adoption Institute",
    issuerMark: "walkme",
    issued: "2025-09-02",
    issuedLabel: "2 September 2025",
    expires: "2026-09-02",
    credentialId: "770dd968-26c7-4c8e-a32d-6a579a",
    verificationUrl: null,
    verificationLabel: null,
    verificationCode: null,
    image: "/assets/certificates/walkme-dap-consultant.png",
    note: "A WalkMe technical sales expertise designation.",
  },
  {
    id: "walkme-dap-advisor",
    category: "platform",
    title: "Certified WalkMe DAP Advisor",
    issuer: "WalkMe Digital Adoption Institute",
    issuerMark: "walkme",
    issued: "2025-09-01",
    issuedLabel: "1 September 2025",
    expires: "2026-09-01",
    credentialId: "2194a188-c66a-48c8-9152-53617c",
    verificationUrl: null,
    verificationLabel: null,
    verificationCode: null,
    image: "/assets/certificates/walkme-dap-advisor.png",
    note: "A WalkMe sales expertise designation.",
  },
  {
    id: "forage-tata",
    category: "simulation",
    title: "Data Visualisation: Empowering Business with Effective Insights",
    issuer: "Tata · Forage",
    issuerMark: "tata",
    issued: "2024-12-15",
    issuedLabel: "15 December 2024",
    expires: null,
    credentialId: null,
    verificationUrl: null,
    verificationLabel: null,
    verificationCode: "JTLmRQrWmpLEEW6jM",
    image: "/assets/certificates/forage-tata-data-visualisation.png",
    note: "Job simulation completed with Tata through Forage.",
  },
  {
    id: "forage-british-airways",
    category: "simulation",
    title: "Data Science Job Simulation",
    issuer: "British Airways · Forage",
    issuerMark: "british-airways",
    issued: "2025-01-20",
    issuedLabel: "20 January 2025",
    expires: null,
    credentialId: null,
    verificationUrl: null,
    verificationLabel: null,
    verificationCode: "JTLmRQrWmpLEEW6jM",
    image: "/assets/certificates/forage-british-airways-data-science.png",
    note: "Job simulation completed with British Airways through Forage.",
  },
  {
    id: "hp-life-data-science",
    category: "learning",
    title: "Data Science & Analytics",
    issuer: "HP LIFE · HP Foundation",
    issuerMark: "hp-life",
    issued: "2025-06-16",
    issuedLabel: "16 June 2025",
    expires: null,
    credentialId: "f133eaf6-d517-4ed5-89d7-97e04a1a691e",
    verificationUrl: null,
    verificationLabel: null,
    verificationCode: null,
    image: "/assets/certificates/hp-life-data-science-analytics.png",
    note: "Certificate of completion for an HP LIFE online course.",
  },
  {
    id: "cranes-varsity",
    category: "learning",
    title: "Data Science with Deep Learning",
    issuer: "Cranes Varsity",
    issuerMark: "cranes",
    issued: null,
    issuedLabel: null,
    expires: null,
    credentialId: null,
    verificationUrl: null,
    verificationLabel: null,
    verificationCode: null,
    image: null,
    note: "Coursework in RDBMS, Python, Power BI and exploratory data analysis. Not a certification.",
  },
];
