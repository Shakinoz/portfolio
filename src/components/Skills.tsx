import { skills } from "../data/profile";
import { Section } from "./Section";

export function Skills() {
  return (
    <Section
      id="skills"
      title="Compétences techniques"
      className="bg-evergreen-deep"
    >
      <div className="grid gap-8 sm:grid-cols-2">
        {skills.map((category) => (
          <div
            key={category.label}
            className="rounded-2xl border border-white/10 bg-evergreen/50 p-6"
          >
            <h3 className="font-display text-sm font-semibold text-blue-green">
              {category.label}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {category.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-evergreen-soft border border-white/10 px-3 py-1 font-mono text-xs text-white-smoke/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
