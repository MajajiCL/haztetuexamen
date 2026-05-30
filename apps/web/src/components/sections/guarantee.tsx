"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ShieldCheck, RefreshCcw, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const GUARANTEES = [
  {
    icon: ShieldCheck,
    title: "Garantía de aceptación",
    description:
      "Si tu laboratorio no acepta la orden por cualquier motivo legal, te devolvemos el 100% del dinero en 24 horas. Sin preguntas, sin trámites.",
  },
  {
    icon: RefreshCcw,
    title: "Cambio gratis si te equivocas",
    description:
      "¿Te equivocaste de examen? Te lo cambiamos gratis dentro de las primeras 24 horas. Solo escríbenos por WhatsApp.",
  },
  {
    icon: MessageCircle,
    title: "Soporte humano 24/7",
    description:
      "WhatsApp atendido por personas reales (no bots). Respuesta en menos de 5 minutos a cualquier duda, día o noche.",
  },
];

export function Guarantee() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-brand-primary via-brand-primary to-accent-sage p-12 lg:p-16 shadow-2xl"
        >
          <div className="noise absolute inset-0 opacity-30 pointer-events-none" />
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent-peach opacity-30 blur-[100px]" />

          <div className="relative max-w-4xl mx-auto text-center text-white">
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold mb-4 opacity-90">
              Riesgo cero
            </p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.0] tracking-[-0.035em] text-balance">
              Si no <em className="italic">funciona</em>,
              <br />
              te devolvemos el dinero.
            </h2>
            <p className="mt-6 text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
              Tan seguros estamos del producto que asumimos todo el riesgo por ti.
              Pruébalo sin nada que perder.
            </p>
          </div>

          {/* Guarantee cards */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
            {GUARANTEES.map((g, i) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                  <g.icon className="size-6 text-white" />
                </div>
                <h3 className="font-display text-xl text-white mb-2 leading-tight">
                  {g.title}
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">{g.description}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="relative text-center mt-12">
            <Link href="/catalogo">
              <Button
                size="xl"
                className="bg-white text-brand-primary hover:bg-white/95 shadow-2xl group"
              >
                Probar ahora — sin riesgo
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <p className="text-xs text-white/80 mt-4">
              ✓ Pago seguro Transbank · ✓ Datos cifrados AES-256 · ✓ Cumplimiento Ley 21.719
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
