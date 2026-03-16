export const cvLocales = ["en", "pl"] as const;

export type CvLocale = (typeof cvLocales)[number];

type CvLocaleMetadata = {
  readonly label: string;
};

export const defaultCvLocale = "en";

export const cvLocaleMetadata: Readonly<Record<CvLocale, CvLocaleMetadata>> = {
  en: {
    label: "English",
  },
  pl: {
    label: "Polski",
  },
};

export function isCvLocale(value: string): value is CvLocale {
  return cvLocales.includes(value as CvLocale);
}

export function parseCvLocale(value: string): CvLocale | null {
  return isCvLocale(value) ? value : null;
}

export function resolveCvLocale(
  value: string | readonly string[] | undefined,
): CvLocale {
  const candidate =
    typeof value === "string"
      ? value
      : Array.isArray(value) && value.length === 1
        ? value[0]
        : undefined;

  return candidate ? (parseCvLocale(candidate) ?? defaultCvLocale) : defaultCvLocale;
}
