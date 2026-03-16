import { getCvDocument } from "@/features/cv/data/cvVersions";
import {
  defaultCvShowcaseRouteState,
  type CvShowcaseRouteState,
} from "@/features/cv/domain/cvRouteState";

import { CvShowcasePage } from "../CvShowcasePage";

export function DefaultCvShowcaseRoute() {
  return <ResolvedCvShowcaseRoute state={defaultCvShowcaseRouteState} />;
}

export function ResolvedCvShowcaseRoute({
  state,
}: {
  readonly state: CvShowcaseRouteState;
}) {
  return (
    <CvShowcasePage
      document={getCvDocument(state.version, state.locale)}
      locale={state.locale}
      paper={state.paper}
      template={state.template}
      version={state.version}
    />
  );
}
