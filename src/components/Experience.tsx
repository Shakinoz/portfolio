import { experiences } from "../data/profile";
import { Section } from "./Section";

export function Experience() {
  return (
    <Section id="experience" title="Expériences professionnelles">
      <ol className="space-y-10 border-l border-white/10">
        {experiences.map((exp) => (
          <li key={`${exp.role}-${exp.company}`} className="relative pl-8">
            <span
              className="absolute left-[-5px] top-1.5 h-2.5 w-2.5 rounded-full bg-jungle-green"
              aria-hidden="true"
            />
            <p className="font-mono text-xs uppercase tracking-wider text-white-smoke/50">
              {exp.period}
            </p>
            <h3 className="mt-1 font-display text-xl font-semibold text-white-smoke">
              {exp.role}{" "}
              <span className="text-white-smoke/50">· {exp.company}</span>
            </h3>
            <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-white-smoke/70">
              {exp.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span className="text-blue-green">–</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
