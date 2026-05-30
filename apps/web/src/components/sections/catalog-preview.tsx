"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";
import { CATALOG, formatCLP } from "@haztetuexamen/shared";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Toma los primeros 6 productos para mostrar en el preview
const FEATURED_PRODUCTS = CATALOG.slice(0, 6);

const BADGE_STYLES: Record<string, string> = {
  popular: "bg-brand-primary/20 text-brand-primary border-brand-primary/30",
  recomendado: "bg-status-success/20 text-status-success border-status-success/30",
  nuevo: "bg-brand-secondary/20 text-brand-secondary border-brand-secondary/30",
  premium: "bg-status-warning/20 text-status-warning border-status-warning/30",
};

export function CatalogPreview() {
  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-widest text-brand-primary font-medium mb-4"
            >
              Catálogo
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl text-balance leading-tight"
            >
              Exámenes preventivos para cada{" "}
              <span className="text-gradient-brand italic">etapa de tu vida</span>
            </motion.h2>
          </div>
          <Link href="/catalogo">
            <Button variant="outline" size="md" className="group whitespace-nowrap">
              Ver catálogo completo
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_PRODUCTS.map((product, i) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative glass rounded-2xl p-6 hover:border-brand-primary/40 transition-all duration-500 hover:-translate-y-1 cursor-pointer"
            >
              {/* Badge */}
              {product.badge && (
                <div
                  className={cn(
                    "absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold border",
                    BADGE_STYLES[product.badge]
                  )}
                >
                  {product.badge}
                </div>
              )}

              {/* Category */}
              <p className="text-xs text-fg-muted uppercase tracking-widest mb-3">
                {product.category.replace(/-/g, " ")}
              </p>

              {/* Name */}
              <h3 className="font-display text-2xl leading-tight mb-3 group-hover:text-brand-primary transition-colors">
                {product.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-fg-secondary leading-relaxed mb-6 min-h-[3rem]">
                {product.shortDescription}
              </p>

              {/* Exams preview */}
              {product.exams.length > 0 && (
                <div className="mb-6 pb-6 border-b border-fg-primary/5">
                  <p className="text-xs text-fg-muted mb-2">Incluye:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.exams.slice(0, 3).map((exam) => (
                      <span
                        key={exam.fonasaCode}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-fg-primary/5 text-fg-secondary"
                      >
                        {exam.name.slice(0, 24)}
                        {exam.name.length > 24 ? "…" : ""}
                      </span>
                    ))}
                    {product.exams.length > 3 && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded text-fg-muted">
                        +{product.exams.length - 3} más
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Price + CTA */}
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-fg-muted mb-1">Desde</p>
                  <p className="font-mono text-2xl font-bold">
                    {formatCLP(product.priceCLP)}
                  </p>
                </div>
                <button
                  className="w-10 h-10 rounded-full bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-bg-base transition-all duration-300 flex items-center justify-center"
                  aria-label="Agregar al carrito"
                >
                  <Plus className="size-5" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
