document.addEventListener("DOMContentLoaded", () => {
    fetch("db.json")
        .then(response => response.json())
        .then(data => {
            displayProducts(data.iceCream, "ice-cream-list");
            displayProducts(data.chocolate, "chocolate-list");
            displayProducts(data.candy, "candy-list");
        });

    // Header Disappearing Effect
    let lastScrollTop = 0;
    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {  // Start disappearing after scrolling 100px
            header.style.opacity = Math.max(1 - scrollTop / 300, 0); // Gradually fade out
            header.style.transform = `translateY(-${Math.min(scrollTop / 2, 100)}px)`; // Move up slightly
        } else {
            header.style.opacity = 1;
            header.style.transform = "translateY(0)";
        }

        lastScrollTop = scrollTop;
    });
});

function displayProducts(products, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = products.map(product => `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span>Price: $${product.price}</span>
            <br> <!-- Added line break to separate price from the button -->
            <button class="cart-button">
                <img src="https://cdn-icons-png.flaticon.com/128/3523/3523885.png" alt="Add to Cart">
            </button>
        </div>
    `).join("");
}
