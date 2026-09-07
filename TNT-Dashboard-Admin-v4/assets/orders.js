/* ===== DATA DUMMY PESANAN (mockup, tanpa backend) =====
   Kombinasi yang valid untuk demo:
   1. TNT-260906-001  + 081234567890
   2. TNT-260905-014  + 081298765432
   3. TNT-260828-007  + 085711223344
*/
window.TNT_ORDERS = {
  "TNT-260906-001": {
    phone: "081234567890",
    customer: "Rangga Pratama",
    city: "Bandung",
    product: "Jersey Full Print",
    qty: "18 pcs",
    sizes: "S·M·L·XL",
    material: "Dryfit Milano",
    roster: [["RANGGA","10"],["DIMAS","07"],["ARYA","23"],["BAGAS","09"],["FAJAR","11"]],
    rosterMore: 13,
    history: [
      ["Order Diterima","2 Sep 2026 · 09.15"],
      ["Desain Dikonfirmasi","2 Sep 2026 · 16.02"],
      ["Produksi Bahan","3 Sep 2026 · 11.30"],
      ["Printing / Sublimasi","4 Sep 2026 · 08.45"],
      ["Cutting","5 Sep 2026 · 10.10"],
      ["Jahit","6 Sep 2026 · 09.05"]
    ],
    step: 7,
    note: "Sampel pertama lolos pengecekan jahitan dan warna. Tim QC sedang memeriksa sisa 12 pcs sebelum masuk finishing.",
    noteTime: "Kamis, 6 September 2026 · 14.20 WIB",
    shipping: null
  },
  "TNT-260905-014": {
    phone: "081298765432",
    customer: "Sarah Nabila",
    city: "Surabaya",
    product: "Jersey Voli + Celana",
    qty: "12 set",
    sizes: "S·M·L",
    material: "Dryfit Serena",
    roster: [["SARAH","01"],["PUTRI","04"],["MELA","08"],["NINDY","12"],["TASYA","15"]],
    rosterMore: 7,
    history: [
      ["Order Diterima","4 Sep 2026 · 13.40"],
      ["Desain Dikonfirmasi","5 Sep 2026 · 09.25"]
    ],
    step: 3,
    note: "Bahan Dryfit Serena warna hitam–magenta sudah masuk gudang, antre masuk mesin printing besok pagi.",
    noteTime: "Sabtu, 5 September 2026 · 16.40 WIB",
    shipping: null
  },
  "TNT-260828-007": {
    phone: "085711223344",
    customer: "Ilham Maulana",
    city: "Semarang",
    product: "Jersey Futsal Full Print",
    qty: "24 pcs",
    sizes: "M·L·XL·XXL",
    material: "Dryfit Waffle",
    roster: [["ILHAM","03"],["RIZKY","05"],["ANDRE","17"],["YOGA","21"],["BIMA","30"]],
    rosterMore: 19,
    history: [
      ["Order Diterima","28 Agu 2026 · 10.00"],
      ["Desain Dikonfirmasi","29 Agu 2026 · 14.15"],
      ["Produksi Bahan","30 Agu 2026 · 09.30"],
      ["Printing / Sublimasi","1 Sep 2026 · 08.20"],
      ["Cutting","2 Sep 2026 · 11.00"],
      ["Jahit","3 Sep 2026 · 15.45"],
      ["Quality Control","4 Sep 2026 · 16.30"],
      ["Finishing","5 Sep 2026 · 13.10"],
      ["Packing","6 Sep 2026 · 17.00"]
    ],
    step: 10,
    note: "Semua 24 pcs selesai dipacking dan sudah diserahkan ke JNE. Estimasi tiba 2–3 hari kerja.",
    noteTime: "Senin, 7 September 2026 · 10.05 WIB",
    shipping: { courier: "JNE — REG", resi: "JNE0098213771" }
  }
};

// normalisasi input HP: 0812…, +62812…, 62812… dianggap sama
window.tntNormPhone = function (v) {
  var d = String(v || "").replace(/\D/g, "");
  if (d.indexOf("62") === 0) d = "0" + d.slice(2);
  return d;
};

/* pesanan tambahan supaya tabel admin terasa nyata */
Object.assign(window.TNT_ORDERS, {
  "TNT-260907-002": {
    phone:"081377889900", customer:"Bayu Nugroho", city:"Jakarta Selatan",
    product:"Jersey Basket Reversible", qty:"15 pcs", sizes:"M·L·XL", material:"Dryfit Hexa",
    roster:[["BAYU","06"],["REZA","14"],["ADIT","22"]], rosterMore:12,
    history:[["Order Diterima","7 Sep 2026 · 08.30"]],
    step:1, note:"Pesanan baru masuk, menunggu konfirmasi desain dari customer.",
    noteTime:"Senin, 7 September 2026 · 08.35 WIB", shipping:null
  },
  "TNT-260903-009": {
    phone:"082144556677", customer:"Komunitas Lari Pagi", city:"Yogyakarta",
    product:"Singlet Running", qty:"30 pcs", sizes:"S·M·L·XL", material:"Micro Dry",
    roster:[["ARIF","01"],["NANDA","02"],["LULU","03"]], rosterMore:27,
    history:[["Order Diterima","3 Sep 2026 · 10.20"],["Desain Dikonfirmasi","3 Sep 2026 · 17.40"],["Produksi Bahan","4 Sep 2026 · 09.10"],["Printing / Sublimasi","5 Sep 2026 · 10.30"],["Cutting","6 Sep 2026 · 08.50"]],
    step:6, note:"Masuk antrean jahit, target selesai Rabu.",
    noteTime:"Minggu, 6 September 2026 · 15.00 WIB", shipping:null
  },
  "TNT-260825-003": {
    phone:"081566778899", customer:"SMA Garuda 3", city:"Bekasi",
    product:"Jersey Futsal + Kaos Kaki", qty:"22 set", sizes:"M·L·XL", material:"Dryfit Milano",
    roster:[["FAHMI","09"],["RIO","11"],["DAVA","13"]], rosterMore:19,
    history:[["Order Diterima","25 Agu 2026 · 09.00"],["Desain Dikonfirmasi","25 Agu 2026 · 15.20"],["Produksi Bahan","26 Agu 2026 · 10.00"],["Printing / Sublimasi","27 Agu 2026 · 09.30"],["Cutting","28 Agu 2026 · 10.40"],["Jahit","29 Agu 2026 · 14.00"],["Quality Control","30 Agu 2026 · 11.15"],["Finishing","31 Agu 2026 · 13.30"],["Packing","1 Sep 2026 · 16.00"],["Siap Dikirim","2 Sep 2026 · 09.00"]],
    step:10, note:"Sudah diterima customer, paket closed.",
    noteTime:"Rabu, 2 September 2026 · 09.00 WIB",
    shipping:{ courier:"J&T — REG", resi:"JT8871209934" }, done:true
  }
});
