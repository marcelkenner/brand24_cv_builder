import { render, screen } from "@testing-library/react";

import { CvDocument } from "@/features/cv/components/CvDocument";
import { sampleCvDocument } from "@/features/cv/data/sampleCvDocument";
import { cvSectionLabels } from "@/features/cv/domain/cvDocument";

describe("CvDocument", () => {
  it("renders the sample CV sections in the declared order for the single-column photo template", () => {
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
    ).toEqual(sampleCvDocument.sectionOrder.map((section) => cvSectionLabels[section]));
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
});
