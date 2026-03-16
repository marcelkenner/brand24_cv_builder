import { projectOverview } from "@/features/cv/data/projectOverview";
import { getCvSectionLabels } from "@/features/cv/data/cvSectionLabels";
import { sampleCvDocument } from "@/features/cv/data/sampleCvDocument";
import { cvInstallCommands } from "@/features/cv/server/installCommands";

import { CvSectionHeading } from "./CvSectionHeading";

export function CvAppShellDeliveryGrid() {
  return (
    <>
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <FeatureScaffoldSection />
        <SampleProfileSection />
      </section>
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <NextStepsSection />
        <VerifiedCommandsSection />
      </section>
    </>
  );
}

function FeatureScaffoldSection() {
  return (
    <article className="rounded-[28px] border border-rule bg-surface p-6 sm:p-8">
      <CvSectionHeading
        title="Feature scaffold"
        description="The feature boundary is in place, so later phases can grow without bloating src/app."
      />
      <ul className="mt-6 grid gap-2 font-mono text-sm leading-6 text-text">
        {projectOverview.featureFolders.map((item) => (
          <li key={item} className="rounded-xl border border-rule px-3 py-2">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

function SampleProfileSection() {
  const summary = sampleCvDocument.summary.sentences.join(" ");
  const sectionLabels = getCvSectionLabels("en");

  return (
    <article className="rounded-[28px] border border-rule bg-surface p-6 sm:p-8">
      <CvSectionHeading
        eyebrow="Sample profile"
        title={sampleCvDocument.header.fullName}
        description={sampleCvDocument.header.professionalHeadline}
      />
      <div className="mt-5 grid gap-4 text-sm leading-6 text-muted">
        <p>{sampleCvDocument.header.location}</p>
        <p>{summary}</p>
      </div>
      {sampleCvDocument.header.contactMethods.length > 0 ? (
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {sampleCvDocument.header.contactMethods.map((contact) => (
            <div key={contact.href} className="rounded-2xl border border-rule px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                {contact.label}
              </p>
              <p className="mt-2 break-all text-sm leading-6 text-text">
                {contact.value}
              </p>
            </div>
          ))}
        </div>
      ) : null}
      <ul className="mt-6 grid gap-2 text-sm leading-6 text-text">
        {sampleCvDocument.sectionOrder.map((section) => (
          <li key={section} className="rounded-xl border border-rule px-3 py-2">
            {sectionLabels[section]}
          </li>
        ))}
      </ul>
    </article>
  );
}

function NextStepsSection() {
  return (
    <article className="rounded-[28px] border border-rule bg-surface p-6 sm:p-8">
      <CvSectionHeading
        title="Next delivery targets"
        description="Phase 4 can move into dedicated preview routing and paper switching because the shared document renderer now exists."
      />
      <ul className="mt-5 grid gap-3 text-sm leading-6 text-text">
        {projectOverview.nextDeliverables.map((item) => (
          <li key={item} className="rounded-2xl border border-rule px-4 py-3">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

function VerifiedCommandsSection() {
  return (
    <article className="rounded-[28px] border border-rule bg-surface p-6 sm:p-8">
      <CvSectionHeading
        title="Verified local commands"
        description="Phase 3 adds component-level validation on top of the existing local setup."
      />
      <div className="mt-5 rounded-2xl border border-rule px-4 py-4 text-sm leading-6 text-muted">
        <p className="font-mono text-[0.8rem]">{cvInstallCommands.development}</p>
        <p className="mt-2 font-mono text-[0.8rem]">
          {cvInstallCommands.playwrightChromium}
        </p>
        <p className="mt-2 font-mono text-[0.8rem]">
          source ~/.nvm/nvm.sh && npm run test:unit
        </p>
      </div>
    </article>
  );
}
