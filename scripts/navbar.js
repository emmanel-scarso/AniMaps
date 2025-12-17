(function () {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
  
    let lastScroll = 0;
    const scrollThreshold = 100;
  
    window.addEventListener('scroll', function () {
      const currentScroll = window.pageYOffset;
  
      navbar.classList.toggle('scrolled', currentScroll > scrollThreshold);
      navbar.classList.toggle(
        'hidden',
        currentScroll > lastScroll && currentScroll > scrollThreshold
      );
  
      lastScroll = currentScroll;
    });
  })();
  
  