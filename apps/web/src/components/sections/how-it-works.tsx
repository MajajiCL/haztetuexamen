"use client";

import { motion } from "motion/react";
import { MousePointerClick, CreditCard, Mail } from "lucide-react";

const STEPS = [
  {
    icon: MousePointerClick,
    number: "01",
    title: "Elige tu examen",
    description:
      "Navega el catálogo o usa el selector 3D anatómico. Selecciona los exámenes que necesitas y agrégalos al carrito.",
    color: "from-brand-primary to-brand-tertiary",
  },
  {
    icon: CreditCard,
    number: "02",
    title: "Paga seguro",
    description:
      "Completa tus datos como paciente y paga con Webpay Plus. Aceptamos débito, crédito y todas las tarjetas chilenas.",
    color: "from-brand-tertiary to-brand-secondary",
  },
  {
    icon: Mail,
    number: "03",
    title: "Recibe tu orden",
    description:
      "Tu orden médica firmada electrónicamente llega a tu email en menos de 10 minutos. Imprímela o muéstrala en pantalla en cualquier laboratorio.",
    color: "from-brand-secondary to-brand-primary",
  },
];

export function HowItWorks() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-xs uppercase tracking-widest text-brand-primary font-medium mb-4"
          >
            Tres pasos
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl text-balance leading-tight"
          >
            Más rápido que pedir <span className="text-gradient-brand italic">delivery</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 text-lg text-fg-secondary max-w-2xl mx-auto"
          >
            Sin esperar consultas presenciales. Sin filas. Sin papeles que se pierden.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative group"
            >
              <div className="relative h-full glass rounded-3xl p-8 hover:border-brand-primary/30 transition-all duration-500 hover:-translate-y-1">
                {/* Gradient glow on hover */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`}
                />

                {/* Step number */}
                <div className="flex items-center justify-between mb-8">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                  >
                    <step.icon className="size-7 text-bg-base" />
                  </div>
                  <span className="font-mono text-6xl font-bold text-fg-primary/10 group-hover:text-fg-primary/20 transition-colors">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-display text-2xl mb-3">{step.title}</h3>
                <p className="text-fg-secondary leading-relaxed">{step.description}</p>
              </div>

              {/* Connector line (desktop only, not on last) */}
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 lg:-right-6 w-8 lg:w-12 h-px bg-gradient-to-r from-brand-primary/40 to-transparent -translate-y-1/2 z-10" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
