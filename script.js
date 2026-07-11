/**
 * SRUSHTI MURADE — Portfolio Interaction Engine
 * Features: Cinematic Loading Screen, Custom Cursor, Constellation,
 * GSAP ScrollTrigger Animations, Case Study Accordion, Easter Eggs.
 */

document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initCustomCursor();
    initParticlesBackground();
    initSkillsConstellation();
    initScrollAnimations();
    initProjectAccordion();
    initMobileMenu();
    initContactForm();
    initEasterEggs();
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
    // Step 1: Rocket Launch
    setTimeout(() => {
        if (rocket) rocket.classList.add('launched');
    }, 500);

    // Step 2: Rocket reaches Moon & Moon morphs
    setTimeout(() => {
        if (moon) moon.classList.add('visible');
    }, 1800);

    setTimeout(() => {
        if (moon) moon.classList.add('morph');
        if (rocket) rocket.style.opacity = '0';
    }, 2500);

    // Step 3: Name and Roles Appear
    setTimeout(() => {
        if (logo) logo.classList.add('visible');
        if (textGroup) textGroup.classList.add('visible');

        // Cycle through roles
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

    // Final Step: Reveal Landing Page
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

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let ringX = 0, ringY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Directly position glow
        if (glow) {
            glow.style.left = `${mouseX - 200}px`;
            glow.style.top = `${mouseY - 200}px`;
        }
    });

    function updateCursor() {
        // Smooth interpolation
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
                x: (leftPercent / 100) * canvas.width + 28, // Offset center
                y: (topPercent / 100) * canvas.height + 28,
                cat: orb.getAttribute('data-category')
            };
        });

        // Draw connections between nearby nodes or same-category nodes
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
}

/* ================================================================
   6. PROJECT ACCORDION
   ================================================================ */
function toggleProject(header) {
    const currentItem = header.parentElement;
    const isActive = currentItem.classList.contains('active');

    // Close all open projects
    document.querySelectorAll('.project-item').forEach(item => {
        item.classList.remove('active');
        const details = item.querySelector('.project-details');
        if (details) details.style.maxHeight = '0px';
    });

    // If wasn't active, open it
    if (!isActive) {
        currentItem.classList.add('active');
        const details = currentItem.querySelector('.project-details');
        if (details) {
            details.style.maxHeight = `${details.scrollHeight + 100}px`;
        }
    }
}

function initProjectAccordion() {
    // Initial active project
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

        // Animate paper airplane flying away
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
                    // Reset position
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

    // Disable after 4 seconds
    setTimeout(() => {
        overlay.classList.remove('active');
    }, 4000);
}
