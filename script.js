// Product Data
const products = [
    {
        id: 'p-coach',
        name: 'Bolsa Coach Jonie #12345 (Paquete Completo)',
        description: 'Incluye caja, shopping bag, llavero, monedero y certificado.',
        price: 950,
        wholesalePrice: 710,
        wholesaleMin: 5,
        category: 'Paquetes',
        image: 'imagenes/oferta/bolsa coach completa .jpeg',
        isNew: true,
        rating: 5.0,
        reviews: 42
    },
    {
        id: 'p1',
        name: 'Aretes Elegantes',
        description: 'Aretes de diseño clásico, ideales para complementar cualquier look.',
        price: 120,
        wholesalePrice: 85,
        wholesaleMin: 5,
        category: 'Accesorios',
        image: 'imagenes/aretes.jpeg',
        isNew: true,
        rating: 4.8,
        reviews: 24
    },
    {
        id: 'p2',
        name: 'Paquete Bolsa con Complemento',
        description: 'Hermosa bolsa con su complemento ideal para llevar a todas partes.',
        price: 650,
        wholesalePrice: 480,
        wholesaleMin: 5,
        category: 'Paquetes',
        image: 'imagenes/bolsa con complemento.jpeg',
        rating: 4.9,
        reviews: 18
    },
    {
        id: 'p3',
        name: 'Bolsa de Mano Clásica',
        description: 'Bolsa de mano perfecta para eventos de noche o el día a día.',
        price: 450,
        wholesalePrice: 320,
        wholesaleMin: 5,
        category: 'Bolsas',
        image: 'imagenes/bolsa de mano.jpeg',
        rating: 4.7,
        reviews: 32
    },
    {
        id: 'p4',
        name: 'Crema para Cuerpo',
        description: 'Crema hidratante corporal de larga duración con aroma suave.',
        price: 180,
        wholesalePrice: 130,
        wholesaleMin: 5,
        category: 'Cuidado Personal',
        image: 'imagenes/crema para cuerpo.jpeg',
        isNew: true,
        rating: 4.9,
        reviews: 15
    },
    {
        id: 'p5',
        name: 'Crema Facial Hidratante',
        description: 'Fórmula ligera que hidrata el rostro durante todo el día.',
        price: 320,
        wholesalePrice: 240,
        wholesaleMin: 5,
        category: 'Cuidado Personal',
        image: 'imagenes/crema.jpeg',
        rating: 5.0,
        reviews: 10
    },
    {
        id: 'p6',
        name: 'Gel Limpiador',
        description: 'Gel para remover impurezas y dejar la piel fresca.',
        price: 150,
        wholesalePrice: 100,
        wholesaleMin: 5,
        category: 'Cuidado Personal',
        image: 'imagenes/gel .jpeg',
        rating: 4.6,
        reviews: 21
    },
    {
        id: 'p7',
        name: 'Set de Llaveros Especiales',
        description: 'Llaveros decorativos en varios diseños elegantes.',
        price: 90,
        wholesalePrice: 65,
        wholesaleMin: 5,
        category: 'Accesorios',
        image: 'imagenes/llaveros .jpeg',
        rating: 4.8,
        reviews: 14
    },
    {
        id: 'p8',
        name: 'Paquete de Bolsa Velvet',
        description: 'Paquete que te enamorará. Calidad superior y diseño exclusivo.',
        price: 780,
        wholesalePrice: 590,
        wholesaleMin: 5,
        category: 'Paquetes',
        image: 'imagenes/paquete de bolsa completo.jpeg',
        rating: 4.5,
        reviews: 28
    }
];

// App State
let wishlist = [];
let activeCategory = 'Todos';

// DOM Elements
const productGrid = document.getElementById('productGrid');
const wishlistDrawer = document.getElementById('wishlistDrawer');
const wishlistOverlay = document.getElementById('wishlistOverlay');
const wishlistItemsContainer = document.getElementById('wishlistItemsContainer');
const wishlistCount = document.getElementById('wishlistCount');
const wishlistTotal = document.getElementById('wishlistTotal');
const wishlistFooter = document.getElementById('wishlistFooter');
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
                    <button class="overlay-btn" onclick="addToWishlist('${product.id}')">
                        <i data-lucide="heart"></i>
                        Añadir a deseos
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
                    <div class="wholesale-note">Regla: 5pz totales para mayoreo</div>
                    <table class="w-table">
                        <thead>
                            <tr>
                                <th>Tipo</th>
                                <th>Precio Unit.</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Menudeo (< 5 pz)</td>
                                <td>$${product.price.toFixed(2)}</td>
                            </tr>
                            <tr class="highlight">
                                <td>Mayoreo (5+ pz)</td>
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

function addToWishlist(productId) {
    const product = products.find(p => p.id === productId);
    const existing = wishlist.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        wishlist.push({ ...product, quantity: 1 });
    }

    updateWishlistUI();
    toggleWishlist(true);
}

function updateQuantity(productId, delta) {
    const item = wishlist.find(i => i.id === productId);
    if (!item) return;

    item.quantity = Math.max(1, item.quantity + delta);
    updateWishlistUI();
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(i => i.id !== productId);
    updateWishlistUI();
}

function updateWishlistUI() {
    // Update count
    const totalItems = wishlist.reduce((sum, item) => sum + item.quantity, 0);
    wishlistCount.textContent = totalItems;

    // Check wholesale rule (global 5 items)
    const isGlobalWholesale = totalItems >= 5;

    // Update list
    if (wishlist.length === 0) {
        wishlistItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i data-lucide="heart" style="width: 48px; height: 48px; color: var(--primary-light)"></i>
                <p>Tu lista de deseos está vacía</p>
                <button class="btn btn-outline" onclick="toggleWishlist(false)">Seguir explorando</button>
            </div>
        `;
        wishlistFooter.style.display = 'none';
    } else {
        wishlistFooter.style.display = 'block';
        wishlistItemsContainer.innerHTML = wishlist.map(item => {
            const price = isGlobalWholesale ? item.wholesalePrice : item.price;

            return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <div class="cart-item-header">
                            <h4>${item.name}</h4>
                            <button onclick="removeFromWishlist('${item.id}')" class="text-muted">
                                <i data-lucide="x" style="width: 16px;"></i>
                            </button>
                        </div>
                        <div class="wholesale-status">
                            ${isGlobalWholesale
                    ? '<span class="status-active">Precio Mayoreo aplicado (Global)</span>'
                    : `<span class="status-pending">Faltan ${5 - totalItems} pz en total para mayoreo</span>`
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

        const total = wishlist.reduce((sum, item) => {
            const price = isGlobalWholesale ? item.wholesalePrice : item.price;
            return sum + (price * item.quantity);
        }, 0);

        wishlistTotal.textContent = `$${total.toFixed(2)}`;
    }

    if (window.lucide) {
        window.lucide.createIcons();
    }
}

function toggleWishlist(open) {
    if (open) {
        wishlistDrawer.classList.add('active');
        wishlistOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        wishlistDrawer.classList.remove('active');
        wishlistOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function sendToWhatsApp() {
    const totalItems = wishlist.reduce((sum, item) => sum + item.quantity, 0);
    const isGlobalWholesale = totalItems >= 5;

    let message = "¡Hola Velvet Wink! 🌸\n\nMe gustaría solicitar una cotización para los siguientes productos de mi lista de deseos:\n\n";

    wishlist.forEach(item => {
        const price = isGlobalWholesale ? item.wholesalePrice : item.price;
        message += `✅ *${item.name}*\n   Cantidad: ${item.quantity} pz\n   Subtotal: $${(price * item.quantity).toFixed(2)}\n\n`;
    });

    const total = wishlist.reduce((sum, item) => {
        const price = isGlobalWholesale ? item.wholesalePrice : item.price;
        return sum + (price * item.quantity);
    }, 0);

    message += `--------------------------\n`;
    message += `💰 *TOTAL ESTIMADO: $${total.toFixed(2)}*\n`;
    message += `🏷️ *TIPO DE PRECIO:* ${isGlobalWholesale ? 'MAYOREO (5+ pz)' : 'MENUDEO'}\n`;

    if (!isGlobalWholesale) {
        message += `\n_(Nota: Si agrego ${5 - totalItems} pz más, ¡aplico a precio de mayoreo! por eso quiero cotizar)_`;
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/522221957322?text=${encodedMessage}`, '_blank');
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
if (document.getElementById('wishlistBtn')) {
    document.getElementById('wishlistBtn').addEventListener('click', () => toggleWishlist(true));
}
if (document.getElementById('closeWishlist')) {
    document.getElementById('closeWishlist').addEventListener('click', () => toggleWishlist(false));
}
if (wishlistOverlay) {
    wishlistOverlay.addEventListener('click', () => toggleWishlist(false));
}

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
    toggleWishlist(false);
    toggleModal(true);
});

// Carousel Logic
let currentSlide = 0;
const slides = document.querySelectorAll('#offerCarousel .carousel-slide');

function moveCarousel(direction) {
    if (!slides || slides.length === 0) return;

    // Remove active class from current
    slides[currentSlide].classList.remove('current-slide');

    // Calculate next slide index
    currentSlide = (currentSlide + direction + slides.length) % slides.length;

    // Add active class to new slide
    slides[currentSlide].classList.add('current-slide');
}

// Auto-advance carousel every 3.5 seconds
setInterval(() => {
    moveCarousel(1);
}, 3500);

// Fix Lucide icons for carousel buttons
if (document.getElementById('carouselPrevBtn')) {
    document.getElementById('carouselPrevBtn').addEventListener('click', () => moveCarousel(-1));
    document.getElementById('carouselNextBtn').addEventListener('click', () => moveCarousel(1));
}

// Init
renderProducts();
updateWishlistUI();
