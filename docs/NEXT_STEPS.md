# Próximos pasos — Continuación del proyecto

Esta es la lista de tareas concretas para continuar el desarrollo en próximas sesiones de Claude Code.

## 🚨 Bloqueadores legales (antes de ir a producción)

1. **Recopilar credenciales reales del médico colaborador**
   - RUT + número RNPI vigente en Superintendencia de Salud
   - Foto/PNG de firma manuscrita escaneada
   - Certificado digital FES (eCertChile, Acepta, o equivalente)
   - Actualizar `.env.local` con datos reales

2. **Iniciar trámite de cuenta Webpay Plus en Transbank**
   - URL: https://www.transbank.cl/productos/webpay-plus
   - Requisitos: inicio de actividades SII activo, RUT empresa, cuenta corriente
   - Tiempo estimado: 2-3 semanas

3. **Constituir sociedad / activar giro SII**
   - Giro recomendado: "Portales de internet" + "Servicios de salud"

4. **Registrar dominio haztetuexamen.cl**
   - URL: https://nic.cl
   - Validar disponibilidad y registrar

## 📐 Prompts útiles para siguientes sesiones de Claude Code

Copia y pega estos prompts cuando vuelvas a abrir el proyecto:

### Sesión 2: 3D anatómico real
```
Vamos a reemplazar el HumanFigure abstracto del AnatomySelector con un modelo 3D anatómico real.
Necesito:
1. Descargar un modelo GLB de cuerpo humano CC0 (Sketchfab o equivalente)
2. Comprimirlo con Draco + KTX2 para texturas
3. Implementar zonas clickeables en órganos reales (cerebro, corazón, pulmones, etc.)
4. Cada zona expande un panel lateral con los exámenes asociados
Trabaja en apps/web/src/components/sections/anatomy-selector.tsx
```

### Sesión 3: Webpay real
```
Integrar Webpay Plus REAL en el checkout. Tengo cuenta de pruebas Transbank con:
COMMERCE_CODE=...
API_KEY=...
Reemplazar el mock en apps/web/src/app/api/orders/create/route.ts con el SDK oficial:
npm i transbank-sdk
Implementar:
- POST /api/payments/init → crea transacción y retorna token + URL Webpay
- GET /api/payments/return → callback que confirma o rechaza pago
- Actualizar checkout para redirect a Webpay
```

### Sesión 4: Email transaccional con Resend
```
Configurar email con Resend (tengo API key).
Templates necesarios (HTML responsive):
1. Confirmación de orden (con PDF adjunto)
2. Recordatorio de examen no realizado (48 hrs después)
3. Solicitud de interpretación de resultados
Crear en apps/web/src/lib/email-templates/
Usar @react-email/components para componer HTML
```

### Sesión 5: Migración a Postgres en VPS
```
Migrar BD de SQLite a Postgres en VPS1 (45.239.218.16).
Pasos:
1. SSH al VPS, instalar Postgres si no está
2. CREATE EXTENSION pgcrypto;
3. CREATE USER haztetuexamen WITH PASSWORD '...';
4. CREATE DATABASE haztetuexamen OWNER haztetuexamen;
5. Actualizar schema.prisma → provider postgresql
6. Implementar @Encrypted decorator que use pgp_sym_encrypt
7. Migrar datos demo
```

### Sesión 6: PWA + offline mode
```
Convertir a PWA con service worker:
- Cache shell offline (landing + catálogo)
- Sincronización en background de órdenes pendientes
- Push notifications para "tu orden está lista"
- Install prompt nativo
```

### Sesión 7: Selector 3D avanzado con Spline
```
Crear el modelo 3D anatómico definitivo en Spline.io:
1. Exportar como GLB optimizado
2. Implementar transiciones de cámara fluidas entre sistemas
3. Highlight emisivo del sistema seleccionado
4. Parallax sutil del cuerpo según mouse movement
```

## 🎨 Mejoras de UX pendientes

- [ ] Implementar `loading.tsx` y `error.tsx` en cada ruta del App Router
- [ ] Agregar `not-found.tsx` global
- [ ] Skeleton states para fetch del catálogo
- [ ] Onboarding tour para primer usuario (intro.js o react-joyride)
- [ ] Dark/light mode toggle (actualmente solo dark)
- [ ] Internacionalización ES/EN (next-intl)
- [ ] Búsqueda full-text en catálogo (Fuse.js)
- [ ] Carrito como drawer lateral (no solo página)
- [ ] Páginas legales: /legal/terminos, /legal/privacidad, /legal/datos-sensibles
- [ ] Página /como-funciona expandida con video explicativo

## 🛡 Seguridad pendiente

- [ ] Rate limiting en endpoints (express-rate-limit o upstash)
- [ ] CSRF tokens en formularios sensibles
- [ ] HCaptcha o Cloudflare Turnstile en checkout
- [ ] Audit log automático en cada acceso a datos sensibles
- [ ] Notificación automática a Agencia de Protección de Datos en caso de brecha (Ley 21.719)
- [ ] Pen testing antes de producción
- [ ] Security headers verificados con https://securityheaders.com/

## 📊 Métricas pendientes

- [ ] Google Analytics 4 o Plausible
- [ ] Sentry para error tracking
- [ ] Logflare o BetterStack para logs
- [ ] Posthog para product analytics

## 🤝 Generación de assets adicionales

Cuando necesites más imágenes, simplemente extiende `scripts/generate-brand-assets.mjs`:

```js
const ASSETS = [
  // ...existentes
  {
    id: "team-photo-1",
    path: "apps/web/public/team/founder.png",
    aspectRatio: "1:1",
    prompt: "Professional portrait...",
  },
];
```

Luego: `node scripts/generate-brand-assets.mjs team`

## 🎬 Idea para video hero (Fase 2)

Una vez que tengas el sitio funcionando, contratar a un freelancer para crear:
- Video de 4-6 segundos en MP4 H.264 (1920x1080) que muestre el cuerpo humano girando 360°
- Con sistemas resaltándose secuencialmente
- Para usar con el patrón "video scrubbing on scroll" (skill `3d-scroll-landing` ya documentada)
- Reemplazar la sección AnatomySelector con esa experiencia cinematográfica
