import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { access } from "node:fs/promises";
import { spawn, type ChildProcess } from "node:child_process";

import {
  getCvPdfAssetPath,
  getCvPdfFilename,
  getStaticCvPdfTargets,
} from "../src/features/cv/domain/cvPdfAsset";
import { renderCvPdf } from "../src/features/cv/server/renderCvPdf";

const staticServerPort = 4173;
const outDirectory = path.resolve(process.cwd(), "out");
const publicPdfDirectory = path.resolve(process.cwd(), "public/generated/cv-pdf");
const outPdfDirectory = path.resolve(process.cwd(), "out/generated/cv-pdf");

async function main() {
  await ensureBuildOutputExists();
  await recreateDirectory(publicPdfDirectory);
  await recreateDirectory(outPdfDirectory);

  const staticServer = startStaticServer();

  try {
    await waitForServer();

    for (const target of getStaticCvPdfTargets()) {
      const pdf = await renderCvPdf({
        origin: `http://127.0.0.1:${staticServerPort}`,
        paper: target.paper,
        template: target.template,
        version: target.version,
      });

      await writePdfCopies(target, pdf);
      process.stdout.write(`Generated ${getCvPdfFilename(target)}\n`);
    }
  } finally {
    staticServer.kill("SIGTERM");
  }
}

async function ensureBuildOutputExists() {
  try {
    await access(outDirectory);
  } catch {
    throw new Error("Run `npm run build` before generating static CV PDFs.");
  }
}

async function recreateDirectory(directory: string) {
  await rm(directory, { force: true, recursive: true });
  await mkdir(directory, { recursive: true });
}

function startStaticServer(): ChildProcess {
  return spawn(
    process.execPath,
    ["scripts/serve-static-out.mjs", "out", "--port", `${staticServerPort}`],
    {
      cwd: process.cwd(),
      stdio: "inherit",
    },
  );
}

async function waitForServer() {
  const deadline = Date.now() + 10_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(`http://127.0.0.1:${staticServerPort}/`);

      if (response.ok) {
        return;
      }
    } catch {
      await sleep(250);
    }
  }

  throw new Error("Timed out waiting for the static export preview server.");
}

async function writePdfCopies(
  target: Parameters<typeof getCvPdfAssetPath>[0],
  pdf: Buffer,
) {
  const relativePdfPath = getCvPdfAssetPath(target).replace(/^\//, "");

  await writeFile(path.join(process.cwd(), "public", relativePdfPath), pdf);
  await writeFile(path.join(process.cwd(), "out", relativePdfPath), pdf);
}

function sleep(timeoutMs: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, timeoutMs);
  });
}

void main().catch((error: unknown) => {
  process.stderr.write(
    error instanceof Error ? `${error.message}\n` : "Failed to generate static CV PDFs.\n",
  );
  process.exit(1);
});
