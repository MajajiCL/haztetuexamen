"use client";

import Image from "next/image";
import { motion } from "motion/react";

/**
 * Sección split alternada — fotografía dominante a la izquierda, texto a la derecha (y viceversa).
 * Inspirado en Function Health, Apple AirPods Pro storytelling.
 */

const STORIES = [
  {
    photo: "/photography/lifestyle-coffee.png",
    eyebrow: "Sin esperas",
    title: "Sin pedir hora.\nSin perder un día.",
    body: "Olvídate de ir al CESFAM a las 7 AM o esperar tres semanas por una hora con el médico general. Tu orden está en tu mano en lo que demoras un café.",
    metric: "10 min",
    metricLabel: "tiempo promedio de emisión",
  },
  {
    photo: "/photography/lifestyle-running.png",
    eyebrow: "Para ti",
    title: "Cuídate antes de\nque sea urgente.",
    body: "Los exámenes preventivos detectan el 80% de las enfermedades crónicas antes de los síntomas. Si lo postergas, lo postergas para siempre.",
    metric: "80%",
    metricLabel: "de detección temprana en chequeos anuales",
    reverse: true,
  },
  {
    photo: "/photography/lifestyle-results.png",
    eyebrow: "Tranquilidad",
    title: "Resultados que\npuedes entender.",
    body: "Sube tus resultados a la plataforma y un médico te entrega una interpretación clara en 24 horas. Sin jerga médica indescifrable, sin sustos innecesarios.",
    metric: "24 hrs",
    metricLabel: "interpretación de un médico real",
  },
];

export function LifestyleShowcase() {
  return (
    <section className="relative py-32 lg:py-40">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 space-y-32 lg:space-y-44">
        {STORIES.map((story, i) => (
          <div
            key={i}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
              story.reverse ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 relative aspect-[16/11] rounded-[2rem] overflow-hidden"
            >
              <Image
                src={story.photo}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-fg-primary/10 rounded-[2rem]" />
            </motion.div>

            {/* Text */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-[10px] uppercase tracking-[0.3em] text-brand-primary font-medium mb-6">
                  {story.eyebrow}
                </p>
                <h3 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-[-0.035em] text-balance whitespace-pre-line">
                  {story.title}
                </h3>
                <p className="mt-8 text-lg text-fg-secondary leading-[1.6] font-light max-w-md">
                  {story.body}
                </p>

                <div className="mt-10 pt-8 border-t border-fg-primary/10">
                  <div className="font-display text-5xl tracking-tight">{story.metric}</div>
                  <div className="mt-2 text-sm text-fg-muted">{story.metricLabel}</div>
                </div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
