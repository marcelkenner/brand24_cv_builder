import type {
  CvContactMethod,
  CvDocument,
} from "@/features/cv/domain/cvDocument";

const sampleContactMethods: readonly CvContactMethod[] = [
  {
    href: "mailto:marcel.kenner@outlook.com",
    kind: "email",
    label: "Email",
    value: "marcel.kenner@outlook.com",
  },
  {
    href: "tel:+48732450969",
    kind: "phone",
    label: "Phone",
    value: "+48 732 450 969",
  },
  {
    href: "https://www.linkedin.com/in/marcel-kenner/",
    kind: "linkedin",
    label: "LinkedIn",
    value: "https://www.linkedin.com/in/marcel-kenner/",
  },
];

export const sampleCvDocument = {
  competencies: [
    "AI adoption and enablement",
    "AI use case discovery",
    "Business analysis",
    "Requirements engineering",
    "Workflow and process improvement",
    "System integration design",
    "API-based solution design",
    "Stakeholder management",
    "Backlog and delivery support",
    "Process and knowledge documentation",
    "UAT and rollout support",
    "Multilingual communication",
  ],
  experience: [
    {
      bullets: [
        "Lead end-to-end analysis for insurance and internal AI initiatives, translating business goals into scope, user stories, functional specifications and test scenarios.",
        "Identify AI-supported workflow opportunities and shape practical internal use cases with measurable operational value.",
        "Define use cases for internal AI assistants and co-design RAG-style flows across distributed data sources.",
        "Design API-based integrations between core insurance systems, front-end applications and supporting services, covering data contracts, business rules and edge cases.",
        "Partner with developers, architects, UX, QA and product owners to validate solutions, support UAT and rollout readiness, and keep delivery aligned with business and regulatory constraints.",
      ],
      company: "ERGO Technology & Services",
      companySummary:
        "Insurance technology organisation delivering bancassurance, life insurance, ESG and customer portal initiatives, alongside internal AI enablement work.",
      dates: {
        end: "Present",
        kind: "current",
        start: "Apr 2024",
      },
      location: "Warsaw, Poland (Remote)",
      title: "System / Business Analyst",
    },
    {
      bullets: [
        "Translated business goals into Jira stories, acceptance criteria and functional detail for bancassurance feature teams.",
        "Maintained requirements, process flows and decision context in Confluence so delivery teams had a clear, current source of truth.",
        "Worked with developers, UX designers and architects to refine solution concepts, remove ambiguity and support rollouts.",
        "Led refinement sessions, supported testing and gathered stakeholder feedback to confirm delivered functionality matched expected outcomes.",
      ],
      company: "ERGO Technology & Services",
      dates: {
        end: "Apr 2024",
        kind: "closed",
        start: "Jul 2022",
      },
      location: "Warsaw, Poland",
      title: "Junior System / Business Analyst",
    },
    {
      bullets: [
        "Supported English-, Polish- and German-speaking users in a 24/7 enterprise environment, handling L1/L2 troubleshooting and escalation.",
        "Worked across Microsoft enterprise environments including Windows Server, Exchange, Office 365, Active Directory and Azure Active Directory administration.",
        "Built a structured knowledge base from scratch, documenting troubleshooting paths and reusable resolution methods.",
      ],
      company: "Sharp Europe",
      dates: {
        end: "Jul 2022",
        kind: "closed",
        start: "Jul 2021",
      },
      location: "Warsaw, Poland",
      title: "IT Service Desk Analyst",
    },
    {
      bullets: [
        "Supported Airbus Commercial and ITERGO users across first- and second-line service desks, providing remote troubleshooting, ticket routing and resolver-group coordination.",
        "Supported the Berlin-to-Poznań transition through knowledge transfer, analyst enablement and training for new team members.",
        "Worked with ServiceNow and BMC Remedy while creating knowledge articles and resolving escalated tickets.",
      ],
      company: "Computacenter",
      companySummary:
        "Enterprise support delivery for Airbus Commercial and ITERGO service operations.",
      dates: {
        end: "Jul 2021",
        kind: "closed",
        start: "Nov 2019",
      },
      location: "Poznań, Poland",
      title: "IT Analyst (First and Second Line Support)",
    },
  ],
  header: {
    contactMethods: sampleContactMethods,
    fullName: "Marcel Kenner",
    location: "Poznań, Wielkopolskie, Poland",
    photo: {
      alt: "Marcel Kenner headshot",
      assetPath: "/new_pfp1.jpg",
      kind: "asset",
      placement: "top-right",
      shape: "rectangle",
      widthMm: 32,
    },
    professionalHeadline: "System & Business Analysis | Enterprise Platforms",
  },
  id: "cv_marcel_kenner_ai_adoption_manager",
  languages: [
    {
      language: "English",
      proficiency: "Fluent",
    },
    {
      language: "German",
      proficiency: "Fluent",
    },
    {
      language: "Polish",
      proficiency: "Fluent",
    },
  ],
  sectionOrder: [
    "summary",
    "competencies",
    "experience",
    "languages",
    "technicalSkills",
  ],
  summary: {
    sentences: [
      "Business and System Analyst with 5+ years of experience translating complex business needs into clear, implementable solutions across discovery, design, delivery, rollout and support.",
      "Experienced in insurance, ESG, customer portals and enterprise platforms.",
      "Supports AI enablement through AI assistants, RAG-based solutions and business-facing workflow improvement.",
      "Combines business analysis, system integration thinking and multilingual stakeholder communication.",
    ],
  },
  supportedPapers: ["a4", "letter"],
  targetRoles: [
    "AI Adoption Manager",
    "AI Business Analyst",
    "AI Delivery Enablement",
    "Enterprise AI Implementation",
    "Digital Transformation",
  ],
  technicalSkills: [
    {
      items: [
        "AI use case identification",
        "Internal AI enablement",
        "AI assistants",
        "RAG-style workflows",
        "Context-aware knowledge support",
      ],
      label: "AI adoption and AI-supported workflows",
    },
    {
      items: [
        "Requirements analysis",
        "Jira epics and stories",
        "Acceptance criteria",
        "Backlog support",
        "Functional specifications",
        "UAT support",
      ],
      label: "Analysis and delivery",
    },
    {
      items: [
        "API integration design",
        "Data contracts",
        "Confluence",
        "Process documentation",
        "System documentation",
      ],
      label: "Systems and documentation",
    },
  ],
} as const satisfies CvDocument;
