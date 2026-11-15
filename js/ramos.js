/* ==========================================================
   Ramos de oliveira (SVG gerado) — usados no cartão e no envelope.
   Versão limpa: talo fino, folhas estreitas e pontudas em verde-oliva
   acinzentado, nervura central clara, em posições irregulares.
   ========================================================== */
(() => {
  "use strict";

  function rng(seed) { // mulberry32
    return () => { seed |= 0; seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }

  // id = prefixo único dos gradientes; len = comprimento do talo; bend = curvatura
  function oliveira(id, seed, len, bend) {
    const r = rng(seed), f = (n) => n.toFixed(1);
    const P0 = [0, 0], C1 = [len * 0.5, len * bend], P1 = [len, len * 0.08];
    const pt = (t) => [(1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * C1[0] + t * t * P1[0], (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * C1[1] + t * t * P1[1]];
    const tan = (t) => Math.atan2(2 * (1 - t) * (C1[1] - P0[1]) + 2 * t * (P1[1] - C1[1]), 2 * (1 - t) * (C1[0] - P0[0]) + 2 * t * (P1[0] - C1[0]));
    const deg = (a) => (a * 180) / Math.PI;

    // folha de oliveira: lanceolada, ponta fina, levemente curvada; s = tamanho, a = direção em graus
    const leaf = (x, y, a, s, tone) => `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(a)})">
      <path d="M0 0 L${f(s * 0.2)} 0" stroke="#8a8a62" stroke-width="1" stroke-linecap="round"/>
      <g transform="translate(${f(s * 0.18)} 0)">
        <path d="M0 0 C${f(s * 0.3)} ${f(-s * 0.5)} ${f(s * 1.7)} ${f(-s * 0.46)} ${f(s * 2.6)} ${f(s * 0.1)} C${f(s * 1.7)} ${f(s * 0.4)} ${f(s * 0.3)} ${f(s * 0.46)} 0 0Z" fill="url(#${id}g${tone})"/>
        <path d="M${f(s * 0.08)} 0 Q${f(s * 1.3)} ${f(-s * 0.04)} ${f(s * 2.45)} ${f(s * 0.09)}" fill="none" stroke="#f1f4e6" stroke-opacity=".5" stroke-width=".8" stroke-linecap="round"/>
      </g></g>`;

    // talo fino e que afina para a ponta
    const N = 28, L = [], R = [];
    for (let i = 0; i <= N; i++) {
      const t = i / N, [x, y] = pt(t), a = tan(t), w = 2.1 * (1 - 0.7 * t) + 0.45;
      L.push([x - Math.sin(a) * w, y + Math.cos(a) * w]); R.push([x + Math.sin(a) * w, y - Math.cos(a) * w]);
    }
    const stem = `<path d="M${L.map((p) => f(p[0]) + " " + f(p[1])).join(" L")} L${R.reverse().map((p) => f(p[0]) + " " + f(p[1])).join(" L")}Z" fill="url(#${id}s)"/>`;

    // folhas em posições irregulares: ora par, ora folha solitária; tamanhos e ângulos variados
    let leaves = "", t = 0.12, n = 0;
    const gap = 22 / len; // espaço mínimo entre nós
    while (t < 0.92) {
      const [x, y] = pt(t), a = deg(tan(t)), sz = 12.5 + 6.5 * (1 - t) + r() * 2.5;
      const modo = r();
      const lados = modo < 0.58 ? [-1, 1] : [modo < 0.79 ? -1 : 1];
      lados.forEach((side, k) => {
        const ang = a + side * (30 + r() * 28);
        leaves += leaf(x, y, ang, sz * (k ? 0.8 + r() * 0.18 : 0.94 + r() * 0.12), (n + k) % 2);
      });
      n++; t += gap + r() * 0.035;
    }
    const [tx, ty] = pt(1);
    leaves += leaf(tx, ty, deg(tan(1)) + (r() - 0.5) * 18, 11, 0);

    const defs = `<defs>
      <linearGradient id="${id}s" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="${len}" y2="0"><stop offset="0" stop-color="#76694a"/><stop offset="1" stop-color="#8a8a62"/></linearGradient>
      <linearGradient id="${id}g0" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8b9b6d"/><stop offset="1" stop-color="#a8b48f"/></linearGradient>
      <linearGradient id="${id}g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a8c60"/><stop offset="1" stop-color="#9aa883"/></linearGradient>
      <filter id="${id}f" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx=".4" dy="1" stdDeviation=".9" flood-color="#2f3a1c" flood-opacity=".14"/></filter>
    </defs>`;
    // (ox, oy) = onde o talo nasce dentro do SVG; o grupo .sway balança em torno desse ponto
    const ox = 40, oy = len * 0.45;
    return { ox, oy, w: len + 100, h: len * 0.95, svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-ox} ${-oy} ${len + 100} ${len * 0.95}" width="${len + 100}" height="${len * 0.95}" aria-hidden="true">${defs}<g class="sway" style="transform-origin:${ox}px ${oy}px"><g filter="url(#${id}f)">${stem}${leaves}</g></g></svg>` };
  }

  /* ---------- Ramos do cartão ----------
     tl desce pela borda esquerda, tr é pequeno no topo direito, bl fica no rodapé esquerdo.
     x/y = onde o talo nasce (px, a partir do canto indicado); ang = direção do ramo. */
  const TWIGS = {
    tl: { seed: 8,  len: 215, bend: 0.1,   ang: 66,  x: -12, y: 26 },
    tr: { seed: 15, len: 90,  bend: -0.12, ang: 108, x: 30,  y: -10, right: true },
    bl: { seed: 21, len: 150, bend: 0.1,   ang: -17, x: -14, y: 8,   bottom: true },
  };
  const twigs = [...document.querySelectorAll("[data-twig]")].map((el) => {
    const t = TWIGS[el.dataset.twig], o = oliveira("o" + el.dataset.twig, t.seed, t.len, t.bend);
    el.innerHTML = o.svg;
    Object.assign(el.style, { width: o.w + "px", height: o.h + "px", transformOrigin: o.ox + "px " + o.oy + "px" });
    if (t.right) el.style.right = (t.x + o.ox - o.w) + "px"; else el.style.left = (t.x - o.ox) + "px";
    if (t.bottom) el.style.bottom = (t.y + o.oy - o.h) + "px"; else el.style.top = (t.y - o.oy) + "px";
    return { el, ang: t.ang };
  });
  const fitTwigs = () => { // encolhe os ramos em telas estreitas para não cobrir o texto
    const w = (document.querySelector(".card") || document.body).clientWidth || 440;
    const sc = Math.max(0.62, Math.min(1, w / 540));
    twigs.forEach(({ el, ang }) => { el.style.transform = `rotate(${ang}deg) scale(${sc})`; });
  };
  fitTwigs(); window.addEventListener("resize", fitTwigs);

  /* ---------- Fundo da tela do envelope ---------- */
  const envBg = document.querySelector(".leaves-bg");
  if (envBg) [
    { s: 21, l: 300, css: "top:-30px;left:-60px;width:330px;transform:rotate(30deg)" },
    { s: 22, l: 260, css: "bottom:-40px;right:-70px;width:300px;transform:rotate(210deg)" },
    { s: 23, l: 220, css: "top:8%;right:-80px;width:230px;transform:scaleX(-1) rotate(20deg)" },
    { s: 24, l: 220, css: "bottom:6%;left:-90px;width:240px;transform:rotate(-24deg)" },
  ].forEach((b) => {
    const d = document.createElement("div"); d.className = "b"; d.style.cssText = b.css;
    d.innerHTML = oliveira("oe" + b.s, b.s, b.l, 0.12).svg;
    const sv = d.querySelector("svg"); sv.removeAttribute("width"); sv.removeAttribute("height");
    sv.style.width = "100%"; sv.style.height = "auto"; sv.style.overflow = "visible";
    envBg.append(d);
  });
})();
