/**
 * toast.js
 * Toast notification component using Closure-based module pattern.
 */

const ICONS = {
  success: 'fa-solid fa-circle-check',
  error:   'fa-solid fa-circle-xmark',
  warning: 'fa-solid fa-triangle-exclamation',
  info:    'fa-solid fa-circle-info',
};

// IIFE module with private state via closure
export const Toast = (() => {
  let container = null;

  function getContainer() {
    if (!container) {
      container = document.getElementById('toastContainer');
    }
    return container;
  }

  function show(type = 'info', title = '', message = '', duration = 4000) {
    const el = document.createElement('div');
    el.className = `toast toast--${type}`;
    el.setAttribute('role', 'alert');
    el.innerHTML = `
      <i class="toast__icon ${ICONS[type] || ICONS.info}"></i>
      <div class="toast__body">
        <div class="toast__title">${title}</div>
        ${message ? `<div class="toast__message">${message}</div>` : ''}
      </div>
      <button class="toast__close" aria-label="Dismiss notification">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    const closeBtn = el.querySelector('.toast__close');
    closeBtn.addEventListener('click', () => remove(el));

    getContainer().appendChild(el);

    if (duration > 0) {
      setTimeout(() => remove(el), duration);
    }

    return el;
  }

  function remove(el) {
    if (!el || !el.isConnected) return;
    el.classList.add('removing');
    el.addEventListener('animationend', () => el.remove(), { once: true });
    // Fallback in case animation doesn't fire
    setTimeout(() => el.isConnected && el.remove(), 400);
  }

  return {
    success: (title, msg, dur) => show('success', title, msg, dur),
    error:   (title, msg, dur) => show('error',   title, msg, dur),
    warning: (title, msg, dur) => show('warning', title, msg, dur),
    info:    (title, msg, dur) => show('info',    title, msg, dur),
  };
})();
