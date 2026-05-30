import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { CatalogPreview } from "@/components/sections/catalog-preview";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Comparison } from "@/components/sections/comparison";
import { Testimonials } from "@/components/sections/testimonials";
import { DoctorSection } from "@/components/sections/doctor-section";
import { Guarantee } from "@/components/sections/guarantee";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";

/**
 * Homepage V7 — Arquitectura conversion-optimized
 *
 * Flujo psicológico:
 *  1. HOOK     · Hero con buscador + precio + ticker (3s atención)
 *  2. PRODUCTO · Catálogo visible (qué vendemos)
 *  3. PROCESO  · Cómo funciona (reducir fricción)
 *  4. COMPARAR · Pricing table vs competencia (ganar argumento)
 *  5. PROOF    · Testimonios reales (validación social)
 *  6. AUTORIDAD· Médicos RNPI (legitimidad)
 *  7. GARANTÍA · Risk reversal (eliminar duda)
 *  8. FAQ      · Objection handling
 *  9. CTA      · Cierre final masivo
 */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CatalogPreview />
        <HowItWorks />
        <Comparison />
        <Testimonials />
        <DoctorSection />
        <Guarantee />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
