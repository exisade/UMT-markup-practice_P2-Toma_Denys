import { getBestsellers } from './api.js';
import { setupSlider } from './slider.js';

const listRef = document.querySelector('.floraTrendingList');
const dotsRef = document.querySelector('.floraTrendingSlider .floraSliderDots');
const errorRef = document.querySelector('[data-bestsellers-error]');

const bouquetCardMarkup = ({ title, description, price, image }) => `
  <li
    class="floraTrendingItem"
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
      <source type="image/webp" srcset="./images/${image}@X1.webp 1x, ./images/${image}@X2.webp 2x">
      <img src="./images/${image}@X1.jpg" srcset="./images/${image}@X1.jpg 1x, ./images/${image}@X2.jpg 2x" alt="${title}" loading="lazy" width="400" height="320" class="floraTrendingImg">
    </picture>
    <h3 class="floraTrendingItemTitle">${title}</h3>
    <p class="floraText floraTrendingItemText">${description}</p>
    <p class="floraTrendingItemPrice">$${price}</p>
  </li>
`;

export const initBestsellers = async () => {
  if (!listRef) return;

  try {
    const bestsellers = await getBestsellers();
    listRef.innerHTML = '';
    listRef.insertAdjacentHTML('beforeend', bestsellers.map(bouquetCardMarkup).join(''));

    setupSlider(
      '.floraTrendingSlider',
      '.floraTrendingList',
      '.floraPrevBtn',
      '.floraNextBtn',
      '.floraSliderDots'
    );
  } catch (error) {
    if (errorRef) {
      errorRef.textContent = "We're sorry, something went wrong while loading bestsellers.";
      errorRef.hidden = false;
    }
    if (dotsRef) dotsRef.closest('.floraTrendingPagination').hidden = true;
  }
};
