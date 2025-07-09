document.addEventListener('DOMContentLoaded', () => {
  try {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const sidebar = document.querySelector('#sidebar');
    const openIcon = document.querySelector('.open-icon');
    const closeIcon = document.querySelector('.close-icon');
    const topbar = document.getElementById('topbar');
    const sidebarClose = document.querySelector('.sidebar-close');

    // Sidebar close button
    if (sidebarClose && sidebar) {
      sidebarClose.addEventListener('click', () => {
        sidebar.classList.remove('active');
        openIcon.style.display = 'block';
        closeIcon.style.display = 'none';
      });
    }

    // Sidebar toggle
    if (menuToggle && sidebar && openIcon && closeIcon) {
      menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        openIcon.style.display = sidebar.classList.contains('active') ? 'none' : 'block';
        closeIcon.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
      });
    }

    // Topbar transparency on scroll
    if (topbar) {
      window.addEventListener('scroll', () => {
        try {
          const scrollPosition = window.scrollY;
          if (scrollPosition > 0) {
            topbar.classList.add('scrolled');
          } else {
            topbar.classList.remove('scrolled');
          }
          console.log('Scroll position:', scrollPosition);
        } catch (error) {
          console.error('Scroll event error:', error);
        }
      });
    } else {
      console.error('Topbar not found. Check if id="topbar" is set in HTML.');
    }
      
        // Pop-up animation on scroll
    const sections = document.querySelectorAll('.content-section');
    if (sections.length > 0) {
      const observer = new IntersectionObserver((entries, observer) => {
        try {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const h2 = entry.target.querySelector('h2');
              const p = entry.target.querySelector('p');
              const img = entry.target.querySelector('.cam-img');
              
              if (h2) h2.classList.add('pop-up');
              if (p) p.classList.add('pop-up');
              if (img) img.classList.add('pop-up');
              
              observer.unobserve(entry.target); // Trigger once
            }
          });
        } catch (error) {
          console.error('Intersection Observer error:', error);
        }
      }, { threshold: 0.2 });
    
      sections.forEach(section => {
        observer.observe(section);
      });
    } else {
      console.warn('No content sections found.');
    }
    

    // Hero slideshow content changer
    const slides = [
      {
        image: 'img/bg/pic1.jpg',
        title: 'We don’t just film weddings',
        title2: 'We tell love stories',
        subtitle: 'So you can relive your most meaningful moments, forever.',
        title2Glow: true,
        title2Color: 'pink',
      },
      {
        image: 'img/bg/live.webp',
        title: 'Broadcast Your Conference',
        title2: 'Live Streaming',
        subtitle: 'Professional multi-cam production for global reach.',
        objectPosition: '50% center',
        title2Glow: true,
        title2Color: 'red',
      },
      {
        image: 'img/bg/edit.jpeg',
        title: 'Where Stories Take Shape',
        title2: 'Masterful Editing',
        subtitle: 'From raw footage to emotional narratives — every frame refined.',
        objectPosition: '50% center',
        title2Glow: true,
        title2Color: 'blue',
      },
    ];

    let currentSlide = 0;
    const image = document.getElementById('heroImage');
    const title = document.getElementById('heroTitle');
    const title2 = document.getElementById('heroTitle2');
    const subtitle = document.getElementById('heroSubtitle');
    const content = document.getElementById('heroContent');

    function changeSlide() {
      try {
        // Animate image and text out
        image.classList.remove('animate-image');
        image.classList.add('blur-out');
        [title, title2, subtitle].forEach(el => {
          el.classList.remove('animate-text');
          el.classList.add('animate-text-out');
        });
        content.classList.add('fade');

        setTimeout(() => {
          const slide = slides[currentSlide];

          // Update content
          image.src = slide.image || 'img/bg/pic1.jpg'; // Fallback image
          image.style.objectPosition = slide.objectPosition || '40% center';
          title.textContent = slide.title || '';
          title2.textContent = slide.title2 || '';
          subtitle.textContent = slide.subtitle || '';

          // Apply glow class
          title2.className = '';
          if (slide.title2Glow && slide.title2Color) {
            title2.classList.add(`glow-${slide.title2Color}`);
          }

          // Animate image and text in
          image.classList.remove('blur-out');
          void image.offsetWidth; // Trigger reflow
          image.classList.add('animate-image');
          [title, title2, subtitle].forEach(el => {
            el.classList.remove('animate-text-out');
            void el.offsetWidth; // Trigger reflow
            el.classList.add('animate-text');
          });
          content.classList.remove('fade');

          currentSlide = (currentSlide + 1) % slides.length;
        }, 500); // Match animation duration
      } catch (error) {
        console.error('Slide change error:', error);
      }
    }

    if (image && title && subtitle && content) {
      setInterval(changeSlide, 5000); // Change every 5 seconds
      changeSlide(); // Initial load
    } else {
      console.warn('Hero elements not found. Check IDs in HTML.');
    }
  } catch (error) {
    console.error('DOMContentLoaded error:', error);
  }
});