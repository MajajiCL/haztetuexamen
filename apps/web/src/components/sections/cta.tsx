"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2.5rem] p-12 md:p-20 text-center"
        >
          {/* Animated gradient bg */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-brand-tertiary to-brand-secondary opacity-90" />
          <div className="absolute inset-0 bg-bg-base/30" />
          <div className="noise absolute inset-0" />

          {/* Glow orbs */}
          <motion.div
            className="absolute -top-1/2 left-1/4 w-96 h-96 bg-white/20 rounded-full blur-[100px]"
            animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-fg-primary text-balance leading-[1.05]">
              Tu próximo chequeo está a{" "}
              <span className="italic">cinco minutos</span> de distancia
            </h2>
            <p className="mt-8 text-lg sm:text-xl text-fg-primary/90 max-w-2xl mx-auto">
              Únete a miles de chilenos que ya cuidan su salud sin filas, sin esperas, sin
              complicaciones.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/catalogo">
                <Button
                  size="xl"
                  className="bg-bg-base text-fg-primary hover:bg-bg-surface shadow-2xl group"
                >
                  Empezar ahora
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            <p className="mt-8 text-sm text-fg-primary/70">
              Sin suscripción. Sin compromiso. Pagas solo lo que pides.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
