document.addEventListener('DOMContentLoaded', () => {
    const navBtn = document.getElementById('nav-trigger-btn');
    const closeBtn = document.getElementById('nav-close-btn');
    const overlay = document.getElementById('full-overlay-nav');
    const navItems = document.querySelectorAll('.nav-links-list li');
    let lastScrollTop = 0;
    const scrollThreshold = 10; // Scroll distance to hide/show

    // --- 1. Floating Icon Visibility Control (Scroll Up/Down) ---
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        // Only run if the overlay is NOT open
        if (!overlay.classList.contains('open')) {
            if (currentScroll > lastScrollTop && currentScroll > 100) {
                // Scroll Down - Hide the button
                navBtn.classList.add('hidden');
            } else if (currentScroll < lastScrollTop) {
                // Scroll Up - Show the button
                navBtn.classList.remove('hidden');
            }
        }
        
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // For Mobile scroll bounce
    }, false);


    // --- 2. Overlay Open/Close Logic (with chosen animation) ---
    
    // Function to handle opening the menu
    const openNav = () => {
        overlay.classList.add('open');
        navBtn.classList.add('hidden'); // Hide trigger when overlay is open
        document.body.style.overflow = 'hidden'; // Lock scrolling behind overlay

        // Animate links in
        navItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 50 * index); // Staggered entry
        });
    };

    // Function to handle closing the menu (subtle fade-out/slide-up animation)
    const closeNav = () => {
        // Animate links out (Reverse the stagger)
        navItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(-20px)';
        });

        // Close the overlay after the link animation
        setTimeout(() => {
            overlay.classList.remove('open');
            navBtn.classList.remove('hidden'); // Show trigger button again
            document.body.style.overflow = ''; // Restore scrolling
        }, 400); // Match this to CSS transition time
    };

    navBtn.addEventListener('click', openNav);
    closeBtn.addEventListener('click', closeNav);
    
    // Allow clicking links inside to close the menu
    document.querySelectorAll('.nav-links-list a').forEach(link => {
        link.addEventListener('click', closeNav);
    });
});
