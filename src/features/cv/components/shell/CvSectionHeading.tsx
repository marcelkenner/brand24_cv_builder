export function CvSectionHeading({
  description,
  eyebrow,
  title,
}: {
  readonly description: string;
  readonly eyebrow?: string;
  readonly title: string;
}) {
  return (
    <div>
      {eyebrow ? (
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-text">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
    </div>
  );
}
