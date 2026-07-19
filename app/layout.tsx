import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { getBrand } from "@/lib/queries";
import "./globals.css";

/**
 * Fonts — Space Grotesk (display + body) and IBM Plex Mono (technical
 * labels). Both are loaded via next/font/google with display:"swap"
 * and latin subset only, exposed as CSS variables --font-sans and
 * --font-mono consumed by globals.css + tailwind.config.ts.
 */
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

/**
 * Dynamic metadata — brand fields now come from Supabase (with fallback
 * to lib/data.ts). `generateMetadata` runs on the server so the brand
 * row is read at request/build time and the title/description reflect
 * whatever the admin configured.
 */
export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrand();
  const taglineFirstLine = brand.tagline.split("\n")[0];

  return {
    metadataBase: new URL(brand.url),
    title: {
      default: `${brand.name} — ${taglineFirstLine}`,
      template: `%s · ${brand.name}`,
    },
    description: brand.description,
    keywords: [
      "jersey custom",
      "pabrik jersey",
      "full printing jersey",
      "jersey custom murah",
      "pabrik jersey indonesia",
      "jersey tim futsal",
      "jersey tim sepak bola",
      "konveksi jersey",
    ],
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url: brand.url,
      siteName: brand.name,
      title: `${brand.name} — ${taglineFirstLine}`,
      description: brand.description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${brand.name} — ${taglineFirstLine}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${brand.name} — ${taglineFirstLine}`,
      description: brand.description,
      images: ["/opengraph-image"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "shopping",
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
