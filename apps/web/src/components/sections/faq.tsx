"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    q: "¿Es legal comprar una orden médica por internet en Chile?",
    a: "Sí. La Ley 19.799 y el Código Sanitario permiten que un médico registrado en el RNPI (Registro Nacional de Prestadores Individuales) emita órdenes de exámenes preventivos con Firma Electrónica Simple (FES). Nuestras órdenes son legalmente válidas y aceptadas por todos los laboratorios chilenos (Clíni, Maiposalud, RedSalud, Vidaintegra, etc.).",
  },
  {
    q: "¿Cuánto demora la entrega de mi orden?",
    a: "Para órdenes del catálogo estándar: menos de 10 minutos. Para órdenes personalizadas (que requieren revisión médica): hasta 12 horas hábiles. Para el servicio de interpretación de resultados: entre 24 y 48 horas hábiles.",
  },
  {
    q: "¿Mis exámenes son cubiertos por Fonasa o Isapre?",
    a: "Sí. Cada orden incluye los códigos arancelarios oficiales Fonasa, por lo que los exámenes son bonificados automáticamente en cualquier laboratorio adscrito al Modalidad Libre Elección de Fonasa o convenio Isapre. Te recomendamos consultar el porcentaje de bonificación específico con tu prestador.",
  },
  {
    q: "¿Quién firma mi orden médica?",
    a: "Un médico cirujano con registro vigente en la Superintendencia de Salud chilena (RNPI). En el PDF de la orden encontrarás su nombre completo, RUT, especialidad y número de registro RNPI, además del código QR de verificación.",
  },
  {
    q: "¿Cómo protegen mis datos clínicos?",
    a: "Tus datos están cifrados a nivel de base de datos con AES-256 (extensión pgcrypto de PostgreSQL), almacenados en formato HL7 FHIR estándar de interoperabilidad médica internacional. Cumplimos integralmente con la Ley 21.719 de protección de datos personales sensibles. Nunca compartimos ni vendemos tu información.",
  },
  {
    q: "¿Puedo pedir un examen que no esté en el catálogo?",
    a: 'Sí. Selecciona "Orden Personalizada" en el catálogo, completa el cuestionario de anamnesis y un médico revisará tu solicitud en máximo 12 horas hábiles. Si es clínicamente pertinente, te enviamos la orden firmada. Costo: $7.990 CLP.',
  },
  {
    q: "¿Qué métodos de pago aceptan?",
    a: "Webpay Plus de Transbank — todas las tarjetas de débito (RedCompra), crédito (Visa, Mastercard, AmEx, Diners) y prepago chilenas. Próximamente: Mercado Pago y transferencia bancaria.",
  },
  {
    q: "¿Puedo devolver mi orden si me arrepiento?",
    a: "Las órdenes médicas personalizadas están exentas del derecho a retracto según el artículo 3 bis letra b de la Ley 19.496 (productos digitales personalizados). Para órdenes del catálogo estándar que no hayas usado en un laboratorio, puedes contactar a soporte dentro de 48 horas para revisar tu caso.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-widest text-brand-primary font-medium mb-4"
          >
            Preguntas frecuentes
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl text-balance"
          >
            Las dudas que todos tienen
          </motion.h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className={cn(
                "glass rounded-2xl overflow-hidden transition-all duration-300",
                open === i ? "border-brand-primary/30" : ""
              )}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left group"
              >
                <span className="font-display text-lg sm:text-xl leading-tight group-hover:text-brand-primary transition-colors">
                  {faq.q}
                </span>
                <div
                  className={cn(
                    "shrink-0 w-8 h-8 rounded-full bg-fg-primary/5 flex items-center justify-center transition-all duration-300",
                    open === i && "bg-brand-primary text-bg-base rotate-45"
                  )}
                >
                  <Plus className="size-4" />
                </div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-fg-secondary leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
