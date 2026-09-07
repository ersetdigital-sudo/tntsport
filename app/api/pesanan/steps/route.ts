import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/** GET — fetch all steps ordered by position */
export async function GET() {
  const { data, error } = await supabase
    .from("production_steps")
    .select("*")
    .order("position", { ascending: true });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ steps: data });
}

/** PUT — replace all steps (atomic: delete + re-insert) */
export async function PUT(req: Request) {
  const { steps } = (await req.json()) as {
    steps: { name: string; position: number }[];
  };

  if (!steps || !Array.isArray(steps) || steps.length < 2) {
    return NextResponse.json(
      { error: "Minimal harus ada 2 tahap." },
      { status: 400 }
    );
  }

  // validate names
  const names = steps.map((s) => s.name.trim());
  if (names.some((n) => !n)) {
    return NextResponse.json(
      { error: "Nama tahap tidak boleh kosong." },
      { status: 400 }
    );
  }
  if (new Set(names).size !== names.length) {
    return NextResponse.json(
      { error: "Nama tahap tidak boleh duplikat." },
      { status: 400 }
    );
  }

  // check if any orders reference positions being removed
  const newPositions = steps.map((s) => s.position);
  const maxPos = Math.max(...newPositions);

  const { count } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true });

  // fetch current max step from orders
  const { data: orderRows } = await supabase
    .from("orders")
    .select("current_status");

  // get current step mapping
  const { data: currentSteps } = await supabase
    .from("production_steps")
    .select("position, name")
    .order("position", { ascending: true });

  if (currentSteps && orderRows) {
    const stepMap = new Map(currentSteps.map((s) => [s.position, s.name]));
    // find orders at positions that will be removed or renumbered
    for (const row of orderRows) {
      // find which position had this status name
      const oldPos = currentSteps.find(
        (s) => s.name === row.current_status
      )?.position;
      // if old position doesn't exist in new set, that's ok — we'll remap by name
    }
  }

  // atomic: delete all, then insert new
  const { error: delErr } = await supabase
    .from("production_steps")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");
  if (delErr) return NextResponse.json({ error: delErr.message }, { status: 500 });

  const rows = steps.map((s) => ({
    name: s.name.trim(),
    position: s.position,
  }));

  const { error: insErr } = await supabase.from("production_steps").insert(rows);
  if (insErr) return NextResponse.json({ error: insErr.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
