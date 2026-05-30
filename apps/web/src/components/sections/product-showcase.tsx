"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Showcase del producto — el iPhone con la app.
 * Estilo Apple Watch landing.
 */
export function ProductShowcase() {
  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] uppercase tracking-[0.3em] text-brand-primary font-medium mb-6"
            >
              Producto
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.92] tracking-[-0.04em] text-balance"
            >
              Salud en tu{" "}
              <em className="italic text-gradient-brand font-normal">bolsillo</em>.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-10 text-lg text-fg-secondary leading-[1.6] font-light max-w-md"
            >
              Sin descargar apps. Sin instalar nada. Sin crear cuentas complicadas.
              Funciona perfectamente desde tu navegador, en cualquier dispositivo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-12 grid grid-cols-2 gap-6 max-w-sm"
            >
              <Feature value="0" label="apps que instalar" />
              <Feature value="3" label="pasos hasta tu orden" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-12"
            >
              <Link href="/catalogo">
                <Button variant="outline" size="lg" className="group">
                  Probar ahora
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Phone visual */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto rounded-[2rem] overflow-hidden">
              <Image
                src="/photography/product-phone.png"
                alt="Plataforma haztetuexamen en celular"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-fg-primary/10 rounded-[2rem]" />
            </div>

            {/* Glow behind phone */}
            <div className="absolute inset-0 -z-10 blur-3xl bg-gradient-radial from-brand-primary/30 via-brand-secondary/20 to-transparent scale-90" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Feature({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-5xl tracking-tight text-brand-primary">{value}</div>
      <div className="mt-1 text-xs text-fg-muted uppercase tracking-widest">{label}</div>
    </div>
  );
}
