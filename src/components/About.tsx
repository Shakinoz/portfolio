import { profile } from "../data/profile";
import { Section } from "./Section";

export function About() {
  return (
    <Section id="about" title="Qui je suis">
      <div className="grid gap-10 sm:grid-cols-[2fr_1fr]">
        <p className="text-lg leading-relaxed text-white-smoke/80">
          {profile.summary}
        </p>
        <dl className="space-y-4 border-l border-white/10 pl-6 font-mono text-sm">
          <div>
            <dt className="text-white-smoke/50">Localisation</dt>
            <dd className="mt-1 text-white-smoke">{profile.location}</dd>
          </div>
          <div>
            <dt className="text-white-smoke/50">Disponibilité</dt>
            <dd className="mt-1 text-jungle-green">{profile.jobSearch}</dd>
          </div>
        </dl>
      </div>
    </Section>
  );
}
