/* ===== Dashboard admin TNT — mockup, state di memori browser ===== */
var STEPS = ["Order Diterima","Desain Dikonfirmasi","Produksi Bahan","Printing / Sublimasi","Cutting",
             "Jahit","Quality Control","Finishing","Packing","Siap Dikirim"];

var DB = window.TNT_ORDERS;
var filter = "all", query = "";
var openId = null;

function statusOf(o){
  if (o.done) return "selesai";
  if (o.step >= 10) return "kirim";
  if (o.step <= 1) return "baru";
  return "produksi";
}
var LABEL = { baru:"Baru", produksi:"Produksi", kirim:"Siap Dikirim", selesai:"Selesai" };

function list(){
  return Object.keys(DB).map(function(id){ var o = DB[id]; return {id:id,o:o,st:statusOf(o)}; })
    .filter(function(r){
      if (filter !== "all" && r.st !== filter) return false;
      if (!query) return true;
      var s = (r.id + " " + r.o.customer + " " + r.o.city + " " + r.o.product).toLowerCase();
      return s.indexOf(query) > -1;
    })
    .sort(function(a,b){ return a.id < b.id ? 1 : -1; });
}

function render(){
  var all = Object.keys(DB).map(function(id){ return statusOf(DB[id]); });
  document.getElementById("stTotal").textContent = all.length;
  document.getElementById("stProd").textContent  = all.filter(function(s){return s==="produksi"||s==="baru";}).length;
  document.getElementById("stKirim").textContent = all.filter(function(s){return s==="kirim";}).length;
  document.getElementById("stDone").textContent  = all.filter(function(s){return s==="selesai";}).length;

  var rs = list();
  var tb = document.getElementById("rows"), cd = document.getElementById("cards");
  tb.innerHTML = ""; cd.innerHTML = "";
  document.getElementById("emptyD").classList.toggle("hidden", rs.length > 0);

  rs.forEach(function(r){
    var pct = Math.round(r.o.step / 10 * 100);
    var ini = r.o.customer.split(" ").slice(0,2).map(function(w){return w[0];}).join("").toUpperCase();
    var tr = document.createElement("tr");
    tr.innerHTML =
      '<td><span class="font-semibold num">'+r.id+'</span><br><span class="text-[12.5px] text-[var(--muted)]">'+r.o.qty+'</span></td>'+
      '<td><div class="flex items-center gap-2.5"><span class="avatar">'+ini+'</span><span>'+r.o.customer+
        '<br><span class="text-[12.5px] text-[var(--muted)]">'+r.o.city+'</span></span></div></td>'+
      '<td class="text-[var(--muted)]">'+r.o.product+'</td>'+
      '<td><div class="flex items-center gap-3"><span class="mini"><i style="width:'+pct+'%"></i></span>'+
        '<span class="text-[12.5px] text-[var(--muted)] num whitespace-nowrap">'+r.o.step+'/10</span></div>'+
        '<span class="text-[12.5px] text-[var(--muted)]">'+STEPS[r.o.step-1]+'</span></td>'+
      '<td><span class="pill '+r.st+'">'+LABEL[r.st]+'</span></td>';
    tr.onclick = function(){ openDetail(r.id); };
    tb.appendChild(tr);

    var c = document.createElement("button");
    c.className = "card p-4 text-left";
    c.innerHTML =
      '<div class="flex items-start justify-between gap-3"><div>'+
      '<p class="font-semibold text-[15px] num">'+r.id+'</p>'+
      '<p class="text-[13px] text-[var(--muted)] mt-0.5">'+r.o.customer+' · '+r.o.city+'</p></div>'+
      '<span class="pill '+r.st+'">'+LABEL[r.st]+'</span></div>'+
      '<p class="text-[13px] text-[var(--muted)] mt-3">'+r.o.product+' · '+r.o.qty+'</p>'+
      '<div class="flex items-center gap-3 mt-3"><span class="mini" style="flex:1;width:auto"><i style="width:'+pct+'%"></i></span>'+
      '<span class="text-[12px] text-[var(--muted)]">'+r.o.step+'/10</span></div>';
    c.onclick = function(){ openDetail(r.id); };
    cd.appendChild(c);
  });
}

/* ---------- detail sheet ---------- */
function openDetail(id){
  openId = id;
  var o = DB[id], st = statusOf(o), pct = Math.round(o.step/10*100);
  var steps = STEPS.map(function(s,i){
    var cls = i+1 < o.step ? "done" : (i+1 === o.step ? "cur" : "");
    return '<button class="stepbtn '+cls+'" data-step="'+(i+1)+'"><span class="num">'+(i+1)+'</span>'+s+'</button>';
  }).join("");

  var shipBlock =
    '<div class="card p-4 mt-4">'+
      '<p class="stencil text-[9px] text-[var(--muted)]">Data Pengiriman</p>'+
      '<div class="grid grid-cols-2 gap-3 mt-3">'+
        '<input id="fCourier" class="field px-3 py-2.5 text-[14px]" placeholder="Ekspedisi (JNE — REG)" value="'+(o.shipping?o.shipping.courier:"")+'">'+
        '<input id="fResi" class="field px-3 py-2.5 text-[14px]" placeholder="No. Resi" value="'+(o.shipping?o.shipping.resi:"")+'">'+
      '</div>'+
      (o.step < 10 ? '<p class="text-[12px] text-[var(--muted)] mt-2">Tampil ke customer setelah tahap 10 (Siap Dikirim).</p>' : '')+
    '</div>';

  document.getElementById("panel").innerHTML =
    '<div class="flex items-start justify-between gap-4">'+
      '<div><p class="stencil text-[9px] text-[var(--accent)]">'+LABEL[st]+'</p>'+
      '<h2 class="display text-[24px] mt-2">'+id+'</h2>'+
      '<p class="text-[14px] text-[var(--muted)] mt-1">'+o.customer+' · '+o.city+' · '+o.phone+'</p></div>'+
      '<button class="btn-ghost px-3 py-2 text-sm text-[var(--muted)]" data-close>Tutup</button>'+
    '</div>'+
    '<div class="card p-4 mt-5 grid grid-cols-2 gap-y-3 text-[14px]">'+
      '<div><p class="stencil text-[9px] text-[var(--muted)]">Produk</p><p class="mt-1">'+o.product+'</p></div>'+
      '<div><p class="stencil text-[9px] text-[var(--muted)]">Jumlah</p><p class="mt-1">'+o.qty+'</p></div>'+
      '<div><p class="stencil text-[9px] text-[var(--muted)]">Ukuran</p><p class="mt-1">'+(o.sizes||"-")+'</p></div>'+
      '<div><p class="stencil text-[9px] text-[var(--muted)]">Bahan</p><p class="mt-1">'+(o.material||"-")+'</p></div>'+
    '</div>'+
    '<div class="flex items-center gap-3 mt-5"><span class="bar" style="flex:1"><i id="pBar" style="width:'+pct+'%"></i></span>'+
      '<span class="display text-[14px]">'+pct+'%</span></div>'+
    '<p class="stencil text-[9px] text-[var(--muted)] mt-6">Update Tahap Produksi</p>'+
    '<div class="mt-2 flex flex-col gap-1" id="stepList">'+steps+'</div>'+
    '<p class="stencil text-[9px] text-[var(--muted)] mt-6">Catatan untuk Customer</p>'+
    '<textarea id="fNote" rows="3" class="field w-full px-4 py-3 mt-2 text-[14px]">'+(o.note||"")+'</textarea>'+
    shipBlock+
    '<div class="flex gap-3 mt-5 pb-2">'+
      '<button class="btn-accent flex-1 py-3.5 text-[12px]" id="save">Simpan Perubahan</button>'+
      '<button class="btn-ghost px-4 text-sm text-[var(--muted)]" id="markDone">Tandai Selesai</button>'+
    '</div>';

  document.getElementById("sheet").classList.add("open");
  document.body.style.overflow = "hidden";

  document.getElementById("stepList").addEventListener("click", function(e){
    var b = e.target.closest(".stepbtn"); if (!b) return;
    DB[openId].step = parseInt(b.dataset.step,10);
    DB[openId].done = false;
    openDetail(openId); render();
  });
  document.getElementById("save").onclick = function(){
    var d = DB[openId];
    d.note = document.getElementById("fNote").value;
    var c = document.getElementById("fCourier").value.trim(), r = document.getElementById("fResi").value.trim();
    d.shipping = (c || r) ? { courier:c, resi:r } : null;
    render(); toast("Perubahan tersimpan"); close();
  };
  document.getElementById("markDone").onclick = function(){
    DB[openId].step = 10; DB[openId].done = true;
    render(); toast("Pesanan ditandai selesai"); close();
  };
}

function close(){
  document.getElementById("sheet").classList.remove("open");
  document.getElementById("addSheet").classList.remove("open");
  document.body.style.overflow = "";
}
document.addEventListener("click", function(e){ if (e.target.closest("[data-close]")) close(); });
document.addEventListener("keydown", function(e){ if (e.key === "Escape") close(); });

/* ---------- toolbar ---------- */
document.getElementById("q").addEventListener("input", function(e){ query = e.target.value.toLowerCase().trim(); render(); });
document.querySelectorAll(".chip").forEach(function(c){
  c.onclick = function(){
    document.querySelectorAll(".chip").forEach(function(x){ x.classList.remove("on"); });
    c.classList.add("on"); filter = c.dataset.f; render();
  };
});

/* ---------- tambah pesanan ---------- */
document.getElementById("btnAdd").onclick = function(){
  document.getElementById("addSheet").classList.add("open");
  document.body.style.overflow = "hidden";
};
document.getElementById("addForm").onsubmit = function(e){
  e.preventDefault();
  var f = e.target, err = document.getElementById("addErr");
  var id = f.id.value.trim().toUpperCase();
  if (DB[id]) { err.textContent = "Nomor pesanan ini sudah ada."; err.classList.remove("hidden"); return; }
  err.classList.add("hidden");
  DB[id] = {
    phone: f.phone.value.trim(), customer: f.customer.value.trim(), city: f.city.value.trim(),
    product: f.product.value.trim(), qty: f.qty.value.trim() || "-", sizes: "-",
    material: f.material.value.trim() || "-", roster: [], rosterMore: 0,
    history: [["Order Diterima","hari ini"]], step: 1,
    note: "Pesanan baru masuk, menunggu konfirmasi desain.", noteTime: "baru saja", shipping: null
  };
  f.reset(); close(); render(); toast("Pesanan ditambahkan");
};

/* ---------- toast ---------- */
var tt;
function toast(msg){
  var t = document.getElementById("toast");
  t.textContent = msg; t.classList.add("on");
  clearTimeout(tt); tt = setTimeout(function(){ t.classList.remove("on"); }, 2200);
}

render();

/* ================= VIEWS LAIN ================= */
var VIEW_META = {
  pesanan:{crumb:"Operasional",title:"Pesanan"},
  jadwal:{crumb:"Operasional",title:"Jadwal Produksi"},
  kirim:{crumb:"Operasional",title:"Pengiriman"},
  customer:{crumb:"Data",title:"Customer"},
  laporan:{crumb:"Data",title:"Laporan"},
  setting:{crumb:"Data",title:"Pengaturan"}
};
var LANES = [
  {name:"Antre & Desain", from:1, to:2},
  {name:"Produksi", from:3, to:6},
  {name:"QC & Finishing", from:7, to:9},
  {name:"Siap Dikirim", from:10, to:10}
];

function rowsOf(){ return Object.keys(DB).map(function(id){ return {id:id,o:DB[id],st:statusOf(DB[id])}; }); }
function initials(n){ return n.split(" ").slice(0,2).map(function(w){return w[0];}).join("").toUpperCase(); }
function esc(v){ return String(v==null?"":v); }

function viewJadwal(){
  var all = rowsOf().filter(function(r){ return !r.o.done; });
  var cols = LANES.map(function(l){
    var items = all.filter(function(r){ return r.o.step >= l.from && r.o.step <= l.to; });
    var body = items.length ? items.map(function(r){
      var pct = Math.round(r.o.step/10*100);
      return '<button class="card p-3.5 w-full text-left" data-open="'+r.id+'">'+
        '<div class="flex items-center justify-between gap-2"><span class="font-semibold text-[13.5px] num">'+r.id+'</span>'+
        '<span class="text-[11.5px] text-[var(--muted)] num">'+r.o.step+'/10</span></div>'+
        '<p class="text-[12.5px] text-[var(--muted)] mt-1">'+r.o.customer+' · '+r.o.qty+'</p>'+
        '<p class="text-[12.5px] mt-2">'+STEPS[r.o.step-1]+'</p>'+
        '<span class="mini mt-2" style="width:100%;display:block"><i style="width:'+pct+'%"></i></span></button>';
    }).join("") : '<p class="text-[12.5px] text-[var(--muted)] px-1 py-6 text-center">Kosong</p>';
    return '<div class="flex flex-col gap-2.5 min-w-[230px]">'+
      '<div class="flex items-center justify-between px-1"><p class="text-[13px] font-semibold">'+l.name+'</p>'+
      '<span class="delta flat">'+items.length+'</span></div>'+ body +'</div>';
  }).join("");
  return '<p class="text-[14px] text-[var(--muted)] mb-5">Papan produksi — pesanan dikelompokkan per fase. Klik kartu untuk update tahap.</p>'+
    '<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-4 overflow-x-auto">'+cols+'</div>';
}

function viewKirim(){
  var siap = rowsOf().filter(function(r){ return r.o.step >= 10; });
  if (!siap.length) return '<p class="text-[14px] text-[var(--muted)]">Belum ada pesanan yang siap dikirim.</p>';
  var cards = siap.map(function(r){
    var s = r.o.shipping;
    return '<div class="card p-4 sm:p-5">'+
      '<div class="flex items-start justify-between gap-3">'+
        '<div><p class="font-semibold num">'+r.id+'</p>'+
        '<p class="text-[13px] text-[var(--muted)] mt-0.5">'+r.o.customer+' · '+r.o.city+' · '+r.o.phone+'</p></div>'+
        '<span class="pill '+r.st+'">'+LABEL[r.st]+'</span></div>'+
      '<div class="grid sm:grid-cols-3 gap-3 mt-4 text-[13.5px]">'+
        '<div><p class="text-[12px] text-[var(--muted)]">Isi Paket</p><p class="mt-1">'+r.o.product+' · '+r.o.qty+'</p></div>'+
        '<div><p class="text-[12px] text-[var(--muted)]">Ekspedisi</p><p class="mt-1">'+(s&&s.courier?s.courier:'<span class="text-[var(--muted)]">belum diisi</span>')+'</p></div>'+
        '<div><p class="text-[12px] text-[var(--muted)]">No. Resi</p><p class="mt-1 num">'+(s&&s.resi?s.resi:'<span class="text-[var(--muted)]">belum diisi</span>')+'</p></div>'+
      '</div>'+
      '<div class="flex gap-2 mt-4"><button class="btn-ghost px-4 py-2 text-[13.5px]" data-open="'+r.id+'">Isi / Ubah Resi</button></div>'+
    '</div>';
  }).join("");
  return '<p class="text-[14px] text-[var(--muted)] mb-5">Pesanan tahap 10 — lengkapi ekspedisi dan nomor resi supaya tampil ke customer.</p>'+
    '<div class="flex flex-col gap-3">'+cards+'</div>';
}

function viewCustomer(){
  var map = {};
  rowsOf().forEach(function(r){
    var k = r.o.customer;
    if (!map[k]) map[k] = {city:r.o.city, phone:r.o.phone, orders:[], aktif:0};
    map[k].orders.push(r.id);
    if (!r.o.done) map[k].aktif++;
  });
  var rowsHtml = Object.keys(map).map(function(k){
    var c = map[k];
    return '<tr data-open="'+c.orders[0]+'">'+
      '<td><div class="flex items-center gap-2.5"><span class="avatar">'+initials(k)+'</span><span>'+k+
        '<br><span class="text-[12.5px] text-[var(--muted)]">'+c.city+'</span></span></div></td>'+
      '<td class="num text-[var(--muted)]">'+c.phone+'</td>'+
      '<td class="num">'+c.orders.length+'</td>'+
      '<td>'+(c.aktif ? '<span class="pill produksi">'+c.aktif+' aktif</span>' : '<span class="pill selesai">selesai</span>')+'</td>'+
    '</tr>';
  }).join("");
  return '<p class="text-[14px] text-[var(--muted)] mb-5">Daftar customer beserta jumlah pesanan yang pernah masuk.</p>'+
    '<div class="card p-2 sm:p-4 overflow-x-auto"><table class="tbl"><thead><tr>'+
    '<th>Customer</th><th>Nomor HP</th><th>Total Order</th><th>Status</th></tr></thead><tbody>'+rowsHtml+'</tbody></table></div>';
}

function viewLaporan(){
  var rs = rowsOf();
  var byStage = LANES.map(function(l){
    return {name:l.name, n:rs.filter(function(r){return r.o.step>=l.from&&r.o.step<=l.to&&!r.o.done;}).length};
  });
  var max = Math.max.apply(null, byStage.map(function(b){return b.n;}).concat([1]));
  var bars = byStage.map(function(b){
    return '<div class="flex items-center gap-3"><span class="text-[13px] w-[130px] text-[var(--muted)] flex-none">'+b.name+'</span>'+
      '<span class="mini" style="flex:1;width:auto;height:9px"><i style="width:'+(b.n/max*100)+'%"></i></span>'+
      '<span class="num text-[13px] w-6 text-right">'+b.n+'</span></div>';
  }).join("");
  var pcs = rs.reduce(function(a,r){ var n = parseInt(r.o.qty,10); return a + (isNaN(n)?0:n); }, 0);
  var weeks = [3,5,4,6,4,7,6];
  var wmax = Math.max.apply(null, weeks);
  var spark = weeks.map(function(v,i){
    return '<div class="flex flex-col items-center gap-2" style="flex:1">'+
      '<div style="width:100%;height:'+(v/wmax*90)+'px;background:var(--accent);opacity:'+(i===weeks.length-1?1:.45)+';border-radius:6px 6px 0 0"></div>'+
      '<span class="text-[11px] text-[var(--muted)]">M'+(i+1)+'</span></div>';
  }).join("");
  return '<p class="text-[14px] text-[var(--muted)] mb-5">Ringkasan operasional (angka contoh untuk mockup).</p>'+
    '<div class="grid lg:grid-cols-2 gap-4">'+
      '<div class="card p-5"><p class="text-[13px] text-[var(--muted)]">Order per minggu</p>'+
        '<div class="flex items-end gap-2 mt-4" style="height:110px">'+spark+'</div></div>'+
      '<div class="card p-5"><p class="text-[13px] text-[var(--muted)]">Beban per fase produksi</p>'+
        '<div class="flex flex-col gap-3 mt-4">'+bars+'</div></div>'+
      '<div class="card p-5"><p class="text-[13px] text-[var(--muted)]">Total item diproduksi</p>'+
        '<p class="display num text-[30px] mt-2">'+pcs+' pcs</p>'+
        '<p class="text-[12.5px] text-[var(--muted)] mt-1">dari '+rs.length+' pesanan aktif &amp; selesai</p></div>'+
      '<div class="card p-5"><p class="text-[13px] text-[var(--muted)]">Rata-rata waktu produksi</p>'+
        '<p class="display num text-[30px] mt-2">8 hari</p>'+
        '<p class="text-[12.5px] text-[var(--muted)] mt-1">target SLA 7–10 hari kerja</p></div>'+
    '</div>';
}

function viewSetting(){
  var st = STEPS.map(function(s,i){
    return '<div class="flex items-center gap-3 py-2.5 border-t border-[var(--line-2)]"><span class="num w-6 text-[13px] text-[var(--muted)]">'+(i+1)+'</span>'+
      '<span class="text-[14px]">'+s+'</span></div>';
  }).join("");
  return '<p class="text-[14px] text-[var(--muted)] mb-5">Pengaturan toko dan alur produksi (mockup — belum tersimpan permanen).</p>'+
    '<div class="grid lg:grid-cols-2 gap-4">'+
      '<div class="card p-5"><p class="font-semibold text-[15px]">Profil Toko</p>'+
        '<label class="block mt-4"><span class="text-[13px] text-[var(--muted)]">Nama Toko</span>'+
          '<input class="field w-full px-4 py-2.5 mt-1.5 text-[15px]" value="TNT Sport Apparel"></label>'+
        '<label class="block mt-3"><span class="text-[13px] text-[var(--muted)]">WhatsApp Admin</span>'+
          '<input class="field w-full px-4 py-2.5 mt-1.5 text-[15px] num" value="6281234567890"></label>'+
        '<label class="block mt-3"><span class="text-[13px] text-[var(--muted)]">Jam Operasional</span>'+
          '<input class="field w-full px-4 py-2.5 mt-1.5 text-[15px]" value="Senin–Sabtu · 09.00–17.00 WIB"></label>'+
        '<button class="btn-accent w-full py-3 text-[14px] mt-4" data-toast="Pengaturan disimpan">Simpan</button></div>'+
      '<div class="card p-5"><p class="font-semibold text-[15px]">Tahap Produksi</p>'+
        '<p class="text-[12.5px] text-[var(--muted)] mt-1 mb-2">Urutan 10 tahap yang dipakai di tracker customer.</p>'+st+'</div>'+
    '</div>';
}

var VIEWS = { jadwal:viewJadwal, kirim:viewKirim, customer:viewCustomer, laporan:viewLaporan, setting:viewSetting };
var current = "pesanan";

function setView(v){
  current = v;
  ["pesanan","jadwal","kirim","customer","laporan","setting"].forEach(function(k){
    document.getElementById("v-"+k).classList.toggle("hidden", k !== v);
  });
  if (VIEWS[v]) document.getElementById("v-"+v).innerHTML = VIEWS[v]();
  document.getElementById("vTitle").textContent = VIEW_META[v].title;
  document.getElementById("vCrumb").textContent = VIEW_META[v].crumb;
  document.querySelectorAll(".navlink").forEach(function(a){ a.classList.toggle("on", a.dataset.view === v); });
  window.scrollTo({top:0,behavior:"smooth"});
}

document.addEventListener("click", function(e){
  var nav = e.target.closest(".navlink");
  if (nav && nav.dataset.view){ e.preventDefault(); close(); setView(nav.dataset.view); return; }
  var op = e.target.closest("[data-open]");
  if (op){ openDetail(op.dataset.open); return; }
  var tw = e.target.closest("[data-toast]");
  if (tw){ toast(tw.dataset.toast); }
});
document.getElementById("mnav").onclick = function(){
  document.getElementById("navSheet").classList.add("open");
  document.body.style.overflow = "hidden";
};

var _close = close;
close = function(){ document.getElementById("navSheet").classList.remove("open"); _close(); };

var _render = render;
render = function(){ _render(); if (current !== "pesanan" && VIEWS[current]) document.getElementById("v-"+current).innerHTML = VIEWS[current](); };

// buka view langsung lewat hash, mis. /#jadwal
(function(){
  var h = (location.hash||"").replace("#","");
  if (VIEW_META[h]) setView(h);
  window.addEventListener("hashchange", function(){
    var v = location.hash.replace("#",""); if (VIEW_META[v]) setView(v);
  });
})();

