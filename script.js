// Navigation functionality
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Trigger animations for visible elements
    setTimeout(() => {
        animateVisibleElements();
    }, 100);
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
}

// Animation on scroll
function animateVisibleElements() {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            element.classList.add('visible');
        }
    });
}

// Menu filtering functionality
function filterMenu(category) {
    const menuItems = document.querySelectorAll('.menu-item');
    const categoryButtons = document.querySelectorAll('.menu-category');
    
    // Update active category button
    categoryButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.classList.add('bg-white', 'text-amber-700', 'hover:bg-amber-700', 'hover:text-white');
    });
    
    event.target.classList.add('active');
    event.target.classList.remove('bg-white', 'text-amber-700', 'hover:bg-amber-700', 'hover:text-white');
    
    // Filter menu items
    menuItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Booking form functionality
document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate booking process
    setTimeout(() => {
        document.getElementById('booking-modal').classList.remove('hidden');
        document.getElementById('booking-form').reset();
    }, 1000);
});

function closeBookingModal() {
    document.getElementById('booking-modal').classList.add('hidden');
}

// Add to cart functionality
document.addEventListener('click', function(e) {
    if (e.target.textContent === 'Add to Cart') {
        // Simple cart notification
        const originalText = e.target.textContent;
        e.target.textContent = 'Added!';
        e.target.classList.add('bg-green-600');
        e.target.classList.remove('bg-amber-700');
        
        setTimeout(() => {
            e.target.textContent = originalText;
            e.target.classList.remove('bg-green-600');
            e.target.classList.add('bg-amber-700');
        }, 1500);
    }
});

// Set minimum date to today for booking
document.addEventListener('DOMContentLoaded', function() {
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    dateInputs.forEach(input => {
        input.setAttribute('min', today);
    });
    
    // Initial animation
    setTimeout(() => {
        animateVisibleElements();
    }, 500);
});

// Scroll event listener
window.addEventListener('scroll', animateVisibleElements);

// Floating animation for hero elements
document.addEventListener('DOMContentLoaded', function() {
    const floatingElements = document.querySelectorAll('.floating');
    floatingElements.forEach(element => {
        element.style.animationDelay = Math.random() * 2 + 's';
    });
});

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'97f77adaa7137935',t:'MTc1NzkzMjU1My4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();