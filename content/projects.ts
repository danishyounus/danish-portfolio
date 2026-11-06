/**
 * PROJECTS — only verified information.
 * Repositories, demos and screenshots are intentionally null until supplied.
 * No outcomes, metrics or implementation details are invented.
 */

export type Project = {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  category: string;
  featured: boolean;
  stack: string[];
  problem: string;
  built: string;
  outcome: string;
  approach: string[];
  repo: string | null;
  demo: string | null;
  screenshots: string[];
  cover: {
    motif: "signal" | "grid" | "layers" | "pulse" | "orbit" | "bars" | "calendar";
    accent: string;
    accentSoft: string;
  };
  /** Internal flag: supporting assets still to be supplied. Not shown publicly. */
  assetsPending: boolean;
};

export const projects: Project[] = [
  {
    slug: "ott-media-analytics",
    index: "01",
    title: "OTT Media Analytics Dashboard",
    shortTitle: "OTT Analytics",
    category: "Business Intelligence",
    featured: true,
    stack: ["Power BI", "DAX", "Power Query"],
    problem:
      "Analysing OTT platform data and presenting meaningful business insights.",
    built:
      "An interactive analytics dashboard for exploring OTT business metrics and turning raw platform data into readable signals.",
    outcome:
      "Data visualisation that makes business metrics easier to explore and interpret.",
    approach: [
      "Prepared and shaped the source data for analysis.",
      "Modelled the metrics needed for the dashboard.",
      "Designed an interactive report for exploring the results.",
    ],
    repo: null,
    demo: null,
    screenshots: [],
    cover: { motif: "signal", accent: "#7C6CFF", accentSoft: "#3B2BD9" },
    assetsPending: true,
  },
  {
    slug: "bangalore-traffic-analysis",
    index: "02",
    title: "Bangalore Traffic Analysis",
    shortTitle: "Traffic Analysis",
    category: "Data Analytics",
    featured: true,
    stack: ["Power BI"],
    problem: "Understanding Bangalore traffic patterns through data analysis.",
    built:
      "A traffic analysis and visualisation dashboard focused on making patterns and trends visible.",
    outcome: "Improved visibility into traffic trends and patterns.",
    approach: [
      "Collected and analysed traffic data.",
      "Built a dashboard to surface trends and patterns.",
      "Used visual analysis to make the findings legible at a glance.",
    ],
    repo: null,
    demo: null,
    screenshots: [],
    cover: { motif: "grid", accent: "#5B8CFF", accentSoft: "#1B3FB8" },
    assetsPending: true,
  },
  {
    slug: "resume-classification",
    index: "03",
    title: "Resume Classification & Interview Answer Scoring",
    shortTitle: "Resume Classification",
    category: "Machine Learning · NLP",
    featured: true,
    stack: [
      "Python",
      "NLP",
      "TF-IDF",
      "Logistic Regression",
      "Random Forest",
      "AdaBoost",
    ],
    problem:
      "Automating resume classification and evaluating interview answers.",
    built:
      "A machine-learning application that classifies resumes and scores interview answers.",
    outcome:
      "A working demonstration of text classification and answer scoring using classical machine-learning methods.",
    approach: [
      "Represented resume and answer text as features using TF-IDF.",
      "Trained and compared classification models, including Logistic Regression, Random Forest and AdaBoost.",
      "Combined resume classification with a scoring step for interview answers.",
    ],
    repo: null,
    demo: null,
    screenshots: [],
    cover: { motif: "layers", accent: "#A78BFA", accentSoft: "#5B21B6" },
    assetsPending: true,
  },
  {
    slug: "hospital-emergency-dashboard",
    index: "04",
    title: "Hospital Emergency Dashboard",
    shortTitle: "Emergency Dashboard",
    category: "Healthcare Analytics",
    featured: false,
    stack: ["Power BI"],
    problem:
      "Presenting hospital emergency data in a form that is quick to read and act on.",
    built: "A Power BI dashboard for exploring emergency-department data.",
    outcome: "A clearer view of emergency-department activity.",
    approach: [
      "Structured the underlying data for reporting.",
      "Designed a dashboard around the questions the data needs to answer.",
    ],
    repo: null,
    demo: null,
    screenshots: [],
    cover: { motif: "pulse", accent: "#FB7185", accentSoft: "#7F1D3A" },
    assetsPending: true,
  },
  {
    slug: "diabetes-prediction",
    index: "05",
    title: "Diabetes Prediction",
    shortTitle: "Diabetes Prediction",
    category: "Machine Learning",
    featured: false,
    stack: ["Python", "Random Forest"],
    problem: "Predicting diabetes outcomes from structured health data.",
    built: "A Random Forest classification model trained on health data.",
    outcome:
      "A working predictive model demonstrating an end-to-end classification workflow.",
    approach: [
      "Explored and prepared the dataset.",
      "Trained a Random Forest classifier.",
      "Evaluated the model's classification performance.",
    ],
    repo: null,
    demo: null,
    screenshots: [],
    cover: { motif: "orbit", accent: "#2DD4BF", accentSoft: "#115E59" },
    assetsPending: true,
  },
  {
    slug: "tech-gadget-failures",
    index: "06",
    title: "Tech Gadget Failures Analysis",
    shortTitle: "Gadget Failures",
    category: "Exploratory Data Analysis",
    featured: false,
    stack: ["Python", "Pandas", "Matplotlib"],
    problem: "Understanding patterns in technology gadget failures.",
    built: "An exploratory analysis of gadget failure data with supporting visualisations.",
    outcome: "A clearer picture of failure patterns in the dataset.",
    approach: [
      "Cleaned and explored the dataset.",
      "Investigated failure patterns across the data.",
      "Visualised the findings for interpretation.",
    ],
    repo: null,
    demo: null,
    screenshots: [],
    cover: { motif: "bars", accent: "#FBBF24", accentSoft: "#78350F" },
    assetsPending: true,
  },
  {
    slug: "scheduling-system",
    index: "07",
    title: "PHP/MySQL Scheduling System",
    shortTitle: "Scheduling System",
    category: "Web Application",
    featured: false,
    stack: ["PHP", "MySQL"],
    problem: "Managing scheduling through a purpose-built web application.",
    built: "A PHP and MySQL application for creating and managing schedules.",
    outcome: "A functional scheduling workflow backed by a relational database.",
    approach: [
      "Modelled the scheduling data in MySQL.",
      "Built the application logic in PHP.",
      "Connected the interface to the database for day-to-day scheduling.",
    ],
    repo: null,
    demo: null,
    screenshots: [],
    cover: { motif: "calendar", accent: "#60A5FA", accentSoft: "#1E3A8A" },
    assetsPending: true,
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const archiveProjects = projects.filter((p) => !p.featured);
