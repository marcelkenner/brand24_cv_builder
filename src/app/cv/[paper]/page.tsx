import { notFound } from "next/navigation";

import { CvPrintDocument } from "@/features/cv/components/CvPrintDocument";
import { getCvDocument } from "@/features/cv/data/cvVersions";
import {
  cvPaperVariants,
  parseCvPaperVariant,
} from "@/features/cv/domain/paperVariant";
import { resolveCvTemplateVariant } from "@/features/cv/domain/cvTemplateVariant";
import {
  cvVersionMetadata,
  resolveCvVersion,
} from "@/features/cv/domain/cvVersion";

type CvPrintPageProps = {
  readonly params: Promise<{
    readonly paper: string;
  }>;
  readonly searchParams: Promise<{
    readonly template?: string | readonly string[];
    readonly version?: string | readonly string[];
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return cvPaperVariants.map((paper) => ({ paper }));
}

export default async function CvPrintPage({
  params,
  searchParams,
}: CvPrintPageProps) {
  const paper = parseCvPaperVariant((await params).paper);

  if (!paper) {
    notFound();
  }

  const resolvedSearchParams = await searchParams;
  const version = resolveCvVersion(resolvedSearchParams.version);
  const template = resolveCvTemplateVariant(
    resolvedSearchParams.template,
    cvVersionMetadata[version].defaultTemplate,
  );

  return (
    <CvPrintDocument
      document={getCvDocument(version)}
      paper={paper}
      template={template}
    />
  );
}
