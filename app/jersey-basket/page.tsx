import type { Metadata } from "next";
import JerseyBasketLanding from "@/components/jersey-basket/JerseyBasketLanding";
import { CATEGORY_LANDINGS } from "@/lib/category-landing";
import { CATALOG_PRODUCTS } from "@/lib/products";
import { getBrand, getCatalogData } from "@/lib/queries";

export const revalidate = 3600;

const config = CATEGORY_LANDINGS.basket;

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrand();
  const baseUrl = brand.url || "https://www.tntsportapparel.id";
  const ogImage = `${baseUrl}/api/og/katalog?category=${encodeURIComponent(config.catalogId)}`;
  return {
    title: config.seo.title,
    description: config.seo.description,
    alternates: { canonical: `/${config.slug}` },
    openGraph: {
      title: config.seo.title,
      description: config.seo.description,
      url: `${baseUrl}/${config.slug}`,
      type: "website",
      locale: "id_ID",
      images: [{ url: ogImage, width: 1200, height: 630, alt: config.eyebrow }],
    },
    twitter: {
      card: "summary_large_image",
      title: config.seo.title,
      description: config.seo.description,
      images: [ogImage],
    },
  };
}

function buildJsonLd(brandName: string, brandUrl: string) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Jersey Basket Custom Full Printing",
      description: "Jersey basket custom nama, nomor, dan logo tim sendiri. Bahan Dry Fit ringan, full printing tajam, bisa order satuan.",
      brand: { "@type": "Brand", name: brandName },
      category: "Pakaian Olahraga Custom",
      image: `${brandUrl}/logo.jpg`,
      url: `${brandUrl}/jersey-basket`,
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "85000",
        highPrice: "145000",
        priceCurrency: "IDR",
        offerCount: "10",
        availability: "https://schema.org/InStock",
        url: `${brandUrl}/jersey-basket`,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        bestRating: "5",
        reviewCount: "6",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        { "@type": "Question", name: "Bisakah custom nama & nomor sendiri?", acceptedAnswer: { "@type": "Answer", text: "Bisa. Cukup isi formulir pesanan, dan kami cetak sesuai permintaan kamu." } },
        { "@type": "Question", name: "Berapa lama proses produksinya?", acceptedAnswer: { "@type": "Answer", text: "Rata-rata 7 hari kerja tergantung jumlah pesanan." } },
        { "@type": "Question", name: "Ada berapa pilihan desain?", acceptedAnswer: { "@type": "Answer", text: "Tersedia 20 desain siap pilih. Jika menginginkan desain lain, tersedia opsi custom dari nol dengan minimal order 6 pcs." } },
        { "@type": "Question", name: "Bisa order satuan?", acceptedAnswer: { "@type": "Answer", text: "Bisa. Pesanan 1 pcs dapat langsung custom nama, nomor punggung, logo tim, dan logo sponsor — desain dasar mengikuti salah satu dari 20 desain yang tersedia." } },
        { "@type": "Question", name: "Apakah bahannya cocok untuk bermain full court dalam waktu lama?", acceptedAnswer: { "@type": "Answer", text: "Cocok. Dry Fit ringan dan menyerap keringat, sehingga tetap nyaman meski bermain lama." } },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Beranda", item: brandUrl },
        { "@type": "ListItem", position: 2, name: "Jersey Basket", item: `${brandUrl}/jersey-basket` },
      ],
    },
  ];
}

export default async function JerseyBasketPage() {
  const [brand, catalogData] = await Promise.all([
    getBrand(),
    getCatalogData(),
  ]);

  const category = catalogData?.find((c) => c.id === config.catalogId);
  const products = category?.products.length
    ? category.products
    : (CATALOG_PRODUCTS.find((c) => c.id === "basket")?.products ?? []);

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
      <JerseyBasketLanding products={products} waNumber={brand.whatsappNumber || "628115491117"} />
    </>
  );
}
