/**
 * EDUCATION — only confirmed facts. No ranks, distinctions or honours are claimed.
 */

export type Degree = {
  id: string;
  qualification: string;
  short: string;
  institution: string;
  location: string;
  year: string;
  areas: string[];
};

export const education: Degree[] = [
  {
    id: "mca",
    qualification: "Master of Computer Applications",
    short: "MCA",
    institution: "Presidency College",
    location: "Bengaluru",
    year: "2024",
    areas: [
      "Database Management Systems",
      "Python Programming",
      "SQL & Relational Databases",
      "Data Analytics",
      "Machine Learning",
      "Data Visualization",
      "Business Intelligence",
    ],
  },
  {
    id: "bca",
    qualification: "Bachelor of Computer Applications",
    short: "BCA",
    institution: "Presidency College",
    location: "Bengaluru",
    year: "2022",
    areas: [
      "Programming Fundamentals",
      "Database Management Systems",
      "Web Technologies",
      "Software Development",
      "Data Structures",
      "Computer Networks",
    ],
  },
];

export const additionalLearning = {
  title: "Data Science with Deep Learning",
  provider: "Cranes Varsity",
  kind: "Coursework",
  modules: ["RDBMS", "Python", "Power BI", "Exploratory Data Analysis"],
  note:
    "Professional coursework completed alongside the MCA. Not presented as a certification.",
};
