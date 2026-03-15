import {
  getCvPdfAssetPath,
  getCvPdfFilename,
  getStaticCvPdfTargets,
} from "@/features/cv/domain/cvPdfAsset";

describe("cvPdfAsset", () => {
  it("builds deterministic static PDF filenames and asset paths", () => {
    const target = {
      paper: "letter",
      template: "two-column-with-photo",
      version: "leadership-stakeholder",
    } as const;

    expect(getCvPdfFilename(target)).toBe(
      "cv-letter-leadership-stakeholder-two-column-with-photo.pdf",
    );
    expect(getCvPdfAssetPath(target)).toBe(
      "/generated/cv-pdf/cv-letter-leadership-stakeholder-two-column-with-photo.pdf",
    );
  });

  it("enumerates every supported static export target", () => {
    expect(getStaticCvPdfTargets()).toHaveLength(32);
  });
});
