import { profile } from "../data/profile"

export function Footer() {
  return (
    <footer className="bg-evergreen-deep px-6 py-6">
      <p className="mx-auto max-w-5xl font-mono text-xs text-white-smoke/40">
        © {new Date().getFullYear()} {profile.name} — construit avec React &amp; Tailwind CSS
      </p>
    </footer>
  )
}
