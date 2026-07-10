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

const countLetters = (value) => (value.match(/\p{L}/gu) || []).length;
const countDigits = (value) => (value.match(/\d/g) || []).length;

const validators = {
  name: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return 'Please enter your name.';
    if (countLetters(trimmed) < 2) return 'Name must contain at least 2 letters.';
    return '';
  },
  phone: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return 'Please enter your phone number.';
    if (!/^[+\d\s\-()]+$/.test(trimmed)) return 'Phone number contains invalid characters.';
    if (countDigits(trimmed) < 10) return 'Phone number must contain at least 10 digits.';
    return '';
  },
  address: (value) => {
    const trimmed = value.trim();
    if (!trimmed) return 'Please enter your address.';
    if (trimmed.length < 5) return 'Address must be at least 5 characters long.';
    return '';
  },
  bouquet: (value) => (value.trim() ? '' : 'Please select a bouquet.'),
};

const getFieldError = (fieldRef) => {
  const container = fieldRef.closest('.floraFormField') || fieldRef.parentElement;
  return container?.querySelector('[data-field-error]') || null;
};

const clearFieldError = (fieldRef) => {
  const container = fieldRef.closest('.floraFormField') || fieldRef.parentElement;
  container?.classList.remove('floraFormField--invalid');
  fieldRef.removeAttribute('aria-invalid');
  const errorRef = getFieldError(fieldRef);
  if (errorRef) errorRef.remove();
};

const setFieldError = (fieldRef, message) => {
  const container = fieldRef.closest('.floraFormField') || fieldRef.parentElement;
  if (!container) return;
  container.classList.add('floraFormField--invalid');
  fieldRef.setAttribute('aria-invalid', 'true');

  let errorRef = getFieldError(fieldRef);
  if (!errorRef) {
    errorRef = document.createElement('span');
    errorRef.dataset.fieldError = '';
    errorRef.className = 'floraFormFieldError';
    fieldRef.insertAdjacentElement('afterend', errorRef);
  }
  errorRef.textContent = message;
};

const validateOrderForm = () => {
  let firstInvalidField = null;

  ['name', 'phone', 'address'].forEach((fieldName) => {
    const fieldRef = orderFormRef.querySelector(`[name="${fieldName}"]`);
    if (!fieldRef) return;

    const message = validators[fieldName](fieldRef.value);
    clearFieldError(fieldRef);
    if (message) {
      setFieldError(fieldRef, message);
      if (!firstInvalidField) firstInvalidField = fieldRef;
    }
  });

  const bouquetRef = orderFormRef.querySelector('[name="bouquet"]');
  if (bouquetRef) {
    const message = validators.bouquet(bouquetRef.value);
    if (message) {
      setStatus(orderStatusRef, message, true);
      if (!firstInvalidField) firstInvalidField = bouquetRef;
    }
  }

  return !firstInvalidField;
};

export const initForms = () => {
  if (!orderFormRef) return;

  ['name', 'phone', 'address'].forEach((fieldName) => {
    const fieldRef = orderFormRef.querySelector(`[name="${fieldName}"]`);
    fieldRef?.addEventListener('input', () => clearFieldError(fieldRef));
  });

  orderFormRef.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!validateOrderForm()) {
      const firstInvalid = orderFormRef.querySelector('.floraFormField--invalid input, .floraFormField--invalid textarea');
      firstInvalid?.focus();
      return;
    }

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
