import type { NextRequest } from "next/server";

import { parseCvPaperVariant } from "@/features/cv/domain/paperVariant";
import { parseCvTemplateVariant } from "@/features/cv/domain/cvTemplateVariant";
import {
  cvVersionMetadata,
  defaultCvVersion,
  parseCvVersion,
} from "@/features/cv/domain/cvVersion";
import { renderCvPdf } from "@/features/cv/server/renderCvPdf";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const paper = parseCvPaperVariant(request.nextUrl.searchParams.get("paper") ?? "");
  const versionQuery = request.nextUrl.searchParams.get("version");
  const version =
    versionQuery === null ? defaultCvVersion : parseCvVersion(versionQuery);
  const templateQuery = request.nextUrl.searchParams.get("template");
  const defaultTemplate = version ? cvVersionMetadata[version].defaultTemplate : null;
  const template =
    templateQuery === null ? defaultTemplate : parseCvTemplateVariant(templateQuery);

  if (!paper) {
    return Response.json(
      { error: "Unsupported paper query parameter." },
      { status: 400 },
    );
  }

  if (!version) {
    return Response.json(
      { error: "Unsupported version query parameter." },
      { status: 400 },
    );
  }

  if (!template) {
    return Response.json(
      { error: "Unsupported template query parameter." },
      { status: 400 },
    );
  }

  const pdf = await renderCvPdf({
    origin: request.nextUrl.origin,
    paper,
    template,
    version,
  });

  return new Response(new Uint8Array(pdf), {
    headers: {
      "content-disposition": `attachment; filename="${getCvPdfFilename(paper, version, template)}"`,
      "content-type": "application/pdf",
    },
    status: 200,
  });
}

function getCvPdfFilename(
  paper: "a4" | "letter",
  version: string,
  template: string,
) {
  return `cv-${paper}-${version}-${template}.pdf`;
}
