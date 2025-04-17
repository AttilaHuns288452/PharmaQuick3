// PharmaQuick Cart Functionality

// Sample product data (in a real application, this would come from a database)
const products = [
    {
        id: 1,
        name: "Paracetamol",
        category: "Fever Relief, Pain Relief",
        price: 45.00,
        image: "Paracetamol_120__04876.1607584025[1].webp",
        description: "Effective for reducing fever and relieving mild to moderate pain."
    },
    {
        id: 2,
        name: "Robitussin-DM",
        category: "Cough & Cold",
        price: 137.00,
        image: "Dextromethorphan.avif",
        description: "Temporarily relieves cough due to minor throat & bronchial irritation as may occur w/ a cold."
    },
    {
        id: 3,
        name: "Electrolyte Water",
        category: "Vitamins & Supplements",
        price: 120.00,
        image: "Electrolyte water.webp",
        description: "Rehydrates and replenishes lost electrolytes to support hydration and energy."
    },
    {
        id: 4,
        name: "Emergency Kit",
        category: "First Aid",
        price: 850.00,
        image: "Emergency Kit.avif",
        description: "Comprehensive kit containing bandages, antiseptics, and other essential first aid supplies."
    },
    {
        id: 5,
        name: "Antacid",
        category: "Digestive Health",
        price: 75.00,
        image: "ALUMINUM-HYDROXIDE-MAGNESIUM-HYDROXIDE-SUSPENION-120ML.png",
        description: "Neutralizes stomach acid and relieves heartburn, indigestion, and upset stomach."
    },
    {
        id: 6,
        name: "Lansoprazole",
        category: "Digestive Health",
        price: 120.00,
        image: "Lansoprazole.webp",
        description: "Reduces stomach acid to relieve heartburn, acid reflux, and ulcers."
    },
    {
        id: 7,
        name: "Loratadine",
        category: "Allergy Relief",
        price: 85.00,
        image: "Loratadine.webp",
        description: "Relieves sneezing, runny nose, and itchy eyes caused by allergies."
    },
    
   
    
   
    {
        id: 8,
        name: "Kids Multivitamin Gummies",
        category: "Vitamins & Supplements",
        price: 350.00,
        image: "multivitamins.webp",
        description: "Provides essential vitamins and minerals to support overall health and well-being."
    },
    {
        id: 9,
        name: "Melatonin",
        category: "Sleep Aids",
        price: 280.00,
        image: "now-melatonin-10mg-100-caps-supplements-now-foods-479644_1600x.webp",
        description: "Helps regulate sleep-wake cycle and improve sleep quality."
    },
    {
        id: 10,
        name: "Omeprazole",
        category: "Digestive Health",
        price: 250.00,
        image: "Omeprazole.webp",
        description: "Reduces stomach acid production, treating conditions like heartburn and acid reflux."
    },
    {
        id: 11,
        name: "Paracetamol 500mg Tablets",
        category: "Fever Relief, Pain Relief",
        price: 85.00,
        image: "paracetamol-500mg-tablet.jpg",
        description: "These 500mg tablets provide effective relief from mild to moderate pain and help reduce high temperature."
    },
    {
        id: 12,
        name: "Phenylephrine",
        category: "Cough & Cold",
        price: 120.00,
        image: "Phenylephrine.jpg",
        description: "Provides relief from nasal congestion and sinus pressure."
    },
    {
        id: 13,
        name: "Ranitidine",
        category: "Digestive Health",
        price: 180.00,
        image: "Ranitidine.png",
        description: "Provides relief from nasal congestion and sinus pressure."
    }
];

// Cart functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log("Cart.js loaded");
    
    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('pharmaquickCart')) || [];
    
    // Add to cart buttons on product pages
    const addToCartButtons = document.querySelectorAll('.btn-cart');
    console.log("Found add to cart buttons:", addToCartButtons.length);
    
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            // Remove existing click event listeners
            button.removeEventListener('click', handleAddToCart);
            // Add new click event listener
            button.addEventListener('click', handleAddToCart);
        });
    }
    
    function handleAddToCart(e) {
        e.preventDefault();
        const onclickAttr = this.getAttribute('onclick');
        if (onclickAttr) {
            const match = onclickAttr.match(/\d+/);
            if (match) {
                const productId = parseInt(match[0]);
                console.log("Adding product to cart:", productId);
                addToCart(productId);
            }
        }
    }
    
    // Helper function to get item index from an element in the cart
    function getItemIndex(element) {
        const itemElement = element.closest('.cart-item');
        const itemId = parseInt(itemElement.dataset.id);
        return cart.findIndex(item => item.id === itemId);
    }
    
    // Add item to cart
    window.addToCart = function(productId) {
        console.log("addToCart called with ID:", productId);
        const product = products.find(p => p.id === productId);
        if (!product) {
            console.error("Product not found:", productId);
            return;
        }
        
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
                quantity: 1
            });
        }
        
        updateCart();
        showAddedToCartMessage(product.name);
    };
    
    // Remove item from cart
    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }
    
    // Update cart in localStorage and UI
    function updateCart() {
        localStorage.setItem('pharmaquickCart', JSON.stringify(cart));
        updateCartDisplay();
    }
    
    // Update cart display
    function updateCartDisplay() {
        // Update cart count in header
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
            const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
            cartCountElement.textContent = totalItems;
            console.log("Updated cart count:", totalItems);
        }
        
        // If on cart page, update cart items display
        if (document.getElementById('cartItems')) {
            if (cart.length === 0) {
                document.getElementById('emptyCart').style.display = 'flex';
                document.getElementById('cartItems').style.display = 'none';
                document.getElementById('cartSummary').style.display = 'none';
            } else {
                document.getElementById('emptyCart').style.display = 'none';
                document.getElementById('cartItems').style.display = 'block';
                document.getElementById('cartSummary').style.display = 'block';
                
                // Render cart items
                renderCartItems();
                // Update summary
                updateCartSummary();
            }
        }
    }
    
    // Add event listeners for cart page elements if they exist
    if (document.getElementById('cartItems')) {
        // Event delegation for quantity changes and item removal
        document.getElementById('cartItems').addEventListener('click', function(e) {
            if (e.target.classList.contains('decrease')) {
                const itemIndex = getItemIndex(e.target);
                if (cart[itemIndex].quantity > 1) {
                    cart[itemIndex].quantity--;
                    updateCart();
                }
            } else if (e.target.classList.contains('increase')) {
                const itemIndex = getItemIndex(e.target);
                cart[itemIndex].quantity++;
                updateCart();
            } else if (e.target.classList.contains('remove-item') || 
                      (e.target.parentElement && e.target.parentElement.classList.contains('remove-item'))) {
                const itemElement = e.target.closest('.cart-item');
                const itemId = parseInt(itemElement.dataset.id);
                removeFromCart(itemId);
            }
        });
        
        // Apply promo code
        if (document.getElementById('applyPromo')) {
            document.getElementById('applyPromo').addEventListener('click', function() {
                const promoCode = document.getElementById('promoCode').value.trim().toUpperCase();
                applyPromoCode(promoCode);
            });
        }
        
        // Checkout button
        if (document.getElementById('checkoutBtn')) {
            document.getElementById('checkoutBtn').addEventListener('click', function() {
                // Show payment options modal
                showPaymentOptions();
            });
        }
        
        // Show payment options modal
        function showPaymentOptions() {
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        modalContent.innerHTML = `
            <div class="modal-header">
                <h3>Select Payment Method</h3>
                <button class="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="payment-methods">
                    <div class="payment-method">
                        <input type="radio" id="gcash" name="payment" value="gcash">
                        <div class="payment-method-info">
                            <h4>GCash</h4>
                            <p>Pay using your GCash account</p>
                            <div class="payment-method-logo">
                                <img src="gcash-logo.png" alt="GCash">
                            </div>
                        </div>
                    </div>
                    <div class="payment-method">
                        <input type="radio" id="cod" name="payment" value="cod">
                        <div class="payment-method-info">
                            <h4>Cash on Delivery</h4>
                            <p>Pay when you receive your order</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn" id="proceedToCheckout">Proceed to Checkout</button>
            </div>
        `;
        
        // Append modal to body
        modalOverlay.appendChild(modalContent);
        document.body.appendChild(modalOverlay);
        
        // Add event listeners
        const closeBtn = modalContent.querySelector('.close-modal');
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(modalOverlay);
        });
        
        // Payment method selection
        const paymentMethods = modalContent.querySelectorAll('.payment-method');
        paymentMethods.forEach(method => {
            method.addEventListener('click', function() {
                // Clear previous selection
                paymentMethods.forEach(m => m.classList.remove('selected'));
                // Select current
                this.classList.add('selected');
                // Check the radio button
                const radio = this.querySelector('input[type="radio"]');
                radio.checked = true;
            });
        });
        
        // Proceed to checkout
        const proceedBtn = modalContent.querySelector('#proceedToCheckout');
        proceedBtn.addEventListener('click', function() {
            const selectedPayment = modalContent.querySelector('input[name="payment"]:checked');
            if (!selectedPayment) {
                alert('Please select a payment method');
                return;
            }
            
            // Save payment method to localStorage
            localStorage.setItem('pharmaquickPaymentMethod', selectedPayment.value);
            
            // Redirect to checkout page or process order
            alert(`Order placed successfully with ${selectedPayment.value === 'gcash' ? 'GCash' : 'Cash on Delivery'} payment!`);
            
            // Clear cart after successful order
            cart = [];
            updateCart();
            
            // Close modal
            document.body.removeChild(modalOverlay);
        });
        }
    }
    
    // Apply promo code
    function applyPromoCode(code) {
        let discount = 0;
        let message = '';
        
        // Simple promo code logic
        if (code === 'FIRST10') {
            discount = calculateSubtotal() * 0.1;
            message = '10% discount applied!';
        } else {
            message = 'Invalid promo code';
        }
        
        if (discount > 0) {
            localStorage.setItem('pharmaquickDiscount', discount);
            updateCartSummary();
        }
        
        alert(message);
    }
    
    function calculateSubtotal() {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    // Render cart items
    function renderCartItems() {
        const cartItemsContainer = document.getElementById('cartItems');
        if (!cartItemsContainer) return;
        
        // Clear existing items
        cartItemsContainer.innerHTML = '';
        
        // Add each item to the container
        cart.forEach(item => {
            const subtotal = item.price * item.quantity;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.dataset.id = item.id;
            
            itemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="category">${item.category}</p>
                </div>
                <div class="cart-item-price">₱${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease">-</button>
                    <input type="number" value="${item.quantity}" min="1" max="99" class="quantity-input">
                    <button class="quantity-btn increase">+</button>
                </div>
                <div class="cart-item-subtotal">₱${subtotal.toFixed(2)}</div>
                <button class="remove-item"><i class="fas fa-trash"></i></button>
            `;
            
            cartItemsContainer.appendChild(itemElement);
        });
    }
    
    // Update cart summary
    function updateCartSummary() {
        const subtotalElement = document.getElementById('subtotalAmount');
        const shippingElement = document.getElementById('shippingAmount');
        const totalElement = document.getElementById('totalAmount');
        const discountElement = document.getElementById('discountAmount');
        
        if (!subtotalElement || !totalElement) return;
        
        // Calculate subtotal
        const subtotal = calculateSubtotal();
        
        // Calculate shipping (free if subtotal > 500)
        const shipping = subtotal > 500 ? 0 : 50;
        
        // Get discount from localStorage or default to 0
        const discount = parseFloat(localStorage.getItem('pharmaquickDiscount') || 0);
        
        // Calculate total
        const total = subtotal + shipping - discount;
        
        // Update elements
        subtotalElement.textContent = `₱${subtotal.toFixed(2)}`;
        if (shippingElement) {
            shippingElement.textContent = shipping === 0 ? 'FREE' : `₱${shipping.toFixed(2)}`;
        }
        
        const discountRow = document.querySelector('.discount-row');
        if (discountElement && discount > 0 && discountRow) {
            discountElement.textContent = `-₱${discount.toFixed(2)}`;
            discountRow.style.display = 'flex';
        } else if (discountRow) {
            discountRow.style.display = 'none';
        }
        
        totalElement.textContent = `₱${total.toFixed(2)}`;
    }
    
    // Show added to cart message
    function showAddedToCartMessage(productName) {
        alert(`${productName} added to cart!`);
    }
    
    // Initialize cart display
    updateCartDisplay();
});