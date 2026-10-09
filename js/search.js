/* Buscador: normaliza tildes y mayúsculas, entiende números de artículo,
   frases entre comillas y filtros por título. Trabaja sobre el texto íntegro. */
(function (root) {
  "use strict";

  var STOP = { de: 1, la: 1, el: 1, los: 1, las: 1, y: 1, en: 1, a: 1, que: 1, del: 1, al: 1, o: 1, un: 1, una: 1, se: 1, por: 1, con: 1, para: 1, su: 1, sus: 1, es: 1, lo: 1 };
  var cache = null;

  function norm(s) {
    return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }

  function esc(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function bodyText(art) {
    return art.cuerpo.map(function (p) { return Array.isArray(p) ? p[0] + p[1] : p; }).join("\n");
  }

  function tituloDe(n) {
    var T = root.LEY594.titulos;
    for (var i = 0; i < T.length; i++) if (n >= T[i].desde && n <= T[i].hasta) return T[i];
    return null;
  }

  function build() {
    if (cache) return cache;
    cache = root.LEY594.articulos.map(function (a) {
      var body = bodyText(a).replace(/\n/g, " ");
      return { n: a.n, titulo: a.titulo || "", body: body, nBody: norm(body), nTitle: norm(a.titulo || ""), tituloId: tituloDe(a.n).id };
    });
    return cache;
  }

  function countOf(hay, needle) {
    if (!needle) return 0;
    var c = 0, i = hay.indexOf(needle);
    while (i !== -1) { c++; i = hay.indexOf(needle, i + needle.length); }
    return c;
  }

  /* Devuelve { numero, terminos, frases } para una consulta. */
  function parseQuery(q, opts) {
    opts = opts || {};
    var raw = String(q || "").trim();
    var nq = norm(raw);
    var out = { raw: raw, numero: null, terminos: [], frases: [] };
    if (!raw) return out;

    var m = nq.match(/^(?:art(?:iculos?)?\.?\s*)?(\d{1,2})\s*[º°o]?\.?$/);
    if (m) out.numero = parseInt(m[1], 10);

    if (opts.mode === "frase") {
      out.frases.push(nq.replace(/\s+/g, " "));
      return out;
    }
    var rest = nq.replace(/"([^"]+)"/g, function (_, ph) {
      var t = ph.trim().replace(/\s+/g, " ");
      if (t) out.frases.push(t);
      return " ";
    });
    var toks = rest.split(/[^a-z0-9ñ]+/).filter(Boolean);
    var util = toks.filter(function (t) { return !STOP[t]; });
    /* Plural sencillo: "archivos" busca "archivo" y "entidades" busca "entidad". */
    function singular(w) {
      if (w.length > 5 && /es$/.test(w)) return w.slice(0, -2);
      if (w.length > 4 && /s$/.test(w)) return w.slice(0, -1);
      return w;
    }
    out.terminos = (util.length ? util : toks).map(singular).filter(function (t, i, arr) { return arr.indexOf(t) === i; });
    return out;
  }

  function allTerms(pq) {
    return pq.frases.concat(pq.terminos);
  }

  function search(q, opts) {
    opts = opts || {};
    var pq = parseQuery(q, opts);
    var idx = build();
    var terms = allTerms(pq);
    var res = { query: pq, terms: terms, hits: [] };
    if (!pq.raw) return res;

    var any = opts.mode === "cualquiera";
    for (var i = 0; i < idx.length; i++) {
      var e = idx[i];
      if (opts.titulo && String(e.tituloId) !== String(opts.titulo)) continue;
      var score = 0, matched = 0, isNum = pq.numero === e.n;
      for (var f = 0; f < pq.frases.length; f++) {
        var ph = pq.frases[f];
        var cb = countOf(e.nBody, ph), ct = countOf(e.nTitle, ph);
        if (cb + ct > 0) { matched++; score += 8 + ct * 10 + Math.min(cb, 5) * 3; }
      }
      for (var t = 0; t < pq.terminos.length; t++) {
        var term = pq.terminos[t];
        var cb2 = countOf(e.nBody, term), ct2 = countOf(e.nTitle, term);
        if (cb2 + ct2 > 0) {
          matched++;
          score += (ct2 ? 10 : 0) + Math.min(cb2, 6) * 2;
          if (new RegExp("\\b" + esc(term)).test(e.nBody)) score += 2;
        }
      }
      var need = any ? 1 : terms.length;
      var ok = terms.length > 0 && matched >= need;
      if (isNum) { score += 1000; ok = true; }
      if (ok) res.hits.push({ n: e.n, score: score, tituloId: e.tituloId, porNumero: isNum });
    }
    if (opts.orden === "numero") res.hits.sort(function (a, b) { return a.n - b.n; });
    else res.hits.sort(function (a, b) { return b.score - a.score || a.n - b.n; });
    return res;
  }

  /* Fragmento con contexto alrededor de la primera coincidencia. */
  function snippet(n, terms, len) {
    var e = build()[n - 1];
    len = len || 220;
    var first = -1;
    for (var i = 0; i < terms.length; i++) {
      var p = e.nBody.indexOf(terms[i]);
      if (p !== -1 && (first === -1 || p < first)) first = p;
    }
    var start = first === -1 ? 0 : Math.max(0, first - 70);
    var end = Math.min(e.body.length, start + len);
    if (start > 0) { var sp = e.body.indexOf(" ", start); if (sp !== -1 && sp < first) start = sp + 1; }
    if (end < e.body.length) { var sp2 = e.body.lastIndexOf(" ", end); if (sp2 > start) end = sp2; }
    return (start > 0 ? "… " : "") + e.body.slice(start, end) + (end < e.body.length ? " …" : "");
  }

  /* Rangos [ini, fin) de coincidencias en un texto, sin importar tildes. */
  function ranges(text, terms) {
    var nt = norm(text), out = [];
    terms.forEach(function (term) {
      if (!term) return;
      var i = nt.indexOf(term);
      while (i !== -1) {
        var end = i + term.length;
        while (end < nt.length && /[a-z0-9ñ]/.test(nt.charAt(end))) end++; /* resalta la palabra completa (plurales) */
        out.push([i, end]);
        i = nt.indexOf(term, end);
      }
    });
    out.sort(function (a, b) { return a[0] - b[0] || b[1] - a[1]; });
    var merged = [];
    out.forEach(function (r) {
      var last = merged[merged.length - 1];
      if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
      else merged.push([r[0], r[1]]);
    });
    return merged;
  }

  root.Search = { norm: norm, parseQuery: parseQuery, search: search, snippet: snippet, ranges: ranges, tituloDe: tituloDe, bodyText: bodyText };
  if (typeof module !== "undefined" && module.exports) module.exports = root.Search;
})(typeof window !== "undefined" ? window : globalThis);
