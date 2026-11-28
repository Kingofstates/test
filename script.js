// Product Data
const products = [
    {
        id: 1,
        title: "Wireless Noise Cancelling Headphones",
        category: "Electronics",
        price: 299.99,
        rating: 4.5,
        reviews: 3241,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 2,
        title: "Smart Fitness Watch with Heart Rate Monitor",
        category: "Electronics",
        price: 89.99,
        rating: 4.3,
        reviews: 1420,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 3,
        title: "Ergonomic Office Chair with Lumbar Support",
        category: "Home & Kitchen",
        price: 199.50,
        rating: 4.6,
        reviews: 890,
        image: "https://images.unsplash.com/photo-1580481077494-e3299ac25e94?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 4,
        title: "Professional DSLR Camera 4K Video",
        category: "Electronics",
        price: 849.00,
        rating: 4.8,
        reviews: 512,
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 5,
        title: "Casual Men's Cotton Slim Fit Shirt",
        category: "Fashion",
        price: 34.99,
        rating: 4.2,
        reviews: 2100,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 6,
        title: "Stainless Steel Insulated Water Bottle",
        category: "Home & Kitchen",
        price: 24.99,
        rating: 4.7,
        reviews: 4310,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 7,
        title: "Organic Face Serum with Vitamin C & Hyaluronic Acid",
        category: "Beauty",
        price: 29.99,
        rating: 4.4,
        reviews: 930,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 8,
        title: "Minimalist Mechanical Gaming Keyboard",
        category: "Electronics",
        price: 79.99,
        rating: 4.6,
        reviews: 1840,
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60"
    }
];

// Cart State
let cart = [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartBtn = document.getElementById('cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartSubtotal = document.getElementById('cart-subtotal');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const categoryOps = document.querySelectorAll('.panel-ops p');
const checkoutBtn = document.getElementById('checkout-btn');

// Render Products
function renderProducts(productsToRender) {
    productGrid.innerHTML = '';
    if (productsToRender.length === 0) {
        productGrid.innerHTML = '<p style="grid-column: span 4; text-align: center; font-size: 1.2rem; padding: 40px;">No products found.</p>';
        return;
    }

    productsToRender.forEach(product => {
        const box = document.createElement('div');
        box.classList.add('box');
        
        // Generate stars
        let stars = '';
        for (let i = 0; i < 5; i++) {
            if (i < Math.floor(product.rating)) {
                stars += '<i class="fa-solid fa-star"></i>';
            } else if (i < product.rating) {
                stars += '<i class="fa-solid fa-star-half-stroke"></i>';
            } else {
                stars += '<i class="fa-regular fa-star"></i>';
            }
        }

        box.innerHTML = `
            <div class="box-content">
                <h2>${product.title}</h2>
                <div class="box-img" style="background-image: url('${product.image}');"></div>
                <div class="box-price">$${product.price.toFixed(2)}</div>
                <div class="box-rating">
                    ${stars} <span>${product.reviews.toLocaleString()}</span>
                </div>
                <p>Category: ${product.category}</p>
            </div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productGrid.appendChild(box);
    });
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    openCart();
}

// Update Cart UI
function updateCartUI() {
    // Count
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalCount;

    // Items List
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #555; margin-top: 20px;">Your Amazon Cart is empty.</p>';
        cartSubtotal.textContent = '$0.00';
        return;
    }

    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        cartItemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <h4>${item.title}</h4>
                <p>$${item.price.toFixed(2)}</p>
                <div class="cart-item-actions">
                    <button onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">Delete</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItemDiv);
    });

    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
}

// Change Quantity
function changeQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    updateCartUI();
}

// Cart Sidebar Toggles
function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
}

function closeCart() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
}

cartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

// Search Functionality
function handleSearch() {
    const query = searchInput.value.toLowerCase().trim();
    const filtered = products.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query)
    );
    renderProducts(filtered);
}

searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Category Filtering
categoryOps.forEach(op => {
    op.addEventListener('click', () => {
        categoryOps.forEach(el => el.classList.remove('active-op'));
        op.classList.add('active-op');
        const cat = op.getAttribute('data-category');
        if (cat === 'all') {
            renderProducts(products);
        } else {
            const filtered = products.filter(p => p.category === cat);
            renderProducts(filtered);
        }
    });
});

// Checkout
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Thank you for your order! Your purchase was successful.');
    cart = [];
    updateCartUI();
    closeCart();
});

// Initial Render
renderProducts(products);
