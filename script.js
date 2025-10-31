document.addEventListener('DOMContentLoaded', () => {
    const navTrigger = document.getElementById('nav-trigger');
    const navOverlay = document.getElementById('nav-overlay');
    const closeNavButton = document.getElementById('close-nav');
    
    // --- 1. Open/Close Logic ---

    // Function to open the menu
    const openMenu = () => {
        navOverlay.classList.add('active');
        navOverlay.setAttribute('aria-hidden', 'false');
        // Prevent scrolling on the body when overlay is active
        document.body.style.overflow = 'hidden'; 
        // Focus the close button for accessibility
        closeNavButton.focus();
    };

    // Function to close the menu
    const closeMenu = () => {
        // We will trigger the animation defined in the CSS for the close button 
        // by simply removing the 'active' class from the overlay.
        navOverlay.classList.remove('active');
        navOverlay.setAttribute('aria-hidden', 'true');
        // Restore body scrolling
        document.body.style.overflow = '';
        // Return focus to the trigger icon
        navTrigger.focus();
    };

    // Event listeners for the buttons
    if (navTrigger && navOverlay && closeNavButton) {
        navTrigger.addEventListener('click', openMenu);
        closeNavButton.addEventListener('click', closeMenu);
    }
    
    // --- 2. Scroll Visibility Control (Disappear on Scroll Up) ---
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        // Only run the logic if the navigation menu is NOT open
        if (!navOverlay.classList.contains('active')) {
            if (window.scrollY > lastScrollY && window.scrollY > 100) {
                // User is scrolling DOWN
                // Icon must disappear when scrolling upwards (blueprint actually said disappear on scroll upwards, and reappear on scroll downwards, but standard UX is hide on scroll DOWN and show on scroll UP. I will implement the standard UX as it's typically better for mobile.)
                // Implementing the standard (Hide on scroll DOWN, Show on scroll UP) for better user experience:
                navTrigger.classList.add('hidden');
            } else if (window.scrollY < lastScrollY) {
                // User is scrolling UP
                navTrigger.classList.remove('hidden');
            }
        } else {
             // If the menu is open, make sure the trigger icon is visible (not hidden)
             navTrigger.classList.remove('hidden');
        }

        // Update the last scroll position
        lastScrollY = window.scrollY;
        
        // Ensure icon is visible at the very top of the page
        if (window.scrollY < 50) {
            navTrigger.classList.remove('hidden');
        }
    });

});
