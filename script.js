document.addEventListener("DOMContentLoaded", () => {
    // Initialize cart from localStorage or as an empty array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const displayProducts = (products, containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = products.map(product => `
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
            alert(`${name} added to cart`);
        }
    });
});
