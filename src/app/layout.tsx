import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FisicaInador - Tu Universo de Física Pre-Universitaria",
  description: "Plataforma educativa de física con temática espacial para estudiantes pre-universitarios. Aprende mecánica, electromagnetismo, ondas y más explorando planetas.",
  keywords: ["física", "pre-universitario", "educación", "mecánica", "electromagnetismo", "ondas", "Newton", "Kepler", "leyes de física", "aprender física", "edutainment"],
  authors: [{ name: "FisicaInador Team" }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚀</text></svg>",
  },
  openGraph: {
    title: "FisicaInador - Tu Universo de Física",
    description: "Explora el universo de la física a través de planetas interactivos. Aprende mecánica, electromagnetismo, ondas y más.",
    url: "https://fisicainador.com",
    siteName: "FisicaInador",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FisicaInador - Explora el Universo de la Física",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FisicaInador - Tu Universo de Física Pre-Universitaria",
    description: "Aprende física explorando planetas interactivos. Temas: Leyes de Newton, Hooke, Circuitos, Ondas y más.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="dark">
      <head>
        <meta name="theme-color" content="#0a0a1a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground overflow-x-hidden`}
      >
        <Providers>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
