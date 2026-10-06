# Web PG del Campo

Sitio web oficial de **Productos Globales del Campo** (PG del Campo).

## Estructura

```
├── public/
│   ├── index.html          # Página principal (SPA)
│   ├── css/
│   │   └── styles.css      # Estilos (colores en :root)
│   ├── js/
│   │   ├── config.js       # ⭐ CONFIGURACIÓN EDITABLE (todos los parámetros)
│   │   └── main.js          # Lógica de la web
│   ├── img/                 # Imágenes (favicon, QR, etc.)
│   └── firebase-config.js  # Claves Firebase (completar)
├── firebase.json           # Config Firebase Hosting
└── .github/workflows/      # Deploy automático a Firebase
```

## Cómo editar

Todos los textos, enlaces y parámetros están en **`public/js/config.js`**.
No es necesario tocar el HTML para cambiar:

- Nombre, eslogan, teléfono, email, ubicación
- Enlace de Kyte, WhatsApp, pago QR
- Chatbot BotsPG (URL de Google Apps Script)
- Horarios, datos bancarios, tabla nutricional
- Club de fidelidad (pasos y textos)
- Colores del sitio

## Despliegue

### GitHub Pages (actual)

Push al repo → GitHub Pages publica automáticamente.

### Firebase Hosting (alternativa)

```bash
firebase deploy --only hosting
```

## Enlaces

- Web: https://proglodelcam-commits.github.io/web-delcampo/
- Tienda Kyte: https://proglodelcampo.catalog.kyte.site/
- Chatbot: BotsPG (Google Apps Script)

---
© 2026 PG del Campo. Jinotepe, Carazo — Nicaragua.
