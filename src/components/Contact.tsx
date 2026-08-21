import { profile } from "../data/profile";

const links = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  {
    label: "Téléphone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/marcel-shakirov",
    href: profile.linkedin,
  },
  { label: "GitHub", value: "github.com/Shakinoz", href: profile.github },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-white/10 bg-evergreen-deep"
    >
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-blue-green">
          06 — Contact
        </p>
        <h2 className="mt-3 max-w-md font-display text-3xl font-semibold tracking-tight text-white-smoke sm:text-4xl">
          Discutons de votre prochain projet front-end
        </h2>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                className="flex flex-col rounded-2xl border border-white/10 p-5 transition-colors hover:border-jungle-green"
              >
                <span className="font-mono text-xs uppercase tracking-wider text-white-smoke/50">
                  {link.label}
                </span>
                <span className="mt-1 text-white-smoke">{link.value}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
