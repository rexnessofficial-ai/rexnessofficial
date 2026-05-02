// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navbar = document.getElementById('navbar');
const overlay = document.querySelector('.mobile-overlay');

// Search Functionality (Nike-style)
const searchInput = document.querySelector('.search-input');
const searchClearBtn = document.querySelector('.search-clear-btn');

if (searchInput && searchClearBtn) {
    // Show/hide cancel button based on input
    searchInput.addEventListener('input', () => {
        if (searchInput.value.length > 0) {
            searchClearBtn.style.display = 'block';
        } else {
            searchClearBtn.style.display = 'none';
        }
    });

    // Clear input when CANCEL is clicked
    searchClearBtn.addEventListener('click', () => {
        searchInput.value = '';
        searchClearBtn.style.display = 'none';
        searchInput.focus();
    });

    // Add search functionality - filter products on current page
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const productCards = document.querySelectorAll('.product-card');

        if (searchTerm === '') {
            // Show all products when search is empty
            productCards.forEach(card => {
                card.style.display = 'block';
            });
        } else {
            // Filter products based on search term
            productCards.forEach(card => {
                const productName = card.querySelector('h4')?.textContent.toLowerCase() || '';
                const productDesc = card.querySelector('p')?.textContent.toLowerCase() || '';

                if (productName.includes(searchTerm) || productDesc.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    });

    // Handle Enter key for search
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            // Could redirect to search results page here
            console.log('Search for:', searchInput.value);
        }
    });
}

if (mobileMenuBtn && navbar) {
    mobileMenuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Change icon between bars and times
        const icon = mobileMenuBtn;
        if (navbar.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking overlay
    if (overlay) {
        overlay.addEventListener('click', () => {
            navbar.classList.remove('active');
            overlay.classList.remove('active');
            mobileMenuBtn.classList.remove('fa-times');
            mobileMenuBtn.classList.add('fa-bars');
        });
    }
}

// Additional page interactions
const searchBtn = document.querySelector('.search-btn');
const newsletterForms = document.querySelectorAll('.newsletter-form');

if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', (event) => {
        event.preventDefault();
        if (searchInput.value.trim() !== '') {
            // If there's text, perform search
            searchInput.dispatchEvent(new Event('input'));
        } else {
            // If empty, just focus
            searchInput.focus();
        }
    });
}

// Handle newsletter forms
newsletterForms.forEach(form => {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const messageDiv = form.parentElement.querySelector('#newsletter-message') || form.querySelector('#newsletter-message');
        if (messageDiv) {
            messageDiv.textContent = 'Thanks for subscribing to our crew!';
            messageDiv.style.display = 'block';
        } else {
            alert('Thanks for subscribing to our crew!');
        }
        form.reset();

        // Hide message after 5 seconds
        if (messageDiv) {
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 5000);
        }
    });
});

// Handle add to cart buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.getAttribute('data-product');
        // Simple cart simulation - in a real app, this would update a cart state
        alert(`Added ${product.replace('-', ' ')} to cart!`);
        button.textContent = 'Added!';
        button.disabled = true;
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.disabled = false;
        }, 2000);
    });
});

// Handle wishlist buttons
const wishlistButtons = document.querySelectorAll('.wishlist-btn');
wishlistButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        const icon = button.querySelector('i');
        if (icon.classList.contains('fa-heart-o')) {
            icon.classList.remove('fa-heart-o');
            icon.classList.add('fa-heart');
            button.style.color = 'var(--accent-red)';
        } else {
            icon.classList.remove('fa-heart');
            icon.classList.add('fa-heart-o');
            button.style.color = '';
        }
    });
});

// Mobile menu button accessibility
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            mobileMenuBtn.click();
        }
    });
}

window.addEventListener('scroll', () => {
    document.body.classList.toggle('has-scrolled', window.scrollY > 20);
});