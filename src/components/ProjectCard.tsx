import type { Project } from "../data/profile"

export function ProjectCard({ project }: { project: Project }) {
  const Wrapper = project.link ? "a" : "div"
  const wrapperProps = project.link
    ? { href: project.link, target: "_blank", rel: "noreferrer" }
    : {}

  return (
    <Wrapper
      {...wrapperProps}
      className="group flex h-full flex-col rounded-2xl border border-white/10 bg-evergreen-soft/50 p-6 transition-colors hover:border-cornflower-ocean"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-display text-xl font-semibold text-white-smoke">
          {project.name}
        </h3>
        {project.link && (
          <span
            aria-hidden="true"
            className="font-mono text-blue-green transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        )}
      </div>
      <p className="mt-1 font-mono text-xs uppercase tracking-wider text-white-smoke/50">
        {project.period}
      </p>

      <ul className="mt-4 flex-1 space-y-1.5 text-sm leading-relaxed text-white-smoke/70">
        {project.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-2">
            <span className="text-jungle-green">–</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-white-smoke/70"
          >
            {tech}
          </li>
        ))}
      </ul>
    </Wrapper>
  )
}
