"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Check, ArrowRight, ArrowLeft, ShieldCheck, Trash2, Lock } from "lucide-react";
import { formatCLP, getProductById } from "@haztetuexamen/shared";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/store/cart";
import { isValidRut, formatRut, cn } from "@/lib/utils";

type Step = "cart" | "patient-info" | "consent" | "payment" | "confirmation";

const STEPS: { key: Step; label: string; number: number }[] = [
  { key: "cart", label: "Carrito", number: 1 },
  { key: "patient-info", label: "Paciente", number: 2 },
  { key: "consent", label: "Consentimiento", number: 3 },
  { key: "payment", label: "Pago", number: 4 },
];

export default function CheckoutPage() {
  const cart = useCart();
  const [step, setStep] = useState<Step>("cart");
  const [patient, setPatient] = useState({
    rut: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "" as "male" | "female" | "",
    email: "",
    phone: "",
    clinicalNotes: "",
  });
  const [consents, setConsents] = useState({
    dataProcessing: false,
    telemedicine: false,
    marketing: false,
  });
  const [orderId, setOrderId] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const stepIdx = STEPS.findIndex((s) => s.key === step);

  const canProceedFromPatient =
    isValidRut(patient.rut) &&
    patient.firstName.length > 1 &&
    patient.lastName.length > 1 &&
    patient.birthDate &&
    patient.gender &&
    patient.email.includes("@") &&
    patient.phone.length >= 8;

  const canProceedFromConsent = consents.dataProcessing && consents.telemedicine;

  async function handleMockPayment() {
    setProcessing(true);
    // Client-side mock — guarda en localStorage (compatible con static export)
    const id = `HTE-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .slice(2, 6)
      .toUpperCase()}`;
    const order = {
      id,
      items: cart.items,
      patient,
      consents,
      totalCLP: cart.totalCLP,
      createdAt: new Date().toISOString(),
    };
    if (typeof window !== "undefined") {
      const existing = JSON.parse(localStorage.getItem("hte-orders") ?? "[]");
      localStorage.setItem("hte-orders", JSON.stringify([...existing, order]));
    }
    setTimeout(() => {
      setOrderId(id);
      cart.clear();
      setStep("confirmation");
      setProcessing(false);
    }, 1500);
  }

  if (cart.items.length === 0 && step !== "confirmation") {
    return (
      <>
        <Navbar />
        <main className="pt-32 pb-24 min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md px-6">
            <h1 className="font-display text-4xl mb-4">Tu carrito está vacío</h1>
            <p className="text-fg-secondary mb-8">
              Empieza agregando exámenes desde nuestro catálogo.
            </p>
            <Link href="/catalogo">
              <Button variant="primary" size="lg">
                Ver catálogo
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {step !== "confirmation" && (
            <div className="mb-12">
              <div className="flex items-center justify-between">
                {STEPS.map((s, i) => {
                  const completed = i < stepIdx;
                  const current = i === stepIdx;
                  return (
                    <div key={s.key} className="flex items-center flex-1 last:flex-none">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                            completed && "bg-status-success text-white",
                            current && "bg-brand-primary text-white",
                            !completed && !current && "bg-fg-primary/10 text-fg-muted"
                          )}
                        >
                          {completed ? <Check className="size-5" /> : s.number}
                        </div>
                        <span
                          className={cn(
                            "hidden sm:inline text-sm font-medium transition-colors",
                            current ? "text-fg-primary" : "text-fg-muted"
                          )}
                        >
                          {s.label}
                        </span>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div
                          className={cn(
                            "flex-1 h-px mx-4 transition-colors",
                            completed ? "bg-status-success" : "bg-fg-primary/10"
                          )}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {step === "cart" && (
              <motion.section
                key="cart"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h1 className="font-display text-4xl mb-6">Revisa tu carrito</h1>
                {cart.items.map((item) => {
                  const p = getProductById(item.productId);
                  if (!p) return null;
                  return (
                    <div
                      key={item.productId}
                      className="glass rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex-1">
                        <h3 className="font-display text-xl mb-1">{p.name}</h3>
                        <p className="text-sm text-fg-secondary">{p.shortDescription}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 glass rounded-full">
                          <button
                            onClick={() => cart.updateQuantity(item.productId, item.quantity - 1)}
                            className="w-9 h-9 hover:bg-fg-primary/10 rounded-full"
                            aria-label="Disminuir"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-mono">{item.quantity}</span>
                          <button
                            onClick={() => cart.updateQuantity(item.productId, item.quantity + 1)}
                            className="w-9 h-9 hover:bg-fg-primary/10 rounded-full"
                            aria-label="Aumentar"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right min-w-[100px]">
                          <p className="font-mono text-lg font-bold">
                            {formatCLP(item.unitPriceCLP * item.quantity)}
                          </p>
                        </div>
                        <button
                          onClick={() => cart.removeItem(item.productId)}
                          className="w-9 h-9 rounded-full hover:bg-status-danger/20 text-status-danger flex items-center justify-center"
                          aria-label="Eliminar"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
                <div className="glass rounded-2xl p-6 flex items-center justify-between mt-6">
                  <span className="text-lg">Total a pagar</span>
                  <span className="font-mono text-3xl font-bold text-gradient-aurora">
                    {formatCLP(cart.totalCLP)}
                  </span>
                </div>
                <div className="flex justify-end mt-8">
                  <Button variant="primary" size="lg" onClick={() => setStep("patient-info")} className="group">
                    Continuar
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.section>
            )}

            {step === "patient-info" && (
              <motion.section
                key="patient-info"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h1 className="font-display text-4xl mb-3">Datos del paciente</h1>
                <p className="text-fg-secondary mb-8">
                  Necesarios para emitir la orden médica. Cifrado AES-256.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field
                    label="RUT"
                    value={patient.rut}
                    onChange={(v) => setPatient({ ...patient, rut: formatRut(v) })}
                    placeholder="12.345.678-9"
                    error={patient.rut.length > 0 && !isValidRut(patient.rut) ? "RUT inválido" : undefined}
                    mono
                  />
                  <Field
                    label="Fecha de nacimiento"
                    type="date"
                    value={patient.birthDate}
                    onChange={(v) => setPatient({ ...patient, birthDate: v })}
                  />
                  <Field
                    label="Nombres"
                    value={patient.firstName}
                    onChange={(v) => setPatient({ ...patient, firstName: v })}
                  />
                  <Field
                    label="Apellidos"
                    value={patient.lastName}
                    onChange={(v) => setPatient({ ...patient, lastName: v })}
                  />
                  <div>
                    <label className="text-sm text-fg-secondary mb-2 block">Sexo biológico</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setPatient({ ...patient, gender: "female" })}
                        className={cn(
                          "h-12 rounded-xl transition-all",
                          patient.gender === "female" ? "bg-brand-primary text-white" : "glass hover:border-brand-primary/30"
                        )}
                      >
                        Femenino
                      </button>
                      <button
                        onClick={() => setPatient({ ...patient, gender: "male" })}
                        className={cn(
                          "h-12 rounded-xl transition-all",
                          patient.gender === "male" ? "bg-brand-primary text-white" : "glass hover:border-brand-primary/30"
                        )}
                      >
                        Masculino
                      </button>
                    </div>
                  </div>
                  <Field
                    label="Teléfono"
                    type="tel"
                    value={patient.phone}
                    onChange={(v) => setPatient({ ...patient, phone: v })}
                    placeholder="+56 9 1234 5678"
                    mono
                  />
                  <Field
                    label="Email"
                    type="email"
                    value={patient.email}
                    onChange={(v) => setPatient({ ...patient, email: v })}
                    placeholder="tu@email.cl"
                    className="sm:col-span-2"
                  />
                </div>

                <div className="flex justify-between mt-8 flex-wrap gap-3">
                  <Button variant="ghost" onClick={() => setStep("cart")}>
                    <ArrowLeft className="size-4" /> Volver
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    disabled={!canProceedFromPatient}
                    onClick={() => setStep("consent")}
                    className="group"
                  >
                    Continuar
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.section>
            )}

            {step === "consent" && (
              <motion.section
                key="consent"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h1 className="font-display text-4xl mb-3">Consentimiento informado</h1>
                <p className="text-fg-secondary mb-8">Ley 20.584 + Ley 21.719</p>

                <div className="space-y-3">
                  <Consent
                    required
                    checked={consents.dataProcessing}
                    onChange={(v) => setConsents({ ...consents, dataProcessing: v })}
                    title="Tratamiento de datos personales sensibles"
                    description="Autorizo a Haztetuexamen.cl a tratar mis datos de salud bajo cifrado AES-256."
                  />
                  <Consent
                    required
                    checked={consents.telemedicine}
                    onChange={(v) => setConsents({ ...consents, telemedicine: v })}
                    title="Atención digital (telemedicina)"
                    description="Acepto que esta prestación se realiza digitalmente con firma electrónica simple."
                  />
                </div>

                <div className="flex justify-between mt-8 flex-wrap gap-3">
                  <Button variant="ghost" onClick={() => setStep("patient-info")}>
                    <ArrowLeft className="size-4" /> Volver
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    disabled={!canProceedFromConsent}
                    onClick={() => setStep("payment")}
                    className="group"
                  >
                    Ir al pago
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </motion.section>
            )}

            {step === "payment" && (
              <motion.section
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h1 className="font-display text-4xl mb-3">Pago seguro</h1>
                <p className="text-fg-secondary mb-8">Transbank Webpay Plus · SSL 256-bit</p>

                <div className="glass-elevated rounded-2xl p-8 mb-8">
                  <div className="flex items-center gap-3 mb-6">
                    <ShieldCheck className="size-6 text-status-success" />
                    <div>
                      <p className="font-medium">Transacción protegida</p>
                      <p className="text-sm text-fg-secondary">PCI DSS · AES-256</p>
                    </div>
                  </div>
                  <div className="border-t border-fg-primary/10 pt-6">
                    <div className="flex items-center justify-between text-xl">
                      <span className="font-semibold">Total</span>
                      <span className="font-mono font-bold text-gradient-aurora">
                        {formatCLP(cart.totalCLP)}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="xl"
                  disabled={processing}
                  onClick={handleMockPayment}
                  className="w-full"
                >
                  {processing ? "Procesando…" : <><Lock className="size-5" /> Pagar {formatCLP(cart.totalCLP)}</>}
                </Button>

                <p className="text-xs text-fg-muted text-center mt-4">
                  ⚠️ DEMO: simulación. En producción integra Webpay Plus real.
                </p>
              </motion.section>
            )}

            {step === "confirmation" && orderId && (
              <motion.section
                key="confirmation"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-24 h-24 mx-auto rounded-full bg-status-success/20 flex items-center justify-center mb-8"
                >
                  <Check className="size-12 text-status-success" />
                </motion.div>
                <h1 className="font-display text-5xl mb-4">¡Pago exitoso!</h1>
                <p className="text-lg text-fg-secondary mb-8 max-w-xl mx-auto">
                  Tu orden está siendo procesada. Recibirás un email con el PDF firmado en
                  menos de 10 minutos.
                </p>
                <div className="glass-elevated rounded-2xl p-6 max-w-md mx-auto mb-8">
                  <p className="text-xs text-fg-muted uppercase tracking-widest mb-2">
                    Número de orden
                  </p>
                  <p className="font-mono text-2xl text-brand-primary">{orderId}</p>
                </div>
                <Link href="/">
                  <Button variant="primary" size="lg">
                    Volver al inicio
                  </Button>
                </Link>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  mono,
  className,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
  mono?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-sm text-fg-secondary mb-2 block">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full h-12 px-4 rounded-xl glass focus:border-brand-primary outline-none transition-colors",
          mono && "font-mono",
          error && "border-status-danger"
        )}
      />
      {error && <p className="text-xs text-status-danger mt-1">{error}</p>}
    </div>
  );
}

function Consent({
  required,
  checked,
  onChange,
  title,
  description,
}: {
  required?: boolean;
  checked: boolean;
  onChange: (v: boolean) => void;
  title: string;
  description: string;
}) {
  return (
    <label
      className={cn(
        "block glass-elevated rounded-2xl p-6 cursor-pointer transition-all",
        checked && "border-brand-primary/40 bg-brand-primary/5"
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all mt-0.5",
            checked ? "bg-brand-primary border-brand-primary" : "border-fg-primary/30"
          )}
        >
          {checked && <Check className="size-4 text-white" />}
        </div>
        <div className="flex-1">
          <p className="font-medium mb-1">
            {title}
            {required && <span className="text-status-danger ml-1">*</span>}
          </p>
          <p className="text-sm text-fg-secondary leading-relaxed">{description}</p>
        </div>
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
    </label>
  );
}
