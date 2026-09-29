/* =====================================================================
   UyMap — script.js
   ---------------------------------------------------------------------
   1) RASMLAR ........ uylarga rasm biriktirish (SHU YERDA O'ZGARTIRING)
   2) Ma'lumotlar .... tumanlar va 32 ta demo uy
   3) Xarita ......... o'z xaritamiz (koordinata, zoom, markerlar)
   4) Ro'yxat/filtr .. kartalar, filtrlar, saralash
   5) Detail sahifa .. galereya, xarita, yaqin uylar
   6) Kirish/Profil .. login, ro'yxatdan o'tish, e'lon berish
   7) Qidiruv, navigatsiya va tugmalar
   ===================================================================== */

/* ---------- 1) RASMLAR ----------------------------------------------
   Format:  "uy_id": ["rasm1", "rasm2", "rasm3"]
   - uy_id: p1 dan p32 gacha (masalan "p5")
   - rasm: images/ papkasidagi fayl nomi YOKI internet havolasi (https://...)
   - Bir uyga xohlagancha rasm qo'shing; birinchisi asosiy rasm bo'ladi
   - Rasm yozilmagan uylarda rangli demo rasm chiqadi
   Misol:
     p1: ["images/p1.jpg", "images/p1_2.jpg"],
     p2: ["images/hovli.jpg"],
------------------------------------------------------------------- */
const RASMLAR = {
  p1: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuRATQgG9kTLZV4GJnEt_PQab9GEBbnIbPIo9cb2KNDQ&s",
    "images/p1_2.svg",
    "images/p1_3.svg",
  ], // Kvartira, 1 xona
  p2: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQChOE9jxze_otrBG5nThOTlTGp84UIbMUTG_tODy3BPQ&s=10",
    "images/p2_2.svg",
    "images/p2_3.svg",
  ], // Hovli, 5 xona
  p3: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRusp0BnKURsB69Yk67snRK2xAKN-UdyjF9ei16fVSajg&s=10",
    "images/p3_2.svg",
    "images/p3_3.svg",
  ], // Villa, 6 xona
  p4: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt_JkV07h95asJwr3HiSRQFMg0PXSgvtj1Sanh02BNgA&s=10",
    "images/p4_2.svg",
    "images/p4_3.svg",
  ], // Yangi uy, 4 xona
  p5: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh2QxFGAHkSzpYJe9JPR_dVruE1DNHV3k2wcGT-Xw8-g&s",
    "images/p5_2.svg",
    "images/p5_3.svg",
  ], // Eski uy, 1 xona
  p6: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO-o0QfsHolHkRJ9l5CsoSUV5uIev2FkZxcoG3_UHAJQ&s=10",
    "images/p6_2.svg",
    "images/p6_3.svg",
  ], // Kvartira, 2 xona
  p7: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhdLGtUuYYKB_4MkRwaqb9EApiOotgFFWgCkM7lwyipA&s=10",
    "images/p7_2.svg",
    "images/p7_3.svg",
  ], // Hovli, 4 xona
  p8: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOGrxvM6qdBbnygpinVOvIg8_XYbm7nYRz8l5pia-WP9duNJ_7UanWPNn0&s=10",
    "images/p8_2.svg",
    "images/p8_3.svg",
  ], // Villa, 5 xona
  p9: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvx5YIfn1o_1Er4mh2Xb4y1sHFSJ2zeRmvWqjSo9E_8g&s=10",
    "images/p9_2.svg",
    "images/p9_3.svg",
  ], // Yangi uy, 1 xona
  p10: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Lb8uJPUK4sShIorYe6GDPfFYKAIwYqSLeBOVhsirCQ&s",
    "images/p10_2.svg",
    "images/p10_3.svg",
  ], // Eski uy, 2 xona
  p11: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVpb1lFYYmnPa80V53mm-0xcYAXhnGzeU1PZ6plhLDEg&s=10",
    "images/p11_2.svg",
    "images/p11_3.svg",
  ], // Kvartira, 3 xona
  p12: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4MMBAbIWe_mbbRBUwnHMNJQjazUoZ7uBnOo7nejeTxQ&s=10",
    "images/p12_2.svg",
    "images/p12_3.svg",
  ], // Hovli, 6 xona
  p13: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTylXl3VCZ1Yx-qnUYIi9J8jJhCfpVvEdOVmuXp2yXQnw&s=10",
    "images/p13_2.svg",
    "images/p13_3.svg",
  ], // Villa, 4 xona
  p14: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAbzNVtRlI8OULPkNAZuZP7AYmQNY-apoMFdS5eRHx4Q&s",
    "images/p14_2.svg",
    "images/p14_3.svg",
  ], // Yangi uy, 2 xona
  p15: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ05bxajTwrqiewdV24RX6CdsOJuyonWFl1bcWwaHi-eg&s",
    "images/p15_2.svg",
    "images/p15_3.svg",
  ], // Eski uy, 3 xona
  p16: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7IpFGaHY8igy6dr8curvzydYADxS41LlVFq-R0qiaXQ&s",
    "images/p16_2.svg",
    "images/p16_3.svg",
  ], // Kvartira, 4 xona
  p17: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ6heVJWnLLx1MyllwNcrZcCWHjDC7kofCEuyRVMBqoA&s=10",
    "images/p17_2.svg",
    "images/p17_3.svg",
  ], // Hovli, 5 xona
  p18: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf_jA-FG9Z7iHH-fZMcv5G-BYVm14by5tqNiH36uczMw&s=10",
    "images/p18_2.svg",
    "images/p18_3.svg",
  ], // Villa, 6 xona
  p19: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX2gHWHkFyrEw3fEfYCy7mRibfTZ8qnhcevnuAMb50w&s",
    "images/p19_2.svg",
    "images/p19_3.svg",
  ], // Yangi uy, 3 xona
  p20: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJZ7Ru8OXrV9MaQPKc51AOS8VniEqD9XJglOAHfn4WOQ&s",
    "images/p20_2.svg",
    "images/p20_3.svg",
  ], // Eski uy, 4 xona
  p21: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMouUYnG9RLYWBe_Z-Eb_nQDb9SoKDbHNBpthvJOftrUJPMFexPS4zUR1q&s=10",
    "images/p21_2.svg",
    "images/p21_3.svg",
  ], // Kvartira, 1 xona
  p22: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZziAjq190BdPWZAmQvmBPdHgODDOmtMxrA9D4HslYGw&s=10",
    "images/p22_2.svg",
    "images/p22_3.svg",
  ], // Hovli, 4 xona
  p23: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtRWu9Ckz6h7sbcckhmBVYh6lIDMuRRDxjpAX1tpf-Aw&s=10",
    "images/p23_2.svg",
    "images/p23_3.svg",
  ], // Villa, 5 xona
  p24: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFnkH2xxF2pIrA92Ha7E6pQoa8GgNGA4Cer-y868Stiw&s=10",
    "images/p24_2.svg",
    "images/p24_3.svg",
  ], // Yangi uy, 4 xona
  p25: [
    "https://frankfurt.apollo.olxcdn.com/v1/files/m60p3m94c0331-UZ/image;s=765x1020",
    "images/p25_2.svg",
    "images/p25_3.svg",
  ], // Eski uy, 1 xona
  p26: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn46anintcXqccHmCF89C_r4jbChX4iKrCI3KYgmOR-Q&s",
    "images/p26_2.svg",
    "images/p26_3.svg",
  ], // Kvartira, 2 xona
  p27: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV3FGlYWi_iuyjKvnACUZmX1yH0t20l3hNRDVmzS-Ejw&s=10",
    "images/p27_2.svg",
    "images/p27_3.svg",
  ], // Hovli, 6 xona
  p28: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUrE9yr1bhCeV5ycoDXBOjbmR18OAw9sgfFNx4-9UWAw&s=10",
    "images/p28_2.svg",
    "images/p28_3.svg",
  ], // Villa, 4 xona
  p29: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7RX2Dsm9vaj8osniO8PPAX8Ghp5pqWAVnZf8slXedug&s",
    "images/p29_2.svg",
    "images/p29_3.svg",
  ], // Yangi uy, 1 xona
  p30: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRncJvdzCvf4weFRkFG4QmDCxBBtXWFry932OXOkdTlyA&s",
    "images/p30_2.svg",
    "images/p30_3.svg",
  ], // Eski uy, 2 xona
  p31: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbE0NEgdh8O2lwQ_ruAtVIwZ6MmR3G_mP6bv3FefC3jQ&s",
    "images/p31_2.svg",
    "images/p31_3.svg",
  ], // Kvartira, 3 xona
  p32: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfJtwDDJkZz-hEq4nUJ_R8dQBNEGKTQA6EZeCxFmNd0A&s=10",
    "images/p32_2.svg",
    "images/p32_3.svg",
  ], // Hovli, 5 xona
};
const nimg = (p) => (RASMLAR[p.id] || [0, 0, 0]).length;

const $ = (s) => document.querySelector(s),
  g = (k, d) => {
    try {
      return JSON.parse(localStorage.getItem(k)) ?? d;
    } catch (e) {
      return d;
    }
  },
  sv = (k, v) => {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {}
  };
const IC = {
  pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 1 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  road: '<path d="M4 20 9 4M20 20 15 4M12 6v3M12 12v3M12 18v2"/>',
  home: '<path d="M3 11l9-8 9 8M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>',
  tag: '<path d="M3 12V3h9l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  dollar:
    '<path d="M12 2v20M17 6.5C16 5 14 4.5 12 4.5c-2.5 0-4.5 1.2-4.5 3s1.8 2.6 4.5 3.2 4.5 1.4 4.5 3.3-2 3-4.5 3c-2.2 0-4.2-.7-5-2.2"/>',
  bed: '<path d="M3 18V6M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="1.5"/>',
  area: '<path d="M4 4h16v16H4zM4 9h5M4 14h3M9 4v5"/>',
  floor:
    '<path d="M5 21V3h14v18M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M3 21h18"/>',
  phone:
    '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  heart:
    '<path d="M12 21C5 15 3 11.5 3 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9 2.5C21 11.5 19 15 12 21z"/>',
  map: '<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14"/>',
};
const ic = (n, f) =>
    `<svg class="i" viewBox="0 0 24 24"${f ? ' style="fill:currentColor"' : ""}>${IC[n]}</svg>`,
  favT = (f) => ic("heart", f) + (f ? " Saqlangan" : " Saqlash");
/* ---------- 2) Ma'lumotlar ---------- */
const D = [
  [
    "Tashkent",
    41.3111,
    69.2797,
    ["Amir Temur xiyoboni", "Navoiy ko'chasi", "Shota Rustaveli ko'chasi"],
  ],
  [
    "Chilonzor",
    41.2755,
    69.2035,
    ["Bunyodkor shoh ko'chasi", "Qatortol ko'chasi", "Muqimiy ko'chasi"],
  ],
  [
    "Yunusobod",
    41.365,
    69.2875,
    ["Ahmad Donish ko'chasi", "Yunusobod 4-kvartal", "Shahrisabz ko'chasi"],
  ],
  [
    "Mirzo Ulug'bek",
    41.34,
    69.32,
    ["Mirzo Ulug'bek ko'chasi", "Buyuk Ipak Yo'li", "Ziyolilar ko'chasi"],
  ],
  [
    "Sergeli",
    41.223,
    69.22,
    ["Sergeli 7-mavze", "Yangi Sergeli ko'chasi", "Qo'yliq ko'chasi"],
  ],
  [
    "Yashnobod",
    41.295,
    69.335,
    ["Yashnobod ko'chasi", "Parkent ko'chasi", "Oybek ko'chasi"],
  ],
  [
    "Shayxontohur",
    41.326,
    69.235,
    ["Shayxontohur ko'chasi", "Zarqaynar ko'chasi", "Labzak ko'chasi"],
  ],
  [
    "Olmazor",
    41.345,
    69.215,
    ["Olmazor ko'chasi", "Universitet ko'chasi", "Yozuvchilar ko'chasi"],
  ],
];
const T = ["Kvartira", "Hovli", "Villa", "Yangi uy", "Eski uy"];
let s = 11;
const R = () => (s = (s * 16807) % 2147483647) / 2147483647;
const base = [];
for (let i = 0; i < 32; i++) {
  const d = D[i % 8],
    t = T[i % 5],
    big = t == "Hovli" || t == "Villa",
    rooms = big ? 4 + (i % 3) : 1 + (i % 4),
    area = big
      ? Math.round(180 + R() * 420)
      : Math.round(rooms * 20 + 22 + R() * 25),
    price =
      Math.round((area * (big ? 350 + R() * 300 : 800 + R() * 700)) / 500) *
      500,
    st = d[3][i % 3];
  base.push({
    id: "p" + (i + 1),
    title: big
      ? `${t} — ${area} m² yer, ${d[0]}`
      : `${rooms} xonali ${t.toLowerCase()}, ${d[0]}`,
    price,
    old: i % 4 == 0 ? Math.round((price * 1.15) / 500) * 500 : 0,
    lat: d[1] + (R() - 0.5) * 0.03,
    lng: d[2] + (R() - 0.5) * 0.04,
    rooms,
    area,
    type: t,
    cat:
      t == "Yangi uy"
        ? "new"
        : t == "Eski uy"
          ? "old"
          : big
            ? "vov"
            : i % 2
              ? "new"
              : "old",
    dist: d[0],
    st,
    addr: `${st}, ${d[0]}, ${10 + i * 3}-uy`,
    floor: big ? 1 : 1 + (i % 9),
    fl2: big ? 2 : 9 + (i % 4),
    year:
      t == "Eski uy"
        ? 1970 + (i % 25)
        : t == "Yangi uy"
          ? 2023 + (i % 4)
          : 2000 + (i % 22),
    sale: i % 4 == 0,
    date: Date.now() - i * 864e5,
    phone: "+998 90 123 45 " + (10 + i),
    desc: `${d[0]} tumanidagi qulay joylashuv: maktab, bog' va jamoat transporti yaqin. Ta'mir holati yaxshi, hujjatlar tayyor, tez orada ko'rish mumkin.`,
  });
}
let UP = g("uymap_props", []),
  P = [...base, ...UP];
const im = (p, k = 0) => {
  const L = RASMLAR[p.id];
  if (L && L.length) return L[k % L.length];
  const h = (parseInt(p.id.slice(1)) * 47 + k * 40) % 360;
  return (
    "data:image/svg+xml," +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 260'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='hsl(${h},60%,68%)'/><stop offset='1' stop-color='hsl(${(h + 50) % 360},55%,38%)'/></linearGradient></defs><rect width='400' height='260' fill='url(#g)'/><path d='M120 170v-60l80-50 80 50v60z' fill='rgba(255,255,255,.9)'/><rect x='185' y='125' width='30' height='45' fill='hsl(${h},50%,35%)'/><text x='200' y='215' text-anchor='middle' font-size='22' font-family='sans-serif' fill='white'>${p.type}</text></svg>`,
    )
  );
};
const $$ = (n) => "$" + n.toLocaleString("en").replace(/,/g, " "),
  sh = (n) => "$" + (n >= 1e3 ? Math.round(n / 1e3) + "k" : n);
const NV = [
  ["Bosh sahifa", "home", "all"],
  ["Uylar", "list", "all"],
  ["Xarita", "map", "all"],
  ["Aksiya", "map", "sale"],
  ["Yangi uylar", "map", "new"],
  ["Eski uylar", "map", "old"],
  ["Vovlilar", "map", "vov"],
];
const S = {
  nav: 0,
  cat: "all",
  q: null,
  rad: 5,
  sel: null,
  fav: g("uymap_fav", []),
  favOnly: false,
  f: {},
  sort: "new",
  me: g("uymap_me", null),
};
function toast(t) {
  const e = $("#ts");
  e.textContent = t;
  e.classList.add("s");
  clearTimeout(toast.t);
  toast.t = setTimeout(() => e.classList.remove("s"), 2400);
}
/* ---------- 3) Xarita ---------- */
const M = { lat: 41.3111, lng: 69.2797, z: 11.8 };
let W = 800,
  H = 600;
const cv = $("#cv"),
  cx = cv.getContext("2d");
const pr = (la, ln, z) => {
  const s = 256 * 2 ** z,
    n = Math.sin((la * Math.PI) / 180);
  return [
    ((ln + 180) / 360) * s,
    (0.5 - Math.log((1 + n) / (1 - n)) / (4 * Math.PI)) * s,
  ];
};
const un = (x, y, z) => {
  const s = 256 * 2 ** z;
  return [
    (180 / Math.PI) * Math.atan(Math.sinh(Math.PI - (2 * Math.PI * y) / s)),
    (x / s) * 360 - 180,
  ];
};
const sc = (la, ln) => {
  const [x, y] = pr(la, ln, M.z),
    [a, b] = pr(M.lat, M.lng, M.z);
  return [W / 2 + x - a, H / 2 + y - b];
};
const mpp = (la, z) => (156543 * Math.cos((la * Math.PI) / 180)) / 2 ** z;
const hav = (a, b, c, d) => {
  const r = Math.PI / 180,
    x =
      Math.sin(((c - a) * r) / 2) ** 2 +
      Math.cos(a * r) * Math.cos(c * r) * Math.sin(((d - b) * r) / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(x));
};
function bg(x, w, h, lat, lng, z) {
  const [a, b] = pr(lat, lng, z),
    f = (la, ln) => {
      const [p, q] = pr(la, ln, z);
      return [w / 2 + p - a, h / 2 + q - b];
    };
  x.fillStyle = "#eaf0ec";
  x.fillRect(0, 0, w, h);
  const t = un(a - w / 2, b - h / 2, z),
    o = un(a + w / 2, b + h / 2, z),
    st = z > 13 ? 0.005 : z > 11.5 ? 0.01 : 0.05;
  x.lineWidth = 1;
  x.strokeStyle = "#d9e4dd";
  x.beginPath();
  for (let la = Math.floor(o[0] / st) * st; la <= t[0]; la += st) {
    const y = f(la, 0)[1];
    x.moveTo(0, y);
    x.lineTo(w, y);
  }
  for (let ln = Math.floor(t[1] / st) * st; ln <= o[1]; ln += st) {
    const p = f(0, ln)[0];
    x.moveTo(p, 0);
    x.lineTo(p, h);
  }
  x.stroke();
  x.strokeStyle = "#bcd9ee";
  x.lineWidth = z * 1.1;
  x.lineCap = "round";
  x.beginPath();
  [
    [41.4, 69.12],
    [41.36, 69.17],
    [41.33, 69.22],
    [41.29, 69.28],
    [41.25, 69.33],
    [41.2, 69.38],
  ].forEach((p, i) => {
    const q = f(p[0], p[1]);
    i ? x.lineTo(q[0], q[1]) : x.moveTo(q[0], q[1]);
  });
  x.stroke();
  x.strokeStyle = "#fff";
  x.lineWidth = Math.max(2, z - 8.5);
  x.beginPath();
  const c = f(D[0][1], D[0][2]);
  D.slice(1).forEach((d) => {
    const q = f(d[1], d[2]);
    x.moveTo(c[0], c[1]);
    x.lineTo(q[0], q[1]);
  });
  x.stroke();
  D.forEach((d) => {
    const q = f(d[1], d[2]),
      r = 2200 / mpp(d[1], z);
    x.beginPath();
    x.arc(q[0], q[1], r, 0, 7);
    x.fillStyle = "rgba(22,163,74,.11)";
    x.fill();
    if (z > 10.5) {
      x.fillStyle = "#4d7566";
      x.font = "700 12px Manrope,sans-serif";
      x.textAlign = "center";
      x.fillText(d[0], q[0], q[1] + 4);
    }
  });
}
function resize() {
  const m = $("#mapw");
  W = m.clientWidth || W;
  H = m.clientHeight || H;
  const r = devicePixelRatio || 1;
  cv.width = W * r;
  cv.height = H * r;
  cx.setTransform(r, 0, 0, r, 0, 0);
  render();
}
new ResizeObserver(resize).observe($("#mapw"));
function bounds() {
  const [a, b] = pr(M.lat, M.lng, M.z),
    t = un(a - W / 2, b - H / 2, M.z),
    o = un(a + W / 2, b + H / 2, M.z);
  return { n: t[0], w: t[1], s: o[0], e: o[1] };
}
function draw() {
  bg(cx, W, H, M.lat, M.lng, M.z);
  const q = $("#qp");
  if (S.q) {
    const p = sc(S.q.lat, S.q.lng),
      r = (S.rad * 1000) / mpp(S.q.lat, M.z);
    cx.beginPath();
    cx.arc(p[0], p[1], r, 0, 7);
    cx.fillStyle = "rgba(22,163,74,.08)";
    cx.fill();
    cx.strokeStyle = "#16a34a";
    cx.lineWidth = 2;
    cx.setLineDash([7, 6]);
    cx.stroke();
    cx.setLineDash([]);
    q.style.display = "";
    q.style.transform = `translate(${p[0]}px,${p[1]}px)`;
  } else q.style.display = "none";
}
const mks = new Map();
function markers() {
  const L = fl(),
    cl = M.z < 12.6,
    lay = $("#mk"),
    cll = $("#cl");
  lay.style.display = cl ? "none" : "";
  cll.innerHTML = "";
  if (cl) {
    const gr = {};
    L.forEach((p) => {
      const [x, y] = sc(p.lat, p.lng),
        k = Math.floor(x / 70) + "_" + Math.floor(y / 70),
        o = gr[k] || (gr[k] = { n: 0, la: 0, ln: 0 });
      o.n++;
      o.la += p.lat;
      o.ln += p.lng;
    });
    Object.values(gr).forEach((o) => {
      const la = o.la / o.n,
        ln = o.ln / o.n,
        [x, y] = sc(la, ln),
        e = document.createElement("div");
      e.className = "cl";
      e.textContent = o.n;
      e.style.transform = `translate(${x}px,${y}px)`;
      e.onclick = () => fly(la, ln, M.z + 1.6);
      cll.appendChild(e);
    });
    return;
  }
  const ids = new Set(L.map((p) => p.id));
  mks.forEach((e, id) => {
    if (!ids.has(id)) {
      e.remove();
      mks.delete(id);
    }
  });
  L.forEach((p) => {
    let e = mks.get(p.id);
    if (!e) {
      e = document.createElement("div");
      e.className = "mk";
      e.textContent = sh(p.price);
      e.onclick = () => pick(p.id);
      lay.appendChild(e);
      mks.set(p.id, e);
    }
    const [x, y] = sc(p.lat, p.lng);
    e.style.transform = `translate(${x}px,${y}px) translate(-50%,-100%)`;
    e.classList.toggle("on", p.id == S.sel);
  });
}
let lt;
function render() {
  draw();
  markers();
  clearTimeout(lt);
  lt = setTimeout(list, 120);
}
let an = 0;
function fly(la, ln, z, ms = 550) {
  cancelAnimationFrame(an);
  const a = [M.lat, M.lng, M.z],
    t0 = performance.now(),
    z2 = Math.max(10, Math.min(17, z));
  const st = (t) => {
    let k = Math.min(1, (t - t0) / ms);
    k = 1 - (1 - k) ** 3;
    M.lat = a[0] + (la - a[0]) * k;
    M.lng = a[1] + (ln - a[1]) * k;
    M.z = a[2] + (z2 - a[2]) * k;
    render();
    if (k < 1) an = requestAnimationFrame(st);
  };
  an = requestAnimationFrame(st);
}
function zoomAt(px, py, dz) {
  const [a, b] = pr(M.lat, M.lng, M.z),
    [la, ln] = un(a + px - W / 2, b + py - H / 2, M.z);
  M.z = Math.max(10, Math.min(17, M.z + dz));
  const [x, y] = pr(la, ln, M.z);
  [M.lat, M.lng] = un(x - (px - W / 2), y - (py - H / 2), M.z);
  render();
}
const mw = $("#mapw");
let dr = null;
mw.addEventListener("pointerdown", (e) => {
  if (e.target.closest(".mk,.cl,.ctl,#mini")) return;
  cancelAnimationFrame(an);
  dr = [e.clientX, e.clientY];
  mw.setPointerCapture(e.pointerId);
  mw.style.cursor = "grabbing";
});
mw.addEventListener("pointermove", (e) => {
  if (!dr) return;
  const dx = e.clientX - dr[0],
    dy = e.clientY - dr[1];
  dr = [e.clientX, e.clientY];
  const [a, b] = pr(M.lat, M.lng, M.z);
  [M.lat, M.lng] = un(a - dx, b - dy, M.z);
  render();
});
mw.addEventListener("pointerup", () => {
  dr = null;
  mw.style.cursor = "";
});
mw.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    const r = mw.getBoundingClientRect();
    zoomAt(e.clientX - r.left, e.clientY - r.top, e.deltaY < 0 ? 0.5 : -0.5);
  },
  { passive: false },
);
mw.addEventListener("dblclick", (e) => {
  if (e.target.closest(".mk,.cl,.ctl,#mini")) return;
  const r = mw.getBoundingClientRect();
  zoomAt(e.clientX - r.left, e.clientY - r.top, 1);
});
$("#zi").onclick = () => zoomAt(W / 2, H / 2, 1);
$("#zo").onclick = () => zoomAt(W / 2, H / 2, -1);
$("#lc").onclick = () => {
  if (!navigator.geolocation) return toast("Brauzer joylashuvni qo'llamaydi");
  toast("Joylashuv aniqlanmoqda...");
  navigator.geolocation.getCurrentPosition(
    (p) => {
      setQ({
        lat: p.coords.latitude,
        lng: p.coords.longitude,
        name: "Mening joylashuvim",
      });
    },
    () => toast("Joylashuvni aniqlab bo'lmadi. Ruxsatni tekshiring."),
    { timeout: 8000 },
  );
};
function fit(L) {
  if (!L.length) return;
  const la = L.map((p) => p.lat),
    ln = L.map((p) => p.lng),
    cla = (Math.min(...la) + Math.max(...la)) / 2,
    cln = (Math.min(...ln) + Math.max(...ln)) / 2;
  let z = 15;
  for (; z > 10; z -= 0.5) {
    const [a, b] = pr(cla, cln, z),
      p1 = pr(Math.max(...la), Math.min(...ln), z),
      p2 = pr(Math.min(...la), Math.max(...ln), z);
    if (Math.abs(p2[0] - p1[0]) < W - 140 && Math.abs(p2[1] - p1[1]) < H - 200)
      break;
  }
  fly(cla, cln, z);
}
/* ---------- 4) Ro'yxat va filtrlar ---------- */
function fl() {
  const f = S.f;
  return P.filter(
    (p) =>
      (S.cat == "all" || (S.cat == "sale" ? p.sale : p.cat == S.cat)) &&
      (!f.type || p.type == f.type) &&
      (!f.dist || p.dist == f.dist) &&
      (!f.rooms || (f.rooms == 5 ? p.rooms >= 5 : p.rooms == f.rooms)) &&
      (!f.min || p.price >= f.min) &&
      (!f.max || p.price <= f.max) &&
      (!f.amin || p.area >= f.amin) &&
      (!f.amax || p.area <= f.amax) &&
      (!S.favOnly || S.fav.includes(p.id)),
  );
}
function vis() {
  let L = fl();
  if (S.q) {
    L = L.map((p) => ({
      ...p,
      km: hav(S.q.lat, S.q.lng, p.lat, p.lng),
    })).filter((p) => p.km <= S.rad);
  } else if (!document.body.classList.contains("v-list")) {
    const b = bounds();
    L = L.filter(
      (p) => p.lat <= b.n && p.lat >= b.s && p.lng >= b.w && p.lng <= b.e,
    );
  }
  const o = {
    pa: (a, b) => a.price - b.price,
    pd: (a, b) => b.price - a.price,
    ar: (a, b) => b.area - a.area,
    new: (a, b) => b.date - a.date,
  }[S.sort];
  return L.sort(S.q && S.sort == "new" ? (a, b) => a.km - b.km : o);
}
function card(p) {
  const fv = S.fav.includes(p.id);
  return `<div class="c ${p.id == S.sel ? "sel" : ""}" data-a="det" data-id="${p.id}"><div class="im"><img loading="lazy" alt="${p.title}" src="${im(p)}">${p.sale ? `<span class="tag">-${Math.round((1 - p.price / p.old) * 100)}%</span>` : ""}</div><div class="cb"><div class="pr">${$$(p.price)}${p.old ? `<s>${$$(p.old)}</s>` : ""}</div><b style="font-size:14px">${p.title}</b><div class="mu">${ic("pin")} ${p.addr}${p.km != null ? ` · ${p.km.toFixed(1)} km` : ""}</div><div class="mu">${ic("bed")} ${p.rooms} xona · ${ic("area")} ${p.area} m² · ${ic("floor")} ${p.floor}/${p.fl2}-qavat · ${p.type}</div><div class="ac"><button class="b p" data-a="det" data-id="${p.id}">Batafsil</button><button class="b" data-a="fav" data-id="${p.id}">${favT(fv)}</button><button class="b" data-a="map" data-id="${p.id}">Xaritada ko'rish</button></div></div></div>`;
}
function list() {
  const L = vis(),
    n = NV[S.nav];
  $("#cnt").textContent = `${n[3]} · ${L.length} ta uy`;
  $("#lh").textContent =
    (document.querySelector("#list.col") ? "▲ " : "▼ ") + L.length + " ta uy";
  $("#qc").innerHTML = S.q
    ? `<button class="b" data-a="cq">${ic("pin")} ${S.q.name} · ${S.rad} km ✕</button>`
    : "";
  $("#cards").innerHTML = L.length
    ? L.map(card).join("")
    : `<div class="em" style="grid-column:1/-1"><div class="big">${ic("map")}</div><h3>Bu hududda uy topilmadi</h3><p>Filtrlarni o'zgartiring yoki qidiruv radiusini kengaytiring.</p><button class="b p" data-a="cf">Filtrlarni tozalash</button> ${S.q ? `<button class="b" data-a="rad">Radiusni 15 km qilish</button>` : ""}</div>`;
  $("#fv").innerHTML = ic("heart", S.favOnly) + " " + S.fav.length;
  $("#fv").classList.toggle("p", S.favOnly);
}
/* ---- selection / mini ---- */
function pick(id, f) {
  const p = P.find((x) => x.id == id);
  if (!p) return;
  S.sel = id;
  const m = $("#mini");
  m.style.display = "flex";
  m.innerHTML = `<img src="${im(p)}" alt=""><div style="flex:1;min-width:0"><div class="pr">${$$(p.price)}</div><div>${ic("bed")} ${p.rooms} xona · ${ic("area")} ${p.area} m²</div><div class="mu">${ic("pin")} ${p.addr}</div><button class="b p" style="margin-top:6px" data-a="det" data-id="${p.id}">Batafsil ko'rish</button></div><button class="x" data-a="cm">✕</button>`;
  if (f) fly(p.lat, p.lng, 15);
  else render();
  mks.forEach((e, i) => e.classList.toggle("on", i == id));
  setTimeout(
    () => {
      list();
      const c = document.querySelector(`#cards [data-id="${id}"]`);
      c && c.scrollIntoView({ block: "nearest", behavior: "smooth" });
    },
    f ? 600 : 150,
  );
}
/* ---------- 5) Detail sahifa ---------- */
function openDet(id, nohash) {
  const p = P.find((x) => x.id == id);
  if (!p) return;
  if (!nohash) location.hash = "uy-" + id;
  const d = $("#det"),
    fv = S.fav.includes(id);
  let k = 0;
  const near = P.filter((x) => x.id != id)
    .map((x) => ({ ...x, km: hav(p.lat, p.lng, x.lat, x.lng) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, 4);
  d.innerHTML = `<div class="dw"><button class="b" data-a="dc">← Orqaga</button><div class="dg" style="margin-top:12px"><div><div class="gal"><img id="gi" src="${im(p)}" alt=""><button class="n" style="left:10px" data-a="gp">‹</button><button class="n" style="right:10px" data-a="gn">›</button></div><div class="th">${Array.from(
    { length: nimg(p) },
    (_, i) => i,
  )
    .map(
      (i) =>
        `<img class="${i ? "" : "on"}" data-a="gt" data-k="${i}" src="${im(p, i)}" alt="">`,
    )
    .join("")}</div>
<h1 style="margin:16px 0 4px;font-size:26px">${p.title}</h1><div class="mu">${ic("pin")} ${p.addr}, Toshkent</div><div class="pr" style="font-size:28px;margin:8px 0">${$$(p.price)}${p.old ? `<s>${$$(p.old)}</s>` : ""}</div>
<div class="kv"><div>Xonalar<b>${p.rooms}</b></div><div>Maydon<b>${p.area} m²</b></div><div>Qavat<b>${p.floor}/${p.fl2}</b></div><div>Qurilgan yil<b>${p.year}</b></div><div>Turi<b>${p.type}</b></div></div>
<div class="box"><b>Tavsif</b><p style="color:var(--mu);line-height:1.6;margin:6px 0 0">${p.desc}</p></div><h3>Xarita</h3><canvas id="dm" style="width:100%;height:260px;border-radius:16px;display:block"></canvas></div>
<div><div class="box" style="position:sticky;top:12px"><b>Sotuvchi bilan bog'lanish</b><p class="mu">Telefon: ${p.phone}</p><a class="b p" style="display:block;text-align:center;text-decoration:none;margin-bottom:8px" href="tel:${p.phone.replace(/\s/g, "")}">${ic("phone")} Qo'ng'iroq qilish</a><div class="ac"><button class="b" id="dfav" data-a="fav" data-id="${id}">${favT(fv)}</button><button class="b" data-a="sh">Ulashish</button></div></div></div></div>
<h2>Shu hududdagi boshqa uylar</h2><div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));padding-bottom:30px">${near.map(card).join("")}</div></div>`;
  d.classList.add("o");
  d.scrollTop = 0;
  d._p = p;
  d._k = 0;
  const c = $("#dm"),
    r = devicePixelRatio || 1,
    w = c.clientWidth,
    h = 260;
  c.width = w * r;
  c.height = h * r;
  const x = c.getContext("2d");
  x.setTransform(r, 0, 0, r, 0, 0);
  bg(x, w, h, p.lat, p.lng, 14);
  near.forEach((o) => {
    const [a, b] = pr(p.lat, p.lng, 14),
      [u, v] = pr(o.lat, o.lng, 14);
    x.beginPath();
    x.arc(w / 2 + u - a, h / 2 + v - b, 7, 0, 7);
    x.fillStyle = "#0b1b33";
    x.fill();
  });
  x.save();
  x.translate(w / 2, h / 2);
  x.fillStyle = "#16a34a";
  x.strokeStyle = "#fff";
  x.lineWidth = 2;
  x.beginPath();
  x.moveTo(0, 0);
  x.bezierCurveTo(-16, -18, -14, -38, 0, -38);
  x.bezierCurveTo(14, -38, 16, -18, 0, 0);
  x.fill();
  x.stroke();
  x.fillStyle = "#fff";
  x.beginPath();
  x.arc(0, -24, 5, 0, 7);
  x.fill();
  x.restore();
}
function closeDet() {
  $("#det").classList.remove("o");
  if (location.hash)
    history.replaceState(null, "", location.pathname + location.search);
}
function gal(k) {
  const d = $("#det"),
    p = d._p;
  const n = nimg(p);
  d._k = (k + n) % n;
  $("#gi").src = im(p, d._k);
  d.querySelectorAll(".th img").forEach((e, i) =>
    e.classList.toggle("on", i == d._k),
  );
}
addEventListener("hashchange", () => {
  const m = location.hash.match(/uy-(p\d+)/);
  m ? openDet(m[1], 1) : $("#det").classList.remove("o");
});
/* ---------- 6) Kirish, profil, e'lon ---------- */
function modal(h) {
  $("#mb").innerHTML = h;
  $("#md").classList.add("o");
}
const closeM = () => $("#md").classList.remove("o");
$("#md").onclick = (e) => {
  if (e.target.id == "md") closeM();
};
addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    closeM();
    closeDet();
    closeAp();
    $("#dd").style.display = "none";
  }
});
function authUI() {
  $("#au").innerHTML = S.me
    ? `<button class="b" data-a="prof">${ic("user")} ${S.me.name}</button>`
    : `<button class="b" data-a="login">${ic("user")} Kirish</button> <button class="b" data-a="reg">Ro'yxatdan o'tish</button>`;
}
const closeAp = () => $("#ap").classList.remove("o");
function authM(reg) {
  closeM();
  const ap = $("#ap");
  ap.innerHTML = `<div class="apw"><div class="apl"><div class="logo" style="font-size:30px">Uy<i>Map</i></div><h2 style="font-size:28px;margin:18px 0 6px">Uyingizni xaritadan toping</h2><p>Hisob oching va sevimli uylaringizni saqlang, o'z e'loningizni joylashtiring.</p><ul><li>${ic("map")} Xaritada uylarni qidirish</li><li>${ic("heart")} Sevimlilarni saqlash</li><li>${ic("home")} E'lon joylashtirish</li></ul></div>
<div class="apr"><button class="b" data-a="apc" style="align-self:flex-end">✕ Yopish</button><div class="apf"><h1 style="margin:0 0 4px">${reg ? "Ro'yxatdan o'tish" : "Kirish"}</h1><p class="mu">${reg ? "Yangi hisob yarating" : "Hisobingizga kiring"}</p><div class="tabs"><button class="b ${reg ? "" : "p"}" data-a="login">Kirish</button><button class="b ${reg ? "p" : ""}" data-a="reg">Ro'yxatdan o'tish</button></div>
<form class="mf" id="af">${reg ? `<label>Ismingiz<input name="n" required></label>` : ""}<label>Email<input name="e" type="email" required></label><label>Parol<input name="p" id="pwi" type="password" minlength="4" required></label><label style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="pws" style="width:auto"> Parolni ko'rsatish</label><button class="b p">${reg ? "Ro'yxatdan o'tish" : "Kirish"}</button><button type="button" class="b" data-a="demo" style="padding:11px">Demo hisob bilan kirish</button></form><p class="mu" style="font-size:12px;margin-top:14px">Demo: ma'lumotlar faqat shu brauzerda saqlanadi.</p></div></div></div>`;
  ap.classList.add("o");
  $("#pws").onchange = (e) =>
    ($("#pwi").type = e.target.checked ? "text" : "password");
  $("#af").onsubmit = (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target)),
      us = g("uymap_users", []);
    if (reg) {
      if (us.some((u) => u.e == f.e))
        return toast("Bu email allaqachon ro'yxatdan o'tgan");
      us.push(f);
      sv("uymap_users", us);
      S.me = { name: f.n, e: f.e };
    } else {
      const u = us.find((u) => u.e == f.e && u.p == f.p);
      if (!u) return toast("Email yoki parol noto'g'ri");
      S.me = { name: u.n, e: u.e };
    }
    sv("uymap_me", S.me);
    authUI();
    closeAp();
    toast("Xush kelibsiz, " + S.me.name + "!");
  };
}
function profM() {
  const my = P.filter((p) => p.owner == S.me.e),
    fv = P.filter((p) => S.fav.includes(p.id)),
    gr = (l) =>
      l.length
        ? `<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(270px,1fr))">${l.map(card).join("")}</div>`
        : `<p class="mu">Hozircha bo'sh.</p>`;
  $("#ap").innerHTML =
    `<div class="pw"><div class="row" style="justify-content:space-between"><button class="b" data-a="apc">← Orqaga</button><button class="b" data-a="out">Chiqish</button></div><div class="row" style="gap:14px;margin:16px 0"><div class="av">${S.me.name[0].toUpperCase()}</div><div><h1 style="margin:0">${S.me.name}</h1><div class="mu">${S.me.e}</div></div><button class="b p" style="margin-left:auto" data-a="add">Uy joylashtirish</button></div><h2>Mening e'lonlarim (${my.length})</h2>${gr(my)}<h2 style="margin-top:24px">Saqlanganlar (${fv.length})</h2>${gr(fv)}</div>`;
  $("#ap").classList.add("o");
  $("#ap").scrollTop = 0;
}
function addM() {
  if (!S.me) {
    toast("Avval tizimga kiring");
    return authM(false);
  }
  modal(
    `<h3 style="margin:0">Uy joylashtirish</h3><form class="mf" id="pf"><label>Sarlavha<input name="title" required></label><div class="g2"><label>Turi<select name="type">${T.map((t) => `<option>${t}</option>`).join("")}</select></label><label>Tuman<select name="dist">${D.map((d) => `<option>${d[0]}</option>`).join("")}</select></label></div><label>Ko'cha<input name="st" required></label><div class="g2"><label>Narx ($)<input name="price" type="number" min="1000" required></label><label>Maydon (m²)<input name="area" type="number" min="10" required></label><label>Xonalar<input name="rooms" type="number" min="1" value="2" required></label><label>Qavat<input name="floor" type="number" min="1" value="1"></label></div><label>Telefon<input name="phone" required value="+998 "></label><label>Tavsif<textarea name="desc" rows="3"></textarea></label><button class="b p" style="padding:11px">E'lon berish</button></form>`,
  );
  $("#pf").onsubmit = (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target)),
      d = D.find((x) => x[0] == f.dist),
      big = f.type == "Hovli" || f.type == "Villa";
    const p = {
      id: "p" + (100 + UP.length),
      title: f.title,
      price: +f.price,
      old: 0,
      lat: d[1] + (Math.random() - 0.5) * 0.02,
      lng: d[2] + (Math.random() - 0.5) * 0.03,
      rooms: +f.rooms,
      area: +f.area,
      type: f.type,
      cat:
        f.type == "Yangi uy"
          ? "new"
          : f.type == "Eski uy"
            ? "old"
            : big
              ? "vov"
              : "new",
      dist: f.dist,
      st: f.st,
      addr: `${f.st}, ${f.dist}`,
      floor: +f.floor || 1,
      fl2: +f.floor || 1,
      year: new Date().getFullYear(),
      sale: false,
      date: Date.now(),
      phone: f.phone,
      owner: S.me.e,
      desc: f.desc || "Yangi e'lon.",
    };
    UP.push(p);
    sv("uymap_props", UP);
    P = [...base, ...UP];
    closeM();
    S.q = null;
    S.cat = "all";
    setNav(2, true);
    toast("E'lon joylashtirildi!");
    pick(p.id, true);
  };
}
/* ---------- 7) Qidiruv va navigatsiya ---------- */
function idx() {
  const a = D.map((d) => ({
    k: "pin",
    t: d[0],
    s: "Tuman / shahar",
    lat: d[1],
    lng: d[2],
  }));
  D.forEach((d) =>
    d[3].forEach((st) => {
      const L = P.filter((p) => p.st == st);
      a.push({
        k: "road",
        t: st,
        s: d[0],
        lat: L.length ? L.reduce((x, p) => x + p.lat, 0) / L.length : d[1],
        lng: L.length ? L.reduce((x, p) => x + p.lng, 0) / L.length : d[2],
      });
    }),
  );
  P.forEach((p) =>
    a.push({
      k: "home",
      t: p.title,
      s: p.addr,
      id: p.id,
      lat: p.lat,
      lng: p.lng,
    }),
  );
  T.forEach((t) => a.push({ k: "tag", t: t, s: "Uy turi", type: t }));
  return a;
}
let SG = [],
  hi = 0;
const qi = $("#q");
function sug() {
  const v = qi.value.trim().toLowerCase(),
    dd = $("#dd");
  if (!v) {
    dd.style.display = "none";
    SG = [];
    return;
  }
  SG = idx()
    .filter(
      (i) => i.t.toLowerCase().includes(v) || i.s.toLowerCase().includes(v),
    )
    .sort(
      (a, b) =>
        b.t.toLowerCase().startsWith(v) - a.t.toLowerCase().startsWith(v),
    )
    .slice(0, 7);
  if (/^\d[\d\s]*$/.test(v)) {
    let n = +v.replace(/\s/g, "");
    if (n < 1000) n *= 1000;
    SG.unshift({
      k: "dollar",
      t: "Narx: " + $$(n) + " gacha",
      s: "Narx bo'yicha qidirish",
      price: n,
    });
  }
  hi = 0;
  dd.innerHTML = SG.length
    ? SG.map(
        (i, n) =>
          `<div class="${n ? "" : "h"}" data-n="${n}">${ic(i.k)} ${i.t}<small>${i.s}</small></div>`,
      ).join("")
    : `<div>Hech narsa topilmadi</div>`;
  dd.style.display = "block";
}
function chosen(i) {
  $("#dd").style.display = "none";
  qi.value = i.type ? "" : i.price ? "" : i.t;
  if (i.type) {
    S.f.type = i.type;
    $("#ftp").value = i.type;
    toast("Filtr: " + i.type);
    render();
    return;
  }
  if (i.price) {
    S.f.max = i.price;
    $("#fmx").value = i.price;
    toast("Maks narx: " + $$(i.price));
    render();
    return;
  }
  setQ({
    lat: i.lat,
    lng: i.lng,
    name: i.t.length > 24 ? i.t.slice(0, 22) + "…" : i.t,
  });
  if (i.id) setTimeout(() => pick(i.id), 700);
}
function setQ(q) {
  S.q = q;
  S.rad = 5;
  if (document.body.classList.contains("v-list")) setNav(2, true);
  fly(q.lat, q.lng, 14);
  const n = vis().length;
  toast(n ? `${n} ta uy topildi (${S.rad} km)` : "Yaqin atrofda uy topilmadi");
}
qi.oninput = sug;
qi.onfocus = sug;
qi.onkeydown = (e) => {
  const it = [...$("#dd").children];
  if (e.key == "ArrowDown" || e.key == "ArrowUp") {
    e.preventDefault();
    hi = (hi + (e.key == "ArrowDown" ? 1 : -1) + it.length) % it.length;
    it.forEach((x, n) => x.classList.toggle("h", n == hi));
  }
  if (e.key == "Enter") {
    SG[hi] ? chosen(SG[hi]) : toast("Manzil topilmadi. Boshqa nom yozing.");
  }
};
$("#dd").onclick = (e) => {
  const d = e.target.closest("[data-n]");
  d && chosen(SG[+d.dataset.n]);
};
document.addEventListener("click", (e) => {
  if (!e.target.closest(".sw")) $("#dd").style.display = "none";
});
/* ---- nav / filters ---- */
function setNav(i, keep) {
  S.nav = i;
  const n = NV[i];
  S.cat = n[2];
  if (!keep) S.q = null;
  document.body.className = "v-" + n[1];
  $("#nv")
    .querySelectorAll("a")
    .forEach((a, k) => a.classList.toggle("on", k == i));
  $("#list").classList.remove("col");
  setTimeout(() => {
    resize();
    if (n[2] != "all" && n[1] == "map") fit(fl());
  }, 60);
}
NV[0][3] = "Barcha uylar";
NV[1][3] = "Barcha uylar";
NV[2][3] = "Xaritadagi uylar";
NV[3][3] = "Aksiya: chegirmadagi uylar";
NV[4][3] = "Yangi uylar";
NV[5][3] = "Eski uylar (ikkilamchi)";
NV[6][3] = "Vovlilar: hovli uylar";
$("#nv").innerHTML = NV.map(
  (n, i) => `<a data-a="nav" data-i="${i}">${n[0]}</a>`,
).join("");
$("#ftp").innerHTML += T.map((t) => `<option>${t}</option>`).join("");
$("#fds").innerHTML += D.map((d) => `<option>${d[0]}</option>`).join("");
$("#pop").innerHTML = D.map(
  (d, i) =>
    `<span class="chip" data-a="loc" data-i="${i}">${ic("pin")} ${d[0]}</span>`,
).join("");
$("#feat").innerHTML = [...P]
  .sort((a, b) => b.price - a.price)
  .slice(0, 6)
  .map(
    (p) =>
      `<div class="fc" data-a="det" data-id="${p.id}"><img src="${im(p)}" alt=""><div><b>${sh(p.price)}</b>${p.rooms} xona · ${p.dist}</div></div>`,
  )
  .join("");
const fmap = {
  ftp: ["type", (v) => v],
  fds: ["dist", (v) => v],
  frm: ["rooms", (v) => +v],
  fmn: ["min", (v) => +v],
  fmx: ["max", (v) => +v],
  fan: ["amin", (v) => +v],
  fax: ["amax", (v) => +v],
};
Object.keys(fmap).forEach((id) =>
  $("#" + id).addEventListener("input", (e) => {
    S.f[fmap[id][0]] = e.target.value ? fmap[id][1](e.target.value) : "";
    render();
  }),
);
$("#so").onchange = (e) => {
  S.sort = e.target.value;
  list();
};
$("#ft").onclick = () => $("#fl").classList.toggle("o");
const clearF = () => {
  S.f = {};
  ["ftp", "fds", "frm", "fmn", "fmx", "fan", "fax"].forEach(
    (i) => ($("#" + i).value = ""),
  );
  render();
};
$("#fc").onclick = clearF;
$("#fv").onclick = () => {
  S.favOnly = !S.favOnly;
  if (S.favOnly && !S.fav.length) toast("Hali saqlangan uylar yo'q");
  render();
};
$("#lh").onclick = () => {
  $("#list").classList.toggle("col");
  list();
};
$("#lg").onclick = () => setNav(0);
$("#ad").onclick = addM;
/* ---- global actions ---- */
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-a]");
  if (!el) return;
  const a = el.dataset.a,
    id = el.dataset.id;
  if (a == "det" || a == "map") closeAp();
  if (a == "det") openDet(id);
  else if (a == "fav") {
    e.stopPropagation();
    const i = S.fav.indexOf(id);
    i < 0 ? S.fav.push(id) : S.fav.splice(i, 1);
    sv("uymap_fav", S.fav);
    toast(i < 0 ? "Sevimlilarga qo'shildi" : "Sevimlilardan olib tashlandi");
    list();
    const b = $("#dfav");
    if (b && b.dataset.id == id) b.innerHTML = favT(i < 0);
    el.innerHTML = favT(i < 0);
  } else if (a == "map") {
    e.stopPropagation();
    closeDet();
    if (document.body.classList.contains("v-list")) setNav(2, true);
    setTimeout(() => pick(id, true), 80);
  } else if (a == "nav") setNav(+el.dataset.i);
  else if (a == "loc") {
    const d = D[+el.dataset.i];
    setQ({ lat: d[1], lng: d[2], name: d[0] });
  } else if (a == "cq") {
    S.q = null;
    render();
  } else if (a == "cf") clearF();
  else if (a == "rad") {
    S.rad = 15;
    fly(S.q.lat, S.q.lng, 12.5);
  } else if (a == "cm") {
    $("#mini").style.display = "none";
    S.sel = null;
    render();
  } else if (a == "dc") closeDet();
  else if (a == "gt") gal(+el.dataset.k);
  else if (a == "gn") gal($("#det")._k + 1);
  else if (a == "gp") gal($("#det")._k - 1);
  else if (a == "sh") {
    const u = location.href;
    navigator.clipboard
      ? navigator.clipboard.writeText(u).then(
          () => toast("Havola nusxalandi"),
          () => toast(u),
        )
      : toast(u);
  } else if (a == "prof") profM();
  else if (a == "apc") closeAp();
  else if (a == "add") {
    closeAp();
    addM();
  } else if (a == "demo") {
    const us = g("uymap_users", []);
    if (!us.some((u) => u.e == "demo@uymap.uz")) {
      us.push({ n: "Demo", e: "demo@uymap.uz", p: "demo" });
      sv("uymap_users", us);
    }
    S.me = { name: "Demo", e: "demo@uymap.uz" };
    sv("uymap_me", S.me);
    authUI();
    closeAp();
    toast("Demo hisob bilan kirdingiz");
  } else if (a == "login") authM(false);
  else if (a == "reg") authM(true);
  else if (a == "out") {
    S.me = null;
    sv("uymap_me", null);
    authUI();
    closeAp();
    toast("Tizimdan chiqdingiz");
  }
});
authUI();
resize();
list();
setTimeout(() => {
  $("#ld").classList.add("h");
  const m = location.hash.match(/uy-(p\d+)/);
  if (m) openDet(m[1], 1);
}, 650);

/* Rasm yuklanmasa (havola o'chgan bo'lsa) demo rasm ko'rsatiladi */
document.addEventListener(
  "error",
  (e) => {
    const t = e.target;
    if (t.tagName == "IMG" && !t.dataset.f) {
      t.dataset.f = 1;
      t.src = im({ id: "p0", type: "Uy" }, 0);
    }
  },
  true,
);
