// PORTFOLIO MASTERPIECE SCRIPT - GOD TIER EDITION v2.0

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Interactive Particle Network (Canvas) ---
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    let particles = [];

    // Configuration
    const particleCount = 80;
    const connectionDistance = 150;
    const mouseParams = { x: null, y: null, radius: 200 };

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 0.5;
            this.color = Math.random() > 0.5 ? '#8a2be2' : '#00f5ff';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Boundary reflection
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse interaction
            if (mouseParams.x !== null) {
                const dx = mouseParams.x - this.x;
                const dy = mouseParams.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseParams.radius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseParams.radius - distance) / mouseParams.radius;
                    const directionX = forceDirectionX * force * 0.5;
                    const directionY = forceDirectionY * force * 0.5;

                    this.x -= directionX;
                    this.y -= directionY;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Connect particles
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(138, 43, 226, ${1 - distance / connectionDistance})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', () => { resize(); initParticles(); });
    window.addEventListener('mousemove', (e) => {
        mouseParams.x = e.clientX;
        mouseParams.y = e.clientY;
    });

    // Start Particles
    resize();
    initParticles();
    animateParticles();


    // --- 2. Mobile Navigation Menu ---
    const hamburger = document.getElementById('hamburger-btn');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }


    // --- 3. Smooth Scrolling & Navigation ---
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    allNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId !== '#') {
                e.preventDefault();
                const target = document.querySelector(targetId);
                if (target) {
                    const targetPosition = target.offsetTop;
                    window.scrollTo({
                        top: targetPosition - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });


    // --- 4. Reveal on Scroll (Advanced) ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const reveals = document.querySelectorAll('.glass-panel, .section-title, .hero h1, .hero p, .hero-badge, .hero-buttons, .skill-card, .timeline-item, .contact-card, .stat-item');
    reveals.forEach((el, index) => {
        el.style.transitionDelay = `${(index % 5) * 80}ms`;
        el.classList.add('scrolled-hidden');
        revealObserver.observe(el);
    });


    // --- 5. Navbar Sticky Effect ---
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(5, 5, 5, 0.95)';
            nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
            nav.style.borderBottom = '1px solid rgba(138, 43, 226, 0.3)';
        } else {
            nav.style.background = 'rgba(5, 5, 5, 0.8)';
            nav.style.boxShadow = 'none';
            nav.style.borderBottom = 'none';
        }
    });


    // --- 6. Animated Stats Counter ---
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                el.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                el.textContent = target;
            }
        };

        updateCounter();
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });


    // --- 7. Typing Effect for Hero (Optional Enhancement) ---
    const heroDescription = document.querySelector('.hero > p');
    if (heroDescription) {
        const originalText = heroDescription.textContent;
        heroDescription.innerHTML = '';

        let charIndex = 0;
        const typeSpeed = 30;

        const typeWriter = () => {
            if (charIndex < originalText.length) {
                heroDescription.innerHTML += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typeSpeed);
            }
        };

        // Start typing after a short delay
        setTimeout(typeWriter, 1000);
    }


    // --- 8. Magnetic Button Effect ---
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0) scale(1)';
        });
    });


    // --- 9. Project Card Tilt Effect ---
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });


    // --- 10. Active Navigation Highlight ---
    const sections = document.querySelectorAll('section[id]');

    const highlightNav = () => {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNav);
    highlightNav();


    // --- 11. Social Link Hover Sound (Visual Feedback) ---
    const socialLinks = document.querySelectorAll('.social-link');

    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transition = 'all 0.2s ease';
        });
    });


    // --- 12. Preloader ---
    const preloader = document.getElementById('preloader');

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
            document.body.style.overflow = 'auto';
        }, 1500);
    });

    // Prevent scroll while loading
    document.body.style.overflow = 'hidden';


    // --- 13. Custom Cursor ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    if (cursorDot && cursorOutline) {
        let cursorX = 0, cursorY = 0;
        let outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;

            cursorDot.style.left = cursorX + 'px';
            cursorDot.style.top = cursorY + 'px';
        });

        // Smooth outline follow
        const animateCursor = () => {
            outlineX += (cursorX - outlineX) * 0.15;
            outlineY += (cursorY - outlineY) * 0.15;

            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';

            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .glass-panel, .skill-card, .social-link');

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hover');
                cursorOutline.classList.add('hover');
            });

            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hover');
                cursorOutline.classList.remove('hover');
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '1';
            cursorOutline.style.opacity = '1';
        });
    }


    // --- 14. Card Glow Follow Mouse ---
    const glassCards = document.querySelectorAll('.glass-panel');

    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });
    });


    // --- 15. Parallax Effect on Scroll ---
    const heroSection = document.querySelector('.hero');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (heroSection && scrolled < window.innerHeight) {
            heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroSection.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    });


    // Console Easter Egg
    console.log('%c⚡ Portfolio GOD MODE v3.0 Activated ⚡', 'background: linear-gradient(135deg, #8a2be2, #00f5ff); color: #fff; font-size: 14px; padding: 10px 20px; border-radius: 5px; font-weight: bold;');
    console.log('%c Built by a Machine Intelligence Architect 🚀', 'color: #00f5ff; font-size: 12px;');
    console.log('%c Features: Preloader | Custom Cursor | Particles | Glitch Text | 3D Cards | Parallax', 'color: #8a2be2; font-size: 10px;');
});

