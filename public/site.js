(() => {
  if ('serviceWorker' in navigator) window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', {scope: '/'}).catch(() => {});
  });
  document.querySelectorAll('.mobile-menu nav a').forEach(link => link.addEventListener('click', () => {
    const menu = link.closest('details'); if (menu) menu.open = false;
  }));
})();
