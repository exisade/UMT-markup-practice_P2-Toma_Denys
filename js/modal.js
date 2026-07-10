const productModalRef = document.querySelector('[data-product-modal]');
const productBackdropRef = document.querySelector('[data-product-modal-backdrop]');
const productCloseBtnRef = document.querySelector('[data-product-modal-close]');
const productImageRef = document.querySelector('[data-product-modal-image]');
const productSourceRef = document.querySelector('[data-product-modal-source]');
const productTitleRef = document.querySelector('[data-product-modal-title]');
const productPriceRef = document.querySelector('[data-product-modal-price]');
const productDescriptionRef = document.querySelector('[data-product-modal-description]');
const productQtyRef = document.querySelector('[data-product-modal-qty]');
const productBuyBtnRef = document.querySelector('[data-product-modal-buy]');

const orderModalRef = document.querySelector('[data-modal]');
const orderBackdropRef = document.querySelector('[data-modal-backdrop]');
const orderCloseBtnRef = document.querySelector('[data-modal-close]');
const orderBouquetFieldRef = document.querySelector('[data-modal-bouquet-field]');
const orderQuantityFieldRef = document.querySelector('[data-modal-quantity-field]');

let lastFocusedElement = null;

const isAnyModalOpen = () =>
  productModalRef?.classList.contains('is-open') || orderModalRef?.classList.contains('is-open');

const syncBodyScrollLock = () => {
  document.body.classList.toggle('floraModalOpen', isAnyModalOpen());
};

const openProductModal = ({ title, price, description, image }) => {
  if (!productModalRef) return;

  lastFocusedElement = document.activeElement;

  if (productSourceRef) productSourceRef.srcset = `./images/${image}@X1.webp 1x, ./images/${image}@X2.webp 2x`;
  if (productImageRef) {
    productImageRef.src = `./images/${image}@X1.jpg`;
    productImageRef.srcset = `./images/${image}@X1.jpg 1x, ./images/${image}@X2.jpg 2x`;
    productImageRef.alt = title;
  }
  if (productTitleRef) productTitleRef.textContent = title;
  if (productPriceRef) productPriceRef.textContent = `$${price}`;
  if (productDescriptionRef) productDescriptionRef.textContent = description;
  if (productQtyRef) productQtyRef.value = 1;
  if (productBuyBtnRef) productBuyBtnRef.dataset.bouquetTitle = title;

  productModalRef.classList.add('is-open');
  syncBodyScrollLock();
  productCloseBtnRef?.focus();
};

const closeProductModal = () => {
  if (!productModalRef || !productModalRef.classList.contains('is-open')) return;
  productModalRef.classList.remove('is-open');
  syncBodyScrollLock();
  lastFocusedElement?.focus();
};

const openOrderModal = ({ title, quantity }) => {
  if (!orderModalRef) return;

  lastFocusedElement = document.activeElement;
  if (orderBouquetFieldRef) orderBouquetFieldRef.value = title || '';
  if (orderQuantityFieldRef) orderQuantityFieldRef.value = quantity || 1;

  orderModalRef.classList.add('is-open');
  syncBodyScrollLock();
  orderCloseBtnRef?.focus();
};

const closeOrderModal = () => {
  if (!orderModalRef || !orderModalRef.classList.contains('is-open')) return;
  orderModalRef.classList.remove('is-open');
  syncBodyScrollLock();
  lastFocusedElement?.focus();
};

export const initModal = () => {
  document.addEventListener('click', (event) => {
    const productCard = event.target.closest('[data-product-card]');
    if (productCard) {
      openProductModal({
        title: productCard.dataset.title,
        price: productCard.dataset.price,
        description: productCard.dataset.description,
        image: productCard.dataset.image,
      });
    }
  });

  document.addEventListener('keydown', (event) => {
    const productCard = event.target.closest('[data-product-card]');
    if (productCard && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      productCard.click();
    }
  });

  productBuyBtnRef?.addEventListener('click', () => {
    const title = productBuyBtnRef.dataset.bouquetTitle || '';
    const quantity = productQtyRef ? productQtyRef.value : 1;
    closeProductModal();
    openOrderModal({ title, quantity });
  });

  productCloseBtnRef?.addEventListener('click', closeProductModal);
  productBackdropRef?.addEventListener('click', closeProductModal);

  orderCloseBtnRef?.addEventListener('click', closeOrderModal);
  orderBackdropRef?.addEventListener('click', closeOrderModal);

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeOrderModal();
    closeProductModal();
  });
};

export { closeOrderModal };
