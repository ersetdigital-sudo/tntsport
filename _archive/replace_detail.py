with open(r'D:\TNT SPORT DATA WEB\tntsport\components\admin\PesananDashboard.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

start_marker = '  return (\n    <div className="pas-sheet open">'
start = content.find(start_marker)

zoom_end_pattern = '          <p className="pointer-events-none absolute bottom-4'
zoom_end_idx = content.find(zoom_end_pattern, start)

close_pattern = '    </div>\n  );\n}'
close_idx = content.find(close_pattern, zoom_end_idx)

old_block = content[start:close_idx + len(close_pattern)]

new_block = """  return (
    <div className="pas-sheet open">
      <div className="pas-veil" onClick={onClose} />
      <div className="pas-panel p-0" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* ── TOPBAR ── */}
        <div className="sticky top-0 z-10 flex items-center gap-3 px-5 py-3.5 border-b border-[var(--pas-line)]" style={{ background: "rgba(245,235,225,.85)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}>
          <button className="w-9 h-9 rounded-[10px] border border-[var(--pas-line)] bg-[var(--pas-surface)] grid place-items-center text-[var(--pas-muted)] hover:text-[var(--pas-ink-1)] hover:border-[rgba(63,86,59,.22)] transition shrink-0" onClick={onClose} aria-label="Kembali">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
          </button>
          <div className="min-w-0 flex-1">
            <div className="pas-display text-[16px] leading-tight">Detail Pesanan</div>
            <div className="text-[12px] text-[var(--pas-muted)] pas-num mt-0.5">{order.id}</div>
          </div>
          <span className={`pas-pill ${st} text-[11px]`}>{FILTER_LABEL[st]}</span>
        </div>

        <div className="flex-1 overflow-y-auto px-5 pt-5 pb-28" style={{ scrollbarColor: "var(--pas-line) transparent" }}>
          {/* ── STATUS HERO ── */}
          <div className="rounded-2xl border border-[var(--pas-line)] bg-[var(--pas-surface)] shadow-[0_1px_3px_rgba(0,0,0,.04),0_4px_12px_rgba(0,0,0,.04)] p-6 flex flex-col items-center text-center gap-3">
            <div className="w-14 h-14 rounded-full bg-[rgba(63,86,59,.10)] grid place-items-center text-[var(--pas-accent)] text-[22px]">
              {order.is_done ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
              )}
            </div>
            <div className="pas-display text-[18px] leading-tight">{steps[step - 1]?.name || `Tahap ${step}`}</div>
            <p className="text-[13px] text-[var(--pas-muted)] max-w-[300px] leading-relaxed">
              {order.is_done ? "Pesanan sudah selesai dan diterima oleh customer." : `Pesanan sedang dalam tahap ${steps[step - 1]?.name || `tahap ${step}`}. Estimasi selesai ${formatDatePretty(order.deadline || "")}.`}
            </p>
          </div>

          {/* ── PROGRESS ── */}
          <p className="pas-stencil text-[9px] text-[var(--pas-muted)] mt-6 mb-2">Progress Produksi</p>
          <div className="rounded-2xl border border-[var(--pas-line)] bg-[var(--pas-surface)] shadow-[0_1px_3px_rgba(0,0,0,.04)] p-4">
            <div className="flex items-end justify-between mb-3">
              <div className="pas-display text-[28px] leading-none pas-num text-[var(--pas-accent)]">{pct}%</div>
              <div className="text-[13px] font-semibold text-[var(--pas-ink-2)]">Tahap {step} dari {steps.length}</div>
            </div>
            <div className="h-[6px] rounded-full bg-[rgba(63,86,59,.08)] overflow-hidden">
              <div className="h-full rounded-full bg-[var(--pas-accent)]" style={{ width: `${pct}%`, transition: "width .6s cubic-bezier(.22,1,.36,1)" }} />
            </div>
          </div>

          {/* ── TIMELINE STEPPER ── */}
          <p className="pas-stencil text-[9px] text-[var(--pas-muted)] mt-6 mb-2">Timeline Produksi</p>
          <div className="rounded-2xl border border-[var(--pas-line)] bg-[var(--pas-surface)] shadow-[0_1px_3px_rgba(0,0,0,.04)] overflow-hidden">
            <div className="px-4 py-3 border-b border-[var(--pas-line)] flex items-center justify-between">
              <span className="pas-stencil text-[9px] text-[var(--pas-muted)]">Urutan Tahapan</span>
              <span className="pas-stencil text-[9px] text-[var(--pas-muted)] opacity-50">klik untuk ubah</span>
            </div>
            <div className="px-4 py-2">
              {steps.map((s, i) => {
                const isDone = i + 1 < step;
                const isCur = i + 1 === step;
                return (
                  <div key={i} className="flex items-start gap-3.5 relative" style={{ padding: "5px 0" }}>
                    {i < steps.length - 1 && (
                      <div className="absolute left-[10px] top-[25px] bottom-[-5px] w-[2px] rounded-full" style={{ background: isDone ? "var(--pas-accent)" : "var(--pas-line)" }} />
                    )}
                    <button
                      className="flex items-start gap-3.5 w-full text-left bg-transparent border-0 p-0 cursor-pointer"
                      onClick={() => setStep(i + 1)}
                    >
                      <span
                        className="w-[22px] h-[22px] rounded-full grid place-items-center text-[9px] font-bold shrink-0 mt-[1px] transition-all duration-200"
                        style={{
                          background: isDone ? "var(--pas-accent)" : isCur ? "var(--pas-surface)" : "var(--pas-surface)",
                          border: isDone ? "2px solid var(--pas-accent)" : isCur ? "2px solid var(--pas-accent)" : "2px solid var(--pas-line)",
                          color: isDone ? "#fff" : isCur ? "var(--pas-accent)" : "var(--pas-muted)",
                          boxShadow: isDone ? "none" : isCur ? "0 0 0 4px rgba(63,86,59,.10)" : "none",
                        }}
                      >
                        {isDone ? "" : i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className={`text-[13.5px] leading-snug ${isCur ? "font-bold text-[var(--pas-ink-1)]" : isDone ? "font-medium text-[var(--pas-ink-2)]" : "text-[var(--pas-muted)]"}`}>
                          {i + 1}. {s.name}
                        </div>
                        {isDone && <div className="text-[11px] text-[var(--pas-muted)] opacity-70 mt-0.5">Selesai</div>}
                        {isCur && <div className="text-[11px] text-[var(--pas-muted)] opacity-70 mt-0.5">Sedang dikerjakan</div>}
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── INFO PESANAN ── */}
          <p className="pas-stencil text-[9px] text-[var(--pas-muted)] mt-6 mb-2">Informasi Pesanan</p>
          <div className="rounded-2xl border border-[var(--pas-line)] bg-[var(--pas-surface)] shadow-[0_1px_3px_rgba(0,0,0,.04)] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[var(--pas-line)]" style={{ background: "rgba(63,86,59,.03)" }}>
              <span className="pas-stencil text-[9px] text-[var(--pas-muted)]">Data Order</span>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-3 border-b border-r border-[var(--pas-line)]">
                <span className="pas-stencil text-[9px] text-[var(--pas-muted)]">Tanggal Order</span>
                <p className="mt-1 text-[14px] font-semibold">{formatDatePretty(order.created_at)}</p>
              </div>
              <div className="px-4 py-3 border-b border-[var(--pas-line)]">
                <span className="pas-stencil text-[9px] text-[var(--pas-muted)]">Deadline</span>
                <p className="mt-1 text-[14px] font-semibold text-[var(--pas-orange)]">{formatDatePretty(order.deadline || "")}</p>
              </div>
              <div className="px-4 py-3 border-b border-r border-[var(--pas-line)]">
                <span className="pas-stencil text-[9px] text-[var(--pas-muted)]">Status Produksi</span>
                <p className="mt-1 text-[14px] font-semibold">{steps[step - 1]?.name || `Tahap ${step}`}</p>
              </div>
              <div className="px-4 py-3 border-b border-[var(--pas-line)]">
                <span className="pas-stencil text-[9px] text-[var(--pas-muted)]">Progress</span>
                <p className="mt-1 text-[14px] font-semibold">{pct}%</p>
              </div>
              {(order.products?.length ?? 0) > 0 ? (
                <div className="col-span-2 px-4 py-3 border-b border-[var(--pas-line)]">
                  <span className="pas-stencil text-[9px] text-[var(--pas-muted)]">Produk</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {order.products!.map((p, pi) => (
                      <span key={pi} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[12.5px] font-semibold bg-[rgba(63,86,59,.06)] border border-[rgba(63,86,59,.12)] text-[var(--pas-ink-1)]">
                        {p.name} <span className="text-[var(--pas-muted)] font-normal">- {p.sizes.reduce((a, s) => a + (s.qty || 0), 0)} pcs</span>
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="col-span-2 px-4 py-3 border-b border-[var(--pas-line)]">
                  <span className="pas-stencil text-[9px] text-[var(--pas-muted)]">Produk</span>
                  <p className="mt-1 text-[14px] font-semibold">{order.product_name}</p>
                </div>
              )}
              <div className="px-4 py-3 border-b border-r border-[var(--pas-line)]">
                <span className="pas-stencil text-[9px] text-[var(--pas-muted)]">Jumlah</span>
                <p className="mt-1 text-[14px] font-semibold">{order.quantity} pcs</p>
              </div>
              {step === 11 && (courier || resi) ? (
                <div className="px-4 py-3 border-b border-[var(--pas-line)]">
                  <span className="pas-stencil text-[9px] text-[var(--pas-muted)]">Ekspedisi / Resi</span>
                  <p className="mt-1 text-[13px] font-semibold pas-num">{courier || "-"} / {resi || "-"}</p>
                </div>
              ) : (
                <div className="px-4 py-3 border-b border-[var(--pas-line)]">
                  <span className="pas-stencil text-[9px] text-[var(--pas-muted)]">Ekspedisi / Resi</span>
                  <p className="mt-1 text-[13px] text-[var(--pas-muted)]">-</p>
                </div>
              )}
            </div>
          </div>

          {/* ── MEDIA ── */}
          <p className="pas-stencil text-[9px] text-[var(--pas-muted)] mt-6 mb-2">Media</p>
          <div className="rounded-2xl border border-[var(--pas-line)] bg-[var(--pas-surface)] shadow-[0_1px_3px_rgba(0,0,0,.04)] overflow-hidden">
            <div className="px-4 py-2.5 border-b border-[var(--pas-line)]" style={{ background: "rgba(63,86,59,.03)" }}>
              <span className="pas-stencil text-[9px] text-[var(--pas-muted)]">File & Foto</span>
            </div>
            <div className="grid grid-cols-2 gap-4 p-4">
              <div>
                <span className="pas-stencil text-[9px] text-[var(--pas-muted)] block mb-2">Preview Design</span>
                <div className="flex flex-wrap gap-2">
                  {(order.design_photos?.length ?? 0) > 0 ? order.design_photos!.map((url, i) => (
                    <button key={i} type="button" onClick={() => setZoomUrl(url)} className="group relative w-[72px] h-[72px] rounded-xl overflow-hidden border border-[var(--pas-line)] hover:border-[var(--pas-accent)] transition" title="Klik untuk memperbesar" aria-label={`Perbesar design ${i + 1}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt={`Design ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <span className="pointer-events-none absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-black/55 text-white border border-white/15 opacity-90">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5M11 8v6M8 11h6" /></svg>
                      </span>
                    </button>
                  )) : <span className="text-[12px] text-[var(--pas-muted)]">Belum ada preview</span>}
                </div>
                <p className="text-[10px] text-[var(--pas-muted)] mt-1.5 opacity-60">Read-only - klik untuk zoom</p>
              </div>
              <div>
                <span className="pas-stencil text-[9px] text-[var(--pas-muted)] block mb-2">WO</span>
                <div className="flex flex-wrap gap-2">
                  {woPhotos.map((url, i) => (
                    <div key={i} className="relative w-[72px] h-[72px] rounded-xl overflow-hidden border border-[var(--pas-line)]">
                      <button type="button" onClick={() => setZoomUrl(url)} className="w-full h-full" title="Klik untuk memperbesar" aria-label={`Perbesar WO ${i + 1}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={url} alt={`WO ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                        <span className="pointer-events-none absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-black/55 text-white border border-white/15 opacity-90">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5M11 8v6M8 11h6" /></svg>
                        </span>
                      </button>
                    </div>
                  ))}
                  <label className="w-[72px] h-[72px] grid place-items-center rounded-xl border-[1.5px] border-dashed border-[var(--pas-line)] hover:border-[var(--pas-accent)] cursor-pointer transition text-[var(--pas-muted)] hover:text-[var(--pas-accent)] hover:bg-[rgba(63,86,59,.04)]">
                    <input type="file" accept="image/*" className="hidden" disabled={uploadingWo} onChange={(e) => { const f = e.target.files?.[0]; if (f) handleWoUpload(f); e.currentTarget.value = ""; }} />
                    <span className="text-[20px] leading-none">{uploadingWo ? "..." : "+"}</span>
                  </label>
                </div>
                <p className="text-[10px] text-[var(--pas-muted)] mt-1.5 opacity-60">Bisa tambah - tidak bisa hapus</p>
              </div>
            </div>
          </div>

          {/* ── CATATAN ── */}
          <p className="pas-stencil text-[9px] text-[var(--pas-muted)] mt-6 mb-2">Catatan untuk Customer</p>
          <div className="rounded-2xl border border-[var(--pas-line)] bg-[var(--pas-surface)] shadow-[0_1px_3px_rgba(0,0,0,.04)] overflow-hidden">
            <textarea
              rows={3}
              className="w-full border-0 px-4 py-3 text-[14px] text-[var(--pas-ink-1)] bg-transparent resize-none focus:outline-none"
              style={{ fontFamily: "inherit" }}
              placeholder="Tulis catatan untuk customer..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          {/* ── DATA PENGIRIMAN ── */}
          <div className="rounded-2xl border border-[var(--pas-line)] bg-[var(--pas-surface)] shadow-[0_1px_3px_rgba(0,0,0,.04)] p-4 mt-6">
            <p className="pas-stencil text-[9px] text-[var(--pas-muted)]">Data Pengiriman</p>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <input
                className="pas-field px-3 py-2.5 text-[14px]"
                placeholder="Ekspedisi (JNE - REG)"
                value={courier}
                onChange={(e) => setCourier(e.target.value)}
              />
              <input
                className="pas-field px-3 py-2.5 text-[14px]"
                placeholder="No. Resi"
                value={resi}
                onChange={(e) => setResi(e.target.value)}
              />
            </div>
            {step < 9 && (
              <p className="text-[11px] text-[var(--pas-muted)] mt-2 opacity-70">
                Tampil ke customer setelah tahap 9 (Kirim).
              </p>
            )}
          </div>

          {/* ── TANGGAL DEADLINE ── */}
          <div className="rounded-2xl border border-[var(--pas-line)] bg-[var(--pas-surface)] shadow-[0_1px_3px_rgba(0,0,0,.04)] p-4 mt-4">
            <p className="pas-stencil text-[9px] text-[var(--pas-muted)]">Tanggal Deadline</p>
            <p className="mt-1.5 text-[14px] font-semibold">{formatDatePretty(order.deadline || "")}</p>
          </div>

          {kirimError && (
            <p className="text-[13px] text-red-600 mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
              {kirimError}
            </p>
          )}
        </div>

        {/* ── FOOTER ── */}
        <div className="sticky bottom-0 flex gap-2.5 px-5 py-4 border-t border-[var(--pas-line)]" style={{ background: "linear-gradient(180deg,rgba(245,235,225,0),var(--pas-bg) 30%)" }}>
          <button
            className="flex-1 py-3.5 rounded-[10px] text-[12px] font-bold text-white border-0 cursor-pointer transition-all"
            style={{ fontFamily: "var(--font-display), system-ui, sans-serif", letterSpacing: ".04em", textTransform: "uppercase", background: "var(--pas-accent)", boxShadow: "0 2px 8px rgba(63,86,59,.18)" }}
            onClick={save}
            disabled={saving}
          >
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
          <button
            className="px-5 py-3.5 rounded-[10px] text-[12px] font-bold border border-[var(--pas-line)] bg-[var(--pas-surface)] text-[var(--pas-ink-1)] cursor-pointer transition-all"
            style={{ fontFamily: "var(--font-display), system-ui, sans-serif", letterSpacing: ".04em", textTransform: "uppercase" }}
            onClick={markDone}
            disabled={saving}
          >
            Tandai Selesai
          </button>
        </div>
      </div>"""

# Replace
new_content = content[:start] + new_block + content[close_idx + len(close_pattern):]

with open(r'D:\TNT SPORT DATA WEB\tntsport\components\admin\PesananDashboard.tsx', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("DONE - replaced DetailSheet return block")
print(f"Old length: {len(old_block)}, New length: {len(new_block)}")
