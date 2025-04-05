document.addEventListener("DOMContentLoaded", () => {
    fetch("db.json")
      .then((response) => response.json())
      .then((data) => {
        displayProducts(data.iceCream, "ice-cream-list");
        displayProducts(data.chocolate, "chocolate-list");
        displayProducts(data.candy, "candy-list");
      });
  
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 100) {
        header.style.opacity = Math.max(1 - scrollTop / 300, 0);
        header.style.transform = `translateY(-${Math.min(scrollTop / 2, 100)}px)`;
      } else {
        header.style.opacity = 1;
        header.style.transform = "translateY(0)";
      }
    });
  });
  
  function displayProducts(products, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = products
      .map((product) => {
        return `
          <div class="product">
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <span>Price: $${product.price}</span>
            <button class="cart-button" onclick="addToCheckout('${product.name}', ${product.price})">
              <img src="https://cdn-icons-png.flaticon.com/128/3523/3523885.png" alt="Add to Cart" />
            </button>
          </div>
        `;
      })
      .join("");
  }
  
  // Scroll to checkout
  function goToCheckout() {
    document.getElementById("checkout").scrollIntoView({ behavior: "smooth" });
  }
  
  // Cart logic
  let cart = [];
  
  function addToCheckout(name, price) {
    cart.push({ name, price });
    updateCheckout();
  }
  
  function updateCheckout() {
    const checkoutList = document.getElementById("checkout-list");
    const checkoutCount = document.getElementById("checkout-count");
  
    checkoutCount.textContent = cart.length;
  
    checkoutList.innerHTML = cart
      .map((item, index) => `<p>${index + 1}. ${item.name} - $${item.price.toFixed(2)}</p>`)
      .join("");
  }
  