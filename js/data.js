/* Datos normativos de la Ley 594 de 2000.
   Texto: transcrito del micrositio normativo del Archivo General de la Nación
   https://normativa.archivogeneral.gov.co/ley-594-de-2000/ (consultado el 8 de octubre de 2026).
   Se conserva la redacción y la ortografía de la fuente. Las notas editoriales
   y explicativas viven aparte, en `notas`, y nunca se mezclan con el texto legal. */
(function () {
  "use strict";

  var titulos = [
    { id: 1, num: "I", nombre: "OBJETO, AMBITO DE APLICACION, DEFINICIONES FUNDAMENTALES Y PRINCIPIOS GENERALES", desde: 1, hasta: 4 },
    { id: 2, num: "II", nombre: "SISTEMA NACIONAL DE ARCHIVOS, ORGANOS ASESORES, COORDINADORES Y EJECUTORES", desde: 5, hasta: 6 },
    { id: 3, num: "III", nombre: "CATEGORIZACION DE LOS ARCHIVOS PUBLICOS", desde: 7, hasta: 10 },
    { id: 4, num: "IV", nombre: "ADMINISTRACION DE ARCHIVOS", desde: 11, hasta: 20 },
    { id: 5, num: "V", nombre: "GESTION DE DOCUMENTOS", desde: 21, hasta: 26 },
    { id: 6, num: "VI", nombre: "ACCESO Y CONSULTA DE LOS DOCUMENTOS", desde: 27, hasta: 29 },
    { id: 7, num: "VII", nombre: "SALIDA DE DOCUMENTOS", desde: 30, hasta: 31 },
    { id: 8, num: "VIII", nombre: "CONTROL Y VIGILANCIA", desde: 32, hasta: 35 },
    { id: 9, num: "IX", nombre: "ARCHIVOS PRIVADOS", desde: 36, hasta: 43 },
    { id: 10, num: "X", nombre: "DONACION, ADQUISICION Y EXPROPIACION", desde: 44, hasta: 45 },
    { id: 11, num: "XI", nombre: "CONSERVACION DE DOCUMENTOS", desde: 46, hasta: 49 },
    { id: 12, num: "XII", nombre: "ESTIMULOS A LA SALVAGUARDA, DIFUSION O INCREMENTO DEL PATRIMONIO DOCUMENTAL DE LA NACION", desde: 50, hasta: 50 },
    { id: 13, num: "XIII", nombre: "DISPOSICIONES FINALES", desde: 51, hasta: 52 }
  ];

  /* cuerpo: cada elemento es un párrafo (string) o una definición [término, texto]. */
  var articulos = [
    { n: 1, titulo: "Objeto.", cuerpo: [
      "La presente ley tiene por objeto establecer las reglas y principios generales que regulan la función archivística del Estado."
    ] },
    { n: 2, titulo: "Ambito de aplicación.", cuerpo: [
      "La presente ley comprende a la administración pública en sus diferentes niveles, las entidades privadas que cumplen funciones públicas y los demás organismos regulados por la presente ley."
    ] },
    { n: 3, titulo: "Definiciones.", cuerpo: [
      "Para los efectos de esta ley se definen los siguientes conceptos, así:",
      ["Archivo.", " Conjunto de documentos, sea cual fuere su fecha, forma y soporte material, acumulados en un proceso natural por una persona o entidad pública o privada, en el transcurso de su gestión, conservados respetando aquel orden para servir como testimonio e información a la persona o institución que los produce y a los ciudadanos, o como fuentes de la historia."],
      "También se puede entender como la institución que está al servicio de la gestión administrativa, la información, la investigación y la cultura.",
      ["Archivo público.", " Conjunto de documentos pertenecientes a entidades oficiales y aquellos que se deriven de la prestación de un servicio público por entidades privadas."],
      ["Archivo privado de interés público.", " Aquel que por su valor para la historia, la investigación, la ciencia o la cultura es de interés público y declarado como tal por el legislador."],
      ["Archivo total.", " Concepto que hace referencia al proceso integral de los documentos en su ciclo vital."],
      ["Documento de archivo.", " Registro de información producida o recibida por una entidad pública o privada en razón de sus actividades o funciones."],
      ["Función archivística.", " Actividades relacionadas con la totalidad del quehacer archivístico, que comprende desde la elaboración del documento hasta su eliminación o conservación permanente."],
      ["Gestión documental.", " Conjunto de actividades administrativas y técnicas tendientes a la planificación, manejo y organización de la documentación producida y recibida por las entidades, desde su origen hasta su destino final, con el objeto de facilitar su utilización y conservación."],
      ["Patrimonio documental.", " Conjunto de documentos conservados por su valor histórico o cultural."],
      ["Soporte documental.", " Medios en los cuales se contiene la información, según los materiales empleados. Además de los archivos en papel existente los archivos audiovisuales, fotográficos, fílmicos, informáticos, orales y sonoros."],
      ["Tabla de retención documental.", " Listado de series con sus correspondientes tipos documentales, a las cuales se asigna el tiempo de permanencia en cada etapa del ciclo vital de los documentos."],
      ["Documento original.", " Es la fuente primaria de información con todos los rasgos y características que permiten garantizar su autenticidad e integridad."]
    ] },
    { n: 4, titulo: "Principios generales.", cuerpo: [
      "Los principios generales que rigen la función archivística son los siguientes:",
      "a) Fines de los archivos. El objetivo esencial de los archivos es el de disponer de la documentación organizada, en tal forma que la información institucional sea recuperable para uso de la administración en el servicio al ciudadano y como fuente de la historia;",
      "Por lo mismo, los archivos harán suyos los fines esenciales del Estado, en particular los de servir a la comunidad y garantizar la efectividad de los principios, derechos y deberes consagrados en la Constitución y los de facilitar la participación de la comunidad y el control del ciudadano en las decisiones que los afecten, en los términos previstos por la ley;",
      "b) Importancia de los archivos. Los archivos son importantes para la administración y la cultura, porque los documentos que los conforman son imprescindibles para la toma de decisiones basadas en antecedentes. Pasada su vigencia, estos documentos son potencialmente parte del patrimonio cultural y de la identidad nacional;",
      "c) Institucionalidad e instrumentalidad. Los documentos institucionalizan las decisiones administrativas y los archivos constituyen una herramienta indispensable para la gestión administrativa, económica, política y cultural del Estado y la administración de justicia; son testimonio de los hechos y de las obras; documentan las personas, los derechos y las instituciones. Como centros de información institucional contribuyen a la eficacia, eficiencia y secuencia de las entidades y agencias del Estado en el servicio al ciudadano;",
      "d) Responsabilidad. Los servidores públicos son responsables de la organización, conservación, uso y manejo de los documentos.",
      "Los particulares son responsables ante las autoridades por el uso de los mismos.",
      "e) Dirección y coordinación de la función archivística. El Archivo General de la Nación es la entidad del Estado encargada de orientar y coordinar la función archivística para coadyuvar a la eficiencia de la gestión del Estado y salvaguardar el patrimonio documental como parte integral de la riqueza cultural de la Nación, cuya protección es obligación del Estado, según lo dispone el título I de los principios fundamentales de la Constitución Política;",
      "f) Administración y acceso. Es una obligación del Estado la administración de los archivos públicos y un derecho de los ciudadanos el acceso a los mismos, salvo las excepciones que establezca la ley;",
      "g) Racionalidad. Los archivos actúan como elementos fundamentales de la racionalidad de la administración pública y como agentes dinamizadores de la acción estatal. Así mismo, constituyen el referente natural de los procesos informativos de aquélla;",
      "h) Modernización. El Estado propugnará por el fortalecimiento de la infraestructura y la organización de sus sistemas de información, estableciendo programas eficientes y actualizados de administración de documentos y archivos;",
      "i) Función de los archivos. Los archivos en un Estado de Derecho cumplen una función probatoria, garantizadora y perpetuadora;",
      "j) Manejo y aprovechamiento de los archivos. El manejo y aprovechamiento de los recursos informativos de archivo responden a la naturaleza de la administración pública y a los fines del Estado y de la sociedad, siendo contraria cualquier otra práctica sustitutiva;",
      "k) Interpretación. Las disposiciones de la presente ley y sus derechos reglamentarios se interpretarán de conformidad con la Constitución Política y los tratados o convenios internacionales que sobre la materia celebre el Estado colombiano."
    ] },
    { n: 5, titulo: null, cuerpo: [
      "El Sistema Nacional de Archivos:",
      "a) Es un conjunto de instituciones archivísticas articuladas entre sí, que posibilitan la homogenización y normalización de los procesos archivísticos, promueven el desarrollo de estos centros de información, la salvaguarda del patrimonio documental y el acceso de los ciudadanos a la información y a los documentos;",
      "b) Integran el Sistema Nacional de Archivos: el Archivo General de la Nación, los archivos de las entidades del Estado en sus diferentes niveles de la organización administrativa, territorial y por servicios.",
      "Los archivos privados podrán hacer parte del Sistema Nacional de Archivo. Las entidades del Sistema actuarán de conformidad con las políticas y planes generales que para el efecto adopte el Ministerio de la Cultura;",
      "c) El Sistema Nacional de Archivos se desarrollará bajo los principios de unidad normativa, descentralización administrativa y operativa, coordinación, concurrencia y subsidiariedad;",
      "d) El Sistema Nacional de Archivos buscará esencialmente la modernización y homogenización metodológica de la función archivística y propiciará la cooperación e integración de los archivos. Así mismo, promoverá la sensibilidad de la administración pública y de los ciudadanos en general acerca de la importancia de los archivos activos, como centros de información esenciales para la misma, y de los históricos, como partes fundamentales de la memoria colectiva;",
      "e) Los proyectos y programas archivísticos de las instituciones que conformen el Sistema Nacional de Archivos se acordarán, ejecutarán y regularán siguiendo los principios de participación, cooperación, descentralización y autonomía;",
      "f) El Archivo General de la Nación orientará y coordinará el Sistema Nacional de Archivos."
    ] },
    { n: 6, titulo: "De los planes y programas.", cuerpo: [
      "Las entidades integrantes del Sistema Nacional de Archivos, de acuerdo con sus funciones, llevarán a cabo los procesos de planeación y programación y desarrollarán acciones de asistencia técnica, ejecución, control, seguimiento y coordinación, así:",
      "a) La planeación y programación la formularán las instituciones archivísticas de acuerdo con el Plan Nacional de Desarrollo y los planes sectoriales del respectivo ministerio y de las entidades territoriales;",
      "b) La asistencia técnica estará a cargo del Archivo General de la Nación, los consejos territoriales de archivos, los comités técnicos, las entidades de formación de recurso humano, las asociaciones y las entidades públicas y privadas que presten este servicio;",
      "c) La ejecución, seguimiento y control de los planes y programas de desarrollo serán responsabilidad de los archivos del orden nacional, territorial y de las entidades descentralizadas directas e indirectas del Estado;",
      "d) La coordinación corresponde al Archivo General de la Nación, de conformidad con lo dispuesto en la presente ley y sus normas reglamentarias."
    ] },
    { n: 7, titulo: "Archivos desde el punto de vista de su jurisdicción y competencia.", cuerpo: [
      "Los archivos, desde el punto de vista de su jurisdicción y competencia, se clasifican en:",
      "a) Archivo General de la Nación;",
      "b) Archivo General del Departamento;",
      "c) Archivo General del Municipio;",
      "d) Archivo General del Distrito.",
      "PARÁGRAFO. El Archivo General de la nación tendrá las funciones señaladas en la Ley 80 de 1989, en el Decreto 1777 de 1990 y las incorporadas en la presente ley."
    ] },
    { n: 8, titulo: "Archivos territoriales.", cuerpo: [
      "Los archivos, desde el punto de vista territorial, se clasifican en:",
      "a) Archivos de entidades del orden nacional;",
      "b) Archivos de entidades del orden departamental;",
      "c) Archivos de entidades del orden distrital;",
      "d) Archivos de entidades del orden metropolitano;",
      "e) Archivos de entidades del orden municipal;",
      "f) Archivos de entidades del orden local;",
      "g) Archivos de las nuevas entidades territoriales que se creen por ley;",
      "h) Archivos de los territorios indígenas, que se crearán cuando la ley los desarrolle."
    ] },
    { n: 9, titulo: "Los archivos según la organización del Estado.", cuerpo: [
      "a) Archivos de la Rama Ejecutiva;",
      "b) Archivos de la Rama Legislativa;",
      "c) Archivos de la Rama Judicial;",
      "d) Archivos de los Organos de Control;",
      "e) Archivos de los Organismos Autónomos."
    ] },
    { n: 10, titulo: "Obligatoriedad de la creación de archivos.", cuerpo: [
      "La creación de los archivos contemplados en los artículos 8o. y 9o. de la presente ley, así como los archivos de los organismos de control y de los organismos autónomos será de carácter obligatorio."
    ] },
    { n: 11, titulo: "Obligatoriedad de la conformación de los archivos públicos.", cuerpo: [
      "El Estado está obligado a la creación, organización, preservación y control de los archivos, teniendo en cuenta los principios de procedencia y orden original, el ciclo vital de los documentos y la normatividad archivística."
    ] },
    { n: 12, titulo: "Responsabilidad.", cuerpo: [
      "La administración pública será responsable de la gestión de documentos y de la administración de sus archivos."
    ] },
    { n: 13, titulo: "Instalaciones para los archivos.", cuerpo: [
      "La administración pública deberá garantizar los espacios y las instalaciones necesarias para el correcto funcionamiento de sus archivos. En los casos de construcción de edificios públicos, adecuación de espacios, adquisición o arriendo, deberán tenerse en cuenta las especificaciones técnicas existentes sobre áreas de archivos."
    ] },
    { n: 14, titulo: "Propiedad, manejo y aprovechamiento de los archivos públicos.", cuerpo: [
      "La documentación de la administración pública es producto y propiedad del Estado, y éste ejercerá el pleno control de sus recursos informativos. Los archivos públicos, por ser un bien de uso público, no son susceptibles de enajenación.",
      "PARÁGRAFO 1º. La administración pública podrá contratar con personas naturales o jurídicas los servicios de custodia, organización, reprografía y conservación de documentos de archivo.",
      "PARÁGRAFO 2º. Se podrá contratar la administración de archivos históricos con instituciones de reconocida solvencia académica e idoneidad.",
      "PARÁGRAFO 3º. El Archivo General de la Nación establecerá los requisitos y condiciones que deberán cumplir las personas naturales o jurídicas que presten servicios de depósito, custodia, organización, reprografía y conservación de documentos de archivo o administración de archivos históricos."
    ] },
    { n: 15, titulo: "Responsabilidad especial y obligaciones de los servidores públicos.", cuerpo: [
      "Los servidores públicos, al desvincularse de las funciones titulares, entregarán los documentos y archivos a su cargo debidamente inventariados, conforme a las normas y procedimientos que establezca el Archivo General de la Nación, sin que ello implique exoneración de la responsabilidad a que haya lugar en caso de irregularidades."
    ] },
    { n: 16, titulo: "Obligaciones de los funcionarios a cuyo cargo estén los archivos de las entidades públicas.", cuerpo: [
      "Los secretarios generales o los funcionarios administrativos de igual o superior jerarquía, pertenecientes a las entidades públicas, a cuyo carga estén los archivos públicos, tendrán la obligación de velar por la integridad, autenticidad, veracidad y fidelidad de la información de los documentos de archivo y serán responsables de su organización y conservación, así como de la prestación de los servicios archivísticos."
    ] },
    { n: 17, titulo: "Responsabilidad general de los funcionarios de archivo.", cuerpo: [
      "Los funcionarios de archivo trabajarán sujetos a los más rigurosos principios de la ética profesional, a lo dispuesto en la Constitución Política de Colombia, especialmente en lo previsto en su artículo 15, a las leyes y disposiciones que regulen su labor. Actuarán siempre guiados por los valores de una sociedad democrática que les confíe la misión de organizar, conservar y poner al servicio de la comunidad la documentación de la administración del Estado y aquélla que forme parte del patrimonio documental de la Nación."
    ] },
    { n: 18, titulo: "Capacitación para los funcionarios de archivo.", cuerpo: [
      "Las entidades tienen la obligación de capacitar y actualizar a los funcionarios de archivo, en programas y áreas relacionadas con su labor.",
      "PARÁGRAFO. El Archivo General de la Nación propiciará y apoyará programas de formación profesional y de especialización en archivística, así como programas de capacitación formal y no formal, desarrollados por instituciones educativas."
    ] },
    { n: 19, titulo: "Soporte documental.", cuerpo: [
      "Las entidades del Estado podrán incorporar tecnologías de avanzada en la administración y conservación de su archivos, empleando cualquier medio técnico, electrónico, informático, óptico o telemático, siempre y cuando cumplan con los siguientes requisitos:",
      "a) Organización archivística de los documentos;",
      "b) Realización de estudios técnicos para la adecuada decisión, teniendo en cuenta aspectos como la conservación física, las condiciones ambientales y operacionales, la seguridad, perdurabilidad y reproducción de la información contenida en estos soportes, así como el funcionamiento razonable del sistema.",
      "PARÁGRAFO 1º. Los documentos reproducidos por los citados medios gozarán de la validez y eficacia del documento original, siempre que se cumplan los requisitos exigidos por la leyes procesales y se garantice la autenticidad, integridad e inalterabilidad de la información.",
      "PARÁGRAFO 2º. Los documentos originales que posean valores históricos no podrán ser destruidos, aun cuando hayan sido reproducidos y/o almacenados mediante cualquier medio."
    ] },
    { n: 20, titulo: "Supresión, fusión o privatización de entidades públicas.", cuerpo: [
      "Las entidades públicas que se suprimen o fusionen deberán entregar sus archivos a las entidades que asuman sus funciones o al ministerio o entidad a la cual hayan estado adscritas o vinculadas.",
      "PARÁGRAFO. Las entidades públicas que se privaticen deberán transferir su documentación histórica al ministerio o entidad territorial a la cual hayan estado adscritas o vinculadas."
    ] },
    { n: 21, titulo: "Programas de gestión documental.", cuerpo: [
      "Las entidades públicas deberán elaborar programas de gestión de documentos, pudiendo contemplar el uso de nuevas tecnologías y soportes, en cuya aplicación deberán observarse los principios y procesos archivísticos.",
      "PARÁGRAFO. Los documentos emitidos por los citados medios gozarán de la validez y eficacia de un documento original, siempre que quede garantizada su autenticidad, su integridad y el cumplimiento de los requisitos exigidos por las leyes procesales."
    ] },
    { n: 22, titulo: "Procesos archivísticos.", cuerpo: [
      "La gestión de documentación dentro del concepto de archivo total, comprende procesos tales como la producción o recepción, la distribución, la consulta, la organización, la recuperación y la disposición final de los documentos."
    ] },
    { n: 23, titulo: "Formación de archivos.", cuerpo: [
      "Teniendo en cuenta el ciclo vital de los documentos, los archivos se clasifican en:",
      "a) Archivo de gestión. Comprende toda la documentación que es sometida a continua utilización y consulta administrativa por las oficinas productoras u otras que la soliciten. Su circulación o trámite se realiza para dar respuesta o solución a los asuntos iniciados;",
      "b) Archivo central. En el que se agrupan documentos transferidos por los distintos archivos de gestión de la entidad respectiva, cuya consulta no es tan frecuente pero que siguen teniendo vigencia y son objeto de consulta por las propias oficinas y particulares en general.",
      "c) Archivo histórico. Es aquel al que se transfieren desde el archivo central los documentos de archivo de conservación permanente."
    ] },
    { n: 24, titulo: "Obligatoriedad de las tablas de retención.", cuerpo: [
      "Será obligatorio para las entidades del Estado elaborar y adoptar las respectivas tablas de retención documental."
    ] },
    { n: 25, titulo: "De los documentos contables, notariales y otros.", cuerpo: [
      "El Ministerio de la Cultura, a través del Archivo General de la Nación y el del sector correspondiente, de conformidad con las normas aplicables, reglamentarán lo relacionado con los tiempos de retención documental, organización y conservación de las historias clínicas, historias laborales, documentos contables y documentos notariales. Así mismo, se reglamentará lo atinente a los documentos producidos por las entidades privadas que presten servicios públicos."
    ] },
    { n: 26, titulo: "Inventario documental.", cuerpo: [
      "Es obligación de las entidades de la Administración Pública elaborar inventarios de los documentos que produzcan en ejercicio de sus funciones, de manera que se asegure el control de los documentos en sus diferentes fases."
    ] },
    { n: 27, titulo: "Acceso y consulta de los documentos.", cuerpo: [
      "Todas las personas tienen derecho a consultar los documentos de archivos públicos y a que se les expida copia de los mismos, siempre que dichos documentos no tengan carácter reservado conforme a la Constitución o a la ley.",
      "Las autoridades responsables de los archivos públicos y privados garantizarán el derecho a la intimidad personal y familiar, honra y buen nombre de las personas y demás derechos consagrados en la Constitución y las leyes."
    ] },
    { n: 28, titulo: "Modificación de la Ley 57 de 1985.", cuerpo: [
      "Modifícase el inciso 2o. del artículo 13 de la Ley 57 de 1985, el cual quedará así: “La reserva legal sobre cualquier documento cesará a los treinta años de su expedición. Cumplidos éstos, el documento por este solo hecho no adquiere el carácter histórico y podrá ser consultado por cualquier ciudadano, y la autoridad que esté en su posesión adquiere la obligación de expedir a quien lo demande copias o fotocopias del mismo”."
    ] },
    { n: 29, titulo: "Restricciones por razones de conservación.", cuerpo: [
      "Cuando los documentos históricos presenten deterioro físico manifiesto tal que su estado de conservación impida su acceso directo, las instituciones suministrarán la información contenida en estos mediante un sistema de reproducción que no afecte la conservación del documento, certificando su autenticidad cuando fuere del caso."
    ] },
    { n: 30, titulo: "Documentos administrativos.", cuerpo: [
      "Sólo por motivos legales las entidades del Estado podrán autorizar la salida temporal de los documentos de archivo."
    ] },
    { n: 31, titulo: "Documentos históricos.", cuerpo: [
      "En los archivos públicos de carácter histórico se podrá autorizar de manera excepcional la salida temporal de los documentos que conservan y en tal evento el jefe del archivo deberá tomar todas las medidas que garanticen la integridad, la seguridad, la conservación o el reintegro de los mismos. Procederá dicha autorización en los siguientes términos:",
      "a) Motivos legales;",
      "b) Procesos técnicos;",
      "c) Exposiciones culturales.",
      "PARÁGRAFO. Sólo el Archivo General de la Nación autorizará, por motivos legales, procesos técnicos especiales o para exposiciones culturales, la salida temporal de documentos de un archivo fuera del territorio nacional."
    ] },
    { n: 32, titulo: "Visitas de inspección.", cuerpo: [
      "El Archivo General de la Nación podrá, de oficio o a solicitud de parte, adelantar en cualquier momento visitas de inspección a los archivos de las entidades del Estado con el fin de verificar el cumplimiento de lo dispuesto en la presente ley y sus normas reglamentarias. Advertida alguna situación irregular, requerirá a la respectiva entidad para que adelante los correctivos a que haya lugar o dará traslado, según el caso, a los órganos competentes con el fin de establecer las responsabilidades administrativas y ordenar las medidas pertinentes."
    ] },
    { n: 33, titulo: "Órgano competente.", cuerpo: [
      "El Estado, a través del Archivo General de la Nación, ejercerá control y vigilancia sobre los documentos declarados de interés cultural cuyos propietarios, tenedores o poseedores sean personas naturales o jurídicas de carácter privado."
    ] },
    { n: 34, titulo: "Normalización.", cuerpo: [
      "En desarrollo de lo dispuesto en el artículo 8o. de la Constitución Política, el Archivo General de la Nación fijará los criterios y normas técnicas y jurídicas para hacer efectiva la creación, organización, transferencia, conservación y servicios de los archivos públicos, teniendo en cuenta lo establecido en esta ley y sus disposiciones."
    ] },
    { n: 35, titulo: "Prevención y sanción.", cuerpo: [
      "El Gobierno Nacional, a través del Archivo General de la Nación, y las entidades territoriales, a través de sus respectivos Consejos de Archivos, tendrán a prevención facultades dirigidas a prevenir y sancionar el incumplimiento de lo señalado en la presente ley y sus normas reglamentarias, así:",
      "a) Emitir las órdenes necesarias para que se suspendan de inmediato las prácticas que amenacen o vulneren la integridad de los archivos públicos y se adopten las correspondientes medidas preventivas y correctivas.",
      "Cuando no se encuentre prevista norma especial, el incumplimiento de las órdenes impartidas conforme al presente literal será sancionado por la autoridad que las profiera, con multas semanales sucesivas a favor del tesoro nacional, departamental, distrital o municipal, según el caso, de hasta veinte (20) salarios mínimos legales mensuales, impuestas por el tiempo que persista el incumplimiento;",
      "b) Las faltas contra el patrimonio documental serán tenidas como faltas gravísimas cuando fueren realizadas por servidores públicos, de conformidad con el artículo 25 de la Ley 200 de 1995;",
      "c) Si la falta constituye hecho punible por la destrucción o daño del patrimonio documental o por su explotación ilegal, de conformidad con lo establecido en los artículos 218 a 226, 349, 370, 371 y 372 del Código Penal, es obligación instaurar la respectiva denuncia y, si hubiere flagrancia, poner inmediatamente el retenido a órdenes de la autoridad de policía más cercana, sin perjuicio de las sanciones patrimoniales previstas;",
      "d) Cuando se exporten o se sustraigan ilegalmente documentos y archivos históricos públicos, éstos serán decomisados y puestos a órdenes del Ministerio de la Cultura. El Estado realizará todos los esfuerzos tendientes a repatriar los documentos y archivos que hayan sido extraídos ilegalmente del territorio colombiano."
    ] },
    { n: 36, titulo: "Archivo privado.", cuerpo: [
      "Conjunto de documentos pertenecientes a personas naturales o jurídicas de derecho privado y aquellos que se deriven de la prestación de sus servicios."
    ] },
    { n: 37, titulo: "Asistencia a los archivos privados.", cuerpo: [
      "El Estado estimulará la organización, conservación y consulta de los archivos históricos privados de interés económico, social, técnico, científico y cultural. En consecuencia, el Archivo General de la Nación brindará especial protección y asistencia a los archivos de las instituciones y centros de investigación y enseñanza científica y técnica, empresariales y del mundo del trabajo, de las iglesias, las asociaciones y los partidos políticos, así como a los archivos familiares y de personalidades destacadas en el campo del arte, la ciencia, la literatura y la política."
    ] },
    { n: 38, titulo: "Registro de archivos.", cuerpo: [
      "Las personas naturales o jurídicas propietarias, poseedoras o tenedoras de documentos o archivos de cierta significación histórica, deberán inscribirlos en el registro que para tal efecto abrirá el Archivo General de la Nación. Los propietarios, poseedores o tenedores de los archivos privados declarados de interés cultural, continuarán con la propiedad, posesión o tenencia de los mismos y deberán facilitar las copias que el Archivo General de la Nación solicite."
    ] },
    { n: 39, titulo: "Declaración de interés cultural de documentos privados.", cuerpo: [
      "La Junta Directiva del Archivo General de la Nación, sin perjuicio del derecho de propiedad y siguiendo el procedimiento que se establezca para el efecto, podrá declarar de interés cultural los documentos privados de carácter histórico. Estos formará parte del patrimonio documental colombiano y en consecuencia serán de libre acceso."
    ] },
    { n: 40, titulo: "Régimen de estímulos.", cuerpo: [
      "El Gobierno Nacional establecerá y reglamentará un régimen de estímulos no tributarios para los archivos privados declarados de interés cultural, tales como: premios anuales, asistencia técnica, divulgación y pasantías."
    ] },
    { n: 41, titulo: "Prohibiciones.", cuerpo: [
      "Se prohíbe a los organismos privados y a las personas naturales o jurídicas propietarias, poseedoras o tenedoras de documentos declarados de interés cultural:",
      "a) Trasladarlos fuera del territorio nacional, sin la previa autorización del Archivo General de la Nación. Esta falta dará lugar a la imposición de una multa de cien salarios mínimos legales mensuales vigentes.",
      "Los documentos y archivos históricos privados declarados de interés cultural, objeto de la exportación o sustracción ilegal, serán decomisados y puestos a orden del Ministerio de la Cultura. El Estado realizará todos los esfuerzos tendientes a repatriar los documentos y archivos que hayan sido extraídos ilegalmente del territorio colombiano;",
      "b) Transferir a título oneroso o gratuito la propiedad, posesión o tenencia de documentos históricos, sin previa información al Archivo General de la Nación. Esta falta dará lugar a la imposición de una multa de cincuenta salarios mínimos legales mensuales vigentes.",
      "PARÁGRAFO. El desconocimiento de estas prohibiciones dará lugar a la investigación correspondiente y a la imposición de las sanciones establecidas en la ley."
    ] },
    { n: 42, titulo: "Obligatoriedad de la cláusula contractual.", cuerpo: [
      "Cuando las entidades públicas celebren contratos con personas naturales o jurídicas, nacionales o extranjeras, para desarrollar proyectos de investigación cultural, científica, técnica o industrial, incluirán en los contratos una cláusula donde se establezca la obligación de aquéllas de entregar copias de los archivos producidos en desarrollo de dichos proyectos, siempre y cuando no contraríen las normas sobre propiedad intelectual y no se vulneren los derechos otorgados a dichas personas por el artículo 15 de la Constitución Política.",
      "PARÁGRAFO. Las personas jurídicas internacionales con sedes o filiales en Colombia, en relación con sus documentos de archivo, se regularán por las convenciones internacionales y los contratos suscritos. En todo caso, el Archivo General de la Nación podrá recibir los documentos y archivos que deseen transferir."
    ] },
    { n: 43, titulo: "Protocolos notariales.", cuerpo: [
      "Los protocolos notariales pertenecen a la Nación. Los que tengan más de treinta años deberán ser transferidos por la correspondiente notaría al Archivo General Notarial del respectivo círculo. Para tal efecto el Gobierno Nacional, con asesoría del Archivo General de la Nación, tomará las medidas pertinentes."
    ] },
    { n: 44, titulo: "Donaciones.", cuerpo: [
      "El Archivo General de la Nación y los archivos históricos públicos podrán recibir donaciones, depósitos y legados de documentos históricos."
    ] },
    { n: 45, titulo: "Adquisición y/o expropiación.", cuerpo: [
      "Los archivos privados de carácter histórico declarados de interés público, podrán ser adquiridos por la Nación cuando el propietario los ofreciere en venta.",
      "Declárase de interés público o de interés social, para efectos de la expropiación por vía administrativa a la que se refiere la Constitución Política, la adquisición de archivos privados de carácter histórico-cultural que se encuentren en peligro de destrucción, desaparición, deterioro o pérdida."
    ] },
    { n: 46, titulo: "Conservación de documentos.", cuerpo: [
      "Los archivos de la Administración Pública deberán implementar un sistema integrado de conservación en cada una de las fases del ciclo vital de los documentos."
    ] },
    { n: 47, titulo: "Calidad de los soportes.", cuerpo: [
      "Los documentos de archivo, sean originales o copias, deberán elaborarse en soportes de comprobada durabilidad y calidad, de acuerdo con las normas nacionales o internacionales que para el efecto sean acogidas por el Archivo General de la Nación.",
      "PARÁGRAFO. Los documentos de archivo de conservación permanente podrán ser copiados en nuevos soportes. En tal caso, deberá preverse un programa de transferencia de información para garantizar la preservación y conservación de la misma."
    ] },
    { n: 48, titulo: "Conservación de documentos en nuevos soportes.", cuerpo: [
      "El Archivo General de la Nación dará pautas y normas técnicas generales sobre conservación de archivos, incluyendo lo relativo a los documentos en nuevos soportes."
    ] },
    { n: 49, titulo: "Reproducción de documentos.", cuerpo: [
      "El parágrafo del artículo 2o. de la Ley 80 de 1989 quedará así: “En ningún caso los documentos de carácter histórico podrán ser destruidos, aunque hayan sido reproducidos por cualquier medio”."
    ] },
    { n: 50, titulo: "Estímulos.", cuerpo: [
      "El Gobierno Nacional establecerá premios y estímulos no tributarios para las personas o instituciones que con sus acciones y trabajos técnicos, culturales o científicos contribuyan a la salvaguarda, difusión o incremento del patrimonio documental del país, así como a los autores de estudios históricos significativos para la historiografía nacional elaborados con base en fuentes primarias. Tales premios y estímulos podrán consistir en: becas, concursos, publicaciones, pasantías, capacitación y distinciones honoríficas."
    ] },
    { n: 51, titulo: "Apoyo de los organismos de control.", cuerpo: [
      "La Procuraduría General de la Nación y la Contraloría General de la República prestarán todo el apoyo en lo de su competencia al Archivo General de la Nación, para el cumplimiento de lo preceptuado en esta ley."
    ] },
    { n: 52, titulo: "Vigencias y derogatorias.", cuerpo: [
      "Esta ley rige a partir de la fecha de su publicación y deroga en lo pertinente todas las disposiciones que le sean contrarias."
    ] }
  ];

  var fuentes = {
    agn: { t: "Ley 594 de 2000, Normatividad AGN (fuente del texto)", u: "https://normativa.archivogeneral.gov.co/ley-594-de-2000/" },
    suin: { t: "SUIN-Juriscol, Ley 594 de 2000 (enlace citado por el AGN; no consultable de forma automatizada)", u: "http://www.suin-juriscol.gov.co/viewDocument.asp?ruta=Leyes/1663152" },
    ley57: { t: "Ley 57 de 1985, normograma de la Cancillería", u: "https://cancilleria.gov.co/sites/default/files/Normograma/docs/ley_0057_1985.htm" },
    d2609: { t: "Decreto 2609 de 2012, normograma del ICFES", u: "https://normograma.icfes.gov.co/docs/pdf/decreto_2609_2012.pdf" },
    d2578: { t: "Decreto 2578 de 2012, normograma del ICFES", u: "https://normograma.icfes.gov.co/docs/pdf/decreto_2578_2012.pdf" },
    d1515: { t: "Decreto 1515 de 2013, normograma de la Cancillería", u: "https://cancilleria.gov.co/sites/default/files/Normograma/docs/pdf/decreto_1515_2013.pdf" },
    d1100: { t: "Decreto 1100 de 2014, Función Pública", u: "https://funcionpublica.gov.co/eva/gestornormativo/norma_pdf.php?i=57728" },
    a004: { t: "Acuerdo 4 de 2019 del AGN, con nota de vigencia", u: "https://cancilleria.gov.co/sites/default/files/Normograma/docs/acuerdo_archivo_0004_2019.htm" },
    a001: { t: "Acuerdo 001 de 2024 del AGN (Diario Oficial 52.723)", u: "https://normograma.invima.gov.co/normograma/docs/pdf/acuerdo_archivo_0001_2024.pdf" },
    l1712: { t: "Ley 1712 de 2014, arts. 18 a 22", u: "https://encolombia.com/derecho/leyes/ley-transparencia/informacion-publica/" },
    d1081: { t: "Decreto 1081 de 2015, normograma de la Cancillería", u: "https://www.cancilleria.gov.co/sites/default/files/Normograma/docs/decreto_1081_2015_pr001.htm" },
    l734: { t: "Ley 734 de 2002, nota de vigencia en el normograma del MinTIC", u: "https://normograma.mintic.gov.co/MINTIC/docs/pdf/ley_0734_2002.pdf" },
    d1080: { t: "Decreto 1080 de 2015, Decreto Único Reglamentario del Sector Cultura", u: "https://normativa.colpensiones.gov.co/compilacion/docs/decreto_1080_2015.htm" },
    banrep: { t: "Banco de la República, análisis sobre reserva de documentos", u: "https://www.banrep.gov.co/sites/default/files/paginas/jd-documento-analisis.pdf" }
  };

  /* tipo: "fuente" = nota que ya trae el micrositio del AGN.
           "vigencia" = hallazgo verificado en normogramas oficiales.
           "explicacion" = lectura explicativa; no es texto legal. */
  var notas = [
    { alcance: { art: 5 }, tipo: "vigencia", fuentes: ["d2578", "d1080"],
      texto: "El Decreto 2578 de 2012 reglamentó el Sistema Nacional de Archivos y sus artículos quedaron compilados en el Decreto 1080 de 2015 (numeración 2.8.2.1.x)." },
    { alcance: { titulo: 5 }, tipo: "fuente", fuentes: ["agn"],
      texto: "Nota del micrositio del AGN: este título está reglamentado por el Decreto 1080 de 2015." },
    { alcance: { titulo: 5 }, tipo: "vigencia", fuentes: ["d2609", "d1080"],
      texto: "El Decreto 2609 de 2012 reglamentó el Título V (gestión de documentos) y sus artículos quedaron compilados en el Decreto 1080 de 2015 (numeración 2.8.2.5.x)." },
    { alcance: { art: 20 }, tipo: "fuente", fuentes: ["agn"],
      texto: "Nota del micrositio del AGN: este artículo está reglamentado por el Decreto 1080 de 2015." },
    { alcance: { art: 24 }, tipo: "vigencia", fuentes: ["a001", "a004"],
      texto: "El procedimiento para elaborar, evaluar y convalidar tablas de retención y de valoración documental lo fija hoy el Acuerdo 001 de 2024 del AGN (Diario Oficial 52.723 del 10 de abril de 2024). Ese acuerdo derogó el Acuerdo 004 de 2019, según la nota de vigencia de este último (art. 10.1 del Acuerdo 1 de 2024)." },
    { alcance: { art: 27 }, tipo: "explicacion", fuentes: ["l1712", "d1081"],
      texto: "Explicación, no texto legal: la Ley 1712 de 2014 desarrolla el acceso a la información pública. Su art. 22 dispone que la reserva por daño a intereses públicos (art. 19) no se extiende más de quince años, y el Decreto 1081 de 2015 precisa que ese plazo se cuenta desde que la información se genera. Cómo se articula ese plazo con los treinta años del art. 28 de la Ley 594 no se resolvió aquí con jurisprudencia; en un caso concreto conviene revisar la excepción invocada." },
    { alcance: { art: 28 }, tipo: "vigencia", fuentes: ["ley57", "banrep"],
      texto: "El normograma de la Ley 57 de 1985 registra que el inciso 2 de su art. 13 fue modificado por el art. 28 de la Ley 594 de 2000. Un documento del Banco de la República muestra que, en la práctica, algunas entidades han aplicado el plazo de treinta años de la Ley 57 de 1985 a ciertos documentos reservados." },
    { alcance: { titulo: 8 }, tipo: "fuente", fuentes: ["agn"],
      texto: "Nota del micrositio del AGN: este título está reglamentado por el Decreto 1080 de 2015." },
    { alcance: { art: 35 }, tipo: "explicacion", fuentes: ["l734"],
      texto: "Explicación, no texto legal: el literal b) remite a la Ley 200 de 1995. El normograma del MinTIC registra que la Ley 734 de 2002 fue derogada desde el 29 de marzo de 2022 por la Ley 1952 de 2019 (modificada por la Ley 2094 de 2021). No se verificó en esta consulta el numeral de la Ley 1952 que hoy corresponde ni la derogatoria de la Ley 200. Los artículos del Código Penal del literal c) tampoco se contrastaron: la numeración parece anterior a la Ley 599 de 2000, que se publicó diez días después. Revisar antes de citar." }
  ];

  window.LEY594 = {
    meta: {
      numero: "594",
      anio: 2000,
      fecha: "14 de julio de 2000",
      nombre: "Por medio de la cual se dicta la Ley General de Archivos y se dictan otras disposiciones",
      nombreCorto: "Ley General de Archivos",
      organo: "El Congreso de Colombia",
      diarioOficial: "Diario Oficial 44084 de julio 14 de 2000",
      estadoFuente: "Vigente",
      verificado: "8 de octubre de 2026",
      verificadoISO: "2026-10-08",
      divisionNota: "La ley se organiza en 13 títulos y 52 artículos. No tiene capítulos."
    },
    preambulo: [
      "LEY 594 DE 2000",
      "(Julio 14)",
      "Por medio de la cual se dicta la Ley General de Archivos y se dictan otras disposiciones",
      "El Congreso de Colombia",
      "DECRETA:"
    ],
    cierre: [
      "El Presidente del honorable Senado de la República, MIGUEL PINEDO VIDAL.",
      "El Secretario General del honorable Senado de la República, MANUEL ENRÍQUEZ ROSERO.",
      "La Presidenta de la honorable Cámara de Representantes, NANCY PATRICIA GUTIÉRREZ CASTAÑEDA.",
      "El Secretario General de la honorable Cámara de Representantes, GUSTAVO BUSTAMANTE MORATTO.",
      "REPUBLICA DE COLOMBIA GOBIERNO NACIONAL",
      "Publíquese y ejecútese.",
      "Dada en Santa Fe de Bogotá, D. C., a 14 de julio de 2000.",
      "ANDRES PASTRANA ARANGO",
      "El Ministro de Hacienda y Crédito Público, Juan Camilo Restrepo Salazar.",
      "El Ministro de Cultura, Juan Luis Mejía Arango.",
      "NOTA: Publicada en el Diario Oficial 44084 de julio 14 de 2000."
    ],
    titulos: titulos,
    articulos: articulos,
    fuentes: fuentes,
    notas: notas
  };
})();
