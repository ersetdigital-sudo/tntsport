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
