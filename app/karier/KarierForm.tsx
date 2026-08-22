"use client";

import { useState } from "react";

interface FieldError {
  msg: string;
}

export default function KarierForm() {
  const [nama, setNama] = useState("");
  const [usia, setUsia] = useState("");
  const [kota, setKota] = useState("");
  const [pengalaman, setPengalaman] = useState("");
  const [porto, setPorto] = useState("");
  const [errors, setErrors] = useState<Record<string, FieldError>>({});
  const [formNote, setFormNote] = useState("");

  function setError(id: string, msg: string) {
    setErrors((prev) => {
      const next = { ...prev };
      if (msg) {
        next[id] = { msg };
      } else {
        delete next[id];
      }
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const values = { nama, usia, kota, pengalaman, porto };
    const newErrors: Record<string, FieldError> = {};
    let firstBad: string | null = null;

    const fields = [
      { id: "nama", label: "Nama Lengkap", msg: "Nama lengkap wajib diisi." },
      { id: "usia", label: "Usia", msg: "Usia wajib diisi dengan angka." },
      { id: "kota", label: "Asal Kota", msg: "Asal kota wajib diisi." },
      { id: "pengalaman", label: "Pengalaman", msg: "Pengalaman wajib diisi (isi 0 kalau fresh graduate)." },
      { id: "porto", label: "Link Portofolio", msg: "Link portofolio wajib diisi." },
    ];

    for (const f of fields) {
      const v = (values as Record<string, string>)[f.id]?.trim() || "";
      let bad = "";
      if (v === "") {
        bad = f.msg;
      } else if ((f.id === "usia" || f.id === "pengalaman") && (isNaN(Number(v)) || Number(v) < 0)) {
        bad = "Masukkan angka yang valid.";
      } else if (f.id === "porto" && !/^(https?:\/\/|www\.)\S+\.\S+/i.test(v)) {
        bad = "Masukkan link yang valid, contoh: https://drive.google.com/...";
      }
      if (bad) {
        newErrors[f.id] = { msg: bad };
        if (!firstBad) firstBad = f.id;
      }
    }

    setErrors(newErrors);

    if (firstBad) {
      setFormNote("Ada field yang belum benar. Cek kembali form di atas.");
      return;
    }

    setFormNote("");

    const waText = [
      "Halo, saya ingin melamar posisi Video Editor di TNT Sport Apparel 🙏",
      "",
      `Nama: ${values.nama}`,
      `Usia: ${values.usia}`,
      `Asal Kota: ${values.kota}`,
      `Pengalaman: ${values.pengalaman} Tahun`,
      `Link Portofolio: ${values.porto}`,
    ].join("\n");

    window.location.href = `https://wa.me/6287780881117?text=${encodeURIComponent(waText)}`;

    setFormNote("Mengarahkan ke WhatsApp...");
  }

  const inputClasses =
    "w-full rounded-xl border px-4 py-3.5 text-base transition focus:outline-none focus:border-[#FF6B35] focus:shadow-[0_0_0_3px_rgba(255,107,53,0.18)]";
  const inputStyle: React.CSSProperties = {
    borderColor: "rgba(11,31,58,0.15)",
    backgroundColor: "#ffffff",
    color: "#0B1F3A",
    fontFamily: "var(--font-body-karier), system-ui, sans-serif",
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-9 rounded-3xl bg-white p-6 sm:p-9 space-y-5" style={{ colorScheme: "light" }}>
      {/* Nama */}
      <div>
        <label htmlFor="nama" className="mb-2 block text-sm font-semibold">
          Nama Lengkap <span style={{ color: "#FF6B35" }}>*</span>
        </label>
        <input
          id="nama"
          name="nama"
          type="text"
          required
          autoComplete="name"
          placeholder="Nama sesuai KTP"
          value={nama}
          onChange={(e) => { setNama(e.target.value); setError("nama", ""); }}
          className={inputClasses}
          style={errors.nama ? { ...inputStyle, borderColor: "#FF6B35" } : inputStyle}
        />
        {errors.nama && <p className="mt-1.5 text-sm font-medium" style={{ color: "#FF6B35" }}>{errors.nama.msg}</p>}
      </div>

      {/* Usia + Kota */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="usia" className="mb-2 block text-sm font-semibold">
            Usia <span style={{ color: "#FF6B35" }}>*</span>
          </label>
          <input
            id="usia"
            name="usia"
            type="number"
            min={15}
            max={70}
            inputMode="numeric"
            required
            placeholder="mis. 23"
            value={usia}
            onChange={(e) => { setUsia(e.target.value); setError("usia", ""); }}
            className={inputClasses}
            style={errors.usia ? { ...inputStyle, borderColor: "#FF6B35" } : inputStyle}
          />
          {errors.usia && <p className="mt-1.5 text-sm font-medium" style={{ color: "#FF6B35" }}>{errors.usia.msg}</p>}
        </div>
        <div>
          <label htmlFor="kota" className="mb-2 block text-sm font-semibold">
            Asal Kota <span style={{ color: "#FF6B35" }}>*</span>
          </label>
          <input
            id="kota"
            name="kota"
            type="text"
            required
            placeholder="mis. Yogyakarta"
            value={kota}
            onChange={(e) => { setKota(e.target.value); setError("kota", ""); }}
            className={inputClasses}
            style={errors.kota ? { ...inputStyle, borderColor: "#FF6B35" } : inputStyle}
          />
          {errors.kota && <p className="mt-1.5 text-sm font-medium" style={{ color: "#FF6B35" }}>{errors.kota.msg}</p>}
        </div>
      </div>

      {/* Pengalaman */}
      <div>
        <label htmlFor="pengalaman" className="mb-2 block text-sm font-semibold">
          Pengalaman (Tahun) <span style={{ color: "#FF6B35" }}>*</span>
        </label>
        <input
          id="pengalaman"
          name="pengalaman"
          type="number"
          min={0}
          max={50}
          inputMode="numeric"
          required
          placeholder="Isi 0 kalau fresh graduate"
          value={pengalaman}
          onChange={(e) => { setPengalaman(e.target.value); setError("pengalaman", ""); }}
          className={inputClasses}
            style={errors.pengalaman ? { ...inputStyle, borderColor: "#FF6B35" } : inputStyle}
        />
        {errors.pengalaman && <p className="mt-1.5 text-sm font-medium" style={{ color: "#FF6B35" }}>{errors.pengalaman.msg}</p>}
      </div>

      {/* Portofolio */}
      <div>
        <label htmlFor="porto" className="mb-2 block text-sm font-semibold">
          Link Portofolio <span style={{ color: "#FF6B35" }}>*</span>
        </label>
        <input
          id="porto"
          name="porto"
          type="url"
          required
          inputMode="url"
          placeholder="Google Drive / Behance / Instagram"
          value={porto}
          onChange={(e) => { setPorto(e.target.value); setError("porto", ""); }}
          className={inputClasses}
            style={errors.porto ? { ...inputStyle, borderColor: "#FF6B35" } : inputStyle}
        />
        {errors.porto && <p className="mt-1.5 text-sm font-medium" style={{ color: "#FF6B35" }}>{errors.porto.msg}</p>}
      </div>

      <button
        type="submit"
        className="w-full rounded-xl px-8 py-4 text-base font-bold text-white shadow-lg transition hover:brightness-110"
        style={{ backgroundColor: "#FF6B35", boxShadow: "0 10px 25px rgba(255,107,53,0.25)", fontFamily: "var(--font-body-karier), system-ui, sans-serif" }}
      >
        Kirim Lamaran
      </button>

      {formNote && <p className="text-center text-sm" style={{ color: "rgba(11,31,58,0.6)" }}>{formNote}</p>}

      <p className="text-center text-xs leading-relaxed" style={{ color: "rgba(11,31,58,0.45)" }}>
        Lamaran dikirim via WhatsApp ke +62 877-8088-1117.
      </p>
    </form>
  );
}
