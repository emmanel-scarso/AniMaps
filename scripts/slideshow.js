// ===========================================
// FUNCIONALIDAD DEL SLIDESHOW
// ===========================================
(function() {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.slide-btn.prev');
    const nextBtn = document.querySelector('.slide-btn.next');
    
    let currentSlide = 0;
    let slideInterval;
    const autoPlayDelay = 10000; // 10 segundos
  
    // Función para mostrar un slide específico
    function showSlide(index) {
      // Asegurar que el índice esté dentro del rango
      if (index >= slides.length) {
        currentSlide = 0;
      } else if (index < 0) {
        currentSlide = slides.length - 1;
      } else {
        currentSlide = index;
      }
  
      // Remover clase active de todos los slides e indicadores
      slides.forEach(slide => slide.classList.remove('active'));
      indicators.forEach(indicator => indicator.classList.remove('active'));
  
      // Agregar clase active al slide e indicador actual
      slides[currentSlide].classList.add('active');
      indicators[currentSlide].classList.add('active');
    }
  
    // Función para ir al siguiente slide
    function nextSlide() {
      showSlide(currentSlide + 1);
    }
  
    // Función para ir al slide anterior
    function prevSlide() {
      showSlide(currentSlide - 1);
    }
  
    // Event listeners para los botones
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
      });
  
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
      });
    }
  
    // Event listeners para los indicadores
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        showSlide(index);
        resetAutoPlay();
      });
    });
  
    // Función para iniciar el autoplay
    function startAutoPlay() {
      slideInterval = setInterval(nextSlide, autoPlayDelay);
    }
  
    // Función para detener el autoplay
    function stopAutoPlay() {
      clearInterval(slideInterval);
    }
  
    // Función para reiniciar el autoplay
    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }
  
    // Pausar autoplay al pasar el mouse sobre el slideshow
    const slideshowWrapper = document.querySelector('.slideshow-wrapper');
    if (slideshowWrapper) {
      slideshowWrapper.addEventListener('mouseenter', stopAutoPlay);
      slideshowWrapper.addEventListener('mouseleave', startAutoPlay);
    }
  
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        resetAutoPlay();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoPlay();
      }
    });
  
    // Soporte para gestos táctiles en móviles
    let touchStartX = 0;
    let touchEndX = 0;
  
    if (slideshowWrapper) {
      slideshowWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });
  
      slideshowWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      });
    }
  
    function handleSwipe() {
      const swipeThreshold = 50; // Mínimo de píxeles para considerar un swipe
      
      if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe izquierda - siguiente slide
        nextSlide();
        resetAutoPlay();
      }
      
      if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe derecha - slide anterior
        prevSlide();
        resetAutoPlay();
      }
    }
  
    // Iniciar el autoplay cuando la página carga
    startAutoPlay();
  
    // Pausar autoplay cuando la página no está visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoPlay();
      } else {
        startAutoPlay();
      }
    });
  })();