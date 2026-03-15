import { sampleCvDocument } from "@/features/cv/data/sampleCvDocument";

export function CvAppShellHero() {
  return (
    <section className="rounded-[28px] border border-rule bg-surface px-6 py-7 sm:px-10 sm:py-9">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-accent">
        Phase 3
      </p>
      <div className="mt-5 max-w-4xl">
        <h1 className="text-4xl font-semibold tracking-[-0.04em] text-text sm:text-5xl">
          The CV builder now renders one printable document component directly
          from the typed sample profile.
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-7 text-muted">
          The landing page now proves the shared CV markup, the restrained
          single-column hierarchy, and the stricter no-photo header path without
          depending on PDF generation. The next phase can stay focused on
          browser showcase routing and paper-specific preview controls.
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-3 text-sm text-muted sm:flex-row sm:flex-wrap sm:items-center">
        {sampleCvDocument.targetRoles.map((role) => (
          <span key={role} className="rounded-full border border-rule px-3 py-1.5">
            {role}
          </span>
        ))}
      </div>
    </section>
  );
}
