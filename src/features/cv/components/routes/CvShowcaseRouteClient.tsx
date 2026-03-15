"use client";

import { useSearchParams } from "next/navigation";

import { resolveCvShowcaseRouteState } from "@/features/cv/domain/cvRouteState";

import { ResolvedCvShowcaseRoute } from "./CvShowcaseRouteContent";

export function CvShowcaseRouteClient() {
  const searchParams = useSearchParams();

  return <ResolvedCvShowcaseRoute state={resolveCvShowcaseRouteState(searchParams)} />;
}
