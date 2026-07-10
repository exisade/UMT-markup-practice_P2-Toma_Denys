import { submitOrder } from './api.js';
import { closeOrderModal } from './modal.js';

const orderFormRef = document.querySelector('[data-order-form]');
const orderStatusRef = document.querySelector('[data-order-status]');

const setStatus = (ref, message, isError) => {
  if (!ref) return;
  ref.textContent = message;
  ref.hidden = false;
  ref.classList.toggle('floraFormStatus--error', Boolean(isError));
};

export const initForms = () => {
  if (!orderFormRef) return;

  orderFormRef.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submitBtn = orderFormRef.querySelector('button[type="submit"]');
    const formData = new FormData(orderFormRef);

    submitBtn.disabled = true;
    try {
      await submitOrder({
        name: formData.get('name'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        message: formData.get('message'),
        bouquet: formData.get('bouquet'),
        quantity: formData.get('quantity'),
      });
      setStatus(orderStatusRef, 'Your request has been sent! We will contact you shortly.', false);
      orderFormRef.reset();
      setTimeout(closeOrderModal, 1200);
    } catch (error) {
      setStatus(orderStatusRef, "We're sorry, something went wrong. Please try again later.", true);
    } finally {
      submitBtn.disabled = false;
    }
  });
};
