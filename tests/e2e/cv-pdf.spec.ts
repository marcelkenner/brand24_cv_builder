import { expect, test } from "@playwright/test";

const pdfVariants = [
  {
    path: "/generated/cv-pdf/cv-a4-ai-adoption-manager-single-column-with-photo.pdf",
  },
  {
    path: "/generated/cv-pdf/cv-a4-ats-friendly-general-single-column-with-photo.pdf",
  },
  {
    path: "/generated/cv-pdf/cv-a4-leadership-stakeholder-two-column-with-photo.pdf",
  },
  {
    path: "/generated/cv-pdf/cv-letter-operations-transformation-two-column-with-photo.pdf",
  },
  {
    path: "/generated/cv-pdf/cv-a4-ai-adoption-manager-single-column-with-photo-pl.pdf",
  },
  {
    path: "/generated/cv-pdf/cv-letter-operations-transformation-two-column-with-photo-pl.pdf",
  },
] as const;

test.describe("static cv pdf assets", () => {
  for (const variant of pdfVariants) {
    test(
      `serves a real PDF for ${variant.path}`,
      async ({
        request,
      }) => {
      const response = await request.get(variant.path);

      expect(response.ok()).toBeTruthy();
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("application/pdf");

      const body = await response.body();

      expect(body.byteLength).toBeGreaterThan(1_000);
      expect(body.subarray(0, 4).toString("utf8")).toBe("%PDF");
      },
    );
  }
});
