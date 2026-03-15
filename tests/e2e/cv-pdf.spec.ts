import { expect, test } from "@playwright/test";

const pdfVariants = [
  {
    expectedFilename:
      'attachment; filename="cv-a4-ai-adoption-manager-single-column-with-photo.pdf"',
    paper: "a4",
    template: null,
    version: null,
  },
  {
    expectedFilename:
      'attachment; filename="cv-a4-ats-friendly-general-single-column-with-photo.pdf"',
    paper: "a4",
    template: null,
    version: "ats-friendly-general",
  },
  {
    expectedFilename:
      'attachment; filename="cv-a4-leadership-stakeholder-two-column-with-photo.pdf"',
    paper: "a4",
    template: null,
    version: "leadership-stakeholder",
  },
  {
    expectedFilename:
      'attachment; filename="cv-letter-operations-transformation-two-column-with-photo.pdf"',
    paper: "letter",
    template: null,
    version: "operations-transformation",
  },
] as const;

test.describe("cv pdf route", () => {
  for (const variant of pdfVariants) {
    test(
      `downloads a real PDF for ${variant.paper} ${variant.version ?? "default"} ${variant.template ?? "default-template"}`,
      async ({
        request,
      }) => {
      const params = new URLSearchParams({ paper: variant.paper });

      if (variant.version) {
        params.set("version", variant.version);
      }

      if (variant.template) {
        params.set("template", variant.template);
      }

      const response = await request.get(`/api/cv-pdf?${params.toString()}`);

      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("application/pdf");
      expect(response.headers()["content-disposition"]).toBe(
        variant.expectedFilename,
      );

      const body = await response.body();

      expect(body.byteLength).toBeGreaterThan(1_000);
      expect(body.subarray(0, 4).toString("utf8")).toBe("%PDF");
      },
    );
  }
});
