/* ==========================================
   APEX GROOMING BARBERSHOP — Scripts
   ========================================== */

document.addEventListener('DOMContentLoaded', function () {

    // --- Sticky Navbar ---
    const navbar = document.getElementById('navbar');

    function handleScroll() {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // --- Mobile Menu ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', function () {
        const isActive = hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    });

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;
            var target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Fade-In on Scroll (Intersection Observer) ---
    var fadeElements = document.querySelectorAll('.fade-in');

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        fadeElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers
        fadeElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    // --- Active Nav Link Highlighting ---
    var sections = document.querySelectorAll('section[id]');

    function highlightNav() {
        var scrollY = window.scrollY + 120;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var height = section.offsetHeight;
            var id = section.getAttribute('id');

            var link = document.querySelector('.nav-links a[href="#' + id + '"]');
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    link.style.color = '#CD7F32';
                    link.style.setProperty('--after-width', '100%');
                } else {
                    link.style.color = '';
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });

    // --- Staggered Animation for Service Cards ---
    var serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(function (card, index) {
        card.style.transitionDelay = (index * 0.1) + 's';
    });

    // --- Staggered Animation for Gallery Items ---
    var galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(function (item, index) {
        item.style.transitionDelay = (index * 0.08) + 's';
    });

    // --- Staggered Animation for Testimonial Cards ---
    var testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(function (card, index) {
        card.style.transitionDelay = (index * 0.1) + 's';
    });

    // --- Counter Animation for Stats ---
    var statNumbers = document.querySelectorAll('.stat-number');

    function animateCounter(el) {
        var text = el.textContent;
        var hasPlus = text.includes('+');
        var target = parseInt(text.replace(/[^0-9]/g, ''), 10);
        if (isNaN(target)) return;

        var duration = 1500;
        var start = 0;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(eased * target);
            el.textContent = current + (hasPlus ? '+' : '');
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = target + (hasPlus ? '+' : '');
            }
        }

        requestAnimationFrame(step);
    }

    if ('IntersectionObserver' in window) {
        var statObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(function (el) {
            statObserver.observe(el);
        });
    }

});
