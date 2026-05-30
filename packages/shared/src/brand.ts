/**
 * Brand tokens — Haztetuexamen.cl
 *
 * Sistema de diseño basado en confianza médica + tecnología premium.
 * Paleta diseñada para evocar:
 *  - Salud (azules profundos, no "pastel hospital")
 *  - Confianza (alto contraste, tipografía editorial)
 *  - Tecnología vanguardia 2026 (acentos eléctricos, glassmorphism oscuro)
 *
 * NO usar tonos saturados de pink/purple (estética IA genérica)
 * NO usar verde "farmacia"
 * SÍ usar dark mode-first con acento cian eléctrico
 */

export const brand = {
  name: "Haztetuexamen",
  tagline: "Tu chequeo preventivo en 5 minutos",
  taglineLong: "Órdenes médicas digitales firmadas en menos de 10 minutos. Sin filas, sin esperas, sin papel.",

  // Paleta principal (HSL-ready para Tailwind v4)
  colors: {
    // Background system
    bg: {
      base: "#0A0E1A", // negro azulado profundo
      surface: "#111726", // surfaces elevadas
      raised: "#1A2236", // cards, modals
      overlay: "rgba(10, 14, 26, 0.85)",
    },
    // Foreground
    fg: {
      primary: "#F4F7FB", // texto principal
      secondary: "#A3B3C9", // texto secundario
      muted: "#5C6E89", // hints, disabled
    },
    // Brand accents
    brand: {
      primary: "#0EA5E9", // cian eléctrico — CTA principal
      primaryHover: "#0284C7",
      secondary: "#7C3AED", // violeta para gradients
      tertiary: "#06B6D4", // turquesa — destacados
    },
    // Status (semantic)
    status: {
      success: "#10B981", // verde salud — sin saturar
      warning: "#F59E0B",
      danger: "#EF4444",
      info: "#3B82F6",
    },
    // Especialidades médicas (para categorías visuales)
    medical: {
      cardio: "#EF4444", // rojo corazón
      neuro: "#A855F7", // morado cerebro
      pulmonar: "#06B6D4", // turquesa pulmones
      digestivo: "#F59E0B", // ámbar digestivo
      preventivo: "#10B981", // verde preventivo
      hormonal: "#EC4899", // rosa hormonal
    },
    // Glass / overlay effects
    glass: {
      light: "rgba(255, 255, 255, 0.05)",
      medium: "rgba(255, 255, 255, 0.1)",
      heavy: "rgba(255, 255, 255, 0.15)",
      border: "rgba(255, 255, 255, 0.1)",
    },
  },

  // Tipografía (Google Fonts editorial + sans premium)
  typography: {
    display: "'Instrument Serif', Georgia, serif", // Serif elegante para hero/headings grandes
    sans: "'Geist', 'Inter', system-ui, sans-serif", // Sans moderna para body
    mono: "'Geist Mono', 'JetBrains Mono', monospace", // Para códigos Fonasa, RUT
  },

  // Spacing escala (4px base)
  spacing: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
    "4xl": "6rem",
    "5xl": "8rem",
  },

  // Border radius
  radius: {
    none: "0",
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
    "2xl": "1.5rem",
    full: "9999px",
  },

  // Shadows premium
  shadow: {
    sm: "0 1px 2px 0 rgba(0,0,0,0.3)",
    md: "0 4px 6px -1px rgba(0,0,0,0.4), 0 2px 4px -2px rgba(0,0,0,0.2)",
    lg: "0 10px 15px -3px rgba(0,0,0,0.4), 0 4px 6px -4px rgba(0,0,0,0.2)",
    xl: "0 20px 25px -5px rgba(0,0,0,0.5), 0 8px 10px -6px rgba(0,0,0,0.2)",
    glow: "0 0 40px rgba(14, 165, 233, 0.3)",
    glowStrong: "0 0 60px rgba(14, 165, 233, 0.5)",
  },

  // Animation
  motion: {
    duration: {
      fast: "150ms",
      base: "250ms",
      slow: "400ms",
      slowest: "800ms",
    },
    ease: {
      out: "cubic-bezier(0.16, 1, 0.3, 1)", // smooth out
      inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      spring: "cubic-bezier(0.5, 1.5, 0.5, 1)",
    },
  },
} as const;

export type Brand = typeof brand;
