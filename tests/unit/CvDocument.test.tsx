import { render, screen } from "@testing-library/react";

import { CvDocument } from "@/features/cv/components/CvDocument";
import { getCvSectionLabels } from "@/features/cv/data/cvSectionLabels";
import { getCvDocument } from "@/features/cv/data/cvVersions";
import { sampleCvDocument } from "@/features/cv/data/sampleCvDocument";

describe("CvDocument", () => {
  it("renders the sample CV sections in the declared order for the single-column photo template", () => {
    const sectionLabels = getCvSectionLabels("en");

    render(
      <CvDocument
        document={sampleCvDocument}
        paper="a4"
        template="single-column-with-photo"
      />,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: sampleCvDocument.header.fullName,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: sampleCvDocument.header.photo.alt }),
    ).toBeInTheDocument();

    expect(
      screen
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual(sampleCvDocument.sectionOrder.map((section) => sectionLabels[section]));
  });

  it("keeps the paper and template variants visible in the rendered document", () => {
    render(
      <CvDocument
        document={sampleCvDocument}
        paper="letter"
        template="two-column-without-photo"
      />,
    );

    expect(
      screen.getByRole("article", {
        name: `${sampleCvDocument.header.fullName} CV`,
      }),
    ).toHaveAttribute("data-paper", "letter");
    expect(
      screen.getByRole("article", {
        name: `${sampleCvDocument.header.fullName} CV`,
      }),
    ).toHaveAttribute("data-template", "two-column-without-photo");
    expect(screen.getByText(sampleCvDocument.header.location)).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();

    const skillLabel = screen.getByText(
      "AI adoption and AI-supported workflows:",
    );

    expect(skillLabel).toBeInTheDocument();
    expect(skillLabel.nextElementSibling).toHaveTextContent(
      "AI use case identification · Internal AI enablement · AI assistants · RAG-style workflows · Context-aware knowledge support",
    );
  });

  it("keeps utility sections in the sidebar and experience content in the main column for two-column templates", () => {
    render(
      <CvDocument
        document={sampleCvDocument}
        paper="a4"
        template="two-column-with-photo"
      />,
    );

    const article = screen.getByRole("article", {
      name: `${sampleCvDocument.header.fullName} CV`,
    });
    const sidebar = article.querySelector('[data-cv-column="sidebar"]');
    const mainColumn = article.querySelector('[data-cv-column="main"]');

    expect(sidebar?.querySelector('[data-cv-section="competencies"]')).not.toBeNull();
    expect(
      sidebar?.querySelector('[data-cv-section="technicalSkills"]'),
    ).not.toBeNull();
    expect(mainColumn?.querySelector('[data-cv-section="summary"]')).not.toBeNull();
    expect(mainColumn?.querySelector('[data-cv-section="experience"]')).not.toBeNull();
  });

  it("renders localized section labels and content for the Polish document variant", () => {
    const document = getCvDocument("ai-adoption-manager", "pl");

    render(
      <CvDocument
        document={document}
        locale="pl"
        paper="a4"
        template="single-column-with-photo"
      />,
    );

    expect(
      screen.getByRole("article", {
        name: `CV ${document.header.fullName}`,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Podsumowanie zawodowe" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Analityk biznesowo-systemowy z ponad 5-letnim doświadczeniem/i),
    ).toBeInTheDocument();
  });
});
