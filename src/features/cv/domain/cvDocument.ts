import type { CvPaperVariant } from "@/features/cv/domain/paperVariant";

export type NonEmptyReadonlyArray<T> = readonly [T, ...T[]];

export type CvDocumentId = `cv_${string}`;
export type EmailAddress = `${string}@${string}.${string}`;
export type HttpsUrl = `https://${string}`;
export type InternationalPhoneNumber = `+${string}`;

type CvMonthName =
  | "Jan"
  | "Feb"
  | "Mar"
  | "Apr"
  | "May"
  | "Jun"
  | "Jul"
  | "Aug"
  | "Sep"
  | "Oct"
  | "Nov"
  | "Dec"
  | "sty"
  | "lut"
  | "mar"
  | "kwi"
  | "maj"
  | "cze"
  | "lip"
  | "sie"
  | "wrz"
  | "paź"
  | "lis"
  | "gru";

export type CvMonthYear = `${CvMonthName} ${number}`;

export type CvSectionKey =
  | "summary"
  | "competencies"
  | "experience"
  | "education"
  | "certifications"
  | "languages"
  | "technicalSkills";

export type CvPhoto =
  | {
      readonly kind: "none";
    }
  | {
      readonly alt: string;
      readonly assetPath: string;
      readonly kind: "asset";
      readonly placement: "top-right";
      readonly shape: "rectangle";
      readonly widthMm: number;
    };

export type CvContactMethod =
  | {
      readonly href: `mailto:${EmailAddress}`;
      readonly kind: "email";
      readonly label: string;
      readonly value: EmailAddress;
    }
  | {
      readonly href: `tel:${string}`;
      readonly kind: "phone";
      readonly label: string;
      readonly value: InternationalPhoneNumber;
    }
  | {
      readonly href: HttpsUrl;
      readonly kind: "linkedin";
      readonly label: string;
      readonly value: HttpsUrl;
    }
  | {
      readonly href: HttpsUrl;
      readonly kind: "website";
      readonly label: string;
      readonly value: HttpsUrl;
    };

export type CvRoleDateRange =
  | {
      readonly end: "Present" | "Obecnie";
      readonly kind: "current";
      readonly start: CvMonthYear;
    }
  | {
      readonly end: CvMonthYear;
      readonly kind: "closed";
      readonly start: CvMonthYear;
    };

export type CvLanguageProficiency =
  | "Native"
  | "Fluent"
  | "Professional Working Proficiency"
  | "Conversational"
  | "Ojczysty"
  | "Biegły"
  | "Profesjonalna znajomość robocza"
  | "Komunikatywny";

export type CvSkillGroup = {
  readonly items: NonEmptyReadonlyArray<string>;
  readonly label: string;
};

export type CvDocument = {
  readonly certifications?: NonEmptyReadonlyArray<CvCertification>;
  readonly competencies: NonEmptyReadonlyArray<string>;
  readonly education?: readonly CvEducationEntry[];
  readonly experience: NonEmptyReadonlyArray<CvExperienceEntry>;
  readonly header: CvHeader;
  readonly id: CvDocumentId;
  readonly languages: NonEmptyReadonlyArray<CvLanguageEntry>;
  readonly sectionOrder: NonEmptyReadonlyArray<CvSectionKey>;
  readonly summary: CvSummary;
  readonly supportedPapers: NonEmptyReadonlyArray<CvPaperVariant>;
  readonly targetRoles: NonEmptyReadonlyArray<string>;
  readonly technicalSkills: NonEmptyReadonlyArray<CvSkillGroup>;
};

export type CvHeader = {
  readonly contactMethods: readonly CvContactMethod[];
  readonly fullName: string;
  readonly location: string;
  readonly photo: CvPhoto;
  readonly professionalHeadline: string;
};

export type CvSummary = {
  readonly sentences: readonly [string, string, string, string];
};

export type CvExperienceEntry = {
  readonly bullets: NonEmptyReadonlyArray<string>;
  readonly company: string;
  readonly companySummary?: string;
  readonly dates: CvRoleDateRange;
  readonly location: string;
  readonly title: string;
};

export type CvEducationEntry = {
  readonly degree: string;
  readonly endYear: number;
  readonly institution: string;
  readonly location: string;
  readonly startYear: number;
};

export type CvCertification = {
  readonly issuer: string;
  readonly title: string;
  readonly year: number;
};

export type CvLanguageEntry = {
  readonly language: string;
  readonly proficiency: CvLanguageProficiency;
};
