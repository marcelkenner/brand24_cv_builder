import { Suspense } from "react";

import {
  CvShowcaseRouteClient,
} from "@/features/cv/components/routes/CvShowcaseRouteClient";
import {
  DefaultCvShowcaseRoute,
} from "@/features/cv/components/routes/CvShowcaseRouteContent";

export const dynamic = "force-static";

export default function Home() {
  return (
    <Suspense fallback={<DefaultCvShowcaseRoute />}>
      <CvShowcaseRouteClient />
    </Suspense>
  );
}
