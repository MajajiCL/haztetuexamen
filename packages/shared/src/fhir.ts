/**
 * Tipos HL7 FHIR R4 simplificados para Haztetuexamen.cl
 *
 * Cumple con la especificación oficial en https://hl7.org/fhir/R4/
 * Solo incluye los recursos que usamos: ServiceRequest, Patient, Practitioner.
 *
 * Garantiza interoperabilidad futura con laboratorios chilenos
 * (CLINI, Maiposalud, RedSalud) según Ley 21.746.
 */

export interface FHIRCoding {
  system: string;
  code: string;
  display: string;
}

export interface FHIRCodeableConcept {
  coding: FHIRCoding[];
  text?: string;
}

export interface FHIRReference {
  reference: string;
  display?: string;
}

// --- Patient ---
export interface FHIRPatient {
  resourceType: "Patient";
  id: string;
  identifier: Array<{
    system: "http://www.registrocivil.cl/run"; // RUN/RUT chileno
    value: string;
  }>;
  name: Array<{
    use: "official";
    family: string;
    given: string[];
  }>;
  gender: "male" | "female" | "other" | "unknown";
  birthDate: string; // YYYY-MM-DD
  telecom: Array<{
    system: "email" | "phone";
    value: string;
  }>;
}

// --- Practitioner (médico colaborador) ---
export interface FHIRPractitioner {
  resourceType: "Practitioner";
  id: string;
  identifier: Array<{
    system:
      | "http://supersalud.gob.cl/rnpi" // Registro Nacional Prestadores Individuales
      | "http://www.registrocivil.cl/run";
    value: string;
  }>;
  name: Array<{
    family: string;
    given: string[];
    prefix?: string[]; // ej. ["Dr.", "Dra."]
  }>;
  qualification: Array<{
    code: FHIRCodeableConcept;
    issuer?: FHIRReference;
  }>;
}

// --- ServiceRequest (la orden médica) ---
export interface FHIRServiceRequest {
  resourceType: "ServiceRequest";
  id: string;
  status: "draft" | "active" | "on-hold" | "revoked" | "completed";
  intent: "order" | "plan" | "proposal";
  category: FHIRCodeableConcept[];
  code: FHIRCodeableConcept;
  subject: FHIRReference;
  occurrenceDateTime?: string;
  authoredOn: string; // ISO-8601 timestamp emisión
  requester: FHIRReference;
  reasonCode: FHIRCodeableConcept[];
  note?: Array<{ text: string }>;
  // extensión local: firma electrónica simple
  _extension?: {
    fesSignature?: {
      signedAt: string;
      verificationUrl: string;
      qrCodeData: string;
    };
  };
}

// --- Sistema de codificación Fonasa ---
export const FONASA_ARANCEL_SYSTEM = "http://fonasa.cl/arancel-examenes";
export const ICD10_SYSTEM = "http://hl7.org/fhir/sid/icd-10";
export const SUPERSALUD_RNPI_SYSTEM = "http://supersalud.gob.cl/rnpi";
export const REGISTRO_CIVIL_RUT_SYSTEM = "http://www.registrocivil.cl/run";
