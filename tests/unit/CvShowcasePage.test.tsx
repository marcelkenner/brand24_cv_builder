import { render, screen } from "@testing-library/react";

import { CvShowcasePage } from "@/features/cv/components/CvShowcasePage";
import { getCvDocument } from "@/features/cv/data/cvVersions";

describe("CvShowcasePage", () => {
  it("renders the layout-driven homepage with a split-view workspace and narrative sections", () => {
    const document = getCvDocument("leadership-stakeholder");

    render(
      <CvShowcasePage
        document={document}
        paper="letter"
        template="two-column-with-photo"
        version="leadership-stakeholder"
      />,
    );

    expect(
      screen.getByRole("heading", {
        name: /A recruiter-ready CV build, explained end to end/i,
      }),
    ).toBeInTheDocument();
    expect(screen.queryByText(/This section/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Download Leadership / Stakeholder Version CV" }),
    ).toHaveAttribute(
      "href",
      "/generated/cv-pdf/cv-letter-leadership-stakeholder-two-column-with-photo.pdf",
    );
    expect(
      screen.getByRole("link", { name: "Download Leadership / Stakeholder Version CV" }),
    ).toHaveClass("!text-white");
    expect(
      screen
        .getByRole("link", {
          name: "Download Leadership / Stakeholder Version CV",
        })
        .querySelector("svg"),
    ).not.toBeNull();
    expect(
      screen.getByRole("link", { name: "Open CV workspace" }),
    ).toHaveAttribute("href", "#workspace");
    expect(
      screen.getByRole("link", { name: "Open CV workspace" }).querySelector("svg"),
    ).not.toBeNull();
    expect(
      screen.getByRole("link", { name: "Why I built this" }),
    ).toHaveAttribute("href", "#why-i-built-this");
    expect(
      screen.getByRole("link", { name: "How I built it" }),
    ).toHaveAttribute("href", "#how-i-built-it");
    expect(
      screen.getByRole("link", { name: "What we fixed" }),
    ).toHaveAttribute("href", "#what-we-fixed");
    expect(
      screen.getByRole("heading", { name: /Choose the recruiter view/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Why I built this/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Problems we hit and how they were corrected/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("docs/Implementation/Roadmap_CV_PDF_Showcase_App.md"),
    ).toBeInTheDocument();
    expect(
      screen
        .getByText(/^Opportunity recognition$/i)
        .closest("p")
        ?.querySelector("svg"),
    ).not.toBeNull();
    expect(
      screen.getByRole("link", { name: /AGENTS.md format reference/i }).querySelector("svg"),
    ).not.toBeNull();
    expect(
      screen.getByRole("article", {
        name: `${document.header.fullName} CV`,
      }),
    ).toHaveAttribute("data-paper", "letter");
    expect(
      screen.getByRole("article", {
        name: `${document.header.fullName} CV`,
      }),
    ).toHaveAttribute("data-template", "two-column-with-photo");
  });

  it("keeps the workspace selector, preview actions, and comparison routes aligned with the active variant", () => {
    const document = getCvDocument("operations-transformation");

    render(
      <CvShowcasePage
        document={document}
        paper="a4"
        template="two-column-with-photo"
        version="operations-transformation"
      />,
    );

    const activeWorkspaceLink = screen
      .getAllByRole("link")
      .find(
        (link) =>
          link.getAttribute("href") === "/?version=operations-transformation",
      );

    expect(activeWorkspaceLink).toHaveAttribute("aria-current", "page");
    expect(
      screen.getByRole("link", { name: "View online" }),
    ).toHaveAttribute("href", "/cv/a4?version=operations-transformation");
    expect(
      screen.getByRole("link", { name: "View online" }).querySelector("svg"),
    ).not.toBeNull();
    expect(
      screen.getByRole("link", { name: "Download PDF" }),
    ).toHaveAttribute(
      "href",
      "/generated/cv-pdf/cv-a4-operations-transformation-two-column-with-photo.pdf",
    );
    expect(
      screen.getByLabelText("Listen to narrator read the CV"),
    ).toHaveAttribute("src", "/Marcel_CV_audio-enhanced-v2.mp3");
    expect(
      screen.getByLabelText("Listen to narrator read the CV"),
    ).toHaveAttribute("controls");
    expect(
      screen.getByText("No time to read? Listen to the CV instead."),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Download PDF" })).toHaveClass(
      "!text-white",
    );
    expect(
      screen.getByRole("link", { name: "Download PDF" }).querySelector("svg"),
    ).not.toBeNull();
    expect(screen.getByText(/A4 Portrait · 210 x 297 mm/i)).toBeInTheDocument();
    expect(
      screen.getByText(/^Best use case$/i).closest("dt")?.querySelector("svg"),
    ).not.toBeNull();
    expect(
      screen.getByText(/^Paper$/i).closest("dt")?.querySelector("svg"),
    ).not.toBeNull();
    expect(
      screen.getByText(/^Language$/i).closest("dt")?.querySelector("svg"),
    ).not.toBeNull();
    expect(
      screen.getByText(
        /Reframes the same experience around process improvement, service delivery, documentation discipline, and operational change/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getAllByText(/^Problem$/i)[0].closest("p")?.querySelector("svg"),
    ).not.toBeNull();
    expect(
      screen.getAllByText(/^Fix$/i)[0].closest("p")?.querySelector("svg"),
    ).not.toBeNull();
    expect(
      screen.getAllByText(/^Result$/i)[0].closest("p")?.querySelector("svg"),
    ).not.toBeNull();
  });
});
