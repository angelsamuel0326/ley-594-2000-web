/* Aplicación: rutas por ancla (#art-12, #titulo-4, #ley, #buscar, #info),
   índice, buscador con sugerencias, lector, página de artículo e información jurídica. */
(function () {
  "use strict";

  var L = window.LEY594, S = window.Search, U = window.UI, O = window.Otros, h = U.h;
  var view = document.getElementById("view");
  var tocEl = document.getElementById("toc");
  var state = { q: "", opts: { mode: "todas", titulo: "", orden: "relevancia" }, hl: [], view: "", token: null };

  /* Integrantes y los artículos que le corresponde a cada uno. */
  var EQUIPO = [
    { nombre: "Mariana", desde: 1, hasta: 3 },
    { nombre: "Celeste", desde: 4, hasta: 6 },
    { nombre: "Erika", desde: 7, hasta: 9 },
    { nombre: "Daniela", desde: 10, hasta: 13 },
    { nombre: "Harold", desde: 14, hasta: 17 },
    { nombre: "Isabella", desde: 18, hasta: 20 },
    { nombre: "Joel", desde: 20, hasta: 23 },
    { nombre: "Juan Manuel", nota: "Resumen de todos los artículos" }
  ];

  function artOf(n) { return L.articulos[n - 1]; }
  function tituloOf(n) { return S.tituloDe(n); }
  function tNombre(t) { return t.nombre.charAt(0) + t.nombre.slice(1).toLowerCase(); }

  /* ---------- Rutas ---------- */
  function parse(token) {
    var m;
    if (!token || token === "inicio") return { name: "home" };
    if (token === "ley") return { name: "reader" };
    if (token === "buscar") return { name: "search" };
    if (token === "info") return { name: "info" };
    if (token === "otros") return { name: "otros", tema: "" };
    if ((m = token.match(/^otros-(memorando|documento|radicador|foliar)$/))) return { name: "otros", tema: m[1] };
    if ((m = token.match(/^art-(\d{1,2})$/))) {
      var n = parseInt(m[1], 10);
      return n >= 1 && n <= L.articulos.length ? { name: "article", n: n } : { name: "missing" };
    }
    if ((m = token.match(/^titulo-(\d{1,2})$/))) {
      var id = parseInt(m[1], 10);
      return id >= 1 && id <= L.titulos.length ? { name: "reader", titulo: id } : { name: "missing" };
    }
    return { name: "missing" };
  }

  function currentToken() { return (location.hash || "").replace(/^#/, ""); }

  function go(token) {
    try { if (currentToken() !== token) location.hash = token; } catch (e) { /* el visor puede bloquearlo */ }
    route(token, true);
  }

  function route(token, force) {
    if (!force && token === state.token) return;
    state.token = token;
    var r = parse(token);
    state.view = r.name;
    view.textContent = "";
    closeDrawer();
    closeMenu();
    var views = { home: renderHome, reader: renderReader, article: renderArticle, search: renderSearch, info: renderInfo, otros: renderOtros, missing: renderMissing };
    views[r.name](r);
    document.body.classList.toggle("is-home", r.name === "home");
    markNav(r.name);
    setActiveToc(r.name === "article" ? r.n : null, r.titulo);
    if (!(r.name === "reader" && r.titulo)) { try { window.scrollTo(0, 0); } catch (e) { /* sin scroll */ } }
    var h1 = view.querySelector("h1");
    if (h1) { h1.setAttribute("tabindex", "-1"); }
  }

  function markNav(name) {
    if (otrosBtn) { if (name === "otros") otrosBtn.setAttribute("aria-current", "page"); else otrosBtn.removeAttribute("aria-current"); }
    document.querySelectorAll("[data-nav]").forEach(function (a) {
      var on = a.getAttribute("data-nav") === name || (name === "article" && a.getAttribute("data-nav") === "reader");
      if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
  }

  /* ---------- Menú «Otros temas» ---------- */
  var otrosBtn = document.getElementById("otros-btn");
  var otrosMenu = document.getElementById("otros-menu");
  var otrosDrop = document.getElementById("nav-drop");

  function menuLinks() { return Array.prototype.slice.call(otrosMenu.querySelectorAll("a")); }
  function menuIsOpen() { return !otrosMenu.hidden; }
  function openMenu(focus) {
    otrosMenu.hidden = false;
    otrosBtn.setAttribute("aria-expanded", "true");
    var links = menuLinks();
    if (focus === "first") links[0].focus();
    else if (focus === "last") links[links.length - 1].focus();
  }
  function closeMenu(returnFocus) {
    if (!menuIsOpen()) return;
    otrosMenu.hidden = true;
    otrosBtn.setAttribute("aria-expanded", "false");
    if (returnFocus) otrosBtn.focus();
  }
  function buildMenu() {
    otrosMenu.textContent = "";
    O.items.forEach(function (i) {
      otrosMenu.appendChild(h("li", null,
        h("a", { href: "#otros-" + i.id, "data-go": "otros-" + i.id },
          h("span", { class: "nm-title", text: i.titulo }),
          h("span", { class: "nm-desc", text: i.desc }))));
    });
  }
  otrosBtn.addEventListener("click", function () { if (menuIsOpen()) closeMenu(); else openMenu(); });
  otrosBtn.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { e.preventDefault(); openMenu("first"); }
    else if (e.key === "ArrowUp") { e.preventDefault(); openMenu("last"); }
  });
  otrosMenu.addEventListener("keydown", function (e) {
    var links = menuLinks(), i = links.indexOf(document.activeElement);
    if (e.key === "ArrowDown") { e.preventDefault(); links[(i + 1) % links.length].focus(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); links[(i - 1 + links.length) % links.length].focus(); }
    else if (e.key === "Home") { e.preventDefault(); links[0].focus(); }
    else if (e.key === "End") { e.preventDefault(); links[links.length - 1].focus(); }
    else if (e.key === "Escape") { e.preventDefault(); e.stopPropagation(); closeMenu(true); }
  });
  otrosDrop.addEventListener("focusout", function (e) {
    if (e.relatedTarget && !otrosDrop.contains(e.relatedTarget)) closeMenu();
  });
  document.addEventListener("click", function (e) { if (!otrosDrop.contains(e.target)) closeMenu(); });

  /* ---------- Piezas comunes ---------- */
  function link(token, children, cls) {
    return h("a", { href: "#" + token, class: cls || null, "data-go": token }, children);
  }

  function stamp() {
    return h("p", { class: "stamp" },
      h("span", { class: "stamp-state", text: "Estado en la fuente: " + L.meta.estadoFuente }),
      h("span", { class: "stamp-date", text: "Texto verificado el " + L.meta.verificado }));
  }

  function chipRow(n) {
    return h("span", { class: "art-chip", text: "Art. " + n });
  }

  /* ---------- Índice lateral ---------- */
  function buildToc() {
    tocEl.textContent = "";
    var menuBtn = h("button", { type: "button", class: "toc-menu-btn", id: "toc-menu-btn", "aria-expanded": "false", "aria-controls": "toc-menu", "aria-label": "Opciones del índice" },
      h("span", { class: "burger", "aria-hidden": "true" }));
    var menu = h("div", { class: "toc-menu", id: "toc-menu", hidden: true },
      h("div", { class: "toc-menu-actions" },
        h("button", { type: "button", class: "btn", id: "toc-open", text: "Abrir todo", onclick: function () { toggleAllToc(true); setTocMenu(false); } }),
        h("button", { type: "button", class: "btn", id: "toc-close", text: "Cerrar todo", onclick: function () { toggleAllToc(false); setTocMenu(false); } })),
      h("section", { class: "team", "aria-labelledby": "team-h" },
        h("h2", { id: "team-h", class: "team-title", text: "Integrantes" }),
        h("ul", { class: "team-list" }, EQUIPO.map(function (m) {
          if (!m.desde) {
            return h("li", { class: "team-row team-all" },
              h("span", { class: "team-name", text: m.nombre }),
              h("span", { class: "team-note", text: m.nota }));
          }
          return h("li", { class: "team-row" },
            h("span", { class: "team-name", text: m.nombre }),
            h("span", { class: "team-lead", "aria-hidden": "true" }),
            h("span", { class: "team-arts", text: "Arts. " + m.desde + " a " + m.hasta }));
        }))));
    function setTocMenu(open, returnFocus) {
      menu.hidden = !open;
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      if (!open && returnFocus) menuBtn.focus();
    }
    menuBtn.addEventListener("click", function () { setTocMenu(menu.hidden); });
    [menuBtn, menu].forEach(function (el) {
      el.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && !menu.hidden) { e.stopPropagation(); setTocMenu(false, true); }
      });
    });
    document.addEventListener("click", function (e) {
      if (!menu.hidden && !menu.contains(e.target) && !menuBtn.contains(e.target)) setTocMenu(false);
    });
    tocEl.appendChild(h("div", { class: "toc-head" },
      h("p", { class: "toc-title", text: "Índice" }), menuBtn, menu));
    var nav = h("nav", { "aria-label": "Títulos y artículos de la ley" });
    L.titulos.forEach(function (t) {
      var chips = h("div", { class: "toc-chips" });
      for (var n = t.desde; n <= t.hasta; n++) {
        chips.appendChild(h("a", { href: "#art-" + n, class: "toc-chip", "data-art": n, "data-toc": "art-" + n, title: artOf(n).titulo || U.artLabel(n), text: String(n) }));
      }
      nav.appendChild(h("details", { class: "toc-group", "data-titulo": t.id },
        h("summary", null,
          h("span", { class: "toc-num", text: t.num }),
          h("span", { class: "toc-name", text: tNombre(t) })),
        h("div", { class: "toc-range" },
          h("a", { href: "#titulo-" + t.id, "data-toc": "titulo-" + t.id, class: "toc-link", text: "Leer el título completo" }),
          h("span", { class: "toc-count", text: t.desde === t.hasta ? "Art. " + t.desde : "Arts. " + t.desde + " a " + t.hasta })),
        chips));
    });
    tocEl.appendChild(nav);
  }

  function toggleAllToc(open) {
    tocEl.querySelectorAll("details").forEach(function (d) { d.open = open; });
  }

  function setActiveToc(n, tituloId) {
    tocEl.querySelectorAll(".toc-chip.active").forEach(function (c) { c.classList.remove("active"); c.removeAttribute("aria-current"); });
    if (n) {
      var c = tocEl.querySelector('.toc-chip[data-art="' + n + '"]');
      if (c) {
        c.classList.add("active"); c.setAttribute("aria-current", "true");
        var d = c.closest("details"); if (d) d.open = true;
      }
    }
    if (tituloId) {
      var g = tocEl.querySelector('details[data-titulo="' + tituloId + '"]'); if (g) g.open = true;
    }
  }

  function openDrawer() { document.body.classList.add("drawer-open"); document.getElementById("toc-toggle").setAttribute("aria-expanded", "true"); }
  function closeDrawer() { document.body.classList.remove("drawer-open"); var b = document.getElementById("toc-toggle"); if (b) b.setAttribute("aria-expanded", "false"); }

  /* ---------- Buscador (formulario del encabezado + sugerencias) ---------- */
  var qInput = document.getElementById("q");
  var sugg = document.getElementById("suggest");
  var suggIndex = -1;

  function suggestions(q) {
    var res = S.search(q, { mode: "todas" });
    return { res: res, top: res.hits.slice(0, 6) };
  }

  function renderSuggest() {
    var q = qInput.value.trim();
    sugg.textContent = "";
    suggIndex = -1;
    if (!q) { sugg.hidden = true; qInput.setAttribute("aria-expanded", "false"); return; }
    var s = suggestions(q);
    if (!s.top.length) {
      sugg.appendChild(h("li", { class: "sg-empty", role: "presentation", text: "Sin coincidencias para esta búsqueda" }));
    } else {
      s.top.forEach(function (hit, i) {
        var a = artOf(hit.n);
        sugg.appendChild(h("li", { role: "option", id: "sg-" + i, "data-n": hit.n, onmousedown: function (ev) { ev.preventDefault(); state.hl = s.res.terms; sugg.hidden = true; go("art-" + hit.n); } },
          h("span", { class: "art-chip", text: "Art. " + hit.n }),
          h("span", { class: "sg-title", text: a.titulo || "El Sistema Nacional de Archivos" })));
      });
      sugg.appendChild(h("li", { class: "sg-all", role: "presentation", onmousedown: function (ev) { ev.preventDefault(); submitSearch(); } }, "Ver los " + s.res.hits.length + " resultados"));
    }
    sugg.hidden = false;
    qInput.setAttribute("aria-expanded", "true");
  }

  function moveSuggest(dir) {
    var items = sugg.querySelectorAll('li[role="option"]');
    if (!items.length) return;
    suggIndex = (suggIndex + dir + items.length) % items.length;
    items.forEach(function (it, i) { it.classList.toggle("sel", i === suggIndex); });
    qInput.setAttribute("aria-activedescendant", items[suggIndex].id);
  }

  function submitSearch() {
    state.q = qInput.value.trim();
    sugg.hidden = true;
    var res = S.search(state.q, state.opts);
    state.hl = res.terms;
    go("buscar");
  }

  qInput.addEventListener("input", renderSuggest);
  qInput.addEventListener("focus", function () { if (qInput.value.trim()) renderSuggest(); });
  qInput.addEventListener("blur", function () { setTimeout(function () { sugg.hidden = true; qInput.setAttribute("aria-expanded", "false"); }, 120); });
  qInput.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { e.preventDefault(); moveSuggest(1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); moveSuggest(-1); }
    else if (e.key === "Escape") { sugg.hidden = true; }
    else if (e.key === "Enter" && suggIndex >= 0) {
      e.preventDefault();
      var n = parseInt(sugg.querySelectorAll('li[role="option"]')[suggIndex].getAttribute("data-n"), 10);
      state.hl = S.search(qInput.value, { mode: "todas" }).terms; sugg.hidden = true; go("art-" + n);
    }
  });
  document.getElementById("search-form").addEventListener("submit", function (e) { e.preventDefault(); submitSearch(); });

  /* ---------- Inicio ---------- */
  function renderHome() {
    var jump = h("input", { id: "jump-n", class: "input num", type: "number", min: 1, max: L.articulos.length, inputmode: "numeric", placeholder: "1 a " + L.articulos.length, "aria-describedby": "jump-msg" });
    var msg = h("p", { id: "jump-msg", class: "form-msg", role: "status" });
    var form = h("form", { class: "jump", novalidate: true, onsubmit: function (e) {
      e.preventDefault();
      var n = parseInt(jump.value, 10);
      if (!(n >= 1 && n <= L.articulos.length)) { msg.textContent = "Escribe un número de artículo entre 1 y " + L.articulos.length + "."; return; }
      msg.textContent = ""; state.hl = []; go("art-" + n);
    } },
      h("label", { for: "jump-n", text: "Ir al artículo" }), jump,
      h("button", { type: "submit", class: "btn primary", text: "Abrir" }), msg);

    var temas = [
      ["tablas de retención", "Tablas de retención"],
      ["acceso consulta documentos", "Acceso y consulta"],
      ["multa sanción", "Multas y sanciones"],
      ["documentos históricos", "Documentos históricos"],
      ["servidores públicos", "Servidores públicos"],
      ["archivos privados", "Archivos privados"]
    ];

    view.appendChild(h("section", { class: "cover", "aria-labelledby": "cover-h" },
      h("div", { class: "cover-page" },
        h("p", { class: "cover-kicker", text: "República de Colombia" }),
        h("h1", { id: "cover-h", text: L.meta.nombreCorto }),
        h("p", { class: "cover-law", text: "Ley 594 del 14 de julio de 2000" }),
        h("p", { class: "lede", text: "Consulta el texto íntegro de los " + L.articulos.length + " artículos, navega por sus " + L.titulos.length + " títulos y busca por número, palabra o frase." }),
        stamp(),
        h("div", { class: "hero-actions" },
          link("ley", "Leer la ley completa", "btn primary"),
          link("info", "Fuentes y vigencia", "btn")),
        form),
      h("nav", { class: "cover-contents", "aria-labelledby": "h-tit" },
        h("h2", { id: "h-tit", text: "Contenido" }),
        h("ol", { class: "contents" }, L.titulos.map(function (t, i) {
          return h("li", { style: "--i:" + i },
            h("a", { href: "#titulo-" + t.id, "data-go": "titulo-" + t.id },
              h("span", { class: "c-num", text: t.num }),
              h("span", { class: "c-name", text: tNombre(t) }),
              h("span", { class: "c-lead", "aria-hidden": "true" }),
              h("span", { class: "c-arts", text: (t.desde === t.hasta ? "Art. " + t.desde : "Arts. " + t.desde + " a " + t.hasta) })));
        })))));

    view.appendChild(h("section", { class: "block", "aria-labelledby": "h-temas" },
      h("h2", { id: "h-temas", text: "Temas frecuentes" }),
      h("div", { class: "tags" }, temas.map(function (t) {
        return h("button", { type: "button", class: "tag", onclick: function () { qInput.value = t[0]; submitSearch(); }, text: t[1] });
      })),
      h("p", { class: "muted", text: L.meta.divisionNota })));
  }

  /* ---------- Lector ---------- */
  function renderReader(r) {
    view.appendChild(h("header", { class: "page-head" },
      h("h1", { text: "Ley 594 de 2000" }),
      h("p", { class: "muted", text: L.meta.nombre + "." }),
      stamp()));

    view.appendChild(h("div", { class: "preamble", "aria-label": "Encabezado de la ley" },
      L.preambulo.map(function (p, i) { return h("p", { class: i === 0 ? "pre-first" : null, text: p }); })));

    L.titulos.forEach(function (t) {
      var sec = h("section", { class: "titulo", id: "t-" + t.id, "aria-labelledby": "th-" + t.id });
      sec.appendChild(h("header", { class: "titulo-head" },
        h("span", { class: "titulo-roman", "aria-hidden": "true", text: t.num }),
        h("div", null,
          h("p", { class: "titulo-num", text: "Título " + t.num }),
          h("h2", { id: "th-" + t.id, text: tNombre(t) }))));
      for (var n = t.desde; n <= t.hasta; n++) sec.appendChild(readerArticle(artOf(n)));
      view.appendChild(sec);
    });

    view.appendChild(h("footer", { class: "closing", "aria-label": "Firmas y publicación" },
      L.cierre.map(function (p) { return h("p", { text: p }); })));

    if (r && r.titulo) {
      setTimeout(function () { var el = document.getElementById("t-" + r.titulo); if (el && el.scrollIntoView) el.scrollIntoView(); }, 0);
    }
    observeReader();
  }

  function readerArticle(a) {
    return h("article", { class: "art", id: "a-" + a.n, "data-art": a.n },
      h("div", { class: "art-margin", "aria-hidden": "true" },
        h("span", { class: "art-word", text: "Artículo" }),
        h("span", { class: "art-n", text: String(a.n) })),
      h("div", { class: "art-main" },
        h("header", { class: "art-head" },
          h("h3", null, h("span", { class: "sr", text: U.artLabel(a.n) + ". " }), a.titulo || null),
          link("art-" + a.n, "Abrir página", "art-open")),
        U.articleBody(a, state.hl)));
  }

  var observer = null;
  function observeReader() {
    if (observer) { observer.disconnect(); observer = null; }
    if (!("IntersectionObserver" in window)) return;
    observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) setActiveToc(parseInt(en.target.getAttribute("data-art"), 10));
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    view.querySelectorAll("article.art").forEach(function (a) { observer.observe(a); });
  }

  /* ---------- Página de artículo ---------- */
  function notesFor(n, t) {
    return L.notas.filter(function (x) { return x.alcance.art === n || x.alcance.titulo === t.id; });
  }

  var NOTE_LABEL = {
    fuente: "Nota de la fuente (AGN)",
    vigencia: "Vigencia y concordancias verificadas",
    explicacion: "Explicación, no es texto legal"
  };

  function noteBlock(x) {
    return h("aside", { class: "note note-" + x.tipo },
      h("p", { class: "note-label", text: NOTE_LABEL[x.tipo] + (x.alcance.titulo ? " · aplica a todo el título" : "") }),
      h("p", { text: x.texto }),
      x.fuentes && x.fuentes.length ? h("ul", { class: "note-src" }, x.fuentes.map(function (k) {
        var f = L.fuentes[k];
        return h("li", null, h("a", { href: f.u, target: "_blank", rel: "noopener noreferrer", text: f.t }));
      })) : null);
  }

  function baseUrl() { try { return location.href.split("#")[0]; } catch (e) { return ""; } }

  function renderArticle(r) {
    var a = artOf(r.n), t = tituloOf(r.n);
    var prev = r.n > 1 ? artOf(r.n - 1) : null, next = r.n < L.articulos.length ? artOf(r.n + 1) : null;
    var url = baseUrl() + "#art-" + r.n;
    var plain = U.artLabel(r.n) + (a.titulo ? ". " + a.titulo : "") + "\n" + S.bodyText(a) + "\n(Ley 594 de 2000, " + U.artLabel(r.n) + ". Fuente: Archivo General de la Nación. " + url + ")";

    view.appendChild(h("nav", { class: "crumbs", "aria-label": "Ubicación" },
      link("inicio", "Ley 594 de 2000"), h("span", { "aria-hidden": "true", text: "›" }),
      link("titulo-" + t.id, "Título " + t.num), h("span", { "aria-hidden": "true", text: "›" }),
      h("span", { "aria-current": "page", text: U.artLabel(r.n) })));

    view.appendChild(h("header", { class: "art-page-head" },
      h("p", { class: "eyebrow", text: "Título " + t.num + ", " + tNombre(t) }),
      h("h1", null, h("span", { class: "h1-num", text: U.artLabel(r.n) }), a.titulo ? h("span", { class: "h1-name", text: a.titulo }) : null),
      h("div", { class: "tools" },
        h("button", { type: "button", class: "btn", id: "copy-link", onclick: function () { U.copyText(url, "Enlace copiado"); }, text: "Copiar enlace" }),
        h("button", { type: "button", class: "btn", id: "copy-text", onclick: function () { U.copyText(plain, "Texto copiado con cita"); }, text: "Copiar texto con cita" }),
        h("button", { type: "button", class: "btn", id: "go-reader", onclick: function () { go("titulo-" + t.id); setTimeout(function () { var el = document.getElementById("a-" + r.n); if (el && el.scrollIntoView) el.scrollIntoView(); }, 30); }, text: "Verlo en el lector" }))));

    var legal = h("section", { class: "legal", "aria-labelledby": "h-legal" },
      h("div", { class: "legal-bar" },
        h("h2", { id: "h-legal", class: "legal-title", text: "Texto legal" }),
        h("span", { class: "legal-src", text: "Fuente: Archivo General de la Nación" })),
      U.articleBody(a, state.hl));
    view.appendChild(legal);

    if (state.hl.length) {
      view.insertBefore(h("p", { class: "hl-bar" }, "Coincidencias resaltadas. ",
        h("button", { type: "button", class: "linkbtn", id: "clear-hl", onclick: function () { state.hl = []; route(state.token, true); }, text: "Quitar resaltado" })), legal);
    }

    var notes = notesFor(r.n, t);
    if (notes.length) {
      view.appendChild(h("section", { class: "notes", "aria-label": "Notas sobre este artículo" }, notes.map(noteBlock)));
    }

    view.appendChild(h("nav", { class: "pager", "aria-label": "Artículos contiguos" },
      prev ? h("a", { class: "pager-link prev", id: "prev-art", href: "#art-" + prev.n, "data-go": "art-" + prev.n },
        h("span", { class: "pager-dir", text: "Anterior" }), h("span", { class: "pager-name", text: U.artLabel(prev.n) }), h("span", { class: "pager-sub", text: prev.titulo || "" })) : h("span"),
      next ? h("a", { class: "pager-link next", id: "next-art", href: "#art-" + next.n, "data-go": "art-" + next.n },
        h("span", { class: "pager-dir", text: "Siguiente" }), h("span", { class: "pager-name", text: U.artLabel(next.n) }), h("span", { class: "pager-sub", text: next.titulo || "" })) : h("span")));
  }

  /* ---------- Resultados de búsqueda ---------- */
  function renderSearch() {
    var input = h("input", { id: "q2", class: "input", type: "search", value: state.q, placeholder: "Artículo, palabra o frase", "aria-label": "Buscar en la ley" });
    var modo = h("select", { id: "f-mode", class: "input" },
      h("option", { value: "todas", text: "Todas las palabras" }),
      h("option", { value: "cualquiera", text: "Cualquier palabra" }),
      h("option", { value: "frase", text: "Frase exacta" }));
    modo.value = state.opts.mode;
    var tit = h("select", { id: "f-titulo", class: "input" }, h("option", { value: "", text: "Todos los títulos" }),
      L.titulos.map(function (t) { return h("option", { value: t.id, text: "Título " + t.num + " · " + tNombre(t).slice(0, 38) }); }));
    tit.value = String(state.opts.titulo);
    var ord = h("select", { id: "f-orden", class: "input" },
      h("option", { value: "relevancia", text: "Más relevantes primero" }),
      h("option", { value: "numero", text: "Por número de artículo" }));
    ord.value = state.opts.orden;

    function apply() {
      state.q = input.value.trim();
      state.opts = { mode: modo.value, titulo: tit.value, orden: ord.value };
      qInput.value = state.q;
      list.textContent = "";
      fillResults(list, count);
    }
    var count = h("p", { class: "count", role: "status", "aria-live": "polite" });
    var list = h("ol", { class: "results", "aria-label": "Resultados" });

    var form = h("form", { class: "filters", role: "search", onsubmit: function (e) { e.preventDefault(); apply(); } },
      h("div", { class: "search-main" },
        h("label", { for: "q2", class: "sr", text: "Buscar en la ley" }), input,
        h("button", { type: "submit", class: "btn primary search-go", text: "Buscar" })),
      h("div", { class: "search-opts" },
        h("div", { class: "field" }, h("label", { for: "f-mode", text: "Coincidencia" }), modo),
        h("div", { class: "field" }, h("label", { for: "f-titulo", text: "Dentro de" }), tit),
        h("div", { class: "field" }, h("label", { for: "f-orden", text: "Orden" }), ord)));
    [modo, tit, ord].forEach(function (s) { s.addEventListener("change", apply); });

    view.appendChild(h("header", { class: "page-head" }, h("h1", { text: "Buscar en la ley" })));
    view.appendChild(form);
    view.appendChild(count);
    view.appendChild(list);
    fillResults(list, count);
  }

  function fillResults(list, count) {
    if (!state.q) {
      count.textContent = "";
      list.appendChild(h("li", { class: "empty" },
        h("p", { text: "Escribe lo que buscas. Ejemplos:" }),
        h("ul", { class: "examples" },
          ["35", "art. 24", "tablas de retención", "\"patrimonio documental\"", "treinta años"].map(function (ex) {
            return h("li", null, h("button", { type: "button", class: "tag", onclick: function () { qInput.value = ex; submitSearch(); }, text: ex }));
          }))));
      return;
    }
    var res = S.search(state.q, state.opts);
    state.hl = res.terms;
    var n = res.hits.length;
    count.textContent = n === 0 ? "Sin resultados para «" + state.q + "»." : n + (n === 1 ? " artículo coincide" : " artículos coinciden") + " con «" + state.q + "».";
    if (n === 0) {
      list.appendChild(h("li", { class: "empty" }, h("p", { text: "Prueba con menos palabras, con otra forma de la palabra o cambia la coincidencia a «Cualquier palabra»." })));
      return;
    }
    res.hits.forEach(function (hit) {
      var a = artOf(hit.n), t = tituloOf(hit.n);
      list.appendChild(h("li", { class: "result" },
        h("div", { class: "result-top" },
          h("a", { class: "result-title", href: "#art-" + hit.n, "data-go": "art-" + hit.n },
            h("span", { class: "art-chip", text: "Art. " + hit.n }),
            h("span", { class: "result-name" }, U.highlight(a.titulo || "El Sistema Nacional de Archivos", res.terms))),
          hit.porNumero ? h("span", { class: "badge", text: "Por número" }) : null),
        h("p", { class: "result-loc", text: "Título " + t.num + ", " + tNombre(t) }),
        h("p", { class: "result-snip" }, U.highlight(S.snippet(hit.n, res.terms), res.terms))));
    });
  }

  /* ---------- Información jurídica ---------- */
  function srcLinks(keys) {
    return h("ul", { class: "src-list" }, keys.map(function (k) {
      var f = L.fuentes[k];
      return h("li", null, h("a", { href: f.u, target: "_blank", rel: "noopener noreferrer", text: f.t }));
    }));
  }

  function renderInfo() {
    var rows = [
      ["Ley 57 de 1985, art. 13", "El art. 28 de la Ley 594 modificó el inciso 2 de este artículo.", "Registrado como modificado en el normograma de la Cancillería.", ["ley57"]],
      ["Decreto 1080 de 2015", "Decreto Único Reglamentario del Sector Cultura (Diario Oficial 49.523 del 26 de mayo de 2015). Compila los decretos 2609 de 2012 (gestión de documentos), 2578 de 2012 (Sistema Nacional de Archivos) y 1515 de 2013 (transferencias secundarias).", "Las notas de los tres decretos indican que sus artículos quedaron compilados en el 1080 de 2015.", ["d1080", "d2609", "d2578", "d1515"]],
      ["Decreto 1100 de 2014", "Reglamentó la Ley 397 de 1997 y la Ley 594 en materia de archivos como patrimonio documental.", "Función Pública lo marca como derogado por el Decreto 1080 de 2015.", ["d1100"]],
      ["Acuerdo 004 de 2019 del AGN", "Procedimiento para tablas de retención y de valoración documental (arts. 21 a 26 de la ley).", "Derogado por el art. 10.1 del Acuerdo 1 de 2024.", ["a004"]],
      ["Acuerdo 001 de 2024 del AGN", "Acuerdo Único de la Función Archivística (Diario Oficial 52.723 del 10 de abril de 2024).", "Vigente según la publicación consultada; su texto completo no se revisó artículo por artículo.", ["a001"]],
      ["Ley 1712 de 2014, art. 22", "La reserva por daño a intereses públicos no se extiende más de quince años. Relacionada con el acceso del Título VI.", "Texto verificado en fuente secundaria; el Decreto 1081 de 2015 precisa desde cuándo corre el plazo.", ["l1712", "d1081"]],
      ["Ley 734 de 2002", "Régimen disciplinario que reemplazó a la Ley 200 de 1995, citada en el art. 35, literal b).", "Derogada desde el 29 de marzo de 2022 por la Ley 1952 de 2019, que la Ley 2094 de 2021 modificó.", ["l734"]]
    ];

    view.appendChild(h("header", { class: "page-head" },
      h("h1", { text: "Fuentes, vigencia y modificaciones" }),
      h("p", { class: "muted", text: "Esta página separa lo que dice la ley de lo que se comprobó sobre ella. El texto legal de los artículos nunca lleva comentarios; las notas aparecen aparte." })));

    view.appendChild(h("section", { class: "block" },
      h("h2", { text: "Fuente del texto" }),
      h("dl", { class: "facts" },
        h("div", null, h("dt", { text: "Norma" }), h("dd", { text: "Ley 594 de 2000 (" + L.meta.fecha + ")" })),
        h("div", null, h("dt", { text: "Publicación" }), h("dd", { text: L.meta.diarioOficial })),
        h("div", null, h("dt", { text: "Estado en la fuente" }), h("dd", { text: L.meta.estadoFuente })),
        h("div", null, h("dt", { text: "Fecha de verificación" }), h("dd", null, h("time", { datetime: L.meta.verificadoISO, text: L.meta.verificado }))),
        h("div", null, h("dt", { text: "Estructura" }), h("dd", { text: L.meta.divisionNota }))),
      h("p", null, "El texto se tomó del micrositio normativo del Archivo General de la Nación, entidad que orienta y coordina la función archivística (art. 4, literal e). El micrositio remite a SUIN-Juriscol, que no se pudo consultar de forma automatizada."),
      srcLinks(["agn", "suin"])));

    view.appendChild(h("section", { class: "block" },
      h("h2", { text: "Modificaciones y normas relacionadas comprobadas" }),
      h("div", { class: "table-wrap" },
        h("table", null,
          h("thead", null, h("tr", null, ["Norma", "Relación con la ley", "Lo que se comprobó", "Fuente"].map(function (c) { return h("th", { scope: "col", text: c }); }))),
          h("tbody", null, rows.map(function (r) {
            return h("tr", null, h("th", { scope: "row", text: r[0] }), h("td", { text: r[1] }), h("td", { text: r[2] }), h("td", null, srcLinks(r[3])));
          }))))));

    view.appendChild(h("section", { class: "block pending" },
      h("h2", { text: "Pendiente de verificar" }),
      h("ul", null,
        h("li", { text: "El estado de cada artículo en SUIN-Juriscol y el texto original del Diario Oficial." }),
        h("li", { text: "El texto de los artículos del Decreto 1080 de 2015 y del Acuerdo 001 de 2024 más allá de su estructura y datos de publicación." }),
        h("li", { text: "La derogatoria de la Ley 200 de 1995 por la Ley 734 de 2002, y el numeral de la Ley 1952 de 2019 que hoy aplica a las faltas contra el patrimonio documental." }),
        h("li", { text: "La numeración de los artículos del Código Penal que cita el art. 35, literal c)." }),
        h("li", { text: "Jurisprudencia de la Corte Constitucional sobre esta ley." }))));

    view.appendChild(h("p", { class: "disclaimer", text: "Contenido informativo. No constituye concepto jurídico oficial ni reemplaza la revisión de un profesional cuando el caso concreto lo requiera." }));
  }

  function renderMissing() {
    view.appendChild(h("header", { class: "page-head" },
      h("p", { class: "eyebrow", text: "No encontrado" }),
      h("h1", { text: "Esa dirección no existe" }),
      h("p", { class: "muted", text: "La ley tiene artículos del 1 al " + L.articulos.length + " y títulos del I al XIII." }),
      h("div", { class: "hero-actions" }, link("inicio", "Ir al inicio", "btn primary"), link("ley", "Leer la ley", "btn"))));
  }

  /* ---------- Otros temas ---------- */
  function renderOtros(r) { O.render(r.tema, view, link); }

  /* ---------- Tema claro / oscuro ---------- */
  var themeBtn = document.getElementById("theme-toggle");
  function effectiveTheme() {
    var t = document.documentElement.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function paintThemeBtn() {
    var dark = effectiveTheme() === "dark";
    themeBtn.setAttribute("aria-pressed", dark ? "true" : "false");
    themeBtn.setAttribute("aria-label", dark ? "Cambiar a modo claro" : "Cambiar a modo oscuro");
    themeBtn.querySelector(".theme-label").textContent = dark ? "Claro" : "Oscuro";
  }
  themeBtn.addEventListener("click", function () {
    var next = effectiveTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("ley594-tema", next); } catch (e) { /* sin almacenamiento */ }
    paintThemeBtn();
  });
  try { var saved = localStorage.getItem("ley594-tema"); if (saved === "dark" || saved === "light") document.documentElement.setAttribute("data-theme", saved); } catch (e) { /* sin almacenamiento */ }
  paintThemeBtn();

  /* ---------- Eventos globales ---------- */
  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a[href^='#']") : null;
    if (!a) return;
    var token = (a.getAttribute("href") || "").slice(1);
    if (!token) return;
    e.preventDefault();
    var inReader = state.view === "reader";
    var m = token.match(/^art-(\d+)$/);
    if (inReader && m && a.closest("#toc")) {
      var el = document.getElementById("a-" + m[1]);
      if (el && el.scrollIntoView) { el.scrollIntoView(); setActiveToc(parseInt(m[1], 10)); closeDrawer(); return; }
    }
    if (a.closest("#toc") && !a.classList.contains("toc-link")) state.hl = [];
    go(token);
  });

  document.getElementById("toc-toggle").addEventListener("click", function () {
    if (document.body.classList.contains("drawer-open")) closeDrawer(); else openDrawer();
  });
  document.getElementById("drawer-scrim").addEventListener("click", closeDrawer);
  document.getElementById("skip").addEventListener("click", function (e) { e.preventDefault(); view.setAttribute("tabindex", "-1"); view.focus(); });

  document.addEventListener("keydown", function (e) {
    var tag = (e.target.tagName || "").toLowerCase();
    var typing = tag === "input" || tag === "textarea" || tag === "select";
    if (e.key === "Escape") closeDrawer();
    if (typing || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === "/") { e.preventDefault(); qInput.focus(); return; }
    if (state.view === "article") {
      var b = e.key === "ArrowLeft" ? document.getElementById("prev-art") : e.key === "ArrowRight" ? document.getElementById("next-art") : null;
      if (b) go(b.getAttribute("data-go"));
    }
  });

  window.addEventListener("hashchange", function () { route(currentToken()); });

  /* ---------- Pie ---------- */
  function buildFooter() {
    var foot = document.getElementById("sitefoot");
    function col(title, items) {
      return h("div", { class: "foot-col" }, h("h2", { text: title }),
        h("ul", null, items.map(function (i) { return h("li", null, i); })));
    }
    function ext(k, label) { var f = L.fuentes[k]; return h("a", { href: f.u, target: "_blank", rel: "noopener noreferrer", text: label }); }
    foot.appendChild(h("div", { class: "foot-main" },
      h("div", { class: "foot-brand" },
        h("p", { class: "foot-name", text: L.meta.nombreCorto }),
        h("p", { class: "foot-law", text: "Ley " + L.meta.numero + " de " + L.meta.anio + ", " + L.meta.organo.replace(/^El /, "") }),
        h("p", { class: "foot-note", text: "Texto íntegro con índice por títulos, buscador, fuentes y notas de vigencia." })),
      h("div", { class: "foot-cols" },
        col("Consultar", [link("inicio", "Inicio"), link("ley", "Lector de la ley"), link("buscar", "Buscar en la ley"), link("info", "Información jurídica")]),
        col("Otros temas", O.items.map(function (i) { return link("otros-" + i.id, i.titulo); })),
        col("Fuentes", [ext("agn", "Archivo General de la Nación, normativa"), ext("suin", "SUIN-Juriscol")]))));
    foot.appendChild(h("div", { class: "foot-base" },
      h("div", { class: "foot-base-in" },
        h("div", { class: "credit" },
          h("p", { class: "credit-label", text: "Página creada por" }),
          h("p", { class: "credit-name", text: "Mariana Pineda Bastidas" }),
          h("p", { class: "credit-role", text: "Gestión documental" })),
        h("p", { class: "foot-legal", text: "Contenido informativo. Las notas explicativas están separadas del texto legal y no constituyen concepto jurídico oficial. Texto verificado el " + L.meta.verificado + "." }),
        h("button", { type: "button", class: "to-top", onclick: function () { try { window.scrollTo(0, 0); } catch (e) { /* sin scroll */ } } },
          h("span", { class: "to-top-ic", "aria-hidden": "true" }), h("span", { text: "Volver arriba" })))));
  }

  buildToc();
  buildMenu();
  buildFooter();
  route(currentToken(), true);
  window.__ley594 = { go: go, route: route, state: state, parse: parse };

  /* Celular: la cabecera se reduce a una fila al bajar y vuelve completa al subir.
     Compensa el cambio de altura para que el texto no salte bajo el dedo. */
  (function () {
    var bar = document.querySelector(".topbar"), mq = window.matchMedia("(max-width: 959px)");
    var last = window.pageYOffset || 0, ticking = false, quietUntil = 0;
    function set(on) {
      if (document.body.classList.contains("bar-compact") === on) return;
      var before = bar.offsetHeight;
      document.body.classList.toggle("bar-compact", on);
      var delta = bar.offsetHeight - before;
      if (delta) { quietUntil = Date.now() + 160; window.scrollBy(0, delta); }
      last = window.pageYOffset;
    }
    function update() {
      ticking = false;
      var y = window.pageYOffset || 0;
      if (Date.now() < quietUntil) { last = y; return; }
      if (!mq.matches || document.body.classList.contains("drawer-open")) { set(false); last = y; return; }
      var typing = document.activeElement && document.activeElement.id === "q";
      if (y < 80 || typing) set(false);
      else if (y > last + 12 && y > 220) set(true);
      else if (y < last - 12) set(false);
      if (Math.abs(y - last) > 12) last = y;
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener("hashchange", function () { set(false); });
    if (mq.addEventListener) mq.addEventListener("change", update);
  })();
})();
