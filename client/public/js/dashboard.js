document.addEventListener('show.bs.modal', function(e) {
    const btn = e.relatedTarget;
    if (!btn) return;

    if (e.target.id === 'newCardModal') {
        document.getElementById('newCardListId').value  = btn.dataset.listId;
        document.getElementById('newCardBoardId').value = btn.dataset.boardId;
    }

    if (e.target.id === 'editCardModal') {
        const id = btn.dataset.id;
        document.getElementById('editCardModal').querySelector('form').action = `/updateCard/${id}`;
        document.getElementById('editCardId').value          = id;
        document.getElementById('editCardTitle').value       = btn.dataset.title;
        document.getElementById('editCardDescription').value = btn.dataset.description;
        document.getElementById('editCardStartDate').value   = btn.dataset.start_date ? btn.dataset.start_date.split('T')[0] : '';
        document.getElementById('editCardDeadline').value    = btn.dataset.deadline   ? btn.dataset.deadline.split('T')[0]   : '';
        document.getElementById('editCardResponsible').value    = btn.dataset.responsible_id;
    }
});

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
  }
});
