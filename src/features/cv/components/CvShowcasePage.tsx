import { cvDesignTokens } from "@/features/cv/config/designTokens";
import type { CvDocument as CvDocumentModel } from "@/features/cv/domain/cvDocument";
import { defaultCvLocale } from "@/features/cv/domain/cvLocale";
import type { CvLocale } from "@/features/cv/domain/cvLocale";
import type { CvPaperVariant } from "@/features/cv/domain/paperVariant";
import type { CvTemplateVariant } from "@/features/cv/domain/cvTemplateVariant";
import type { CvVersion } from "@/features/cv/domain/cvVersion";
import { getLocalizedCvPaperMetadata } from "@/features/cv/data/cvPaperMetadata";
import { getShowcaseHomepageContent } from "@/features/cv/data/showcaseHomepage";

import { CvShowcaseNarrativeSections } from "./showcase/CvShowcaseNarrativeSections";
import { HeroSection } from "./showcase/CvShowcaseSections";
import { CvShowcaseWorkspaceSection } from "./showcase/CvShowcaseWorkspaceSection";
import { getDownloadHref, getShowcaseHref } from "./showcase/showcaseLinks";

type CvShowcasePageProps = {
  readonly document: CvDocumentModel;
  readonly locale: CvLocale;
  readonly paper: CvPaperVariant;
  readonly template: CvTemplateVariant;
  readonly version: CvVersion;
};

export function CvShowcasePage({
  document,
  locale,
  paper,
  template,
  version,
}: CvShowcasePageProps) {
  const frame = cvDesignTokens.paperFrames[paper];
  const selectedPaper = getLocalizedCvPaperMetadata(locale, paper);
  const content = getShowcaseHomepageContent(locale);
  const selectedVariant =
    content.variants.find((variant) => variant.version === version) ??
    content.variants[0];
  const localeOptions = [
    {
      active: locale === defaultCvLocale,
      href: getShowcaseHref(
        "en",
        paper,
        version,
        template,
      ),
      label: content.copy.heroLocaleEnglish,
    },
    {
      active: locale === "pl",
      href: getShowcaseHref(
        "pl",
        paper,
        version,
        template,
      ),
      label: content.copy.heroLocalePolish,
    },
  ] as const;

  return (
    <main className="min-h-screen bg-[#f7f5f1] px-4 py-6 text-text sm:px-6 sm:py-10">
      <div className="mx-auto flex w-full max-w-[88rem] flex-col gap-10">
        <HeroSection
          badgeText={content.copy.heroBadge(selectedVariant.recruiterTitle)}
          downloadHref={getDownloadHref(locale, paper, version, template)}
          downloadLabel={content.copy.heroDownload(selectedVariant.recruiterTitle)}
          howBuiltHrefLabel={content.copy.heroHowBuilt}
          intro={content.copy.heroIntro}
          localeOptions={localeOptions}
          localeSelectorLabel={content.copy.heroLocaleLabel}
          openWorkspaceLabel={content.copy.heroOpenWorkspace}
          projectEyebrow={content.copy.heroProjectEyebrow}
          title={content.copy.heroTitle}
          whatFixedHrefLabel={content.copy.heroWhatFixed}
          whyBuiltHrefLabel={content.copy.heroWhyBuilt}
        />
        <div className="min-w-0">
          <CvShowcaseWorkspaceSection
            copy={content.copy}
            document={document}
            frameWidth={frame.width}
            locale={locale}
            paper={paper}
            selectedPaperLabel={`${selectedPaper.label} · ${selectedPaper.dimensions}`}
            selectedVariant={selectedVariant}
            template={template}
            variants={content.variants}
            version={version}
          />
          <CvShowcaseNarrativeSections
            buildFixes={content.buildFixes}
            buildOrigin={content.buildOrigin}
            copy={content.copy}
            demonstrates={content.demonstrates}
            flowSteps={content.flowSteps}
            flowSummary={content.flowSummary}
          />
        </div>
      </div>
    </main>
  );
}
