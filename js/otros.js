/* «Otros temas»: vistas complementarias de consulta documental.
   Memorando, documento formal, radicador de envío y la diferencia entre paginar y foliar.
   Son explicaciones generales: no se atribuyen a artículos de la Ley 594 de 2000. */
(function (root) {
  "use strict";

  var h = root.UI.h;

  var ITEMS = [
    { id: "memorando", titulo: "Memorando", desc: "Las cinco partes de una comunicación interna" },
    { id: "documento", titulo: "Documento", desc: "Estructura de un documento formal" },
    { id: "radicador", titulo: "Radicador de envío de documentos", desc: "Los campos del registro de envíos" },
    { id: "foliar", titulo: "Paginar y foliar", desc: "Páginas y folios, sin confundirlos" }
  ];

  function item(id) { return ITEMS.filter(function (i) { return i.id === id; })[0]; }

  /* ---------- Piezas comunes ---------- */
  function pageHead(title, lede) {
    return h("header", { class: "page-head" },
      h("h1", { text: title }),
      h("p", { class: "muted", text: lede }));
  }

  function generalNote() {
    return h("p", { class: "note-gen" },
      "Explicación general de consulta. No reproduce ni cita artículos de la Ley 594 de 2000 y no se contrastó con una norma específica. Cada entidad puede tener su propio formato.");
  }

  function signature() {
    var NS = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(NS, "svg");
    svg.setAttribute("viewBox", "0 0 120 34");
    svg.setAttribute("class", "sig");
    svg.setAttribute("aria-hidden", "true");
    var p = document.createElementNS(NS, "path");
    p.setAttribute("d", "M4 24 C14 4, 22 4, 20 18 S28 30, 36 14 S46 8, 44 22 S58 28, 66 12 C72 6, 74 22, 82 20 S100 10, 116 22");
    p.setAttribute("fill", "none");
    p.setAttribute("stroke", "currentColor");
    p.setAttribute("stroke-width", "1.6");
    p.setAttribute("stroke-linecap", "round");
    svg.appendChild(p);
    return svg;
  }

  /* Una zona de la hoja de ejemplo; lleva una etiqueta con el nombre de la parte. */
  function zone(key, label, children, cls) {
    return h("div", { class: "zone" + (cls ? " " + cls : ""), "data-zone": key },
      h("span", { class: "zone-tag", text: label }), children);
  }

  /* Lista de explicaciones; cada parte resalta su zona en la hoja y al revés. */
  function parts(list) {
    return h("dl", { class: "parts" }, list.map(function (p) {
      return h("div", { class: "part", "data-zone": p[0], tabindex: "0" },
        h("dt", { text: p[1] }),
        h("dd", { text: p[2] }));
    }));
  }

  function linkZones(scope) {
    function set(key, on) {
      scope.querySelectorAll('[data-zone="' + key + '"]').forEach(function (n) { n.classList.toggle("is-on", on); });
    }
    scope.querySelectorAll("[data-zone]").forEach(function (n) {
      var key = n.getAttribute("data-zone");
      n.addEventListener("mouseenter", function () { set(key, true); });
      n.addEventListener("mouseleave", function () { set(key, false); });
    });
    scope.querySelectorAll(".part").forEach(function (n) {
      var key = n.getAttribute("data-zone");
      n.addEventListener("focus", function () { set(key, true); });
      n.addEventListener("blur", function () { set(key, false); });
    });
  }

  /* ---------- Índice de «Otros temas» ---------- */
  function renderIndex(view, link) {
    view.appendChild(pageHead("Otros temas",
      "Consulta complementaria sobre documentos y archivo. Son explicaciones generales, no texto de la Ley 594 de 2000."));
    view.appendChild(h("ul", { class: "otros-index" }, ITEMS.map(function (i) {
      return h("li", null, link("otros-" + i.id,
        [h("span", { class: "oi-title", text: i.titulo }), h("span", { class: "oi-desc", text: i.desc })], "oi-link"));
    })));
    view.appendChild(generalNote());
  }

  /* ---------- Memorando ---------- */
  function renderMemorando(view) {
    view.appendChild(pageHead("Memorando",
      "Comunicación escrita breve, normalmente entre dependencias de una misma entidad. Se ordena en cinco partes; pasa el cursor o el foco por cada una para ubicarla en el ejemplo."));

    var sheet = h("div", { class: "paper paper-memo", role: "group", "aria-label": "Ejemplo ilustrativo de un memorando, con sus cinco partes señaladas" },
      zone("encabezado", "Encabezado",
        h("div", { class: "memo-head" },
          h("p", { class: "memo-org", text: "Oficina de Gestión Documental" }),
          h("p", { class: "memo-kind", text: "Memorando" }),
          h("p", { class: "memo-code", text: "Consecutivo 0123" }))),
      zone("partes", "Quién envía y quién recibe",
        h("dl", { class: "lines" },
          h("div", null, h("dt", { text: "De" }), h("dd", { text: "Coordinación de Archivo" })),
          h("div", null, h("dt", { text: "Para" }), h("dd", { text: "Secretaría General" })))),
      zone("fecha", "Fecha",
        h("p", { text: "8 de octubre de 2026" })),
      zone("cuerpo", "Cuerpo",
        h("div", { class: "paper-body" },
          h("p", { text: "Solicito programar la transferencia documental de los expedientes del año anterior, de acuerdo con el calendario acordado." }),
          h("p", { text: "Quedo atenta a la confirmación de la fecha para coordinar el traslado." }))),
      zone("firma", "Firma",
        h("div", { class: "paper-sign" }, signature(),
          h("p", { class: "sign-name", text: "Ana Gómez" }),
          h("p", { class: "sign-role", text: "Coordinadora de Archivo" }))));

    var list = parts([
      ["encabezado", "Encabezado", "Identifica la entidad o dependencia que emite el memorando y el tipo de documento. Suele llevar un número consecutivo o un código para poder ubicarlo después."],
      ["partes", "Quién envía y quién recibe", "Señala la persona o dependencia que envía y la que recibe. Deja claro quién responde por el mensaje y a quién va dirigido."],
      ["fecha", "Fecha", "Día, mes y año en que se elabora. Ordena el documento en el tiempo y sirve para contar plazos."],
      ["cuerpo", "Cuerpo", "El mensaje: lo que se informa, solicita o responde. Funciona mejor en párrafos breves y concretos."],
      ["firma", "Firma", "Firma de quien emite el memorando, con su nombre y cargo. Indica la autoría y da responsabilidad al contenido."]
    ]);

    var split = h("div", { class: "otro-split" }, h("div", { class: "split-sheet" }, sheet,
      h("p", { class: "ex-note", text: "Ejemplo ilustrativo con datos ficticios." })), list);
    view.appendChild(split);
    view.appendChild(generalNote());
    linkZones(split);
  }

  /* ---------- Documento ---------- */
  function renderDocumento(view) {
    view.appendChild(pageHead("Documento",
      "Un documento formal, como una carta o un oficio, ordena sus partes para que quien lo reciba sepa de inmediato quién lo escribe, a quién va y qué se pide."));

    var sheet = h("div", { class: "paper paper-doc", role: "group", "aria-label": "Ejemplo ilustrativo de un documento formal, con sus ocho partes señaladas" },
      zone("fecha", "Fecha y ciudad", h("p", { class: "align-end", text: "Bogotá, D. C., 8 de octubre de 2026" })),
      h("div", { class: "doc-to" },
        zone("nombre", "Nombre", h("p", { class: "strong", text: "Laura Martínez Rojas" })),
        zone("cargo", "Cargo", h("p", { text: "Directora de Talento Humano" }))),
      zone("asunto", "Asunto", h("p", null, h("span", { class: "lbl", text: "Asunto: " }), "Solicitud de información sobre historias laborales")),
      zone("saludo", "Saludo", h("p", { text: "Cordial saludo," })),
      zone("cuerpo", "Cuerpo",
        h("div", { class: "paper-body" },
          h("p", { text: "Me permito solicitar el listado de historias laborales que se encuentran en custodia de su dependencia, con el fin de programar su organización." }),
          h("p", { text: "Agradezco su respuesta dentro de los próximos diez días hábiles." }))),
      h("div", { class: "doc-end" },
        zone("firma", "Firma", signature()),
        zone("remitente", "Remitente",
          h("div", null,
            h("p", { class: "sign-name", text: "Camilo Torres Vega" }),
            h("p", { class: "sign-role", text: "Jefe de Archivo" })))));

    var list = parts([
      ["fecha", "Fecha y ciudad", "Lugar y día en que se escribe el documento. Fija el momento desde el cual corren los plazos."],
      ["nombre", "Nombre", "Nombre completo de la persona a quien va dirigido."],
      ["cargo", "Cargo", "Cargo o dependencia del destinatario. Ayuda a que el documento llegue a quien debe atenderlo."],
      ["asunto", "Asunto", "Resumen de una línea sobre el motivo. Permite entender y clasificar el documento a primera vista."],
      ["saludo", "Saludo", "Fórmula de cortesía con la que se abre el texto, por ejemplo «Cordial saludo,»."],
      ["cuerpo", "Cuerpo", "El contenido: qué se informa o se pide, con las razones y los datos necesarios, en párrafos claros."],
      ["firma", "Firma", "Rúbrica de quien emite el documento. Da autenticidad y compromete a quien lo suscribe."],
      ["remitente", "Remitente", "Nombre y cargo de quien escribe y envía. Permite saber a quién responder."]
    ]);

    var split = h("div", { class: "otro-split" }, h("div", { class: "split-sheet" }, sheet,
      h("p", { class: "ex-note", text: "Ejemplo ilustrativo con datos ficticios." })), list);
    view.appendChild(split);
    view.appendChild(generalNote());
    linkZones(split);
  }

  /* ---------- Radicador de envío ---------- */
  var CAMPOS = [
    ["Número consecutivo de envío", "Número único que identifica y permite llevar el orden de cada envío realizado.", "0045", "N.º consecutivo"],
    ["Fecha de envío", "Día, mes y año en que se envía el documento.", "8 de octubre de 2026", "Fecha"],
    ["Hora de envío", "Hora exacta en que se realiza el envío.", "2:35 p. m.", "Hora"],
    ["Destinatario", "Nombre de la persona, empresa o entidad a la que se envía el documento.", "Secretaría de Educación", "Destinatario"],
    ["Asunto o detalle del envío", "Descripción del documento enviado o del motivo del envío.", "Remisión de actas del comité", "Asunto o detalle"],
    ["Área o dependencia destinataria", "Departamento o área que recibe el documento.", "Oficina Jurídica", "Dependencia"],
    ["Número de folios", "Cantidad de folios que contiene el documento enviado.", "12", "Folios"],
    ["Firma o responsable del envío", "Nombre o firma de la persona encargada de realizar o autorizar el envío.", "J. Pérez, auxiliar de archivo", "Responsable"]
  ];

  function renderRadicador(view) {
    view.appendChild(pageHead("Radicador de envío de documentos",
      "Registro donde se anota cada documento que sale de la entidad, para dejar constancia de qué se envió, cuándo, a quién y quién lo hizo."));

    view.appendChild(h("section", { class: "radicador", "aria-label": "Ficha del radicador" },
      h("div", { class: "table-wrap radicador-wrap" },
        h("table", { class: "rad-table" },
          h("caption", { text: "Ejemplo ilustrativo de un registro, con datos ficticios" }),
          h("thead", null, h("tr", null, CAMPOS.map(function (c) { return h("th", { scope: "col", text: c[3] }); }))),
          h("tbody", null,
            h("tr", null, CAMPOS.map(function (c) { return h("td", { text: c[2] }); })),
            h("tr", { class: "blank", "aria-hidden": "true" }, CAMPOS.map(function () { return h("td", null, " "); })),
            h("tr", { class: "blank", "aria-hidden": "true" }, CAMPOS.map(function () { return h("td", null, " "); })))))));

    view.appendChild(h("section", { class: "block", "aria-labelledby": "h-campos" },
      h("h2", { id: "h-campos", text: "Qué va en cada campo" }),
      h("dl", { class: "fields" }, CAMPOS.map(function (c) {
        return h("div", { class: "field-row" },
          h("dt", { text: c[0] }),
          h("dd", null, h("span", { text: c[1] }), h("span", { class: "field-ex" }, h("span", { class: "lbl", text: "Ejemplo: " }), c[2])));
      }))));

    view.appendChild(generalNote());
  }

  /* ---------- Paginar y foliar ---------- */
  function face(side, mark) {
    var f = h("span", { class: "face face-" + side });
    if (mark) f.appendChild(h("span", { class: "mark mark-" + mark.pos, text: String(mark.n) }));
    return f;
  }

  /* Tres hojas, cada una con recto y verso. modo: "paginar" numera las seis caras; "foliar" numera solo el recto. */
  function sheets(modo) {
    var wrap = h("div", { class: "sheets sheets-" + modo });
    for (var i = 1; i <= 3; i++) {
      var rectoMark = modo === "paginar" ? { pos: "foot", n: i * 2 - 1 } : { pos: "corner", n: i };
      var versoMark = modo === "paginar" ? { pos: "foot", n: i * 2 } : null;
      wrap.appendChild(h("div", { class: "sheet" },
        h("div", { class: "sheet-faces" }, face("recto", rectoMark), face("verso", versoMark)),
        h("div", { class: "sheet-sides", "aria-hidden": "true" }, h("span", { text: "recto" }), h("span", { text: "verso" })),
        h("span", { class: "sheet-name", text: "Hoja " + i })));
    }
    return wrap;
  }

  function renderFoliar(view) {
    view.appendChild(pageHead("Paginar y foliar",
      "Se parecen, pero cuentan cosas distintas: paginar cuenta las caras de las hojas; foliar cuenta las hojas."));

    view.appendChild(h("div", { class: "compare" },
      h("section", { class: "cmp", "aria-labelledby": "h-pag" },
        h("h2", { id: "h-pag", text: "Paginar" }),
        h("p", { class: "cmp-def", text: "Numerar consecutivamente las páginas de un documento." }),
        h("div", { role: "img", "aria-label": "Tres hojas con recto y verso. Se numeran las seis caras, de la 1 a la 6, al pie de cada página." }, sheets("paginar")),
        h("p", { class: "cmp-result" }, h("strong", { text: "6 páginas" }), " numeradas, del 1 al 6.")),
      h("section", { class: "cmp", "aria-labelledby": "h-fol" },
        h("h2", { id: "h-fol", text: "Foliar" }),
        h("p", { class: "cmp-def", text: "Enumerar las hojas o folios que contiene el documento." }),
        h("div", { role: "img", "aria-label": "Tres hojas con recto y verso. Se numera solo el recto de cada hoja, del 1 al 3, en la esquina superior derecha; el verso queda sin número." }, sheets("foliar")),
        h("p", { class: "cmp-result" }, h("strong", { text: "3 folios" }), " numerados, del 1 al 3."))));

    view.appendChild(h("section", { class: "block", "aria-labelledby": "h-conf" },
      h("h2", { id: "h-conf", text: "Cómo no confundirlos" }),
      h("ul", { class: "tips" },
        h("li", null, h("strong", { text: "Una hoja, un folio. " }), "Una hoja es un folio aunque tenga texto por las dos caras."),
        h("li", null, h("strong", { text: "Una hoja, dos páginas. " }), "Si la hoja se imprime por ambas caras, cuenta como dos páginas: el recto (cara de adelante) y el verso (cara de atrás)."),
        h("li", null, h("strong", { text: "Cuándo coinciden. " }), "Si todo se imprime por una sola cara, el número de páginas y el de folios es el mismo."),
        h("li", null, h("strong", { text: "Dónde se escribe. " }), "En el ejemplo, el número de folio va solo en el recto, en la esquina superior derecha. Confirma la práctica que sigue tu entidad."))));

    view.appendChild(generalNote());
  }

  /* ---------- Entrada ---------- */
  function render(tema, view, link) {
    ({ "": function () { renderIndex(view, link); }, memorando: function () { renderMemorando(view); }, documento: function () { renderDocumento(view); }, radicador: function () { renderRadicador(view); }, foliar: function () { renderFoliar(view); } })[tema]();
  }

  root.Otros = { items: ITEMS, item: item, render: render };
})(typeof window !== "undefined" ? window : globalThis);
