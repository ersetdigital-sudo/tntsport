import { CATALOG_PRODUCTS, productDesignKey } from "@/lib/products";
import { getCatalogData } from "@/lib/queries";

export interface SeoCategory {
  id: string;
  label: string;
}

export interface SeoProduct {
  id: string;
  name: string;
  image: string;
}

export interface SeoContext {
  category?: SeoCategory;
  product?: SeoProduct;
  designKey?: string;
}

export interface SeoCatalog {
  categories: (SeoCategory & { products: SeoProduct[] })[];
}

export async function resolveSeoCatalog(): Promise<SeoCatalog> {
  const catalog = await getCatalogData();
  if (catalog) {
    return {
      categories: catalog.map((cat) => ({
        id: cat.id,
        label: cat.label,
        products: cat.products.map((p) => ({
          id: p.id,
          name: p.catalogue,
          image: p.image,
        })),
      })),
    };
  }
  return {
    categories: CATALOG_PRODUCTS.map((cat) => ({
      id: cat.id,
      label: cat.label,
      products: cat.products.map((p) => ({
        id: p.id,
        name: p.catalogue,
        image: p.image,
      })),
    })),
  };
}

export async function resolveSeoContext(
  categoryParam?: string,
  designParam?: string
): Promise<SeoContext> {
  const { categories } = await resolveSeoCatalog();
  const category = categories.find((c) => c.id === categoryParam);
  const ctx: SeoContext = { category };

  const keyOf = (p: SeoProduct) => productDesignKey({ catalogue: p.name, id: p.id });

  if (!category) {
    // design without a matching category — search across all for deep links
    for (const cat of categories) {
      for (const p of cat.products) {
        if (keyOf(p) === designParam) {
          ctx.category = cat;
          ctx.product = p;
          ctx.designKey = keyOf(p);
          return ctx;
        }
      }
    }
    return ctx;
  }

  const product = category.products.find((p) => keyOf(p) === designParam);
  if (product) {
    ctx.product = product;
    ctx.designKey = keyOf(product);
  }
  return ctx;
}
