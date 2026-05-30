/**
 * Catálogo de productos — Haztetuexamen.cl
 *
 * Fuente: brief de mercado + arancel Fonasa. Cada producto incluye:
 *  - Código Fonasa real (validable en https://www.fonasa.cl/)
 *  - Justificación clínica predefinida (Z-codes ICD-10)
 *  - Mapeo a sistemas anatómicos para el selector 3D
 *
 * IMPORTANTE: los códigos Fonasa aquí son representativos del brief.
 * Validar con tu médico colaborador (RNPI) antes de producción.
 */

import type { ExamCategory, Gender, AgeRange, ProductType } from "./types";
import { PRICING } from "./pricing";

export interface ExamItem {
  fonasaCode: string;
  name: string;
  description?: string;
}

export interface CatalogProduct {
  id: string;
  type: ProductType;
  category: ExamCategory;
  name: string;
  shortDescription: string;
  fullDescription: string;
  priceCLP: number;
  // Items que se incluyen en la orden (códigos Fonasa)
  exams: ExamItem[];
  // Justificación clínica por defecto (ICD-10)
  defaultReasonCode: {
    icd10: string;
    description: string;
  };
  // Targeting
  recommendedFor: {
    gender: Gender;
    ageRange: AgeRange;
  };
  // Sistemas anatómicos asociados (para selector 3D)
  anatomicalSystems: string[];
  // SEO / marketing
  badge?: "popular" | "nuevo" | "recomendado" | "premium";
  imageId?: string; // referencia al asset generado
}

// =================================================================
// CATÁLOGO COMPLETO
// =================================================================

export const CATALOG: CatalogProduct[] = [
  // --- CHEQUEO GENERAL ---
  {
    id: "chequeo-general-basico",
    type: "standard-order",
    category: "general",
    name: "Chequeo General de Salud",
    shortDescription: "Hemograma, perfil bioquímico, lipídico y creatinina",
    fullDescription:
      "El chequeo preventivo más completo a precio mínimo. Evalúa hemograma completo, función hepática y renal, perfil lipídico y niveles de creatinina. Recomendado anualmente para adultos.",
    priceCLP: PRICING.STANDARD_ORDER_BASE,
    exams: [
      { fonasaCode: "0301045", name: "Hemograma completo" },
      { fonasaCode: "0302075", name: "Perfil Bioquímico" },
      { fonasaCode: "0302034", name: "Perfil Lipídico" },
      { fonasaCode: "0302023", name: "Creatinina" },
    ],
    defaultReasonCode: {
      icd10: "Z00.0",
      description: "Examen médico general de rutina",
    },
    recommendedFor: {
      gender: "any",
      ageRange: { min: 18, max: 200 },
    },
    anatomicalSystems: ["circulatorio", "hepatico", "renal"],
    badge: "popular",
    imageId: "chequeo-general",
  },

  // --- PREVENTIVO FEMENINO ---
  {
    id: "preventivo-femenino-completo",
    type: "standard-order",
    category: "preventivo-femenino",
    name: "Chequeo Preventivo Femenino",
    shortDescription: "Hormonas tiroideas, hemograma, perfil ginecológico",
    fullDescription:
      "Diseñado específicamente para mujeres adultas. Incluye TSH (tiroides), perfil hormonal básico, hemograma y marcadores preventivos ginecológicos.",
    priceCLP: 2990,
    exams: [
      { fonasaCode: "0301045", name: "Hemograma completo" },
      { fonasaCode: "0301074", name: "TSH (Hormona estimulante tiroides)" },
      { fonasaCode: "0301089", name: "T4 Libre" },
      { fonasaCode: "0301010", name: "Glicemia en ayunas" },
    ],
    defaultReasonCode: {
      icd10: "Z01.4",
      description: "Examen ginecológico general",
    },
    recommendedFor: {
      gender: "female",
      ageRange: { min: 18, max: 200 },
    },
    anatomicalSystems: ["endocrino", "reproductor-femenino"],
    badge: "recomendado",
    imageId: "preventivo-femenino",
  },

  // --- PREVENTIVO MASCULINO ---
  {
    id: "preventivo-masculino-40",
    type: "standard-order",
    category: "preventivo-masculino",
    name: "Chequeo Preventivo Masculino +40",
    shortDescription: "PSA, perfil cardiovascular, glicemia",
    fullDescription:
      "Específico para hombres mayores de 40 años. Antígeno Prostático Específico (PSA) para detección temprana, perfil lipídico cardiovascular, glicemia y función hepática.",
    priceCLP: 3490,
    exams: [
      { fonasaCode: "0301091", name: "Antígeno Prostático Específico (PSA)" },
      { fonasaCode: "0302034", name: "Perfil Lipídico" },
      { fonasaCode: "0301010", name: "Glicemia en ayunas" },
      { fonasaCode: "0302075", name: "Perfil Bioquímico" },
    ],
    defaultReasonCode: {
      icd10: "Z12.5",
      description: "Examen especial de despistaje neoplasia próstata",
    },
    recommendedFor: {
      gender: "male",
      ageRange: { min: 40, max: 200 },
    },
    anatomicalSystems: ["reproductor-masculino", "circulatorio"],
    badge: "recomendado",
    imageId: "preventivo-masculino",
  },

  // --- ITS / ETS ---
  {
    id: "salud-sexual-completo",
    type: "standard-order",
    category: "its-ets",
    name: "Chequeo de Salud Sexual",
    shortDescription: "VIH, Sífilis, Hepatitis B y C",
    fullDescription:
      "Detección discreta y confidencial de infecciones de transmisión sexual. Incluye serología VIH, VDRL para sífilis, antígenos de superficie de Hepatitis B y anticuerpos Hepatitis C.",
    priceCLP: 2990,
    exams: [
      { fonasaCode: "0303024", name: "VIH (ELISA)" },
      { fonasaCode: "0303091", name: "VDRL (Sífilis)" },
      { fonasaCode: "0303031", name: "HBsAg (Hepatitis B)" },
      { fonasaCode: "0303033", name: "Anti-HCV (Hepatitis C)" },
    ],
    defaultReasonCode: {
      icd10: "Z11.3",
      description: "Examen de pesquisa infecciones transmisión sexual",
    },
    recommendedFor: {
      gender: "any",
      ageRange: { min: 18, max: 200 },
    },
    anatomicalSystems: ["inmune", "reproductor-femenino", "reproductor-masculino"],
    badge: "popular",
    imageId: "salud-sexual",
  },

  // --- PANEL INFECCIOSO ---
  {
    id: "panel-respiratorio",
    type: "standard-order",
    category: "infeccioso",
    name: "Panel Infeccioso Respiratorio",
    shortDescription: "Detección viral y bacteriana respiratoria",
    fullDescription:
      "Panel rápido para identificar el agente causal de infecciones respiratorias agudas. Incluye Virus Sincicial Respiratorio, Adenovirus, Influenza y Streptococcus pyogenes.",
    priceCLP: 1990,
    exams: [
      { fonasaCode: "0303051", name: "Virus Sincicial Respiratorio" },
      { fonasaCode: "0303052", name: "Adenovirus" },
      { fonasaCode: "0303053", name: "Influenza A/B" },
      { fonasaCode: "0303054", name: "Cultivo faríngeo Streptococcus" },
    ],
    defaultReasonCode: {
      icd10: "J06.9",
      description: "Infección aguda vías respiratorias superiores",
    },
    recommendedFor: {
      gender: "any",
      ageRange: { min: 0, max: 200 },
    },
    anatomicalSystems: ["respiratorio"],
    badge: "nuevo",
    imageId: "panel-respiratorio",
  },

  // --- IMAGENOLOGÍA ---
  {
    id: "eco-abdominal",
    type: "standard-order",
    category: "imagenologia",
    name: "Ecografía Abdominal",
    shortDescription: "Estudio ecográfico de hígado, vesícula, riñones y bazo",
    fullDescription:
      "Solicitud de ecografía abdominal completa. Evalúa hígado, vesícula biliar, vías biliares, páncreas, riñones, bazo y aorta abdominal.",
    priceCLP: PRICING.STANDARD_ORDER_IMAGING,
    exams: [{ fonasaCode: "0404005", name: "Ecotomografía abdominal" }],
    defaultReasonCode: {
      icd10: "R10.4",
      description: "Dolor abdominal, otros y no especificados",
    },
    recommendedFor: {
      gender: "any",
      ageRange: { min: 18, max: 200 },
    },
    anatomicalSystems: ["digestivo", "renal", "hepatico"],
    imageId: "eco-abdominal",
  },

  {
    id: "eco-tiroides",
    type: "standard-order",
    category: "imagenologia",
    name: "Ecografía Tiroidea",
    shortDescription: "Evaluación ecográfica de glándula tiroides",
    fullDescription:
      "Solicitud de ecografía tiroidea para evaluación de nódulos, tamaño glandular y vascularización. Indicado en alteraciones hormonales o palpación anormal.",
    priceCLP: PRICING.STANDARD_ORDER_IMAGING,
    exams: [{ fonasaCode: "0404011", name: "Ecotomografía tiroidea" }],
    defaultReasonCode: {
      icd10: "E04.9",
      description: "Bocio no tóxico, no especificado",
    },
    recommendedFor: {
      gender: "any",
      ageRange: { min: 18, max: 200 },
    },
    anatomicalSystems: ["endocrino"],
    imageId: "eco-tiroides",
  },

  // --- CARDIOVASCULAR ---
  {
    id: "control-cardiovascular",
    type: "standard-order",
    category: "cardiovascular",
    name: "Control Cardiovascular",
    shortDescription: "Perfil lipídico extendido + glicemia + ECG",
    fullDescription:
      "Evaluación integral del riesgo cardiovascular. Perfil lipídico completo, glicemia en ayunas, hemoglobina glicosilada y solicitud de electrocardiograma.",
    priceCLP: 3990,
    exams: [
      { fonasaCode: "0302034", name: "Perfil Lipídico" },
      { fonasaCode: "0301010", name: "Glicemia en ayunas" },
      { fonasaCode: "0301073", name: "Hemoglobina glicosilada A1c" },
      { fonasaCode: "1701004", name: "Electrocardiograma reposo" },
    ],
    defaultReasonCode: {
      icd10: "Z13.6",
      description: "Examen especial despistaje trastornos cardiovasculares",
    },
    recommendedFor: {
      gender: "any",
      ageRange: { min: 35, max: 200 },
    },
    anatomicalSystems: ["circulatorio"],
    imageId: "cardiovascular",
  },

  // --- ENDOCRINOLOGÍA / TIROIDES ---
  {
    id: "perfil-tiroideo",
    type: "standard-order",
    category: "endocrinologia",
    name: "Perfil Tiroideo Completo",
    shortDescription: "TSH, T3, T4 libre y anticuerpos",
    fullDescription:
      "Estudio hormonal tiroideo completo. Permite diagnóstico de hipo/hipertiroidismo y enfermedades autoinmunes tiroideas (Hashimoto, Graves).",
    priceCLP: 3490,
    exams: [
      { fonasaCode: "0301074", name: "TSH" },
      { fonasaCode: "0301089", name: "T4 Libre" },
      { fonasaCode: "0301088", name: "T3 Total" },
      { fonasaCode: "0301075", name: "Anticuerpos antitiroideos" },
    ],
    defaultReasonCode: {
      icd10: "E07.9",
      description: "Trastorno de glándula tiroides, no especificado",
    },
    recommendedFor: {
      gender: "any",
      ageRange: { min: 18, max: 200 },
    },
    anatomicalSystems: ["endocrino"],
    imageId: "tiroideo",
  },

  // --- ORDEN PERSONALIZADA (SERVICIO ASÍNCRONO) ---
  {
    id: "orden-personalizada",
    type: "custom-order",
    category: "personalizado",
    name: "Orden Médica Personalizada",
    shortDescription: "Consulta médica asíncrona — revisión en 12 hrs",
    fullDescription:
      "Para requerimientos clínicos específicos que no estén en el catálogo estándar. Completa un cuestionario detallado de anamnesis. Un médico colaborador revisa y, de ser clínicamente pertinente, emite la orden firmada en máximo 12 horas hábiles.",
    priceCLP: PRICING.CUSTOM_ORDER,
    exams: [], // Se definen post-consulta
    defaultReasonCode: {
      icd10: "Z00.8",
      description: "Otros exámenes generales",
    },
    recommendedFor: {
      gender: "any",
      ageRange: { min: 18, max: 200 },
    },
    anatomicalSystems: [],
    badge: "premium",
    imageId: "personalizada",
  },

  // --- INTERPRETACIÓN ---
  {
    id: "interpretacion-resultados",
    type: "interpretation",
    category: "interpretacion",
    name: "Interpretación Médica de Resultados",
    shortDescription: "Análisis profesional de tus exámenes — 24 a 48 hrs",
    fullDescription:
      "Sube tus resultados de laboratorio en PDF y recibe un informe médico explicativo. Identificamos valores fuera de rango, recomendaciones preventivas y derivaciones a especialistas si corresponde.",
    priceCLP: PRICING.INTERPRETATION,
    exams: [],
    defaultReasonCode: {
      icd10: "Z71.8",
      description: "Otros consejos y consultas especificados",
    },
    recommendedFor: {
      gender: "any",
      ageRange: { min: 18, max: 200 },
    },
    anatomicalSystems: [],
    badge: "nuevo",
    imageId: "interpretacion",
  },
];

// Helpers de búsqueda
export const getCategoryProducts = (category: ExamCategory): CatalogProduct[] =>
  CATALOG.filter((p) => p.category === category);

export const getProductById = (id: string): CatalogProduct | undefined =>
  CATALOG.find((p) => p.id === id);

export const getProductsBySystem = (system: string): CatalogProduct[] =>
  CATALOG.filter((p) => p.anatomicalSystems.includes(system));

export const CATEGORY_LABELS: Record<ExamCategory, string> = {
  general: "Chequeo General",
  "preventivo-femenino": "Salud Femenina",
  "preventivo-masculino": "Salud Masculina",
  "its-ets": "Salud Sexual",
  infeccioso: "Panel Infeccioso",
  imagenologia: "Imagenología",
  cardiovascular: "Cardiovascular",
  endocrinologia: "Endocrinología",
  alergias: "Alergias",
  personalizado: "Personalizado",
  interpretacion: "Interpretación",
};
