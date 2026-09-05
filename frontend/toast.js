/**
 * Triggers a slide-in snackbar notification.
 * @param {string} title - Main notification heading
 * @param {string} message - Subtitle or detail message
 * @param {string} type - 'info' | 'success' | 'warning' | 'danger'
 * @param {number} duration - Time before auto-dismiss in ms (default: 4000)
 */
function showToast(title, message = '', type = 'info', duration = 4000) {
  console.log(`showToast called with title: "${title}", message: "${message}", type: "${type}", duration: ${duration}ms`);
  const container = document.getElementById('toastContainer');
  if (!container) return;

  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;

  const icons = {
    success: '✅',
    warning: '⚠️',
    danger: '❌',
    info: 'ℹ️'
  };

  toast.innerHTML = `
    <div style="font-size: 16px;">${icons[type] || 'ℹ️'}</div>
    <div class="toast-content" style="flex: 1;">
      <div class="toast-title">${title}</div>
      ${message ? `<div class="toast-message">${message}</div>` : ''}
    </div>
    <button class="toast-close-btn">&times;</button>
  `;

  // Append to stack
  container.appendChild(toast);

  // Trigger CSS transition
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Manual close handler
  const closeBtn = toast.querySelector('.toast-close-btn');
  const dismissToast = () => {
    toast.classList.remove('show');
    toast.classList.add('hide');
    setTimeout(() => toast.remove(), 300); // Remove from DOM after transition
  };

  closeBtn.addEventListener('click', dismissToast);

  // Auto dismiss after duration
  if (duration > 0) {
    setTimeout(dismissToast, duration);
  }
}