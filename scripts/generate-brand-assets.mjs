#!/usr/bin/env node
/**
 * Generador de assets de marca usando Google Imagen 4 Ultra.
 *
 * Uso:
 *   node scripts/generate-brand-assets.mjs            # genera todos
 *   node scripts/generate-brand-assets.mjs hero       # solo hero
 *   node scripts/generate-brand-assets.mjs --model fast  # imagen-4.0-fast
 *
 * Outputs:
 *   apps/web/public/brand/logo-mark.png
 *   apps/web/public/brand/hero-bg.png
 *   apps/web/public/brand/og-image.png
 *   apps/web/public/categories/<id>.png  (x N)
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// Cargar .env.local manualmente (sin dotenv para evitar deps)
function loadEnv() {
  const envPath = join(ROOT, ".env.local");
  if (!existsSync(envPath)) return;
  const content = readFileSync(envPath, "utf-8");
  for (const line of content.split("\n")) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) process.env[m[1]] = m[2].replace(/^"|"$/g, "");
  }
}
loadEnv();

const API_KEY = process.env.GOOGLE_GENAI_API_KEY;
if (!API_KEY) {
  console.error("❌ GOOGLE_GENAI_API_KEY no definida en .env.local");
  process.exit(1);
}

// Argumentos CLI
const args = process.argv.slice(2);
const modelArg = args.indexOf("--model");
const MODEL =
  modelArg >= 0
    ? `imagen-4.0-${args[modelArg + 1]}-generate-001`
    : "imagen-4.0-generate-001"; // estándar por defecto

const TARGET = args.find((a) => !a.startsWith("--") && a !== "fast" && a !== "ultra" && a !== "standard");

console.log(`🎨 Generador de assets — Modelo: ${MODEL}`);
console.log(`📁 Output root: ${ROOT}\n`);

// =================================================================
// Definición de assets a generar
// =================================================================

const ASSETS = [
  {
    id: "hero-bg",
    path: "apps/web/public/brand/hero-bg.png",
    aspectRatio: "16:9",
    prompt: `An abstract minimalist medical technology hero background.
Deep navy blue (#0A0E1A) gradient base with subtle electric cyan (#0EA5E9) and violet (#7C3AED) glow accents.
Floating translucent geometric shapes suggesting molecular structures, DNA helixes, and circuit patterns.
Premium futuristic aesthetic, similar to Apple Vision Pro marketing.
Soft volumetric lighting, depth of field, no humans, no text, no logos.
4K quality, cinematic composition, ample negative space in center for text overlay.
Style: Apple, Linear, Vercel, Stripe homepage backgrounds.`,
  },
  {
    id: "logo-mark",
    path: "apps/web/public/brand/logo-mark.png",
    aspectRatio: "1:1",
    prompt: `Minimalist abstract logo mark for a Chilean medical e-commerce brand called "Haztetuexamen".
Clean geometric symbol combining a medical cross with a digital pulse/heartbeat line.
Single color: electric cyan (#0EA5E9) on transparent dark background.
Flat, vector-style, ample padding around the mark.
Inspired by: Stripe, Linear, Notion, Anthropic logos.
NO text, NO letters, NO clinical hospital aesthetic.
Just the abstract symbol, centered, with subtle glow.`,
  },
  {
    id: "og-image",
    path: "apps/web/public/brand/og-image.png",
    aspectRatio: "16:9",
    prompt: `Premium Open Graph social card for a Chilean medical e-commerce platform.
Dark gradient background (deep navy to violet with cyan accents).
Abstract floating elements suggesting health/medical-tech: DNA strands, ECG lines, molecular bonds.
Center of image is intentionally empty for text overlay "Haztetuexamen.cl - Tu chequeo en 5 minutos".
Aspect ratio 16:9 exactly 1200x630.
Style: Vercel, Linear, Stripe marketing imagery.
NO existing text, NO people's faces, NO clinical stock photo aesthetic.`,
  },
  {
    id: "cat-general",
    path: "apps/web/public/categories/general.png",
    aspectRatio: "4:3",
    prompt: `Abstract minimalist visualization of "general health checkup".
A glowing translucent human silhouette outline in cyan blue, surrounded by floating data points and circular metrics.
Dark navy background with subtle volumetric lighting.
Editorial, premium, no medical instruments visible.
Style: medical-tech editorial illustration.
Negative space on left side. No text, no logos.`,
  },
  {
    id: "cat-cardio",
    path: "apps/web/public/categories/cardiovascular.png",
    aspectRatio: "4:3",
    prompt: `Abstract minimalist representation of cardiovascular health.
A glowing translucent heart outline rendered as flowing energy ribbons in red (#EF4444) and cyan (#0EA5E9).
Floating ECG pulse line wrapping around it.
Dark navy gradient background.
Editorial style, no anatomical realism, premium aesthetic.
No text, no logos, no people.`,
  },
  {
    id: "cat-sexual",
    path: "apps/web/public/categories/salud-sexual.png",
    aspectRatio: "4:3",
    prompt: `Abstract minimalist visualization of sexual health screening.
Two interlocking translucent geometric forms in soft cyan and violet, suggesting connection and protection.
Floating molecular structures around them.
Dark navy gradient background.
Editorial, premium, tasteful, discrete and professional.
No anatomical imagery, no people, no text, no clinical clichés.`,
  },
  {
    id: "cat-infeccioso",
    path: "apps/web/public/categories/infeccioso.png",
    aspectRatio: "4:3",
    prompt: `Abstract minimalist visualization of infectious disease screening.
Translucent floating virus and bacteria-like geometric forms in cyan and turquoise.
Surrounded by a glowing protective shield/aura.
Dark navy gradient background.
Editorial premium aesthetic, no horror imagery.
No text, no logos.`,
  },
  {
    id: "cat-imagenologia",
    path: "apps/web/public/categories/imagenologia.png",
    aspectRatio: "4:3",
    prompt: `Abstract minimalist representation of medical imaging/ultrasound.
Concentric translucent wave patterns in cyan emanating outward from a center point.
Soft glowing geometric forms in the background suggesting internal organs.
Dark navy gradient background.
Editorial premium style, technological aesthetic.
No text, no logos, no people.`,
  },
];

// =================================================================
// API call con manejo de errores
// =================================================================

async function generateImage(asset) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:predict?key=${API_KEY}`;

  console.log(`🖼️  Generando: ${asset.id}…`);
  const t0 = Date.now();

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      instances: [{ prompt: asset.prompt }],
      parameters: {
        sampleCount: 1,
        aspectRatio: asset.aspectRatio,
        personGeneration: "DONT_ALLOW",
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`API error ${res.status}: ${errText.slice(0, 200)}`);
  }

  const data = await res.json();
  const predictions = data.predictions ?? [];
  if (predictions.length === 0) {
    throw new Error("No se recibieron imágenes en la respuesta");
  }

  const b64 = predictions[0].bytesBase64Encoded;
  if (!b64) {
    throw new Error("Respuesta sin bytes de imagen");
  }

  // Guardar
  const outPath = join(ROOT, asset.path);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, Buffer.from(b64, "base64"));

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  const sizeKB = (Buffer.from(b64, "base64").length / 1024).toFixed(0);
  console.log(`   ✅ ${asset.path} (${sizeKB}KB · ${elapsed}s)`);
}

// =================================================================
// Run
// =================================================================

const targets = TARGET ? ASSETS.filter((a) => a.id.includes(TARGET)) : ASSETS;

if (targets.length === 0) {
  console.log(`⚠️  No se encontró asset con filtro "${TARGET}"`);
  console.log(`   Disponibles: ${ASSETS.map((a) => a.id).join(", ")}`);
  process.exit(1);
}

console.log(`Generando ${targets.length} asset(s)…\n`);

let success = 0;
let failed = 0;

for (const asset of targets) {
  try {
    await generateImage(asset);
    success++;
  } catch (e) {
    console.error(`   ❌ ${asset.id}: ${e.message}`);
    failed++;
  }
}

console.log(`\n📊 Completado: ${success} exitosas, ${failed} fallidas`);
process.exit(failed > 0 ? 1 : 0);
