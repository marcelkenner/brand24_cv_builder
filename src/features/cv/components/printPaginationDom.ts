import type {
  PlannedPrintSection,
  PlannedPrintUnit,
  PrintLayoutSection,
  PrintLayoutUnit,
} from "./printPagination";

export function applyPaginationPlanToDom(
  articleElement: HTMLElement,
  plannedSections: readonly PlannedPrintSection[],
) {
  const sectionElements = getSectionElements(articleElement);

  for (const sectionElement of sectionElements) {
    sectionElement.dataset.pageBreakBefore = "false";
    sectionElement.dataset.cvPageIndex = "";
  }

  for (const unitElement of getUnitElements(articleElement)) {
    unitElement.dataset.pageBreakBefore = "false";
    unitElement.dataset.cvContinuationHeading = "false";
    unitElement.dataset.cvPageIndex = "";
  }

  for (const plannedSection of plannedSections) {
    const sectionElement = articleElement.querySelector<HTMLElement>(
      `[data-cv-section="${plannedSection.key}"]`,
    );

    if (!sectionElement) {
      continue;
    }

    sectionElement.dataset.pageBreakBefore = plannedSection.pageBreakBefore
      ? "true"
      : "false";
    sectionElement.dataset.cvPageIndex = String(plannedSection.pageIndex);

    for (const plannedUnit of plannedSection.units) {
      applyUnitPlan(articleElement, plannedUnit);
    }
  }
}

export function measureSectionsFromDom(articleElement: HTMLElement): readonly PrintLayoutSection[] {
  const articleTopPx = articleElement.getBoundingClientRect().top;
  const sectionElements = getSectionElements(articleElement);
  const measuredSections: PrintLayoutSection[] = [];
  let previousSectionBottomPx = 0;

  for (const sectionElement of sectionElements) {
    const sectionKey = sectionElement.dataset.cvSection;
    const headingElement = sectionElement.querySelector<HTMLElement>(
      "[data-cv-section-heading]",
    );
    const unitElements = getUnitElements(sectionElement);

    if (!sectionKey || !headingElement || unitElements.length === 0) {
      continue;
    }

    const headingBox = getRelativeBox(headingElement, articleTopPx);
    const unitBoxes = unitElements.map((unitElement) =>
      getMeasuredUnit(unitElement, articleTopPx),
    );
    const firstUnitTopPx = unitBoxes[0].topPx;
    const lastUnitBox = unitBoxes[unitBoxes.length - 1];
    const lastUnitBottomPx = lastUnitBox.topPx + lastUnitBox.heightPx;

    measuredSections.push({
      gapBeforePx:
        measuredSections.length === 0
          ? headingBox.topPx
          : headingBox.topPx - previousSectionBottomPx,
      headingHeightPx: firstUnitTopPx - headingBox.topPx,
      key: sectionKey,
      units: unitBoxes.map((unitBox, unitIndex) => ({
        gapBeforePx:
          unitIndex === 0
            ? 0
            : unitBox.topPx - (unitBoxes[unitIndex - 1].topPx + unitBoxes[unitIndex - 1].heightPx),
        heightPx: unitBox.heightPx,
        id: unitBox.id,
      })) as [PrintLayoutUnit, ...PrintLayoutUnit[]],
    });

    previousSectionBottomPx = lastUnitBottomPx;
  }

  return measuredSections;
}

export function resetPaginationDom(articleElement: HTMLElement) {
  for (const sectionElement of getSectionElements(articleElement)) {
    sectionElement.dataset.pageBreakBefore = "false";
    sectionElement.dataset.cvPageIndex = "";
  }

  for (const unitElement of getUnitElements(articleElement)) {
    unitElement.dataset.pageBreakBefore = "false";
    unitElement.dataset.cvContinuationHeading = "false";
    unitElement.dataset.cvPageIndex = "";
  }
}

function applyUnitPlan(articleElement: HTMLElement, plannedUnit: PlannedPrintUnit) {
  const unitElement = articleElement.querySelector<HTMLElement>(
    `[data-cv-unit="${plannedUnit.id}"]`,
  );

  if (!unitElement) {
    return;
  }

  unitElement.dataset.pageBreakBefore = plannedUnit.pageBreakBefore ? "true" : "false";
  unitElement.dataset.cvContinuationHeading = plannedUnit.showContinuationHeading
    ? "true"
    : "false";
  unitElement.dataset.cvPageIndex = String(plannedUnit.pageIndex);
}

function getMeasuredUnit(unitElement: HTMLElement, articleTopPx: number) {
  const unitBox = getRelativeBox(unitElement, articleTopPx);
  const unitId = unitElement.dataset.cvUnit;

  if (!unitId) {
    throw new Error("Printable unit is missing data-cv-unit.");
  }

  return {
    heightPx: unitBox.heightPx,
    id: unitId,
    topPx: unitBox.topPx,
  };
}

function getRelativeBox(element: HTMLElement, rootTopPx: number) {
  const rect = element.getBoundingClientRect();

  return {
    heightPx: rect.height,
    topPx: rect.top - rootTopPx,
  };
}

function getSectionElements(articleElement: HTMLElement) {
  return Array.from(articleElement.querySelectorAll<HTMLElement>("[data-cv-section]"));
}

function getUnitElements(rootElement: HTMLElement) {
  return Array.from(rootElement.querySelectorAll<HTMLElement>("[data-cv-unit]"));
}
