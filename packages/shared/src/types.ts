/**
 * Tipos comunes para el e-commerce médico
 */

export type Gender = "male" | "female" | "any";

export type AgeRange = {
  min: number; // inclusive
  max: number; // inclusive (use 200 for "no upper bound")
};

export type ExamCategory =
  | "general"
  | "preventivo-femenino"
  | "preventivo-masculino"
  | "its-ets"
  | "infeccioso"
  | "imagenologia"
  | "cardiovascular"
  | "endocrinologia"
  | "alergias"
  | "personalizado"
  | "interpretacion";

export type ProductType = "standard-order" | "custom-order" | "interpretation";

export type CheckoutStep = "cart" | "patient-info" | "consent" | "payment" | "confirmation";

export type OrderStatus =
  | "pending_payment"
  | "paid"
  | "signing"
  | "signed"
  | "delivered"
  | "cancelled"
  | "refunded";

export type ConsentScope =
  | "data-processing" // Ley 19.628 / 21.719
  | "telemedicine" // Ley 20.584 — atención digital
  | "marketing-optin"; // opcional, separado

export interface PatientConsent {
  scope: ConsentScope;
  acceptedAt: string; // ISO-8601
  ipAddress: string;
  userAgent: string;
}

export interface PatientInfo {
  rut: string; // formato: 12345678-9
  firstName: string;
  lastName: string;
  birthDate: string; // ISO YYYY-MM-DD
  gender: Gender;
  email: string;
  phone: string;
  clinicalNotes?: string; // anamnesis breve (justificación clínica)
}

export interface CartItem {
  productId: string;
  quantity: number;
  unitPriceCLP: number;
}

export interface Cart {
  items: CartItem[];
  totalCLP: number;
  updatedAt: string;
}
