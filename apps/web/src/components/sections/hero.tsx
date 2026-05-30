"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Mail,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATALOG, formatCLP } from "@haztetuexamen/shared";

/**
 * Hero V7 — Conversion-optimized
 * Hook + buscador + producto visible + ticker live + CTAs múltiples
 */

const POPULAR_SEARCHES = [
  "Chequeo general",
  "Perfil tiroideo",
  "VIH",
  "Cardiovascular",
  "Ecografía abdominal",
];

const ACTIVITY_FEED = [
  { name: "María", city: "Providencia", action: "compró", product: "Chequeo General" },
  { name: "Cristóbal", city: "Las Condes", action: "recibió", product: "Perfil Tiroideo" },
  { name: "Camila", city: "Ñuñoa", action: "compró", product: "Salud Sexual" },
  { name: "Diego", city: "Maipú", action: "recibió", product: "Cardiovascular" },
  { name: "Valentina", city: "La Florida", action: "compró", product: "Ecografía Abdominal" },
  { name: "Sebastián", city: "Vitacura", action: "recibió", product: "Chequeo +40" },
];

export function Hero() {
  const [search, setSearch] = useState("");
  const [activityIdx, setActivityIdx] = useState(0);
  const [filtered, setFiltered] = useState<typeof CATALOG>([]);

  // Live activity ticker
  useEffect(() => {
    const t = setInterval(() => {
      setActivityIdx((i) => (i + 1) % ACTIVITY_FEED.length);
    }, 3500);
    return () => clearInterval(t);
  }, []);

  // Search filtering
  useEffect(() => {
    if (search.length < 2) {
      setFiltered([]);
      return;
    }
    const q = search.toLowerCase();
    setFiltered(
      CATALOG.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.exams.some((e) => e.name.toLowerCase().includes(q))
      ).slice(0, 5)
    );
  }, [search]);

  const activity = ACTIVITY_FEED[activityIdx]!;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-12">
      {/* Background */}
      <div className="absolute inset-0 bg-aurora opacity-80" />
      <div className="noise absolute inset-0 pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-accent-peach opacity-30 blur-[120px] animate-blob-1 pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-accent-sage opacity-25 blur-[120px] animate-blob-2 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1280px] w-full px-6 lg:px-12">
        {/* LIVE ACTIVITY TICKER (top of hero) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-elevated">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-success opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-status-success" />
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={activityIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-xs sm:text-sm text-fg-secondary"
              >
                <span className="font-semibold text-fg-primary">{activity.name}</span>{" "}
                de {activity.city}{" "}
                <span className="text-brand-primary font-medium">{activity.action}</span>{" "}
                {activity.product}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* HOOK HEADLINE */}
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-normal text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.0] tracking-[-0.035em] text-balance text-fg-primary"
          >
            Tu orden médica firmada,{" "}
            <em className="italic text-gradient-aurora font-normal">
              en tu email en 10 minutos
            </em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-fg-secondary leading-relaxed"
          >
            Más de <span className="font-semibold text-fg-primary">2.847 chilenos</span> ya
            se hicieron su chequeo esta semana sin filas. Desde{" "}
            <span className="font-mono font-semibold text-brand-primary text-2xl">
              $1.990
            </span>
          </motion.p>

          {/* INTERACTIVE SEARCH BAR (the hook) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 max-w-2xl mx-auto relative"
          >
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-5 text-fg-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Busca tu examen…  ej: Hemograma, VIH, Tiroides"
                className="w-full h-16 pl-16 pr-32 rounded-full glass-elevated text-lg outline-none border-2 border-transparent focus:border-brand-primary/40 transition-all shadow-lg"
              />
              <Link href="/catalogo">
                <Button
                  variant="primary"
                  size="md"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  Ver todos
                  <ArrowRight />
                </Button>
              </Link>
            </div>

            {/* Search dropdown */}
            <AnimatePresence>
              {filtered.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-3 left-0 right-0 glass-elevated rounded-2xl p-3 shadow-2xl z-50"
                >
                  {filtered.map((p) => (
                    <Link
                      key={p.id}
                      href={`/catalogo`}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-brand-primary/5 transition-colors group"
                    >
                      <div className="text-left">
                        <div className="font-medium text-fg-primary">{p.name}</div>
                        <div className="text-xs text-fg-muted mt-0.5">
                          {p.shortDescription}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-brand-primary">
                          {formatCLP(p.priceCLP)}
                        </span>
                        <ArrowRight className="size-4 text-fg-muted group-hover:text-brand-primary transition-colors" />
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Popular searches chips */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="text-xs text-fg-muted uppercase tracking-widest mr-1">
                Populares:
              </span>
              {POPULAR_SEARCHES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSearch(s)}
                  className="px-3 py-1 rounded-full glass text-xs hover:bg-brand-primary/10 hover:text-brand-primary transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>

          {/* TRUST BADGES — quick scan */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm"
          >
            <TrustBadge icon={Clock} text="Entrega en <10 min" />
            <TrustBadge icon={ShieldCheck} text="Médicos colegiados (RNPI)" />
            <TrustBadge icon={Mail} text="Por email · sin app" />
            <TrustBadge icon={CheckCircle2} text="100% legal en Chile" />
          </motion.div>

          {/* PRICE COMPARISON STRIP */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 max-w-4xl mx-auto"
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-fg-muted mb-4 flex items-center justify-center gap-2">
              <TrendingUp className="size-3" /> Comparación de precios · Orden básica
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <PriceCard
                name="Nosotros"
                price="$1.990"
                isUs
                subtext="Haztetuexamen.cl"
              />
              <PriceCard name="TuChequeo" price="$1.990" />
              <PriceCard name="Quiero Mi Examen" price="$5.990" strikethrough />
              <PriceCard name="Quiero Mi Orden" price="$1.490" />
            </div>
            <p className="text-[10px] text-fg-muted mt-3 italic">
              Datos públicos de cada plataforma a mayo 2026
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TrustBadge({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 text-fg-secondary">
      <Icon className="size-4 text-brand-primary" />
      <span className="font-medium">{text}</span>
    </div>
  );
}

function PriceCard({
  name,
  price,
  isUs,
  strikethrough,
  subtext,
}: {
  name: string;
  price: string;
  isUs?: boolean;
  strikethrough?: boolean;
  subtext?: string;
}) {
  return (
    <div
      className={
        isUs
          ? "rounded-2xl p-4 bg-brand-primary text-white shadow-xl scale-105"
          : "rounded-2xl p-4 glass"
      }
    >
      <p
        className={
          isUs
            ? "text-[10px] uppercase tracking-widest font-bold opacity-90"
            : "text-[10px] uppercase tracking-widest text-fg-muted font-semibold"
        }
      >
        {name}
      </p>
      <p
        className={
          isUs
            ? "font-mono text-2xl font-bold mt-2"
            : strikethrough
              ? "font-mono text-2xl font-bold mt-2 text-fg-secondary line-through decoration-status-danger"
              : "font-mono text-2xl font-bold mt-2 text-fg-secondary"
        }
      >
        {price}
      </p>
      {subtext && (
        <p className="text-[10px] mt-1 opacity-80">{subtext}</p>
      )}
    </div>
  );
}
