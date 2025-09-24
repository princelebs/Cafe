// Global state
let cart = [];
let currentUser = null;
let orders = JSON.parse(localStorage.getItem('peretoOrders')) || [];

// Page navigation
function showPage(pageId) {
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Hide mobile menu
    document.getElementById('mobile-menu-dropdown').classList.add('hidden');
    
    // Show selected page
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    
    // Add animation
    document.getElementById(pageId).classList.add('fade-in');
    setTimeout(() => {
        document.getElementById(pageId).classList.remove('fade-in');
    }, 800);
}

// Mobile menu toggle
function toggleMobileMenu() {
    const dropdown = document.getElementById('mobile-menu-dropdown');
    dropdown.classList.toggle('hidden');
}

// Cart functionality
function addToCart(itemName, price) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: itemName, price: price, quantity: 1 });
    }
    updateCartDisplay();
    
    // Show success animation
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Added!';
    button.classList.add('bg-green-600', 'from-green-600', 'to-green-700');
    setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('bg-green-600', 'from-green-600', 'to-green-700');
    }, 1000);
}

function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';

    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="text-center py-12"><div class="text-6xl mb-4">🛒</div><p class="text-gray-500 text-lg">Your cart is empty</p><p class="text-gray-400 text-sm mt-2">Add some delicious items from our menu!</p></div>';
        cartTotal.textContent = '$0.00';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="flex justify-between items-center p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100 hover-lift">
            <div class="flex-1">
                <h4 class="font-semibold text-gray-900">${item.name}</h4>
                <p class="text-gray-600">$${item.price.toFixed(2)} × ${item.quantity}</p>
            </div>
            <div class="flex items-center space-x-3">
                <span class="font-bold text-lg gradient-text">$${(item.price * item.quantity).toFixed(2)}</span>
                <button onclick="removeFromCart('${item.name}')" class="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function showCart() {
    document.getElementById('cart-modal').classList.add('active');
}

function closeCart() {
    document.getElementById('cart-modal').classList.remove('active');
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    closeCart();
    showLogin();
}

// Authentication
function showLogin() {
    document.getElementById('login-modal').classList.add('active');
}

function closeLogin() {
    document.getElementById('login-modal').classList.remove('active');
}

function showRegister() {
    closeLogin();
    document.getElementById('register-modal').classList.add('active');
}

function closeRegister() {
    document.getElementById('register-modal').classList.remove('active');
}

// Form handlers
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Simulate login (in real app, this would be an API call)
    currentUser = { email: email, name: email.split('@')[0] };
    completeOrder();
});

document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const firstName = e.target.querySelector('input[type="text"]').value;
    
    // Simulate registration (in real app, this would be an API call)
    currentUser = { email: email, name: firstName };
    completeOrder();
});

document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate booking submission
    const bookingData = {
        firstName: e.target.querySelector('input[type="text"]').value,
        email: e.target.querySelector('input[type="email"]').value,
        date: e.target.querySelector('input[type="date"]').value,
        time: e.target.querySelector('select').value,
        guests: e.target.querySelectorAll('select')[1].value,
        timestamp: new Date().toISOString()
    };
    
    // Save booking (simulate backend)
    let bookings = JSON.parse(localStorage.getItem('peretoBookings')) || [];
    bookings.push(bookingData);
    localStorage.setItem('peretoBookings', JSON.stringify(bookings));
    
    // Show success message with animation
    const button = e.target.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="flex items-center justify-center"><svg class="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>Processing...</span>';
    
    setTimeout(() => {
        button.innerHTML = '<span class="flex items-center justify-center"><svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>Booking Confirmed!</span>';
        button.classList.add('from-green-600', 'to-green-700');
        
        setTimeout(() => {
            alert('Table booked successfully! We look forward to seeing you at Pereto Cafe.');
            e.target.reset();
            button.innerHTML = originalText;
            button.classList.remove('from-green-600', 'to-green-700');
        }, 2000);
    }, 1000);
});

function completeOrder() {
    if (!currentUser || cart.length === 0) return;
    
    const order = {
        id: Date.now(),
        user: currentUser,
        items: [...cart],
        total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        timestamp: new Date().toISOString(),
        status: 'confirmed'
    };
    
    // Save order (simulate backend)
    orders.push(order);
    localStorage.setItem('peretoOrders', JSON.stringify(orders));
    
    // Clear cart and close modals
    cart = [];
    updateCartDisplay();
    closeLogin();
    closeRegister();
    
    // Show success message
    alert(`🎉 Order confirmed! Thank you ${currentUser.name}. Your order total is $${order.total.toFixed(2)}. We'll have it ready for you soon!`);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
    
    // Set minimum date for booking to today
    const dateInput = document.querySelector('input[type="date"]');
    if (dateInput) {
        dateInput.min = new Date().toISOString().split('T')[0];
    }
});

// Close modals when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// Handle image loading errors
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            // Create a fallback div with gradient background
            const fallback = document.createElement('div');
            fallback.className = 'menu-item-image mb-4 bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center text-4xl';
            fallback.innerHTML = '🍽️';
            this.parentNode.insertBefore(fallback, this);
        });
    });
});

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9837365760d431b1',t:'MTc1ODYwMDgzNi4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();