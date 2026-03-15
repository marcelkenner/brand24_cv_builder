import { planPrintPagination } from "@/features/cv/components/printPagination";

describe("planPrintPagination", () => {
  it("moves a whole section to the next page when its heading and first unit would spill", () => {
    const plan = planPrintPagination({
      continuationTopPx: 60,
      pageHeightPx: 1_120,
      sections: [
        {
          gapBeforePx: 180,
          headingHeightPx: 28,
          key: "summary",
          units: [{ gapBeforePx: 0, heightPx: 140, id: "summary-0" }],
        },
        {
          gapBeforePx: 16,
          headingHeightPx: 28,
          key: "education",
          units: [{ gapBeforePx: 0, heightPx: 900, id: "education-0" }],
        },
      ],
    });

    expect(plan.sections[1]).toMatchObject({
      key: "education",
      pageBreakBefore: true,
      pageIndex: 1,
    });
    expect(plan.sections[1]?.units[0]).toMatchObject({
      id: "education-0",
      pageBreakBefore: false,
      pageIndex: 1,
      showContinuationHeading: false,
    });
  });

  it("moves a whole role to the next page instead of splitting the role across pages", () => {
    const plan = planPrintPagination({
      continuationTopPx: 60,
      pageHeightPx: 1_120,
      sections: [
        {
          gapBeforePx: 180,
          headingHeightPx: 28,
          key: "experience",
          units: [
            { gapBeforePx: 0, heightPx: 624, id: "experience-0" },
            { gapBeforePx: 16, heightPx: 320, id: "experience-1" },
          ],
        },
      ],
    });

    expect(plan.sections[0]?.pageBreakBefore).toBe(false);
    expect(plan.sections[0]?.units).toEqual([
      {
        id: "experience-0",
        pageBreakBefore: false,
        pageIndex: 0,
        showContinuationHeading: false,
      },
      {
        id: "experience-1",
        pageBreakBefore: true,
        pageIndex: 1,
        showContinuationHeading: true,
      },
    ]);
  });

  it("continues the section across later pages while keeping each role atomic", () => {
    const plan = planPrintPagination({
      continuationTopPx: 60,
      pageHeightPx: 1_000,
      sections: [
        {
          gapBeforePx: 160,
          headingHeightPx: 28,
          key: "experience",
          units: [
            { gapBeforePx: 0, heightPx: 580, id: "experience-0" },
            { gapBeforePx: 16, heightPx: 420, id: "experience-1" },
            { gapBeforePx: 16, heightPx: 360, id: "experience-2" },
          ],
        },
      ],
    });

    expect(plan.sections[0]?.units).toEqual([
      {
        id: "experience-0",
        pageBreakBefore: false,
        pageIndex: 0,
        showContinuationHeading: false,
      },
      {
        id: "experience-1",
        pageBreakBefore: true,
        pageIndex: 1,
        showContinuationHeading: true,
      },
      {
        id: "experience-2",
        pageBreakBefore: false,
        pageIndex: 1,
        showContinuationHeading: false,
      },
    ]);
  });
});
