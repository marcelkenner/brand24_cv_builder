"use client";

import { useSearchParams } from "next/navigation";

import { resolveCvPrintRouteState, type CvPrintRouteState } from "@/features/cv/domain/cvRouteState";
import type { CvPaperVariant } from "@/features/cv/domain/paperVariant";

import { ResolvedCvPrintRoute } from "./CvPrintRouteContent";

export function CvPrintRouteClient({
  paper,
}: {
  readonly paper: CvPaperVariant;
}) {
  const searchParams = useSearchParams();
  const state: CvPrintRouteState = resolveCvPrintRouteState(searchParams);

  return <ResolvedCvPrintRoute paper={paper} state={state} />;
}
