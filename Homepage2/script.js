/* ========================================
   Agency Header & Hero JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {

    // ========================================
    // Lenis Smooth Scroll Setup
    // ========================================
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ========================================
    // Header Scroll Effect
    // ========================================
    const header = document.getElementById('agencyHeader');

    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const hamburger = document.getElementById('hamburger');
    const agencyNav = document.getElementById('agencyNav');
    const mobileClose = document.getElementById('mobileClose');

    if (hamburger && agencyNav) {
        hamburger.addEventListener('click', function () {
            agencyNav.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (mobileClose && agencyNav) {
        mobileClose.addEventListener('click', function () {
            agencyNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            agencyNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && agencyNav) {
            agencyNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ========================================
    // Hero Background Slideshow
    // ========================================
    const heroSlides = document.querySelectorAll('.hero-bg-slide');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        heroSlides.forEach((slide, i) => {
            slide.classList.remove('active');
        });

        heroSlides[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % heroSlides.length;
        showSlide(next);
    }

    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetSlideshow() {
        clearInterval(slideInterval);
        startSlideshow();
    }

    if (heroSlides.length > 0) {
        startSlideshow();
    }

    // ========================================
    // GSAP Animations
    // ========================================
    gsap.registerPlugin(ScrollTrigger);

    // Initial hero animations on load
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTl.from('.hero-badge', {
        y: -30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3
    })
        .from('.title-line', {
            y: 60,
            opacity: 0,
            duration: 1,
            stagger: 0.15
        }, '-=0.5')
        .from('.hero-desc', {
            y: 30,
            opacity: 0,
            duration: 0.8
        }, '-=0.6')
        .from('.hero-stats', {
            y: 30,
            opacity: 0,
            duration: 0.8
        }, '-=0.5')
        .from('.hero-quick-links', {
            y: 20,
            opacity: 0,
            duration: 0.6
        }, '-=0.4')
        .from('.showcase-card', {
            y: 40,
            opacity: 0,
            duration: 1,
            stagger: 0.15
        }, '-=0.8');
    function animateCounter(element, target) {
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeProgress);

            element.textContent = current.toLocaleString() + (target === 98 ? '%' : '+');

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    const statNumbers = document.querySelectorAll('.stat-number');

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.dataset.count);
                    animateCounter(stat, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsContainer = document.querySelector('.hero-stats');
    if (statsContainer) {
        statsObserver.observe(statsContainer);
    }

    gsap.from('.vision-content', {
        scrollTrigger: {
            trigger: '.agency-vision',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.vision-images', {
        scrollTrigger: {
            trigger: '.agency-vision',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.vision-feature', {
        scrollTrigger: {
            trigger: '.vision-features',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15
    });


    gsap.from('.listings-cta', {
        scrollTrigger: {
            trigger: '.listings-cta',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        delay: 0.3
    });

    gsap.from('.newsletter-content', {
        scrollTrigger: {
            trigger: '.newsletter-section',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const input = this.querySelector('input');
            if (input.value) {
                window.location.href = '404page.html';
            }
        });
    }

    gsap.from('.footer-brand', {
        scrollTrigger: {
            trigger: '.site-footer',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.6
    });

    gsap.from('.footer-links', {
        scrollTrigger: {
            trigger: '.site-footer',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1
    }, '-=0.4');

    gsap.from('.footer-contact', {
        scrollTrigger: {
            trigger: '.site-footer',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        y: 30,
        opacity: 0,
        duration: 0.6
    }, '-=0.4');

    const favoriteBtns = document.querySelectorAll('.favorite-btn');

    favoriteBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const icon = this.querySelector('.material-icons');
            if (icon.textContent === 'favorite_border') {
                icon.textContent = 'favorite';
                this.style.background = '#EF4444';
                this.style.color = 'white';
            } else {
                icon.textContent = 'favorite_border';
                this.style.background = 'rgba(255, 255, 255, 0.9)';
                this.style.color = '';
            }
        });
    });

    const propertyTabs = document.querySelectorAll('.tab-btn');
    const propertiesGrid = document.getElementById('propertiesGrid');
    const noResults = document.getElementById('noResults');

    if (propertyTabs.length > 0 && propertiesGrid) {
        propertyTabs.forEach(tab => {
            tab.addEventListener('click', function () {
                // Remove active class from all tabs
                propertyTabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');

                const tabValue = this.dataset.tab;
                const propertyCards = propertiesGrid.querySelectorAll('.property-card');

                propertyCards.forEach(card => {
                    const cardType = card.dataset.type;

                    if (tabValue === 'all') {
                        card.style.display = 'block';
                    } else if (tabValue === 'new') {
                        // Show only "New" featured properties
                        const badges = card.querySelectorAll('.badge-featured');
                        let isNew = false;
                        badges.forEach(badge => {
                            if (badge.textContent === 'New') {
                                isNew = true;
                            }
                        });
                        card.style.display = isNew ? 'block' : 'none';
                    } else {
                        card.style.display = cardType === tabValue ? 'block' : 'none';
                    }
                });

                checkVisibleProperties();
            });
        });
    }

    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const propertyType = document.getElementById('propertyType');
    const priceRange = document.getElementById('priceRange');
    const bedrooms = document.getElementById('bedrooms');
    const bathrooms = document.getElementById('bathrooms');
    const searchError = document.getElementById('searchError');

    if (searchBtn) {
        searchBtn.addEventListener('click', function () {
            // Get all filter values
            const searchValue = searchInput ? searchInput.value.toLowerCase() : '';
            const typeValue = propertyType ? propertyType.value : '';
            const priceValue = priceRange ? priceRange.value : '';
            const bedroomValue = bedrooms ? bedrooms.value : '';
            const bathroomValue = bathrooms ? bathrooms.value : '';

            // Validation: At least one filter must be selected
            if (!searchValue && !typeValue && !priceValue && !bedroomValue && !bathroomValue) {
                if (searchError) {
                    searchError.style.display = 'flex';
                }
                return;
            }

            // Hide error message if validation passes
            if (searchError) {
                searchError.style.display = 'none';
            }

            // Filter properties
            const propertyCards = propertiesGrid ? propertiesGrid.querySelectorAll('.property-card') : [];

            propertyCards.forEach(card => {
                const cardName = card.querySelector('.property-name') ? card.querySelector('.property-name').textContent.toLowerCase() : '';
                const cardLocation = card.querySelector('.property-location') ? card.querySelector('.property-location').textContent.toLowerCase() : '';
                const cardBedrooms = parseInt(card.dataset.bedrooms) || 0;
                const cardBathrooms = parseInt(card.dataset.bathrooms) || 0;
                const cardPrice = parseInt(card.dataset.price) || 0;
                const cardType = card.dataset.type || '';

                let shouldShow = true;

                // Search text filter
                if (searchValue && !cardName.includes(searchValue) && !cardLocation.includes(searchValue)) {
                    shouldShow = false;
                }

                // Property type filter (simplified - just check if villa/apartment in name)
                if (typeValue && !cardName.includes(typeValue)) {
                    shouldShow = false;
                }

                // Price range filter
                if (priceValue) {
                    const priceParts = priceValue.split('-');
                    if (priceParts.length === 2) {
                        const minPrice = parseInt(priceParts[0]);
                        const maxPrice = parseInt(priceParts[1]);
                        if (cardPrice < minPrice || cardPrice > maxPrice) {
                            shouldShow = false;
                        }
                    } else if (priceValue === '5000000+') {
                        if (cardPrice < 5000000) {
                            shouldShow = false;
                        }
                    }
                }

                // Bedrooms filter
                if (bedroomValue && cardBedrooms < parseInt(bedroomValue)) {
                    shouldShow = false;
                }

                // Bathrooms filter
                if (bathroomValue && cardBathrooms < parseInt(bathroomValue)) {
                    shouldShow = false;
                }

                card.style.display = shouldShow ? 'block' : 'none';
            });

            // Check if any properties are visible
            checkVisibleProperties();

            // Reset to "All" tab
            propertyTabs.forEach(t => t.classList.remove('active'));
            const allTab = document.querySelector('[data-tab="all"]');
            if (allTab) allTab.classList.add('active');
        });

        // Hide error when user starts typing
        if (searchInput) {
            searchInput.addEventListener('input', function () {
                if (searchError) {
                    searchError.style.display = 'none';
                }
            });
        }

        // Hide error when any dropdown changes
        [propertyType, priceRange, bedrooms, bathrooms].forEach(dropdown => {
            if (dropdown) {
                dropdown.addEventListener('change', function () {
                    if (searchError) {
                        searchError.style.display = 'none';
                    }
                });
            }
        });
    }

    // Function to check visible properties and show/hide no results message
    function checkVisibleProperties() {
        const propertyCards = propertiesGrid ? propertiesGrid.querySelectorAll('.property-card') : [];
        let visibleCount = 0;

        propertyCards.forEach(card => {
            if (card.style.display !== 'none') {
                visibleCount++;
            }
        });

        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    // ========================================
    // Contact Form Validation
    // ========================================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const btnReset = document.getElementById('btnReset');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            let isValid = true;

            // Get form fields
            const firstName = document.getElementById('firstName');
            const lastName = document.getElementById('lastName');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');

            // Reset previous errors
            clearFormErrors();

            // Validate First Name
            if (!firstName.value.trim()) {
                showFieldError('firstName', 'firstNameError');
                isValid = false;
            }

            // Validate Last Name
            if (!lastName.value.trim()) {
                showFieldError('lastName', 'lastNameError');
                isValid = false;
            }

            // Validate Email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) {
                showFieldError('email', 'emailError');
                isValid = false;
            }

            if (!subject.value) {
                showFieldError('subject', 'subjectError');
                isValid = false;
            }

            if (!message.value.trim()) {
                showFieldError('message', 'messageError');
                isValid = false;
            }

            if (isValid) {
                window.location.href = '404page.html';
            }
        });

        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function () {
                const fieldId = this.id;
                const errorId = fieldId + 'Error';
                const formGroup = this.closest('.form-group');
                if (formGroup) {
                    formGroup.classList.remove('error');
                }
            });
        });
    }

    function showFieldError(fieldId, errorId) {
        const field = document.getElementById(fieldId);
        const formGroup = field.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('error');
        }
    }

    function clearFormErrors() {
        const formGroups = document.querySelectorAll('.form-group.error');
        formGroups.forEach(group => {
            group.classList.remove('error');
        });
    }

    if (btnReset) {
        btnReset.addEventListener('click', function () {
            contactForm.reset();
            contactForm.style.display = 'block';
            formSuccess.style.display = 'none';
            clearFormErrors();
        });
    }

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', function () {
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current FAQ
            item.classList.toggle('active');
        });
    });

});
