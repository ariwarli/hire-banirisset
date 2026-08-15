import { IdentityColumn } from "@/components/layout/identity-column";
import { MobileChrome } from "@/components/layout/mobile-chrome";

/**
 * Two-track shell: 344px ink identity column + paper content.
 *
 * The ink colour belongs to THIS grid container as a background-image, not
 * to the column element. That is the one non-obvious rule in the layout:
 * the column is `items-start` + `sticky`, so it is only as tall as its own
 * content, and the gradient keeps the track reading full-height. If you
 * instead stretch the column and space its children apart, every pixel the
 * right column grows lands in a dead gap mid-column.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-full md:grid md:items-start md:[background-image:linear-gradient(90deg,var(--ink)_344px,var(--paper)_344px)] md:[grid-template-columns:344px_minmax(0,1fr)]"
    >
      <MobileChrome />
      <aside className="hidden md:sticky md:top-0 md:block">
        <IdentityColumn />
      </aside>
      <main className="min-w-0">{children}</main>
    </div>
  );
}
