import type { Mock } from "vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";

const playwrightMocks = vi.hoisted(() => ({
  launch: vi.fn(),
}));

vi.mock("playwright", () => ({
  chromium: {
    launch: playwrightMocks.launch,
  },
}));

import {
  renderCvPdf,
} from "@/features/cv/server/renderCvPdf";
import { cvPrintReadySelector } from "@/features/cv/server/printReady";

type MockPage = {
  readonly emulateMedia: Mock;
  readonly evaluate: Mock;
  readonly goto: Mock;
  readonly pdf: Mock;
  readonly waitForSelector: Mock;
};

type MockContext = {
  readonly close: Mock;
  readonly newPage: Mock;
};

type MockBrowser = {
  readonly close: Mock;
  readonly newContext: Mock;
};

type RenderHarness = {
  readonly browser: MockBrowser;
  readonly context: MockContext;
  readonly page: MockPage;
};

function createRenderHarness(pdfBytes: Buffer): RenderHarness {
  const page: MockPage = {
    emulateMedia: vi.fn().mockResolvedValue(undefined),
    evaluate: vi.fn().mockResolvedValue(undefined),
    goto: vi.fn().mockResolvedValue({
      ok: () => true,
      status: () => 200,
    }),
    pdf: vi.fn().mockResolvedValue(pdfBytes),
    waitForSelector: vi.fn().mockResolvedValue(undefined),
  };
  const context: MockContext = {
    close: vi.fn().mockResolvedValue(undefined),
    newPage: vi.fn().mockResolvedValue(page),
  };
  const browser: MockBrowser = {
    close: vi.fn().mockResolvedValue(undefined),
    newContext: vi.fn().mockResolvedValue(context),
  };

  playwrightMocks.launch.mockResolvedValue(browser);

  return { browser, context, page };
}

describe("renderCvPdf", () => {
  beforeEach(() => {
    playwrightMocks.launch.mockReset();
  });

  it.each([
    [
      "a4",
      "ai-adoption-manager",
      "single-column-with-photo",
      "A4",
      "https://cv.example/cv/a4",
    ],
    [
      "letter",
      "operations-transformation",
      "two-column-with-photo",
      "Letter",
      "https://cv.example/cv/letter?version=operations-transformation",
    ],
    [
      "letter",
      "operations-transformation",
      "single-column-with-photo",
      "Letter",
      "https://cv.example/cv/letter?version=operations-transformation&template=single-column-with-photo",
    ],
  ] as const)(
    "returns non-empty PDF bytes for %s",
    async (paper, version, template, format, expectedUrl) => {
      const pdfBytes = Buffer.from("%PDF phase 7");
      const { browser, context, page } = createRenderHarness(pdfBytes);

      await expect(
        renderCvPdf({
          origin: "https://cv.example/showcase?paper=letter",
          paper,
          template,
          timeoutMs: 4_000,
          version,
        }),
      ).resolves.toEqual(pdfBytes);

      expect(playwrightMocks.launch).toHaveBeenCalledWith({ headless: true });
      expect(browser.newContext).toHaveBeenCalledTimes(1);
      expect(context.newPage).toHaveBeenCalledTimes(1);
      expect(page.emulateMedia).toHaveBeenCalledWith({ media: "print" });
      expect(page.goto).toHaveBeenCalledWith(expectedUrl, {
        timeout: 4_000,
        waitUntil: "networkidle",
      });
      expect(page.waitForSelector).toHaveBeenCalledWith(cvPrintReadySelector, {
        timeout: 4_000,
      });
      expect(page.evaluate).toHaveBeenCalledTimes(1);
      expect(page.pdf).toHaveBeenCalledWith({
        format,
        margin: {
          bottom: "0",
          left: "0",
          right: "0",
          top: "0",
        },
        preferCSSPageSize: true,
        printBackground: true,
      });
      expect(context.close).toHaveBeenCalledTimes(1);
      expect(browser.close).toHaveBeenCalledTimes(1);
    },
  );

  it("rejects empty PDF output and still closes browser resources", async () => {
    const { browser, context } = createRenderHarness(Buffer.alloc(0));

    await expect(
      renderCvPdf({
        origin: "https://cv.example",
        paper: "a4",
      }),
    ).rejects.toThrow("Generated CV PDF was empty.");

    expect(context.close).toHaveBeenCalledTimes(1);
    expect(browser.close).toHaveBeenCalledTimes(1);
  });
});
