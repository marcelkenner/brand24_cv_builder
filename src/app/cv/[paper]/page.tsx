import { Suspense } from "react";
import { notFound } from "next/navigation";

import { CvPrintRouteClient } from "@/features/cv/components/routes/CvPrintRouteClient";
import { DefaultCvPrintRoute } from "@/features/cv/components/routes/CvPrintRouteContent";
import {
  cvPaperVariants,
  parseCvPaperVariant,
} from "@/features/cv/domain/paperVariant";

type CvPrintPageProps = {
  readonly params: Promise<{
    readonly paper: string;
  }>;
};

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams() {
  return cvPaperVariants.map((paper) => ({ paper }));
}

export default async function CvPrintPage({ params }: CvPrintPageProps) {
  const paper = parseCvPaperVariant((await params).paper);

  if (!paper) {
    notFound();
  }

  return (
    <Suspense fallback={<DefaultCvPrintRoute paper={paper} />}>
      <CvPrintRouteClient paper={paper} />
    </Suspense>
  );
}
