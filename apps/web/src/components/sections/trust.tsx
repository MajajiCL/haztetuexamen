"use client";

import { motion } from "motion/react";
import { Shield, Scale, Lock, FileCheck } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: Scale,
    title: "Médicos con RNPI",
    description:
      "Nuestros médicos están inscritos en el Registro Nacional de Prestadores Individuales (RNPI) de la Superintendencia de Salud.",
    law: "Ley 21.746",
  },
  {
    icon: Shield,
    title: "Firma electrónica vigente",
    description:
      "Órdenes firmadas con Firma Electrónica Simple (FES) según el Código Sanitario y aceptadas en todos los laboratorios chilenos.",
    law: "Ley 19.799",
  },
  {
    icon: Lock,
    title: "Datos cifrados AES-256",
    description:
      "Tu información clínica está protegida bajo el estándar de responsabilidad proactiva con cifrado a nivel de base de datos.",
    law: "Ley 21.719",
  },
  {
    icon: FileCheck,
    title: "Compatible con Fonasa e Isapres",
    description:
      "Códigos arancelarios Fonasa incluidos en cada orden. Tus exámenes se bonifican automáticamente vía IMed en cualquier laboratorio adscrito.",
    law: "Arancel Fonasa",
  },
];

export function Trust() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Soft background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-surface/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest text-brand-primary font-medium mb-4"
          >
            Cumplimiento legal
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl text-balance leading-tight"
          >
            Construido bajo las{" "}
            <span className="text-gradient-brand italic">leyes chilenas de salud</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-fg-secondary"
          >
            No somos una intermediación. Somos una plataforma médica regulada operando bajo
            el marco legal chileno completo.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group glass rounded-2xl p-6 hover:border-brand-primary/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <item.icon className="size-6 text-brand-primary" />
              </div>
              <p className="font-mono text-xs text-fg-muted mb-2 uppercase tracking-widest">
                {item.law}
              </p>
              <h3 className="font-display text-xl mb-3 leading-tight">{item.title}</h3>
              <p className="text-sm text-fg-secondary leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
