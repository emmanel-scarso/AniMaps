// ===========================================
// FUNCIONALIDAD DEL MAPA EXPANDIBLE
// ===========================================
(function () {
  const expandBtn = document.getElementById('expand-btn');
  const closeBtn = document.getElementById('close-btn');
  const pageContent = document.getElementById('page-content');
  const mapOverlay = document.getElementById('map-overlay');
  const mapWrapper = document.querySelector('.map-wrapper');

  // ⛔ Guardas defensivas: si falta algo, no ejecutar nada
  if (!expandBtn || !closeBtn || !mapOverlay || !mapWrapper || !pageContent) {
    return;
  }

  // Guardar referencia del nodo y su posición original
  const originalParent = mapWrapper.parentNode;
  const originalNext = mapWrapper.nextSibling;

  function openFullscreen() {
    mapOverlay.appendChild(mapWrapper);
    mapOverlay.classList.add('open');
    pageContent.style.display = 'none';
    document.body.style.overflow = 'hidden';
    closeBtn.style.display = 'block';
    expandBtn.style.display = 'none';
  }

  function closeFullscreen() {
    if (originalNext) {
      originalParent.insertBefore(mapWrapper, originalNext);
    } else {
      originalParent.appendChild(mapWrapper);
    }

    mapOverlay.classList.remove('open');
    pageContent.style.display = '';
    document.body.style.overflow = '';
    closeBtn.style.display = 'none';
    expandBtn.style.display = '';
  }

  expandBtn.addEventListener('click', openFullscreen);
  closeBtn.addEventListener('click', closeFullscreen);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mapOverlay.classList.contains('open')) {
      closeFullscreen();
    }
  });

  mapOverlay.addEventListener('click', function (e) {
    if (e.target === mapOverlay) {
      closeFullscreen();
    }
  });
})();