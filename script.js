// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const closeMenu = document.getElementById('closeMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    
    // Check if elements exist before adding event listeners
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mobileNav.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.classList.add('menu-open');
            menuToggle.classList.add('active');
        });
    }
    
    // Fix for close menu functionality
    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            closeNav();
        });
    }
    
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            closeNav();
        });
    }
    
    function closeNav() {
        if (mobileNav) mobileNav.classList.remove('active');
        if (menuOverlay) menuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
        if (menuToggle) menuToggle.classList.remove('active');
        
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
                if(mobileNav && mobileNav.classList.contains('active')) {
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
            border-top: 5px solid #d9a228;
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
    
    if (timeButtons.length > 0) {
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
    }
});

// What to Expect Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const expectCards = document.querySelectorAll('.expect-card');
    
    // Check if there are any expect cards on the page
    if (expectCards.length > 0) {
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
    }
    
    // Add click event listeners for cards if needed
    if (expectCards.length > 0) {
        expectCards.forEach(card => {
            card.addEventListener('click', function() {
                // Optional: Add any click behavior here
                // For example, you could expand the card or navigate to a detail page
            });
        });
    }
});

// All Ages Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Select all age groups for animation
    const ageGroups = document.querySelectorAll('.age-group');
    
    // Check if there are any age groups on the page
    if (ageGroups.length > 0) {
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
    }
    
    // Add click event for learn more buttons
    const learnMoreBtns = document.querySelectorAll('.learn-more-btn');
    
    if (learnMoreBtns.length > 0) {
        learnMoreBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Get the group title this button belongs to
                const groupTitle = this.closest('.age-content').querySelector('.group-title').textContent;
                
                // You can replace this with actual navigation or modal display
                console.log(`Learn more about ${groupTitle}`);
            });
        });
    }
});

// Upcoming Events Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample event data - in a real implementation, this would come from an API or backend
    const allEvents = [
        {
            id: 1,
            title: "Global Day of Prayer with Pastor Chris",
            date: "15",
            month: "APR",
            time: "7:00pm - 9:00pm ET",
            description: "Join millions of believers worldwide as we unite in prayer with Pastor Chris for global impact and spiritual transformation!",
            tags: ["PRAYER", "GLOBAL EVENT"],
            location: "newyork",
            ministry: "prayer",
            campus: "main"
        },
        {
            id: 2,
            title: "ReachOut USA Campaign",
            date: "16",
            month: "APR",
            time: "7:00pm - 9:00pm ET",
            description: "Join our strategic evangelism outreach as we distribute one million copies of Rhapsody of Realities across the United States!",
            tags: ["RHAPSODY", "SOUL WINNING"],
            location: "newyork",
            ministry: "rhapsody",
            campus: "east"
        },
        {
            id: 3,
            title: "Healing Streams Live Healing Services",
            date: "22",
            month: "APR",
            time: "7:30pm - 9:30pm ET",
            description: "Experience extraordinary miracles, healings, and testimonies as Pastor Chris ministers in the power of the Holy Spirit during this special healing service!",
            tags: ["HEALING", "MIRACLES"],
            location: "newyork",
            ministry: "healing",
            campus: "main"
        },
        {
            id: 4,
            title: "Loveworld Praise Night",
            date: "25",
            month: "APR",
            time: "7:00pm - 10:00pm ET",
            description: "Join us for an evening of powerful praise and worship with the Loveworld Singers and special guest ministers.",
            tags: ["WORSHIP", "MUSIC"],
            location: "losangeles",
            ministry: "worship",
            campus: "west"
        },
        {
            id: 5,
            title: "Youth Impact Conference",
            date: "29",
            month: "APR",
            time: "10:00am - 4:00pm ET",
            description: "A dynamic conference for youth and young adults featuring inspiring speakers, workshops, and networking opportunities.",
            tags: ["YOUTH", "CONFERENCE"],
            location: "houston",
            ministry: "youth",
            campus: "main"
        },
        {
            id: 6,
            title: "Ministers' Network Summit",
            date: "02",
            month: "MAY",
            time: "9:00am - 3:00pm ET",
            description: "An enriching gathering for pastors and ministry leaders with special impartation sessions by senior ministers.",
            tags: ["LEADERSHIP", "PASTORS"],
            location: "newyork",
            ministry: "leadership",
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
    
    // Check if we're on the events page
    if (!eventsList) return;
    
    // Pagination variables
    let currentPage = 1;
    const eventsPerPage = 3;
    let filteredEvents = [...allEvents];
    
    // Initialize the page
    initializeEvents();
    
    // Event listeners for filters
    if (eventSearchBtn) {
        eventSearchBtn.addEventListener('click', filterEvents);
    }
    
    if (eventSearchInput) {
        eventSearchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                filterEvents();
            }
        });
    }
    
    if (locationFilter) locationFilter.addEventListener('change', filterEvents);
    if (campusFilter) campusFilter.addEventListener('change', filterEvents);
    if (ministryFilter) ministryFilter.addEventListener('change', filterEvents);
    
    // Pagination event listeners
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                displayEvents();
                updatePaginationControls();
            }
        });
    }
    
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', function() {
            const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                displayEvents();
                updatePaginationControls();
            }
        });
    }
    
    // Initialize events on page load
    function initializeEvents() {
        displayEvents();
        updatePaginationControls();
        
        // Add animation after a short delay
        setTimeout(() => {
            const eventItems = document.querySelectorAll('.event-item');
            eventItems.forEach(item => {
                item.classList.add('visible');
            });
        }, 100);
    }
    
    // Filter events based on search and dropdown selections
    function filterEvents() {
        currentPage = 1; // Reset to first page when filtering
        
        const searchTerm = eventSearchInput ? eventSearchInput.value.toLowerCase() : '';
        const locationValue = locationFilter ? locationFilter.value.toLowerCase() : '';
        const campusValue = campusFilter ? campusFilter.value.toLowerCase() : '';
        const ministryValue = ministryFilter ? ministryFilter.value.toLowerCase() : '';
        
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
        if (!eventsList) return;
        
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
            const eventItems = document.querySelectorAll('.event-item');
            eventItems.forEach(item => {
                item.classList.add('visible');
            });
        }, 50);
    }
    
    // Update pagination controls
    function updatePaginationControls() {
        if (!prevPageBtn || !nextPageBtn) return;
        
        const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
        
        prevPageBtn.disabled = currentPage <= 1;
        nextPageBtn.disabled = currentPage >= totalPages;
    }
    
    // Function to show detailed event information
    function showEventDetails(event) {
        // Create modal for event details
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
        
        document.body.appendChild(modal);
        
        // Add modal active class after a short delay to trigger animation
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Close modal when clicking the close button
        modal.querySelector('.close-modal').addEventListener('click', function() {
            modal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });
        
        // Close modal when clicking outside the modal content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
        });
        
        // Register button functionality
        modal.querySelector('.register-btn').addEventListener('click', function() {
            alert(`You are now registered for ${event.title}!`);
            modal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
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
       streamTitle: 'Sunday Communion Service',
       streamDescription: 'Join Pastor Chris Oyakhilome for our communion service and experience the power of God\'s Word, divine healing, and the glory of God\'s presence.',
       nextStreamTime: 'Sunday at 9:30AM ET',
       streamLink: 'https://loveworldusa.org/live',
       upcomingStreams: [
           {
               id: 1,
               title: 'Sunday Communion Service',
               description: 'Join Pastor Chris for the monthly communion service',
               date: '2025-04-13',
               time: '9:30 AM ET',
               thumbnail: 'img/communion.jpeg',
           },
           {
               id: 2,
               title: 'Midweek Service',
               description: 'Special teaching on the Holy Spirit by Pastor Chris',
               date: '2025-04-16',
               time: '7:00 PM ET',
               thumbnail: 'img/midweek.png',
           },
           {
               id: 3,
               title: 'Healing Streams Broadcast',
               description: 'Special healing service with Pastor Chris',
               date: '2025-04-18',
               time: '8:00 PM ET',
               thumbnail: 'img/streams.jpg',
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
   
   // Check if we're on the livestream page
   if (!streamTitle || !streamDescription) return;
   
   // Initialize page
   initPage();
   
   // Set up event listeners
   setUpEventListeners();
   
   // Functions
   function initPage() {
       // Update with config data
       if (streamTitle) streamTitle.textContent = config.streamTitle;
       if (streamDescription) streamDescription.textContent = config.streamDescription;
       if (nextStreamTime) nextStreamTime.textContent = config.nextStreamTime;
       if (streamLinkInput) streamLinkInput.value = config.streamLink;
       
       // Update live status
       updateLiveStatus();
       
       // Generate upcoming streams
       generateUpcomingStreams();
       
       // If live, load the stream
       if (config.isLive && playerOverlay && videoContainer) {
           loadStream(config.currentPlatform);
       }
   }
   
   function setUpEventListeners() {
       // Reminder modal
       if (setReminderBtn && reminderModal) {
           setReminderBtn.addEventListener('click', function() {
               reminderModal.classList.add('show');
           });
       }
       
       if (closeReminderModal && reminderModal) {
           closeReminderModal.addEventListener('click', function() {
               reminderModal.classList.remove('show');
           });
       }
       
       if (reminderForm) {
           reminderForm.addEventListener('submit', function(e) {
               e.preventDefault();
               const email = document.getElementById('reminderEmail').value;
               const phone = document.getElementById('reminderPhone') ? document.getElementById('reminderPhone').value : '';
               const times = [...document.querySelectorAll('input[name="reminderTime"]:checked')]
                   .map(checkbox => checkbox.value);
               
               // This is where you would send the data to your backend
               console.log('Setting reminder for:', email, phone, times);
               
               // Show confirmation
               alert('Thank you! We\'ll remind you before the stream starts.');
               
               // Close modal
               if (reminderModal) reminderModal.classList.remove('show');
           });
       }
       
       // Share modal
       if (shareStream && shareModal) {
           shareStream.addEventListener('click', function() {
               shareModal.classList.add('show');
           });
       }
       
       if (closeShareModal && shareModal) {
           closeShareModal.addEventListener('click', function() {
               shareModal.classList.remove('show');
           });
       }
       
       // Copy link button
       if (copyLinkBtn && streamLinkInput) {
           copyLinkBtn.addEventListener('click', function() {
               streamLinkInput.select();
               document.execCommand('copy');
               this.textContent = 'Copied!';
               
               setTimeout(() => {
                   this.textContent = 'Copy';
               }, 2000);
           });
       }
       
       // Platform buttons
       if (watchOnYoutube) {
           watchOnYoutube.addEventListener('click', function() {
               window.open(`https://www.youtube.com/watch?v=${config.youtubeEmbedId}`, '_blank');
           });
       }
       
       if (watchOnFacebook) {
           watchOnFacebook.addEventListener('click', function() {
               window.open(`https://www.facebook.com/YourPage/videos/YOUR_VIDEO_ID/`, '_blank');
           });
       }
       
       // Share buttons
       const shareFacebook = document.getElementById('shareFacebook');
       if (shareFacebook) {
           shareFacebook.addEventListener('click', function(e) {
               e.preventDefault();
               window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(config.streamLink)}`, '_blank');
           });
       }
       
       const shareTwitter = document.getElementById('shareTwitter');
       if (shareTwitter) {
           shareTwitter.addEventListener('click', function(e) {
               e.preventDefault();
               window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(config.streamLink)}&text=${encodeURIComponent('Join us for worship at Loveworld International USA!')}`, '_blank');
           });
       }
       
       const shareWhatsapp = document.getElementById('shareWhatsapp');
       if (shareWhatsapp) {
           shareWhatsapp.addEventListener('click', function(e) {
               e.preventDefault();
               window.open(`https://wa.me/?text=${encodeURIComponent('Join us for worship at Loveworld International USA! ' + config.streamLink)}`, '_blank');
           });
       }
       
       const shareEmail = document.getElementById('shareEmail');
       if (shareEmail) {
           shareEmail.addEventListener('click', function(e) {
               e.preventDefault();
               window.location.href = `mailto:?subject=${encodeURIComponent('Join our Livestream Service')}&body=${encodeURIComponent('Join us for worship at Loveworld International USA!\n\n' + config.streamLink)}`;
           });
       }
       
       // Clicks on upcoming stream cards
       document.addEventListener('click', function(e) {
           const streamCard = e.target.closest('.upcoming-stream-card');
           if (streamCard && setReminderBtn) {
               const streamId = streamCard.dataset.id;
               setReminderBtn.click();
           }
       });
   }
   
   function updateLiveStatus() {
    if (!liveStatusText || !liveStatusIndicator || !playerOverlay) return;
    
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
    if (!videoContainer) return;
    
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
    if (!upcomingStreamsList) return;
    
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
 
 // Add CSS for mobile responsive improvements
 document.addEventListener('DOMContentLoaded', function() {
    const mobileCss = document.createElement('style');
    mobileCss.innerHTML = `
        @media (max-width: 768px) {
            /* Increase logo size on mobile */
            .logo img {
                height: 50px !important;
            }
            
            /* Hide upcoming programs button on mobile */
            .event-button {
                display: none !important;
            }
            
            /* Ensure mobile menu works correctly */
            .mobile-nav {
                z-index: 1000 !important;
            }
            
            /* Make sure close button is visible and clickable */
            .close-menu {
                opacity: 1 !important;
                visibility: visible !important;
                position: absolute !important;
                right: 20px !important;
                top: 20px !important;
                font-size: 36px !important;
                color: #d9a228 !important;
                z-index: 2000 !important;
            }
            
            /* Improve mobile header spacing */
            .main-header {
                padding: 15px 0 !important;
            }
            
            /* Enhance menu toggle button */
            .menu-toggle {
                width: 50px !important;
                height: 50px !important;
            }
            
            .menu-toggle span {
                width: 30px !important;
            }
        }
    `;
    document.head.appendChild(mobileCss);
 });