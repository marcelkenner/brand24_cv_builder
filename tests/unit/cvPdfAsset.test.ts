import {
  getCvPdfAssetPath,
  getCvPdfFilename,
  getStaticCvPdfTargets,
} from "@/features/cv/domain/cvPdfAsset";

describe("cvPdfAsset", () => {
  it("builds deterministic static PDF filenames and asset paths", () => {
    const target = {
      locale: "pl",
      paper: "letter",
      template: "two-column-with-photo",
      version: "leadership-stakeholder",
    } as const;

    expect(getCvPdfFilename(target)).toBe(
      "cv-letter-leadership-stakeholder-two-column-with-photo-pl.pdf",
    );
    expect(getCvPdfAssetPath(target)).toBe(
      "/generated/cv-pdf/cv-letter-leadership-stakeholder-two-column-with-photo-pl.pdf",
    );
  });

  it("enumerates every supported static export target", () => {
    expect(getStaticCvPdfTargets()).toHaveLength(64);
  });
});
