"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Plus, Check } from "lucide-react";
import {
  CATALOG,
  CATEGORY_LABELS,
  formatCLP,
  type ExamCategory,
} from "@haztetuexamen/shared";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart";
import { cn } from "@/lib/utils";

type Filter = ExamCategory | "all";

const BADGE_STYLES: Record<string, string> = {
  popular: "bg-brand-primary/20 text-brand-primary border-brand-primary/30",
  recomendado: "bg-status-success/20 text-status-success border-status-success/30",
  nuevo: "bg-brand-secondary/20 text-brand-secondary border-brand-secondary/30",
  premium: "bg-status-warning/20 text-status-warning border-status-warning/30",
};

export default function CatalogPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const addItem = useCart((s) => s.addItem);
  const items = useCart((s) => s.items);
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const filtered =
    filter === "all" ? CATALOG : CATALOG.filter((p) => p.category === filter);

  const isInCart = (id: string) => items.some((i) => i.productId === id);

  const handleAdd = (id: string) => {
    addItem(id);
    setJustAdded(id);
    setTimeout(() => setJustAdded(null), 1500);
  };

  const allCategories = Array.from(new Set(CATALOG.map((p) => p.category)));

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12 max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-brand-primary font-medium mb-4">
              Catálogo
            </p>
            <h1 className="font-display text-5xl sm:text-6xl text-balance leading-tight mb-6">
              Todos los exámenes,{" "}
              <span className="text-gradient-brand italic">un solo lugar</span>
            </h1>
            <p className="text-lg text-fg-secondary leading-relaxed">
              Selecciona los exámenes que necesitas. Todos incluyen códigos arancelarios
              Fonasa y son aceptados en cualquier laboratorio chileno.
            </p>
          </div>

          {/* Filter chips */}
          <div className="flex flex-wrap gap-2 mb-12">
            <button
              onClick={() => setFilter("all")}
              className={cn(
                "px-5 py-2 rounded-full text-sm transition-all",
                filter === "all"
                  ? "bg-brand-primary text-bg-base"
                  : "glass hover:border-brand-primary/30"
              )}
            >
              Todos · {CATALOG.length}
            </button>
            {allCategories.map((cat) => {
              const count = CATALOG.filter((p) => p.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={cn(
                    "px-5 py-2 rounded-full text-sm transition-all",
                    filter === cat
                      ? "bg-brand-primary text-bg-base"
                      : "glass hover:border-brand-primary/30"
                  )}
                >
                  {CATEGORY_LABELS[cat]} · {count}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product, i) => (
                <motion.article
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative glass rounded-2xl p-6 hover:border-brand-primary/40 transition-all duration-500 flex flex-col"
                >
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

                  <p className="text-xs text-fg-muted uppercase tracking-widest mb-3">
                    {CATEGORY_LABELS[product.category]}
                  </p>

                  <h3 className="font-display text-2xl leading-tight mb-3">
                    {product.name}
                  </h3>

                  <p className="text-sm text-fg-secondary leading-relaxed mb-6 flex-grow">
                    {product.fullDescription}
                  </p>

                  {product.exams.length > 0 && (
                    <div className="mb-6 pb-6 border-b border-fg-primary/5">
                      <p className="text-xs text-fg-muted mb-2">
                        Incluye {product.exams.length} examen(es):
                      </p>
                      <ul className="space-y-1">
                        {product.exams.map((exam) => (
                          <li
                            key={exam.fonasaCode}
                            className="text-xs flex items-start gap-2"
                          >
                            <span className="font-mono text-brand-primary shrink-0">
                              {exam.fonasaCode}
                            </span>
                            <span className="text-fg-secondary">{exam.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-end justify-between mt-auto">
                    <div>
                      <p className="text-xs text-fg-muted mb-1">Precio</p>
                      <p className="font-mono text-2xl font-bold">
                        {formatCLP(product.priceCLP)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleAdd(product.id)}
                      disabled={justAdded === product.id}
                      className={cn(
                        "flex items-center gap-2 px-5 h-11 rounded-full text-sm font-medium transition-all",
                        isInCart(product.id) && !justAdded
                          ? "bg-status-success/20 text-status-success border border-status-success/40"
                          : "bg-brand-primary text-bg-base hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]"
                      )}
                    >
                      {justAdded === product.id ? (
                        <>
                          <Check className="size-4" />
                          Agregado
                        </>
                      ) : isInCart(product.id) ? (
                        <>
                          <Check className="size-4" />
                          En carrito
                        </>
                      ) : (
                        <>
                          <Plus className="size-4" />
                          Agregar
                        </>
                      )}
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </AnimatePresence>

          {/* Sticky cart bar */}
          {items.length > 0 && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 glass-strong rounded-full px-6 py-3 flex items-center gap-4"
            >
              <span className="text-sm">
                <span className="font-mono font-bold text-brand-primary">
                  {items.reduce((s, i) => s + i.quantity, 0)}
                </span>{" "}
                exámen(es) ·{" "}
                <span className="font-mono">
                  {formatCLP(
                    items.reduce((s, i) => s + i.unitPriceCLP * i.quantity, 0)
                  )}
                </span>
              </span>
              <Link href="/checkout">
                <Button variant="primary" size="sm">
                  Ir al checkout
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
