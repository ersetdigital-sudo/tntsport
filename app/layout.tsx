import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Barlow, Barlow_Condensed, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { getBrand } from "@/lib/queries";
import "./globals.css";

/**
 * Fonts — Barlow (body) + Barlow Condensed (display/headings)
 * for the bold sporty katalog design. IBM Plex Mono for technical labels.
 */
const barlow = Barlow({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["600", "700", "800", "900"],
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
    metadataBase: brand.url ? new URL(brand.url) : undefined,
    title: {
      default: `${brand.name} — ${taglineFirstLine}`,
      template: `%s · ${brand.name}`,
    },
    description: brand.description,
    keywords: [
      "jersey custom full printing",
      "pabrik jersey custom",
      "bikin jersey custom",
      "jersey printing custom",
      "pesan jersey full printing",
      "jersey tim custom",
      "jersey futsal custom",
      "vendor jersey custom",
      "jersey custom murah",
      "konveksi jersey indonesia",
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
    verification: {
      google: "hAIMPnZBflDCkykI7y3VhL7jxPQfCeLuurl4qi_lxN8",
      other: {
        "p:domain_verify": "74505a17aa99b2abe1c9e1b02a53e57f",
      },
    },
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const brand = await getBrand();

  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${barlow.variable} ${barlowCondensed.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        {/* llms.txt discovery for AI assistants */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="TNT SPORT APPAREL — LLM Ringkasan" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="TNT SPORT APPAREL — LLM Konten Lengkap" />
      </head>
      <body className="antialiased">
        {/* Meta Pixel — deferred to avoid render-blocking */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${brand.metaPixelId}');fbq('track','PageView');`,
          }}
        />
        {/* Google Tag Manager — deferred to avoid render-blocking */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TWSXRF55');`,
          }}
        />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TWSXRF55"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
