const boundaryEpsilonPx = 0.01;

export type PrintLayoutUnit = {
  readonly gapBeforePx: number;
  readonly heightPx: number;
  readonly id: string;
};

export type PrintLayoutSection = {
  readonly gapBeforePx: number;
  readonly headingHeightPx: number;
  readonly key: string;
  readonly units: readonly [PrintLayoutUnit, ...PrintLayoutUnit[]];
};

export type PrintPaginationInput = {
  readonly continuationTopPx: number;
  readonly pageHeightPx: number;
  readonly sections: readonly [PrintLayoutSection, ...PrintLayoutSection[]];
};

export type PlannedPrintUnit = {
  readonly id: string;
  readonly pageBreakBefore: boolean;
  readonly pageIndex: number;
  readonly showContinuationHeading: boolean;
};

export type PlannedPrintSection = {
  readonly key: string;
  readonly pageBreakBefore: boolean;
  readonly pageIndex: number;
  readonly units: readonly PlannedPrintUnit[];
};

export type PrintPaginationPlan = {
  readonly sections: readonly PlannedPrintSection[];
};

export function planPrintPagination({
  continuationTopPx,
  pageHeightPx,
  sections,
}: PrintPaginationInput): PrintPaginationPlan {
  const plannedSections: PlannedPrintSection[] = [];
  let cursorPx = 0;

  for (const section of sections) {
    let sectionStartPx = cursorPx + section.gapBeforePx;
    let sectionPageBreakBefore = false;
    const [firstUnit, ...remainingUnits] = section.units;
    const minimumSectionStartHeight = section.headingHeightPx + firstUnit.heightPx;

    if (
      overflowsPage(sectionStartPx, minimumSectionStartHeight, pageHeightPx) &&
      continuationTopPx + minimumSectionStartHeight <= pageHeightPx
    ) {
      sectionStartPx =
        getNextPageIndex(sectionStartPx, pageHeightPx) * pageHeightPx + continuationTopPx;
      sectionPageBreakBefore = true;
    }

    let currentPageIndex = getPageIndex(sectionStartPx, pageHeightPx);
    let unitBottomPx = sectionStartPx + section.headingHeightPx;
    const plannedUnits: PlannedPrintUnit[] = [
      {
        id: firstUnit.id,
        pageBreakBefore: false,
        pageIndex: currentPageIndex,
        showContinuationHeading: false,
      },
    ];

    unitBottomPx += firstUnit.heightPx;

    for (const unit of remainingUnits) {
      const naturalStartPx = unitBottomPx + unit.gapBeforePx;

      if (overflowsPage(naturalStartPx, unit.heightPx, pageHeightPx)) {
        currentPageIndex = getNextPageIndex(naturalStartPx, pageHeightPx);
        unitBottomPx =
          currentPageIndex * pageHeightPx +
          continuationTopPx +
          section.headingHeightPx +
          unit.heightPx;
        plannedUnits.push({
          id: unit.id,
          pageBreakBefore: true,
          pageIndex: currentPageIndex,
          showContinuationHeading: true,
        });
        continue;
      }

      currentPageIndex = getPageIndex(naturalStartPx, pageHeightPx);
      unitBottomPx = naturalStartPx + unit.heightPx;
      plannedUnits.push({
        id: unit.id,
        pageBreakBefore: false,
        pageIndex: currentPageIndex,
        showContinuationHeading: false,
      });
    }

    cursorPx = unitBottomPx;
    plannedSections.push({
      key: section.key,
      pageBreakBefore: sectionPageBreakBefore,
      pageIndex: getPageIndex(sectionStartPx, pageHeightPx),
      units: plannedUnits,
    });
  }

  return {
    sections: plannedSections,
  };
}

function getNextPageIndex(positionPx: number, pageHeightPx: number) {
  return getPageIndex(positionPx, pageHeightPx) + 1;
}

function getPageIndex(positionPx: number, pageHeightPx: number) {
  return Math.floor(positionPx / pageHeightPx);
}

function overflowsPage(startPx: number, heightPx: number, pageHeightPx: number) {
  return (
    getPageIndex(startPx, pageHeightPx) !==
    getPageIndex(startPx + heightPx - boundaryEpsilonPx, pageHeightPx)
  );
}
