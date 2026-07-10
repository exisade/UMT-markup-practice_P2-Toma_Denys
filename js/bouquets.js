import { getBouquets } from './api.js';

const listRef = document.querySelector('[data-bouquets-list]');
const loaderRef = document.querySelector('[data-bouquets-loader]');
const errorRef = document.querySelector('[data-bouquets-error]');
const loadMoreBtnRef = document.querySelector('[data-bouquets-load-more]');
const endMessageRef = document.querySelector('[data-bouquets-end]');

const LIMIT = 8;

const BASE = import.meta.env.BASE_URL;

const state = {
  page: 1,
  loaded: 0,
};

const bouquetCardMarkup = ({ title, description, price, image }) => `
  <li
    class="floraBouquetCard"
    data-product-card
    tabindex="0"
    role="button"
    aria-label="View details for ${title}"
    data-title="${title}"
    data-price="${price}"
    data-description="${description}"
    data-image="${image}"
  >
    <picture>
      <source
        type="image/webp"
        srcset="${BASE}images/${image}@X1.webp 1x, ${BASE}images/${image}@X2.webp 2x"
      />
      <img
        src="${BASE}images/${image}@X1.jpg"
        srcset="${BASE}images/${image}@X1.jpg 1x, ${BASE}images/${image}@X2.jpg 2x"
        alt="${title}"
        loading="lazy"
        width="250"
        class="floraBouquetImage"
      />
    </picture>

    <h3 class="floraBouquetTitle">${title}</h3>
    <p class="floraText floraTrendingItemText">${description}</p>
    <p class="floraBouquetPrice">$${price}</p>
  </li>
`;

const showLoader = () => {
  if (loaderRef) loaderRef.hidden = false;
};

const hideLoader = () => {
  if (loaderRef) loaderRef.hidden = true;
};

const showError = () => {
  if (errorRef) {
    errorRef.textContent =
      "We're sorry, something went wrong while loading bouquets. Please try again later.";
    errorRef.hidden = false;
  }
};

const hideError = () => {
  if (errorRef) errorRef.hidden = true;
};

const loadBouquets = async ({ reset }) => {
  showLoader();
  hideError();

  if (reset) {
    state.page = 1;
    state.loaded = 0;
    listRef.innerHTML = '';
    if (endMessageRef) endMessageRef.hidden = true;
    if (loadMoreBtnRef) loadMoreBtnRef.hidden = true;
  }

  try {
    const { data, next, items } = await getBouquets({
      page: state.page,
      limit: LIMIT,
    });

    listRef.insertAdjacentHTML(
      'beforeend',
      data.map(bouquetCardMarkup).join('')
    );

    state.loaded += data.length;

    const hasKnownTotal = Number.isFinite(items) && items > 0;
    const isEnd = hasKnownTotal
      ? state.loaded >= items
      : next === null || data.length < LIMIT;

    if (loadMoreBtnRef) {
      loadMoreBtnRef.hidden = isEnd;
    }

    if (endMessageRef) {
      endMessageRef.hidden = !(isEnd && state.loaded > 0);
    }
  } catch (error) {
    console.error(error);
    showError();
    if (loadMoreBtnRef) loadMoreBtnRef.hidden = true;
  } finally {
    hideLoader();
  }
};

const handleLoadMore = () => {
  state.page += 1;
  loadBouquets({ reset: false });
};

export const initBouquets = () => {
  if (!listRef) return;

  loadBouquets({ reset: true });

  if (loadMoreBtnRef) {
    loadMoreBtnRef.addEventListener('click', handleLoadMore);
  }
};