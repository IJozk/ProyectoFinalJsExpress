// Small toggle helper for collapse behavior (no jQuery)
document.addEventListener('click', function (e) {
  const btn = e.target.closest('[data-toggle-target]');
  if (!btn) return;

  const targetSelector = btn.getAttribute('data-toggle-target');
  const action = btn.getAttribute('data-toggle-action') || 'toggle';
  const target = document.querySelector(targetSelector);
  if (!target) return;

  if (action === 'hide') {
    target.classList.remove('show');
    target.classList.add('collapse');
  } else if (action === 'show') {
    target.classList.add('show');
    target.classList.remove('collapse');
  } else {
    // toggle
    target.classList.toggle('show');
    target.classList.toggle('collapse');
  }
});
