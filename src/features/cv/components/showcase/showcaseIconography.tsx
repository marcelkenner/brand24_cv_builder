import {
  ArrowTopRightOnSquareIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

export function getDemonstratesIcon(label: string) {
  if (label === "Opportunity recognition" || label === "Dostrzeganie okazji") {
    return <LightBulbIcon aria-hidden="true" className="size-4 shrink-0" />;
  }
  if (
    label === "Tooling judgment" ||
    label === "Execution discipline" ||
    label === "Dobór narzędzi" ||
    label === "Dyscyplina wykonawcza"
  ) {
    return <WrenchScrewdriverIcon aria-hidden="true" className="size-4 shrink-0" />;
  }
  return <ShieldCheckIcon aria-hidden="true" className="size-4 shrink-0" />;
}

export function getFixDetailIcon(label: "Problem" | "Fix" | "Result") {
  if (label === "Problem") {
    return <ExclamationTriangleIcon aria-hidden="true" className="size-4 shrink-0" />;
  }
  if (label === "Fix") {
    return <WrenchScrewdriverIcon aria-hidden="true" className="size-4 shrink-0" />;
  }
  return <CheckBadgeIcon aria-hidden="true" className="size-4 shrink-0" />;
}

export function ExternalReferenceIcon() {
  return <ArrowTopRightOnSquareIcon aria-hidden="true" className="size-4 shrink-0 text-text/60" />;
}
