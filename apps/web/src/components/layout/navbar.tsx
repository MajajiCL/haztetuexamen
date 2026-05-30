"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart";

const NAV_LINKS = [
  { href: "/catalogo", label: "Catálogo" },
  { href: "/como-funciona", label: "Cómo funciona" },
  { href: "/precios", label: "Precios" },
  { href: "/preguntas", label: "Preguntas" },
];

function Wordmark() {
  return (
    <Link href="/" className="group flex items-center">
      <span className="font-display text-[22px] tracking-[-0.04em] leading-none text-fg-primary">
        haztetuexamen
      </span>
      <span className="font-display text-[22px] tracking-[-0.04em] leading-none text-brand-primary ml-[1px] italic">
        .cl
      </span>
    </Link>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const itemCount = useCart((s) => s.itemCount());

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500",
          scrolled
            ? "bg-bg-base/80 backdrop-blur-xl border-b border-fg-primary/[0.06] py-3"
            : "py-6"
        )}
      >
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="flex items-center justify-between">
            <Wordmark />

            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm text-fg-secondary hover:text-fg-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Link
                href="/checkout"
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-fg-primary/[0.05] transition-colors relative"
                aria-label="Carrito"
              >
                <ShoppingBag className="size-[18px]" />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-brand-primary text-white text-[10px] font-mono font-bold flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              <Link href="/catalogo" className="hidden md:block">
                <Button variant="primary" size="sm">
                  Comprar
                </Button>
              </Link>

              <button
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-fg-primary/[0.05] transition-colors"
                onClick={() => setMobileOpen(true)}
                aria-label="Abrir menú"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-bg-base/98 backdrop-blur-2xl md:hidden"
          >
            <div className="flex justify-end p-6">
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-fg-primary/[0.05]"
                aria-label="Cerrar menú"
              >
                <X className="size-6" />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center gap-8 mt-16">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-5xl tracking-tight hover:text-brand-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12"
              >
                <Link href="/catalogo" onClick={() => setMobileOpen(false)}>
                  <Button variant="aurora" size="xl">
                    Comprar orden
                  </Button>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
