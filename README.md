# Almacén de Bicicletas JJ

Production-quality static website for a fictional bicycle shop and repair workshop in Bogota.

## Features

- Multi-page Spanish website: Inicio, Catalogo,reparaciónes, Nosotros, Contacto and FAQ.
- Modular CSS architecture with base, layout, component and page layers.
- ES6 module JavaScript with small single-responsibility classes.
- Responsive layout for desktop, laptop, tablet and mobile.
- Accessible navigation, skip link, semantic headings, form labels and FAQ ARIA states.
- Static product catalog backed by `data/bicycles.json`.
- WhatsApp contact handoff with local draft persistence.
- Embedded static Google Maps location and sample review cards.
- Local PNG visual assets and SVG icon assets.
- GitHub Pages compatible: no build step, backend, package manager or database.

## Folder Structure

```text
/
├── index.html
├── pages/
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── css/
│   ├── base/
│   ├── layout/
│   ├── components/
│   ├── pages/
│   └── main.css
├── js/
│   ├── core/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── config/
│   └── app.js
├── data/
│   └── bicycles.json
├── docs/
└── README.md
```

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript ES6 modules
- Static JSON

## Local Usage

Open `index.html` directly for a static content review.

For full JavaScript module and JSON catalog behavior, run a static server from the project root:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## GitHub Pages Deployment

1. Push the repository to GitHub.
2. Open repository settings.
3. Go to Pages.
4. Select the main branch and root folder.
5. Save and wait for the published URL.

No build command is required.

## Customization Guide

- Update shop name, phone, email and city in the HTML footer/navigation and `js/config/site.js`.
- Edit catalog products in `data/bicycles.json`.
- Replace generated images in `assets/images/` with real shop photography using the same filenames.
- Extend styles by adding focused files under `css/components/` or `css/pages/`, then import them from `css/main.css`.
- Add JavaScript behavior by creating a class in `js/components/` and registering it in `js/core/App.js`.
