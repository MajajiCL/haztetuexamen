"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ShieldCheck, Stethoscope, FileCheck } from "lucide-react";

const POINTS = [
  {
    icon: Stethoscope,
    text: "Médicos colaboradores con registro vigente en el Registro Nacional de Prestadores Individuales (RNPI) de la Superintendencia de Salud chilena.",
  },
  {
    icon: ShieldCheck,
    text: "Cada orden incluye nombre, RUT, especialidad y número de registro del médico firmante. Total trazabilidad legal.",
  },
  {
    icon: FileCheck,
    text: "Firma electrónica simple (FES) según el Código Sanitario chileno y la Ley 19.799. Validez nacional aceptada por todos los laboratorios.",
  },
];

export function DoctorSection() {
  return (
    <section className="relative py-32 lg:py-44 overflow-hidden">
      {/* Background tone shift */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-surface/50 to-transparent" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden">
              <Image
                src="/photography/doctor-screen.png"
                alt="Médico chileno revisando ficha clínica"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-fg-primary/10 rounded-[2rem]" />
            </div>

            {/* Credential badge floating */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-6 -right-6 glass-strong rounded-2xl p-5 max-w-xs"
            >
              <p className="text-[10px] uppercase tracking-[0.25em] text-fg-muted mb-2">
                Médico responsable
              </p>
              <p className="font-display text-xl leading-tight mb-1">
                Dr. [Nombre Apellido]
              </p>
              <p className="font-mono text-xs text-brand-primary">
                RNPI 482910 · Superintendencia de Salud
              </p>
            </motion.div>
          </motion.div>

          {/* Text */}
          <div className="lg:col-span-6">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] uppercase tracking-[0.3em] text-brand-primary font-medium mb-6"
            >
              Médicos reales
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] tracking-[-0.035em] text-balance"
            >
              No somos una <em className="italic text-gradient-brand font-normal">app</em>.
              <br />
              Somos una plataforma médica.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8 text-lg text-fg-secondary leading-[1.6] font-light max-w-xl"
            >
              Cada orden emitida por haztetuexamen.cl es firmada por un médico cirujano
              chileno con registro vigente. Cumplimos integralmente con el marco
              regulatorio sanitario nacional.
            </motion.p>

            <div className="mt-12 space-y-5">
              {POINTS.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="shrink-0 w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center mt-0.5">
                    <p.icon className="size-4 text-brand-primary" />
                  </div>
                  <p className="text-fg-secondary leading-relaxed pt-1">{p.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
