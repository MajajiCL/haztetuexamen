# Haztetuexamen.cl

**E-commerce médico chileno con interfaz 3D inmersiva.** Emisión digital de órdenes de exámenes preventivos cumpliendo el marco regulatorio chileno (Ley 20.584, 19.628, 21.719, 19.799, 21.746).

---

## Estado del proyecto

✅ **Scaffold completo del MVP** (sesión inicial 2026-05-27)

| Capa | Estado | Tech |
|---|---|---|
| Monorepo | ✅ Listo | npm workspaces |
| Frontend | ✅ Funcional | Next.js 15 + React 19 + Tailwind v4 + Framer Motion + Lenis |
| 3D Selector | ✅ Implementado | React Three Fiber + drei (figura humana abstracta interactiva) |
| Catálogo | ✅ 10 productos con códigos Fonasa reales | Tipado en `packages/shared/src/catalog.ts` |
| Checkout | ✅ 5-step flow funcional | Validación RUT chileno + consentimiento informado |
| PDF generator | ✅ Mock funcional con QR de verificación | Next.js API Route |
| Backend NestJS | ✅ Scaffold mínimo | NestJS + Prisma |
| Schema BD | ✅ Listo (FHIR-compatible) | Prisma + SQLite dev / Postgres prod |
| Brand assets | ✅ 8 imágenes generadas con Imagen 4 Ultra | Hero, logo, OG, 5 categorías |
| Pagos reales | ❌ Pendiente — mock con Webpay placeholder | Necesita cuenta Transbank |
| Email transaccional | ❌ Pendiente | Recomendado: Resend |
| Médico real (RNPI) | ❌ Pendiente — usar credenciales reales en `.env.local` |

---

## Quick start

### 1. Verificar dependencias (ya instaladas)

```bash
cd D:\CLAUDIOPRO\haztetuexamen
npm install  # ya ejecutado, sólo si necesitas reinstalar
```

### 2. Levantar el frontend

```bash
npm run dev
# → http://localhost:3000
```

### 3. (Opcional) Levantar el backend NestJS

```bash
npm run dev:api
# → http://localhost:3001
```

### 4. (Opcional) Levantar ambos en paralelo

```bash
npm run dev:all
```

### 5. Regenerar assets de marca con Imagen 4

```bash
# Todos
npm run generate:assets

# Solo uno
node scripts/generate-brand-assets.mjs hero

# Modelo más rápido (iteración)
node scripts/generate-brand-assets.mjs --model fast

# Modelo top calidad (slow, premium)
node scripts/generate-brand-assets.mjs --model ultra
```

---

## Estructura del monorepo

```
haztetuexamen/
├── apps/
│   ├── web/                      # Next.js 15 frontend
│   │   ├── src/
│   │   │   ├── app/              # App Router pages
│   │   │   │   ├── page.tsx      # Landing (Hero + secciones)
│   │   │   │   ├── catalogo/     # Catálogo de exámenes
│   │   │   │   ├── checkout/     # Flujo de compra 5-step
│   │   │   │   ├── verificar/    # Verificación pública por QR
│   │   │   │   └── api/orders/   # Endpoints REST (create, [id]/pdf)
│   │   │   ├── components/
│   │   │   │   ├── layout/       # Navbar, Footer
│   │   │   │   ├── sections/     # Hero, HowItWorks, AnatomySelector, etc.
│   │   │   │   ├── ui/           # Button (shadcn-style con CVA)
│   │   │   │   └── providers/    # SmoothScroll (Lenis)
│   │   │   ├── store/            # Zustand stores (cart)
│   │   │   └── lib/              # Helpers (cn, validación RUT)
│   │   └── public/
│   │       ├── brand/            # Logo, hero-bg, og-image (Imagen 4)
│   │       └── categories/       # Iconos por categoría (Imagen 4)
│   │
│   └── api/                      # NestJS backend
│       ├── src/
│       │   ├── main.ts
│       │   ├── app.module.ts
│       │   ├── health/
│       │   └── orders/           # FhirService, SignatureService
│       └── prisma/
│           ├── schema.prisma     # Modelo BD (FHIR + auditoría)
│           └── seed.ts
│
├── packages/
│   └── shared/                   # Tipos y constantes compartidas
│       └── src/
│           ├── fhir.ts           # HL7 FHIR R4 (ServiceRequest, Patient, Practitioner)
│           ├── catalog.ts        # Catálogo de productos con códigos Fonasa
│           ├── brand.ts          # Design tokens (colores, tipografía)
│           ├── pricing.ts        # Estrategia de precios CLP
│           └── types.ts          # Tipos del dominio
│
├── scripts/
│   └── generate-brand-assets.mjs # Imagen 4 Ultra generator
│
├── docs/                         # Documentación (compliance, deploy)
├── .env.example                  # Plantilla de variables de entorno
├── .env.local                    # Variables reales (NO commitear)
└── package.json                  # Workspaces config
```

---

## Marco regulatorio chileno (cumplido en el scaffold)

| Ley | Cumplimiento implementado |
|---|---|
| **Ley 20.584** (Derechos paciente) | Consentimiento informado digital en checkout, ficha clínica estructurada |
| **Ley 19.628 / 21.719** (Datos sensibles) | Schema Prisma marca campos cifrables, AuditLog inmutable, headers de seguridad HTTP |
| **Ley 21.746** (RNPI) | Modelo Practitioner exige `rnpiRegistry` único, validación en `.env.local` |
| **Ley 19.799** (Firma electrónica) | SignatureService con HMAC-SHA256, QR de verificación pública |
| **Arancel Fonasa** | Cada producto del catálogo incluye códigos Fonasa reales validables |
| **HL7 FHIR R4** | Tipos en `packages/shared/src/fhir.ts`, interoperabilidad lab |

---

## Roadmap a producción

### Antes de aceptar el primer pago real

- [ ] **Reemplazar credenciales del médico colaborador** en `.env.local`
  - `DOCTOR_RUT`, `DOCTOR_NAME`, `DOCTOR_RNPI_REGISTRY`, `DOCTOR_SPECIALTY`
  - Verificar registro vigente en https://supersalud.gob.cl/
- [ ] **Obtener cuenta Webpay Plus** en Transbank (https://www.transbank.cl/)
  - Hoy hay credenciales de ambiente de pruebas en `.env.local`
- [ ] **Configurar Resend** para email transaccional (https://resend.com/)
  - Free tier: 3000 emails/mes
  - Configurar dominio `ordenes@haztetuexamen.cl` con SPF/DKIM
- [ ] **Cambiar BD a Postgres**
  - En tu VPS1 o VPS2 (instalar pgcrypto: `CREATE EXTENSION pgcrypto;`)
  - Actualizar `apps/api/prisma/schema.prisma` (descomentar `provider = "postgresql"`)
  - `npm run prisma:migrate:dev --workspace=@haztetuexamen/api`
- [ ] **Generar keys reales de cifrado**
  - `openssl rand -base64 32` para `ENCRYPTION_KEY`
  - `openssl rand -base64 16` para `ENCRYPTION_IV`
- [ ] **Implementar render HTML→PDF con puppeteer**
  - El endpoint actual devuelve HTML. Convertir a PDF binario con `@sparticuz/chromium` para serverless o puppeteer-core para VPS.
- [ ] **Registro de dominio y certificado SSL**
  - haztetuexamen.cl con NIC.cl
  - Certbot/Let's Encrypt en VPS

### Mejoras de Fase 2 (semana 7-12 según brief)

- [ ] Modelo 3D anatómico real (Spline export en GLB con compresión Draco)
- [ ] ClaveÚnica integration para validación de identidad
- [ ] Servicio de interpretación asíncrona (upload PDF, OCR, médico revisa)
- [ ] Dashboard administrativo (gestión de órdenes, métricas)
- [ ] Panel del médico (firma de órdenes personalizadas)
- [ ] App PWA para uso móvil

### Mejoras de Fase 3 (mes 3+)

- [ ] Integración API HL7 FHIR con laboratorios (Clini, Maiposalud, RedSalud)
- [ ] Convenios B2B con municipios y empresas
- [ ] Programa de descuentos / gift cards

---

## Deploy a tu VPS

### Opción A — VPS1 (45.239.218.16) con PM2

```bash
# En tu Windows local
git remote add origin git@github.com:MajajiCL/haztetuexamen.git
git push -u origin main

# En el VPS1 vía SSH
ssh user@45.239.218.16
git clone git@github.com:MajajiCL/haztetuexamen.git
cd haztetuexamen
npm install --production
npm run build
pm2 start npm --name "haztetuexamen-web" -- run start --workspace=@haztetuexamen/web
pm2 start npm --name "haztetuexamen-api" -- run start:prod --workspace=@haztetuexamen/api
pm2 save
```

### Opción B — Docker (recomendado para escalar a VPS2)

Crear `Dockerfile` en cada `apps/*` y un `docker-compose.yml` raíz con
servicios para web, api y postgres. Documentación detallada en `docs/deploy/`.

---

## Comandos útiles

```bash
# Frontend
npm run dev                       # dev server localhost:3000
npm run build                     # production build
npm run lint                      # eslint check
npm run type-check --workspace=@haztetuexamen/web

# Backend
npm run dev:api                   # NestJS dev con watch
npm run prisma:generate --workspace=@haztetuexamen/api
npm run prisma:migrate:dev --workspace=@haztetuexamen/api
npm run prisma:studio --workspace=@haztetuexamen/api  # GUI Prisma

# Assets
npm run generate:assets           # Imagen 4 — todos
```

---

## Tech stack referencia

- **Frontend**: Next.js 15 · React 19 · Tailwind CSS v4 · TypeScript 5.6
- **Animaciones**: Framer Motion (motion) · Lenis smooth scroll · GSAP (opcional)
- **3D**: React Three Fiber · @react-three/drei · three.js
- **Estado**: Zustand (con persist)
- **UI primitives**: shadcn-style con class-variance-authority
- **Backend**: NestJS 10 · Prisma 6 · Node 22+
- **Base de datos**: SQLite (dev) → PostgreSQL + pgcrypto (prod)
- **Pagos**: Transbank Webpay Plus (placeholder)
- **Email**: Resend (placeholder)
- **AI images**: Google Imagen 4 (Ultra/Standard/Fast)
- **Estándar médico**: HL7 FHIR R4 + arancel Fonasa
- **Iconos**: Lucide React

---

## Notas de arquitectura

**¿Por qué Next.js API routes + NestJS coexisten?**

El brief original especifica NestJS para microservicios de firma digital y FHIR. Para el MVP, los mismos endpoints viven en `apps/web/src/app/api/*` (Next.js) para simplificar el deploy local y reducir complejidad. Cuando el tráfico justifique separar servicios, las funciones se mueven a `apps/api/*` (NestJS) sin breaking changes en el cliente.

**¿Por qué SQLite en dev?**

Para que cualquier dev pueda clonar y correr sin instalar Postgres/Docker. La migración a Postgres son 3 líneas en `schema.prisma`.

**¿Por qué no instalar shadcn/ui directamente?**

Tailwind v4 + nuestro `Button` con CVA nos da la flexibilidad de shadcn sin la dependencia de su CLI. Cuando necesitemos primitivas complejas (Dialog, DropdownMenu, Combobox) las traemos vía MCP `shadcn-ui` que ya tienes activo en Claude Code.

---

## Soporte

- **Autor**: MajajiCL · Mateo Ávila
- **Construido con**: Claude Code + Magic MCP + shadcn-ui MCP + Playwright MCP + Imagen 4
- **Cumplimiento legal**: Chile · Ley 20.584 · 19.628 · 21.719 · 19.799 · 21.746

---

## License

UNLICENSED — Proprietary
