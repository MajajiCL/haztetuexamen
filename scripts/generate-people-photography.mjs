#!/usr/bin/env node
/**
 * Generador de fotografía editorial premium — Imagen 4 ULTRA
 *
 * Genera imágenes de personas reales chilenas/latinas en contextos
 * de salud cotidiana. Estilo: documentary editorial photography,
 * cinematic dark mood, premium magazine quality.
 *
 * Referencias estéticas:
 *  - Eight Sleep, Function Health, Levels, Ro Health
 *  - Apple Vision Pro / AirPods cinematic
 *  - Magnum Photos documentary style
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

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
  console.error("❌ GOOGLE_GENAI_API_KEY no definida");
  process.exit(1);
}

const MODEL = "imagen-4.0-ultra-generate-001"; // ULTRA quality

// Prompt base que se aplica a todas las fotos para consistencia visual
const STYLE_BASE = `Shot on Sony A7R IV with 50mm lens, f/1.8, natural available light only, cinematic color grading similar to Roger Deakins, deep shadows but face fully visible, warm subtle tones, documentary editorial photography, magazine quality, premium lifestyle, photographed for a Chilean health-tech brand. NO clinical white background, NO stock photo aesthetic, NO oversaturation, NO blurry faces. Realistic skin texture, authentic moment, real human emotion.`;

const ASSETS = [
  {
    id: "hero-person",
    path: "apps/web/public/photography/hero-person.png",
    aspectRatio: "9:16", // vertical for cinematic hero
    prompt: `Cinematic editorial portrait of a 32-year-old Chilean Latina woman with curly dark hair, looking at her phone screen with quiet confidence and slight smile, lit by the soft blue glow of the phone screen plus a warm window light from the side. She's wearing a cream cotton sweater, sitting on a modern couch in a darkly lit Santiago apartment at golden hour. Background is moody dark navy and warm shadows. Shot on Sony A7R IV with 50mm lens, f/1.4, shallow depth of field. Photograph style of Annie Leibovitz crossed with Apple AirPods marketing. Natural authentic moment, no posing. Premium documentary photography for a Chilean health technology brand. NO text, NO logos, NO clinical setting, NO white background, NO stock photo look. Realistic skin texture, authentic expression.`,
  },
  {
    id: "lifestyle-coffee",
    path: "apps/web/public/photography/lifestyle-coffee.png",
    aspectRatio: "16:9",
    prompt: `Cinematic lifestyle photograph of two Chilean Latin friends in their early 30s at a specialty coffee shop in Barrio Italia Santiago, one showing their phone to the other with a happy expression of relief, warm cinematic lighting from a large window, dark wood interior, plants in background, both wearing casual modern clothes. Documentary candid moment, no staged poses. ${STYLE_BASE}`,
  },
  {
    id: "lifestyle-running",
    path: "apps/web/public/photography/lifestyle-running.png",
    aspectRatio: "16:9",
    prompt: `Cinematic action photograph of a 28-year-old Chilean man jogging through Parque Bicentenario Santiago at dawn, soft pink and golden sunrise light, wearing modern athletic gear, looking healthy and confident, slight motion blur on legs, sharp on face, Andes mountains barely visible in misty background. ${STYLE_BASE}`,
  },
  {
    id: "lifestyle-family",
    path: "apps/web/public/photography/lifestyle-family.png",
    aspectRatio: "4:3",
    prompt: `Cinematic family portrait of three generations of Chilean Latin family (grandmother around 65, daughter around 38, granddaughter around 8) sitting together on couch in a warmly lit home, the daughter is gently holding her mother's hand while looking at a phone, expressing care and concern resolved into relief, natural intimate moment. Warm tungsten light mixed with cool blue from screen. ${STYLE_BASE}`,
  },
  {
    id: "lifestyle-laboratory",
    path: "apps/web/public/photography/lifestyle-laboratory.png",
    aspectRatio: "16:9",
    prompt: `Cinematic shot of a Chilean woman in her 30s walking confidently out of a modern Chilean laboratory clinic in Santiago, holding her phone with the order displayed, slight smile, golden hour natural light flooding the entrance, professional but warm aesthetic. NOT the inside of the clinic — the moment of leaving with a sense of completed accomplishment. ${STYLE_BASE}`,
  },
  {
    id: "product-phone",
    path: "apps/web/public/photography/product-phone.png",
    aspectRatio: "3:4",
    prompt: `Premium product photography of a modern iPhone 16 held in a Latin hand, displaying a clean minimalist medical app interface (no specific text readable, just abstract dark UI with cyan accents suggesting a health platform), photographed against a dark moody navy background with single rim light from the side highlighting the phone edge, cinematic still life style similar to Apple product shots. Hand is well manicured but natural, no rings. ${STYLE_BASE}`,
  },
  {
    id: "doctor-screen",
    path: "apps/web/public/photography/doctor-screen.png",
    aspectRatio: "16:9",
    prompt: `Cinematic editorial photograph of a Chilean doctor in his 40s reviewing patient data on a sleek dark UI on a modern laptop in his home office at night, single warm desk lamp lighting, looking focused and professional, wearing a casual button-up shirt (not white coat), surrounded by tasteful books and plants, premium intimate workspace aesthetic. ${STYLE_BASE}`,
  },
  {
    id: "lifestyle-results",
    path: "apps/web/public/photography/lifestyle-results.png",
    aspectRatio: "9:16",
    prompt: `Cinematic close-up portrait of a Chilean woman in her late 20s in bed at morning, soft natural window light, reading her medical results on her phone with an expression of profound relief and peace, slight smile forming, hair tousled from sleep, wearing a comfortable cotton t-shirt, photographed with extreme intimacy and warmth. The moment of "everything is okay". ${STYLE_BASE}`,
  },
  {
    id: "og-cinematic",
    path: "apps/web/public/photography/og-cinematic.png",
    aspectRatio: "16:9",
    prompt: `Cinematic 1200x630 Open Graph card composition. Left side: dramatic side-lit portrait of a Chilean woman looking at her phone with relief, dark moody navy background. Right side: clean negative space with subtle vignette for text overlay. Composition follows rule of thirds with subject on the left third. Premium magazine cover quality. ${STYLE_BASE}`,
  },
];

// =================================================================
async function generateImage(asset) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:predict?key=${API_KEY}`;
  console.log(`📸 ${asset.id} (${asset.aspectRatio})…`);
  const t0 = Date.now();
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      instances: [{ prompt: asset.prompt }],
      parameters: {
        sampleCount: 1,
        aspectRatio: asset.aspectRatio,
        personGeneration: "ALLOW_ADULT",
      },
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`API ${res.status}: ${errText.slice(0, 200)}`);
  }

  const data = await res.json();
  const b64 = data.predictions?.[0]?.bytesBase64Encoded;
  if (!b64) throw new Error("No image bytes");

  const outPath = join(ROOT, asset.path);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, Buffer.from(b64, "base64"));

  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  const sizeKB = (Buffer.from(b64, "base64").length / 1024).toFixed(0);
  console.log(`   ✅ ${asset.path} (${sizeKB}KB · ${elapsed}s)`);
}

console.log(`🎬 Generando fotografía editorial premium con ${MODEL}\n`);
let ok = 0, fail = 0;
for (const a of ASSETS) {
  try { await generateImage(a); ok++; }
  catch (e) { console.error(`   ❌ ${a.id}: ${e.message}`); fail++; }
}
console.log(`\n📊 ${ok} exitosas · ${fail} fallidas`);
process.exit(fail > 0 ? 1 : 0);
