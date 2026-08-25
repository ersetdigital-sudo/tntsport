import type { Metadata } from "next";
import JerseyRunningLanding from "@/components/jersey-running/JerseyRunningLanding";
import { CATEGORY_LANDINGS } from "@/lib/category-landing";
import { CATALOG_PRODUCTS } from "@/lib/products";
import { getBrand, getCatalogData } from "@/lib/queries";

export const revalidate = 3600;

const config = CATEGORY_LANDINGS.running;

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrand();
  const baseUrl = brand.url || "https://www.tntsportapparel.id";
  const ogImage = `${baseUrl}/api/og/katalog?category=${encodeURIComponent(config.catalogId)}`;
  const pageUrl = `${baseUrl}/${config.slug}`;

  return {
    title: config.seo.title,
    description: config.seo.description,
    keywords: [
      "jersey running custom",
      "jersey lari custom",
      "jersey running full printing",
      "jersey marathon custom",
      "jersey trail running",
      "jersey lari satuan",
      "jersey running murah",
      "jersey running dry fit",
      "jersey running design",
      "kaos lari custom",
      "baju lari custom",
      "jersey running nama nomor",
      "jersey running komunitas lari",
      "jersey running event",
    ],
    authors: [{ name: brand.name || "TNT SPORT APPAREL" }],
    creator: brand.name || "TNT SPORT APPAREL",
    publisher: brand.name || "TNT SPORT APPAREL",
    formatDetection: {
      telephone: true,
      email: true,
      address: true,
    },
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: config.seo.title,
      description: config.seo.description,
      url: pageUrl,
      siteName: brand.name || "TNT SPORT APPAREL",
      type: "website",
      locale: "id_ID",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Jersey Running Custom Full Printing — TNT SPORT APPAREL",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.seo.title,
      description: config.seo.description,
      images: [ogImage],
      creator: "@tntsportapparel",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "your-google-verification-code",
    },
  };
}

function buildJsonLd(brandName: string, brandUrl: string) {
  const pageUrl = `${brandUrl}/jersey-running`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Jersey Running Custom Full Printing",
      description:
        "Jersey running custom full printing bahan Dry Fit Premium. Bisa order satuan, gratis desain + revisi bebas. Langsung dari pabrik, sejak 2017. Mulai Rp75.000/pcs.",
      brand: { "@type": "Brand", name: brandName },
      category: "Pakaian Olahraga Custom",
      image: `${brandUrl}/logo.jpg`,
      url: pageUrl,
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "85000",
        highPrice: "145000",
        priceCurrency: "IDR",
        offerCount: "20",
        availability: "https://schema.org/InStock",
        url: pageUrl,
        seller: {
          "@type": "Organization",
          name: brandName,
        },
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        bestRating: "5",
        reviewCount: "6",
      },
      review: [
        {
          "@type": "Review",
          itemReviewed: {
            "@type": "Product",
            name: "Jersey Running Custom",
            url: "https://www.tntsportapparel.id/jersey-running",
          },
          reviewBody: "Jersey dari TNT Sport benar-benar beda kualitasnya. Bahan adem, printing tajam, nyaman dipakai lari jauh.",
          author: { "@type": "Person", name: "Andri" },
          reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
        },
        {
          "@type": "Review",
          itemReviewed: {
            "@type": "Product",
            name: "Jersey Running Custom",
            url: "https://www.tntsportapparel.id/jersey-running",
          },
          reviewBody: "Kami pesan untuk tim lari komunitas — warnanya cerah, nama dan nomor bib terlihat jelas.",
          author: { "@type": "Person", name: "Rizky" },
          reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
        },
        {
          "@type": "Review",
          itemReviewed: {
            "@type": "Product",
            name: "Jersey Running Custom",
            url: "https://www.tntsportapparel.id/jersey-running",
          },
          reviewBody: "Order satuan dulu buat tes, hasilnya langsung oke. Sekarang tim kami sudah pesan ulang.",
          author: { "@type": "Person", name: "Dimas" },
          reviewRating: { "@type": "Rating", ratingValue: 5, bestRating: 5 },
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: config.faqs.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: brandUrl },
        { "@type": "ListItem", position: 2, name: "Jersey Running", item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: brandName,
      url: brandUrl,
      logo: `${brandUrl}/logo.jpg`,
    },
  ];
}

export default async function JerseyRunningPage() {
  const [brand, catalogData] = await Promise.all([
    getBrand(),
    getCatalogData(),
  ]);

  const category = catalogData?.find((c) => c.id === config.catalogId);
  const products = category?.products.length
    ? category.products
    : (CATALOG_PRODUCTS.find((c) => c.id === "running")?.products ?? []);

  const baseUrl = brand.url || "https://www.tntsportapparel.id";
  const jsonLd = buildJsonLd(brand.name, baseUrl);

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <JerseyRunningLanding products={products} waNumber={brand.whatsappNumber || "628115491117"} />
    </>
  );
}
