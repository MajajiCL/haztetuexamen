import { Injectable } from "@nestjs/common";
import { FhirService } from "./fhir.service";
import { SignatureService } from "./signature.service";

@Injectable()
export class OrdersService {
  constructor(
    private readonly fhirService: FhirService,
    private readonly signatureService: SignatureService
  ) {}

  async create(dto: any) {
    // 1. Validar payload
    // 2. Construir recurso FHIR ServiceRequest
    const fhir = this.fhirService.buildServiceRequest(dto);
    // 3. (Futuro) persistir en Postgres cifrado con pgcrypto
    // 4. Firma electrónica simple (FES)
    const signed = await this.signatureService.signOrder(fhir);
    // 5. (Futuro) enviar PDF por email vía Resend
    return { orderId: signed.id, status: "signed" };
  }

  async findById(id: string) {
    // (Futuro) consultar Postgres
    return { id, status: "active" };
  }
}
