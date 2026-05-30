/**
 * Seed inicial de base de datos
 *
 * Inserta:
 *  - 1 Practitioner demo (reemplazar con credenciales reales del médico colaborador)
 *
 * Usage:
 *   npx prisma db seed --workspace=@haztetuexamen/api
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Médico demo — REEMPLAZAR EN PRODUCCIÓN con datos reales del médico con RNPI
  await prisma.practitioner.upsert({
    where: { rnpiRegistry: process.env.DOCTOR_RNPI_REGISTRY ?? "000000" },
    update: {},
    create: {
      rut: process.env.DOCTOR_RUT ?? "11111111-1",
      rnpiRegistry: process.env.DOCTOR_RNPI_REGISTRY ?? "000000",
      firstName: "Dr.",
      lastName: process.env.DOCTOR_NAME?.replace("Dr. ", "") ?? "Demo",
      specialty: process.env.DOCTOR_SPECIALTY ?? "Medicina General",
      signatureSecret: "REPLACE_WITH_ENCRYPTED_SECRET",
      active: true,
    },
  });

  console.log("✅ Seed completado: médico colaborador creado");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
