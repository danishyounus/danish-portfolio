/**
 * SKILLS — three honest tiers. No percentages, no proficiency bars.
 */

export type Skill = {
  name: string;
  note?: string;
  anchor?: boolean;
};

export type SkillTier = {
  id: "core" | "applied" | "working";
  label: string;
  kicker: string;
  description: string;
  skills: Skill[];
};

export const skillTiers: SkillTier[] = [
  {
    id: "core",
    label: "Core",
    kicker: "What I work with daily",
    description:
      "The tools I use to design adoption, build analytics and answer questions with data.",
    skills: [
      { name: "WalkMe", anchor: true },
      { name: "Digital Adoption Platforms", anchor: true },
      { name: "Power BI", anchor: true },
      { name: "Python", anchor: true },
      { name: "SQL", anchor: true },
      { name: "DAX" },
      { name: "Excel" },
      { name: "Power Query" },
    ],
  },
  {
    id: "applied",
    label: "Applied",
    kicker: "Built with, shipped with",
    description:
      "Technologies I've used in projects, practical assignments and development work.",
    skills: [
      { name: "Pandas" },
      { name: "NumPy" },
      { name: "Scikit-learn" },
      { name: "Matplotlib" },
      { name: "Seaborn" },
      { name: "HTML" },
      { name: "CSS" },
      { name: "JavaScript" },
      { name: "MySQL" },
      { name: "Git" },
      { name: "React.js", note: "basic" },
      { name: "Whatfix", note: "DAP exposure" },
    ],
  },
  {
    id: "working",
    label: "Working knowledge",
    kicker: "Concepts I can reason about",
    description:
      "Machine-learning algorithms and concepts I've studied and applied in coursework and projects.",
    skills: [
      { name: "Logistic Regression" },
      { name: "Random Forest" },
      { name: "Decision Trees" },
      { name: "XGBoost" },
      { name: "AdaBoost" },
      { name: "Support Vector Machines" },
      { name: "K-Nearest Neighbours" },
      { name: "K-Means Clustering" },
      { name: "Principal Component Analysis" },
    ],
  },
];

export const anchors = [
  "WalkMe",
  "Digital Adoption",
  "Power BI",
  "Python",
  "SQL",
  "Machine Learning",
] as const;

export const skillStatement =
  "Interested in the space where AI, automation and digital transformation meet the people who have to use them.";
