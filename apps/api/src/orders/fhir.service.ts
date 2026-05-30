import { Injectable } from "@nestjs/common";
import {
  FHIRServiceRequest,
  FONASA_ARANCEL_SYSTEM,
  ICD10_SYSTEM,
} from "@haztetuexamen/shared";

@Injectable()
export class FhirService {
  buildServiceRequest(dto: any): FHIRServiceRequest {
    const id = `HTE-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .slice(2, 6)
      .toUpperCase()}`;

    return {
      resourceType: "ServiceRequest",
      id,
      status: "active",
      intent: "order",
      category: [
        {
          coding: [
            {
              system: "http://terminology.hl7.org/CodeSystem/service-category",
              code: "108252007",
              display: "Laboratory procedure",
            },
          ],
        },
      ],
      code: {
        coding: dto.exams.map((e: any) => ({
          system: FONASA_ARANCEL_SYSTEM,
          code: e.fonasaCode,
          display: e.name,
        })),
        text: dto.productName ?? "Orden médica",
      },
      subject: {
        reference: `Patient/${dto.patient.rut.replace(/[.-]/g, "")}`,
        display: `${dto.patient.firstName} ${dto.patient.lastName}`,
      },
      authoredOn: new Date().toISOString(),
      occurrenceDateTime: new Date().toISOString(),
      requester: {
        reference: `Practitioner/${process.env.DOCTOR_RUT}`,
        display: `${process.env.DOCTOR_NAME} - RNPI ${process.env.DOCTOR_RNPI_REGISTRY}`,
      },
      reasonCode: [
        {
          coding: [
            {
              system: ICD10_SYSTEM,
              code: dto.reasonCode?.icd10 ?? "Z00.0",
              display: dto.reasonCode?.description ?? "Examen médico general",
            },
          ],
        },
      ],
    };
  }
}
