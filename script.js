// Product Data (Replicated from src/data.ts)
const products = [
    {
        id: 'p1',
        name: 'Base Líquida Luminosa',
        description: 'Base de cobertura media a alta con acabado radiante y natural. Larga duración.',
        price: 350,
        wholesalePrice: 250,
        wholesaleMin: 6,
        category: 'Rostro',
        image: 'https://images.unsplash.com/photo-1631214500115-598fc2cb8d2d?auto=format&fit=crop&q=80&w=800',
        isNew: true,
        rating: 4.8,
        reviews: 24
    },
    {
        id: 'p2',
        name: 'Paleta de Sombras "Sunset"',
        description: '12 tonos cálidos altamente pigmentados, perfectos para looks de día y de noche.',
        price: 480,
        wholesalePrice: 320,
        wholesaleMin: 5,
        category: 'Ojos',
        image: 'https://images.unsplash.com/photo-1512496115851-a408e8cece92?auto=format&fit=crop&q=80&w=800',
        rating: 4.9,
        reviews: 18
    },
    {
        id: 'p3',
        name: 'Labial Mate Velvet',
        description: 'Labial líquido de acabado mate aterciopelado. No reseca los labios.',
        price: 180,
        wholesalePrice: 110,
        wholesaleMin: 10,
        category: 'Labios',
        image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=800',
        rating: 4.7,
        reviews: 32
    },
    {
        id: 'p4',
        name: 'Sérum Hidratante Ácido Hialurónico',
        description: 'Sérum facial para una hidratación profunda y reducción de líneas de expresión.',
        price: 520,
        wholesalePrice: 380,
        wholesaleMin: 4,
        category: 'Skincare',
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800',
        isNew: true,
        rating: 4.9,
        reviews: 15
    },
    {
        id: 'p5',
        name: 'Set de Brochas Profesionales',
        description: 'Set de 10 brochas de cerdas sintéticas ultra suaves con estuche.',
        price: 650,
        wholesalePrice: 450,
        wholesaleMin: 3,
        category: 'Accesorios',
        image: 'https://images.unsplash.com/photo-1596462502278-27bf85033e5a?auto=format&fit=crop&q=80&w=800',
        rating: 5.0,
        reviews: 10
    },
    {
        id: 'p6',
        name: 'Máscara de Pestañas Volumen Extremo',
        description: 'Fórmula a prueba de agua que aporta volumen y longitud sin grumos.',
        price: 220,
        wholesalePrice: 150,
        wholesaleMin: 6,
        category: 'Ojos',
        image: 'https://images.unsplash.com/photo-1631214503851-bc81e2812285?auto=format&fit=crop&q=80&w=800',
        rating: 4.6,
        reviews: 21
    },
    {
        id: 'p7',
        name: 'Rubor en Crema',
        description: 'Rubor de textura suave que se funde con la piel para un aspecto saludable.',
        price: 210,
        wholesalePrice: 140,
        wholesaleMin: 8,
        category: 'Rostro',
        image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=800',
        rating: 4.8,
        reviews: 14
    },
    {
        id: 'p8',
        name: 'Gloss Labial Brillo 3D',
        description: 'Brillo labial no pegajoso con efecto volumen y destellos sutiles.',
        price: 160,
        wholesalePrice: 95,
        wholesaleMin: 12,
        category: 'Labios',
        image: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=800',
        rating: 4.5,
        reviews: 28
    }
];

// App State
let cart = [];
let activeCategory = 'Todos';

// DOM Elements
const productGrid = document.getElementById('productGrid');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const cartFooter = document.getElementById('cartFooter');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const categoryFilters = document.getElementById('categoryFilters');
const shippingModal = document.getElementById('shippingModal');
const modalOverlay = document.getElementById('modalOverlay');

// Functions
function renderProducts() {
    const filtered = activeCategory === 'Todos' 
        ? products 
        : products.filter(p => p.category === activeCategory);

    productGrid.innerHTML = filtered.map(product => `
        <div class="product-card">
            ${product.isNew ? '<span class="new-badge">Nuevo</span>' : ''}
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="add-to-cart-overlay">
                    <button class="overlay-btn" onclick="addToCart('${product.id}')">
                        <i data-lucide="shopping-bag"></i>
                        Agregar al carrito
                    </button>
                </div>
            </div>
            <div class="product-info">
                <p class="product-category">${product.category}</p>
                <h3>${product.name}</h3>
                <div class="rating">
                    <i data-lucide="star"></i>
                    <i data-lucide="star"></i>
                    <i data-lucide="star"></i>
                    <i data-lucide="star"></i>
                    <i data-lucide="star"></i>
                    <span class="rating-text">${product.rating} (${product.reviews})</span>
                </div>
                <div class="price-box">
                    <div class="retail-price">
                        <p class="amount">$${product.price.toFixed(2)}</p>
                        <p class="price-label">Menudeo</p>
                    </div>
                </div>
                
                <!-- Wholesale Table Table -->
                <div class="wholesale-table-container">
                    <table class="w-table">
                        <thead>
                            <tr>
                                <th>Cantidad</th>
                                <th>Precio Unit.</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1 - ${product.wholesaleMin - 1} pz</td>
                                <td>$${product.price.toFixed(2)}</td>
                            </tr>
                            <tr class="highlight">
                                <td>${product.wholesaleMin}+ pz</td>
                                <td>$${product.wholesalePrice.toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `).join('');
    
    // Re-initialize icons for new elements
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    toggleCart(true);
}

function updateQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity = Math.max(1, item.quantity + delta);
    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    // Update count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Update list
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i data-lucide="shopping-bag" style="width: 48px; height: 48px; color: var(--primary-light)"></i>
                <p>Tu carrito está vacío</p>
                <button class="btn btn-outline" onclick="toggleCart(false)">Seguir comprando</button>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        cartFooter.style.display = 'block';
        cartItemsContainer.innerHTML = cart.map(item => {
            const isWholesale = item.quantity >= item.wholesaleMin;
            const price = isWholesale ? item.wholesalePrice : item.price;
            
            return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <div class="cart-item-header">
                            <h4>${item.name}</h4>
                            <button onclick="removeFromCart('${item.id}')" class="text-muted">
                                <i data-lucide="x" style="width: 16px;"></i>
                            </button>
                        </div>
                        <div class="wholesale-status">
                            ${isWholesale 
                                ? '<span class="status-active">Precio Mayoreo aplicado</span>' 
                                : `<span class="status-pending">Faltan ${item.wholesaleMin - item.quantity} pz para mayoreo</span>`
                            }
                        </div>
                        <div class="cart-item-controls">
                            <div class="quantity-picker">
                                <button onclick="updateQuantity('${item.id}', -1)">-</button>
                                <span>${item.quantity}</span>
                                <button onclick="updateQuantity('${item.id}', 1)">+</button>
                            </div>
                            <p class="font-bold">$${(price * item.quantity).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        const total = cart.reduce((sum, item) => {
            const price = item.quantity >= item.wholesaleMin ? item.wholesalePrice : item.price;
            return sum + (price * item.quantity);
        }, 0);
        
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function toggleCart(open) {
    if (open) {
        cartDrawer.classList.add('active');
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        cartDrawer.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function toggleModal(open) {
    if (open) {
        shippingModal.classList.add('active');
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        shippingModal.classList.remove('active');
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Event Listeners
document.getElementById('cartBtn').addEventListener('click', () => toggleCart(true));
document.getElementById('closeCart').addEventListener('click', () => toggleCart(false));
cartOverlay.addEventListener('click', () => toggleCart(false));

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

categoryFilters.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        activeCategory = e.target.dataset.category;
        renderProducts();
    }
});

document.getElementById('openShippingInfo').addEventListener('click', () => toggleModal(true));
document.getElementById('closeModal').addEventListener('click', () => toggleModal(false));
modalOverlay.addEventListener('click', () => toggleModal(false));
document.getElementById('footerShippingBtn').addEventListener('click', () => {
    toggleCart(false);
    toggleModal(true);
});

// Init
renderProducts();
updateCartUI();
