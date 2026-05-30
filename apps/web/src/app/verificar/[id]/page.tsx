import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

/**
 * Verificación de orden — Static Export
 * Pre-genera 3 ejemplos demo. En producción real esto consultaría una BD.
 */
export function generateStaticParams() {
  return [
    { id: "HTE-DEMO-001" },
    { id: "HTE-DEMO-002" },
    { id: "HTE-DEMO-003" },
  ];
}

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24 min-h-screen flex items-center">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 w-full">
          <div className="glass-elevated rounded-3xl p-10 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-status-success/20 flex items-center justify-center mb-6">
              <ShieldCheck className="size-10 text-status-success" />
            </div>
            <h1 className="font-display text-4xl mb-3">Orden verificada</h1>
            <p className="text-lg text-fg-secondary mb-8">
              Esta orden fue emitida legalmente por Haztetuexamen.cl
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-8">
              <Info label="N° orden" value={id} mono />
              <Info label="Estado" value="Activa · Firmada" />
              <Info label="Plataforma" value="haztetuexamen.cl" />
              <Info label="Cumplimiento" value="Leyes 19.799 / 21.746" />
            </div>

            <Link href="/">
              <Button variant="secondary">
                <ArrowLeft className="size-4" /> Ir al inicio
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Info({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="glass rounded-xl p-4">
      <p className="text-xs text-fg-muted uppercase tracking-widest mb-1">{label}</p>
      <p className={`text-sm font-medium ${mono ? "font-mono" : ""}`}>{value}</p>
    </div>
  );
}
