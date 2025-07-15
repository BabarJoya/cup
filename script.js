document.addEventListener('DOMContentLoaded', () => {
    // Function to load images into a specific grid
    function loadImagesIntoGrid(gridId, numberOfImages) {
        const gridElement = document.getElementById(gridId);
        if (!gridElement) {
            console.error(`Grid element with ID "${gridId}" not found.`);
            return;
        }

        // Clear any existing content in the grid
        gridElement.innerHTML = '';

        for (let i = 1; i <= numberOfImages; i++) {
            const movieItem = document.createElement('div');
            movieItem.classList.add('movie-item');

            const img = document.createElement('img');
            // Construct the image path. Assumes images are in an 'images' folder
            // and named img1.jpg, img2.jpg, etc.
            img.src = `images/img${i}.jpg`;
            img.alt = `Movie Poster ${i}`;

            // Add an onerror handler for images that might not exist
            img.onerror = function() {
                this.onerror = null; // Prevent infinite loop if placeholder also fails
                this.src = `https://placehold.co/300x450/333333/FFFFFF?text=No+Image`; // Placeholder image
                console.warn(`Image not found: ${this.src}. Using placeholder.`);
            };

            movieItem.appendChild(img);
            gridElement.appendChild(movieItem);
        }
    }

    // Load images for each section
    // You can adjust the number of images for each section here.
    // Make sure you have enough images (img1.jpg, img2.jpg, etc.) in your 'images' folder.
    loadImagesIntoGrid('trending-now-grid', 12); // Example: Load 12 images for Trending Now
    loadImagesIntoGrid('new-releases-grid', 10); // Example: Load 10 images for New Releases
    loadImagesIntoGrid('continue-watching-grid', 8); // Example: Load 8 images for Continue Watching

    // Get references to elements
    const heroSection = document.getElementById('hero-section');
    const closeBannerBtn = document.getElementById('close-banner-btn');
    const heroSpacer = document.getElementById('hero-spacer');
    const mainContent = document.querySelector('main');
    const startNowBtn = document.getElementById('start-now-btn');

    // Debugging: Log if elements are found
    console.log('--- Element Initialization Check ---');
    console.log('Hero Section Found:', !!heroSection, heroSection);
    console.log('Close Banner Button Found:', !!closeBannerBtn, closeBannerBtn);
    console.log('Hero Spacer Found:', !!heroSpacer, heroSpacer);
    console.log('Main Content Found:', !!mainContent, mainContent);
    console.log('Start Now Button Found:', !!startNowBtn, startNowBtn);
    console.log('----------------------------------');


    // Attach event listener for Close Banner Button
    if (closeBannerBtn && heroSection && heroSpacer && mainContent) {
        closeBannerBtn.addEventListener('click', (event) => {
            console.log("Close banner button clicked!"); // Debugging log
            event.stopPropagation(); // Prevent event bubbling
            heroSection.classList.add('closed');
            heroSpacer.classList.add('closed');

            heroSpacer.addEventListener('transitionend', function handler() {
                heroSpacer.style.display = 'none';
                heroSpacer.removeEventListener('transitionend', handler);
                mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
            heroSection.addEventListener('transitionend', function handler() {
                heroSection.style.display = 'none';
                heroSection.removeEventListener('transitionend', handler);
            });
        });
    } else {
        console.error("Critical elements for close button functionality not found.");
    }

    // Attach event listener for "Start Now" button
    if (startNowBtn && closeBannerBtn) { // Ensure closeBannerBtn is also available to simulate click
        startNowBtn.addEventListener('click', (event) => {
            console.log("Start Now button clicked!"); // Debugging log
            event.stopPropagation(); // Prevent event bubbling
            // Simulate clicking the close button to hide the banner
            closeBannerBtn.click();
        });
    } else {
        console.error("Start Now button or Close Banner button not found. Start Now functionality might be impacted.");
    }


    // Optional: Add scroll behavior for the header to change background on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('bg-[#1F242D]', 'shadow-xl');
            header.classList.remove('bg-opacity-90');
        } else {
            header.classList.remove('bg-[#1F242D]', 'shadow-xl');
            header.classList.add('bg-opacity-90');
        }
    });
});
