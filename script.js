document.addEventListener('DOMContentLoaded', () => {
    // Cart state
    let cartCount = 0;
    const cartBadge = document.getElementById('cartBadge');
    const bottomCartBadge = document.getElementById('bottomCartBadge');

    const updateCartCount = (increment = 1) => {
        cartCount += increment;
        cartBadge.textContent = cartCount;
        bottomCartBadge.textContent = cartCount;
        
        // Pulse animation
        cartBadge.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartBadge.style.transform = 'scale(1)';
        }, 200);
    };

    // Add to cart buttons
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.product-card');
            const title = card.getAttribute('data-title');
            updateCartCount(1);
            
            // Toast notification feedback
            showToast(`Added to Cart: ${title}`);
        });
    });

    // Toast Notification Creator
    const showToast = (message) => {
        const existingToast = document.querySelector('.amz-toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = 'amz-toast';
        toast.innerHTML = `<i class="fa-solid fa-check-circle"></i> <span>${message}</span>`;
        document.body.appendChild(toast);

        // Styling inline for robust portability
        toast.style.cssText = `
            position: fixed;
            bottom: 75px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #232f3e;
            color: #fff;
            padding: 10px 18px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
            z-index: 3000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            animation: fadeInOut 2.5s ease forwards;
        `;

        setTimeout(() => {
            toast.remove();
        }, 2500);
    };

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                showToast(`Searching for "${query}"...`);
            }
        }
    });

    // Side Menu Drawer Toggle
    const menuToggle = document.getElementById('menuToggle');
    const bottomMenu = document.getElementById('bottomMenu');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const closeDrawer = document.getElementById('closeDrawer');

    const openMenu = (e) => {
        e.preventDefault();
        drawerOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        drawerOverlay.classList.remove('open');
        document.body.style.overflow = 'auto';
    };

    menuToggle.addEventListener('click', openMenu);
    bottomMenu.addEventListener('click', openMenu);
    closeDrawer.addEventListener('click', closeMenu);
    drawerOverlay.addEventListener('click', (e) => {
        if (e.target === drawerOverlay) closeMenu();
    });

    // Back to top scroll
    const backToTop = document.getElementById('backToTop');
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Explore deals button
    const exploreBtn = document.getElementById('exploreBtn');
    exploreBtn.addEventListener('click', () => {
        window.scrollTo({ top: 400, behavior: 'smooth' });
    });
});

// Keyframes for Toast
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerHTML = `
@keyframes fadeInOut {
    0% { opacity: 0; transform: translate(-50%, 20px); }
    15% { opacity: 1; transform: translate(-50%, 0); }
    85% { opacity: 1; transform: translate(-50%, 0); }
    100% { opacity: 0; transform: translate(-50%, -10px); }
}
`;
document.head.appendChild(styleSheet);
