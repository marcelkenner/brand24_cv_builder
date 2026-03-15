import { CvDocument } from "@/features/cv/components/CvDocument";
import { sampleCvDocument } from "@/features/cv/data/sampleCvDocument";
import { cvPaperMetadata } from "@/features/cv/domain/paperVariant";
import { defaultCvTemplateVariant } from "@/features/cv/domain/cvTemplateVariant";

import { CvSectionHeading } from "./CvSectionHeading";

const previewPaper = sampleCvDocument.supportedPapers[0];

export function CvAppShellPreview() {
  return (
    <section className="rounded-[28px] border border-rule bg-surface p-6 sm:p-8">
      <CvSectionHeading
        eyebrow="Phase 3"
        title="Shared document preview"
        description="The printable CV now renders directly inside the app through one shared component, with the full checked-in template system driven by one Marcel source document."
      />
      <div className="mt-5 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        <span className="rounded-full border border-rule px-3 py-1.5">
          {cvPaperMetadata[previewPaper].label}
        </span>
        <span className="rounded-full border border-rule px-3 py-1.5">
          {defaultCvTemplateVariant}
        </span>
        <span className="rounded-full border border-rule px-3 py-1.5">
          Semantic text layout
        </span>
      </div>
      <div className="mt-6 rounded-[24px] border border-rule bg-app-background p-3 sm:p-5">
        <CvDocument
          document={sampleCvDocument}
          paper={previewPaper}
          template={defaultCvTemplateVariant}
        />
      </div>
    </section>
  );
}
