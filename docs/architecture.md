# Architecture

Almacén de Bicicletas JJ is a static multi-page website designed for GitHub Pages.

## Principles

- HTML owns document structure and fallback content.
- CSS is layered by responsibility: base, layout, components, pages.
- JavaScript progressively enhances existing markup through ES modules.
- Components initialize only when their target data attributes exist.
- Static JSON powers the product catalog without a backend.

## Runtime

The site can be opened as static HTML for content review. For full ES module and JSON behavior, use any static file server or GitHub Pages.
