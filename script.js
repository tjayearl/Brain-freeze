document.addEventListener("DOMContentLoaded", () => {
    fetch("db.json")
        .then(response => response.json())
        .then(data => {
            displayProducts(data.iceCream, "ice-cream-list");
            displayProducts(data.chocolate, "chocolate-list");
            displayProducts(data.candy, "candy-list");
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
