"use client";

import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Camila Soto",
    role: "Diseñadora · 32 años",
    city: "Providencia, Santiago",
    rating: 5,
    text: "Por años posterguě mi chequeo porque odio pedir hora al CESFAM. En 7 minutos tuve mi orden de Hemograma + Perfil Lipídico. Fui a Vidaintegra al día siguiente y la recepcionista ni pestañeó. Brutal.",
    product: "Chequeo General · $1.990",
    initial: "C",
    color: "from-accent-peach to-accent-coral",
  },
  {
    name: "Diego Marambio",
    role: "Ingeniero · 45 años",
    city: "Las Condes, Santiago",
    rating: 5,
    text: "Mi doctor me dijo que necesitaba PSA y perfil lipídico cada 6 meses. Antes me costaba $25.000 entre consulta y orden. Ahora pago $3.490 y lo hago desde la oficina. Increíble el ahorro.",
    product: "Preventivo Masculino +40 · $3.490",
    initial: "D",
    color: "from-accent-sage to-brand-primary",
  },
  {
    name: "Valentina Núñez",
    role: "Profesora · 28 años",
    city: "Ñuñoa, Santiago",
    rating: 5,
    text: "Necesitaba un perfil tiroideo urgente y mi médico estaba con licencia. Lo pedí un domingo a las 11 PM y me llegó la orden a las 11:08 PM con el código QR de verificación. Surreal lo bien que funciona.",
    product: "Perfil Tiroideo · $3.490",
    initial: "V",
    color: "from-brand-primary to-accent-sage",
  },
  {
    name: "Sebastián Vega",
    role: "Estudiante · 24 años",
    city: "La Florida, Santiago",
    rating: 5,
    text: "Estaba preocupado por mis dudas pero no quería ir al médico solo para una orden. Lo pedí discreto y privado, llegó en 6 minutos. Los exámenes en BIONET sin preguntas. Salí tranquilo.",
    product: "Salud Sexual · $2.990",
    initial: "S",
    color: "from-accent-coral to-accent-clay",
  },
  {
    name: "María José Rojas",
    role: "Madre · 38 años",
    city: "Maipú, Santiago",
    rating: 5,
    text: "Mi hijo se enfermó un sábado de panel respiratorio. El SAPU lleno y privado caro. Pedí la orden acá, fuimos al laboratorio el lunes con eso y los resultados al miércoles. Sin gastar $40.000 en urgencia.",
    product: "Panel Infeccioso Respiratorio · $1.990",
    initial: "M",
    color: "from-accent-clay to-accent-peach",
  },
  {
    name: "Cristóbal Pérez",
    role: "Empresario · 51 años",
    city: "Vitacura, Santiago",
    rating: 5,
    text: "Llevo 6 meses usándolos para todos mis chequeos. La interpretación que dan al final por $9.990 vale oro: el médico me explicó valores que mi doctor habitual ni mencionó. Suscriptor de por vida.",
    product: "Interpretación de resultados · $9.990",
    initial: "C",
    color: "from-brand-primary to-accent-peach",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-aurora-subtle" />

      <div className="relative mx-auto max-w-[1280px] px-6 lg:px-12">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase tracking-[0.3em] text-brand-primary font-bold mb-4"
          >
            Lo que dicen
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.0] tracking-[-0.035em] text-balance"
          >
            <em className="italic text-gradient-aurora">2.847 chilenos</em> esta semana
            confiaron en nosotros
          </motion.h2>

          {/* Stars + rating */}
          <div className="mt-8 inline-flex items-center gap-3 px-5 py-2 rounded-full glass-elevated">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="size-4 fill-accent-clay text-accent-clay" />
              ))}
            </div>
            <span className="font-mono font-bold text-lg">4.9</span>
            <span className="text-sm text-fg-muted">· 1.247 reseñas verificadas</span>
          </div>
        </div>

        {/* Masonry-ish 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="glass-elevated rounded-3xl p-7 hover:shadow-xl transition-shadow"
            >
              <Quote className="size-8 text-brand-primary/30 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} className="size-4 fill-accent-clay text-accent-clay" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-fg-primary leading-relaxed mb-6">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Product tag */}
              <div className="inline-block px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-medium mb-5">
                {t.product}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-fg-primary/10">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white font-display text-lg shadow-md`}
                >
                  {t.initial}
                </div>
                <div>
                  <div className="font-semibold text-fg-primary leading-tight">
                    {t.name}
                  </div>
                  <div className="text-xs text-fg-muted">
                    {t.role} · {t.city}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
