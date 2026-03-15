import {
  ArrowDownTrayIcon,
  ArrowRightIcon,
  SpeakerWaveIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import type { ReactNode } from "react";

export function HeroSection({
  downloadHref,
  recruiterTitle,
}: {
  readonly downloadHref: string;
  readonly recruiterTitle: string;
}) {
  return (
    <section className="border-b border-black/8 pb-14">
      <div className="max-w-5xl">
        <div className="inline-flex rounded-full bg-black/[0.04] px-3 py-1.5">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-accent">
            Built for {recruiterTitle} review
          </p>
        </div>
        <p className="mt-6 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-accent">
          Personal application project
        </p>
        <h1 className="mt-4 max-w-5xl text-5xl font-semibold tracking-[-0.06em] text-text sm:text-6xl lg:text-[4.7rem]">
          A recruiter-ready CV build, explained end to end
        </h1>
        <p className="mt-6 max-w-4xl text-base leading-7 text-text/72 sm:text-lg sm:leading-8">
          I saw the AI Adoption Manager role, decided not to send a generic PDF,
          and built a browser-first CV workflow that turns one verified Marcel
          Kenner profile into role-specific previews and production-ready PDF
          exports.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#8a1538_0%,#b11f4a_100%)] px-4 py-2.5 text-sm font-semibold !text-white visited:!text-white hover:-translate-y-px hover:!text-white focus-visible:!text-white shadow-[0_10px_22px_rgba(138,21,56,0.22)] ring-1 ring-black/5 transition-all hover:shadow-[0_14px_28px_rgba(138,21,56,0.28)]"
            href={downloadHref}
          >
            <ArrowDownTrayIcon aria-hidden="true" className="size-4 shrink-0 !text-white" />
            <span className="!text-white">Download {recruiterTitle} CV</span>
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-full bg-black/[0.04] px-5 py-3 text-sm font-semibold text-text transition-colors hover:bg-black/[0.06]"
            href="#workspace"
          >
            <Squares2X2Icon aria-hidden="true" className="size-4 shrink-0 text-text/72" />
            Open CV workspace
          </a>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          <a
            className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/80 px-3.5 py-2 text-sm font-medium text-text transition-colors hover:bg-white"
            href="#why-i-built-this"
          >
            <ArrowRightIcon aria-hidden="true" className="size-4 shrink-0 text-text/60" />
            Why I built this
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/80 px-3.5 py-2 text-sm font-medium text-text transition-colors hover:bg-white"
            href="#how-i-built-it"
          >
            <ArrowRightIcon aria-hidden="true" className="size-4 shrink-0 text-text/60" />
            How I built it
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/80 px-3.5 py-2 text-sm font-medium text-text transition-colors hover:bg-white"
            href="#what-we-fixed"
          >
            <ArrowRightIcon aria-hidden="true" className="size-4 shrink-0 text-text/60" />
            What we fixed
          </a>
        </div>
      </div>
    </section>
  );
}

export function SectionBand({
  children,
  id,
  title,
  eyebrow,
  intro,
  aside,
}: {
  readonly aside?: ReactNode;
  readonly children?: ReactNode;
  readonly eyebrow?: string;
  readonly id?: string;
  readonly intro?: string;
  readonly title: string;
}) {
  return (
    <section id={id} className="border-t border-black/8 py-14 first:border-t-0 first:pt-0">
      <div
        className={
          aside
            ? "grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_20rem] xl:items-start"
            : "grid gap-8"
        }
      >
        <div>
          {eyebrow ? (
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-accent">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-text sm:text-4xl">
            {title}
          </h2>
          {intro ? (
            <p className="mt-4 max-w-3xl text-base leading-7 text-text/72">
              {intro}
            </p>
          ) : null}
          {children ? <div className={intro ? "mt-8" : "mt-6"}>{children}</div> : null}
        </div>
        {aside ? (
          <aside className="xl:pt-10">
            <div className="rounded-[24px] bg-black/[0.03] p-5 text-sm leading-6 text-text/72">
              {aside}
            </div>
          </aside>
        ) : null}
      </div>
    </section>
  );
}

export function WorkspaceSelectorButton({
  active,
  description,
  href,
  label,
}: {
  readonly active: boolean;
  readonly description: string;
  readonly href: string;
  readonly label: string;
}) {
  return (
    <a
      aria-current={active ? "page" : undefined}
      className={
        active
          ? "block rounded-[20px] bg-[linear-gradient(135deg,#8a1538_0%,#b11f4a_100%)] px-4 py-4 !text-white shadow-[0_12px_26px_rgba(138,21,56,0.22)] ring-1 ring-black/5"
          : "block rounded-[20px] px-4 py-4 text-text/66 transition-colors hover:bg-white/70"
      }
      href={href}
    >
      <span className={active ? "block text-sm font-semibold !text-white" : "block text-sm font-semibold text-text"}>
        {label}
      </span>
      <span className={active ? "mt-2 block text-sm leading-6 !text-white/88" : "mt-2 block text-sm leading-6"}>
        {description}
      </span>
    </a>
  );
}

export function Metric({
  icon,
  label,
  value,
}: {
  readonly icon?: ReactNode;
  readonly label: string;
  readonly value: string;
}) {
  return (
    <div className="border-t border-black/8 pt-4 first:border-t-0 first:pt-0">
      <dt className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-accent">
        {icon ? <span className="text-accent/80">{icon}</span> : null}
        <span>{label}</span>
      </dt>
      <dd className="mt-2 text-sm leading-6 text-text">{value}</dd>
    </div>
  );
}

export function WorkspaceAudioPlayer({
  audioLabel,
  audioSrc,
}: {
  readonly audioLabel: string;
  readonly audioSrc: string;
}) {
  return (
    <div className="w-full rounded-[24px] border border-black/8 bg-white px-4 py-3 shadow-[0_8px_18px_rgba(34,34,34,0.05)] sm:w-[21rem]">
      <div className="flex items-center gap-2 text-sm font-semibold text-text">
        <SpeakerWaveIcon aria-hidden="true" className="size-4 shrink-0 text-text/72" />
        <span>Listen to narration</span>
      </div>
      <p className="mt-1 text-xs leading-5 text-text/68">
        No time to read? Listen to the CV instead.
      </p>
      <audio
        aria-label={audioLabel}
        className="mt-2 block h-10 w-full"
        controls
        preload="none"
        src={audioSrc}
      />
    </div>
  );
}

export function SpecBlock({
  lines,
  title,
}: {
  readonly lines: readonly string[];
  readonly title: string;
}) {
  return (
    <section className="rounded-[24px] bg-black/[0.92] px-5 py-5 text-[0.88rem] leading-7 text-white shadow-[0_16px_38px_rgba(34,34,34,0.12)]">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white/56">
        {title}
      </p>
      <ul className="mt-4 grid gap-1">
        {lines.map((line) => (
          <li key={line} className="font-mono text-white/84">
            {line}
          </li>
        ))}
      </ul>
    </section>
  );
}
