// ============================================================
// PG del Campo — Lógica principal de la Web
// Usa APP_CONFIG de config.js para todos los textos/enlaces.
// ============================================================

document.addEventListener('DOMContentLoaded', aplicarConfig);

function aplicarConfig() {
  const C = APP_CONFIG;

  // ---- 1. Inyectar textos de identidad ----
  const el = (id) => document.getElementById(id);
  const txt = (id, val) => { if (el(id)) el(id).textContent = val; };
  const html = (id, val) => { if (el(id)) el(id).innerHTML = val; };

  txt('site-title', C.empresa.nombre);
  txt('hero-title', C.empresa.nombre);
  txt('hero-slogan', C.empresa.eslogan);
  txt('hero-lema', C.empresa.lema);
  txt('footer-location', C.empresa.ubicacion);
  txt('footer-copy', C.empresa.copyright);
  txt('footer-phone', C.empresa.telefono);
  txt('footer-email', C.empresa.email);
  txt('footer-dir', C.empresa.direccion);
  txt('footer-ruc', 'RUC: ' + C.empresa.ruc);

  // ---- 2. Enlaces dinámicos ----
  const href = (id, url) => { const a = el(id); if (a && url) a.href = url; };
  href('link-kyte', C.enlaces.kyteTienda);
  href('link-kyte2', C.enlaces.kyteTienda);
  href('link-kyte-cereales', C.enlaces.kyteCereales);
  href('link-qr', C.enlaces.pagoQR);
  href('link-agente', C.enlaces.agente);
  href('link-whatsapp', C.enlaces.whatsapp);
  href('link-whatsapp2', C.enlaces.whatsapp);
  href('link-tarjeta', C.enlaces.tarjetaFidelidad);
  href('link-tarjeta2', C.enlaces.tarjetaFidelidad);

  // Ocultar secciones vacías
  if (!C.enlaces.agente) {
    document.querySelectorAll('.sec-agente').forEach(s => s.classList.add('hidden'));
  }

  // ---- 3. Productos destacados ----
  const grid = el('productos-grid');
  if (grid && C.productos.length) {
    grid.innerHTML = C.productos.map(p => `
      <div class="producto-card">
        <span class="icono">${p.icono}</span>
        <h3>${p.nombre}</h3>
        <p>${p.desc}</p>
      </div>
    `).join('');
  }

  // ---- 4. Horarios ----
  const tablaH = el('horarios-body');
  if (tablaH && C.horarios.length) {
    tablaH.innerHTML = C.horarios.map(h => {
      const cls = h.horario === 'Cerrado' ? ' class="cerrado"' : '';
      return `<tr><td>${h.dia}</td><td${cls}>${h.horario}</td></tr>`;
    }).join('');
  }

  // ---- 5. Tabla nutricional ----
  const nutriBody = el('nutri-body');
  if (nutriBody && C.tablaNutricional.filas.length) {
    nutriBody.innerHTML = C.tablaNutricional.filas.map(f =>
      `<tr><td>${f[0]}</td><td>${f[1]}</td></tr>`
    ).join('');
  }
  txt('nutri-nota', C.tablaNutricional.nota);

  // ---- 6. Club de Fidelidad ----
  const clubDiv = el('club-pasos');
  if (clubDiv && C.club.pasos.length) {
    clubDiv.innerHTML = C.club.pasos.map(p => {
      const link = p.enlace ? ` <a href="${C.enlaces[p.enlace] || '#'}" target="_blank" rel="noopener">Haz clic aquí</a>` : '';
      return `
        <div class="club-paso">
          <div class="paso-circle">${p.num}</div>
          <div class="paso-text">${p.texto}${link}</div>
        </div>`;
    }).join('');
  }
  txt('club-eslogan', C.club.eslogan);
  txt('club-cierre', C.club.cierre);

  // ---- 7. Datos bancarios ----
  txt('pago-banco', C.pagos.banco);
  txt('pago-cuenta', C.pagos.cuenta);
  txt('pago-alias', C.pagos.aliasAch);
  txt('pago-titular', C.pagos.titular);
  txt('pago-cheque', C.pagos.notaCheque);
  txt('pago-entrega', C.pagos.contraEntrega);

  // ---- 8. Menú móvil ----
  const toggle = el('nav-toggle');
  const links  = el('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }

  // ---- 9. Chatbot ----
  if (C.chatbot.enabled) {
    const w = el('chat-welcome'); if (w && C.chatbot.bienvenida) w.innerHTML = C.chatbot.bienvenida;
    txt('chat-title', C.chatbot.titulo);
    txt('chat-badge', C.chatbot.subtitulo);
    el('chat-fab')?.classList.remove('hidden');
    if (!window._chatbotInit) { window._chatbotInit = true; initChatbot(C.chatbot); }
  } else {
    el('chat-fab')?.classList.add('hidden');
  }
}
// Permite re-renderizar la web cuando llega la configuración remota (Firebase)
window.aplicarConfig = aplicarConfig;


// ============================================================
// CHATBOT BotsPG
// ============================================================
function initChatbot(cfg) {
  const el = (id) => document.getElementById(id);

  txt('chat-title', cfg.titulo);
  txt('chat-badge', cfg.subtitulo);
  const bienvenida = el('chat-welcome'); if (bienvenida) bienvenida.innerHTML = cfg.bienvenida;
  el('chat-input')?.setAttribute('placeholder', cfg.placeholder);

  // Abrir / cerrar panel
  el('chat-fab')?.addEventListener('click', () => {
    el('chat-panel')?.classList.toggle('open');
  });
  el('chat-close')?.addEventListener('click', () => {
    el('chat-panel')?.classList.remove('open');
  });

  // Enviar mensaje
  const btnSend = el('chat-send');
  const input   = el('chat-input');
  const body    = el('chat-body');

  async function enviar() {
    const msg = input.value.trim();
    if (!msg) return;

    body.innerHTML += `<div class="chat-msg user">${escHtml(msg)}</div>`;
    input.value = '';
    body.scrollTop = body.scrollHeight;

    btnSend.disabled = true;
    const loading = document.createElement('div');
    loading.className = 'chat-msg bot';
    loading.innerHTML = '<i>Analizando solicitud...</i>';
    body.appendChild(loading);
    body.scrollTop = body.scrollHeight;

    try {
      let respuesta = '';
      // 1) Primero intenta el asistente del servidor (Google Apps Script), igual que la versión que te funciona.
      if (cfg.usarServidor && cfg.webAppUrl) {
        try {
          const resp = await fetch(cfg.webAppUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain' },
            body: JSON.stringify({ mensaje: msg })
          });
          const data = await resp.json();
          respuesta = (data && data.respuesta) ? data.respuesta : '';
        } catch (err) { respuesta = ''; }
      }
      // 2) Si el servidor no respondió, usa el asistente local con los datos de la web.
      if (!respuesta) respuesta = responderLocal(msg);
      loading.innerHTML = respuesta || responderFallback();
    } catch (e) {
      loading.innerHTML = responderFallback();
    }

    btnSend.disabled = false;
    body.scrollTop = body.scrollHeight;
  }

  btnSend?.addEventListener('click', enviar);
  input?.addEventListener('keypress', e => { if (e.key === 'Enter') enviar(); });

  function escHtml(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

  // --- Asistente local (sin servidor): responde con los datos de APP_CONFIG ---
  function norm(s){ return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,''); }
  function tieneAlguna(t, arr){ return arr.some(k => t.includes(k)); }

  function responderFallback(){
    const C = APP_CONFIG;
    const wa = C.enlaces.whatsapp || ('https://wa.me/' + (C.empresa.whatsapp||''));
    return 'No estoy seguro de eso 😅, pero con gusto te atiende una persona por WhatsApp: '
      + '<a href="' + wa + '" target="_blank" rel="noopener"><b>Escribir ahora</b></a>. '
      + 'Puedes preguntarme por: <i>productos, precios, horarios, pagos, envíos, fidelidad o contacto</i>.';
  }

  function responderLocal(mensaje){
    const C = APP_CONFIG;
    const t = norm(mensaje);
    const wa = C.enlaces.whatsapp || ('https://wa.me/' + (C.empresa.whatsapp||''));

    if (tieneAlguna(t, ['hola','buenas','buenos dias','buenas tardes','buenas noches','saludos','que tal'])) {
      return '¡Hola! 👋 Soy ' + (C.chatbot.titulo||'el asistente') + ' de ' + C.empresa.nombre + '. '
        + 'Pregúntame por <b>productos, precios, horarios, pagos, envíos o fidelidad</b>.';
    }
    if (tieneAlguna(t, ['producto','vende','ofrecen','catalogo','que tienen','cafe','pinolillo','pinol','humus','abono'])) {
      const lista = (C.productos||[]).map(p => p.icono + ' <b>' + p.nombre + '</b> — ' + p.desc).join('<br>');
      return 'Estos son nuestros productos destacados:<br>' + lista
        + '<br><br>Mira el catálogo completo en <a href="' + C.enlaces.kyteTienda + '" target="_blank" rel="noopener"><b>nuestra tienda Kyte</b></a>.';
    }
    if (tieneAlguna(t, ['precio','cuesta','vale','costo','cuanto'])) {
      return 'Los precios actualizados están en nuestra tienda en línea: '
        + '<a href="' + C.enlaces.kyteTienda + '" target="_blank" rel="noopener"><b>Ver catálogo Kyte</b></a>. '
        + 'Si quieres una cotización, escríbenos por <a href="' + wa + '" target="_blank" rel="noopener">WhatsApp</a>.';
    }
    if (tieneAlguna(t, ['horario','abren','cierran','atienden','hora','abierto'])) {
      const h = (C.horarios||[]).map(x => '• <b>' + x.dia + ':</b> ' + x.horario).join('<br>');
      return 'Nuestros horarios de atención son:<br>' + h;
    }
    if (tieneAlguna(t, ['pago','pagar','transferencia','lafise','banco','cuenta','alias','ach','deposito','tarjeta'])) {
      return 'Puedes pagar así:<br>'
        + '• <b>Transferencia LAFISE</b> — Banco: ' + C.pagos.banco + ', Cuenta N° <b>' + C.pagos.cuenta + '</b>'
        + (C.pagos.aliasAch ? ', Alias ACH/Móvil <b>' + C.pagos.aliasAch + '</b>' : '') + '.<br>'
        + '• <b>Titular:</b> ' + C.pagos.titular + '<br>'
        + '• <b>Contra entrega:</b> ' + C.pagos.contraEntrega + '<br>'
        + (C.enlaces.pagoQR ? 'También puedes <a href="' + C.enlaces.pagoQR + '" target="_blank" rel="noopener"><b>pagar en línea con QR</b></a>.' : '');
    }
    if (tieneAlguna(t, ['envio','entrega','delivery','despacho','mandan','llega','domicilio'])) {
      return 'Hacemos envíos en la zona de Carazo y alrededores. Para confirmar disponibilidad y costo de envío a tu dirección, escríbenos por <a href="' + wa + '" target="_blank" rel="noopener"><b>WhatsApp</b></a>.';
    }
    if (tieneAlguna(t, ['fidelidad','club','estrella','sello','descuento','promo','beneficio','puntos'])) {
      return 'En nuestro <b>Club de Fidelidad</b> acumulas estrellas con cada compra y obtienes descuentos. '
        + 'Consulta tus estrellas y compra aquí: <a href="' + (C.enlaces.tarjetaFidelidad||'#') + '" target="_blank" rel="noopener"><b>Tarjeta de Fidelidad</b></a>.';
    }
    if (tieneAlguna(t, ['contacto','telefono','whatsapp','llamar','correo','email','agente','hablar','persona'])) {
      return 'Puedes contactarnos:<br>• <b>Tel/WhatsApp:</b> ' + C.empresa.telefono
        + '<br>• <b>Correo:</b> ' + C.empresa.email
        + '<br><a href="' + wa + '" target="_blank" rel="noopener"><b>Escribir por WhatsApp</b></a>';
    }
    if (tieneAlguna(t, ['ubicacion','direccion','donde estan','donde queda','local','sucursal','mapa'])) {
      return 'Estamos en <b>' + C.empresa.ubicacion + '</b>' + (C.empresa.direccion ? ' (' + C.empresa.direccion + ')' : '') + '.';
    }
    if (tieneAlguna(t, ['tienda','kyte','comprar','pedido','online','en linea'])) {
      return 'Puedes comprar en línea en <a href="' + C.enlaces.kyteTienda + '" target="_blank" rel="noopener"><b>nuestra tienda Kyte</b></a>.';
    }
    if (tieneAlguna(t, ['gracias','grac','genial','perfecto','excelente'])) {
      return '¡Con gusto! 🌿 Si necesitas algo más, aquí estoy.';
    }
    return null;
  }
}

function txt(id, val) { const e = document.getElementById(id); if (e) e.textContent = val; }
