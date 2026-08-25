import type { Metadata } from "next";
import { FantasyClubLanding } from "@/components/fantasy-club/FantasyClubLanding";
import { getBrand, getFantasyClubProducts } from "@/lib/queries";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrand();
  const baseUrl = brand.url || "https://www.tntsportapparel.id";
  return {
    title: "FANTASY CLUB — Fantasy Football Apparel / 2026",
    description:
      "Koleksi jersey fantasy dengan desain berani, modern, dan siap dikustomisasi dengan identitas tim kamu.",
    alternates: { canonical: "/fantasy-club" },
    openGraph: {
      title: "FANTASY CLUB — Fantasy Football Apparel / 2026",
      description:
        "Koleksi jersey fantasy dengan desain berani, modern, dan siap dikustomisasi dengan identitas tim kamu.",
      url: `${baseUrl}/fantasy-club`,
      type: "website",
      locale: "id_ID",
      images: [
        {
          url: `${baseUrl}/landing/fantasy-club/02e49952-8984-4f27-bf83-fddbbe1c4a8b.png`,
          width: 1200,
          height: 630,
          alt: "Fantasy Club Jersey Collection",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "FANTASY CLUB — Fantasy Football Apparel / 2026",
      description:
        "Koleksi jersey fantasy dengan desain berani, modern, dan siap dikustomisasi dengan identitas tim kamu.",
      images: [`${baseUrl}/landing/fantasy-club/02e49952-8984-4f27-bf83-fddbbe1c4a8b.png`],
    },
  };
}

function buildJsonLd(brandName: string, brandUrl: string) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Jersey Fantasy Club Custom Full Printing",
      description:
        "Koleksi jersey fantasy dengan desain berani, modern, dan siap dikustomisasi dengan identitas tim kamu. Bahan dry-fit standar liga pro.",
      brand: { "@type": "Brand", name: brandName },
      category: "Pakaian Olahraga Custom",
      image: `${brandUrl}/landing/fantasy-club/02e49952-8984-4f27-bf83-fddbbe1c4a8b.png`,
      url: `${brandUrl}/fantasy-club`,
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "75000",
        highPrice: "145000",
        priceCurrency: "IDR",
        offerCount: "2",
        availability: "https://schema.org/InStock",
        url: `${brandUrl}/fantasy-club`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: brandUrl },
        { "@type": "ListItem", position: 2, name: "Fantasy Club", item: `${brandUrl}/fantasy-club` },
      ],
    },
  ];
}

export default async function FantasyClubPage() {
  const [brand, products] = await Promise.all([getBrand(), getFantasyClubProducts()]);
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
      <FantasyClubLanding products={products} />
    </>
  );
}
