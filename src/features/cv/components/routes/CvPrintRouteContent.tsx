import { CvPrintDocument } from "@/features/cv/components/CvPrintDocument";
import { getCvDocument } from "@/features/cv/data/cvVersions";
import type { CvPaperVariant } from "@/features/cv/domain/paperVariant";
import {
  defaultCvPrintRouteState,
  type CvPrintRouteState,
} from "@/features/cv/domain/cvRouteState";

export function DefaultCvPrintRoute({
  paper,
}: {
  readonly paper: CvPaperVariant;
}) {
  return <ResolvedCvPrintRoute paper={paper} state={defaultCvPrintRouteState} />;
}

export function ResolvedCvPrintRoute({
  paper,
  state,
}: {
  readonly paper: CvPaperVariant;
  readonly state: CvPrintRouteState;
}) {
  return (
    <CvPrintDocument
      document={getCvDocument(state.version)}
      paper={paper}
      template={state.template}
    />
  );
}
