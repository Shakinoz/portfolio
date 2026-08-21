// Toutes les infos du CV vivent ici. Pour mettre le site à jour,
// c'est le seul fichier à modifier — aucun composant ne contient de texte en dur.

export const profile = {
  name: "Marcel Shakirov",
  role: "Développeur Web Front-End / Fullstack",
  location: "Laveu, 4000 Liège",
  jobSearch: "Recherche d'emploi dans le Nord (59)",
  email: "marcel.shakirov@outlook.com",
  phone: "+32 4 98 75 23 46",
  linkedin: "https://linkedin.com/in/marcel-shakirov-55abb2309",
  github: "https://github.com/Shakinoz",
  summary:
    "Développeur web front-end en formation (IFAPME Liège), avec une expérience concrète en Angular, TypeScript et intégration d'API acquise en entreprise comme sur des projets personnels. À l'aise sur l'ensemble du cycle de développement front-end : architecture par composants, responsive design, consommation d'API REST et logique métier côté client.",
};

export type SkillCategory = {
  label: string;
  items: string[];
};

export const skills: SkillCategory[] = [
  {
    label: "Langages",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "Python",
      "PHP",
      "Java",
      "SQL / MySQL",
    ],
  },
  {
    label: "Frameworks & bibliothèques",
    items: ["Angular", "Vue.js", "RxJS", "Tailwind CSS", "Frappe/ERPNext"],
  },
  {
    label: "Outils & environnement",
    items: [
      "Git",
      "GitHub",
      "GitHub Actions (CI/CD)",
      "Linux (Ubuntu)",
      "VS Code",
    ],
  },
  {
    label: "Concepts",
    items: [
      "Architecture par composants",
      "API REST",
      "Responsive / mobile-first",
      "Single Page Application",
    ],
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  bullets: string[];
};

export const experiences: Experience[] = [
  {
    role: "Fullstack Developer",
    company: "Silicon Brain",
    period:
      "Stagiaire : août 2024 – août 2025 · CDI : septembre 2025 – avril 2026",
    bullets: [
      "Développement d'un site de gestion de tickets pour le support client",
      "Développement de modules spécifiques sur l'ERP interne (pointage, e-commerce) avec Frappe/ERPNext",
      "Intégration de l'API de paiement Glory Payment pour caisses automatiques",
    ],
  },
  {
    role: "Employé polyvalent",
    company: "Carrefour Express, Liège",
    period: "2024",
    bullets: ["Caisse, gestion du stock, facing et rolling en rayon"],
  },
  {
    role: "Préparateur de commandes",
    company: "PFS Web, Hermalle",
    period: "Juin – novembre 2023",
    bullets: ["Collecte et emballage des articles commandés"],
  },
];

export type Project = {
  name: string;
  period: string;
  stack: string[];
  bullets: string[];
  link?: string;
};

export const projects: Project[] = [
  {
    name: "AnimeCat",
    period: "Travail de fin d'études · 2025-2026",
    stack: ["Angular", "TypeScript", "RxJS", "Tailwind CSS", "API REST"],
    bullets: [
      "Single Page Application de catalogue d'animés, architecture par composants et services",
      "Intégration d'une API REST externe (Jikan/MyAnimeList) avec gestion du cache et des limites de requêtes",
      "Découverte par swipe et moteur de recommandation basé sur les préférences utilisateur",
      "Design responsive mobile-first et déploiement automatisé via GitHub Actions",
    ],
    link: "https://shakinoz.github.io/AnimeCat/",
  },
  {
    name: "Break the Bank",
    period: "2025-2026",
    stack: ["Vue.js", "TypeScript", "Vite"],
    bullets: [
      "Mini-jeu jouable dans le navigateur, développé avec Vue 3 et Vite",
    ],
    link: "https://tsifcarnage.github.io/BreakTheBankVtsif/",
  },
];

export type Education = {
  program: string;
  school: string;
  period: string;
};

export const education: Education[] = [
  {
    program: "Développeur Web Front-End",
    school: "Centre IFAPME Liège",
    period: "2024 – 2026",
  },
  {
    program: "Développement d'application",
    school: "HELMo Sainte-Marie",
    period: "2021 – 2024",
  },
];

export type Language = {
  name: string;
  level: string;
};

export const languages: Language[] = [
  { name: "Français", level: "Langue natale" },
  { name: "Anglais", level: "Courant" },
  { name: "Russe", level: "Courant" },
  { name: "Néerlandais", level: "Intermédiaire" },
];
