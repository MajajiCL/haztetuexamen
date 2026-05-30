import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";

// Inter para body
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Fraunces para display — editorial health authority (Function Health, Parsley style)
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://haztetuexamen.cl"),
  title: {
    default: "haztetuexamen.cl — Tu chequeo en 5 minutos",
    template: "%s · haztetuexamen",
  },
  description:
    "Plataforma chilena de órdenes médicas digitales. Exámenes preventivos desde $1.990 CLP.",
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://haztetuexamen.cl",
    siteName: "haztetuexamen",
    images: ["/photography/og-cinematic.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL" className={`${inter.variable} ${jetbrainsMono.variable} ${fraunces.variable}`}>
      <body className="min-h-screen bg-bg-base text-fg-primary antialiased">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
