import type { ReactNode } from "react";

import type {
  CvContactMethod,
  CvDocument,
  CvSectionKey,
} from "@/features/cv/domain/cvDocument";
import type { CvLocale } from "@/features/cv/domain/cvLocale";
import { getCvSectionLabels } from "@/features/cv/data/cvSectionLabels";

import styles from "./CvDocument.module.css";

export function buildDocumentSections(document: CvDocument, locale: CvLocale) {
  const sectionLabels = getCvSectionLabels(locale);

  return {
    certifications: document.certifications ? (
      <DocumentSection sectionKey="certifications" sectionLabels={sectionLabels}>
        <ul className={styles.tightList}>
          {document.certifications.map((certification, certificationIndex) => (
            <li
              key={`${certification.title}-${certification.year}`}
              className={styles.printUnit}
              {...getUnitDataProps(
                sectionLabels,
                "certifications",
                buildUnitId("certifications", certificationIndex),
              )}
            >
              <span className={styles.inlineLabel}>{certification.title}</span>
              <span> - {certification.issuer}</span>
              <span> - {certification.year}</span>
            </li>
          ))}
        </ul>
      </DocumentSection>
    ) : null,
    competencies: (
      <DocumentSection sectionKey="competencies" sectionLabels={sectionLabels}>
        <ul className={styles.keywordList}>
          {document.competencies.map((competency, competencyIndex) => (
            <li
              key={competency}
              className={styles.printUnit}
              {...getUnitDataProps(
                sectionLabels,
                "competencies",
                buildUnitId("competencies", competencyIndex),
              )}
            >
              {competency}
            </li>
          ))}
        </ul>
      </DocumentSection>
    ),
    education: document.education && document.education.length > 0 ? (
      <DocumentSection sectionKey="education" sectionLabels={sectionLabels}>
        <div className={styles.entryList}>
          {document.education.map((entry, entryIndex) => (
            <article
              key={`${entry.institution}-${entry.degree}-${entry.endYear}`}
              className={`${styles.entry} ${styles.printUnit}`}
              {...getUnitDataProps(
                sectionLabels,
                "education",
                buildUnitId("education", entryIndex),
              )}
            >
              <div className={styles.entryHeadingRow}>
                <h3 className={styles.entryTitle}>{entry.degree}</h3>
                <p className={styles.entryDates}>
                  {entry.startYear} - {entry.endYear}
                </p>
              </div>
              <p className={styles.entryMeta}>
                <span className={styles.entryCompany}>{entry.institution}</span>
                <span className={styles.entryMetaSeparator}> · </span>
                <span>{entry.location}</span>
              </p>
            </article>
          ))}
        </div>
      </DocumentSection>
    ) : null,
    experience: (
      <DocumentSection sectionKey="experience" sectionLabels={sectionLabels}>
        <div className={styles.entryList}>
          {document.experience.map((entry, entryIndex) => (
            <article
              key={`${entry.company}-${entry.title}-${entry.dates.start}`}
              className={`${styles.entry} ${styles.printUnit}`}
              {...getUnitDataProps(
                sectionLabels,
                "experience",
                buildUnitId("experience", entryIndex),
              )}
            >
              <div className={styles.entryHeadingRow}>
                <h3 className={styles.entryTitle}>{entry.title}</h3>
                <p className={styles.entryDates}>{formatDateRange(entry.dates)}</p>
              </div>
              <p className={styles.entryMeta}>
                <span className={styles.entryCompany}>{entry.company}</span>
                <span className={styles.entryMetaSeparator}> · </span>
                <span>{entry.location}</span>
              </p>
              {entry.companySummary ? (
                <p className={styles.entrySummary}>{entry.companySummary}</p>
              ) : null}
              <ul className={styles.bulletList}>
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </DocumentSection>
    ),
    languages: (
      <DocumentSection sectionKey="languages" sectionLabels={sectionLabels}>
        <ul className={styles.keywordList}>
          {document.languages.map((entry, languageIndex) => (
            <li
              key={entry.language}
              className={styles.printUnit}
              {...getUnitDataProps(
                sectionLabels,
                "languages",
                buildUnitId("languages", languageIndex),
              )}
            >
              {entry.language} - {entry.proficiency}
            </li>
          ))}
        </ul>
      </DocumentSection>
    ),
    summary: (
      <DocumentSection sectionKey="summary" sectionLabels={sectionLabels}>
        <div
          className={styles.printUnit}
          {...getUnitDataProps(
            sectionLabels,
            "summary",
            buildUnitId("summary", 0),
          )}
        >
          <p className={styles.summary}>{document.summary.sentences.join(" ")}</p>
        </div>
      </DocumentSection>
    ),
    technicalSkills: (
      <DocumentSection
        sectionKey="technicalSkills"
        sectionLabels={sectionLabels}
      >
        <ul className={styles.skillGroupList}>
          {document.technicalSkills.map((group, skillIndex) => (
            <li
              key={group.label}
              className={`${styles.skillRow} ${styles.printUnit}`}
              {...getUnitDataProps(
                sectionLabels,
                "technicalSkills",
                buildUnitId("technicalSkills", skillIndex),
              )}
            >
              <span className={styles.skillLabel}>{`${group.label}: `}</span>
              <span className={styles.skillValue}>{group.items.join(" · ")}</span>
            </li>
          ))}
        </ul>
      </DocumentSection>
    ),
  } satisfies Readonly<Record<CvSectionKey, ReactNode | null>>;
}

function buildUnitId(sectionKey: CvSectionKey, index: number, suffix?: string) {
  return suffix ? `${sectionKey}-${index}-${suffix}` : `${sectionKey}-${index}`;
}

function getUnitDataProps(
  sectionLabels: Readonly<Record<CvSectionKey, string>>,
  sectionKey: CvSectionKey,
  unitId: string,
) {
  return {
    "data-cv-continuation-heading": "false",
    "data-cv-section-label": sectionLabels[sectionKey],
    "data-cv-unit": unitId,
    "data-page-break-before": "false",
  } as const;
}

export function formatContactValue(contact: CvContactMethod) {
  if (contact.kind === "email" || contact.kind === "phone") {
    return contact.value;
  }

  return contact.value.replace(/^https:\/\/(www\.)?/, "");
}

function DocumentSection({
  children,
  sectionKey,
  sectionLabels,
}: {
  readonly children: ReactNode;
  readonly sectionKey: CvSectionKey;
  readonly sectionLabels: Readonly<Record<CvSectionKey, string>>;
}) {
  const headingId = `cv-section-${sectionKey}`;

  return (
    <section
      aria-labelledby={headingId}
      className={styles.section}
      data-cv-section={sectionKey}
      data-page-break-before="false"
    >
      <h2
        className={styles.sectionHeading}
        data-cv-section-heading="true"
        id={headingId}
      >
        {sectionLabels[sectionKey]}
      </h2>
      {children}
    </section>
  );
}

function formatDateRange(dates: CvDocument["experience"][number]["dates"]) {
  return `${dates.start} - ${dates.end}`;
}
