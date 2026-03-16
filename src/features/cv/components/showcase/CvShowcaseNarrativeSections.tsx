import {
  CalendarDaysIcon,
  ClockIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

import type {
  ShowcaseHomepageContent,
  ShowcasePageCopy,
} from "@/features/cv/data/showcaseHomepage";

import {
  ExternalReferenceIcon,
  getDemonstratesIcon,
  getFixDetailIcon,
} from "./showcaseIconography";
import { SectionBand } from "./CvShowcaseSections";

export function CvShowcaseNarrativeSections({
  buildFixes,
  buildOrigin,
  copy,
  demonstrates,
  flowSteps,
  flowSummary,
}: Omit<ShowcaseHomepageContent, "variants">) {
  return (
    <>
      <DemonstratesSection copy={copy} demonstrates={demonstrates} />
      <BuildOriginSection buildOrigin={buildOrigin} copy={copy} />
      <HowItWorksSection copy={copy} flowSteps={flowSteps} flowSummary={flowSummary} />
      <BuildFixesSection buildFixes={buildFixes} copy={copy} />
    </>
  );
}

function DemonstratesSection({
  copy,
  demonstrates,
}: {
  readonly copy: ShowcasePageCopy;
  readonly demonstrates: ShowcaseHomepageContent["demonstrates"];
}) {
  return (
    <SectionBand
      id="demonstrates"
      eyebrow={copy.demonstratesEyebrow}
      title={copy.demonstratesTitle}
    >
      <div className="rounded-[28px] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,244,238,0.9))] px-5 py-4 sm:px-6 sm:py-5">
        <div className="grid gap-1">
          {demonstrates.map((item) => (
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

function HowItWorksSection({
  copy,
  flowSteps,
  flowSummary,
}: {
  readonly copy: ShowcasePageCopy;
  readonly flowSteps: ShowcaseHomepageContent["flowSteps"];
  readonly flowSummary: ShowcaseHomepageContent["flowSummary"];
}) {
  return (
    <SectionBand
      id="how-i-built-it"
      eyebrow={copy.howBuiltEyebrow}
      title={copy.howBuiltTitle}
    >
      <div className="rounded-[30px] bg-[linear-gradient(180deg,rgba(252,249,244,0.92),rgba(255,255,255,0.98))] px-5 py-4 sm:px-6 sm:py-5">
        <div className="grid gap-3 border-b border-black/8 pb-5 sm:grid-cols-2">
          {flowSummary.map((item) => (
            <div key={item.label}>
              <p className="flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-accent">
                {item.label.includes("time") || item.label.includes("czas") ? (
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
          {flowSteps.map((step) => (
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
                      {copy.howBuiltWhatLabel}
                    </p>
                    <p className="mt-1.5 max-w-3xl text-sm leading-7 text-text/74">
                      {step.what}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-accent">
                      {copy.howBuiltHowLabel}
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

function BuildOriginSection({
  buildOrigin,
  copy,
}: {
  readonly buildOrigin: ShowcaseHomepageContent["buildOrigin"];
  readonly copy: ShowcasePageCopy;
}) {
  return (
    <SectionBand
      id="why-i-built-this"
      eyebrow={copy.whyBuiltEyebrow}
      title={buildOrigin.title}
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
                {buildOrigin.body.map((paragraph, index) => (
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
                          ? buildOrigin.triggerLabel
                          : index === 1
                            ? buildOrigin.buildDecisionLabel
                            : buildOrigin.executionPathLabel}
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
                {buildOrigin.scopeDocsEyebrow}
              </p>
            </div>
            <p className="mt-3 text-sm leading-6 text-white/72">
              {buildOrigin.scopeDocsIntro}
            </p>
            <ul className="mt-5 grid gap-2.5">
              {buildOrigin.docs.map((doc) => (
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
          {buildOrigin.workingReferences.map((reference) => (
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

function BuildFixesSection({
  buildFixes,
  copy,
}: {
  readonly buildFixes: ShowcaseHomepageContent["buildFixes"];
  readonly copy: ShowcasePageCopy;
}) {
  return (
    <SectionBand
      id="what-we-fixed"
      eyebrow={copy.buildFixesEyebrow}
      title={copy.buildFixesTitle}
    >
      <div className="rounded-[30px] bg-[linear-gradient(180deg,rgba(252,249,244,0.92),rgba(255,255,255,0.98))] px-5 py-4 sm:px-6 sm:py-5">
        <div className="grid gap-1">
          {buildFixes.map((item, index) => (
            <article
              key={item.title}
              className="grid gap-4 border-t border-black/8 py-6 first:border-t-0 first:pt-1 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-6"
            >
              <div className="lg:pt-1">
                <p className="inline-flex rounded-full bg-accent/8 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-accent">
                  {`${copy.buildFixesBadgePrefix} 0${index + 1}`}
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
                      <span>{copy.buildFixesProblemLabel}</span>
                    </p>
                    <p className="mt-1.5 max-w-3xl text-sm leading-7 text-text/74">
                      {item.problem}
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-accent">
                      {getFixDetailIcon("Fix")}
                      <span>{copy.buildFixesSolutionLabel}</span>
                    </p>
                    <p className="mt-1.5 max-w-3xl text-sm leading-7 text-text/74">
                      {item.fix}
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-accent">
                      {getFixDetailIcon("Result")}
                      <span>{copy.buildFixesResultLabel}</span>
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
