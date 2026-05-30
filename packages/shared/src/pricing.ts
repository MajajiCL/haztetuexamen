/**
 * Estrategia de precios competitiva — Haztetuexamen.cl
 *
 * Posicionamiento del brief:
 *  - Orden básica: $1.990 CLP (matchear TuChequeo, 66% por debajo de Quiero Mi Examen)
 *  - Orden personalizada: $7.990 CLP (mitad del precio de TuChequeo $15.480)
 *  - Interpretación: $9.990 CLP (canal de fidelización)
 */

export const PRICING = {
  // Productos del catálogo estándar
  STANDARD_ORDER_BASE: 1990,
  STANDARD_ORDER_IMAGING: 2490,
  STANDARD_ORDER_COMPREHENSIVE: 4990,

  // Adicionales que se agregan a una orden
  ADD_ON_MIN: 490,
  ADD_ON_MAX: 1990,

  // Servicios especiales
  CUSTOM_ORDER: 7990,
  INTERPRETATION: 9990,

  // Telemedicina asíncrona
  ASYNC_CONSULT_BASIC: 4990,
  ASYNC_CONSULT_SPECIALIST: 12990,
} as const;

export const formatCLP = (amount: number): string => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export type PricingKey = keyof typeof PRICING;
