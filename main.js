document.addEventListener("DOMContentLoaded", () => {
    // 1. Inyectar Textos
    document.getElementById("site-title").innerText = APP_CONFIG.empresa.nombre;
    document.getElementById("faith-phrase").innerText = APP_CONFIG.empresa.lema;
    document.getElementById("hero-slogan").innerText = APP_CONFIG.empresa.eslogan;
    document.getElementById("footer-location").innerText = APP_CONFIG.empresa.ubicacion;
    document.getElementById("footer-copy").innerText = APP_CONFIG.empresa.copyright;
    document.getElementById("footer-contact").innerText = `Tel: ${APP_CONFIG.empresa.telefono} | ${APP_CONFIG.empresa.email}`;

    // 2. Inyectar Enlaces Dinámicos
    document.getElementById("link-kyte").href = APP_CONFIG.enlaces.kyteTienda;
    document.getElementById("link-qr").href = APP_CONFIG.enlaces.pagoQR;
    document.getElementById("link-app").href = APP_CONFIG.enlaces.convertirApp;
    document.getElementById("link-agent").href = `https://wa.me{APP_CONFIG.empresa.telefono.replace(/\s+/g, '')}`;

    // 3. Carga Dinámica del Chatbot
    if (APP_CONFIG.chatbots.enabled && APP_CONFIG.chatbots.scriptUrl) {
        const chatbotScript = document.createElement("script");
        chatbotScript.src = APP_CONFIG.chatbots.scriptUrl;
        chatbotScript.async = true;
        document.body.appendChild(chatbotScript);
    }
});
