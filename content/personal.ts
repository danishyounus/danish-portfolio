/**
 * PERSONAL CONTENT — edit this file to change the identity shown across the site.
 * Every field here is verified. Do not add claims that are not true.
 */

export const personal = {
  fullName: "Mohammed Danish Y.",
  displayName: "Danish",
  heroName: "DANISH",

  role: "Technology Analyst",
  focus: "Data, Digital Adoption & Experience",
  title: "Technology Analyst | Data, Digital Adoption & Experience",

  headline:
    "Building intelligent digital experiences at the intersection of technology, data and design.",

  location: "Bengaluru, India",

  current: {
    employer: "Deloitte",
    role: "Analyst",
    area: "Technology & Transformation / Customer Strategy & Design",
    start: "2025",
    end: "Present",
  },

  intro: [
    "I'm a technology analyst at Deloitte, working where data, digital adoption and experience design meet. My work stays close to the user: finding where a process breaks down, designing the guidance that fixes it, and measuring whether behaviour actually changed.",
    "Across banking, realty and manufacturing, I've built in-product guidance, Smart Walk-Thrus and automated workflows — then used adoption analytics to decide what to improve next. The tools change; the question doesn't: how do you make a complex system feel obvious?",
    "Before Deloitte, an MCA at Presidency College and a long run of data projects: Power BI dashboards, machine-learning models, and a lot of exploratory analysis. I'm drawn toward AI-enabled products and transformation work — the space where analytics, automation and design stop being separate conversations.",
  ],

  philosophy: "Understand the system. Then change the smallest thing that unlocks the rest.",

  interests: [
    "AI & automation",
    "Digital adoption",
    "Data storytelling",
    "Experience design",
    "Emerging technology",
  ],

  values: [
    {
      title: "Clarity over complexity",
      body: "The best interface is the one nobody has to be trained on. I design toward that, even when the system underneath is messy.",
    },
    {
      title: "Evidence over instinct",
      body: "Adoption analytics tell you where people actually struggle. I'd rather follow the behaviour than defend a hunch.",
    },
    {
      title: "Systems, not screens",
      body: "A walkthrough is not the outcome. The outcome is a workflow that works after the guidance is gone.",
    },
  ],

  facts: [
    { label: "Currently", value: "Analyst at Deloitte" },
    { label: "Based in", value: "Bengaluru, India" },
    { label: "Focus", value: "Data · Adoption · Experience" },
  ],

  photography: {
    // Drop the originals here; the components fall back gracefully until they exist.
    hero: "/assets/portraits/hero-portrait.jpg",
    heroSmall: "/assets/portraits/hero-portrait-480.jpg",
    about: "/assets/portraits/about-portrait.jpg",
    aboutSmall: "/assets/portraits/about-portrait-480.jpg",
    heroAlt:
      "Portrait of Mohammed Danish Y. wearing a white shirt, standing in front of a curtain.",
    aboutAlt: "Mohammed Danish Y. in a purple sweater, photographed in a car.",
  },

  /**
   * Social links. Only entries with `visible: true` AND a real url are rendered.
   * No placeholder or empty links are ever shown.
   */
  socials: [
    {
      id: "linkedin",
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/mohammed-danish-y-300b961a0/",
      visible: true,
    },
    {
      id: "github",
      label: "GitHub",
      url: "https://github.com/danishyounus",
      visible: true,
    },
    { id: "kaggle", label: "Kaggle", url: null as string | null, visible: false },
    { id: "tableau", label: "Tableau Public", url: null as string | null, visible: false },
  ],

  /**
   * Direct email is intentionally not published anywhere in the source.
   * Enquiries go through the contact form once a provider is connected.
   */
  contact: {
    emailPublished: false,
    formConnected: false,
  },
} as const;

export type Personal = typeof personal;
