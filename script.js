/* =====================================================================
   UyMap — script.js
   ---------------------------------------------------------------------
   1) RASMLAR ........ uylarga rasm biriktirish (SHU YERDA O'ZGARTIRING)
   2) Til va tema .... uz/ru/en tarjimalar, tungi/kunduzgi rejim
   3) Ma'lumotlar .... tumanlar va 32 ta demo uy
   4) Xarita ......... o'z xaritamiz (koordinata, zoom, markerlar)
   5) Ro'yxat/filtr .. kartalar, filtrlar, saralash
   6) Detail sahifa .. galereya, xarita, yaqin uylar
   7) Kirish/Profil .. login, ro'yxatdan o'tish, e'lon berish
   8) Qidiruv, navigatsiya va tugmalar
   ===================================================================== */

/* ---------- 1) RASMLAR ----------------------------------------------
   Format:  "uy_id": ["rasm1", "rasm2", "rasm3"]
   - uy_id: p1 dan p32 gacha (masalan "p5")
   - rasm: images/ papkasidagi fayl nomi YOKI internet havolasi (https://...)
   - Bir uyga xohlagancha rasm qo'shing; birinchisi asosiy rasm bo'ladi
   - Rasm yozilmagan uylarda rangli demo rasm chiqadi
------------------------------------------------------------------- */
const RASMLAR = {
  p1: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuRATQgG9kTLZV4GJnEt_PQab9GEBbnIbPIo9cb2KNDQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVITuphYCJfLakMKbnTMfmhl1n8g12JNfZVEtNNKHrew&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVITuphYCJfLakMKbnTMfmhl1n8g12JNfZVEtNNKHrew&s=10",
  ], // Kvartira, 1 xona
  p2: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQChOE9jxze_otrBG5nThOTlTGp84UIbMUTG_tODy3BPQ&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzbz9YEQ0nabvlthaGY_TdXEFxUEYVV_d7g28vjEHEfQ&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq1517oXQ4UE1XcC7w1fP_nSA2_ZLkoelFR2atrYVpzw&s=10",
  ], // Hovli, 5 xona
  p3: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRusp0BnKURsB69Yk67snRK2xAKN-UdyjF9ei16fVSajg&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxi0Radv0-IWPzZ5COIA-qAr-KuzGwSOaff3D4diTc4w&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl618RqX96JeNBSomnZ8hkBWmDI8g_ErxwKLj2Zj87XA&s",
  ], // Villa, 6 xona
  p4: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt_JkV07h95asJwr3HiSRQFMg0PXSgvtj1Sanh02BNgA&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPNukfQvihr1MghEpp4DV7xevJo_WTi6eMpE02P-t_sA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp1qnMs4NW-1FZcGxIYkPN9X_ZSdrhsrjBkDa5GkOAVA&s",
  ], // Yangi uy, 4 xona
  p5: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh2QxFGAHkSzpYJe9JPR_dVruE1DNHV3k2wcGT-Xw8-g&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD4FjukSN2APx9apKhkuUGXIz0WWV5b667ghMHtFcu0Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu7FuhjH9h_iQLQaKEmLAPXNWhbYSFfEG94_TgO0XDkg&s",
  ], // Eski uy, 1 xona
  p6: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO-o0QfsHolHkRJ9l5CsoSUV5uIev2FkZxcoG3_UHAJQ&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2Vnvm3VF2OpfFlIQHU91b5og8HhlC4dlTW8-1HY92pA&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCzDS9Oj4UCqgGN_RUEYeN30sm7wqv0vueHmUSLJIdZQ&s=10",
  ], // Kvartira, 2 xona
  p7: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhdLGtUuYYKB_4MkRwaqb9EApiOotgFFWgCkM7lwyipA&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3v49YsnAZfJ_ajsfsk5n9Sve91ARVr3ehF8Qxrt30iw&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7SpDPkP3LOuivbALCj7qPoNGQEifAFmxK8ynHxvuznQ&s=10",
  ], // Hovli, 4 xona
  p8: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOGrxvM6qdBbnygpinVOvIg8_XYbm7nYRz8l5pia-WP9duNJ_7UanWPNn0&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb6cHjDcALDqN0r7AV5QhAsj5mHTrZx-IsKtFUk7SQ_Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP09GYZpYT5yhngi9P6khlkiQbn4zpyUR3vuu0IIL0ig&s",
  ], // Villa, 5 xona
  p9: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvx5YIfn1o_1Er4mh2Xb4y1sHFSJ2zeRmvWqjSo9E_8g&s=10",
    "https://domtut.uz/resources/uploads/post/xonadonlarning-dizayn-loyihalari.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOzYGLarydS2nRk3FdZSOOBNirKT2GS0MlrinqqNGBSw&s=10",
  ], // Yangi uy, 1 xona
  p10: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8Lb8uJPUK4sShIorYe6GDPfFYKAIwYqSLeBOVhsirCQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrmlU3dwvlD_1DP7lpl76iWYfgBrSLRGr7qhzhUOU-aA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDtjJAhNYROhOf51_UJv06SlCdlsI9qJfNLFSfQTi4FQ&s",
  ], // Eski uy, 2 xona
  p11: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVpb1lFYYmnPa80V53mm-0xcYAXhnGzeU1PZ6plhLDEg&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLmixHkkxMUmXJCGhifjjlBW0sZgeq0tcATyiMegjFEg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ar0CKAAeHbtYEAZ9bbUoo7EsW75iXIzQ3lpt7yHG-A&s",
  ], // Kvartira, 3 xona
  p12: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4MMBAbIWe_mbbRBUwnHMNJQjazUoZ7uBnOo7nejeTxQ&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBEWxnc7ZWfGF7eNB4JV5dkfL2lCWlka6c_kHiCFqmFQ&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbaJ1S9vqwARWhToH4p_9wT-kw7RqFtD51IDkHXLwqFg&s=10",
  ], // Hovli, 6 xona
  p13: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTylXl3VCZ1Yx-qnUYIi9J8jJhCfpVvEdOVmuXp2yXQnw&s=10",
    "images/p13_2.svg",
    "images/p13_3.svg",
  ], // Villa, 4 xona
  p14: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAbzNVtRlI8OULPkNAZuZP7AYmQNY-apoMFdS5eRHx4Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzCREhxAADoO7Wei1MnAtFoH_G-ibuL1XkbanHAEIOdg&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRvc9G3Zm4SM_S-jbfRs4yTf0L7VycLyomYd_n8Dzr3w&s=10",
  ], // Yangi uy, 2 xona
  p15: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ05bxajTwrqiewdV24RX6CdsOJuyonWFl1bcWwaHi-eg&s",
    "https://frankfurt.apollo.olxcdn.com/v1/files/w2l955bxljh43-UZ/image;s=1000x750",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYpBiUo3oVhH7WKx6vkLPucghByzZLHkoZaiVHoANSlg&s",
  ], // Eski uy, 3 xona
  p16: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7IpFGaHY8igy6dr8curvzydYADxS41LlVFq-R0qiaXQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK8v5fChdtknC-wBfGWUOvXRGuLmzAm6iv_AkW3BhigQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7_2hPHP6VYsincAnv3kthInimSCpVQTfM0CqT0rSSdQ&s=10",
  ], // Kvartira, 4 xona
  p17: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ6heVJWnLLx1MyllwNcrZcCWHjDC7kofCEuyRVMBqoA&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScKGCy6780bdmmlCDEZn_YKIN-kJ-X1NvuXoIh1c5Q2w&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqc0ruATGzU1VEnhrVhzQe3RvcPmjaz6oyPkHCLuwAlQ&s=10",
  ], // Hovli, 5 xona
  p18: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf_jA-FG9Z7iHH-fZMcv5G-BYVm14by5tqNiH36uczMw&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnOGpSfWBgLIUZbb5dshoel5_aeBfFUwriFTRTHhoXYg13l8V28rA5D0g&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8WO53WcAZY0E81uV0QoY7Fsuuc9BCLUSkmdCIGsoN_g&s=10",
  ], // Villa, 6 xona
  p19: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFX2gHWHkFyrEw3fEfYCy7mRibfTZ8qnhcevnuAMb50w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjr9FTFOOQ_wF26-wSUnaYjMbt855s1smiVbWBhzGU8w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8hVvb7wrUaR6RegYd0VKQF2umnE288gE-ySa6MmBRAA&s",
  ], // Yangi uy, 3 xona
  p20: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJZ7Ru8OXrV9MaQPKc51AOS8VniEqD9XJglOAHfn4WOQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtwG-c3ZS4lMh1OqP9IqL0jLW-2MEru2av3OqxJODFQA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuqVzlpNgZixUTJKSQl9I8GVTEkA8hSoLzK6ebHHApDQ&s",
  ], // Eski uy, 4 xona
  p21: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMouUYnG9RLYWBe_Z-Eb_nQDb9SoKDbHNBpthvJOftrUJPMFexPS4zUR1q&s=10",
    "images/p21_2.svg",
    "images/p21_3.svg",
  ], // Kvartira, 1 xona
  p22: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZziAjq190BdPWZAmQvmBPdHgODDOmtMxrA9D4HslYGw&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbR1gcd4_HAF54LBqmdDUClm369Qw8-gltiIrapZ__Rg&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaw1pFgITB1fJpifKqD8SaUseXz70fu6xsiS-C_WmWzw&s=10",
  ], // Hovli, 4 xona
  p23: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtRWu9Ckz6h7sbcckhmBVYh6lIDMuRRDxjpAX1tpf-Aw&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn7vS9VgD_diAH6a-m_5PJg5rNKqoVReJ7JKKQTQwpNA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8e4kd6N7ovec9OXcJkOroMj5dwaUvRyTyTwuzGK1j2Q&s",
  ], // Villa, 5 xona
  p24: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFnkH2xxF2pIrA92Ha7E6pQoa8GgNGA4Cer-y868Stiw&s=10",
    "https://domtut.uz/resources/uploads/post/top-10-dizayn-studi-kvartir-i-domov-v-tashkente-2023-3.jpeg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU21bRpqOYLB9clsZg5tVbtWJCXCRtuinehYvw5BSceg&s=10",
  ], // Yangi uy, 4 xona
  p25: [
    "https://frankfurt.apollo.olxcdn.com/v1/files/m60p3m94c0331-UZ/image;s=765x1020",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvdfScUDmppVs9n35CBvxfOBd5e3ISc23SXAV3c6Hxmg&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDtjJAhNYROhOf51_UJv06SlCdlsI9qJfNLFSfQTi4FQ&s",
  ], // Eski uy, 1 xona
  p26: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn46anintcXqccHmCF89C_r4jbChX4iKrCI3KYgmOR-Q&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHr2pOZ0KTQRJc5QvEQjVB8jUk4p9H-87yenJoolOKKA&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-5Ym55qLnThClke750jtJMBsLBK_S32FIlJ83s1FjVw&s=10",
  ], // Kvartira, 2 xona
  p27: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV3FGlYWi_iuyjKvnACUZmX1yH0t20l3hNRDVmzS-Ejw&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEBpQdPW6OBCb4Km1ujWdHTOxOyDLoMz-C86Dw5DqUjZc-UBleXi2VrAE&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvhMyMreOGnsp1UWrQBs_UqG8_8pVU0-EqikZ68-JE7Q&s=10",
  ], // Hovli, 6 xona
  p28: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUrE9yr1bhCeV5ycoDXBOjbmR18OAw9sgfFNx4-9UWAw&s=10",
    "images/p28_2.svg",
    "images/p28_3.svg",
  ], // Villa, 4 xona
  p29: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7RX2Dsm9vaj8osniO8PPAX8Ghp5pqWAVnZf8slXedug&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2k2B-rC2SvTtVbinVXeuOc9TK04RpXVcJA1hVIR_70vT2GK2Vx4yLaUX-&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnkFkxblyYFKfKVnEawNluE1ltSuSxqnE9PFz-ZbNKOg&s=10",
  ], // Yangi uy, 1 xona
  p30: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRncJvdzCvf4weFRkFG4QmDCxBBtXWFry932OXOkdTlyA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuqVzlpNgZixUTJKSQl9I8GVTEkA8hSoLzK6ebHHApDQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtwG-c3ZS4lMh1OqP9IqL0jLW-2MEru2av3OqxJODFQA&s",
  ], // Eski uy, 2 xona
  p31: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbE0NEgdh8O2lwQ_ruAtVIwZ6MmR3G_mP6bv3FefC3jQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRZvmepIfsMK3cDMoQhSDLOUfolyaYcqP4JTU7CLaAEw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQz98ZSSHOp2ZxwtLUml2TLSjtdMvwwuTb7lime6Wbqg&s",
  ], // Kvartira, 3 xona
  p32: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfJtwDDJkZz-hEq4nUJ_R8dQBNEGKTQA6EZeCxFmNd0A&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZGyBpmmDx5RWmrmRzEtaBhpDpkNU6FgOCWYARMF-7IQ&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNOgZKzia7YdIGHwe_cV45MtntQcfC-aM2b0VQn0B6zQ&s=10",
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
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/>',
  chat: '<path d="M4 4h16v12H8l-4 4z"/>',
  send: '<path d="M3 12 21 3l-6 18-4-8-8-4z"/>',
};
const ic = (n, f) =>
    `<svg class="i" viewBox="0 0 24 24"${f ? ' style="fill:currentColor"' : ""}>${IC[n]}</svg>`,
  favT = (f) => ic("heart", f) + " " + (f ? t("saved") : t("save"));

/* ---------- 2) Til va tema ------------------------------------------
   Tarjima matnlari shu yerda. Yangi so'z qo'shish uchun uchala tilga
   ham yozing (uz/ru/en), keyin matnda t('kalit') deb chaqiring.
------------------------------------------------------------------- */
const TR = {
  uz: {
    searchPh: "Shahar, tuman, ko'cha yoki uy nomini qidiring...",
    heroTitle: "O'zingizga mos uyni xaritadan toping",
    heroDesc:
      "Xaritadan kerakli hududni tanlang va shu atrofdagi uylarni ko'ring.",
    navHome: "Bosh sahifa",
    navList: "Uylar",
    navMap: "Xarita",
    navSale: "Aksiya",
    navNew: "Yangi uylar",
    navOld: "Eski uylar",
    navVov: "Vovlilar",
    navDescAll: "Barcha uylar",
    navDescMap: "Xaritadagi uylar",
    navDescSale: "Aksiya: chegirmadagi uylar",
    navDescNew: "Yangi uylar",
    navDescOld: "Eski uylar (ikkilamchi)",
    navDescVov: "Vovlilar: hovli uylar",
    sortNew: "Yangi qo'shilganlar",
    sortPa: "Arzonidan qimmatiga",
    sortPd: "Qimmatidan arzoniga",
    sortAr: "Maydoni bo'yicha",
    filterBtn: "Filtrlar",
    filterClear: "Filtrlarni tozalash",
    filterType: "Uy turi",
    filterDist: "Hudud / tuman",
    filterRooms: "Xonalar",
    filterCity: "Shahar: Toshkent",
    priceMin: "Min narx $",
    priceMax: "Maks narx $",
    areaMin: "Min m²",
    areaMax: "Maks m²",
    addProperty: "Uy joylashtirish",
    login: "Kirish",
    register: "Ro'yxatdan o'tish",
    logout: "Chiqish",
    save: "Saqlash",
    saved: "Saqlangan",
    detBack: "← Orqaga",
    detRooms: "Xonalar",
    detArea: "Maydon",
    detFloor: "Qavat",
    detYear: "Qurilgan yil",
    detType: "Turi",
    detDesc: "Tavsif",
    detMapTitle: "Xarita",
    detContact: "Sotuvchi bilan bog'lanish",
    detPhone: "Telefon:",
    detCall: "Qo'ng'iroq qilish",
    detShare: "Ulashish",
    detNearby: "Shu hududdagi boshqa uylar",
    detTitle: "Batafsil",
    detMapBtn: "Xaritada ko'rish",
    emptyTitle: "Bu hududda uy topilmadi",
    emptyDesc: "Filtrlarni o'zgartiring yoki qidiruv radiusini kengaytiring.",
    expandRadius: "Radiusni 15 km qilish",
    toastFavAdd: "Sevimlilarga qo'shildi",
    toastFavRem: "Sevimlilardan olib tashlandi",
    toastLinkCopied: "Havola nusxalandi",
    toastNoFav: "Hali saqlangan uylar yo'q",
    toastLoginFirst: "Avval tizimga kiring",
    toastListed: "E'lon joylashtirildi!",
    toastWelcome: (n) => `Xush kelibsiz, ${n}!`,
    toastLoggedOut: "Tizimdan chiqdingiz",
    toastDemoLogin: "Demo hisob bilan kirdingiz",
    toastEmailExists: "Bu email allaqachon ro'yxatdan o'tgan",
    toastWrongCred: "Email yoki parol noto'g'ri",
    toastGeoUnsupported: "Brauzer joylashuvni qo'llamaydi",
    toastLocating: "Joylashuv aniqlanmoqda...",
    toastGeoFail: "Joylashuvni aniqlab bo'lmadi. Ruxsatni tekshiring.",
    toastNoResultsNear: "Yaqin atrofda uy topilmadi",
    toastFoundNear: (n, r) => `${n} ta uy topildi (${r} km)`,
    toastAddrNotFound: "Manzil topilmadi. Boshqa nom yozing.",
    toastFilterType: (v) => `Filtr: ${v}`,
    toastMaxPrice: (v) => `Maks narx: ${v}`,
    searchNoResults: "Hech narsa topilmadi",
    searchDistrictLabel: "Tuman / shahar",
    searchTypeLabel: "Uy turi",
    searchPriceLabel: "Narx bo'yicha qidirish",
    searchPricePrefix: (v) => `Narx: ${v} gacha`,
    myListings: "Mening e'lonlarim",
    savedTitle: "Saqlanganlar",
    emptyList: "Hozircha bo'sh.",
    profBack: "← Orqaga",
    authLoginTitle: "Kirish",
    authRegTitle: "Ro'yxatdan o'tish",
    authLoginSub: "Hisobingizga kiring",
    authRegSub: "Yangi hisob yarating",
    authName: "Ismingiz",
    authEmail: "Email",
    authPass: "Parol",
    authShowPass: "Parolni ko'rsatish",
    authDemo: "Demo hisob bilan kirish",
    authNote: "Demo: ma'lumotlar faqat shu brauzerda saqlanadi.",
    authClose: "✕ Yopish",
    authHeroTitle: "Uyingizni xaritadan toping",
    authHeroDesc:
      "Hisob oching va sevimli uylaringizni saqlang, o'z e'loningizni joylashtiring.",
    authBullet1: "Xaritada uylarni qidirish",
    authBullet2: "Sevimlilarni saqlash",
    authBullet3: "E'lon joylashtirish",
    addFormTitle: "Uy joylashtirish",
    addTitleLbl: "Sarlavha",
    addTypeLbl: "Turi",
    addDistLbl: "Tuman",
    addStreetLbl: "Ko'cha",
    addPriceLbl: "Narx ($)",
    addAreaLbl: "Maydon (m²)",
    addRoomsLbl: "Xonalar",
    addFloorLbl: "Qavat",
    addPhoneLbl: "Telefon",
    addDescLbl: "Tavsif",
    addSubmit: "E'lon berish",
    defaultDesc: "Yangi e'lon.",
    roomsWord: "xona",
    floorWord: "qavat",
    unitsSuffix: "ta uy",
    themeLabel: "Tema",
    langLabel: "Til",
    detChat: "Xabar yozish",
    chatWith: (n) => `${n} bilan suhbat`,
    chatPh: "Xabar yozing...",
    chatSend: "Yuborish",
    chatEmpty: "Hali xabar yo'q. Birinchi bo'lib yozing!",
    chatLoginFirst: "Xabar yozish uchun avval tizimga kiring",
    chatSellerIntro:
      "Salom! Qiziqtirgan savolingiz bo'lsa, bemalol yozavering.",
    chatSellerReplies: [
      "Salom! Albatta, savolingizga javob beraman.",
      "Rahmat, xabaringiz uchun! Tez orada aloqaga chiqaman.",
      "Ha, uy hali sotuvda. Qachon ko'rishni xohlaysiz?",
      "Narx bo'yicha kelishib olishimiz mumkin, qo'ng'iroq qiling.",
    ],
    descTpl: (d) =>
      `${d} tumanidagi qulay joylashuv: maktab, bog' va jamoat transporti yaqin. Ta'mir holati yaxshi, hujjatlar tayyor, tez orada ko'rish mumkin.`,
    titleBig: (tp, ar, d) => `${tp} — ${ar} m² yer, ${d}`,
    titleSmall: (rm, tp, d) => `${rm} xonali ${tp.toLowerCase()}, ${d}`,
    types: {
      Kvartira: "Kvartira",
      Hovli: "Hovli",
      Villa: "Villa",
      "Yangi uy": "Yangi uy",
      "Eski uy": "Eski uy",
    },
  },
  ru: {
    searchPh: "Введите город, район, улицу или название дома...",
    heroTitle: "Найдите подходящий дом на карте",
    heroDesc: "Выберите нужный район на карте и посмотрите дома поблизости.",
    navHome: "Главная",
    navList: "Дома",
    navMap: "Карта",
    navSale: "Акции",
    navNew: "Новостройки",
    navOld: "Вторичное жильё",
    navVov: "С участком",
    navDescAll: "Все дома",
    navDescMap: "Дома на карте",
    navDescSale: "Акции: дома со скидкой",
    navDescNew: "Новостройки",
    navDescOld: "Вторичное жильё",
    navDescVov: "Дома с приусадебным участком",
    sortNew: "Сначала новые",
    sortPa: "Сначала дешевле",
    sortPd: "Сначала дороже",
    sortAr: "По площади",
    filterBtn: "Фильтры",
    filterClear: "Сбросить фильтры",
    filterType: "Тип жилья",
    filterDist: "Район",
    filterRooms: "Комнаты",
    filterCity: "Город: Ташкент",
    priceMin: "Мин. цена $",
    priceMax: "Макс. цена $",
    areaMin: "Мин. м²",
    areaMax: "Макс. м²",
    addProperty: "Разместить объявление",
    login: "Войти",
    register: "Регистрация",
    logout: "Выйти",
    save: "Сохранить",
    saved: "Сохранено",
    detBack: "← Назад",
    detRooms: "Комнаты",
    detArea: "Площадь",
    detFloor: "Этаж",
    detYear: "Год постройки",
    detType: "Тип",
    detDesc: "Описание",
    detMapTitle: "Карта",
    detContact: "Связаться с продавцом",
    detPhone: "Телефон:",
    detCall: "Позвонить",
    detShare: "Поделиться",
    detNearby: "Другие дома в этом районе",
    detTitle: "Подробнее",
    detMapBtn: "Показать на карте",
    emptyTitle: "Дома в этом районе не найдены",
    emptyDesc: "Измените фильтры или увеличьте радиус поиска.",
    expandRadius: "Увеличить радиус до 15 км",
    toastFavAdd: "Добавлено в избранное",
    toastFavRem: "Удалено из избранного",
    toastLinkCopied: "Ссылка скопирована",
    toastNoFav: "Пока нет сохранённых домов",
    toastLoginFirst: "Сначала войдите в систему",
    toastListed: "Объявление опубликовано!",
    toastWelcome: (n) => `Добро пожаловать, ${n}!`,
    toastLoggedOut: "Вы вышли из системы",
    toastDemoLogin: "Вы вошли в демо-аккаунт",
    toastEmailExists: "Этот email уже зарегистрирован",
    toastWrongCred: "Неверный email или пароль",
    toastGeoUnsupported: "Браузер не поддерживает геолокацию",
    toastLocating: "Определение местоположения...",
    toastGeoFail: "Не удалось определить местоположение. Проверьте разрешения.",
    toastNoResultsNear: "Поблизости дома не найдены",
    toastFoundNear: (n, r) => `Найдено домов: ${n} (${r} км)`,
    toastAddrNotFound: "Адрес не найден. Введите другое название.",
    toastFilterType: (v) => `Фильтр: ${v}`,
    toastMaxPrice: (v) => `Макс. цена: ${v}`,
    searchNoResults: "Ничего не найдено",
    searchDistrictLabel: "Район / город",
    searchTypeLabel: "Тип жилья",
    searchPriceLabel: "Поиск по цене",
    searchPricePrefix: (v) => `Цена: до ${v}`,
    myListings: "Мои объявления",
    savedTitle: "Сохранённые",
    emptyList: "Пока пусто.",
    profBack: "← Назад",
    authLoginTitle: "Вход",
    authRegTitle: "Регистрация",
    authLoginSub: "Войдите в свой аккаунт",
    authRegSub: "Создайте новый аккаунт",
    authName: "Ваше имя",
    authEmail: "Email",
    authPass: "Пароль",
    authShowPass: "Показать пароль",
    authDemo: "Войти в демо-аккаунт",
    authNote: "Демо: данные сохраняются только в этом браузере.",
    authClose: "✕ Закрыть",
    authHeroTitle: "Найдите свой дом на карте",
    authHeroDesc:
      "Создайте аккаунт, сохраняйте понравившиеся дома и размещайте свои объявления.",
    authBullet1: "Поиск домов на карте",
    authBullet2: "Сохранение избранного",
    authBullet3: "Размещение объявлений",
    addFormTitle: "Разместить объявление",
    addTitleLbl: "Заголовок",
    addTypeLbl: "Тип",
    addDistLbl: "Район",
    addStreetLbl: "Улица",
    addPriceLbl: "Цена ($)",
    addAreaLbl: "Площадь (м²)",
    addRoomsLbl: "Комнаты",
    addFloorLbl: "Этаж",
    addPhoneLbl: "Телефон",
    addDescLbl: "Описание",
    addSubmit: "Опубликовать",
    defaultDesc: "Новое объявление.",
    roomsWord: "комн.",
    floorWord: "этаж",
    unitsSuffix: "домов",
    themeLabel: "Тема",
    langLabel: "Язык",
    detChat: "Написать сообщение",
    chatWith: (n) => `Чат с ${n}`,
    chatPh: "Напишите сообщение...",
    chatSend: "Отправить",
    chatEmpty: "Сообщений пока нет. Напишите первым!",
    chatLoginFirst: "Войдите в систему, чтобы написать сообщение",
    chatSellerIntro: "Здравствуйте! Если есть вопросы, пишите, не стесняйтесь.",
    chatSellerReplies: [
      "Здравствуйте! Конечно, отвечу на ваш вопрос.",
      "Спасибо за сообщение! Скоро свяжусь с вами.",
      "Да, дом ещё продаётся. Когда хотите посмотреть?",
      "По цене можем договориться, позвоните мне.",
    ],
    descTpl: (d) =>
      `Удобное расположение в районе ${d}: рядом школа, парк и общественный транспорт. Хороший ремонт, документы готовы, можно посмотреть в ближайшее время.`,
    titleBig: (tp, ar, d) => `${tp} — ${ar} м² земли, ${d}`,
    titleSmall: (rm, tp, d) => `${rm}-комнатная ${tp.toLowerCase()}, ${d}`,
    types: {
      Kvartira: "Квартира",
      Hovli: "Дом с двором",
      Villa: "Вилла",
      "Yangi uy": "Новостройка",
      "Eski uy": "Вторичное жильё",
    },
  },
  en: {
    searchPh: "Search city, district, street or property name...",
    heroTitle: "Find your perfect home on the map",
    heroDesc: "Pick an area on the map and see the homes nearby.",
    navHome: "Home",
    navList: "Listings",
    navMap: "Map",
    navSale: "Deals",
    navNew: "New buildings",
    navOld: "Old houses",
    navVov: "With yard",
    navDescAll: "All properties",
    navDescMap: "Properties on the map",
    navDescSale: "Deals: discounted properties",
    navDescNew: "New buildings",
    navDescOld: "Old houses (secondary market)",
    navDescVov: "Houses with a yard",
    sortNew: "Newest first",
    sortPa: "Price: low to high",
    sortPd: "Price: high to low",
    sortAr: "By area",
    filterBtn: "Filters",
    filterClear: "Clear filters",
    filterType: "Property type",
    filterDist: "District",
    filterRooms: "Rooms",
    filterCity: "City: Tashkent",
    priceMin: "Min price $",
    priceMax: "Max price $",
    areaMin: "Min m²",
    areaMax: "Max m²",
    addProperty: "List a property",
    login: "Log in",
    register: "Sign up",
    logout: "Log out",
    save: "Save",
    saved: "Saved",
    detBack: "← Back",
    detRooms: "Rooms",
    detArea: "Area",
    detFloor: "Floor",
    detYear: "Built",
    detType: "Type",
    detDesc: "Description",
    detMapTitle: "Map",
    detContact: "Contact seller",
    detPhone: "Phone:",
    detCall: "Call",
    detShare: "Share",
    detNearby: "Other properties nearby",
    detTitle: "Details",
    detMapBtn: "Show on map",
    emptyTitle: "No properties found here",
    emptyDesc: "Try adjusting the filters or expanding the search radius.",
    expandRadius: "Expand radius to 15 km",
    toastFavAdd: "Added to favorites",
    toastFavRem: "Removed from favorites",
    toastLinkCopied: "Link copied",
    toastNoFav: "No saved properties yet",
    toastLoginFirst: "Please log in first",
    toastListed: "Listing published!",
    toastWelcome: (n) => `Welcome, ${n}!`,
    toastLoggedOut: "You have logged out",
    toastDemoLogin: "Logged in with demo account",
    toastEmailExists: "This email is already registered",
    toastWrongCred: "Incorrect email or password",
    toastGeoUnsupported: "Browser doesn't support geolocation",
    toastLocating: "Locating...",
    toastGeoFail: "Couldn't get your location. Check permissions.",
    toastNoResultsNear: "No properties found nearby",
    toastFoundNear: (n, r) => `Found ${n} properties (${r} km)`,
    toastAddrNotFound: "Address not found. Try another name.",
    toastFilterType: (v) => `Filter: ${v}`,
    toastMaxPrice: (v) => `Max price: ${v}`,
    searchNoResults: "Nothing found",
    searchDistrictLabel: "District / city",
    searchTypeLabel: "Property type",
    searchPriceLabel: "Search by price",
    searchPricePrefix: (v) => `Price: up to ${v}`,
    myListings: "My listings",
    savedTitle: "Saved",
    emptyList: "Nothing here yet.",
    profBack: "← Back",
    authLoginTitle: "Log in",
    authRegTitle: "Sign up",
    authLoginSub: "Sign in to your account",
    authRegSub: "Create a new account",
    authName: "Your name",
    authEmail: "Email",
    authPass: "Password",
    authShowPass: "Show password",
    authDemo: "Log in with demo account",
    authNote: "Demo: data is stored only in this browser.",
    authClose: "✕ Close",
    authHeroTitle: "Find your home on the map",
    authHeroDesc:
      "Create an account to save favorite homes and publish your own listing.",
    authBullet1: "Search homes on the map",
    authBullet2: "Save favorites",
    authBullet3: "Publish a listing",
    addFormTitle: "List a property",
    addTitleLbl: "Title",
    addTypeLbl: "Type",
    addDistLbl: "District",
    addStreetLbl: "Street",
    addPriceLbl: "Price ($)",
    addAreaLbl: "Area (m²)",
    addRoomsLbl: "Rooms",
    addFloorLbl: "Floor",
    addPhoneLbl: "Phone",
    addDescLbl: "Description",
    addSubmit: "Submit listing",
    defaultDesc: "New listing.",
    roomsWord: "rooms",
    floorWord: "floor",
    unitsSuffix: "properties",
    themeLabel: "Theme",
    langLabel: "Language",
    detChat: "Message",
    chatWith: (n) => `Chat with ${n}`,
    chatPh: "Type a message...",
    chatSend: "Send",
    chatEmpty: "No messages yet. Say hello!",
    chatLoginFirst: "Please log in to send a message",
    chatSellerIntro: "Hi! Feel free to ask anything about this property.",
    chatSellerReplies: [
      "Hi! Sure, happy to answer your question.",
      "Thanks for your message! I'll get back to you soon.",
      "Yes, it's still available. When would you like to see it?",
      "We can discuss the price, feel free to call me.",
    ],
    descTpl: (d) =>
      `Convenient location in ${d}: close to schools, parks and public transport. Good condition, documents ready, viewing available soon.`,
    titleBig: (tp, ar, d) => `${tp} — ${ar} m² of land, ${d}`,
    titleSmall: (rm, tp, d) => `${rm}-room ${tp.toLowerCase()}, ${d}`,
    types: {
      Kvartira: "Apartment",
      Hovli: "House with yard",
      Villa: "Villa",
      "Yangi uy": "New building",
      "Eski uy": "Old house",
    },
  },
};
let LANG = g("uymap_lang", "uz");
if (!TR[LANG]) LANG = "uz";
const t = (k) => TR[LANG][k];
const typeLabel = (tp) => TR[LANG].types[tp] || tp;
function setLang(l) {
  LANG = l;
  sv("uymap_lang", l);
  document.documentElement.lang = l;
  applyLang();
}
let THEME = g("uymap_theme", null);
function applyTheme() {
  if (THEME) document.documentElement.setAttribute("data-theme", THEME);
  else document.documentElement.removeAttribute("data-theme");
  const b = $("#tt");
  if (b) b.innerHTML = ic(THEME == "dark" ? "sun" : "moon");
}
function toggleTheme() {
  const sysDark = matchMedia("(prefers-color-scheme: dark)").matches;
  const curDark = THEME ? THEME == "dark" : sysDark;
  THEME = curDark ? "light" : "dark";
  sv("uymap_theme", THEME);
  applyTheme();
}

/* ---------- 3) Ma'lumotlar ---------- */
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
    t2 = T[i % 5],
    big = t2 == "Hovli" || t2 == "Villa",
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
    price,
    old: i % 4 == 0 ? Math.round((price * 1.15) / 500) * 500 : 0,
    lat: d[1] + (R() - 0.5) * 0.03,
    lng: d[2] + (R() - 0.5) * 0.04,
    rooms,
    area,
    type: t2,
    cat:
      t2 == "Yangi uy"
        ? "new"
        : t2 == "Eski uy"
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
      t2 == "Eski uy"
        ? 1970 + (i % 25)
        : t2 == "Yangi uy"
          ? 2023 + (i % 4)
          : 2000 + (i % 22),
    sale: i % 4 == 0,
    date: Date.now() - i * 864e5,
    phone: "+998 90 123 45 " + (10 + i),
    big,
  });
}
let UP = g("uymap_props", []),
  P = [...base, ...UP];
const pTitle = (p) =>
  p.title ||
  (p.big
    ? t("titleBig")(typeLabel(p.type), p.area, p.dist)
    : t("titleSmall")(p.rooms, typeLabel(p.type), p.dist));
const pDesc = (p) => p.desc || t("descTpl")(p.dist);
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
  ["home", "all"],
  ["list", "all"],
  ["map", "all"],
  ["map", "sale"],
  ["map", "new"],
  ["map", "old"],
  ["map", "vov"],
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
/* ---------- 4) Xarita ---------- */
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
  const dark = THEME
    ? THEME == "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  x.fillStyle = dark ? "#16241d" : "#eaf0ec";
  x.fillRect(0, 0, w, h);
  const t = un(a - w / 2, b - h / 2, z),
    o = un(a + w / 2, b + h / 2, z),
    st = z > 13 ? 0.005 : z > 11.5 ? 0.01 : 0.05;
  x.lineWidth = 1;
  x.strokeStyle = dark ? "#233229" : "#d9e4dd";
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
  x.strokeStyle = dark ? "#1d3a52" : "#bcd9ee";
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
  x.strokeStyle = dark ? "#2a2a2a" : "#fff";
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
    x.fillStyle = dark ? "rgba(34,197,94,.16)" : "rgba(22,163,74,.11)";
    x.fill();
    if (z > 10.5) {
      x.fillStyle = dark ? "#9fd6b8" : "#4d7566";
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
  if (!navigator.geolocation) return toast(t("toastGeoUnsupported"));
  toast(t("toastLocating"));
  navigator.geolocation.getCurrentPosition(
    (p) => {
      setQ({
        lat: p.coords.latitude,
        lng: p.coords.longitude,
        name:
          t("detBack") === "← Back"
            ? "My location"
            : t("detBack") === "← Назад"
              ? "Моё местоположение"
              : "Mening joylashuvim",
      });
    },
    () => toast(t("toastGeoFail")),
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
/* ---------- 5) Ro'yxat va filtrlar ---------- */
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
  return `<div class="c ${p.id == S.sel ? "sel" : ""}" data-a="det" data-id="${p.id}"><div class="im"><img loading="lazy" alt="${pTitle(p)}" src="${im(p)}">${p.sale ? `<span class="tag">-${Math.round((1 - p.price / p.old) * 100)}%</span>` : ""}</div><div class="cb"><div class="pr">${$$(p.price)}${p.old ? `<s>${$$(p.old)}</s>` : ""}</div><b style="font-size:14px">${pTitle(p)}</b><div class="mu">${ic("pin")} ${p.addr}${p.km != null ? ` · ${p.km.toFixed(1)} km` : ""}</div><div class="mu">${ic("bed")} ${p.rooms} ${t("roomsWord")} · ${ic("area")} ${p.area} m² · ${ic("floor")} ${p.floor}/${p.fl2} ${t("floorWord")} · ${typeLabel(p.type)}</div><div class="ac"><button class="b p" data-a="det" data-id="${p.id}">${t("detTitle")}</button><button class="b" data-a="fav" data-id="${p.id}">${favT(fv)}</button><button class="b" data-a="map" data-id="${p.id}">${t("detMapBtn")}</button></div></div></div>`;
}
function navLabel(i) {
  const n = NV[i],
    map = {
      home: t("navHome"),
      list: t("navList"),
      map: [t("navMap"), t("navSale"), t("navNew"), t("navOld"), t("navVov")][
        [0, 1, 2, 3, 4, 5, 6].indexOf(i) >= 3 ? i - 2 : 0
      ],
    };
  return [
    t("navHome"),
    t("navList"),
    t("navMap"),
    t("navSale"),
    t("navNew"),
    t("navOld"),
    t("navVov"),
  ][i];
}
function navDesc(i) {
  return [
    t("navDescAll"),
    t("navDescAll"),
    t("navDescMap"),
    t("navDescSale"),
    t("navDescNew"),
    t("navDescOld"),
    t("navDescVov"),
  ][i];
}
function list() {
  const L = vis();
  $("#cnt").textContent = `${navDesc(S.nav)} · ${L.length} ${t("unitsSuffix")}`;
  $("#lh").textContent =
    (document.querySelector("#list.col") ? "▲ " : "▼ ") +
    L.length +
    " " +
    t("unitsSuffix");
  $("#qc").innerHTML = S.q
    ? `<button class="b" data-a="cq">${ic("pin")} ${S.q.name} · ${S.rad} km ✕</button>`
    : "";
  $("#cards").innerHTML = L.length
    ? L.map(card).join("")
    : `<div class="em" style="grid-column:1/-1"><div class="big">${ic("map")}</div><h3>${t("emptyTitle")}</h3><p>${t("emptyDesc")}</p><button class="b p" data-a="cf">${t("filterClear")}</button> ${S.q ? `<button class="b" data-a="rad">${t("expandRadius")}</button>` : ""}</div>`;
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
  m.innerHTML = `<img src="${im(p)}" alt=""><div style="flex:1;min-width:0"><div class="pr">${$$(p.price)}</div><div>${ic("bed")} ${p.rooms} ${t("roomsWord")} · ${ic("area")} ${p.area} m²</div><div class="mu">${ic("pin")} ${p.addr}</div><button class="b p" style="margin-top:6px" data-a="det" data-id="${p.id}">${t("detTitle")}</button></div><button class="x" data-a="cm">✕</button>`;
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
/* ---------- 6) Detail sahifa ---------- */
function openDet(id, nohash) {
  const p = P.find((x) => x.id == id);
  if (!p) return;
  if (!nohash) location.hash = "uy-" + id;
  const d = $("#det"),
    fv = S.fav.includes(id);
  const near = P.filter((x) => x.id != id)
    .map((x) => ({ ...x, km: hav(p.lat, p.lng, x.lat, x.lng) }))
    .sort((a, b) => a.km - b.km)
    .slice(0, 4);
  d.innerHTML = `<div class="dw"><button class="b" data-a="dc">${t("detBack")}</button><div class="dg" style="margin-top:12px"><div><div class="gal"><img id="gi" src="${im(p)}" alt=""><button class="n" style="left:10px" data-a="gp">‹</button><button class="n" style="right:10px" data-a="gn">›</button></div><div class="th">${Array.from(
    { length: nimg(p) },
    (_, i) => i,
  )
    .map(
      (i) =>
        `<img class="${i ? "" : "on"}" data-a="gt" data-k="${i}" src="${im(p, i)}" alt="">`,
    )
    .join("")}</div>
<h1 style="margin:16px 0 4px;font-size:26px">${pTitle(p)}</h1><div class="mu">${ic("pin")} ${p.addr}, Toshkent</div><div class="pr" style="font-size:28px;margin:8px 0">${$$(p.price)}${p.old ? `<s>${$$(p.old)}</s>` : ""}</div>
<div class="kv"><div>${t("detRooms")}<b>${p.rooms}</b></div><div>${t("detArea")}<b>${p.area} m²</b></div><div>${t("detFloor")}<b>${p.floor}/${p.fl2}</b></div><div>${t("detYear")}<b>${p.year}</b></div><div>${t("detType")}<b>${typeLabel(p.type)}</b></div></div>
<div class="box"><b>${t("detDesc")}</b><p style="color:var(--mu);line-height:1.6;margin:6px 0 0">${pDesc(p)}</p></div><h3>${t("detMapTitle")}</h3><canvas id="dm" style="width:100%;height:260px;border-radius:16px;display:block"></canvas></div>
<div><div class="box" style="position:sticky;top:12px"><b>${t("detContact")}</b><p class="mu">${t("detPhone")} ${p.phone}</p><a class="b p" style="display:block;text-align:center;text-decoration:none;margin-bottom:8px" href="tel:${p.phone.replace(/\s/g, "")}">${ic("phone")} ${t("detCall")}</a><button class="b" style="width:100%;margin-bottom:8px" data-a="chat" data-id="${id}">${ic("chat")} ${t("detChat")}</button><div class="ac"><button class="b" id="dfav" data-a="fav" data-id="${id}">${favT(fv)}</button><button class="b" data-a="sh">${t("detShare")}</button></div></div></div></div>
<h2>${t("detNearby")}</h2><div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));padding-bottom:30px">${near.map(card).join("")}</div></div>`;
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
/* ---------- 7) Kirish, profil, e'lon ---------- */
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
    : `<button class="b" data-a="login">${ic("user")} ${t("login")}</button> <button class="b" data-a="reg">${t("register")}</button>`;
}
const closeAp = () => $("#ap").classList.remove("o");
function authM(reg) {
  closeM();
  const ap = $("#ap");
  ap.innerHTML = `<div class="apw"><div class="apl"><div class="logo" style="font-size:30px">Uy<i>Map</i></div><h2 style="font-size:28px;margin:18px 0 6px">${t("authHeroTitle")}</h2><p>${t("authHeroDesc")}</p><ul><li>${ic("map")} ${t("authBullet1")}</li><li>${ic("heart")} ${t("authBullet2")}</li><li>${ic("home")} ${t("authBullet3")}</li></ul></div>
<div class="apr"><button class="b" data-a="apc" style="align-self:flex-end">${t("authClose")}</button><div class="apf"><h1 style="margin:0 0 4px">${reg ? t("authRegTitle") : t("authLoginTitle")}</h1><p class="mu">${reg ? t("authRegSub") : t("authLoginSub")}</p><div class="tabs"><button class="b ${reg ? "" : "p"}" data-a="login">${t("authLoginTitle")}</button><button class="b ${reg ? "p" : ""}" data-a="reg">${t("authRegTitle")}</button></div>
<form class="mf" id="af">${reg ? `<label>${t("authName")}<input name="n" required></label>` : ""}<label>${t("authEmail")}<input name="e" type="email" required></label><label>${t("authPass")}<input name="p" id="pwi" type="password" minlength="4" required></label><label style="display:flex;gap:6px;align-items:center"><input type="checkbox" id="pws" style="width:auto"> ${t("authShowPass")}</label><button class="b p">${reg ? t("authRegTitle") : t("authLoginTitle")}</button><button type="button" class="b" data-a="demo" style="padding:11px">${t("authDemo")}</button></form><p class="mu" style="font-size:12px;margin-top:14px">${t("authNote")}</p></div></div></div>`;
  ap.classList.add("o");
  $("#pws").onchange = (e) =>
    ($("#pwi").type = e.target.checked ? "text" : "password");
  $("#af").onsubmit = (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target)),
      us = g("uymap_users", []);
    if (reg) {
      if (us.some((u) => u.e == f.e)) return toast(t("toastEmailExists"));
      us.push(f);
      sv("uymap_users", us);
      S.me = { name: f.n, e: f.e };
    } else {
      const u = us.find((u) => u.e == f.e && u.p == f.p);
      if (!u) return toast(t("toastWrongCred"));
      S.me = { name: u.n, e: u.e };
    }
    sv("uymap_me", S.me);
    authUI();
    closeAp();
    toast(t("toastWelcome")(S.me.name));
  };
}
function profM() {
  const my = P.filter((p) => p.owner == S.me.e),
    fv = P.filter((p) => S.fav.includes(p.id)),
    gr = (l) =>
      l.length
        ? `<div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fill,minmax(270px,1fr))">${l.map(card).join("")}</div>`
        : `<p class="mu">${t("emptyList")}</p>`;
  $("#ap").innerHTML =
    `<div class="pw"><div class="row" style="justify-content:space-between"><button class="b" data-a="apc">${t("profBack")}</button><button class="b" data-a="out">${t("logout")}</button></div><div class="row" style="gap:14px;margin:16px 0"><div class="av">${S.me.name[0].toUpperCase()}</div><div><h1 style="margin:0">${S.me.name}</h1><div class="mu">${S.me.e}</div></div><button class="b p" style="margin-left:auto" data-a="add">${t("addProperty")}</button></div><h2>${t("myListings")} (${my.length})</h2>${gr(my)}<h2 style="margin-top:24px">${t("savedTitle")} (${fv.length})</h2>${gr(fv)}</div>`;
  $("#ap").classList.add("o");
  $("#ap").scrollTop = 0;
}
function addM() {
  if (!S.me) {
    toast(t("toastLoginFirst"));
    return authM(false);
  }
  modal(
    `<h3 style="margin:0">${t("addFormTitle")}</h3><form class="mf" id="pf"><label>${t("addTitleLbl")}<input name="title" required></label><div class="g2"><label>${t("addTypeLbl")}<select name="type">${T.map((tp) => `<option value="${tp}">${typeLabel(tp)}</option>`).join("")}</select></label><label>${t("addDistLbl")}<select name="dist">${D.map((d) => `<option>${d[0]}</option>`).join("")}</select></label></div><label>${t("addStreetLbl")}<input name="st" required></label><div class="g2"><label>${t("addPriceLbl")}<input name="price" type="number" min="1000" required></label><label>${t("addAreaLbl")}<input name="area" type="number" min="10" required></label><label>${t("addRoomsLbl")}<input name="rooms" type="number" min="1" value="2" required></label><label>${t("addFloorLbl")}<input name="floor" type="number" min="1" value="1"></label></div><label>${t("addPhoneLbl")}<input name="phone" required value="+998 "></label><label>${t("addDescLbl")}<textarea name="desc" rows="3"></textarea></label><button class="b p" style="padding:11px">${t("addSubmit")}</button></form>`,
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
      desc: f.desc || t("defaultDesc"),
    };
    UP.push(p);
    sv("uymap_props", UP);
    P = [...base, ...UP];
    closeM();
    S.q = null;
    S.cat = "all";
    setNav(2, true);
    toast(t("toastListed"));
    pick(p.id, true);
  };
}
/* ---- chat ---- */
function chatKey(pid) {
  return "uymap_chat_" + pid;
}
function chatMsgs(pid) {
  return g(chatKey(pid), []);
}
function chatSave(pid, msgs) {
  sv(chatKey(pid), msgs);
}
function chatRenderList(pid) {
  const L = chatMsgs(pid),
    box = $("#cmlist");
  if (!box) return;
  box.innerHTML = L.length
    ? L.map(
        (m) =>
          `<div class="cmsg ${m.from}"><div class="bub">${m.text}</div></div>`,
      ).join("")
    : `<div class="mu" style="text-align:center;padding:20px 0">${t("chatEmpty")}</div>`;
  box.scrollTop = box.scrollHeight;
}
function openChat(id) {
  const p = P.find((x) => x.id == id);
  if (!p) return;
  if (!S.me) {
    toast(t("chatLoginFirst"));
    return authM(false);
  }
  closeDet();
  const pid = p.id;
  let L = chatMsgs(pid);
  if (!L.length) {
    L = [{ from: "seller", text: t("chatSellerIntro") }];
    chatSave(pid, L);
  }
  modal(
    `<div class="row" style="margin-bottom:8px"><b>${t("chatWith")(p.owner ? p.owner.split("@")[0] : "UyMap seller")}</b><button class="b" data-a="cclose" style="margin-left:auto">✕</button></div><div id="cmlist" class="cmlist"></div><form id="cform" class="row" style="gap:6px;margin-top:10px"><input id="cmsg" autocomplete="off" placeholder="${t("chatPh")}" style="flex:1;padding:10px 13px;border-radius:12px;border:1px solid var(--bd);background:var(--cd);color:var(--tx);font:inherit;font-size:14px"><button class="b p" style="padding:0 14px" aria-label="${t("chatSend")}">${ic("send")}</button></form>`,
  );
  $("#md")._pid = pid;
  chatRenderList(pid);
  $("#cform").onsubmit = (e) => {
    e.preventDefault();
    const inp = $("#cmsg"),
      v = inp.value.trim();
    if (!v) return;
    const L2 = chatMsgs(pid);
    L2.push({ from: "me", text: v });
    chatSave(pid, L2);
    inp.value = "";
    chatRenderList(pid);
    setTimeout(
      () => {
        const L3 = chatMsgs(pid);
        L3.push({
          from: "seller",
          text: t("chatSellerReplies")[
            Math.floor(Math.random() * t("chatSellerReplies").length)
          ],
        });
        chatSave(pid, L3);
        if ($("#md").classList.contains("o") && $("#md")._pid == pid)
          chatRenderList(pid);
      },
      900 + Math.random() * 900,
    );
  };
}
/* ---------- 8) Qidiruv va navigatsiya ---------- */
function idx() {
  const a = D.map((d) => ({
    k: "pin",
    t: d[0],
    s: t("searchDistrictLabel"),
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
      t: pTitle(p),
      s: p.addr,
      id: p.id,
      lat: p.lat,
      lng: p.lng,
    }),
  );
  T.forEach((tp) =>
    a.push({ k: "tag", t: typeLabel(tp), s: t("searchTypeLabel"), type: tp }),
  );
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
      t: t("searchPricePrefix")($$(n)),
      s: t("searchPriceLabel"),
      price: n,
    });
  }
  hi = 0;
  dd.innerHTML = SG.length
    ? SG.map(
        (i, n) =>
          `<div class="${n ? "" : "h"}" data-n="${n}">${ic(i.k)} ${i.t}<small>${i.s}</small></div>`,
      ).join("")
    : `<div>${t("searchNoResults")}</div>`;
  dd.style.display = "block";
}
function chosen(i) {
  $("#dd").style.display = "none";
  qi.value = i.type ? "" : i.price ? "" : i.t;
  if (i.type) {
    S.f.type = i.type;
    $("#ftp").value = i.type;
    toast(t("toastFilterType")(typeLabel(i.type)));
    render();
    return;
  }
  if (i.price) {
    S.f.max = i.price;
    $("#fmx").value = i.price;
    toast(t("toastMaxPrice")($$(i.price)));
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
  toast(n ? t("toastFoundNear")(n, S.rad) : t("toastNoResultsNear"));
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
    SG[hi] ? chosen(SG[hi]) : toast(t("toastAddrNotFound"));
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
  S.cat = n[1];
  if (!keep) S.q = null;
  document.body.className = "v-" + n[0];
  $("#nv")
    .querySelectorAll("a")
    .forEach((a, k) => a.classList.toggle("on", k == i));
  $("#list").classList.remove("col");
  setTimeout(() => {
    resize();
    if (n[1] != "all" && n[0] == "map") fit(fl());
  }, 60);
}
function renderChrome() {
  $("#q").placeholder = t("searchPh");
  $("#heroT").textContent = t("heroTitle");
  $("#heroD").textContent = t("heroDesc");
  $("#nv").innerHTML = NV.map(
    (n, i) =>
      `<a data-a="nav" data-i="${i}" class="${i == S.nav ? "on" : ""}">${navLabel(i)}</a>`,
  ).join("");
  $("#so").innerHTML =
    `<option value="new">${t("sortNew")}</option><option value="pa">${t("sortPa")}</option><option value="pd">${t("sortPd")}</option><option value="ar">${t("sortAr")}</option>`;
  $("#so").value = S.sort;
  $("#ft").textContent = t("filterBtn");
  $("#ftp").innerHTML =
    `<option value="">${t("filterType")}</option>` +
    T.map((tp) => `<option value="${tp}">${typeLabel(tp)}</option>`).join("");
  $("#ftp").value = S.f.type || "";
  $("#fds").innerHTML =
    `<option value="">${t("filterDist")}</option>` +
    D.map((d) => `<option>${d[0]}</option>`).join("");
  $("#fds").value = S.f.dist || "";
  $("#frm").querySelector('option[value=""]').textContent = t("filterRooms");
  $("#fct").innerHTML = `<option value="Tashkent">${t("filterCity")}</option>`;
  $("#fmn").placeholder = t("priceMin");
  $("#fmx").placeholder = t("priceMax");
  $("#fan").placeholder = t("areaMin");
  $("#fax").placeholder = t("areaMax");
  $("#fc").textContent = t("filterClear");
  $("#pop").innerHTML = D.map(
    (d, i) =>
      `<span class="chip" data-a="loc" data-i="${i}">${ic("pin")} ${d[0]}</span>`,
  ).join("");
  $("#feat").innerHTML = [...P]
    .sort((a, b) => b.price - a.price)
    .slice(0, 6)
    .map(
      (p) =>
        `<div class="fc" data-a="det" data-id="${p.id}"><img src="${im(p)}" alt=""><div><b>${sh(p.price)}</b>${p.rooms} ${t("roomsWord")} · ${p.dist}</div></div>`,
    )
    .join("");
  $("#adt").textContent = t("addProperty");
  $("#lgl").textContent = LANG.toUpperCase();
  $("#lgl").title = t("langLabel");
  $("#tt").title = t("themeLabel");
  $("#zi").setAttribute("aria-label", "Zoom in");
  $("#zo").setAttribute("aria-label", "Zoom out");
  $("#lc").setAttribute("aria-label", t("themeLabel"));
  authUI();
}
function applyLang() {
  renderChrome();
  applyTheme();
  list();
  if (document.getElementById("det") && $("#det").classList.contains("o")) {
    const m = location.hash.match(/uy-(p\d+)/);
    if (m) openDet(m[1], 1);
  }
}
$("#tt").onclick = toggleTheme;
$("#lgl").onclick = () => {
  const order = ["uz", "ru", "en"];
  setLang(order[(order.indexOf(LANG) + 1) % order.length]);
};
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
$("#so").addEventListener("change", (e) => {
  S.sort = e.target.value;
  list();
});
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
  if (S.favOnly && !S.fav.length) toast(t("toastNoFav"));
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
    toast(i < 0 ? t("toastFavAdd") : t("toastFavRem"));
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
          () => toast(t("toastLinkCopied")),
          () => toast(u),
        )
      : toast(u);
  } else if (a == "chat") openChat(id);
  else if (a == "cclose") closeM();
  else if (a == "prof") profM();
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
    toast(t("toastDemoLogin"));
  } else if (a == "login") authM(false);
  else if (a == "reg") authM(true);
  else if (a == "out") {
    S.me = null;
    sv("uymap_me", null);
    authUI();
    closeAp();
    toast(t("toastLoggedOut"));
  }
});
document.documentElement.lang = LANG;
applyTheme();
renderChrome();
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
