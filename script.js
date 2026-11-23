document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.page-section');
  const jumpButtons = document.querySelectorAll('[data-jump]');
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.getElementById('menuToggle');

  // Switch active page section via Sidebar
  function switchPage(targetId) {
    sections.forEach((sec) => {
      sec.classList.toggle('active', sec.id === targetId);
    });

    navLinks.forEach((link) => {
      link.classList.toggle('active', link.dataset.target === targetId);
    });

    // Close mobile sidebar after selection
    sidebar.classList.remove('open');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      switchPage(link.dataset.target);
    });
  });

  jumpButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      switchPage(btn.dataset.jump);
    });
  });

  // Mobile Menu Toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Typing Text Effect on Home Page
  const roles = [
    'Frontend Dasturchiman',
    'UI/UX Dizaynerman',
    'React & JavaScript Ishqiboziman',
    'Kreativ Veb-Ishlab Chiquvchiman'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedEl = document.getElementById('typedText');

  function typeLoop() {
    if (!typedEl) return;
    const currentWord = roles[roleIndex];

    if (isDeleting) {
      typedEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 45 : 90;

    if (!isDeleting && charIndex === currentWord.length) {
      speed = 1600;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 350;
    }

    setTimeout(typeLoop, speed);
  }
  typeLoop();

  // Portfolio Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.filter;
      projectCards.forEach((card) => {
        if (category === 'all' || card.dataset.category === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Contact Form Submission Feedback
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userName = document.getElementById('name').value.trim();
      formFeedback.textContent = `Rahmat, ${userName}! Xabaringiz Sodiqova Xolisaga muvaffaqiyatli yuborildi (2026).`;
      contactForm.reset();
    });
  }
});
