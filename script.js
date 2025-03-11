// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.id = 'mobileNav';
    mobileNav.innerHTML = `
        <div class="mobile-nav-container">
            <div class="mobile-nav-header">
                <img src="img/logo.png" alt="Love World International USA">
                <button class="close-menu" id="closeMenu">&times;</button>
            </div>
            <nav>
                <ul>
                    <!-- About Menu Item with Dropdown -->
                    <li class="has-submenu">
                        <a href="#" class="dropdown-toggle">About <i class="fas fa-chevron-down"></i></a>
                        <ul class="submenu">
                            <li><a href="#">About Love World International</a></li>
                            <li><a href="#">Our Vision</a></li>
                            <li><a href="#">Our Mission</a></li>
                            <li><a href="#">Management Staff</a></li>
                        </ul>
                    </li>
                    <li><a href="#">Our Beliefs</a></li>
                    <li><a href="#">Our Leadership</a></li>
                    <li><a href="#">Give</a></li>
                    <li><a href="#"><i class="fas fa-map-marker-alt"></i> Locations</a></li>
                    <li><a href="#">Upcoming Events</a></li>
                </ul>
            </nav>
            <div class="mobile-social">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-youtube"></i></a>
            </div>
        </div>
    `;
    document.body.appendChild(mobileNav);

    // Style for mobile nav (adding these styles via JS since they're specific to this component)
    const style = document.createElement('style');
    style.innerHTML = `
        .mobile-nav {
            position: fixed;
            top: 0;
            right: -100%;
            width: 85%;
            max-width: 350px;
            height: 100vh;
            background-color: white;
            z-index: 1000;
            box-shadow: -5px 0 15px rgba(0,0,0,0.15);
            transition: right 0.4s cubic-bezier(0.77, 0, 0.175, 1);
            overflow-y: auto;
            padding-top: 70px;
        }
        .mobile-nav.active {
            right: 0;
        }
        .mobile-nav-container {
            padding: 20px;
        }
        .mobile-nav-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            position: absolute;
            top: 15px;
            left: 20px;
            right: 20px;
        }
        .mobile-nav-header img {
            height: 30px;
        }
        .close-menu {
            background: none;
            border: none;
            font-size: 30px;
            cursor: pointer;
            color: #0d1a59;
            transition: all 0.3s ease;
        }
        .close-menu:hover {
            color: #d9a228;
            transform: rotate(90deg);
        }
        .mobile-nav nav ul {
            display: flex;
            flex-direction: column;
            gap: 0;
        }
        .mobile-nav nav ul li {
            border-bottom: 1px solid rgba(0,0,0,0.05);
        }
        .mobile-nav nav ul li a {
            color: #0d1a59;
            font-size: 16px;
            font-weight: 500;
            display: block;
            padding: 15px 0;
            transition: all 0.3s ease;
        }
        .mobile-nav nav ul li a:hover {
            color: #d9a228;
            padding-left: 5px;
        }
        .mobile-social {
            margin-top: 40px;
            display: flex;
            gap: 20px;
            justify-content: center;
        }
        .mobile-social a {
            font-size: 1.2rem;
            color: #0d1a59;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgba(13, 26, 89, 0.05);
            transition: all 0.3s ease;
        }
        .mobile-social a:hover {
            background-color: #d9a228;
            color: #fff;
            transform: translateY(-3px);
        }
        .overlay-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.6);
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
            backdrop-filter: blur(3px);
        }
        .overlay-bg.active {
            opacity: 1;
            visibility: visible;
        }
        body.menu-open {
            overflow: hidden;
        }
        .menu-toggle {
            background: none;
            border: none;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            gap: 5px;
            padding: 5px;
            position: relative;
            width: 40px;
            height: 40px;
            z-index: 110;
            justify-content: center;
            align-items: center;
        }
        .menu-toggle span {
            display: block;
            width: 25px;
            height: 2px;
            background-color: #0d1a59;
            border-radius: 2px;
            transition: transform 0.3s ease-in-out, opacity 0.2s ease;
            transform-origin: center;
        }
        .menu-toggle.active span:nth-child(1) {
            transform: translateY(7px) rotate(45deg);
        }
        .menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        .menu-toggle.active span:nth-child(3) {
            transform: translateY(-7px) rotate(-45deg);
        }
        /* Styles for the submenu/dropdown in mobile navigation */
        .mobile-nav .has-submenu {
            position: relative;
        }
        .mobile-nav .dropdown-toggle {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .mobile-nav .dropdown-toggle i {
            transition: transform 0.3s ease;
        }
        .mobile-nav .dropdown-toggle.active i {
            transform: rotate(-180deg);
        }
        .mobile-nav .submenu {
            background-color: rgba(13, 26, 89, 0.03);
            border-radius: 8px;
            margin-top: 5px;
            margin-bottom: 10px;
            overflow: hidden;
            max-height: 0;
            opacity: 0;
            transition: max-height 0.4s ease, opacity 0.3s ease, margin 0.3s ease;
        }
        .mobile-nav .submenu.active {
            max-height: 1000px;
            opacity: 1;
            margin-top: 8px;
            margin-bottom: 8px;
        }
        .mobile-nav .submenu li {
            border-bottom: 1px solid rgba(0, 0, 0, 0.03);
        }
        .mobile-nav .submenu li:last-child {
            border-bottom: none;
        }
        .mobile-nav .submenu a {
            padding: 12px 15px;
            font-size: 14px;
            color: #333;
        }
        .mobile-nav .submenu a:hover {
            background-color: rgba(217, 162, 40, 0.05);
        }
    `;
    document.head.appendChild(style);

    // Create overlay background
    const overlayBg = document.createElement('div');
    overlayBg.className = 'overlay-bg';
    overlayBg.id = 'menuOverlay';
    document.body.appendChild(overlayBg);

    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
        mobileNav.classList.add('active');
        overlayBg.classList.add('active');
        document.body.classList.add('menu-open');
        menuToggle.classList.add('active');
    });

    // Close mobile menu
    const closeMenu = document.querySelector('.close-menu');
    closeMenu.addEventListener('click', closeNav);
    overlayBg.addEventListener('click', closeNav);

    function closeNav() {
        mobileNav.classList.remove('active');
        overlayBg.classList.remove('active');
        document.body.classList.remove('menu-open');
        menuToggle.classList.remove('active');
        
        // Reset any open submenus when closing the main menu
        resetSubmenus();
    }
    
    // Submenu dropdown functionality
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle the active class on the dropdown button
            this.classList.toggle('active');
            
            // Find the adjacent submenu
            const submenu = this.nextElementSibling;
            if (submenu) {
                submenu.classList.toggle('active');
            }
            
            // Don't close the mobile menu when clicking a dropdown toggle
            e.stopPropagation();
        });
    });
    
    // Reset submenus function
    function resetSubmenus() {
        const activeDropdowns = document.querySelectorAll('.dropdown-toggle.active');
        const activeSubmenus = document.querySelectorAll('.submenu.active');
        
        activeDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        
        activeSubmenus.forEach(submenu => {
            submenu.classList.remove('active');
        });
    }

    // Parallax scrolling effect
    window.addEventListener('scroll', function() {
        const parallaxContainers = document.querySelectorAll('.parallax-container');
        
        parallaxContainers.forEach(container => {
            // Only apply parallax on devices that can handle it (not mobile)
            if (window.innerWidth >= 992) {
                const scrollPosition = window.pageYOffset;
                const speed = 0.5; // Adjust for desired effect speed
                
                // Calculate the new background position
                const yPos = -(scrollPosition * speed);
                
                // Apply the new background position
                container.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    });

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if(this.getAttribute('href') === '#' || this.classList.contains('dropdown-toggle')) return;
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile nav if it's open
                if(mobileNav.classList.contains('active')) {
                    closeNav();
                }
            }
        });
    });

    // Implement preloader
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="loader"></div>
    `;
    
    const preloaderStyle = document.createElement('style');
    preloaderStyle.innerHTML = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        .loader {
            width: 50px;
            height: 50px;
            border: 5px solid #f3f3f3;
            border-top: 5px solid #00bcd4;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(preloaderStyle);
    document.body.prepend(preloader);
    
    // Hide preloader when page is loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }, 500);
    });

    // Scroll reveal animation
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };
    
    const elementOutOfView = (el) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop > 
            (window.innerHeight || document.documentElement.clientHeight)
        );
    };
    
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
    
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
    
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else if (elementOutOfView(el)) {
                hideScrollElement(el);
            }
        });
    };
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // Initialize animation on page load
    handleScrollAnimation();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        // Reset parallax on mobile
        if (window.innerWidth < 992) {
            const parallaxContainers = document.querySelectorAll('.parallax-container');
            parallaxContainers.forEach(container => {
                container.style.backgroundPosition = 'center center';
            });
        }
    });
    
    // Add interactive elements to time buttons
    const timeButtons = document.querySelectorAll('.time-button');
    
    timeButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});

// What to Expect Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const expectCards = document.querySelectorAll('.expect-card');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const expectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    expectObserver.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, {
            root: null, // Use viewport as root
            threshold: 0.15, // Trigger when 15% of the element is visible
            rootMargin: '0px 0px -50px 0px' // Adjust the trigger point
        });
        
        // Observe each card
        expectCards.forEach(card => {
            expectObserver.observe(card);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        expectCards.forEach(card => {
            card.classList.add('active');
        });
    }
    
    // Image lazy loading
    const lazyImages = document.querySelectorAll('.card-img');
    
    // Replace placeholder images with actual images when ready
    // This is just an example - you'll need to update with your actual image URLs
    const actualImages = [
        'img/pas.jpg',
        'img/Pastor-chris.jpeg',
        'img/love-world.jpg'
    ];
    
    // Function to load actual images
    function loadActualImages() {
        lazyImages.forEach((img, index) => {
            // Only replace if we have an actual image URL for this index
            if (actualImages[index]) {
                const newSrc = actualImages[index];
                
                // Create new image to preload
                const tempImg = new Image();
                tempImg.src = newSrc;
                
                // When the new image is loaded, update the src
                tempImg.onload = function() {
                    img.src = newSrc;
                    img.classList.add('loaded');
                };
            }
        });
    }
    
    // Load actual images after a short delay to prioritize page render
    setTimeout(loadActualImages, 500);
    
    // Add click event listeners for cards if needed
    expectCards.forEach(card => {
        card.addEventListener('click', function() {
            // Optional: Add any click behavior here
            // For example, you could expand the card or navigate to a detail page
        });
    });
});

// All Ages Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Select all age groups for animation
    const ageGroups = document.querySelectorAll('.age-group');
    
    // Set up intersection observer for scroll animations
    if ('IntersectionObserver' in window) {
        const ageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    ageObserver.unobserve(entry.target); // Stop observing once animated
                }
            });
        }, {
            root: null, // Use viewport as root
            threshold: 0.2, // Trigger when 20% of the element is visible
            rootMargin: '0px 0px -50px 0px' // Adjust the trigger point
        });
        
        // Observe each age group
        ageGroups.forEach(group => {
            ageObserver.observe(group);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        ageGroups.forEach(group => {
            group.classList.add('active');
        });
    }
    
    // Replace placeholder images with actual images
    // These should be updated with your actual image paths
    const ageImages = document.querySelectorAll('.age-image img');
    const actualImages = [
        '/img/healing streams.png',
        '/img/healing streams.png',
        '/img/healing streams.png'
    ];
    
    // Function to load actual images
    function loadActualImages() {
        ageImages.forEach((img, index) => {
            if (actualImages[index]) {
                const newSrc = actualImages[index];
                
                // Create new image to preload
                const tempImg = new Image();
                tempImg.src = newSrc;
                
                // When the new image is loaded, update the src
                tempImg.onload = function() {
                    img.src = newSrc;
                    img.classList.add('loaded');
                };
            }
        });
    }
    
    // Load actual images after a short delay
    setTimeout(loadActualImages, 300);
    
    // Add click event for learn more buttons
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
    
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the group title this button belongs to
            const groupTitle = this.closest('.age-content').querySelector('.group-title').textContent;
            
            // You can replace this with actual navigation or modal display
            console.log(`Learn more about ${groupTitle}`);
            
            // Example: You could show more details in a modal
            // showDetailsModal(groupTitle);
        });
    });
    
    // Optional: Function to show details in a modal
    // Implement this if you want to show more information when "LEARN MORE" is clicked
    function showDetailsModal(groupTitle) {
        // This is a placeholder for modal functionality
        // You would implement this based on your site's UI framework
        alert(`More information about ${groupTitle} would appear here.`);
    }
});

// Upcoming Events Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample event data - in a real implementation, this would come from an API or backend
    const allEvents = [
        {
            id: 1,
            title: "Community Connect (Manhattan)",
            date: "15",
            month: "APR",
            time: "7:00pm - 9:00pm ET",
            description: "Connect with neighbors and build lasting relationships in your local community!",
            tags: ["FELLOWSHIP", "NEW YORK"],
            location: "manhattan",
            ministry: "outreach",
            campus: "main"
        },
        {
            id: 2,
            title: "Community Connect (Brooklyn)",
            date: "16",
            month: "APR",
            time: "7:00pm - 9:00pm ET",
            description: "Connect with neighbors and build lasting relationships in your local community!",
            tags: ["FELLOWSHIP", "NEW YORK"],
            location: "brooklyn",
            ministry: "outreach",
            campus: "east"
        },
        {
            id: 3,
            title: "Young Adults Gathering",
            date: "22",
            month: "APR",
            time: "7:30pm - 9:30pm ET",
            description: "If you're a student or young professional in the city, this evening is just for you!",
            tags: ["YOUNG ADULTS", "NEW YORK"],
            location: "manhattan",
            ministry: "youth",
            campus: "main"
        },
        {
            id: 4,
            title: "Prayer & Worship Night",
            date: "25",
            month: "APR",
            time: "7:00pm - 8:30pm ET",
            description: "Join us for an evening of powerful prayer and inspiring worship music.",
            tags: ["WORSHIP", "NEW YORK"],
            location: "queens",
            ministry: "prayer",
            campus: "west"
        },
        {
            id: 5,
            title: "Family Fun Day",
            date: "29",
            month: "APR",
            time: "10:00am - 2:00pm ET",
            description: "Bring the whole family for games, food, and fellowship with other families!",
            tags: ["FAMILY", "NEW YORK"],
            location: "brooklyn",
            ministry: "outreach",
            campus: "east"
        },
        {
            id: 6,
            title: "Leadership Workshop",
            date: "02",
            month: "MAY",
            time: "9:00am - 12:00pm ET",
            description: "Develop your leadership skills and learn how to make a greater impact in your community.",
            tags: ["LEADERSHIP", "NEW YORK"],
            location: "manhattan",
            ministry: "prayer",
            campus: "main"
        }
    ];
    
    // DOM Elements
    const eventsList = document.getElementById('eventsList');
    const eventSearchInput = document.getElementById('eventSearchInput');
    const eventSearchBtn = document.getElementById('eventSearchBtn');
    const locationFilter = document.getElementById('locationFilter');
    const campusFilter = document.getElementById('campusFilter');
    const ministryFilter = document.getElementById('ministryFilter');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    
    // Pagination variables
    let currentPage = 1;
    const eventsPerPage = 3;
    let filteredEvents = [...allEvents];
    
    // Initialize the page
    initializeEvents();
    
    // Event listeners for filters
    eventSearchBtn.addEventListener('click', filterEvents);
    eventSearchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            filterEvents();
        }
    });
    
    locationFilter.addEventListener('change', filterEvents);
    campusFilter.addEventListener('change', filterEvents);
    ministryFilter.addEventListener('change', filterEvents);
    
    // Pagination event listeners
    prevPageBtn.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            displayEvents();
            updatePaginationControls();
        }
    });
    
    nextPageBtn.addEventListener('click', function() {
        const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayEvents();
            updatePaginationControls();
        }
    });
    
    // Initialize events on page load
    function initializeEvents() {
        displayEvents();
        updatePaginationControls();
        
        // Add animation after a short delay
        setTimeout(() => {
            document.querySelectorAll('.event-item').forEach(item => {
                item.classList.add('visible');
            });
        }, 100);
    }
    
    // Filter events based on search and dropdown selections
    function filterEvents() {
        currentPage = 1; // Reset to first page when filtering
        
        const searchTerm = eventSearchInput.value.toLowerCase();
        const locationValue = locationFilter.value.toLowerCase();
        const campusValue = campusFilter.value.toLowerCase();
        const ministryValue = ministryFilter.value.toLowerCase();
        
        filteredEvents = allEvents.filter(event => {
            // Search term filter
            const matchesSearch = searchTerm === '' || 
                event.title.toLowerCase().includes(searchTerm) || 
                event.description.toLowerCase().includes(searchTerm);
            
            // Dropdown filters
            const matchesLocation = locationValue === '' || event.location === locationValue;
            const matchesCampus = campusValue === '' || event.campus === campusValue;
            const matchesMinistry = ministryValue === '' || event.ministry === ministryValue;
            
            return matchesSearch && matchesLocation && matchesCampus && matchesMinistry;
        });
        
        displayEvents();
        updatePaginationControls();
    }
    
    // Display events for the current page
    function displayEvents() {
        eventsList.innerHTML = ''; // Clear current events
        
        const startIndex = (currentPage - 1) * eventsPerPage;
        const endIndex = Math.min(startIndex + eventsPerPage, filteredEvents.length);
        const eventsToShow = filteredEvents.slice(startIndex, endIndex);
        
        if (eventsToShow.length === 0) {
            eventsList.innerHTML = '<div class="no-events"><p>No events found matching your criteria.</p></div>';
            return;
        }
        
        eventsToShow.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = 'event-item';
            eventElement.setAttribute('data-location', event.location);
            eventElement.setAttribute('data-ministry', event.ministry);
            eventElement.setAttribute('data-campus', event.campus);
            
            eventElement.innerHTML = `
                <div class="event-date">
                    <div class="date-number">${event.date}</div>
                    <div class="date-month">${event.month}</div>
                </div>
                
                <div class="event-details">
                    <h3 class="event-title">${event.title}</h3>
                    <div class="event-time">${event.time}</div>
                    <p class="event-description">${event.description}</p>
                </div>
                
                <div class="event-tags">
                    ${event.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            `;
            
            // Add click event to view event details
            eventElement.addEventListener('click', function() {
                showEventDetails(event);
            });
            
            eventsList.appendChild(eventElement);
        });
        
        // Add animation
        setTimeout(() => {
            document.querySelectorAll('.event-item').forEach(item => {
                item.classList.add('visible');
            });
        }, 50);
    }
    
    // Update pagination controls
    function updatePaginationControls() {
        const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
        
        prevPageBtn.disabled = currentPage <= 1;
        nextPageBtn.disabled = currentPage >= totalPages;
    }
    
    // Function to show detailed event information (example implementation)
    function showEventDetails(event) {
        // This could open a modal or navigate to a detail page
        console.log(`View details for: ${event.title}`);
        
        // Example of creating a modal (would need corresponding HTML/CSS)
        // In a real implementation, you might have a modal template in your HTML
        const modal = document.createElement('div');
        modal.className = 'event-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>${event.title}</h2>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="event-date-large">
                        <div class="date-number">${event.date}</div>
                        <div class="date-month">${event.month}</div>
                    </div>
                    <p class="event-time"><strong>Time:</strong> ${event.time}</p>
                    <p class="event-description">${event.description}</p>
                    <div class="event-location">
                        <p><strong>Location:</strong> ${event.location.charAt(0).toUpperCase() + event.location.slice(1)}</p>
                        <p><strong>Campus:</strong> ${event.campus.charAt(0).toUpperCase() + event.campus.slice(1)} Campus</p>
                    </div>
                    <button class="register-btn">Register Now</button>
                </div>
            </div>
        `;
        
        // Add CSS for a simple modal (in a real implementation, this would be in your CSS file)
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .event-modal {
                position: fixed;
               top: 0;
               left: 0;
               width: 100%;
               height: 100%;
               background-color: rgba(0,0,0,0.5);
               display: flex;
               justify-content: center;
               align-items: center;
               z-index: 1000;
           }
           .modal-content {
               background-color: white;
               border-radius: 10px;
               width: 90%;
               max-width: 600px;
               max-height: 90vh;
               overflow-y: auto;
               box-shadow: 0 5px 15px rgba(0,0,0,0.3);
           }
           .modal-header {
               display: flex;
               justify-content: space-between;
               align-items: center;
               padding: 20px;
               border-bottom: 1px solid #eee;
           }
           .modal-body {
               padding: 20px;
           }
           .close-modal {
               background: none;
               border: none;
               font-size: 1.5rem;
               cursor: pointer;
           }
           .event-date-large {
               text-align: center;
               margin-bottom: 20px;
           }
           .event-date-large .date-number {
               font-size: 4rem;
               font-weight: 700;
               line-height: 1;
           }
           .event-date-large .date-month {
               font-size: 1.2rem;
               text-transform: uppercase;
               color: #777;
           }
           .register-btn {
               display: block;
               width: 100%;
               padding: 12px;
               background-color: #00bcd4;
               color: white;
               border: none;
               border-radius: 5px;
               font-size: 1rem;
               font-weight: 600;
               cursor: pointer;
               margin-top: 20px;
               transition: background-color 0.3s ease;
           }
           .register-btn:hover {
               background-color: #0097a7;
           }
       `;
       
       document.head.appendChild(modalStyle);
       document.body.appendChild(modal);
       
       // Close modal when clicking the close button
       modal.querySelector('.close-modal').addEventListener('click', function() {
           document.body.removeChild(modal);
           document.head.removeChild(modalStyle);
       });
       
       // Close modal when clicking outside the modal content
       modal.addEventListener('click', function(e) {
           if (e.target === modal) {
               document.body.removeChild(modal);
               document.head.removeChild(modalStyle);
           }
       });
       
       // Register button functionality
       modal.querySelector('.register-btn').addEventListener('click', function() {
           alert(`You are now registered for ${event.title}!`);
           document.body.removeChild(modal);
           document.head.removeChild(modalStyle);
       });
   }
});

// Livestream Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
   // Configuration (these would normally come from your CMS or backend)
   const config = {
       isLive: false, // Set to true when streaming is live
       youtubeEmbedId: 'YOUR_YOUTUBE_EMBED_ID', // Replace with your actual YouTube ID
       facebookEmbedUrl: 'https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/YourPage/videos/YOUR_VIDEO_ID/', // Replace with your actual Facebook embed URL
       currentPlatform: 'youtube', // 'youtube' or 'facebook'
       streamTitle: 'Sunday Worship Service',
       streamDescription: 'Join Pastor David for our weekly worship service as we dive into God\'s Word together.',
       nextStreamTime: 'Sunday at 9:30AM ET',
       streamLink: 'https://loveworldusa.org/live',
       upcomingStreams: [
           {
               id: 1,
               title: 'Sunday Morning Service',
               description: 'Weekly worship and message from Pastor David',
               date: '2025-04-13',
               time: '9:30 AM ET',
               thumbnail: 'https://via.placeholder.com/600x400',
           },
           {
               id: 2,
               title: 'Midweek Bible Study',
               description: 'Deep dive into the book of Ephesians',
               date: '2025-04-16',
               time: '7:00 PM ET',
               thumbnail: 'https://via.placeholder.com/600x400',
           },
           {
               id: 3,
               title: 'Prayer & Worship Night',
               description: 'A special evening of prayer and praise',
               date: '2025-04-18',
               time: '8:00 PM ET',
               thumbnail: 'https://via.placeholder.com/600x400',
           }
       ]
   };

   // DOM Elements
   const playerOverlay = document.getElementById('playerOverlay');
   const videoContainer = document.getElementById('videoContainer');
   const liveStatusIndicator = document.getElementById('liveStatusIndicator');
   const liveStatusText = document.getElementById('liveStatusText');
   const nextStreamTime = document.getElementById('nextStreamTime');
   const streamTitle = document.getElementById('streamTitle');
   const streamDescription = document.getElementById('streamDescription');
   const setReminderBtn = document.getElementById('setReminderBtn');
   const reminderModal = document.getElementById('reminderModal');
   const closeReminderModal = document.getElementById('closeReminderModal');
   const reminderForm = document.getElementById('reminderForm');
   const watchOnYoutube = document.getElementById('watchOnYoutube');
   const watchOnFacebook = document.getElementById('watchOnFacebook');
   const shareStream = document.getElementById('shareStream');
   const shareModal = document.getElementById('shareModal');
   const closeShareModal = document.getElementById('closeShareModal');
   const streamLinkInput = document.getElementById('streamLinkInput');
   const copyLinkBtn = document.getElementById('copyLinkBtn');
   const upcomingStreamsList = document.getElementById('upcomingStreamsList');
   
   // Initialize page
   initPage();
   
   // Set up event listeners
   setUpEventListeners();
   
   // Functions
   function initPage() {
       // Update with config data
       streamTitle.textContent = config.streamTitle;
       streamDescription.textContent = config.streamDescription;
       nextStreamTime.textContent = config.nextStreamTime;
       streamLinkInput.value = config.streamLink;
       
       // Update live status
       updateLiveStatus();
       
       // Generate upcoming streams
       generateUpcomingStreams();
       
       // If live, load the stream
       if (config.isLive) {
           loadStream(config.currentPlatform);
       }
   }
   
   function setUpEventListeners() {
       // Reminder modal
       setReminderBtn.addEventListener('click', function() {
           reminderModal.classList.add('show');
       });
       
       closeReminderModal.addEventListener('click', function() {
           reminderModal.classList.remove('show');
       });
       
       reminderForm.addEventListener('submit', function(e) {
           e.preventDefault();
           const email = document.getElementById('reminderEmail').value;
           const phone = document.getElementById('reminderPhone').value;
           const times = [...document.querySelectorAll('input[name="reminderTime"]:checked')]
               .map(checkbox => checkbox.value);
           
           // This is where you would send the data to your backend
           console.log('Setting reminder for:', email, phone, times);
           
           // Show confirmation
           alert('Thank you! We\'ll remind you before the stream starts.');
           
           // Close modal
           reminderModal.classList.remove('show');
       });
       
       // Share modal
       shareStream.addEventListener('click', function() {
           shareModal.classList.add('show');
       });
       
       closeShareModal.addEventListener('click', function() {
           shareModal.classList.remove('show');
       });
       
       // Copy link button
       copyLinkBtn.addEventListener('click', function() {
           streamLinkInput.select();
           document.execCommand('copy');
           this.textContent = 'Copied!';
           
           setTimeout(() => {
               this.textContent = 'Copy';
           }, 2000);
       });
       
       // Platform buttons
       watchOnYoutube.addEventListener('click', function() {
           window.open(`https://www.youtube.com/watch?v=${config.youtubeEmbedId}`, '_blank');
       });
       
       watchOnFacebook.addEventListener('click', function() {
           window.open(`https://www.facebook.com/YourPage/videos/YOUR_VIDEO_ID/`, '_blank');
       });
       
       // Share buttons
       document.getElementById('shareFacebook').addEventListener('click', function(e) {
           e.preventDefault();
           window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(config.streamLink)}`, '_blank');
       });
       
       document.getElementById('shareTwitter').addEventListener('click', function(e) {
           e.preventDefault();
           window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(config.streamLink)}&text=${encodeURIComponent('Join us for worship at Love World International USA!')}`, '_blank');
       });
       
       document.getElementById('shareWhatsapp').addEventListener('click', function(e) {
           e.preventDefault();
           window.open(`https://wa.me/?text=${encodeURIComponent('Join us for worship at Love World International USA! ' + config.streamLink)}`, '_blank');
       });
       
       document.getElementById('shareEmail').addEventListener('click', function(e) {
           e.preventDefault();
           window.location.href = `mailto:?subject=${encodeURIComponent('Join our Livestream Service')}&body=${encodeURIComponent('Join us for worship at Love World International USA!\n\n' + config.streamLink)}`;
       });
       
       // Clicks on upcoming stream cards
       document.addEventListener('click', function(e) {
           if (e.target.closest('.upcoming-stream-card')) {
               const card = e.target.closest('.upcoming-stream-card');
               const streamId = card.dataset.id;
               
               // This could open details, set a reminder, etc.
               setReminderBtn.click();
           }
       });
   }
   
   function updateLiveStatus() {
       if (config.isLive) {
           liveStatusText.textContent = 'LIVE NOW';
           liveStatusIndicator.classList.add('active');
           playerOverlay.style.display = 'none';
       } else {
           liveStatusText.textContent = 'UPCOMING';
           liveStatusIndicator.classList.remove('active');
           playerOverlay.style.display = 'flex';
       }
   }
   
   function loadStream(platform) {
       if (platform === 'youtube') {
           videoContainer.innerHTML = `
               <iframe
                   src="https://www.youtube.com/embed/${config.youtubeEmbedId}?autoplay=1&rel=0"
                   frameborder="0"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                   allowfullscreen
               ></iframe>
           `;
       } else if (platform === 'facebook') {
           videoContainer.innerHTML = `
               <iframe
                   src="${config.facebookEmbedUrl}"
                   frameborder="0"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                   allowfullscreen
               ></iframe>
           `;
       }
   }
   
   function generateUpcomingStreams() {
       upcomingStreamsList.innerHTML = '';
       
       config.upcomingStreams.forEach(stream => {
           const streamCard = document.createElement('div');
           streamCard.className = 'upcoming-stream-card';
           streamCard.dataset.id = stream.id;
           
           streamCard.innerHTML = `
               <div class="upcoming-stream-thumbnail">
                   <img src="${stream.thumbnail}" alt="${stream.title}">
                   <div class="upcoming-stream-date">${formatDate(stream.date)}</div>
               </div>
               <div class="upcoming-stream-info">
                   <h4>${stream.title}</h4>
                   <p>${stream.description}</p>
                   <div class="upcoming-stream-time">
                       <i class="fas fa-clock"></i>
                       ${stream.time}
                   </div>
               </div>
           `;
           
           upcomingStreamsList.appendChild(streamCard);
       });
   }
   
   function formatDate(dateStr) {
       const date = new Date(dateStr);
       return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
   }
});