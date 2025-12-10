
// ===========================================
// FUNCIONALIDAD DEL MAPA EXPANDIBLE
// ===========================================
(function(){
  const expandBtn = document.getElementById('expand-btn');
  const closeBtn = document.getElementById('close-btn');
  const pageContent = document.getElementById('page-content');
  const mapOverlay = document.getElementById('map-overlay');
  const mapWrapper = document.querySelector('.map-wrapper');

  // Guardar referencia del nodo y su posición original
  const originalParent = mapWrapper.parentNode;
  const originalNext = mapWrapper.nextSibling;

  // Función para abrir el mapa en pantalla completa
  function openFullscreen(){
    // Mover el mapWrapper al overlay
    mapOverlay.appendChild(mapWrapper);
    mapOverlay.classList.add('open');
    pageContent.style.display = 'none';
    document.body.style.overflow = 'hidden';
    closeBtn.style.display = 'block';
    expandBtn.style.display = 'none';
  }

  // Función para cerrar el mapa de pantalla completa
  function closeFullscreen(){
    // Mover de vuelta a su posición original
    if(originalNext){ 
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

  // Event listeners para los botones
  expandBtn.addEventListener('click', openFullscreen);
  closeBtn.addEventListener('click', closeFullscreen);

  // Soporte para cerrar con la tecla Escape
  document.addEventListener('keydown', function(e){ 
    if(e.key === 'Escape' && mapOverlay.classList.contains('open')) {
      closeFullscreen(); 
    }
  });

  // Accesibilidad: cerrar al hacer click fuera del mapa en el overlay
  mapOverlay.addEventListener('click', function(e){ 
    if(e.target === mapOverlay) {
      closeFullscreen(); 
    }
  });
})();


// ===========================================
// FUNCIONALIDAD DE LA NAVBAR CON SCROLL
// ===========================================
(function(){
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  const scrollThreshold = 100; // Píxeles antes de activar los cambios

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;

    // Agregar clase 'scrolled' cuando se hace scroll más allá del umbral
    if (currentScroll > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Ocultar navbar al hacer scroll hacia abajo, mostrar al hacer scroll hacia arriba
    if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
      // Scrolling hacia abajo
      navbar.classList.add('hidden');
    } else {
      // Scrolling hacia arriba
      navbar.classList.remove('hidden');
    }

    lastScroll = currentScroll;
  });
})();