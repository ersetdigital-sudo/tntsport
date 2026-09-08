"use client";

import { useState, useTransition } from "react";
import { Send, Save, KeyRound, AlertTriangle } from "lucide-react";

interface FonnteSettingsProps {
  initialHasToken: boolean;
  initialTokenLast4: string | null;
}

interface StatusMessage {
  type: "ok" | "error";
  text: string;
}

/**
 * FonnteSettings — kelola token Fonnte (notifikasi WhatsApp).
 * Token penuh tidak pernah dirender/dikirim ke client: hanya 4 karakter
 * terakhir yang ditampilkan, dan input selalu masked.
 */
export function FonnteSettings({
  initialHasToken,
  initialTokenLast4,
}: FonnteSettingsProps) {
  const [token, setToken] = useState("");
  const [target, setTarget] = useState("");
  const [hasToken, setHasToken] = useState(initialHasToken);
  const [tokenLast4, setTokenLast4] = useState(initialTokenLast4);
  const [message, setMessage] = useState<StatusMessage | null>(null);
  const [saving, startSaving] = useTransition();
  const [testing, startTesting] = useTransition();

  function saveToken() {
    setMessage(null);
    const value = token.trim();
    if (!value) {
      setMessage({ type: "error", text: "Token tidak boleh kosong." });
      return;
    }

    startSaving(async () => {
      try {
        const res = await fetch("/api/admin/settings/fonnte", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: value }),
        });
        const data = await res.json();

        if (!res.ok) {
          setMessage({ type: "error", text: data.error || "Gagal menyimpan token." });
          return;
        }

        setToken("");
        setHasToken(true);
        setTokenLast4(data.tokenLast4);
        setMessage({
          type: "ok",
          text: "Token Fonnte berhasil disimpan (terenkripsi).",
        });
      } catch {
        setMessage({ type: "error", text: "Terjadi kesalahan saat menyimpan." });
      }
    });
  }

  function sendTest() {
    setMessage(null);
    if (!target.trim()) {
      setMessage({
        type: "error",
        text: "Isi nomor HP tujuan untuk pesan uji terlebih dahulu.",
      });
      return;
    }

    startTesting(async () => {
      try {
        const res = await fetch("/api/admin/settings/fonnte/test", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ target: target.trim() }),
        });
        const data = await res.json();

        if (!res.ok) {
          setMessage({ type: "error", text: data.error || "Gagal mengirim pesan uji." });
          return;
        }

        setMessage({
          type: "ok",
          text: "Pesan uji terkirim. Cek WhatsApp Anda untuk memastikan token aktif.",
        });
      } catch {
        setMessage({ type: "error", text: "Terjadi kesalahan saat mengirim pesan uji." });
      }
    });
  }

  const inputClass =
    "bg-white text-ink rounded-lg px-md py-[10px] border border-hairline-strong text-body-sm placeholder:text-stone focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary focus-visible:outline-offset-1 dark:bg-surface-dark dark:text-on-dark dark:border-hairline dark:placeholder:text-on-dark-mute w-full";
  const labelClass = "text-caption font-semibold text-ink dark:text-on-dark-mute uppercase tracking-wider";

  return (
    <div className="flex flex-col gap-lg">
      {/* Token Fonnte */}
      <div className="bg-surface-card rounded-2xl p-xl border border-hairline shadow-premium-sm dark:border-white/10 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <KeyRound className="w-5 h-5 text-secondary" />
          <div>
            <h3 className="text-body-md font-bold text-ink dark:text-on-dark">
              Token Fonnte
            </h3>
            <p className="text-caption text-stone">
              Dipakai server untuk mengirim notifikasi WhatsApp saat tahap
              produksi berubah. Token disimpan terenkripsi (AES-256-GCM).
            </p>
          </div>
          {hasToken ? (
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-[10px] font-bold text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Tersimpan
            </span>
          ) : (
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-stone/15 px-2.5 py-1 text-[10px] font-bold text-stone">
              Belum di-set
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Token Baru</label>
          <div className="flex flex-col sm:flex-row gap-md">
            <input
              type="password"
              autoComplete="off"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder={
                hasToken && tokenLast4
                  ? `••••••••••••${tokenLast4} (isi untuk mengganti)`
                  : "Masukkan token dari dashboard Fonnte"
              }
              className={inputClass}
            />
            <button
              type="button"
              onClick={saveToken}
              disabled={saving}
              className="text-button-md inline-flex h-10 items-center justify-center gap-sm rounded-full bg-primary px-lg text-on-primary hover:bg-secondary transition-colors duration-normal disabled:opacity-40 shrink-0"
            >
              <Save className="w-4 h-4" />
              {saving ? "Menyimpan..." : "Simpan Token"}
            </button>
          </div>
          <small className="text-caption text-charcoal dark:text-mute">
            {hasToken
              ? "Token aktif berakhir dengan " + tokenLast4 + ". Token tidak pernah ditampilkan penuh."
              : "Dapatkan token di dashboard Fonnte (https://fonnte.com)."}
          </small>
        </div>
      </div>

      {/* Test Kirim */}
      <div className="bg-surface-card rounded-2xl p-xl border border-hairline shadow-premium-sm dark:border-white/10 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <Send className="w-5 h-5 text-secondary" />
          <div>
            <h3 className="text-body-md font-bold text-ink dark:text-on-dark">
              Uji Koneksi
            </h3>
            <p className="text-caption text-stone">
              Kirim pesan uji ke nomor WhatsApp Anda sendiri untuk memastikan
              token aktif dan dapat mengirim.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass}>Nomor HP Tujuan (admin)</label>
          <div className="flex flex-col sm:flex-row gap-md">
            <input
              type="tel"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              placeholder="08123456789 atau 628123456789"
              className={inputClass}
            />
            <button
              type="button"
              onClick={sendTest}
              disabled={testing}
              className="text-button-md inline-flex h-10 items-center justify-center gap-sm rounded-full border border-hairline-strong bg-white px-lg text-charcoal hover:bg-surface transition-colors duration-normal disabled:opacity-40 shrink-0 dark:bg-surface-dark dark:text-on-dark dark:border-hairline"
            >
              <Send className="w-4 h-4" />
              {testing ? "Mengirim..." : "Test Kirim"}
            </button>
          </div>
        </div>
      </div>

      {message && (
        <p
          role="status"
          className={`text-caption rounded-lg border px-md py-sm ${
            message.type === "ok"
              ? "text-success border-success/30 bg-success/5"
              : "text-danger border-danger/30 bg-danger/5"
          }`}
        >
          {message.text}
        </p>
      )}

      {!hasToken && (
        <div className="flex items-start gap-2 rounded-xl border border-warning/30 bg-warning/5 px-md py-sm text-caption text-charcoal dark:text-on-dark-mute">
          <AlertTriangle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
          <p>
            Notifikasi baru aktif setelah token disimpan. Pastikan environment
            variable <code className="font-mono">SETTINGS_ENCRYPTION_KEY</code>{" "}
            terisi di server, jika tidak penyimpanan token akan ditolak.
          </p>
        </div>
      )}
    </div>
  );
}