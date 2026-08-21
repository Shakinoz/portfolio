import { useEffect, useState } from "react";
import { profile } from "../data/profile";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { motion, AnimatePresence } from "framer-motion";

const roles = [
  "Développeur front-end",
  "Développeur fullstack",
  "Intégrateur API REST",
];

function RoleRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % roles.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-blue-green inline-flex items-center overflow-hidden">
      <span aria-hidden="true" className="mr-1">
        {"> "}
      </span>

      {/* Conteneur relatif avec hauteur fixe/relative si nécessaire */}
      <span className="inline-block relative">
        <AnimatePresence mode="wait">
          <motion.span
            key={roles[index]}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="inline-block"
          >
            {roles[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-[95vh] items-center overflow-hidden">
      <ShaderGradientCanvas style={{ position: "absolute", inset: 0 }}>
        <ShaderGradient
          animate="on"
          axesHelper="on"
          bgColor1="#000000"
          bgColor2="#000000"
          brightness={1.1}
          cAzimuthAngle={0}
          cDistance={7.1}
          cPolarAngle={140}
          cameraZoom={17.29}
          color1="#1a2e26"
          color2="#43b175"
          color3="#0e6ba8"
          destination="onCanvas"
          embedMode="off"
          envPreset="city"
          format="gif"
          fov={45}
          frameRate={10}
          gizmoHelper="hide"
          grain="off"
          lightType="3d"
          pixelDensity={1}
          positionX={0}
          positionY={0}
          positionZ={0}
          range="disabled"
          rangeEnd={40}
          rangeStart={0}
          reflection={0.1}
          rotationX={0}
          rotationY={0}
          rotationZ={0}
          shader="defaults"
          type="sphere"
          uAmplitude={1.4}
          uDensity={1.1}
          uFrequency={5.5}
          uSpeed={0.1}
          uStrength={1}
          uTime={0}
          wireframe={false}
        />
      </ShaderGradientCanvas>
      {/* voile pour garder le texte lisible au-dessus du dégradé */}
      <div className="absolute inset-0 bg-evergreen/35" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-5xl px-6 py-24">
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-white-smoke/60">
          {profile.jobSearch}
        </p>
        <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white-smoke sm:text-7xl">
          {profile.name}
        </h1>
        <p className="mt-6 text-2xl font-medium text-white-smoke/90 sm:text-3xl">
          <RoleRotator />
        </p>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-white-smoke/70">
          {profile.summary}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="rounded-full bg-jungle-green px-6 py-3 font-mono text-sm font-medium text-evergreen-deep transition-transform hover:scale-[1.03]"
          >
            Me contacter
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/20 px-6 py-3 font-mono text-sm font-medium text-white-smoke transition-colors hover:border-blue-green hover:text-blue-green"
          >
            Voir le GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
