// ============================================================
// CONFIGURACIÓN EDITABLE — PG del Campo Web
// Modifica los valores aquí y toda la web se actualiza.
// ============================================================

const APP_CONFIG = {

  // ---------- IDENTIDAD DE LA EMPRESA ----------
  empresa: {
    nombre:       "PG del Campo",
    nombreLegal:  "Productos Globales del Campo",
    ruc:           "0452907730000U",
    eslogan:       "Del Campo a su Mesa",
    lema:          "Todo lo bueno viene de Dios, con su ayuda todo es posible",
    telefono:      "+505 57973097",
    whatsapp:      "50557973097",
    email:         "proglodelcam@gmail.com",
    ubicacion:     "Jinotepe, Carazo — Nicaragua",
    direccion:    "Km 38 Carretera Jinotepe a San Marcos",
    copyright:    "© 2026 PG del Campo. Todos los derechos reservados.",
    anoInicio:    2024
  },

  // ---------- ENLACES EXTERNOS ----------
  enlaces: {
    kyteTienda:    "https://proglodelcampo.catalog.kyte.site/",
    kyteCereales:  "https://proglodelcampo.catalog.kyte.site/cereales",
    tarjetaFidelidad: "https://proglodelcam-commits.github.io/tarjeta-fidelidad/",
    pagoQR:        "https://digital.lafise.com/?BANK=BLNI&ACCOUNT_NUMBER=140051265&AMOUNT=940.70&REFERENCE=0001006&CONCEPT=Compra%20Productos%20PG%20del%20Campo",
    agente:       "https://business-card.io/c/2c023cba-0548-485c-9285-80d553459cdd/",
    whatsapp:      "https://wa.me/50557973097?text=Hola%20PG%20del%20Campo",
    facebook:     "",
    instagram:    ""
  },

  // ---------- CHATBOT (BotsPG) ----------
  chatbot: {
    enabled:     true,
    usarServidor: true,  // true = usa el asistente del servidor (Apps Script). Si falla, responde en local.
    titulo:      "BotsPG",
    subtitulo:   "Asistente Virtual",
    bienvenida:  "¡Hola! Soy BotsPG, asistente de Productos Globales del Campo. ¿En qué te puedo asesorar hoy? Ofrecemos café de altura, pinolillo, abono orgánico y envíos en la zona de Carazo.",
    placeholder: "Pregúntame por precios, productos o presupuestos...",
    webAppUrl:   "https://script.google.com/macros/s/AKfycbzm-VrcGn22nThJQgab0xL_RLgwld_jcxvOXotDmMl8jQnWVjI8HmO7Du-QlV_iIQGM/exec"
  },

  // ---------- HORARIOS ----------
  horarios: [
    { dia: "Lunes",      horario: "Cerrado" },
    { dia: "Martes",     horario: "5:30 p.m. – 11:00 p.m." },
    { dia: "Miércoles",  horario: "5:30 p.m. – 1:00 a.m." },
    { dia: "Jueves",    horario: "5:30 p.m. – 11:00 p.m." },
    { dia: "Viernes",   horario: "6:00 p.m. – 2:00 a.m." },
    { dia: "Sábado",    horario: "6:00 p.m. – 4:00 a.m." },
    { dia: "Domingos",  horario: "Cerrado" }
  ],

  // ---------- PAGOS ----------
  pagos: {
    banco:       "Bancentro LAFISE",
    cuenta:      "140051265",
    aliasAch:    "5797 3097",
    titular:     "Fernando F. Martínez Flores",
    notaCheque:  "Girado a nombre de Fernando F. Martínez Flores (Representante Legal)",
    contraEntrega: "Cancela tu pedido al momento de recibirlo. Pago directo al Agente designado."
  },

  // ---------- PRODUCTOS DESTACADOS ----------
  productos: [
    { nombre: "Café de Altura",   desc: "Tostado y molido 100% Carazo", icono: "☕" },
    { nombre: "Pinolillo",        desc: "Bebida ancestral nicaragüense", icono: "🌽" },
    { nombre: "Pinol",            desc: "Tradición y sabor campesino", icono: "🥣" },
    { nombre: "Humus de Lombriz", desc: "Abono orgánico premium",       icono: "🌱" }
  ],

  // ---------- TABLA NUTRICIONAL DEL CAFÉ ----------
  tablaNutricional: {
    titulo:    "Tabla nutricional del café tostado y molido",
    subtitulo: "Valores por cada 100 g",
    filas: [
      ["Calorías",        "201 kcal"],
      ["Proteínas",       "12.6 g"],
      ["Grasas totales",  "14.2 g"],
      ["Carbohidratos",   "28.3 g"],
      ["Fibra",            "18.5 g"],
      ["Azúcares",         "0 g"],
      ["Sodio",            "67 mg"],
      ["Potasio",         "4 025 mg"],
      ["Cafeína",         "2 650 mg"]
    ],
    nota: "Estos valores pueden variar según la variedad del café y el método de preparación. En general, el café es una bebida baja en calorías y rica en antioxidantes."
  },

  // ---------- CLUB DE FIDELIDAD ----------
  club: {
    titulo:    "Club de Fidelidad",
    eslogan:   "Tu lealtad nos inspira, la naturaleza nos une",
    pasos: [
      { num: 1, texto: "Crea una cuenta — Regístrate o Inicia Sesión en nuestra Tienda en Línea (Kyte).", enlace: "kyteTienda" },
      { num: 2, texto: "Realiza tus Compras — Compra tus productos favoritos y acumula.", enlace: "" },
      { num: 3, texto: "Kyte registra tu historial — Todas tus compras quedan registradas automáticamente.", enlace: "" },
      { num: 4, texto: "Consulta tu Historial — Revisa tus compras en tu cuenta \"Pedido\" en Kyte.", enlace: "kyteTienda" },
      { num: 5, texto: "Obtén tu Beneficio — Al completar 5 compras recibes un 2% adicional en tu siguiente compra.", enlace: "" }
    ],
    cierre: "Disfruta de Nuestros Productos Naturales y acumula beneficios."
  },

  // ---------- COLORES Y ESTILO ----------
  estilo: {
    primario:   "#2d5a27",
    primarioClaro: "#4caf50",
    secundario: "#81c784",
    oscuro:     "#1b5e20",
    fondoClaro: "#f4f6f4",
    texto:      "#333333",
    acentos:    "#ff9800"
  }

};

// Exponer para la carga de configuración remota (Panel → Firebase config/web)
window.APP_CONFIG = APP_CONFIG;
