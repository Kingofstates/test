document.addEventListener('DOMContentLoaded', () => {
    // Search button click or Enter key action
    const searchInput = document.querySelector('.nav-search-input');
    const searchBtn = document.querySelector('.nav-search-btn');

    const performSearch = () => {
        const query = searchInput.value.trim();
        if (query) {
            alert(`Searching Amazon for: "${query}"`);
        }
    };

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Mobile menu toggle simulation
    const menuToggle = document.getElementById('menuToggle');
    menuToggle.addEventListener('click', () => {
        alert('Amazon Navigation Menu opened!');
    });

    // Back to top smooth scroll
    const backToTopBtn = document.querySelector('.footer-btn');
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Cart interaction
    let cartCount = 0;
    const cartElement = document.querySelector('.cart-count');
    
    // Add interactive click to product links
    const productLinks = document.querySelectorAll('.box-content p a');
    productLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            cartCount++;
            cartElement.textContent = cartCount;
            alert(`Item added to cart! Total items: ${cartCount}`);
        });
    });
});
