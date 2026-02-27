document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initHeaderScroll();

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && typeof Lenis !== 'undefined') {
        initAllAnimations();
    } else {
        const checkLibraries = setInterval(() => {
            if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined' && typeof Lenis !== 'undefined') {
                clearInterval(checkLibraries);
                initAllAnimations();
            }
        }, 100);
        setTimeout(() => clearInterval(checkLibraries), 5000);
    }
});

function initMobileMenu() {
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");
    const closeMenu = document.getElementById("closeMenu");

    if (!hamburger || !navMenu || !closeMenu) return;

    function openMenu() {
        navMenu.classList.add("active");
        closeMenu.classList.add("active");
        document.body.style.overflow = "hidden";
        if (window.lenis) window.lenis.stop();
    }

    function closeNav() {
        navMenu.classList.remove("active");
        closeMenu.classList.remove("active");
        document.body.style.overflow = "";
        if (window.lenis) window.lenis.start();
    }

    hamburger.addEventListener("click", openMenu);
    closeMenu.addEventListener("click", closeNav);

    document.querySelectorAll(".nav-items a, .menu-items a").forEach(link => {
        link.addEventListener("click", closeNav);
    });
}

function initHeaderScroll() {
    const header = document.getElementById('header');
    const wrapper = document.getElementById('header-wrap');
    const triggerHeight = 150;

    if (!header || !wrapper) return;
    if (window.innerWidth <= 768) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.scrollY > triggerHeight) {
                    wrapper.style.height = `${header.offsetHeight}px`;
                    header.classList.add('is-fixed');
                } else {
                    wrapper.style.height = 'auto';
                    header.classList.remove('is-fixed');
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

function initAllAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    initLenisSmoothScroll();

    initHeroAnimations();
    initPageHeroAnimations();
    initSectionHeaderAnimations();
}

function initLenisSmoothScroll() {
    const isMobile = window.innerWidth < 768;

    window.lenis = new Lenis({
        duration: isMobile ? 1.2 : 1.6,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
    });

    window.lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        window.lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target && window.lenis) {
                window.lenis.scrollTo(target, {
                    offset: -80,
                    duration: 1.2
                });
            }
        });
    });

    let scrollTimeout;
    window.lenis.on('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);
    });
}


function initHeroAnimations() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const heroHeading = hero.querySelector('h1');
    const heroParagraph = hero.querySelector('p');
    const heroButtons = hero.querySelectorAll('.hero-actions a');
    const heroAvatars = hero.querySelector('.hero-user-avatars');
    const heroImages = hero.querySelectorAll('.hero-img-avatars img');

    const tl = gsap.timeline({ delay: 0.3 });

    if (heroHeading) {
        const text = heroHeading.textContent;

        heroHeading.innerHTML = text.split(' ').map(word => {

            const chars = word.split('').map(char =>
                `<span class="char" style="display: inline-block;">${char}</span>`
            ).join('');

            return `<span class="word" style="display: inline-block; white-space: nowrap;">${chars}</span>`;

        }).join(' ');

        tl.fromTo(heroHeading.querySelectorAll('.char'),
            { y: 100, opacity: 0, rotateX: -90 },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
                duration: 0.8,
                stagger: 0.03,
                ease: "back.out(1.7)"
            }
        );
    }

    if (heroParagraph) {
        const words = heroParagraph.textContent.split(' ');
        heroParagraph.innerHTML = words.map(word =>
            `<span class="word" style="display: inline-block; margin-right: 0.3em;"><span class="word-inner" style="display: inline-block;">${word}</span></span>`
        ).join('');

        tl.fromTo(heroParagraph.querySelectorAll('.word-inner'),
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.02,
                ease: "power3.out"
            },
            "-=0.4"
        );
    }

    if (heroButtons.length > 0) {
        tl.fromTo(heroButtons,
            { scale: 0.8, opacity: 0 },
            {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: "back.out(1.7)"
            },
            "-=0.3"
        );
    }

    if (heroAvatars) {
        tl.fromTo(heroAvatars,
            { x: -50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out"
            },
            "-=0.3"
        );
    }

    if (heroImages.length > 0) {
        tl.fromTo(heroImages,
            { scale: 1.2, opacity: 0, filter: "blur(10px)" },
            {
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1,
                stagger: 0.15,
                ease: "power3.out"
            },
            "-=0.6"
        );
    }
}

function initPageHeroAnimations() {
    const pageHeroes = document.querySelectorAll('.head-hero');

    pageHeroes.forEach(hero => {
        const heading = hero.querySelector('h1');
        const breadcrumb = hero.querySelector('.breadcrumb');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: hero,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        if (heading) {
            const text = heading.textContent;
            heading.innerHTML = text.split(' ').map(word =>
                `<span class="word-wrapper" style="display: inline-block; overflow: hidden; margin-right: 0.3em;">
                    <span class="word-text" style="display: inline-block;">${word}</span>
                 </span>`
            ).join('');

            tl.fromTo(heading.querySelectorAll('.word-text'),
                { y: "100%", opacity: 0 },
                {
                    y: "0%",
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: "power3.out"
                }
            );
        }

        if (breadcrumb) {
            tl.fromTo(breadcrumb,
                { x: 30, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.out"
                },
                "-=0.4"
            );
        }
    });
}

function initSectionHeaderAnimations() {
    const sectionHeaders = document.querySelectorAll('.section-header');

    sectionHeaders.forEach((header) => {
        const sectionHead = header.querySelector('.section-head, .subtitle-gold');
        const sectionSubhead = header.querySelector('.section-subhead, h2');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: header,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });

        if (sectionHead) {
            tl.fromTo(sectionHead,
                {
                    y: 30,
                    opacity: 0,
                    clipPath: "inset(0 100% 0 0)"
                },
                {
                    y: 0,
                    opacity: 1,
                    clipPath: "inset(0 0% 0 0)",
                    duration: 0.6,
                    ease: "power3.out"
                }
            );
        }

        if (sectionSubhead) {
            const words = sectionSubhead.textContent.split(' ');
            sectionSubhead.innerHTML = words.map(word =>
                `<span class="word" style="display: inline-block; overflow: hidden; margin-right: 0.25em;">
                    <span class="word-inner" style="display: inline-block;">${word}</span>
                 </span>`
            ).join('');

            const wordInners = sectionSubhead.querySelectorAll('.word-inner');

            tl.fromTo(wordInners,
                {
                    y: 50,
                    opacity: 0,
                    rotateX: -90
                },
                {
                    y: 0,
                    opacity: 1,
                    rotateX: 0,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: "power3.out"
                },
                "-=0.3"
            );
        }
    });

    gsap.utils.toArray('[data-aos="fade-up"]').forEach((element) => {
        gsap.fromTo(element,
            { y: 40, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power2.out"
            }
        );
    });
}

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }, 250);
});

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (typeof gsap !== 'undefined') {
        gsap.globalTimeline.timeScale(0);
    }
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.disable());
    }
}
