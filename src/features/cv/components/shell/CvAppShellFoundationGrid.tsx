import { cvDesignTokens } from "@/features/cv/config/designTokens";
import { projectOverview } from "@/features/cv/data/projectOverview";
import { cvPaperMetadata, cvPaperVariants } from "@/features/cv/domain/paperVariant";

import { CvSectionHeading } from "./CvSectionHeading";

export function CvAppShellFoundationGrid() {
  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(18rem,1fr)]">
      <FoundationSection />
      <aside className="flex flex-col gap-6">
        <TokensSection />
        <ReferenceFilesSection />
      </aside>
    </section>
  );
}

function FoundationSection() {
  return (
    <article className="rounded-[28px] border border-rule bg-surface p-6 sm:p-8">
      <CvSectionHeading
        eyebrow="Ready"
        title="Current foundation"
        description="Phase 0 and Phase 1 are now backed by the typed sample document added in Phase 2."
      />
      <ul className="mt-6 grid gap-3">
        {projectOverview.completedFoundations.map((item) => (
          <li
            key={item}
            className="rounded-2xl border border-rule px-4 py-3 text-sm leading-6 text-text"
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {cvPaperVariants.map((paper) => (
          <PaperVariantCard key={paper} paper={paper} />
        ))}
      </div>
    </article>
  );
}

function PaperVariantCard({ paper }: { readonly paper: (typeof cvPaperVariants)[number] }) {
  const metadata = cvPaperMetadata[paper];
  const frame = cvDesignTokens.paperFrames[paper];

  return (
    <div className="rounded-2xl border border-rule px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        {metadata.label}
      </p>
      <p className="mt-3 text-lg font-semibold text-text">{metadata.dimensions}</p>
      <p className="mt-2 text-sm leading-6 text-muted">
        Preview frame: {frame.width} × {frame.height}
      </p>
      <p className="text-sm leading-6 text-muted">
        Print route: {`/cv/${paper}`}
      </p>
    </div>
  );
}

function TokensSection() {
  return (
    <article className="rounded-[28px] border border-rule bg-surface p-6">
      <CvSectionHeading
        title="Active tokens"
        description="These values stay aligned with the brief and now sit under feature-owned config."
      />
      <dl className="mt-5 grid gap-4 text-sm">
        <TokenRow label="Name size" value={cvDesignTokens.typography.nameSize} />
        <TokenRow label="Body size" value={cvDesignTokens.typography.bodySize} />
        <TokenRow label="Accent color" value={cvDesignTokens.colors.accent} />
        <TokenRow
          label="A4 margins"
          value={`${cvDesignTokens.margins.top} / ${cvDesignTokens.margins.right} / ${cvDesignTokens.margins.bottom} / ${cvDesignTokens.margins.left}`}
        />
      </dl>
    </article>
  );
}

function TokenRow({
  label,
  value,
}: {
  readonly label: string;
  readonly value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-rule pb-4 last:border-b-0 last:pb-0">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-semibold text-text">{value}</dd>
    </div>
  );
}

function ReferenceFilesSection() {
  return (
    <article className="rounded-[28px] border border-rule bg-surface p-6">
      <CvSectionHeading
        title="Reference files"
        description="These are the active inputs for the typed content and the next rendering phase."
      />
      <ul className="mt-4 grid gap-2 text-sm leading-6 text-muted">
        {projectOverview.referenceDocs.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
