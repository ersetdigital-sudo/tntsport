import { createClient, supabaseConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function TrustBadgesAdminPage() {
  // STEP 1: Check env vars
  if (!supabaseConfigured()) {
    return (
      <div style={{ padding: 32 }}>
        <h1>Trust Badges</h1>
        <p style={{ color: "#f59e0b" }}>Supabase belum dikonfigurasi. Cek environment variables di Vercel.</p>
      </div>
    );
  }

  // STEP 2: Try to create client
  let supabase;
  try {
    supabase = await createClient();
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[trust-badges] createClient error:", msg);
    return (
      <div style={{ padding: 32 }}>
        <h1>Trust Badges</h1>
        <p style={{ color: "#ef4444" }}>Gagal koneksi ke database: {msg}</p>
      </div>
    );
  }

  // STEP 3: Try to query
  let items: any[] = [];
  let queryError: string | null = null;
  try {
    const { data, error } = await supabase
      .from("trust_badges")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) {
      queryError = `${error.code ?? "?"}: ${error.message}`;
      console.error("[trust-badges] query error:", queryError);
    } else {
      items = data ?? [];
    }
  } catch (err) {
    queryError = err instanceof Error ? err.message : String(err);
    console.error("[trust-badges] query exception:", queryError);
  }

  // STEP 4: Render
  return (
    <div style={{ padding: 32 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Trust Badges</h1>
      <p style={{ color: "#6b7280", marginBottom: 24 }}>
        Grid keunggulan di landing page
      </p>

      {queryError ? (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: 16 }}>
          <p style={{ color: "#dc2626", fontWeight: 600 }}>Error querying trust_badges:</p>
          <code style={{ fontSize: 13 }}>{queryError}</code>
        </div>
      ) : items.length === 0 ? (
        <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, padding: 16 }}>
          <p style={{ color: "#6b7280" }}>Belum ada data trust badges.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: 8,
                padding: "12px 16px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <strong>{item.label}</strong>
                <span style={{ color: "#6b7280", marginLeft: 8 }}>— {item.variant}</span>
              </div>
              <span style={{ color: "#9ca3af" }}>{item.subtext}</span>
            </div>
          ))}
        </div>
      )}

      <p style={{ color: "#d1d5db", fontSize: 12, marginTop: 24 }}>
        Debug: {items.length} items loaded | Config: OK | Query: {queryError ?? "OK"}
      </p>
    </div>
  );
}
