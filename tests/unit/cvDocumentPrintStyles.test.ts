import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const cssPath = resolve(
  process.cwd(),
  "src/features/cv/components/CvDocument.module.css",
);

describe("CvDocument print styles", () => {
  it("keeps sections splittable in print while preserving atomic entries", () => {
    const css = readFileSync(cssPath, "utf8");

    expect(css).toMatch(
      /\.entry\s*\{[\s\S]*break-inside:\s*avoid;[\s\S]*page-break-inside:\s*avoid;/,
    );
    expect(css).toMatch(
      /@media print\s*\{[\s\S]*\.section\s*\{[\s\S]*break-inside:\s*auto;[\s\S]*page-break-inside:\s*auto;/,
    );
    expect(css).toMatch(
      /\.section\[data-page-break-before="true"\]\s*\{[\s\S]*break-before:\s*page;[\s\S]*margin-top:\s*0;/,
    );
    expect(css).toMatch(
      /\.printUnit\[data-page-break-before="true"\]\s*\{[\s\S]*break-before:\s*page;[\s\S]*margin-top:\s*0;/,
    );
    expect(css).toMatch(
      /\.printUnit\[data-cv-continuation-heading="true"\]::before\s*\{[\s\S]*content:\s*attr\(data-cv-section-label\);/,
    );
    expect(css).toMatch(
      /@media print\s*\{[\s\S]*\.document\s*\{[\s\S]*min-height:\s*auto;[\s\S]*overflow:\s*visible;/,
    );
    expect(css).toMatch(
      /@media print\s*\{[\s\S]*\.document\s*\{[\s\S]*box-decoration-break:\s*clone;[\s\S]*-webkit-box-decoration-break:\s*clone;/,
    );
  });

  it("renders technical skill rows as a fixed-label grid", () => {
    const css = readFileSync(cssPath, "utf8");

    expect(css).toMatch(
      /\.skillRow\s*\{[\s\S]*display:\s*grid;[\s\S]*grid-template-columns:\s*44mm minmax\(0, 1fr\);/,
    );
    expect(css).toMatch(
      /\.skillLabel\s*\{[\s\S]*font-weight:\s*600;/,
    );
  });
});
