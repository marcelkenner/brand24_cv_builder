"use client";

import { useEffect, useRef } from "react";

import type { CvDocument as CvDocumentModel } from "@/features/cv/domain/cvDocument";
import {
  defaultCvLocale,
  type CvLocale,
} from "@/features/cv/domain/cvLocale";
import type { CvPaperVariant } from "@/features/cv/domain/paperVariant";
import { cvTemplateMetadata, type CvTemplateVariant } from "@/features/cv/domain/cvTemplateVariant";
import { cvPrintReadyAttribute } from "@/features/cv/server/printReady";

import { CvDocument } from "./CvDocument";
import { planPrintPagination } from "./printPagination";
import {
  applyPaginationPlanToDom,
  measureSectionsFromDom,
  resetPaginationDom,
} from "./printPaginationDom";

type CvPrintDocumentProps = {
  readonly document: CvDocumentModel;
  readonly locale?: CvLocale;
  readonly paper: CvPaperVariant;
  readonly template: CvTemplateVariant;
};

export function CvPrintDocument({
  document,
  locale = defaultCvLocale,
  paper,
  template,
}: CvPrintDocumentProps) {
  const mainRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isActive = true;

    async function applyPagination() {
      const mainElement = mainRef.current;
      const containerElement = containerRef.current;

      if (!mainElement || !containerElement) {
        return;
      }

      mainElement.setAttribute(cvPrintReadyAttribute, "false");
      await waitForFonts();

      if (!isActive) {
        return;
      }

      if (cvTemplateMetadata[template].layout === "two-column") {
        mainElement.setAttribute(cvPrintReadyAttribute, "true");
        return;
      }

      const articleElement = containerElement.querySelector<HTMLElement>(
        '[data-cv-document="true"]',
      );

      if (!articleElement) {
        mainElement.setAttribute(cvPrintReadyAttribute, "true");
        return;
      }

      resetPaginationDom(articleElement);
      await waitForAnimationFrame();

      if (!isActive) {
        return;
      }

      const computedStyle = getComputedStyle(articleElement);
      const pageHeightPx = measureCssLengthPx(
        articleElement,
        computedStyle.getPropertyValue("--cv-document-height"),
      );
      const continuationTopPx = measureCssLengthPx(
        articleElement,
        computedStyle.getPropertyValue("--cv-document-margin-top"),
      );
      const measuredSections = measureSectionsFromDom(articleElement);

      if (measuredSections.length === 0) {
        mainElement.setAttribute(cvPrintReadyAttribute, "true");
        return;
      }

      const [firstSection, ...remainingSections] = measuredSections;
      const paginationPlan = planPrintPagination({
        continuationTopPx,
        pageHeightPx,
        sections: [firstSection, ...remainingSections],
      });

      applyPaginationPlanToDom(articleElement, paginationPlan.sections);

      await waitForAnimationFrame();

      if (!isActive) {
        return;
      }

      mainElement.setAttribute(cvPrintReadyAttribute, "true");
    }

    void applyPagination();

    return () => {
      isActive = false;
    };
  }, [document.id, locale, paper, template]);

  return (
    <main
      ref={mainRef}
      className="min-h-screen bg-app-background px-4 py-6 print:min-h-0 print:bg-white print:p-0"
      {...{ [cvPrintReadyAttribute]: "false" }}
    >
      <div ref={containerRef} className="mx-auto flex w-full justify-center print:block">
        <CvDocument
          document={document}
          locale={locale}
          paper={paper}
          template={template}
        />
      </div>
    </main>
  );
}

async function waitForFonts() {
  if ("fonts" in document) {
    await document.fonts.ready;
  }
}

function waitForAnimationFrame() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

function measureCssLengthPx(anchorElement: HTMLElement, cssLength: string) {
  const probe = document.createElement("div");

  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.inlineSize = cssLength.trim();
  anchorElement.append(probe);

  const measuredPx = probe.getBoundingClientRect().width;

  probe.remove();

  return measuredPx;
}
