# Flora

Flora is a responsive flower shop landing page that lets visitors browse bouquets, view product details, and place an order. Product data is served by a mock REST API, and the bouquet catalog is rendered dynamically with pagination. The frontend is built with Vite and vanilla JavaScript modules, and communicates with the API through Axios.

## Features

- Responsive layout with adaptive breakpoints for mobile, tablet, and desktop
- Retina-ready images served via `<picture>` with `@X1`/`@X2` (1x/2x) sources in WebP and JPG
- Dynamic bouquet catalog rendered from the API
- Bestsellers carousel with navigation arrows and pagination dots
- Customer reviews slider
- "Load More" pagination for the bouquet catalog
- Product details modal with quantity selection
- Order modal and order form that submits to the API
- Mobile navigation menu with accessible toggle state
- Scroll-to-top button
- Scroll-reveal animations (AOS)
- Keyboard support for opening product cards and closing modals (Enter/Space/Escape) with focus management
- Loading state while bouquets are being fetched
- Error handling with user-facing messages for failed catalog, bestsellers, and order requests
- Axios-based HTTP requests using async/await
- Mock REST API powered by JSON Server
- Frontend deployment configured for GitHub Pages
- API deployment configured for Render

## Technologies

- HTML5
- CSS3
- JavaScript (ES6 Modules)
- Vite
- Axios
- JSON Server
- AOS (Animate On Scroll)
- concurrently
- gh-pages
- GitHub Pages
- Render

## Project Structure

```
.
├── index.html            # Page markup and modal templates
├── db.json               # Mock database (bouquets, bestsellers, orders, subscribers)
├── vite.config.js        # Vite configuration (GitHub Pages base path)
├── package.json          # Scripts and dependencies
├── js/
│   ├── main.js           # Entry point; initializes all modules
│   ├── api.js            # Axios instance and API request helpers
│   ├── bouquets.js       # Catalog rendering, pagination, loading and error states
│   ├── bestsellers.js    # Bestsellers fetching and slider setup
│   ├── modal.js          # Product and order modal logic
│   ├── forms.js          # Order form submission handling
│   ├── slider.js         # Reusable carousel (dots, arrows, scroll sync)
│   ├── mobile-menu.js    # Mobile navigation toggle
│   └── scroll-top.js     # Scroll-to-top button
├── styles/
│   ├── reset.css
│   ├── colors.css
│   ├── fonts.css
│   └── styles.css        # Main stylesheet
└── public/
    └── images/           # Retina image assets (WebP/JPG), icons, favicon
```

## Installation

```bash
git clone https://github.com/exisade/UMT-markup-practice_P2-Toma_Denys.git
cd UMT-markup-practice_P2-Toma_Denys
npm install
```

## Running locally

```bash
npm run dev
```

## Running local API

```bash
npm run server
```

The API is served from `db.json` using JSON Server. The port is read from the `PORT` environment variable.

## Run frontend + API together

```bash
npm run dev:all
```

Runs the Vite dev server and JSON Server concurrently.

## Build

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```

## Deploy to GitHub Pages

```bash
npm run deploy
```

Publishes the contents of the `dist` directory to GitHub Pages using `gh-pages`.

## Deployment

- The frontend is deployed as a static site using GitHub Pages. The Vite `base` path is configured to match the repository name so assets resolve correctly.
- The mock REST API is deployed on Render as a JSON Server instance.

Live links:

- Frontend (GitHub Pages): `<your-github-pages-url>`
- API (Render): `<your-render-api-url>`

## API


https://umt-markup-practice-p2-toma-denys.onrender.com

```
GET  /bouquets?_page=<page>&_limit=<limit>   # Paginated bouquet catalog
GET  /bestsellers                            # Bestseller bouquets
POST /orders                                 # Submit a customer order
```

Pagination uses the JSON Server `_page` and `_limit` parameters, and relies on the `X-Total-Count` response header to determine when all items have been loaded.


## Author

exisade
