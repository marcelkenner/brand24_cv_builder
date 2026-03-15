import { getDocumentStyle } from "@/features/cv/components/cvDocumentStyle";

describe("getDocumentStyle", () => {
  it("keeps A4 aligned to the master layout spacing and margins", () => {
    expect(getDocumentStyle("a4")).toMatchObject({
      "--cv-document-entry-gap": "12pt",
      "--cv-document-margin-bottom": "16mm",
      "--cv-document-margin-top": "16mm",
      "--cv-document-rule-margin-bottom": "16pt",
      "--cv-document-rule-margin-top": "12pt",
      "--cv-document-section-gap": "16px",
      "--cv-document-width": "210mm",
    });
  });

  it("tightens Letter vertically instead of relying on auto-scaling", () => {
    expect(getDocumentStyle("letter")).toMatchObject({
      "--cv-document-entry-gap": "8pt",
      "--cv-document-margin-bottom": "14mm",
      "--cv-document-margin-top": "14mm",
      "--cv-document-rule-margin-bottom": "12pt",
      "--cv-document-rule-margin-top": "8pt",
      "--cv-document-section-gap": "12px",
      "--cv-document-width": "8.5in",
    });
  });
});
