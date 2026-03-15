import { CvAppShellDeliveryGrid } from "@/features/cv/components/shell/CvAppShellDeliveryGrid";
import { CvAppShellFoundationGrid } from "@/features/cv/components/shell/CvAppShellFoundationGrid";
import { CvAppShellHero } from "@/features/cv/components/shell/CvAppShellHero";
import { CvAppShellPreview } from "@/features/cv/components/shell/CvAppShellPreview";

export function CvAppShell() {
  return (
    <main className="min-h-screen bg-app-background px-6 py-10 text-text sm:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <CvAppShellHero />
        <CvAppShellPreview />
        <CvAppShellFoundationGrid />
        <CvAppShellDeliveryGrid />
      </div>
    </main>
  );
}
