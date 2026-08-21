import { education, languages } from "../data/profile";
import { Section } from "./Section";

export function EducationLanguages() {
  return (
    <Section id="education" title="Parcours académique">
      <div className="grid gap-12 sm:grid-cols-2">
        <div className="space-y-6">
          {education.map((item) => (
            <div key={item.program}>
              <p className="font-mono text-xs uppercase tracking-wider text-white-smoke/50">
                {item.period}
              </p>
              <h3 className="mt-1 font-display text-lg font-semibold text-white-smoke">
                {item.program}
              </h3>
              <p className="text-sm text-white-smoke/70">{item.school}</p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold text-blue-green">
            Langues
          </h3>
          <ul className="mt-4 space-y-3">
            {languages.map((lang) => (
              <li
                key={lang.name}
                className="flex items-center justify-between border-b border-white/10 pb-2 text-sm"
              >
                <span className="text-white-smoke">{lang.name}</span>
                <span className="font-mono text-xs text-white-smoke/50">
                  {lang.level}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
