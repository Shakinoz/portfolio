import type { PropsWithChildren } from "react";

type SectionProps = PropsWithChildren<{
  id: string;
  title: string;
  className?: string;
}>;

/**
 * Wrapper commun à toutes les sections de contenu : même rythme vertical,
 * même en-tête. Garde App.tsx simple et évite de
 * dupliquer le markup de titre dans chaque section.
 */
export function Section({ id, title, className = "", children }: SectionProps) {
  return (
    <section id={id} className={`m-full px-6 py-20 sm:py-28 ${className}`}>
      <div className="max-w-5xl mx-auto">
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white-smoke sm:text-4xl">
          {title}
        </h2>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
