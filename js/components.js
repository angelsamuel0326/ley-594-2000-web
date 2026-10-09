/* Componentes reutilizables: constructor de nodos, resaltado, copiado y avisos. */
(function (root) {
  "use strict";

  function h(tag, props) {
    var node = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach(function (k) {
        var v = props[k];
        if (v == null || v === false) return;
        if (k === "class") node.className = v;
        else if (k === "text") node.textContent = v;
        else if (k.slice(0, 2) === "on" && typeof v === "function") node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v === true ? "" : v);
      });
    }
    for (var i = 2; i < arguments.length; i++) append(node, arguments[i]);
    return node;
  }

  function append(node, kid) {
    if (kid == null || kid === false) return;
    if (Array.isArray(kid)) kid.forEach(function (k) { append(node, k); });
    else if (typeof kid === "string" || typeof kid === "number") node.appendChild(document.createTextNode(String(kid)));
    else node.appendChild(kid);
  }

  function ordinal(n) { return n < 10 ? n + "º" : String(n); }
  function artLabel(n) { return "Artículo " + ordinal(n); }

  /* Texto con coincidencias envueltas en <mark>, sin usar innerHTML. */
  function highlight(text, terms) {
    if (!terms || !terms.length) return [text];
    var rs = root.Search.ranges(text, terms), out = [], pos = 0;
    rs.forEach(function (r) {
      if (r[0] > pos) out.push(text.slice(pos, r[0]));
      out.push(h("mark", { text: text.slice(r[0], r[1]) }));
      pos = r[1];
    });
    if (pos < text.length) out.push(text.slice(pos));
    return out;
  }

  /* Cuerpo del artículo: párrafos, literales, parágrafos y definiciones. */
  function articleBody(art, terms) {
    var wrap = h("div", { class: "lex" });
    art.cuerpo.forEach(function (p) {
      if (Array.isArray(p)) {
        wrap.appendChild(h("p", { class: "def" }, h("strong", { class: "term" }, highlight(p[0], terms)), highlight(p[1], terms)));
        return;
      }
      var m;
      if ((m = p.match(/^(PARÁGRAFO(?: \d+º)?\.)([\s\S]*)$/))) {
        wrap.appendChild(h("p", { class: "par" }, h("strong", { class: "label" }, m[1]), highlight(m[2], terms)));
      } else if ((m = p.match(/^([a-z]\))\s([\s\S]*)$/))) {
        wrap.appendChild(h("p", { class: "lit" }, h("span", { class: "lit-key" }, m[1]), h("span", { class: "lit-txt" }, highlight(m[2], terms))));
      } else {
        wrap.appendChild(h("p", null, highlight(p, terms)));
      }
    });
    return wrap;
  }

  function toast(msg) {
    var t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { t.classList.remove("show"); }, 2400);
  }

  /* Copia con clipboard; si el visor lo rechaza, muestra el texto seleccionado. */
  function copyText(text, okMsg) {
    function manual() {
      var box = document.getElementById("manual-copy");
      if (box) box.remove();
      var input = h("input", { class: "manual-input", type: "text", readonly: true, value: text, "aria-label": "Texto para copiar" });
      box = h("div", { id: "manual-copy", class: "manual-copy", role: "dialog", "aria-label": "Copiar manualmente" },
        h("span", { text: "Selecciona y copia (Ctrl+C):" }), input,
        h("button", { type: "button", class: "btn", onclick: function () { box.remove(); }, text: "Cerrar" }));
      document.body.appendChild(box);
      input.focus(); input.select();
    }
    function legacy() {
      try {
        var ta = h("textarea", { "aria-hidden": "true", style: "position:fixed;opacity:0;top:0;left:0" });
        ta.value = text; document.body.appendChild(ta); ta.select();
        var ok = document.execCommand && document.execCommand("copy");
        ta.remove();
        if (ok) toast(okMsg || "Copiado"); else manual();
      } catch (e) { manual(); }
    }
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { toast(okMsg || "Copiado"); }, legacy);
        return;
      }
    } catch (e) { /* cae al respaldo */ }
    legacy();
  }

  root.UI = { h: h, ordinal: ordinal, artLabel: artLabel, highlight: highlight, articleBody: articleBody, toast: toast, copyText: copyText };
})(typeof window !== "undefined" ? window : globalThis);
