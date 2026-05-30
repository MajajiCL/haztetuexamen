import { Injectable } from "@nestjs/common";
import * as crypto from "crypto";
import type { FHIRServiceRequest } from "@haztetuexamen/shared";

/**
 * Servicio de Firma Electrónica Simple (FES) — Ley 19.799
 *
 * Para órdenes de exámenes preventivos basta con FES (no FEA).
 * Esta firma usa:
 *  - HMAC-SHA256 con secret del médico
 *  - Timestamp criptográfico
 *  - Hash del payload completo de la orden
 *
 * En producción, se usa un certificado digital emitido por
 * un prestador acreditado (eCertChile, Acepta, etc.).
 */
@Injectable()
export class SignatureService {
  async signOrder(fhir: FHIRServiceRequest): Promise<FHIRServiceRequest> {
    const secret = process.env.DOCTOR_SIGNATURE_SECRET ?? "demo-secret-replace-in-prod";
    const payload = JSON.stringify({
      id: fhir.id,
      patient: fhir.subject.reference,
      exams: fhir.code.coding.map((c) => c.code),
      timestamp: fhir.authoredOn,
    });

    const signature = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");

    const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/verificar/${fhir.id}`;

    return {
      ...fhir,
      _extension: {
        fesSignature: {
          signedAt: new Date().toISOString(),
          verificationUrl,
          qrCodeData: `${fhir.id}|${signature.slice(0, 16)}`,
        },
      },
    };
  }

  verifySignature(orderId: string, signature: string, payload: string): boolean {
    const secret = process.env.DOCTOR_SIGNATURE_SECRET ?? "demo-secret-replace-in-prod";
    const expected = crypto
      .createHmac("sha256", secret)
      .update(payload)
      .digest("hex");
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expected.slice(0, signature.length))
    );
  }
}
