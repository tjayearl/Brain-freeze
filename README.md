# Brain Freeze 🍦

Brain Freeze is a vibrant and interactive front-end project for a fictional sweet shop. It's designed to showcase modern web development techniques using pure HTML, CSS, and JavaScript, creating a delightful user experience for browsing and purchasing treats.

## ✨ Features

*   **Dynamic Product Catalog:** Products for Ice Cream, Chocolate, and Candy are loaded asynchronously from a `db.json` file.
*   **Persistent Shopping Cart:** Add items to the cart, which persists across browser sessions using `localStorage`.
*   **Fully Responsive Design:** A mobile-first approach ensures a seamless experience on all devices, from phones to desktops.
*   **Interactive Checkout Flow:** A multi-step checkout page with form validation, shipping options, and a simulated payment process.
*   **Engaging Animations & UX:**
    *   **Scroll Animations:** A disappearing/reappearing header and reveal-on-scroll effects for product cards.
    *   **Fly-to-Cart:** A visual animation showing an item flying to the checkout button when added.
    *   **Custom Cursor:** An interactive dot and outline cursor for desktop users that changes based on context.
    *   **Button Ripples:** A Material Design-inspired ripple effect on all buttons for tactile feedback.
    *   **Confetti Celebration:** A fun confetti explosion on the order confirmation page.
*   **Promo Code System:** A functional promo code input that applies a discount to the cart total.
*   **Printable Receipt:** A "Print Receipt" option on the confirmation page, optimized with print-specific styles.

## 🚀 Live Demo & Screenshots

*(This is where you would link to a live deployment on a service like Netlify, Vercel, or GitHub Pages.)*

**Homepage**


**Checkout Process**


## 🛠️ Technologies Used

*   **HTML5:** Semantic markup for structure.
*   **CSS3:** For styling, layout, and animations.
    *   Flexbox
    *   Keyframe Animations
    *   Responsive Media Queries
*   **Vanilla JavaScript (ES6+):** For all interactivity.
    *   DOM Manipulation
    *   Fetch API for data loading
    *   `localStorage` for cart persistence
    *   Intersection Observer for scroll animations

## ⚙️ Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/Brain-freeze.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd Brain-freeze
    ```
3.  **Run on a local server:**
    Because this project uses the `fetch()` API to load `db.json`, you'll need to run it on a local server to avoid CORS (Cross-Origin Resource Sharing) errors.

    A simple way to do this is using the **Live Server** extension in Visual Studio Code.
    *   Install the Live Server extension.
    *   Right-click on `index.html` and select "Open with Live Server".

Your browser will open, and you can now interact with the website!
