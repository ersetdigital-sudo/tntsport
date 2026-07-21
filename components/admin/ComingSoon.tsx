import Link from "next/link";

/**
 * ComingSoon — placeholder for admin sub-routes that haven't shipped yet.
 *
 * Phase 4-7 will replace each of these with a real CRUD manager. Until
 * then, this page keeps the route resolvable (so the sidebar links don't
 * 404) and tells the visitor which phase will deliver the feature.
 */
export function ComingSoon({
  title,
  phase,
  description,
}: {
  title: string;
  phase: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-lg">
      <div className="bg-surface-card rounded-md p-xl border border-hairline">
        <span className="text-button-sm text-primary uppercase tracking-wider">
          {phase}
        </span>
        <h2 className="text-heading-md text-ink mt-sm">{title}</h2>
        <p className="text-body-md text-charcoal dark:text-on-dark-mute mt-md">{description}</p>
      </div>

      <Link
        href="/admin"
        className="text-button-md inline-flex h-11 items-center justify-center rounded-full border border-hairline-strong bg-white px-lg text-charcoal hover:bg-surface hover:text-ink transition-colors duration-normal dark:bg-surface-dark dark:text-on-dark-mute dark:border-hairline dark:hover:bg-secondary dark:hover:text-on-primary self-start"
      >
        ← Kembali ke Dashboard
      </Link>
    </div>
  );
}
