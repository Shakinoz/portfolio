import { projects } from "../data/profile";
import { ProjectCard } from "./ProjectCard";
import { Section } from "./Section";

export function Projects() {
  return (
    <Section
      id="projects"
      title="Projets personnels"
      className="bg-evergreen-deep"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </Section>
  );
}
