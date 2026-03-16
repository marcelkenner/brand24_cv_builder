import { chromium } from "playwright";

import {
  defaultCvLocale,
  type CvLocale,
} from "@/features/cv/domain/cvLocale";
import type { CvPaperVariant } from "@/features/cv/domain/paperVariant";
import type { CvTemplateVariant } from "@/features/cv/domain/cvTemplateVariant";
import {
  cvVersionMetadata,
  defaultCvVersion,
  type CvVersion,
} from "@/features/cv/domain/cvVersion";

import { getCvPaperFormat } from "./paperFormat";
import { cvPrintReadySelector } from "./printReady";

const defaultTimeoutMs = 30_000;

type RenderCvPdfOptions = {
  readonly locale?: CvLocale;
  readonly origin: string | URL;
  readonly paper: CvPaperVariant;
  readonly template?: CvTemplateVariant;
  readonly timeoutMs?: number;
  readonly version?: CvVersion;
};

export async function renderCvPdf({
  locale = defaultCvLocale,
  origin,
  paper,
  template,
  timeoutMs = defaultTimeoutMs,
  version = defaultCvVersion,
}: RenderCvPdfOptions): Promise<Buffer> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const resolvedTemplate = template ?? cvVersionMetadata[version].defaultTemplate;

  try {
    const page = await context.newPage();
    const printUrl = new URL(`/cv/${paper}`, origin);

    if (version !== defaultCvVersion) {
      printUrl.searchParams.set("version", version);
    }

    if (locale !== defaultCvLocale) {
      printUrl.searchParams.set("lang", locale);
    }

    if (resolvedTemplate !== cvVersionMetadata[version].defaultTemplate) {
      printUrl.searchParams.set("template", resolvedTemplate);
    }

    await page.emulateMedia({ media: "print" });

    const response = await page.goto(printUrl.toString(), {
      timeout: timeoutMs,
      waitUntil: "networkidle",
    });

    if (!response?.ok()) {
      const status = response?.status() ?? "unknown";

      throw new Error(`Failed to load CV print route: ${status}`);
    }

    await page.waitForSelector(cvPrintReadySelector, { timeout: timeoutMs });
    await page.evaluate(async () => {
      if (document.fonts.status !== "loaded") {
        await document.fonts.ready;
      }
    });

    const pdf = await page.pdf({
      format: getCvPaperFormat(paper),
      margin: {
        bottom: "0",
        left: "0",
        right: "0",
        top: "0",
      },
      preferCSSPageSize: true,
      printBackground: true,
    });

    if (pdf.byteLength === 0) {
      throw new Error("Generated CV PDF was empty.");
    }

    return pdf;
  } finally {
    await context.close();
    await browser.close();
  }
}
