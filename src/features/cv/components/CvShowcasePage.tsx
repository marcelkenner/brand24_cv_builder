import { cvDesignTokens } from "@/features/cv/config/designTokens";
import {
  ArrowDownTrayIcon,
  BriefcaseIcon,
  CalendarDaysIcon,
  ClockIcon,
  DocumentTextIcon,
  EyeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import {
  homepageBuildOrigin,
  homepageBuildFixes,
  homepageDemonstrates,
  homepageFlowSummary,
  homepageFlowSteps,
  homepageVariants,
} from "@/features/cv/data/showcaseHomepage";
import type { CvDocument as CvDocumentModel } from "@/features/cv/domain/cvDocument";
import {
  cvPaperMetadata,
  type CvPaperVariant,
} from "@/features/cv/domain/paperVariant";
import type { CvTemplateVariant } from "@/features/cv/domain/cvTemplateVariant";
import {
  cvVersionMetadata,
  type CvVersion,
} from "@/features/cv/domain/cvVersion";

import { CvDocument } from "./CvDocument";
import {
  HeroSection,
  Metric,
  SectionBand,
  WorkspaceSelectorButton,
} from "./showcase/CvShowcaseSections";
import {
  ExternalReferenceIcon,
  getDemonstratesIcon,
  getFixDetailIcon,
} from "./showcase/showcaseIconography";
import {
  getDownloadHref,
  getPrintHref,
  getShowcaseHref,
} from "./showcase/showcaseLinks";

type CvShowcasePageProps = {
  readonly document: CvDocumentModel;
  readonly paper: CvPaperVariant;
  readonly template: CvTemplateVariant;
  readonly version: CvVersion;
};

export function CvShowcasePage({
  document,
  paper,
  template,
  version,
}: CvShowcasePageProps) {
  const frame = cvDesignTokens.paperFrames[paper];
  const selectedPaper = cvPaperMetadata[paper];
  const selectedVariant =
    homepageVariants.find((variant) => variant.version === version) ??
    homepageVariants[0];

  return (
    <main className="min-h-screen bg-[#f7f5f1] px-4 py-6 text-text sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-[88rem] flex-col gap-10">
        <HeroSection
          downloadHref={getDownloadHref(paper, version, template)}
          recruiterTitle={selectedVariant.recruiterTitle}
        />
        <div className="min-w-0">
          <WorkspaceSection
            document={document}
            frameWidth={frame.width}
            paper={paper}
            selectedPaper={selectedPaper}
            selectedVariant={selectedVariant}
            template={template}
            version={version}
          />
          <DemonstratesSection />
          <BuildOriginSection />
          <HowItWorksSection />
          <BuildFixesSection />
        </div>
      </div>
    </main>
  );
}

function WorkspaceSection({
  document,
  frameWidth,
  paper,
  selectedPaper,
  selectedVariant,
  template,
  version,
}: {
  readonly document: CvDocumentModel;
  readonly frameWidth: string;
  readonly paper: CvPaperVariant;
  readonly selectedPaper: (typeof cvPaperMetadata)[CvPaperVariant];
  readonly selectedVariant: (typeof homepageVariants)[number];
  readonly template: CvTemplateVariant;
  readonly version: CvVersion;
}) {
  return (
    <section id="workspace" className="border-t border-black/8 pt-14 first:border-t-0 first:pt-0">
      <div className="grid gap-6 xl:grid-cols-[19rem_minmax(0,1fr)]">
        <aside className="rounded-[28px] bg-black/[0.035] p-4 xl:sticky xl:top-8 xl:h-fit">
          <p className="px-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-accent">
            CV workspace
          </p>
          <h2 className="px-2 pt-3 text-2xl font-semibold tracking-[-0.04em] text-text">
            Choose the recruiter view
          </h2>
          <p className="px-2 pt-3 text-sm leading-6 text-text/72">
            Use the selector like a document workspace, not a product grid.
            Each version changes framing, scan speed, and delivery context while
            preserving the same verified source profile.
          </p>
          <div className="mt-5 grid gap-2">
            {homepageVariants.map((variant) => (
              <WorkspaceSelectorButton
                key={variant.version}
                active={variant.version === version}
                description={variant.bestUseCase}
                href={getShowcaseHref(
                  paper,
                  variant.version,
                  cvVersionMetadata[variant.version].defaultTemplate,
                )}
                label={variant.recruiterTitle}
              />
            ))}
          </div>
        </aside>

        <section className="min-w-0 rounded-[32px] bg-white px-4 py-4 shadow-[0_20px_60px_rgba(34,34,34,0.08)] sm:px-6 sm:py-6">
          <div className="rounded-[24px] bg-[#faf8f4] px-4 py-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-accent">
                  {selectedVariant.recruiterTitle}
                </p>
                <h3 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-text">
                  {selectedVariant.targetRole}
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-text/72">
                  {selectedVariant.difference}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 lg:justify-end">
                <a
                  className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-4 py-2.5 text-sm font-semibold text-text shadow-[0_8px_18px_rgba(34,34,34,0.05)] transition-all hover:-translate-y-px hover:border-black/14 hover:bg-[#fffdfa] hover:shadow-[0_12px_24px_rgba(34,34,34,0.08)]"
                  href={getPrintHref(paper, version, template)}
                  rel="noreferrer"
                  target="_blank"
                >
                  <EyeIcon aria-hidden="true" className="size-4 shrink-0 text-text/72" />
                  <span>View online</span>
                  <span
                    aria-hidden="true"
                    className="rounded-full bg-black/[0.05] px-1.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-text/68"
                  >
                    Live
                  </span>
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#8a1538_0%,#b11f4a_100%)] px-4 py-2.5 text-sm font-semibold !text-white visited:!text-white hover:-translate-y-px hover:!text-white focus-visible:!text-white shadow-[0_10px_22px_rgba(138,21,56,0.22)] ring-1 ring-black/5 transition-all hover:shadow-[0_14px_28px_rgba(138,21,56,0.28)]"
                  href={getDownloadHref(paper, version, template)}
                >
                  <ArrowDownTrayIcon
                    aria-hidden="true"
                    className="size-4 shrink-0 !text-white"
                  />
                  <span className="!text-white">Download PDF</span>
                  <span
                    aria-hidden="true"
                    className="rounded-full bg-white/16 px-1.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] !text-white"
                  >
                    PDF
                  </span>
                </a>
              </div>
            </div>
            <dl className="mt-4 grid gap-3 border-t border-black/8 pt-4 sm:grid-cols-3">
              <Metric
                icon={<BriefcaseIcon aria-hidden="true" className="size-4 shrink-0" />}
                label="Best use case"
                value={selectedVariant.bestUseCase}
              />
              <Metric
                icon={<DocumentTextIcon aria-hidden="true" className="size-4 shrink-0" />}
                label="Paper"
                value={`${selectedPaper.label} · ${selectedPaper.dimensions}`}
              />
              <Metric
                icon={<GlobeAltIcon aria-hidden="true" className="size-4 shrink-0" />}
                label="Language"
                value={selectedVariant.language}
              />
            </dl>
          </div>

          <div className="mt-6 rounded-[28px] bg-[#f5f2ec] p-3 sm:p-5">
            <div className="overflow-x-auto rounded-[24px] bg-white p-3 sm:p-5">
              <div style={{ minWidth: frameWidth, width: frameWidth }}>
                <CvDocument document={document} paper={paper} template={template} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

function DemonstratesSection() {
  return (
    <SectionBand
      id="demonstrates"
      eyebrow="What This Demonstrates"
      title="What this project shows in practice"
    >
      <div className="rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,244,238,0.9))] px-5 py-4 sm:px-6 sm:py-5">
        <div className="grid gap-1">
          {homepageDemonstrates.map((item) => (
            <article
              key={item.title}
              className="grid gap-4 border-t border-black/8 py-6 first:border-t-0 first:pt-1 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-6"
            >
              <div className="lg:pt-1">
                <p className="inline-flex items-center gap-2 rounded-full bg-accent/8 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent">
                  {getDemonstratesIcon(item.label)}
                  {item.label}
                </p>
              </div>
              <div className="min-w-0">
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-text">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-text/74">
                  {item.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionBand>
  );
}

function HowItWorksSection() {
  return (
    <SectionBand
      id="how-i-built-it"
      eyebrow="How I Built It"
      title="Roadmap, implementation phases, and delivery timeline"
    >
      <div className="rounded-[30px] bg-[linear-gradient(180deg,rgba(252,249,244,0.92),rgba(255,255,255,0.98))] px-5 py-4 sm:px-6 sm:py-5">
        <div className="grid gap-3 border-b border-black/8 pb-5 sm:grid-cols-2">
          {homepageFlowSummary.map((item) => (
            <div key={item.label}>
              <p className="flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-accent">
                {item.label === "Total build time" ? (
                  <ClockIcon aria-hidden="true" className="size-4 shrink-0" />
                ) : (
                  <CalendarDaysIcon aria-hidden="true" className="size-4 shrink-0" />
                )}
                <span>{item.label}</span>
              </p>
              <p className="mt-1.5 text-sm leading-6 text-text/70">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
        <div className="grid gap-1">
          {homepageFlowSteps.map((step) => (
            <article
              key={step.title}
              className="grid gap-4 border-t border-black/8 py-6 first:border-t-0 first:pt-1 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-6"
            >
              <div className="lg:pt-1">
                <p className="inline-flex rounded-full bg-accent/8 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent">
                  {step.step}
                </p>
                <p className="mt-3 text-sm leading-6 text-text/56">
                  {step.when}
                </p>
              </div>
              <div className="min-w-0">
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-text">
                  {step.title}
                </h3>
                <div className="mt-4 grid gap-4">
                  <div>
                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-accent">
                      What
                    </p>
                    <p className="mt-1.5 max-w-3xl text-sm leading-7 text-text/74">
                      {step.what}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-accent">
                      How
                    </p>
                    <p className="mt-1.5 max-w-3xl text-sm leading-7 text-text/74">
                      {step.how}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionBand>
  );
}

function BuildOriginSection() {
  return (
    <SectionBand
      id="why-i-built-this"
      eyebrow="Why I Built This"
      title={homepageBuildOrigin.title}
    >
      <div className="grid gap-6">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_24rem] 2xl:grid-cols-[minmax(0,1fr)_26rem]">
          <div className="rounded-[30px] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,244,238,0.94))] p-5 shadow-[0_16px_38px_rgba(34,34,34,0.05)] sm:p-6">
            <div className="relative sm:pl-8">
              <div
                aria-hidden="true"
                className="absolute bottom-3 left-3 top-3 hidden w-px bg-[linear-gradient(180deg,rgba(138,21,56,0.14),rgba(138,21,56,0.04))] sm:block"
              />
              <div className="grid gap-8">
                {homepageBuildOrigin.body.map((paragraph, index) => (
                  <article
                    key={paragraph}
                    className="relative border-b border-black/6 pb-8 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/14 bg-white text-[0.72rem] font-semibold text-accent shadow-[0_6px_14px_rgba(138,21,56,0.08)] sm:inline-flex">
                        {index + 1}
                      </div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-accent">
                        {index === 0
                          ? "The trigger"
                          : index === 1
                            ? "The build decision"
                            : "The execution path"}
                      </p>
                    </div>
                    <p className="mt-3 text-[1.02rem] leading-8 text-text/78">
                      {paragraph}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <aside className="rounded-[26px] bg-black/[0.94] px-5 py-5 text-white shadow-[0_18px_42px_rgba(34,34,34,0.12)]">
            <div className="flex items-center gap-2">
              <DocumentTextIcon
                aria-hidden="true"
                className="size-4 shrink-0 text-white/58"
              />
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/58">
                Docs That Defined Scope
              </p>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/72">
              These files were the main requirement and execution surfaces used to
              shape the first pass.
            </p>
            <ul className="mt-5 grid gap-2.5">
              {homepageBuildOrigin.docs.map((doc) => (
                <li
                  key={doc.label}
                  className="rounded-[18px] bg-white/6 px-3 py-2 font-mono text-[0.8rem] leading-6 break-all text-white/86"
                >
                  {doc.href ? (
                    <a
                      className="flex items-start gap-2 text-white hover:text-white"
                      href={doc.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <DocumentTextIcon
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-white/60"
                      />
                      <span className="block">{doc.label}</span>
                    </a>
                  ) : (
                    <span className="flex items-start gap-2">
                      <DocumentTextIcon
                        aria-hidden="true"
                        className="mt-1 size-4 shrink-0 text-white/60"
                      />
                      <span className="block">{doc.label}</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {homepageBuildOrigin.workingReferences.map((reference) => (
            <a
              key={reference.href}
              className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-3.5 py-2 text-sm font-medium text-text shadow-[0_8px_20px_rgba(34,34,34,0.05)] transition-colors hover:bg-[#fffdfa]"
              href={reference.href}
              rel="noreferrer"
              target="_blank"
            >
              <ExternalReferenceIcon />
              {reference.label}
            </a>
          ))}
        </div>
      </div>
    </SectionBand>
  );
}

function BuildFixesSection() {
  return (
    <SectionBand
      id="what-we-fixed"
      eyebrow="What We Fixed"
      title="Problems we hit and how they were corrected"
    >
      <div className="rounded-[30px] bg-[linear-gradient(180deg,rgba(252,249,244,0.92),rgba(255,255,255,0.98))] px-5 py-4 sm:px-6 sm:py-5">
        <div className="grid gap-1">
          {homepageBuildFixes.map((item, index) => (
            <article
              key={item.title}
              className="grid gap-4 border-t border-black/8 py-6 first:border-t-0 first:pt-1 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-6"
            >
              <div className="lg:pt-1">
                <p className="inline-flex rounded-full bg-accent/8 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent">
                  {`Fix 0${index + 1}`}
                </p>
              </div>
              <div className="min-w-0">
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-text">
                  {item.title}
                </h3>
                <div className="mt-4 grid gap-4">
                  <div>
                    <p className="flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-accent">
                      {getFixDetailIcon("Problem")}
                      <span>Problem</span>
                    </p>
                    <p className="mt-1.5 max-w-3xl text-sm leading-7 text-text/74">
                      {item.problem}
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-accent">
                      {getFixDetailIcon("Fix")}
                      <span>Fix</span>
                    </p>
                    <p className="mt-1.5 max-w-3xl text-sm leading-7 text-text/74">
                      {item.fix}
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-accent">
                      {getFixDetailIcon("Result")}
                      <span>Result</span>
                    </p>
                    <p className="mt-1.5 max-w-3xl text-sm leading-7 text-text/70">
                      {item.impact}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionBand>
  );
}
