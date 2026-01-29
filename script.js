document.addEventListener("DOMContentLoaded", () => {
    // Initialize cart from localStorage or as an empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // --- Animation Helpers ---
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const displayProducts = (products, containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = products.map((product, index) => `
            <div class="product" data-name="${product.name}" data-price="${product.price}" data-description="${product.description}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <span>$${product.price.toFixed(2)}</span>
                <button class="cart-button">
                    <img src="https://cdn-icons-png.flaticon.com/128/3514/3514491.png" alt="Add to Cart">
                </button>
            </div>
        `).join("");

        // Add entrance animation observation
        const cards = container.querySelectorAll(".product");
        cards.forEach((card, index) => {
            card.classList.add("reveal");
            card.style.transitionDelay = `${index * 80}ms`; // Stagger effect
            observer.observe(card);
        });
    };

    fetch("db.json")
        .then(response => response.json())
        .then(data => {
            displayProducts(data.iceCream, "ice-cream-list");
            displayProducts(data.chocolate, "chocolate-list");
            displayProducts(data.candy, "candy-list");
        });

    // Header Scroll Effect
    let lastScrollTop = 0;
    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) { // Start effect after scrolling 100px
            if (scrollTop > lastScrollTop) {
                // Scrolling Down
                header.style.opacity = '0';
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling Up
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.style.opacity = 1;
            header.style.transform = "translateY(0)";
        }
        lastScrollTop = scrollTop;
    });

    // --- Toast Notification ---
    const showToast = (message) => {
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add("show"), 50);
        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 400);
        }, 2500);
    };

    // --- Fly to Cart Animation ---
    function flyToCart(image) {
        const cartBtn = document.querySelector(".checkout-link-button");
        const clone = image.cloneNode(true);

        const imgRect = image.getBoundingClientRect();
        const cartRect = cartBtn.getBoundingClientRect();

        clone.style.position = "fixed";
        clone.style.left = imgRect.left + "px";
        clone.style.top = imgRect.top + "px";
        clone.style.width = imgRect.width + "px";
        clone.style.zIndex = "2000";
        clone.style.transition = "all 0.8s cubic-bezier(0.65, 0, 0.35, 1)";
        clone.style.borderRadius = "50%";

        document.body.appendChild(clone);

        requestAnimationFrame(() => {
            clone.style.left = cartRect.left + "px";
            clone.style.top = cartRect.top + "px";
            clone.style.width = "20px";
            clone.style.opacity = "0";
        });

        setTimeout(() => clone.remove(), 800);
    }

    // Add to cart function
    document.addEventListener("click", e => {
        if (e.target.closest(".cart-button")) {
            const productCard = e.target.closest(".product");
            const name = productCard.dataset.name;
            const price = parseFloat(productCard.dataset.price); // CRITICAL FIX: Parse price to a number
            const description = productCard.dataset.description;

            // Check if item is already in cart
            const existingItem = cart.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity += 1; // Increase quantity
            } else {
                cart.push({ name, price, description, quantity: 1 }); // Add new item with quantity 1
            }

            localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage
            
            // Trigger Animations
            const img = productCard.querySelector("img");
            flyToCart(img);
            showToast(`${name} added to cart 🍦`);
        }
    });

    // Button Ripple Effect
    document.addEventListener("click", e => {
        if (e.target.tagName === "BUTTON") {
            const ripple = document.createElement("span");
            ripple.className = "ripple";
            ripple.style.left = `${e.offsetX}px`;
            ripple.style.top = `${e.offsetY}px`;
            e.target.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }
    });

    // --- Custom Cursor Logic ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    // Only activate on desktop (devices with fine pointers)
    if (cursorDot && cursorOutline && window.matchMedia("(pointer: fine)").matches) {
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        window.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Dot follows instantly
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });

        const animateCursor = () => {
            // Outline follows with smooth lag
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
            
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        // Context Awareness (Event Delegation)
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('a, button, .checkout-link-button, .product')) {
                document.body.classList.add('hover-action');
            }
            if (e.target.closest('.remove-btn')) {
                document.body.classList.add('hover-danger');
            }
        });
        document.addEventListener('mouseout', () => {
             document.body.classList.remove('hover-action', 'hover-danger');
        });
    }
});
