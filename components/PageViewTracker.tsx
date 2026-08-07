"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

/**
 * PageViewTracker — menghitung kunjungan halaman publik (sekali per load).
 * Memanggil RPC increment_page_views() di Supabase. Render apa-apa (null).
 * Tambahkan di halaman yang ingin dihitung: homepage, katalog, promo.
 */
export function PageViewTracker({ page }: { page: "homepage" | "katalog" | "promo-bulan-ini" }) {
  useEffect(() => {
    try {
      const supabase = createClient();
      supabase.rpc("increment_page_views", { p_page: page });
    } catch {
      // Supabase belum dikonfigurasi / offline — abaikan, jangan error.
    }
    // Hanya sekali per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}