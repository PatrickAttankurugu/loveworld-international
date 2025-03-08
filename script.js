// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Navigation Elements
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
    const expandedNav = document.getElementById('expanded-nav');
    const header = document.querySelector('.header');
    
    // Language Selector
    const languageOptions = document.querySelectorAll('[data-lang]');
    const currentLanguageDisplay = document.getElementById('current-language');
    
    // Smooth Scroll for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    // Animation Elements
    const animatedElements = document.querySelectorAll('.section-title, .about-text, .card, .expect-card');
    
    // Video Stream
    const streamStatus = document.getElementById('stream-status');
    const livestreamPlayer = document.getElementById('livestream-player');
    
    // Translations
    const translations = {
        'en': {
            'nav.ourStory': 'Our Story',
            'nav.ourBeliefs': 'Our Beliefs',
            'nav.ourLeadership': 'Our Leadership',
            'nav.give': 'Give',
            'nav.locations': 'Locations',
            'nav.selectLanguage': 'Select Language',
            'nav.upcomingEvents': 'UPCOMING EVENTS',
            'nav.findCommunity': 'Find Community',
            'nav.becomeDoOrHolder': 'Become a Door Holder',
            'nav.serveOurCity': 'Serve Our City',
            'nav.welcomeToChurch': 'Welcome to Church',
            'nav.conferences': 'Loveworld Conferences',
            'nav.records': 'Loveworld Records',
            'nav.equip': 'Loveworld Equip',
            'nav.publishing': 'Loveworld Publishing',
            'nav.resources': 'Loveworld Resources',
            
            'hero.title': 'WELCOME TO LOVEWORLD INTERNATIONAL',
            'hero.subtitle': 'Experience God\'s Love',
            'hero.watchLive': 'WATCH LIVE',
            'hero.learnMore': 'LEARN MORE',
            
            'about.title': 'WHO WE ARE',
            'about.description': 'Loveworld International is a <span class="highlight">vibrant community centered on Christ\'s love</span>. We are dedicated to sharing the message of God\'s grace and transforming lives through the power of His word. Our mission is to bring people into a meaningful relationship with Jesus and create a global impact through love and service.',
            
            'livestream.title': 'JOIN OUR LIVE SERVICE',
            'livestream.status': 'Streaming live every Sunday at 10:00 AM',
            
            'nextSteps.title': 'NEXT STEPS',
            'nextSteps.learnMore': 'Learn More',
            'nextSteps.cards.ministries.title': 'OUR MINISTRIES',
            'nextSteps.cards.ministries.description': 'Discover how you can grow in your faith and connect with others.',
            'nextSteps.cards.events.title': 'UPCOMING EVENTS',
            'nextSteps.cards.events.description': 'Join us for special gatherings, worship nights, and community events.',
            'nextSteps.cards.getInvolved.title': 'GET INVOLVED',
            'nextSteps.cards.getInvolved.description': 'Find out how you can serve and make a difference in our community.',
            'nextSteps.cards.contact.title': 'CONTACT US',
            'nextSteps.cards.contact.description': 'Reach out to us with questions, prayer requests, or to share your story.',
            
            'footer.stayUpdated': 'STAY UP TO DATE WITH LOVEWORLD',
            'footer.submit': 'SUBMIT',
            'footer.ourHouse': 'OUR HOUSE',
            'footer.ourStory': 'Our Story',
            'footer.ourBeliefs': 'Our Beliefs',
            'footer.ourLeadership': 'Our Leadership',
            'footer.joinTeam': 'Join Our Team',
            'footer.locations': 'LOCATIONS',
            'footer.loveworldMovement': 'THE LOVEWORLD MOVEMENT',
            'footer.conferences': 'Loveworld Conferences',
            'footer.records': 'Loveworld Records',
            'footer.equip': 'Loveworld Equip',
            'footer.resources': 'Loveworld Resources',
            'footer.cookiePolicy': 'Cookie Policy',
            'footer.terms': 'Terms + Conditions',
            'footer.smsTerms': 'SMS Terms + Conditions'
        },
        'fr': {
            'nav.ourStory': 'Notre Histoire',
            'nav.ourBeliefs': 'Nos Croyances',
            'nav.ourLeadership': 'Notre Leadership',
            'nav.give': 'Donner',
            'nav.locations': 'Emplacements',
            'nav.selectLanguage': 'Sélectionner la langue',
            'nav.upcomingEvents': 'ÉVÉNEMENTS À VENIR',
            'nav.findCommunity': 'Trouver une Communauté',
            'nav.becomeDoOrHolder': 'Devenir Membre Actif',
            'nav.serveOurCity': 'Servir Notre Ville',
            'nav.welcomeToChurch': 'Bienvenue à l\'Église',
            'nav.conferences': 'Conférences Loveworld',
            'nav.records': 'Records Loveworld',
            'nav.equip': 'Loveworld Équipement',
            'nav.publishing': 'Loveworld Édition',
            'nav.resources': 'Ressources Loveworld',
            
            'hero.title': 'BIENVENUE À LOVEWORLD INTERNATIONAL',
            'hero.subtitle': 'Découvrez l\'Amour de Dieu',
            'hero.watchLive': 'REGARDER EN DIRECT',
            'hero.learnMore': 'EN SAVOIR PLUS',
            
            'about.title': 'QUI SOMMES-NOUS',
            'about.description': 'Loveworld International est une <span class="highlight">communauté dynamique centrée sur l\'amour du Christ</span>. Nous nous consacrons à partager le message de la grâce de Dieu et à transformer des vies par la puissance de Sa parole. Notre mission est d\'amener les gens à une relation significative avec Jésus et de créer un impact mondial par l\'amour et le service.',
            
            'livestream.title': 'REJOIGNEZ NOTRE SERVICE EN DIRECT',
            'livestream.status': 'Diffusion en direct tous les dimanches à 10h00',
            
            'nextSteps.title': 'PROCHAINES ÉTAPES',
            'nextSteps.learnMore': 'En Savoir Plus',
            'nextSteps.cards.ministries.title': 'NOS MINISTÈRES',
            'nextSteps.cards.ministries.description': 'Découvrez comment vous pouvez grandir dans votre foi et vous connecter avec les autres.',
            'nextSteps.cards.events.title': 'ÉVÉNEMENTS À VENIR',
            'nextSteps.cards.events.description': 'Rejoignez-nous pour des rassemblements spéciaux, des soirées de culte et des événements communautaires.',
            'nextSteps.cards.getInvolved.title': 'S\'IMPLIQUER',
            'nextSteps.cards.getInvolved.description': 'Découvrez comment vous pouvez servir et faire une différence dans notre communauté.',
            'nextSteps.cards.contact.title': 'CONTACTEZ-NOUS',
            'nextSteps.cards.contact.description': 'Contactez-nous pour des questions, des demandes de prière ou pour partager votre histoire.',
            
            'footer.stayUpdated': 'RESTEZ À JOUR AVEC LOVEWORLD',
            'footer.submit': 'SOUMETTRE',
            'footer.ourHouse': 'NOTRE MAISON',
            'footer.ourStory': 'Notre Histoire',
            'footer.ourBeliefs': 'Nos Croyances',
            'footer.ourLeadership': 'Notre Leadership',
            'footer.joinTeam': 'Rejoindre Notre Équipe',
            'footer.locations': 'EMPLACEMENTS',
            'footer.loveworldMovement': 'LE MOUVEMENT LOVEWORLD',
            'footer.conferences': 'Conférences Loveworld',
            'footer.records': 'Records Loveworld',
            'footer.equip': 'Loveworld Équipement',
            'footer.resources': 'Ressources Loveworld',
            'footer.cookiePolicy': 'Politique de Cookies',
            'footer.terms': 'Termes + Conditions',
            'footer.smsTerms': 'Termes + Conditions SMS'
        },
        'es': {
            'nav.ourStory': 'Nuestra Historia',
            'nav.ourBeliefs': 'Nuestras Creencias',
            'nav.ourLeadership': 'Nuestro Liderazgo',
            'nav.give': 'Donar',
            'nav.locations': 'Ubicaciones',
            'nav.selectLanguage': 'Seleccionar Idioma',
            'nav.upcomingEvents': 'PRÓXIMOS EVENTOS',
            'nav.findCommunity': 'Encontrar Comunidad',
            'nav.becomeDoOrHolder': 'Convertirse en Colaborador',
            'nav.serveOurCity': 'Servir a Nuestra Ciudad',
            'nav.welcomeToChurch': 'Bienvenido a la Iglesia',
            'nav.conferences': 'Conferencias Loveworld',
            'nav.records': 'Registros Loveworld',
            'nav.equip': 'Loveworld Equipo',
            'nav.publishing': 'Loveworld Publicaciones',
            'nav.resources': 'Recursos Loveworld',
            
            'hero.title': 'BIENVENIDO A LOVEWORLD INTERNATIONAL',
            'hero.subtitle': 'Experimenta el Amor de Dios',
            'hero.watchLive': 'VER EN VIVO',
            'hero.learnMore': 'MÁS INFORMACIÓN',
            
            'about.title': 'QUIÉNES SOMOS',
            'about.description': 'Loveworld International es una <span class="highlight">comunidad vibrante centrada en el amor de Cristo</span>. Nos dedicamos a compartir el mensaje de la gracia de Dios y transformar vidas a través del poder de Su palabra. Nuestra misión es llevar a las personas a una relación significativa con Jesús y crear un impacto global a través del amor y el servicio.',
            
            'livestream.title': 'ÚNETE A NUESTRO SERVICIO EN VIVO',
            'livestream.status': 'Transmisión en vivo todos los domingos a las 10:00 AM',
            
            'nextSteps.title': 'PRÓXIMOS PASOS',
            'nextSteps.learnMore': 'Más Información',
            'nextSteps.cards.ministries.title': 'NUESTROS MINISTERIOS',
            'nextSteps.cards.ministries.description': 'Descubre cómo puedes crecer en tu fe y conectarte con otros.',
            'nextSteps.cards.events.title': 'PRÓXIMOS EVENTOS',
            'nextSteps.cards.events.description': 'Únete a nosotros para reuniones especiales, noches de adoración y eventos comunitarios.',
            'nextSteps.cards.getInvolved.title': 'INVOLÚCRATE',
            'nextSteps.cards.getInvolved.description': 'Descubre cómo puedes servir y marcar la diferencia en nuestra comunidad.',
            'nextSteps.cards.contact.title': 'CONTÁCTANOS',
            'nextSteps.cards.contact.description': 'Comunícate con nosotros para preguntas, peticiones de oración o para compartir tu historia.',
            
            'footer.stayUpdated': 'MANTENTE AL DÍA CON LOVEWORLD',
            'footer.submit': 'ENVIAR',
            'footer.ourHouse': 'NUESTRA CASA',
            'footer.ourStory': 'Nuestra Historia',
            'footer.ourBeliefs': 'Nuestras Creencias',
            'footer.ourLeadership': 'Nuestro Liderazgo',
            'footer.joinTeam': 'Únete a Nuestro Equipo',
            'footer.locations': 'UBICACIONES',
            'footer.loveworldMovement': 'EL MOVIMIENTO LOVEWORLD',
            'footer.conferences': 'Conferencias Loveworld',
            'footer.records': 'Registros Loveworld',
            'footer.equip': 'Loveworld Equipo',
            'footer.resources': 'Recursos Loveworld',
            'footer.cookiePolicy': 'Política de Cookies',
            'footer.terms': 'Términos + Condiciones',
            'footer.smsTerms': 'Términos + Condiciones SMS'
        }
    };
    
    // Navigation Toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            expandedNav.classList.add('active');
            document.body.classList.add('no-scroll');
            
            // Add entrance animations to menu items
            animateMenuItems();
        });
    }
    
    // Navigation Close
    if (navClose) {
        navClose.addEventListener('click', function() {
            expandedNav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    }
    
    // Animate menu items when menu opens
    function animateMenuItems() {
        const menuSections = document.querySelectorAll('.expanded-nav-section');
        const menuHeader = document.querySelector('.expanded-nav-header');
        const menuUpcoming = document.querySelector('.expanded-nav-upcoming');
        const menuFeatured = document.querySelector('.expanded-nav-featured');
        
        // Reset any existing animations
        menuSections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
        });
        
        if (menuHeader) {
            menuHeader.style.opacity = '0';
            menuHeader.style.transform = 'translateY(-20px)';
        }
        
        if (menuUpcoming) {
            menuUpcoming.style.opacity = '0';
        }
        
        if (menuFeatured) {
            menuFeatured.style.opacity = '0';
            menuFeatured.style.transform = 'translateY(20px)';
        }
        
        // Animate in sequence
        setTimeout(() => {
            if (menuHeader) {
                menuHeader.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                menuHeader.style.opacity = '1';
                menuHeader.style.transform = 'translateY(0)';
            }
        }, 100);
        
        setTimeout(() => {
            if (menuUpcoming) {
                menuUpcoming.style.transition = 'opacity 0.5s ease';
                menuUpcoming.style.opacity = '1';
            }
        }, 300);
        
        menuSections.forEach((section, index) => {
            setTimeout(() => {
                section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 500 + (index * 150));
        });
        
        setTimeout(() => {
            if (menuFeatured) {
                menuFeatured.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                menuFeatured.style.opacity = '1';
                menuFeatured.style.transform = 'translateY(0)';
            }
        }, 900);
    }
    
    // Handle Scroll Effects
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY;
        
        // Header background changes on scroll
        if (scrollPos > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth Scroll for Anchor Links
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close expanded nav if open
                if (expandedNav.classList.contains('active')) {
                    expandedNav.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
                
                // Calculate offset considering fixed header
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Detect Browser Language and Location
    function detectUserLanguage() {
        // First try to get from localStorage (if user has set preference before)
        const savedLanguage = localStorage.getItem('selectedLanguage');
        if (savedLanguage && translations[savedLanguage]) {
            return savedLanguage;
        }
        
        // Then try to detect from browser
        const browserLang = navigator.language || navigator.userLanguage;
        const shortLang = browserLang.split('-')[0];
        
        // Check if we support this language
        if (translations[shortLang]) {
            return shortLang;
        }
        
        // Default to English
        return 'en';
    }
    
    // Change Language Function
    function changeLanguage(langCode) {
        if (!translations[langCode]) {
            console.error('Language not supported:', langCode);
            return;
        }
        
        // Save language preference
        localStorage.setItem('selectedLanguage', langCode);
        
        // Update HTML lang attribute
        document.documentElement.setAttribute('lang', langCode);
        
        // Update display in language selector
        if (currentLanguageDisplay) {
            currentLanguageDisplay.textContent = langCode.toUpperCase();
        }
        
        // Update all translated elements
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            
            if (translations[langCode][key]) {
                // For elements with HTML content
                if (key.includes('description')) {
                    element.innerHTML = translations[langCode][key];
                } else {
                    element.textContent = translations[langCode][key];
                }
            }
        });
        
        // Update language selector active states
        document.querySelectorAll('[data-lang]').forEach(el => {
            if (el.getAttribute('data-lang') === langCode) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });
    }
    
    // Set up language switching
    if (languageOptions.length > 0) {
        languageOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');
                changeLanguage(lang);
            });
        });
    }
    
    // Live Stream Status Check
    function checkLiveStreamStatus() {
        // This is a placeholder for a real API call to check live status
        // In a real implementation, you would call your backend API
        const now = new Date();
        const day = now.getDay(); // 0 = Sunday
        const hour = now.getHours();
        
        // If it's Sunday between 10AM and 12PM, show live status
        const isLive = (day === 0 && hour >= 10 && hour < 12);
        
        if (streamStatus) {
            const currentLang = document.documentElement.getAttribute('lang') || 'en';
            
            if (isLive) {
                streamStatus.innerHTML = '<span class="live-indicator">● LIVE NOW</span> ' + 
                    (translations[currentLang]['livestream.status'] || 'Streaming live');
                streamStatus.classList.add('is-live');
                
                // Pulsate effect for live indicator
                const liveIndicator = document.querySelector('.live-indicator');
                if (liveIndicator) {
                    liveIndicator.style.animation = 'pulse 1.5s infinite';
                }
            } else {
                streamStatus.textContent = translations[currentLang]['livestream.status'] || 'Streaming live every Sunday at 10:00 AM';
                streamStatus.classList.remove('is-live');
            }
        }
    }
    
    // Scroll Animation with Intersection Observer
    function setupScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in-up');
                        // Once the animation has played, stop observing
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            
            // Observe all animated elements
            animatedElements.forEach(element => {
                observer.observe(element);
            });
        } else {
            // Fallback for browsers that don't support Intersection Observer
            animatedElements.forEach(element => {
                element.classList.add('fade-in-up');
            });
        }
    }

    // Interactive card hover effects
    function setupCardInteractions() {
        const cards = document.querySelectorAll('.card, .expect-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
            });
        });
    }

    // Create a dynamic typing effect for specific text
    function createTypingEffect(element, textArray, delay = 3000) {
        if (!element) return;
        
        let currentTextIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const currentText = textArray[currentTextIndex];
            
            if (isDeleting) {
                // Deleting text
                element.textContent = currentText.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = 50; // Faster when deleting
            } else {
                // Typing text
                element.textContent = currentText.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 150; // Slower when typing
            }
            
            // If we've completed typing the current text
            if (!isDeleting && currentCharIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = delay; // Pause before deleting
            }
            
            // If we've completed deleting the current text
            if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % textArray.length;
                typingSpeed = 500; // Pause before typing next text
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start the typing effect
        setTimeout(type, delay);
    }

    // Newsletter form interactivity
    function setupNewsletterForm() {
        const newsletterForm = document.querySelector('.newsletter-form');
        const emailInput = newsletterForm ? newsletterForm.querySelector('input[type="email"]') : null;
        
        if (newsletterForm && emailInput) {
            // Focus effect
            emailInput.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            emailInput.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Form submission
            newsletterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = emailInput.value.trim();
                if (!email || !isValidEmail(email)) {
                    showFormError(emailInput, 'Please enter a valid email address');
                    return;
                }
                
                // Show success message
                const submitButton = this.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                
                submitButton.disabled = true;
                submitButton.textContent = 'Submitting...';
                
                // Simulate API call
                setTimeout(() => {
                    submitButton.textContent = 'Success!';
                    emailInput.value = '';
                    
                    // Reset button after some time
                    setTimeout(() => {
                        submitButton.disabled = false;
                        submitButton.textContent = originalText;
                    }, 2000);
                }, 1000);
            });
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFormError(inputElement, message) {
        // Remove any existing error message
        const existingError = inputElement.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create and add error message
        const errorElement = document.createElement('p');
        errorElement.classList.add('error-message');
        errorElement.textContent = message;
        inputElement.parentElement.appendChild(errorElement);
        
        // Highlight input
        inputElement.classList.add('error');
        
        // Remove error after 3 seconds
        setTimeout(() => {
            errorElement.remove();
            inputElement.classList.remove('error');
        }, 3000);
    }
    
    // Hero section animations
    function animateHeroElements() {
        const heroLocation = document.querySelector('.hero-location');
        const heroEvents = document.querySelector('.hero-events');
        
        if (heroLocation) {
            heroLocation.style.opacity = '0';
            heroLocation.style.transform = 'translateY(-30px)';
            
            setTimeout(() => {
                heroLocation.style.transition = 'opacity 1s ease, transform 1s ease';
                heroLocation.style.opacity = '1';
                heroLocation.style.transform = 'translateY(0)';
            }, 500);
        }
        
        if (heroEvents) {
            heroEvents.style.opacity = '0';
            heroEvents.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                heroEvents.style.transition = 'opacity 1s ease, transform 1s ease';
                heroEvents.style.opacity = '1';
                heroEvents.style.transform = 'translateY(0)';
            }, 1000);
        }
    }
    
    // Set up YouTube video background functionality
    function setupYouTubeBackground() {
        // This is already handled in the inline script in index.html
        // The YouTube iframe API will create and manage the player
    }
    
    // Initialize everything
    function init() {
        // Set initial language based on user's browser/location
        const initialLanguage = detectUserLanguage();
        changeLanguage(initialLanguage);
        
        // Check livestream status initially and set up interval
        checkLiveStreamStatus();
        setInterval(checkLiveStreamStatus, 60000); // Check every minute
        
        // Set up all animations and interactions
        setupScrollAnimations();
        setupCardInteractions();
        setupNewsletterForm();
        animateHeroElements();
        
        // Set up typing effect for location title
        const locationTitle = document.querySelector('.location-title');
        if (locationTitle) {
            createTypingEffect(locationTitle, [
                'Located at Loveworld Auditorium',
                'Join Us This Sunday',
                'Experience God\'s Love',
                'Welcome to Loveworld USA'
            ]);
        }
        
        // Set up active links in navigation
        setupActiveNavLinks();
    }
    
    // Set up active navigation links based on current section
    function setupActiveNavLinks() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        
        if (sections.length && navLinks.length) {
            window.addEventListener('scroll', () => {
                let current = '';
                const scrollPosition = window.scrollY + 200; // Offset for header
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        current = '#' + section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === current) {
                        link.classList.add('active');
                    }
                });
            });
        }
    }
    
    // Handle loading screen
    function handlePageLoad() {
        const body = document.body;
        
        // Wait for YouTube API to initialize
        window.addEventListener('load', () => {
            // Add loaded class to body to trigger animations
            setTimeout(() => {
                body.classList.add('loaded');
            }, 500);
        });
    }
    
    // Run initialization
    init();
    handlePageLoad();
});