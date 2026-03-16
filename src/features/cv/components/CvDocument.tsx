import { Fragment } from "react";
import Image from "next/image";

import type {
  CvDocument as CvDocumentModel,
  CvPhoto,
  CvSectionKey,
} from "@/features/cv/domain/cvDocument";
import {
  defaultCvLocale,
  type CvLocale,
} from "@/features/cv/domain/cvLocale";
import type { CvPaperVariant } from "@/features/cv/domain/paperVariant";
import {
  cvTemplateMetadata,
  type CvTemplateVariant,
} from "@/features/cv/domain/cvTemplateVariant";

import styles from "./CvDocument.module.css";
import { buildDocumentSections, formatContactValue } from "./cvDocumentContent";
import { getDocumentStyle } from "./cvDocumentStyle";

type CvDocumentProps = {
  readonly document: CvDocumentModel;
  readonly locale?: CvLocale;
  readonly paper: CvPaperVariant;
  readonly template: CvTemplateVariant;
};

const twoColumnSidebarSectionKeys = new Set<CvSectionKey>([
  "competencies",
  "languages",
  "certifications",
  "technicalSkills",
]);

export function CvDocument({
  document,
  locale = defaultCvLocale,
  paper,
  template,
}: CvDocumentProps) {
  const sections = buildDocumentSections(document, locale);
  const templateMetadata = cvTemplateMetadata[template];
  const photo = getTemplatePhoto(document.header.photo, template);

  return (
    <article
      aria-label={
        locale === "pl" ? `CV ${document.header.fullName}` : `${document.header.fullName} CV`
      }
      className={styles.document}
      data-cv-document="true"
      data-paper={paper}
      data-template={template}
      style={getDocumentStyle(paper)}
    >
      <header
        className={
          photo.kind === "asset" ? styles.headerWithPhoto : styles.header
        }
      >
        <div className={styles.headerContent}>
          <h1 className={styles.name}>{document.header.fullName}</h1>
          <p className={styles.headline}>{document.header.professionalHeadline}</p>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>{document.header.location}</li>
            {document.header.contactMethods.map((contact) => (
              <li key={contact.href} className={styles.contactItem}>
                <a
                  aria-label={`${contact.label}: ${contact.value}`}
                  href={contact.href}
                >
                  {formatContactValue(contact)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {photo.kind === "asset" ? (
          <Image
            alt={photo.alt}
            className={styles.photo}
            height={160}
            src={photo.assetPath}
            unoptimized
            width={120}
          />
        ) : null}
      </header>
      <div aria-hidden="true" className={styles.rule} />
      {templateMetadata.layout === "two-column" ? (
        <div className={styles.twoColumnBody} data-cv-layout="two-column">
          <div className={styles.twoColumnSidebar} data-cv-column="sidebar">
            {renderSections(
              document.sectionOrder.filter((sectionKey) =>
                twoColumnSidebarSectionKeys.has(sectionKey),
              ),
              sections,
            )}
          </div>
          <div className={styles.twoColumnMain} data-cv-column="main">
            {renderSections(
              document.sectionOrder.filter(
                (sectionKey) => !twoColumnSidebarSectionKeys.has(sectionKey),
              ),
              sections,
            )}
          </div>
        </div>
      ) : (
        <div className={styles.sectionStack} data-cv-layout="single-column">
          {renderSections(document.sectionOrder, sections)}
        </div>
      )}
    </article>
  );
}

function renderSections(
  sectionOrder: readonly CvSectionKey[],
  sections: ReturnType<typeof buildDocumentSections>,
) {
  return sectionOrder.map((sectionKey) => (
    <Fragment key={sectionKey}>{sections[sectionKey]}</Fragment>
  ));
}

function getTemplatePhoto(
  photo: CvPhoto,
  template: CvTemplateVariant,
): CvPhoto {
  return cvTemplateMetadata[template].usesPhoto ? photo : { kind: "none" };
}
