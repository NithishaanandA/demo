/**
 * ASTAH BOUTIQUE — TIRUPPUR, TAMIL NADU (ESTD. 2011)
 * Official Instagram: @astah_boutique_tirupur • WhatsApp: +91 90920 91676
 * High-Converting E-Commerce Application with WhatsApp Checkout,
 * Clear & Universal Shopping Language, and Mobile-First Architecture.
 */

(() => {
  'use strict';

  // =========================================================================
  // 1. STORE STATE & DATA
  // =========================================================================
  const state = {
    currency: 'INR',
    currencyRates: {
      INR: { symbol: '₹', rate: 1.0, label: 'INR' },
      USD: { symbol: '$', rate: 0.012, label: 'USD' },
      EUR: { symbol: '€', rate: 0.011, label: 'EUR' },
      GBP: { symbol: '£', rate: 0.0095, label: 'GBP' }
    },
    freeShippingThresholdINR: 2000,
    activeCategory: 'all',
    cart: JSON.parse(localStorage.getItem('astah_cart') || '[]'),
    wishlist: JSON.parse(localStorage.getItem('astah_wishlist') || '[]'),
    promoCode: null,
    promoDiscountRate: 0
  };

  // Real Astah Boutique Catalog (Tiruppur, Tamil Nadu)
  const products = [
    {
      id: 1,
      title: "Bridal Hand Aari Work Blouse",
      category: "blouses",
      categoryLabel: "Bridal Blouse",
      priceINR: 3800,
      badge: "Bestseller",
      imgPrimary: "assets/images/collections/aari-work-blouse.jpg",
      imgSecondary: "assets/images/boutique/embroidery-macro.jpg",
      desc: "Heavy bridal Maggam & Aari embroidery with gold zari thread, pearls, and cut-work sleeves. Tailored to your exact bust size.",
      sizes: ["32", "34", "36", "38", "40", "Custom Size"],
      colors: [
        { name: "Bridal Maroon", hex: "#7a1622" },
        { name: "Rani Pink", hex: "#d11d6b" },
        { name: "Peacock Green", hex: "#165b4c" }
      ],
      details: {
        fabric: "Pure Raw Silk with Soft Cotton Inner Lining",
        embroidery: "Handcrafted Aari Needlework with Zari & Pearls",
        origin: "Astah Boutique In-House Workshop, Tiruppur"
      }
    },
    {
      id: 2,
      title: "Pure Kanjeevaram Bridal Silk Saree",
      category: "sarees",
      categoryLabel: "Silk Saree",
      priceINR: 9500,
      badge: "Wedding Special",
      imgPrimary: "assets/images/collections/kanjeevaram-bridal.jpg",
      imgSecondary: "assets/images/collections/artisanal-saree.jpg",
      desc: "Traditional handloom pure silk saree with heavy golden zari pallu and rich contrast temple border. Comes with matching blouse piece.",
      sizes: ["Standard Saree (6.3 Meters with Blouse)"],
      colors: [
        { name: "Crimson Red & Gold", hex: "#a81d28" },
        { name: "Mustard Yellow & Maroon", hex: "#d99b26" }
      ],
      details: {
        fabric: "100% Pure Handloom Mulberry Silk",
        embroidery: "Traditional Woven Golden Zari Motifs",
        origin: "Handwoven Silk Heritage Collection"
      }
    },
    {
      id: 3,
      title: "Royal Velvet Bridal Lehenga Set",
      category: "lehengas",
      categoryLabel: "Designer Lehenga",
      priceINR: 14500,
      badge: "15-Year Signature",
      imgPrimary: "assets/images/collections/bridal-couture.jpg",
      imgSecondary: "assets/images/collections/cocktail-lehenga.jpg",
      desc: "Heavy flared micro-velvet lehenga with intricate floral zardozi embroidery. Includes custom padded blouse and net dupatta.",
      sizes: ["XS", "S", "M", "L", "XL", "Custom Stitching"],
      colors: [
        { name: "Royal Wine", hex: "#521424" },
        { name: "Emerald Green", hex: "#11382b" }
      ],
      details: {
        fabric: "Micro Velvet with Cancan Flared Underskirt",
        embroidery: "Hand Zardozi with Sequins and Threadwork",
        origin: "Custom Made by Astah Boutique Master Tailor"
      }
    },
    {
      id: 4,
      title: "Artisanal Designer Festive Saree",
      category: "sarees",
      categoryLabel: "Festive Saree",
      priceINR: 4200,
      badge: "Fast Selling",
      imgPrimary: "assets/images/collections/artisanal-saree.jpg",
      imgSecondary: "assets/images/collections/kanjeevaram-bridal.jpg",
      desc: "Lightweight, easy-to-drape designer saree with scalloped hand-work border and modern floral accents. Ideal for receptions and festivals.",
      sizes: ["Standard Saree (6.3 Meters)"],
      colors: [
        { name: "Champagne Beige", hex: "#d8c4a5" },
        { name: "Rose Gold", hex: "#c98d83" }
      ],
      details: {
        fabric: "Semi-Organza Silk Blend",
        embroidery: "Scallop Cutwork with Pearl Beading",
        origin: "Tiruppur Boutique Studio"
      }
    },
    {
      id: 5,
      title: "Party Wear Sequin Cocktail Lehenga",
      category: "lehengas",
      categoryLabel: "Party Lehenga",
      priceINR: 8900,
      badge: "Trending Look",
      imgPrimary: "assets/images/collections/cocktail-lehenga.jpg",
      imgSecondary: "assets/images/collections/bridal-couture.jpg",
      desc: "Glittering metallic sequin lehenga paired with a modern sweetheart-neck blouse and sheer cape dupatta. Perfect for evening sangeet.",
      sizes: ["S", "M", "L", "XL", "Custom Size"],
      colors: [
        { name: "Midnight Navy", hex: "#182238" },
        { name: "Glimmer Silver", hex: "#a8b0b8" }
      ],
      details: {
        fabric: "Georgette with High-Density Sequins",
        embroidery: "All-Over Mirror & Sequin Work",
        origin: "Astah Boutique Party Collection"
      }
    },
    {
      id: 6,
      title: "Royal Floor-Length Anarkali Silk Suit",
      category: "anarkali",
      categoryLabel: "Anarkali Suit",
      priceINR: 5600,
      badge: "Festive Pick",
      imgPrimary: "assets/images/collections/royal-anarkali.jpg",
      imgSecondary: "assets/images/collections/indo-western.jpg",
      desc: "Full-flare 56-kalidar silk Anarkali gown with hand-embroidered yoke and heavy border. Comes with matching pant and dupatta.",
      sizes: ["34 (XS)", "36 (S)", "38 (M)", "40 (L)", "42 (XL)", "Custom"],
      colors: [
        { name: "Deep Ruby", hex: "#851825" },
        { name: "Teal Blue", hex: "#154c59" }
      ],
      details: {
        fabric: "Pure Chanderi Silk with Shantoon Lining",
        embroidery: "Gotapatti & Hand Zari Neckline",
        origin: "Tiruppur Tailoring Studio"
      }
    },
    {
      id: 7,
      title: "Indo-Western Crop Top & Skirt Set",
      category: "anarkali",
      categoryLabel: "Indo-Western",
      priceINR: 4800,
      badge: "Modern Fit",
      imgPrimary: "assets/images/collections/indo-western.jpg",
      imgSecondary: "assets/images/collections/royal-anarkali.jpg",
      desc: "Contemporary designer crop top with draped palazzo-skirt and shrug jacket. Comfortable, chic, and lightweight.",
      sizes: ["S", "M", "L", "XL"],
      colors: [
        { name: "Rust Terracotta", hex: "#9e472a" },
        { name: "Olive Green", hex: "#4c5c37" }
      ],
      details: {
        fabric: "Modal Satin with Foil Print Accents",
        embroidery: "Delicate Mirror & Thread Detailing",
        origin: "Astah Boutique Modern Line"
      }
    },
    {
      id: 8,
      title: "Custom Bridal Blouse with Latkan Work",
      category: "blouses",
      categoryLabel: "Bridal Blouse",
      priceINR: 2900,
      badge: "Custom Stitching",
      imgPrimary: "assets/images/collections/bespoke-blouse.jpg",
      imgSecondary: "assets/images/collections/aari-work-blouse.jpg",
      desc: "Classic back-open boat neck blouse with handcrafted fabric latkans and subtle neckline threadwork. Guaranteed zero-shoulder-drop fit.",
      sizes: ["32", "34", "36", "38", "40", "Custom Measurement"],
      colors: [
        { name: "Golden Yellow", hex: "#d9a425" },
        { name: "Bottle Green", hex: "#173b28" }
      ],
      details: {
        fabric: "Brocade Silk with Double-Layered Lining",
        embroidery: "Handmade Piping with Designer Latkans",
        origin: "Astah Boutique 15-Year Master Tailoring"
      }
    }
  ];

  // Local Customer Proof Notifications
  const socialFeed = [
    { name: "Kavitha S.", location: "Dharapuram Road, Tiruppur", product: "Bridal Hand Aari Work Blouse", img: products[0].imgPrimary, time: "3 mins ago" },
    { name: "Deepa M.", location: "RS Puram, Coimbatore", product: "Pure Kanjeevaram Bridal Silk Saree", img: products[1].imgPrimary, time: "8 mins ago" },
    { name: "Ananya R.", location: "Anna Nagar, Chennai", product: "Royal Velvet Bridal Lehenga Set", img: products[2].imgPrimary, time: "15 mins ago" },
    { name: "Sangeetha P.", location: "Perundurai, Erode", product: "Party Wear Sequin Cocktail Lehenga", img: products[4].imgPrimary, time: "24 mins ago" },
    { name: "Meera K.", location: "Sunnyvale, California (NRI Order)", product: "Royal Floor-Length Anarkali Suit", img: products[5].imgPrimary, time: "38 mins ago" }
  ];

  // =========================================================================
  // 2. CURRENCY FORMATTING
  // =========================================================================
  function formatMoney(amountINR) {
    const cur = state.currencyRates[state.currency] || state.currencyRates.INR;
    const converted = amountINR * cur.rate;

    if (state.currency === 'INR') {
      return `₹${Math.round(converted).toLocaleString('en-IN')}`;
    }
    return `${cur.symbol}${Math.round(converted).toLocaleString()}`;
  }

  function saveCart() {
    localStorage.setItem('astah_cart', JSON.stringify(state.cart));
    updateCartUI();
  }

  function saveWishlist() {
    localStorage.setItem('astah_wishlist', JSON.stringify(state.wishlist));
    updateWishlistUI();
  }

  // =========================================================================
  // 3. DESKTOP CURSOR FOLLOWER
  // =========================================================================
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    if (cursorRing) {
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    }
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  function initCursorHoverListeners() {
    const hoverTargets = document.querySelectorAll('a, button, .about-card, .product-card, .reel-card, input, select');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing?.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursorRing?.classList.remove('cursor-hover'));
    });
  }

  // =========================================================================
  // 4. MAGNETIC BUTTONS (DESKTOP)
  // =========================================================================
  function initMagneticElements() {
    if (window.innerWidth < 869) return;
    const magnetics = document.querySelectorAll('.magnetic');
    magnetics.forEach(btn => {
      const strength = parseFloat(btn.getAttribute('data-strength')) || 16;
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const deltaX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const deltaY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        btn.style.transform = `translate3d(${deltaX * strength}px, ${deltaY * strength}px, 0)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = `translate3d(0, 0, 0)`;
      });
    });
  }

  // =========================================================================
  // 5. 3D TILT CARDS
  // =========================================================================
  function init3DTiltCards() {
    if (window.innerWidth < 869) return;
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
        const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
        card.style.setProperty('--glare-x', `${(x / rect.width) * 100}%`);
        card.style.setProperty('--glare-y', `${(y / rect.height) * 100}%`);
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  // =========================================================================
  // 6. SPOTLIGHT GLOW EFFECT (PRODUCT CARDS)
  // =========================================================================
  function attachSpotlightListeners(cardElement) {
    cardElement.addEventListener('mousemove', (e) => {
      const rect = cardElement.getBoundingClientRect();
      cardElement.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      cardElement.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    });
  }

  // =========================================================================
  // 7. PRODUCT CATALOG RENDERING & FILTERING
  // =========================================================================
  const productGrid = document.getElementById('productGrid');

  function renderProducts() {
    if (!productGrid) return;
    productGrid.innerHTML = '';

    const filtered = state.activeCategory === 'all'
      ? products
      : (state.activeCategory === 'wishlist'
          ? products.filter(p => state.wishlist.includes(p.id))
          : products.filter(p => p.category === state.activeCategory));

    if (filtered.length === 0) {
      const emptyDiv = document.createElement('div');
      emptyDiv.style.gridColumn = '1 / -1';
      emptyDiv.style.textAlign = 'center';
      emptyDiv.style.padding = '3.5rem 1rem';
      emptyDiv.innerHTML = `
        <div style="font-size: 2.5rem; margin-bottom: 0.8rem;">❤️</div>
        <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem; color: var(--text-primary);">Your Wishlist is Empty</h3>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 0.95rem;">Tap the heart icon on any bridal outfit to save your favorite designs here.</p>
        <button class="btn btn-primary" id="resetToAllBtn" style="padding: 10px 24px;">EXPLORE ALL OUTFITS</button>
      `;
      productGrid.appendChild(emptyDiv);
      document.getElementById('resetToAllBtn')?.addEventListener('click', () => {
        const allPill = document.querySelector('.filter-pill[data-category="all"]');
        if (allPill) allPill.click();
      });
      return;
    }

    filtered.forEach(p => {
      const isWishlisted = state.wishlist.includes(p.id);
      const card = document.createElement('article');
      card.className = 'product-card';
      card.dataset.id = p.id;

      card.innerHTML = `
        <div class="card-media">
          <img src="${p.imgPrimary}" alt="${p.title}" class="product-img-primary" loading="lazy">
          <img src="${p.imgSecondary}" alt="${p.title} detail view" class="product-img-secondary" loading="lazy">
          
          <div class="card-badges">
            <span class="product-badge">${p.badge}</span>
          </div>

          <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" data-wishlist-id="${p.id}" aria-label="Save to Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>

          <div class="card-quick-actions">
            <button class="quick-view-btn" data-quickview-id="${p.id}">QUICK VIEW DETAILS</button>
          </div>
        </div>

        <div class="card-info">
          <span class="card-category">${p.categoryLabel}</span>
          <h3 class="card-title">${p.title}</h3>
          <p class="card-desc">${p.desc}</p>

          <!-- Size Selector -->
          <div class="size-selector-row">
            ${p.sizes.map((sz, idx) => `
              <span class="size-pill ${idx === 0 ? 'selected' : ''}" data-size="${sz}">${sz}</span>
            `).join('')}
          </div>

          <div class="card-bottom-bar">
            <span class="card-price" data-price-inr="${p.priceINR}">${formatMoney(p.priceINR)}</span>
            <button class="add-bag-btn magnetic" data-add-cart="${p.id}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>ADD TO CART</span>
            </button>
          </div>
        </div>
      `;

      attachSpotlightListeners(card);

      // Size selection
      const sizePills = card.querySelectorAll('.size-pill');
      sizePills.forEach(pill => {
        pill.addEventListener('click', () => {
          sizePills.forEach(sp => sp.classList.remove('selected'));
          pill.classList.add('selected');
        });
      });

      // Quick View
      card.querySelector('[data-quickview-id]').addEventListener('click', () => {
        openQuickView(p.id);
      });

      // Add to Cart
      const addBtn = card.querySelector('[data-add-cart]');
      addBtn.addEventListener('click', () => {
        const selectedSize = card.querySelector('.size-pill.selected')?.dataset.size || p.sizes[0];
        const selectedColor = p.colors[0].name;
        addToCart(p.id, selectedSize, selectedColor);

        addBtn.classList.add('added');
        addBtn.innerHTML = `<span>ADDED ✓</span>`;
        setTimeout(() => {
          addBtn.classList.remove('added');
          addBtn.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>ADD TO CART</span>
          `;
        }, 1200);
      });

      // Wishlist toggle
      const wishBtn = card.querySelector('.wishlist-btn');
      wishBtn.addEventListener('click', () => {
        toggleWishlist(p.id, wishBtn);
      });

      productGrid.appendChild(card);
    });

    initMagneticElements();
    initCursorHoverListeners();
  }

  // Category Filter Pill Handling
  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(btn => {
    btn.addEventListener('click', () => {
      filterPills.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeCategory = btn.dataset.category;
      renderProducts();
    });
  });

  // =========================================================================
  // 8. CART & BAG ENGINE (SLIDE-OVER MINI CART)
  // =========================================================================
  const cartDrawer = document.getElementById('cartDrawer');
  const cartBackdrop = document.getElementById('cartBackdrop');
  const cartTrigger = document.getElementById('cartTrigger');
  const mobileCartBarBtn = document.getElementById('mobileCartBarBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartItemsContainer = document.getElementById('cartItemsContainer');
  const cartCountBadges = [
    document.getElementById('cartCount'),
    document.getElementById('drawerCartCount'),
    document.getElementById('mobileBarCartCount')
  ];
  const shippingTierMsg = document.getElementById('shippingTierMsg');
  const shippingPercent = document.getElementById('shippingPercent');
  const tierProgressFill = document.getElementById('tierProgressFill');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartDiscountEl = document.getElementById('cartDiscount');
  const discountRow = document.getElementById('discountRow');
  const cartTotalEl = document.getElementById('cartTotal');

  function openCart() {
    cartDrawer?.classList.add('active');
    cartBackdrop?.classList.add('active');
    cartDrawer?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer?.classList.remove('active');
    cartBackdrop?.classList.remove('active');
    cartDrawer?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  cartTrigger?.addEventListener('click', openCart);
  mobileCartBarBtn?.addEventListener('click', openCart);
  closeCartBtn?.addEventListener('click', closeCart);
  cartBackdrop?.addEventListener('click', closeCart);

  function addToCart(productId, size, color) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = state.cart.findIndex(item => 
      item.id === productId && item.size === size
    );

    if (existingIndex > -1) {
      state.cart[existingIndex].qty += 1;
    } else {
      state.cart.push({
        id: product.id,
        title: product.title,
        priceINR: product.priceINR,
        img: product.imgPrimary,
        size: size || product.sizes[0],
        color: color || product.colors[0].name,
        qty: 1
      });
    }

    saveCart();
    openCart();
  }

  function updateCartUI() {
    const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotalINR = state.cart.reduce((sum, item) => sum + (item.priceINR * item.qty), 0);

    // Update Badges
    cartCountBadges.forEach(b => {
      if (b) b.textContent = totalItems;
    });
    const drawerCounter = document.getElementById('drawerCartCount');
    if (drawerCounter) drawerCounter.textContent = `${totalItems} ${totalItems === 1 ? 'ITEM' : 'ITEMS'}`;

    // Free Delivery Threshold (₹2,000)
    const remainingToFree = Math.max(0, state.freeShippingThresholdINR - subtotalINR);
    const progressPercent = Math.min(100, Math.round((subtotalINR / state.freeShippingThresholdINR) * 100));

    if (tierProgressFill) tierProgressFill.style.width = `${progressPercent}%`;
    if (shippingPercent) shippingPercent.textContent = `${progressPercent}%`;

    if (shippingTierMsg) {
      if (remainingToFree === 0 && subtotalINR > 0) {
        shippingTierMsg.innerHTML = `🎉 <strong>You've unlocked FREE Delivery Across India!</strong>`;
      } else {
        shippingTierMsg.innerHTML = `Add ${formatMoney(remainingToFree)} more for <strong>FREE Delivery Across India</strong>`;
      }
    }

    // Render Cart Items
    if (!cartItemsContainer) return;

    if (state.cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <h4 class="cart-empty-title">Your Cart is Empty</h4>
          <p style="font-size: 0.85rem; color: var(--text-secondary);">Browse our bridal blouses and silk sarees.</p>
        </div>
      `;
    } else {
      cartItemsContainer.innerHTML = state.cart.map((item, index) => `
        <div class="cart-item">
          <img src="${item.img}" alt="${item.title}" class="cart-item-img">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.title}</h4>
            <div class="cart-item-meta">Size: ${item.size}</div>
            <div class="cart-item-price">${formatMoney(item.priceINR * item.qty)}</div>
            
            <div class="qty-control">
              <button class="qty-btn" data-qty-dec="${index}">−</button>
              <span class="qty-num">${item.qty}</span>
              <button class="qty-btn" data-qty-inc="${index}">+</button>
            </div>
          </div>
          <button class="cart-item-remove" data-cart-remove="${index}" aria-label="Remove item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      `).join('');

      cartItemsContainer.querySelectorAll('[data-qty-inc]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.qtyInc);
          state.cart[idx].qty += 1;
          saveCart();
        });
      });

      cartItemsContainer.querySelectorAll('[data-qty-dec]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.qtyDec);
          if (state.cart[idx].qty > 1) {
            state.cart[idx].qty -= 1;
          } else {
            state.cart.splice(idx, 1);
          }
          saveCart();
        });
      });

      cartItemsContainer.querySelectorAll('[data-cart-remove]').forEach(btn => {
        btn.addEventListener('click', () => {
          const idx = parseInt(btn.dataset.cartRemove);
          state.cart.splice(idx, 1);
          saveCart();
        });
      });
    }

    const discountAmountINR = subtotalINR * state.promoDiscountRate;
    const finalTotalINR = Math.max(0, subtotalINR - discountAmountINR);

    if (cartSubtotalEl) cartSubtotalEl.textContent = formatMoney(subtotalINR);
    if (cartTotalEl) cartTotalEl.textContent = formatMoney(finalTotalINR);

    const cartShippingEl = document.getElementById('cartShipping');
    if (cartShippingEl) {
      if (subtotalINR >= 2000) {
        cartShippingEl.innerHTML = `<span style="color: #10B981; font-weight: 700;">FREE (Qualified ✓)</span>`;
      } else if (subtotalINR > 0) {
        const remaining = 2000 - subtotalINR;
        cartShippingEl.textContent = `Add ${formatMoney(remaining)} for FREE Delivery`;
      } else {
        cartShippingEl.textContent = 'FREE Delivery above ₹2,000';
      }
    }

    if (state.promoDiscountRate > 0 && discountRow) {
      discountRow.style.display = 'flex';
      if (cartDiscountEl) cartDiscountEl.textContent = `-${formatMoney(discountAmountINR)}`;
    } else if (discountRow) {
      discountRow.style.display = 'none';
    }
  }

  // Promo Code
  const promoInput = document.getElementById('promoInput');
  const applyPromoBtn = document.getElementById('applyPromoBtn');
  const promoTag = document.getElementById('promoTag');
  const removePromoBtn = document.getElementById('removePromoBtn');

  applyPromoBtn?.addEventListener('click', () => {
    const code = promoInput?.value.trim().toUpperCase();
    if (code === 'ASTAH10' || code === 'TIRUPPUR10' || code === 'FESTIVE10') {
      state.promoCode = code;
      state.promoDiscountRate = 0.10;
      if (promoTag) promoTag.style.display = 'flex';
      if (promoInput) promoInput.value = '';
      saveCart();
    } else {
      alert("Invalid code. Try using 'ASTAH10' for 10% discount!");
    }
  });

  removePromoBtn?.addEventListener('click', () => {
    state.promoCode = null;
    state.promoDiscountRate = 0;
    if (promoTag) promoTag.style.display = 'none';
    saveCart();
  });

  // =========================================================================
  // 9. WHATSAPP DIRECT ORDER (AUTHENTIC NUMBER: +91 90920 91676)
  // =========================================================================
  const whatsappCheckoutBtn = document.getElementById('whatsappCheckoutBtn');
  whatsappCheckoutBtn?.addEventListener('click', () => {
    if (state.cart.length === 0) {
      alert("Your cart is empty. Please select an outfit from our shop!");
      return;
    }

    const subtotalINR = state.cart.reduce((sum, i) => sum + (i.priceINR * i.qty), 0);
    const discountINR = subtotalINR * state.promoDiscountRate;
    const totalINR = subtotalINR - discountINR;

    let orderMsg = `*ASTAH BOUTIQUE (TIRUPPUR) — NEW ORDER*\n`;
    orderMsg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    orderMsg += `*Order Ref:* #ASTAH-${Math.floor(100000 + Math.random() * 900000)}\n\n`;
    orderMsg += `*ITEMS ORDERED:*\n`;

    state.cart.forEach((item, i) => {
      orderMsg += `${i + 1}. *${item.title}*\n`;
      orderMsg += `   • Size: ${item.size}\n`;
      orderMsg += `   • Quantity: ${item.qty} × ${formatMoney(item.priceINR)}\n\n`;
    });

    orderMsg += `━━━━━━━━━━━━━━━━━━━━━━\n`;
    orderMsg += `*Subtotal:* ${formatMoney(subtotalINR)}\n`;
    if (state.promoDiscountRate > 0) {
      orderMsg += `*Discount (10%):* -${formatMoney(discountINR)}\n`;
    }
    orderMsg += `*Total Amount:* ${formatMoney(totalINR)}\n\n`;
    orderMsg += `Hello Astah Boutique team, please confirm availability and let me know the payment details and delivery time to my address.`;

    const encoded = encodeURIComponent(orderMsg);
    window.open(`https://wa.me/919092091676?text=${encoded}`, '_blank');
  });

  // =========================================================================
  // 10. QUICK ONLINE CHECKOUT MODAL
  // =========================================================================
  const instantCheckoutBtn = document.getElementById('instantCheckoutBtn');
  const checkoutModal = document.getElementById('checkoutModal');
  const closeCheckoutBtn = document.getElementById('closeCheckoutBtn');
  const modalPayableAmount = document.getElementById('modalPayableAmount');
  const checkoutForm = document.getElementById('checkoutForm');
  const checkoutSuccessState = document.getElementById('checkoutSuccessState');
  const returnShopBtn = document.getElementById('returnShopBtn');

  instantCheckoutBtn?.addEventListener('click', () => {
    if (state.cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    const subtotalINR = state.cart.reduce((sum, i) => sum + (i.priceINR * i.qty), 0);
    const discountINR = subtotalINR * state.promoDiscountRate;
    const totalINR = subtotalINR - discountINR;

    if (modalPayableAmount) modalPayableAmount.textContent = formatMoney(totalINR);
    closeCart();
    checkoutModal?.classList.add('active');
  });

  closeCheckoutBtn?.addEventListener('click', () => {
    checkoutModal?.classList.remove('active');
  });

  checkoutModal?.addEventListener('click', (e) => {
    if (e.target === checkoutModal) {
      checkoutModal.classList.remove('active');
    }
  });

  checkoutForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = checkoutForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>PROCESSING ORDER...</span>`;
    }

    setTimeout(() => {
      checkoutForm.style.display = 'none';
      if (checkoutSuccessState) checkoutSuccessState.style.display = 'flex';
      state.cart = [];
      saveCart();
    }, 1000);
  });

  returnShopBtn?.addEventListener('click', () => {
    checkoutModal?.classList.remove('active');
    setTimeout(() => {
      checkoutForm.style.display = 'flex';
      if (checkoutSuccessState) checkoutSuccessState.style.display = 'none';
      const submitBtn = checkoutForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>CONFIRM ORDER</span>`;
      }
    }, 400);
  });

  // =========================================================================
  // 11. QUICK VIEW MODAL
  // =========================================================================
  const quickViewModal = document.getElementById('quickViewModal');
  const closeQuickViewBtn = document.getElementById('closeQuickViewBtn');
  const quickViewContent = document.getElementById('quickViewContent');

  function openQuickView(productId) {
    const p = products.find(prod => prod.id === productId);
    if (!p || !quickViewContent) return;

    quickViewContent.innerHTML = `
      <div class="quick-view-grid">
        <div class="qv-image-side">
          <img src="${p.imgPrimary}" alt="${p.title}">
        </div>
        <div class="qv-details-side">
          <span class="card-category">${p.categoryLabel}</span>
          <h2 class="card-title" style="font-size: 1.8rem;">${p.title}</h2>
          <span class="card-price" style="font-size: 1.5rem;">${formatMoney(p.priceINR)}</span>
          <p class="card-desc">${p.desc}</p>

          <div style="margin: 12px 0;">
            <strong style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 6px;">SELECT SIZE:</strong>
            <div class="size-selector-row">
              ${p.sizes.map((sz, i) => `
                <span class="size-pill ${i === 0 ? 'selected' : ''}" data-qv-size="${sz}">${sz}</span>
              `).join('')}
            </div>
          </div>

          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 12px; margin-bottom: 16px; font-size: 0.85rem;">
            <p><strong>Fabric:</strong> ${p.details.fabric}</p>
            <p><strong>Work:</strong> ${p.details.embroidery}</p>
            <p><strong>Made In:</strong> ${p.details.origin}</p>
          </div>

          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button class="btn btn-primary" id="qvAddBagBtn" style="flex: 1;">
              <span>ADD TO CART</span>
            </button>
            <a href="https://wa.me/919092091676?text=Hello%20Astah%20Boutique,%20I%20am%20interested%20in%20${encodeURIComponent(p.title)}" target="_blank" class="btn btn-whatsapp">
              <span>WHATSAPP</span>
            </a>
          </div>
        </div>
      </div>
    `;

    // Modal size pill selection
    const modalSizes = quickViewContent.querySelectorAll('[data-qv-size]');
    modalSizes.forEach(s => {
      s.addEventListener('click', () => {
        modalSizes.forEach(ms => ms.classList.remove('selected'));
        s.classList.add('selected');
      });
    });

    quickViewContent.querySelector('#qvAddBagBtn')?.addEventListener('click', () => {
      const selectedSize = quickViewContent.querySelector('[data-qv-size].selected')?.dataset.qvSize || p.sizes[0];
      addToCart(p.id, selectedSize, p.colors[0].name);
      quickViewModal?.classList.remove('active');
    });

    quickViewModal?.classList.add('active');
  }

  closeQuickViewBtn?.addEventListener('click', () => {
    quickViewModal?.classList.remove('active');
  });

  quickViewModal?.addEventListener('click', (e) => {
    if (e.target === quickViewModal) {
      quickViewModal.classList.remove('active');
    }
  });

  // =========================================================================
  // 12. BENTO COUNTDOWN TIMER
  // =========================================================================
  function initCountdown() {
    const hoursEl = document.getElementById('countdownHours');
    const minsEl = document.getElementById('countdownMins');
    const secsEl = document.getElementById('countdownSecs');
    let totalSeconds = 6 * 3600 + 30 * 60 + 45;

    setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds--;
      } else {
        totalSeconds = 24 * 3600;
      }
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(m).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(s).padStart(2, '0');
    }, 1000);
  }

  // =========================================================================
  // 13. DYNAMIC HEADER & MOBILE MENU NAVIGATION
  // =========================================================================
  const islandNav = document.getElementById('islandNav');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileBarItems = document.querySelectorAll('.mobile-bar-item');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      islandNav?.classList.add('scrolled');
    } else {
      islandNav?.classList.remove('scrolled');
    }

    // Active state highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    let currentSection = 'home';
    sections.forEach(sec => {
      const top = sec.offsetTop - 140;
      if (window.scrollY >= top) {
        currentSection = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
    });

    mobileBarItems.forEach(item => {
      if (item.getAttribute('href')) {
        item.classList.toggle('active', item.getAttribute('href') === `#${currentSection}`);
      }
    });
  });

  // Mobile Menu
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeMobileMenu = document.getElementById('closeMobileMenu');
  const mobileMenu = document.getElementById('mobileMenu');

  function openMobileMenu() {
    mobileMenu?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenuFunc() {
    mobileMenu?.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileMenuBtn?.addEventListener('click', openMobileMenu);
  closeMobileMenu?.addEventListener('click', closeMobileMenuFunc);

  mobileMenu?.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      closeMobileMenuFunc();
    }
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMobileMenuFunc);
  });

  // =========================================================================
  // 14. LIVE SOCIAL PROOF TOAST
  // =========================================================================
  const socialToast = document.getElementById('socialToast');
  const toastImg = document.getElementById('toastImg');
  const toastMsg = document.getElementById('toastMsg');
  const toastProduct = document.getElementById('toastProduct');
  const closeToastBtn = document.getElementById('closeToastBtn');
  let currentToastIndex = 0;

  function showNotification(title, message, icon = '✨') {
    if (!socialToast) return;
    if (toastImg) toastImg.style.display = 'none';
    let iconBadge = socialToast.querySelector('.toast-custom-icon');
    if (!iconBadge) {
      iconBadge = document.createElement('span');
      iconBadge.className = 'toast-custom-icon';
      iconBadge.style.fontSize = '1.6rem';
      iconBadge.style.marginRight = '8px';
      socialToast.querySelector('.toast-content-wrap')?.prepend(iconBadge);
    }
    iconBadge.style.display = 'inline-block';
    iconBadge.textContent = icon;
    if (toastMsg) toastMsg.textContent = title;
    if (toastProduct) toastProduct.textContent = message;

    socialToast.classList.add('active');
    setTimeout(() => {
      socialToast.classList.remove('active');
      setTimeout(() => {
        if (iconBadge) iconBadge.style.display = 'none';
        if (toastImg) toastImg.style.display = '';
      }, 400);
    }, 4000);
  }

  function showNextToast() {
    if (!socialToast) return;
    const item = socialFeed[currentToastIndex];

    if (toastImg) {
      toastImg.src = item.img;
      toastImg.style.display = '';
    }
    const iconBadge = socialToast.querySelector('.toast-custom-icon');
    if (iconBadge) iconBadge.style.display = 'none';

    if (toastMsg) toastMsg.textContent = `${item.name} from ${item.location} just ordered`;
    if (toastProduct) toastProduct.textContent = `"${item.product}"`;

    socialToast.classList.add('active');

    setTimeout(() => {
      socialToast.classList.remove('active');
    }, 4500);

    currentToastIndex = (currentToastIndex + 1) % socialFeed.length;
  }

  setTimeout(() => {
    showNextToast();
    setInterval(showNextToast, 16000);
  }, 3500);

  closeToastBtn?.addEventListener('click', () => {
    socialToast?.classList.remove('active');
  });

  // =========================================================================
  // 15. CURRENCY SWITCHER
  // =========================================================================
  const currencySelect = document.getElementById('currencySelect');
  currencySelect?.addEventListener('change', (e) => {
    state.currency = e.target.value;
    renderProducts();
    updateCartUI();
  });

  // =========================================================================
  // 16. WISHLIST TOGGLE & BADGE
  // =========================================================================
  const wishlistCountEl = document.getElementById('wishlistCount');
  const wishlistTrigger = document.getElementById('wishlistTrigger');

  function toggleWishlist(productId, btnElement) {
    const idx = state.wishlist.indexOf(productId);
    if (idx > -1) {
      state.wishlist.splice(idx, 1);
      btnElement.classList.remove('active');
    } else {
      state.wishlist.push(productId);
      btnElement.classList.add('active');
    }
    saveWishlist();
    if (state.activeCategory === 'wishlist') {
      renderProducts();
    }
  }

  function updateWishlistUI() {
    if (wishlistCountEl) {
      wishlistCountEl.textContent = state.wishlist.length;
    }
  }

  wishlistTrigger?.addEventListener('click', () => {
    const colSection = document.getElementById('collections');
    if (colSection) {
      colSection.scrollIntoView({ behavior: 'smooth' });
    }
    if (state.wishlist.length === 0) {
      showNotification('Wishlist Empty', 'Tap the ❤️ icon on any outfit to save it here!', '❤️');
    } else {
      state.activeCategory = 'wishlist';
      filterPills.forEach(b => b.classList.remove('active'));
      renderProducts();
      showNotification('Saved Favorites', `Showing ${state.wishlist.length} item${state.wishlist.length > 1 ? 's' : ''} in your wishlist!`, '❤️');
    }
  });

  // Reel cards full card interactive click
  document.querySelectorAll('.reel-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('button')) return;
      const orderLink = card.querySelector('.reel-order-btn');
      if (orderLink && orderLink.href) {
        window.open(orderLink.href, '_blank');
      }
    });
  });

  // Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterMsg = document.getElementById('newsletterMsg');
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (newsletterMsg) {
      newsletterMsg.textContent = "Thank you! We have added your WhatsApp to our latest collection updates.";
      newsletterForm.reset();
      setTimeout(() => {
        newsletterMsg.textContent = "";
      }, 5000);
    }
  });

  // =========================================================================
  // 17. INITIALIZATION
  // =========================================================================
  function init() {
    renderProducts();
    updateCartUI();
    updateWishlistUI();
    initCountdown();
    init3DTiltCards();
    initMagneticElements();
    initCursorHoverListeners();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
