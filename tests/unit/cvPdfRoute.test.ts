import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const routeMocks = vi.hoisted(() => ({
  renderCvPdf: vi.fn(),
}));

vi.mock("@/features/cv/server/renderCvPdf", () => ({
  renderCvPdf: routeMocks.renderCvPdf,
}));

import { GET, runtime } from "@/app/api/cv-pdf/route";

describe("cvPdfRoute", () => {
  beforeEach(() => {
    routeMocks.renderCvPdf.mockReset();
  });

  it("forces the route onto the Node runtime", () => {
    expect(runtime).toBe("nodejs");
  });

  it("returns a PDF attachment for supported paper values", async () => {
    const pdfBytes = Buffer.from("%PDF phase 8");
    routeMocks.renderCvPdf.mockResolvedValue(pdfBytes);

    const response = await GET(
      new NextRequest(
        "https://cv.example/api/cv-pdf?paper=letter&version=leadership-stakeholder",
      ),
    );

    expect(routeMocks.renderCvPdf).toHaveBeenCalledWith({
      origin: "https://cv.example",
      paper: "letter",
      template: "two-column-with-photo",
      version: "leadership-stakeholder",
    });
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("application/pdf");
    expect(response.headers.get("content-disposition")).toBe(
      'attachment; filename="cv-letter-leadership-stakeholder-two-column-with-photo.pdf"',
    );
    expect(Buffer.from(await response.arrayBuffer())).toEqual(pdfBytes);
  });

  it("defaults the template when the query parameter is omitted", async () => {
    const pdfBytes = Buffer.from("%PDF default template");
    routeMocks.renderCvPdf.mockResolvedValue(pdfBytes);

    const response = await GET(
      new NextRequest("https://cv.example/api/cv-pdf?paper=a4"),
    );

    expect(routeMocks.renderCvPdf).toHaveBeenCalledWith({
      origin: "https://cv.example",
      paper: "a4",
      template: "single-column-with-photo",
      version: "ai-adoption-manager",
    });
    expect(response.headers.get("content-disposition")).toBe(
      'attachment; filename="cv-a4-ai-adoption-manager-single-column-with-photo.pdf"',
    );
  });

  it("rejects missing or unsupported paper, version, and template values with a 400 response", async () => {
    const missingPaperResponse = await GET(
      new NextRequest("https://cv.example/api/cv-pdf"),
    );
    const invalidPaperResponse = await GET(
      new NextRequest("https://cv.example/api/cv-pdf?paper=legal"),
    );
    const invalidVersionResponse = await GET(
      new NextRequest("https://cv.example/api/cv-pdf?paper=a4&version=manager"),
    );
    const invalidTemplateResponse = await GET(
      new NextRequest("https://cv.example/api/cv-pdf?paper=a4&template=grid"),
    );

    expect(routeMocks.renderCvPdf).not.toHaveBeenCalled();
    expect(missingPaperResponse.status).toBe(400);
    await expect(missingPaperResponse.json()).resolves.toEqual({
      error: "Unsupported paper query parameter.",
    });
    expect(invalidPaperResponse.status).toBe(400);
    await expect(invalidPaperResponse.json()).resolves.toEqual({
      error: "Unsupported paper query parameter.",
    });
    expect(invalidVersionResponse.status).toBe(400);
    await expect(invalidVersionResponse.json()).resolves.toEqual({
      error: "Unsupported version query parameter.",
    });
    expect(invalidTemplateResponse.status).toBe(400);
    await expect(invalidTemplateResponse.json()).resolves.toEqual({
      error: "Unsupported template query parameter.",
    });
  });
});
