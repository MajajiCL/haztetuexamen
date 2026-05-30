import Link from "next/link";

const FOOTER_SECTIONS = [
  {
    title: "Producto",
    links: [
      { label: "Catálogo", href: "/catalogo" },
      { label: "Cómo funciona", href: "/como-funciona" },
      { label: "Precios", href: "/precios" },
      { label: "Selector 3D", href: "/selector" },
    ],
  },
  {
    title: "Servicios",
    links: [
      { label: "Orden estándar", href: "/catalogo/general" },
      { label: "Orden personalizada", href: "/personalizada" },
      { label: "Interpretación de resultados", href: "/interpretacion" },
      { label: "Telemedicina asíncrona", href: "/telemedicina" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Términos y condiciones", href: "/legal/terminos" },
      { label: "Política de privacidad", href: "/legal/privacidad" },
      { label: "Tratamiento de datos", href: "/legal/datos-sensibles" },
      { label: "Consentimiento informado", href: "/legal/consentimiento" },
    ],
  },
  {
    title: "Soporte",
    links: [
      { label: "Preguntas frecuentes", href: "/preguntas" },
      { label: "Contacto", href: "/contacto" },
      { label: "Verificar orden", href: "/verificar" },
      { label: "WhatsApp soporte", href: "https://wa.me/56900000000" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-fg-primary/[0.06] bg-bg-surface/30 backdrop-blur-md mt-32">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-20">
        {/* Mega wordmark */}
        <div className="mb-16">
          <h2 className="font-display text-[clamp(4rem,15vw,12rem)] leading-none tracking-[-0.06em] text-fg-primary/10">
            haztetuexamen<span className="text-brand-primary/30">.cl</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-display text-xl tracking-[-0.04em] mb-4 inline-block">
              haztetuexamen<span className="text-brand-primary">.cl</span>
            </Link>
            <p className="text-sm text-fg-muted leading-relaxed mt-4">
              Plataforma chilena de órdenes médicas digitales. Construida con cumplimiento
              total bajo las leyes 20.584, 19.628, 21.719 y 19.799.
            </p>
          </div>

          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-fg-muted mb-5">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-fg-secondary hover:text-brand-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-8 border-t border-fg-primary/[0.06] flex flex-col md:flex-row justify-between gap-4 text-xs text-fg-muted">
          <p>© 2026 MajajiCL. Todos los derechos reservados.</p>
          <p className="font-mono">
            Dr. [Nombre] · RNPI [N°] · Superintendencia de Salud Chile
          </p>
        </div>
      </div>
    </footer>
  );
}
