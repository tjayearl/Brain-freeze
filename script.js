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
        </div>
    `).join("");
}
