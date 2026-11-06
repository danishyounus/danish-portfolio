/**
 * EXPERIENCE — verified from the owner's resume and confirmation.
 * No client or organisation names are published. Industries only.
 */

export type Engagement = {
  id: string;
  industry: string;
  context: string;
  summary: string;
  responsibilities: string[];
  capabilities: string[];
  accent: string;
};

export type Role = {
  employer: string;
  role: string;
  area: string;
  start: string;
  end: string;
  location: string;
  summary: string;
  engagements: Engagement[];
};

export const experience: Role = {
  employer: "Deloitte",
  role: "Analyst",
  area: "Technology & Transformation / Customer Strategy & Design",
  start: "2025",
  end: "Present",
  location: "Bengaluru, India",
  summary:
    "Digital adoption and transformation work across three industries — designing the guidance, workflows and analytics that help people use complex enterprise systems well.",
  engagements: [
    {
      id: "banking",
      industry: "Banking",
      context: "A leading international bank",
      summary:
        "In-product guidance and automated workflows for internal banking applications, backed by adoption analytics.",
      responsibilities: [
        "Designed and implemented in-app guidance, Smart Walk-Thrus and automated workflows for internal banking applications.",
        "Supported change management and accelerated feature adoption through contextual in-app assistance.",
        "Built digital adoption workflows that improved self-service and reduced reliance on support teams.",
        "Used tracked events and behaviour analytics to locate friction, monitor adoption and drive process improvements.",
        "Partnered with cross-functional stakeholders to gather requirements and shape user journeys.",
      ],
      capabilities: ["Digital adoption", "Change management", "Analytics", "Stakeholder management"],
      accent: "#5B8CFF",
    },
    {
      id: "realty",
      industry: "Realty",
      context: "Enterprise HR workflows",
      summary:
        "Step-by-step guidance for the HR tasks employees return to most often — with fewer errors and clearer completion.",
      responsibilities: [
        "Built Smart Walk-Thrus for job relationships, emergency contacts and performance goals.",
        "Added contextual help to simplify navigation and support policy compliance.",
        "Streamlined workflows to reduce errors and improve completion of critical HR tasks.",
        "Worked alongside HR and performance management teams to align guidance with business objectives.",
      ],
      capabilities: ["Workflow design", "HR systems", "User enablement", "Process clarity"],
      accent: "#A78BFA",
    },
    {
      id: "manufacturing",
      industry: "Manufacturing",
      context: "Kitchen & Bath",
      summary:
        "Guided customer journeys across product discovery and checkout, with in-app feedback built into the flow.",
      responsibilities: [
        "Built Smart Walk-Thrus for Product Selector, Pincode Finder, One-Click Checkout and Find Store.",
        "Designed surveys and in-app menus to capture feedback and improve navigation.",
        "Improved product discovery and checkout through guided, step-by-step workflows.",
        "Translated business requirements into digital adoption solutions alongside business teams.",
      ],
      capabilities: ["Customer journeys", "E-commerce", "Surveys", "Requirements"],
      accent: "#67E8F9",
    },
  ],
};

export const experienceMeta = {
  industries: ["Banking", "Realty", "Manufacturing"],
  totalEngagements: 3,
} as const;
