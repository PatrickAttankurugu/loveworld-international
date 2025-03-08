// translation.js - Language detection and translation functionality

// Make translations and functions available globally
window.translationSystem = {};

document.addEventListener('DOMContentLoaded', function() {
    // Available languages
    const availableLanguages = ['en', 'fr', 'es'];
    
    // Default language
    let currentLang = 'en';
    
    // Store for translations
    let translations = {};
    
    // Expose to global scope
    window.translationSystem = {
        translations: translations,
        currentLang: currentLang,
        changeLanguage: changeLanguage,
        getTranslation: getTranslation
    };
    
    // Language selector container - using direct onclick handlers
    const langSelectorHTML = `
        <div class="language-selector">
            <button class="lang-btn" onclick="window.translationSystem.changeLanguage('en')" data-lang="en">English</button>
            <button class="lang-btn" onclick="window.translationSystem.changeLanguage('fr')" data-lang="fr">Français</button>
            <button class="lang-btn" onclick="window.translationSystem.changeLanguage('es')" data-lang="es">Español</button>
        </div>
    `;
    
    // Look for existing language buttons
    const existingLanguageSelector = document.querySelector('.language-selector');
    
    // Only insert if there isn't already a language selector
    if (!existingLanguageSelector) {
        // Insert language selector into the header
        const headerRight = document.querySelector('.header-right');
        if (headerRight) {
            const langSelector = document.createElement('div');
            langSelector.innerHTML = langSelectorHTML;
            headerRight.prepend(langSelector.firstElementChild);
        }
    } else {
        // Update existing language buttons with onclick handlers
        const enButton = existingLanguageSelector.querySelector('[data-lang="en"]');
        const frButton = existingLanguageSelector.querySelector('[data-lang="fr"]');
        const esButton = existingLanguageSelector.querySelector('[data-lang="es"]');
        
        if (enButton) enButton.onclick = () => window.translationSystem.changeLanguage('en');
        if (frButton) frButton.onclick = () => window.translationSystem.changeLanguage('fr');
        if (esButton) esButton.onclick = () => window.translationSystem.changeLanguage('es');
    }
    
    // Get preferred language from browser or localStorage
    function getPreferredLanguage() {
        // First check localStorage (if user previously selected a language)
        const savedLang = localStorage.getItem('userLanguage');
        if (savedLang && availableLanguages.includes(savedLang)) {
            return savedLang;
        }
        
        // Then check browser language
        const browserLang = navigator.language || navigator.userLanguage;
        const lang = browserLang.split('-')[0]; // Get primary language code
        
        // Return language if supported, otherwise default to English
        return availableLanguages.includes(lang) ? lang : 'en';
    }
    
    // Load translation file for a specific language
    async function loadTranslations(lang) {
        try {
            console.log(`Loading translations for ${lang}...`);
            const response = await fetch(`locales/${lang}.json`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            translations[lang] = data;
            console.log(`Successfully loaded translations for ${lang}`);
            return data;
        } catch (error) {
            console.error(`Could not load translations for ${lang}:`, error);
            
            // If the requested language fails, try to load English as fallback
            if (lang !== 'en') {
                console.log('Falling back to English translations');
                return loadTranslations('en');
            }
            
            // If even English fails, create an empty translations object
            console.log('Creating empty translations object as last resort');
            translations[lang] = {};
            return {};
        }
    }
    
    // Get translation by key (supports nested keys with dot notation)
    function getTranslation(key, lang = currentLang) {
        // Split the key by dots to access nested properties
        const keys = key.split('.');
        
        // Start with the translations object for the current language
        let value = translations[lang];
        
        // Traverse the nested properties
        for (const k of keys) {
            if (value && value[k] !== undefined) {
                value = value[k];
            } else {
                // If not found in current language, try English
                if (lang !== 'en' && translations['en']) {
                    let fallbackValue = translations['en'];
                    let found = true;
                    
                    for (const fallbackKey of keys) {
                        if (fallbackValue && fallbackValue[fallbackKey] !== undefined) {
                            fallbackValue = fallbackValue[fallbackKey];
                        } else {
                            found = false;
                            break;
                        }
                    }
                    
                    if (found) {
                        return fallbackValue;
                    }
                }
                
                // If still not found, return the key
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }
        
        return value;
    }
    
    // Translate all elements with data-i18n attributes
    function translatePage() {
        console.log('Translating page to', currentLang);
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = getTranslation(key);
            
            if (translation) {
                // Check if we need to update different attributes based on element type
                if (element.tagName === 'INPUT' && element.getAttribute('type') === 'placeholder') {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Update specific elements that might not have data-i18n attributes
        updateLivestreamSection();
        updateEventsSection();
        
        // Update HTML lang attribute
        document.documentElement.lang = currentLang;
        
        // Update active state on language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        console.log('Page translation complete');
    }
    
    // Update livestream section specifically
    function updateLivestreamSection() {
        // Check if livestream elements exist
        const liveStatusText = document.getElementById('liveStatusText');
        const livestreamTitle = document.querySelector('.livestream-title');
        const livestreamSubtitle = document.querySelector('.livestream-subtitle');
        const serviceBeginsText = document.querySelector('.overlay-content h3');
        const nextStreamLabel = document.querySelector('.overlay-content p');
        const setReminderBtn = document.getElementById('setReminderBtn');
        const streamTitle = document.getElementById('streamTitle');
        const streamDescription = document.getElementById('streamDescription');
        const watchOnYoutube = document.getElementById('watchOnYoutube');
        const watchOnFacebook = document.getElementById('watchOnFacebook');
        const shareStream = document.getElementById('shareStream');
        const upcomingStreamsTitle = document.querySelector('.upcoming-title');
        
        // Update if elements exist
        if (liveStatusText) liveStatusText.textContent = getTranslation('livestream.status.live');
        if (livestreamTitle) livestreamTitle.textContent = getTranslation('livestream.title');
        if (livestreamSubtitle) livestreamSubtitle.textContent = getTranslation('livestream.subtitle');
        if (serviceBeginsText) serviceBeginsText.textContent = getTranslation('livestream.serviceBeginsMessage');
        if (nextStreamLabel && nextStreamLabel.firstChild) {
            const nextStreamTime = document.getElementById('nextStreamTime');
            const currentTime = nextStreamTime ? nextStreamTime.textContent : '';
            nextStreamLabel.innerHTML = getTranslation('livestream.nextStream') + ': <span id="nextStreamTime">' + currentTime + '</span>';
        }
        if (setReminderBtn) {
            // Preserve the icon if it exists
            const icon = setReminderBtn.querySelector('i');
            const text = getTranslation('livestream.setReminder');
            
            if (icon) {
                setReminderBtn.innerHTML = '';
                setReminderBtn.appendChild(icon.cloneNode(true));
                setReminderBtn.appendChild(document.createTextNode(' ' + text));
            } else {
                setReminderBtn.textContent = text;
            }
        }
        if (streamTitle) streamTitle.textContent = getTranslation('livestream.serviceTitle');
        if (streamDescription) streamDescription.textContent = getTranslation('livestream.serviceDescription');
        
        // Update button text while preserving icons
        if (watchOnYoutube) updateButtonWithIcon(watchOnYoutube, 'livestream.watchOnYoutube');
        if (watchOnFacebook) updateButtonWithIcon(watchOnFacebook, 'livestream.watchOnFacebook');
        if (shareStream) updateButtonWithIcon(shareStream, 'livestream.share');
        
        if (upcomingStreamsTitle) upcomingStreamsTitle.textContent = getTranslation('livestream.upcomingStreams');
    }
    
    // Helper to update button text while preserving the icon
    function updateButtonWithIcon(button, translationKey) {
        const icon = button.querySelector('i');
        const translation = getTranslation(translationKey);
        
        if (icon) {
            button.innerHTML = '';
            button.appendChild(icon.cloneNode(true));
            button.appendChild(document.createTextNode(' ' + translation));
        } else {
            button.textContent = translation;
        }
    }
    
    // Update events section specifically
    function updateEventsSection() {
        // Search and filter elements
        const searchTitle = document.querySelector('.search-box h3');
        const searchInput = document.getElementById('eventSearchInput');
        const filterTitle = document.querySelector('.filter-box h3');
        
        if (searchTitle) searchTitle.textContent = getTranslation('upcomingEvents.search');
        if (searchInput) searchInput.placeholder = getTranslation('upcomingEvents.searchPlaceholder');
        if (filterTitle) filterTitle.textContent = getTranslation('upcomingEvents.filterBy');
        
        // Update location options
        const locationFilter = document.getElementById('locationFilter');
        if (locationFilter && locationFilter.options.length > 0) {
            // Default option
            locationFilter.options[0].textContent = getTranslation('upcomingEvents.locationDefault');
            // Other options if they exist
            if (locationFilter.options[1]) locationFilter.options[1].textContent = getTranslation('upcomingEvents.locations.brooklyn');
            if (locationFilter.options[2]) locationFilter.options[2].textContent = getTranslation('upcomingEvents.locations.manhattan');
            if (locationFilter.options[3]) locationFilter.options[3].textContent = getTranslation('upcomingEvents.locations.queens');
        }
        
        // Update campus options
        const campusFilter = document.getElementById('campusFilter');
        if (campusFilter && campusFilter.options.length > 0) {
            // Default option
            campusFilter.options[0].textContent = getTranslation('upcomingEvents.campusDefault');
            // Other options if they exist
            if (campusFilter.options[1]) campusFilter.options[1].textContent = getTranslation('upcomingEvents.campuses.main');
            if (campusFilter.options[2]) campusFilter.options[2].textContent = getTranslation('upcomingEvents.campuses.east');
            if (campusFilter.options[3]) campusFilter.options[3].textContent = getTranslation('upcomingEvents.campuses.west');
        }
        
        // Update ministry options
        const ministryFilter = document.getElementById('ministryFilter');
        if (ministryFilter && ministryFilter.options.length > 0) {
            // Default option
            ministryFilter.options[0].textContent = getTranslation('upcomingEvents.ministryDefault');
            // Other options if they exist
            if (ministryFilter.options[1]) ministryFilter.options[1].textContent = getTranslation('upcomingEvents.ministries.worship');
            if (ministryFilter.options[2]) ministryFilter.options[2].textContent = getTranslation('upcomingEvents.ministries.outreach');
            if (ministryFilter.options[3]) ministryFilter.options[3].textContent = getTranslation('upcomingEvents.ministries.prayer');
            if (ministryFilter.options[4]) ministryFilter.options[4].textContent = getTranslation('upcomingEvents.ministries.youth');
        }
        
        // Update specific events
        // Event 1: Community Connect Manhattan
        updateEventItem(
            document.querySelector('[data-location="manhattan"][data-ministry="outreach"]'),
            'upcomingEvents.events.communityConnectManhattan'
        );
        
        // Event 2: Community Connect Brooklyn
        updateEventItem(
            document.querySelector('[data-location="brooklyn"][data-ministry="outreach"]'),
            'upcomingEvents.events.communityConnectBrooklyn'
        );
        
        // Event 3: Young Adults Gathering
        updateEventItem(
            document.querySelector('[data-location="manhattan"][data-ministry="youth"]'),
            'upcomingEvents.events.youngAdultsGathering'
        );
    }
    
    // Helper to update an event item
    function updateEventItem(eventElement, translationKey) {
        if (!eventElement) return;
        
        const titleElement = eventElement.querySelector('.event-title');
        const timeElement = eventElement.querySelector('.event-time');
        const descriptionElement = eventElement.querySelector('.event-description');
        const tagElements = eventElement.querySelectorAll('.tag');
        
        if (titleElement) {
            titleElement.textContent = getTranslation(`${translationKey}.title`);
        }
        
        if (timeElement) {
            timeElement.textContent = getTranslation(`${translationKey}.time`);
        }
        
        if (descriptionElement) {
            descriptionElement.textContent = getTranslation(`${translationKey}.description`);
        }
        
        // Update tags if we have information about them
        if (tagElements.length > 0 && tagElements[0]) {
            tagElements[0].textContent = getTranslation(`${translationKey}.tags.fellowship`);
        }
        
        if (tagElements.length > 1 && tagElements[1]) {
            tagElements[1].textContent = getTranslation(`${translationKey}.tags.newYork`);
        }
    }
    
    // Change the language and update the page
    async function changeLanguage(lang) {
        console.log('changeLanguage called with', lang);
        
        if (!availableLanguages.includes(lang)) {
            console.error(`Language ${lang} is not supported.`);
            return;
        }
        
        // Save to localStorage
        localStorage.setItem('userLanguage', lang);
        
        // Load translations if they haven't been loaded already
        if (!translations[lang]) {
            await loadTranslations(lang);
        }
        
        // Update current language
        currentLang = lang;
        window.translationSystem.currentLang = lang;
        
        // Update all translated elements
        translatePage();
        
        console.log('Language changed to', lang);
        
        // Return true to indicate successful language change
        return true;
    }
    
    // Initialize
    async function init() {
        console.log('Initializing translation system');
        
        // Get preferred language
        const preferredLang = getPreferredLanguage();
        console.log('Preferred language:', preferredLang);
        
        // Load English translations first (as fallback)
        await loadTranslations('en');
        
        // Load preferred language translations
        if (preferredLang !== 'en') {
            await loadTranslations(preferredLang);
        }
        
        // Set initial language
        await changeLanguage(preferredLang);
        
        console.log('Translation system initialized');
    }
    
    // Initialize the translations
    init();
    
    // Add basic styles for language selector
    const style = document.createElement('style');
    style.textContent = `
        .language-selector {
            display: flex;
            gap: 5px;
            margin-right: 15px;
        }
        
        .lang-btn {
            background: none;
            border: 1px solid #eee;
            border-radius: 3px;
            padding: 5px 10px;
            font-size: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .lang-btn.active {
            background-color: #d9a228;
            color: white;
            border-color: #d9a228;
        }
        
        .lang-btn:hover:not(.active) {
            background-color: #f0f0f0;
        }
        
        @media (max-width: 768px) {
            .language-selector {
                margin-bottom: 10px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Export key functions to window for direct access
    window.translationSystem = {
        translations: translations,
        currentLang: currentLang,
        changeLanguage: changeLanguage,
        getTranslation: getTranslation,
        translatePage: translatePage
    };
});