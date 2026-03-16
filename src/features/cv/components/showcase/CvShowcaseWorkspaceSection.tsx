import {
  ArrowDownTrayIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  EyeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

import type { CvDocument as CvDocumentModel } from "@/features/cv/domain/cvDocument";
import type { CvLocale } from "@/features/cv/domain/cvLocale";
import type { CvPaperVariant } from "@/features/cv/domain/paperVariant";
import type { CvTemplateVariant } from "@/features/cv/domain/cvTemplateVariant";
import { cvVersionMetadata, type CvVersion } from "@/features/cv/domain/cvVersion";
import type {
  HomepageVariant,
  ShowcasePageCopy,
} from "@/features/cv/data/showcaseHomepage";

import { CvDocument } from "../CvDocument";
import {
  Metric,
  WorkspaceAudioPlayer,
  WorkspaceSelectorButton,
} from "./CvShowcaseSections";
import {
  getDownloadHref,
  getPrintHref,
  getShowcaseHref,
} from "./showcaseLinks";

const CV_NARRATION_AUDIO_SRC = "/Marcel_CV_audio-enhanced-v2.mp3" as const;

type CvShowcaseWorkspaceSectionProps = {
  readonly copy: ShowcasePageCopy;
  readonly document: CvDocumentModel;
  readonly frameWidth: string;
  readonly locale: CvLocale;
  readonly paper: CvPaperVariant;
  readonly selectedPaperLabel: string;
  readonly selectedVariant: HomepageVariant;
  readonly template: CvTemplateVariant;
  readonly variants: readonly HomepageVariant[];
  readonly version: CvVersion;
};

export function CvShowcaseWorkspaceSection({
  copy,
  document,
  frameWidth,
  locale,
  paper,
  selectedPaperLabel,
  selectedVariant,
  template,
  variants,
  version,
}: CvShowcaseWorkspaceSectionProps) {
  return (
    <section id="workspace" className="border-t border-black/8 pt-14 first:border-t-0 first:pt-0">
      <div className="grid gap-6 xl:grid-cols-[19rem_minmax(0,1fr)]">
        <aside className="rounded-[28px] bg-black/[0.035] p-4 xl:sticky xl:top-8 xl:h-fit">
          <p className="px-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-accent">
            {copy.workspaceEyebrow}
          </p>
          <h2 className="px-2 pt-3 text-2xl font-semibold tracking-[-0.04em] text-text">
            {copy.workspaceTitle}
          </h2>
          <p className="px-2 pt-3 text-sm leading-6 text-text/72">
            {copy.workspaceSelectorDescription}
          </p>
          <div className="mt-5 grid gap-2">
            {variants.map((variant) => (
              <WorkspaceSelectorButton
                key={variant.version}
                active={variant.version === version}
                description={variant.bestUseCase}
                href={getShowcaseHref(
                  locale,
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
                  href={getPrintHref(locale, paper, version, template)}
                  rel="noreferrer"
                  target="_blank"
                >
                  <EyeIcon aria-hidden="true" className="size-4 shrink-0 text-text/72" />
                  <span>{copy.workspaceViewOnline}</span>
                  <span
                    aria-hidden="true"
                    className="rounded-full bg-black/[0.05] px-1.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-text/68"
                  >
                    {copy.liveBadge}
                  </span>
                </a>
                <WorkspaceAudioPlayer
                  audioLabel={copy.workspaceAudioLabel}
                  audioSrc={CV_NARRATION_AUDIO_SRC}
                  body={copy.workspaceAudioBody}
                  title={copy.workspaceAudioTitle}
                />
                <a
                  className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#8a1538_0%,#b11f4a_100%)] px-4 py-2.5 text-sm font-semibold !text-white visited:!text-white hover:-translate-y-px hover:!text-white focus-visible:!text-white shadow-[0_10px_22px_rgba(138,21,56,0.22)] ring-1 ring-black/5 transition-all hover:shadow-[0_14px_28px_rgba(138,21,56,0.28)]"
                  href={getDownloadHref(locale, paper, version, template)}
                >
                  <ArrowDownTrayIcon
                    aria-hidden="true"
                    className="size-4 shrink-0 !text-white"
                  />
                  <span className="!text-white">{copy.workspaceDownload}</span>
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
                label={copy.workspaceBestUseCaseLabel}
                value={selectedVariant.bestUseCase}
              />
              <Metric
                icon={<DocumentTextIcon aria-hidden="true" className="size-4 shrink-0" />}
                label={copy.workspacePaperLabel}
                value={selectedPaperLabel}
              />
              <Metric
                icon={<GlobeAltIcon aria-hidden="true" className="size-4 shrink-0" />}
                label={copy.workspaceLanguageLabel}
                value={selectedVariant.language}
              />
            </dl>
          </div>

          <div className="mt-6 rounded-[28px] bg-[#f5f2ec] p-3 sm:p-5">
            <div className="overflow-x-auto rounded-[24px] bg-white p-3 sm:p-5">
              <div style={{ minWidth: frameWidth, width: frameWidth }}>
                <CvDocument
                  document={document}
                  locale={locale}
                  paper={paper}
                  template={template}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
