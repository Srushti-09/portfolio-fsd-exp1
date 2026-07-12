/**
 * SRUSHTI MURADE — Portfolio Interaction Engine (10x Upgrade)
 * Features: Cinematic Loading, Custom Cursor, Constellation, GSAP ScrollTrigger,
 * Lightbox Gallery, Scroll Progress, Active Nav, Magnetic Buttons, Ripple Effects.
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initLoadingScreen();
    initCustomCursor();
    initParticlesBackground();
    initSkillsConstellation();
    initScrollAnimations();
    initProjectAccordion();
    initMobileMenu();
    initContactForm();
    initEasterEggs();
    initScrollProgress();
    initLightbox();
    initActiveNav();
    initRippleEffect();
    initMagneticSocials();
});

/* ================================================================
   1. CINEMATIC LOADING SCREEN
   ================================================================ */
let loadingScreenTimer;

function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const rocket = document.getElementById('rocket');
    const moon = document.getElementById('loading-moon');
    const logo = document.getElementById('loading-logo');
    const textGroup = document.getElementById('loading-text');
    const roleEl = document.getElementById('loading-role');

    const roles = ["Designer", "Researcher", "Engineer", "Leader"];
    let roleIndex = 0;
    let roleInterval;

    // Draw loading canvas stars
    const canvas = document.getElementById('stars-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const stars = Array.from({ length: 80 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 1.5,
            opacity: Math.random(),
            speed: 0.005 + Math.random() * 0.01
        }));

        function animateStars() {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#faf8f5';
            stars.forEach(star => {
                star.opacity += star.speed;
                if (star.opacity > 1 || star.opacity < 0) {
                    star.speed = -star.speed;
                }
                ctx.globalAlpha = Math.max(0.1, Math.min(1, star.opacity));
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(animateStars);
        }
        animateStars();

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });
    }

    // Cinematic Animation Sequence
    setTimeout(() => {
        if (rocket) rocket.classList.add('launched');
    }, 500);

    setTimeout(() => {
        if (moon) moon.classList.add('visible');
    }, 1800);

    setTimeout(() => {
        if (moon) moon.classList.add('morph');
        if (rocket) rocket.style.opacity = '0';
    }, 2500);

    setTimeout(() => {
        if (logo) logo.classList.add('visible');
        if (textGroup) textGroup.classList.add('visible');

        roleEl.textContent = roles[roleIndex];
        roleInterval = setInterval(() => {
            roleIndex = (roleIndex + 1) % roles.length;
            if (roleEl) {
                roleEl.style.opacity = '0';
                setTimeout(() => {
                    roleEl.textContent = roles[roleIndex];
                    roleEl.style.opacity = '1';
                }, 300);
            }
        }, 1000);
    }, 3200);

    loadingScreenTimer = setTimeout(() => {
        clearInterval(roleInterval);
        endLoadingScreen();
    }, 8500);
}

function endLoadingScreen() {
    clearTimeout(loadingScreenTimer);
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        document.body.classList.remove('loading');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }
}

function skipLoading() {
    endLoadingScreen();
}

/* ================================================================
   2. CUSTOM CURSOR
   ================================================================ */
function initCustomCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const curText = document.getElementById('cursor-text');
    const glow = document.getElementById('cursor-glow');

    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (glow) {
            glow.style.left = `${mouseX - 200}px`;
            glow.style.top = `${mouseY - 200}px`;
        }
    });

    function updateCursor() {
        dotX += (mouseX - dotX) * 0.25;
        dotY += (mouseY - dotY) * 0.25;
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;

        if (dot) {
            dot.style.left = `${dotX}px`;
            dot.style.top = `${dotY}px`;
            dot.style.transform = 'translate(-50%, -50%)';
        }
        if (ring) {
            ring.style.left = `${ringX}px`;
            ring.style.top = `${ringY}px`;
            ring.style.transform = 'translate(-50%, -50%)';
        }
        if (curText) {
            curText.style.left = `${mouseX}px`;
            curText.style.top = `${mouseY - 24}px`;
            curText.style.transform = 'translate(-50%, -50%)';
        }

        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Hover listeners
    const addHover = (selector, type, label = 'View') => {
        document.querySelectorAll(selector).forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (type === 'link') {
                    dot.classList.add('hovering-link');
                    ring.classList.add('hovering-link');
                } else if (type === 'project') {
                    dot.classList.add('hovering-project');
                    ring.classList.add('hovering-project');
                    curText.textContent = label;
                    curText.classList.add('visible');
                } else if (type === 'image') {
                    dot.classList.add('hovering-image');
                    ring.classList.add('hovering-image');
                }
            });
            el.addEventListener('mouseleave', () => {
                dot.className = 'cursor-dot';
                ring.className = 'cursor-ring';
                curText.className = 'cursor-text';
            });
        });
    };

    addHover('a, button, .project-header, .social-link', 'link');
    addHover('.project-header', 'project', 'Open');
    addHover('.gallery-item', 'image');

    // Magnetic buttons
    const mBtns = document.querySelectorAll('.magnetic-btn');
    mBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}

/* ================================================================
   3. BACKGROUND PARTICLES
   ================================================================ */
function initParticlesBackground() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles = Array.from({ length: 45 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5 + 0.1
    }));

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx = -p.vx;
            if (p.y < 0 || p.y > height) p.vy = -p.vy;

            ctx.fillStyle = '#7b5ea7';
            ctx.globalAlpha = p.opacity;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(animate);
    }
    animate();

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
}

/* ================================================================
   4. SKILLS CONSTELLATION
   ================================================================ */
function initSkillsConstellation() {
    const container = document.getElementById('skills-constellation');
    const canvas = document.getElementById('skills-canvas');
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    let rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const orbs = document.querySelectorAll('.skill-orb');

    function drawLines() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        rect = container.getBoundingClientRect();

        const coords = Array.from(orbs).map(orb => {
            const topPercent = parseFloat(orb.style.top);
            const leftPercent = parseFloat(orb.style.left);
            return {
                x: (leftPercent / 100) * canvas.width + 28,
                y: (topPercent / 100) * canvas.height + 28,
                cat: orb.getAttribute('data-category')
            };
        });

        ctx.lineWidth = 0.8;
        for (let i = 0; i < coords.length; i++) {
            for (let j = i + 1; j < coords.length; j++) {
                const dist = Math.hypot(coords[i].x - coords[j].x, coords[i].y - coords[j].y);
                const threshold = canvas.width * 0.35;

                if (dist < threshold || coords[i].cat === coords[j].cat) {
                    ctx.beginPath();
                    ctx.moveTo(coords[i].x, coords[i].y);
                    ctx.lineTo(coords[j].x, coords[j].y);

                    if (coords[i].cat === 'design') ctx.strokeStyle = 'rgba(123, 94, 167, 0.15)';
                    else if (coords[i].cat === 'tech') ctx.strokeStyle = 'rgba(122, 139, 111, 0.15)';
                    else if (coords[i].cat === 'leadership') ctx.strokeStyle = 'rgba(196, 169, 125, 0.15)';
                    else ctx.strokeStyle = 'rgba(139, 115, 85, 0.15)';

                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(drawLines);
    }

    drawLines();
    window.addEventListener('resize', () => {
        rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
    });
}

/* ================================================================
   5. GSAP SCROLL & REVEAL ANIMATIONS
   ================================================================ */
function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Fade reveal elements
    document.querySelectorAll('.reveal').forEach(el => {
        gsap.fromTo(el, 
            { opacity: 0, y: 30 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 1.2, 
                ease: "power4.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // Left/Right reveals
    document.querySelectorAll('.reveal-left').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, x: -50 },
            {
                opacity: 1,
                x: 0,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%"
                }
            }
        );
    });

    document.querySelectorAll('.reveal-right').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, x: 50 },
            {
                opacity: 1,
                x: 0,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%"
                }
            }
        );
    });

    // Scale reveals
    document.querySelectorAll('.reveal-scale').forEach(el => {
        gsap.fromTo(el,
            { opacity: 0, scale: 0.92 },
            {
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%"
                }
            }
        );
    });

    // Count-up stats animation
    document.querySelectorAll('.stat-number').forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'), 10);
        gsap.to(stat, {
            innerText: target,
            duration: 2.5,
            snap: { innerText: 1 },
            ease: "power3.out",
            scrollTrigger: {
                trigger: stat,
                start: "top 90%"
            }
        });
    });

    // Sticky / Scrolled Nav styling
    ScrollTrigger.create({
        start: "top -50px",
        onUpdate: (self) => {
            const nav = document.getElementById('site-nav');
            if (self.direction === 1) {
                nav.classList.add('scrolled');
            } else {
                if (window.scrollY < 50) {
                    nav.classList.remove('scrolled');
                }
            }
        }
    });

    // Parallax hero elements
    const heroPortrait = document.querySelector('.hero-portrait');
    const heroContent = document.querySelector('.hero-content');
    if (heroPortrait && heroContent) {
        gsap.to(heroPortrait, {
            y: 60,
            ease: "none",
            scrollTrigger: {
                trigger: '.hero',
                start: "top top",
                end: "bottom top",
                scrub: 1
            }
        });
        gsap.to(heroContent, {
            y: 30,
            ease: "none",
            scrollTrigger: {
                trigger: '.hero',
                start: "top top",
                end: "bottom top",
                scrub: 1
            }
        });
    }

    // Stagger achievement cards
    const achievementCards = document.querySelectorAll('.achievement-card');
    if (achievementCards.length) {
        gsap.fromTo(achievementCards,
            { opacity: 0, y: 40, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: '.achievements-grid',
                    start: "top 80%"
                }
            }
        );
    }
}

/* ================================================================
   6. PROJECT ACCORDION
   ================================================================ */
function toggleProject(header) {
    const currentItem = header.parentElement;
    const isActive = currentItem.classList.contains('active');

    document.querySelectorAll('.project-item').forEach(item => {
        item.classList.remove('active');
        const details = item.querySelector('.project-details');
        if (details) details.style.maxHeight = '0px';
    });

    if (!isActive) {
        currentItem.classList.add('active');
        const details = currentItem.querySelector('.project-details');
        if (details) {
            details.style.maxHeight = `${details.scrollHeight + 100}px`;
        }
    }
}

function initProjectAccordion() {
    const firstProject = document.querySelector('.project-item');
    if (firstProject) {
        firstProject.classList.add('active');
        const details = firstProject.querySelector('.project-details');
        if (details) {
            details.style.maxHeight = `${details.scrollHeight + 100}px`;
        }
    }
}

/* ================================================================
   7. MOBILE MENU
   ================================================================ */
function initMobileMenu() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
        });
    });
}

/* ================================================================
   8. CONTACT FORM ANIMATION
   ================================================================ */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const airplane = document.querySelector('.paper-airplane');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (airplane && typeof gsap !== 'undefined') {
            gsap.to(airplane, {
                x: 300,
                y: -300,
                scale: 0.1,
                opacity: 0,
                duration: 1.5,
                ease: "power2.inOut",
                onComplete: () => {
                    alert('Thank you for reaching out! I will connect with you soon.');
                    gsap.set(airplane, { x: 0, y: 0, scale: 1, opacity: 1 });
                    form.reset();
                }
            });
        } else {
            alert('Thank you for reaching out! I will connect with you soon.');
            form.reset();
        }
    });
}

/* ================================================================
   9. EASTER EGGS (Konami Code)
   ================================================================ */
function initEasterEggs() {
    const konamiCode = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];
    let inputSequence = [];

    window.addEventListener('keydown', (e) => {
        inputSequence.push(e.key);
        inputSequence = inputSequence.slice(-konamiCode.length);

        if (inputSequence.join('') === konamiCode.join('')) {
            triggerEasterEgg();
        }
    });
}

function triggerEasterEgg() {
    const overlay = document.getElementById('easter-egg');
    if (!overlay) return;

    overlay.classList.add('active');

    setTimeout(() => {
        overlay.classList.remove('active');
    }, 4000);
}

/* ================================================================
   10. DARK/LIGHT THEME TOGGLE
   ================================================================ */
function initThemeToggle() {
    const desktopToggle = document.getElementById('theme-toggle');
    const mobileToggle = document.getElementById('theme-toggle-mobile');
    
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const icon = theme === 'dark' ? '☀️' : '🌙';
        if (desktopToggle) desktopToggle.textContent = icon;
        if (mobileToggle) mobileToggle.textContent = icon;
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }

    if (desktopToggle) {
        desktopToggle.addEventListener('click', toggleTheme);
    }
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleTheme);
    }
}

/* ================================================================
   11. SCROLL PROGRESS BAR
   ================================================================ */
function initScrollProgress() {
    const progressBar = document.getElementById('scroll-progress');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    });
}

/* ================================================================
   12. GALLERY LIGHTBOX
   ================================================================ */
function initLightbox() {
    const overlay = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');
    const counter = document.getElementById('lightbox-counter');

    if (!overlay || !lightboxImg) return;

    const galleryItems = document.querySelectorAll('.gallery-item img');
    let galleryImages = [];
    let currentIndex = 0;

    // Collect all gallery images
    galleryItems.forEach((img, index) => {
        galleryImages.push(img.src);
        img.parentElement.addEventListener('click', () => {
            currentIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        lightboxImg.src = galleryImages[currentIndex];
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        updateCounter();
    }

    function closeLightbox() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        lightboxImg.src = galleryImages[currentIndex];
        updateCounter();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentIndex];
        updateCounter();
    }

    function updateCounter() {
        if (counter) {
            counter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
        }
    }

    // Event listeners
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });
    
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!overlay.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });
}

/* ================================================================
   13. ACTIVE NAV HIGHLIGHTING
   ================================================================ */
function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}

/* ================================================================
   14. BUTTON RIPPLE EFFECT
   ================================================================ */
function initRippleEffect() {
    const buttons = document.querySelectorAll('.hero-cta, .form-submit, .hero-cta-secondary');

    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

/* ================================================================
   15. MAGNETIC SOCIAL LINKS
   ================================================================ */
function initMagneticSocials() {
    const socials = document.querySelectorAll('.social-link');

    socials.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            link.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px) translateY(-4px)`;
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = '';
        });
    });
}
