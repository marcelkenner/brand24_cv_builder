import type { CvDocument } from "@/features/cv/domain/cvDocument";
import type { CvVersion } from "@/features/cv/domain/cvVersion";

import { sampleCvDocument } from "./sampleCvDocument";

const [currentRole, juniorAnalystRole, sharpRole, computacenterRole] =
  sampleCvDocument.experience;

const atsFriendlyGeneralCvDocument = {
  ...sampleCvDocument,
  competencies: [
    "Business analysis",
    "Requirements engineering",
    "Process improvement",
    "Workflow documentation",
    "System integration design",
    "API-based solution design",
    "Stakeholder communication",
    "Backlog and delivery support",
    "UAT and rollout support",
    "Knowledge management",
    "Service operations",
    "Multilingual communication",
  ],
  experience: [
    {
      ...currentRole,
      bullets: [
        "Translate business goals into scope, user stories, functional specifications and test scenarios for insurance and internal AI initiatives.",
        "Identify workflow improvement opportunities, including AI-supported use cases with measurable operational value.",
        "Define internal assistant and knowledge-retrieval use cases across distributed data sources.",
        "Design API-based integrations between core insurance systems, front-end applications and supporting services.",
        "Support developers, architects, UX, QA and product owners through refinement, UAT and rollout readiness.",
      ],
    },
    juniorAnalystRole,
    sharpRole,
    {
      ...computacenterRole,
      bullets: [
        "Supported Airbus Commercial and ITERGO users across first- and second-line service desks, providing remote troubleshooting, ticket routing and resolver-group coordination.",
        "Contributed to the Berlin-to-Poznań transition through knowledge transfer, analyst enablement and training for new team members.",
        "Worked with ServiceNow and BMC Remedy while maintaining knowledge articles and resolving escalated tickets.",
      ],
    },
  ],
  header: {
    ...sampleCvDocument.header,
    professionalHeadline:
      "Business & Systems Analyst | Process Improvement | Enterprise Platforms",
  },
  id: "cv_marcel_kenner_ats_friendly_general",
  sectionOrder: [
    "summary",
    "experience",
    "competencies",
    "technicalSkills",
    "languages",
  ],
  summary: {
    sentences: [
      "Business and System Analyst with 5+ years of experience translating business needs into structured requirements, process flows, functional detail and delivery support across insurance and enterprise platforms.",
      "Experience spans discovery, backlog support, testing, rollout support, documentation and multilingual stakeholder communication.",
      "Works across AI-supported workflow improvement, API-based solution design and operational coordination without changing verified chronology or scope.",
      "Background also includes enterprise IT support, knowledge base creation and cross-team service delivery in English, German and Polish.",
    ],
  },
  targetRoles: [
    "Business Analyst",
    "System Analyst",
    "Digital Transformation Analyst",
    "Process Improvement Analyst",
    "Enterprise Platforms Analyst",
  ],
  technicalSkills: [
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
    {
      items: [
        "Workflow improvement",
        "Internal AI enablement",
        "AI assistants",
        "RAG-style workflows",
        "Context-aware knowledge support",
      ],
      label: "AI-supported workflow improvement",
    },
  ],
} as const satisfies CvDocument;

const leadershipStakeholderCvDocument = {
  ...sampleCvDocument,
  competencies: [
    "AI adoption and enablement",
    "Stakeholder management",
    "Cross-functional facilitation",
    "Requirements strategy",
    "Business analysis",
    "System integration design",
    "Workflow and process improvement",
    "Backlog and delivery support",
    "UAT and rollout support",
    "Decision documentation",
    "AI use case discovery",
    "Multilingual communication",
  ],
  experience: [
    {
      ...currentRole,
      bullets: [
        "Lead analysis for insurance and internal AI initiatives, translating business goals into decision-ready scope, user stories, functional specifications and test scenarios.",
        "Shape AI-supported workflow opportunities and define internal assistant use cases with business stakeholders and delivery teams.",
        "Co-design RAG-style knowledge flows across distributed data sources with attention to adoption, governance and operational fit.",
        "Design API-based integrations between core insurance systems, front-end applications and supporting services, clarifying data contracts, business rules and delivery dependencies.",
        "Partner with developers, architects, UX, QA and product owners to align solutions, support UAT and rollout readiness, and keep delivery aligned with business constraints.",
      ],
    },
    {
      ...juniorAnalystRole,
      bullets: [
        "Translated business goals into Jira stories, acceptance criteria and functional detail for bancassurance feature teams.",
        "Maintained requirements, process flows and decision context in Confluence so business and delivery stakeholders shared a current source of truth.",
        "Worked with developers, UX designers and architects to refine solution concepts, remove ambiguity and support rollouts.",
        "Led refinement sessions, supported testing and gathered stakeholder feedback to confirm delivered functionality matched expected outcomes.",
      ],
    },
    sharpRole,
    computacenterRole,
  ],
  header: {
    ...sampleCvDocument.header,
    professionalHeadline:
      "Business & Systems Analyst | AI Enablement | Stakeholder Delivery",
  },
  id: "cv_marcel_kenner_leadership_stakeholder",
  summary: {
    sentences: [
      "Business and System Analyst with 5+ years of experience leading discovery, alignment and delivery support across insurance platforms, internal AI initiatives and enterprise change.",
      "Works across business stakeholders, architects, developers, UX and QA to turn ambiguous goals into implementable scope, decision-ready requirements and rollout plans.",
      "Experienced in AI enablement, internal AI assistants and RAG-style knowledge flows where adoption depends on communication, governance and operational fit.",
      "Combines structured analysis, executive-ready communication and multilingual stakeholder management across English, German and Polish.",
    ],
  },
  targetRoles: [
    "AI Adoption Manager",
    "AI Enablement Lead",
    "Transformation Analyst",
    "Stakeholder Delivery Lead",
    "Business Analysis Lead",
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
      label: "Leadership and enablement",
    },
    {
      items: [
        "Requirements analysis",
        "Cross-functional refinement",
        "Acceptance criteria",
        "Backlog support",
        "Functional specifications",
        "UAT support",
      ],
      label: "Delivery orchestration",
    },
    {
      items: [
        "API integration design",
        "Data contracts",
        "Confluence",
        "Process documentation",
        "System documentation",
      ],
      label: "Systems and governance",
    },
  ],
} as const satisfies CvDocument;

const operationsTransformationCvDocument = {
  ...sampleCvDocument,
  competencies: [
    "Operations improvement",
    "Workflow and process improvement",
    "Business analysis",
    "Requirements engineering",
    "Service delivery coordination",
    "System integration design",
    "Knowledge management",
    "Process and knowledge documentation",
    "UAT and rollout support",
    "Backlog and delivery support",
    "AI use case discovery",
    "Multilingual communication",
  ],
  experience: [
    {
      ...currentRole,
      bullets: [
        "Translate business goals into scope, user stories, functional specifications and test scenarios for insurance and internal AI initiatives.",
        "Identify workflow bottlenecks and shape AI-supported use cases with measurable operational value.",
        "Define internal assistant and RAG-style knowledge flows across distributed data sources to improve access to business context.",
        "Design API-based integrations between core insurance systems, front-end applications and supporting services, covering data contracts, business rules and edge cases.",
        "Support delivery through refinement, UAT, rollout readiness and coordination across developers, architects, UX, QA and product owners.",
      ],
    },
    {
      ...juniorAnalystRole,
      bullets: [
        "Translated business goals into Jira stories, acceptance criteria and functional detail for bancassurance feature teams.",
        "Maintained requirements, process flows and decision context in Confluence so delivery teams had a clear, current source of truth.",
        "Worked with developers, UX designers and architects to refine solution concepts, remove ambiguity and support rollouts.",
        "Led refinement sessions, supported testing and gathered stakeholder feedback to confirm delivered functionality matched expected outcomes.",
      ],
    },
    {
      ...sharpRole,
      bullets: [
        "Supported English-, Polish- and German-speaking users in a 24/7 enterprise environment, handling L1/L2 troubleshooting and escalation.",
        "Worked across Microsoft enterprise environments including Windows Server, Exchange, Office 365, Active Directory and Azure Active Directory administration.",
        "Built a structured knowledge base from scratch, documenting troubleshooting paths and reusable resolution methods.",
      ],
    },
    {
      ...computacenterRole,
      bullets: [
        "Supported Airbus Commercial and ITERGO users across first- and second-line service desks, providing remote troubleshooting, ticket routing and resolver-group coordination.",
        "Supported the Berlin-to-Poznań transition through knowledge transfer, analyst enablement and training for new team members.",
        "Worked with ServiceNow and BMC Remedy while creating knowledge articles and resolving escalated tickets.",
      ],
    },
  ],
  header: {
    ...sampleCvDocument.header,
    professionalHeadline:
      "Business & Systems Analyst | Operations Improvement | Service Delivery",
  },
  id: "cv_marcel_kenner_operations_transformation",
  summary: {
    sentences: [
      "Business and System Analyst with 5+ years of experience improving operational workflows, requirements quality and service delivery across insurance and enterprise support environments.",
      "Turns business needs into clear user stories, specifications, process documentation and rollout support that reduce ambiguity for delivery teams.",
      "Applies AI-supported workflow improvement, API integration thinking and knowledge-management discipline to day-to-day transformation work.",
      "Built foundations in enterprise service desks, knowledge transfer and multilingual user support across English, German and Polish.",
    ],
  },
  targetRoles: [
    "Operations Transformation Analyst",
    "Process Improvement Analyst",
    "Business Analyst",
    "Service Delivery Analyst",
    "Transformation Delivery Analyst",
  ],
  technicalSkills: [
    {
      items: [
        "Workflow improvement",
        "Process mapping",
        "Requirements analysis",
        "Backlog support",
        "Functional specifications",
        "UAT support",
      ],
      label: "Operations and transformation",
    },
    {
      items: [
        "Service delivery coordination",
        "Knowledge base creation",
        "Rollout support",
        "Stakeholder communication",
        "Multilingual end-user support",
      ],
      label: "Delivery and support",
    },
    {
      items: [
        "API integration design",
        "Data contracts",
        "Internal AI enablement",
        "RAG-style workflows",
        "System documentation",
      ],
      label: "Systems and knowledge flows",
    },
  ],
} as const satisfies CvDocument;

export const cvDocumentsByVersion = {
  "ai-adoption-manager": sampleCvDocument,
  "ats-friendly-general": atsFriendlyGeneralCvDocument,
  "leadership-stakeholder": leadershipStakeholderCvDocument,
  "operations-transformation": operationsTransformationCvDocument,
} as const satisfies Record<CvVersion, CvDocument>;

export function getCvDocument(version: CvVersion): CvDocument {
  return cvDocumentsByVersion[version];
}
