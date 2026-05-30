"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURES = [
  { name: "Orden básica preventiva", us: "$1.990", a: "$1.990", b: "$5.990", c: "$1.490" },
  { name: "Tiempo de entrega", us: "<10 min", a: "<10 min", b: "20-30 min", c: "<10 min" },
  { name: "Médico con RNPI activo", us: true, a: true, b: true, c: true },
  { name: "Código Fonasa en cada orden", us: true, a: true, b: false, c: true },
  { name: "Selector inteligente de exámenes", us: true, a: false, b: false, c: false },
  { name: "Interpretación de resultados", us: "$9.990", a: false, b: "incluido", c: false },
  { name: "Orden personalizada", us: "$7.990", a: "$15.480", b: false, c: false },
  { name: "Validez nacional", us: true, a: true, b: true, c: true },
  { name: "Soporte WhatsApp 24/7", us: true, a: false, b: false, c: false },
  { name: "Garantía de aceptación", us: true, a: false, b: false, c: false },
];

export function Comparison() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.3em] text-brand-primary font-bold mb-4"
          >
            Comparación honesta
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.0] tracking-[-0.035em] text-balance"
          >
            La <em className="italic text-gradient-aurora">única plataforma</em> con todo
            lo que necesitas
          </motion.h2>
          <p className="mt-6 text-fg-secondary text-lg">
            Comparamos sinceramente nuestras prestaciones contra las 3 plataformas más grandes
            de Chile.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="glass-elevated rounded-3xl overflow-hidden shadow-xl"
        >
          {/* Header */}
          <div className="grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr] gap-4 px-6 py-5 border-b border-fg-primary/10">
            <div />
            <div className="text-center">
              <div className="inline-block px-3 py-1 rounded-full bg-brand-primary text-white text-[10px] uppercase tracking-widest font-bold mb-2">
                Nosotros
              </div>
              <div className="font-display text-lg text-brand-primary">
                haztetuexamen.cl
              </div>
            </div>
            <div className="text-center">
              <div className="text-[10px] uppercase tracking-widest text-fg-muted font-semibold mb-2">
                Competidor A
              </div>
              <div className="font-display text-lg text-fg-secondary">TuChequeo</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] uppercase tracking-widest text-fg-muted font-semibold mb-2">
                Competidor B
              </div>
              <div className="font-display text-lg text-fg-secondary">QMExamen</div>
            </div>
            <div className="text-center">
              <div className="text-[10px] uppercase tracking-widest text-fg-muted font-semibold mb-2">
                Competidor C
              </div>
              <div className="font-display text-lg text-fg-secondary">QM Orden</div>
            </div>
          </div>

          {/* Rows */}
          {FEATURES.map((row, i) => (
            <motion.div
              key={row.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className={`grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr] gap-4 px-6 py-4 items-center ${
                i % 2 === 0 ? "bg-bg-raised/30" : ""
              }`}
            >
              <div className="font-medium text-fg-primary text-sm">{row.name}</div>
              <Cell value={row.us} isUs />
              <Cell value={row.a} />
              <Cell value={row.b} />
              <Cell value={row.c} />
            </motion.div>
          ))}

          {/* Footer CTA */}
          <div className="px-6 py-8 bg-brand-primary/[0.04] border-t border-fg-primary/10 text-center">
            <p className="text-sm text-fg-secondary mb-4">
              <span className="text-fg-primary font-semibold">10 de 10</span> en
              características frente a la competencia
            </p>
            <Link href="/catalogo">
              <Button variant="primary" size="lg" className="group">
                Comenzar mi chequeo ahora
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Cell({ value, isUs }: { value: string | boolean; isUs?: boolean }) {
  if (value === true) {
    return (
      <div className="flex justify-center">
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center ${
            isUs ? "bg-brand-primary text-white" : "bg-status-success/20 text-status-success"
          }`}
        >
          <Check className="size-4" strokeWidth={3} />
        </div>
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="flex justify-center">
        <div className="w-7 h-7 rounded-full bg-fg-primary/5 flex items-center justify-center">
          <X className="size-4 text-fg-muted" />
        </div>
      </div>
    );
  }
  return (
    <div
      className={`text-center font-mono text-sm ${
        isUs ? "text-brand-primary font-bold" : "text-fg-secondary"
      }`}
    >
      {value}
    </div>
  );
}
