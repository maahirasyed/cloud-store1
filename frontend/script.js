const BASE_URL = "http://localhost:3000";

const container = document.getElementById("product-list");

let allProducts = [];

// Cart & Wishlist
let cart = JSON.parse(localStorage.getItem("cart")) || {};
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// ✅ Fetch products
async function fetchProducts() {
    try {
        console.log("🚀 Fetching products...");

        const res = await fetch(`${BASE_URL}/products`);

        if (!res.ok) {
            throw new Error("Server error");
        }

        const data = await res.json();

        console.log("✅ DATA RECEIVED:", data);

        if (!data || data.length === 0) {
            container.innerHTML = "<h2>No products found ❌</h2>";
            return;
        }

        allProducts = data;
        displayProducts(data);
        updateCartCount();
        updateWishlistCount();

    } catch (error) {
        console.log("❌ FETCH ERROR:", error);
        container.innerHTML = "<h2>Failed to load products ❌</h2>";
    }
}

// ✅ Display products
function displayProducts(products) {
    container.innerHTML = "";

    products.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";

        const imageUrl = p.image && p.image.startsWith("http")
            ? p.image
            : "https://via.placeholder.com/200";

        card.innerHTML = `
            <img src="${imageUrl}" />
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>

            <button onclick="addToCart(${p.id})">🛒 Add to Cart</button>
            <button onclick="addToWishlist(${p.id})">❤️ Wishlist</button>
        `;

        container.appendChild(card);
    });
}

// Cart functions
function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const count = Object.values(cart).reduce((a, b) => a + b, 0);
    document.getElementById("cart-count").innerText = count;
}

// Wishlist
function addToWishlist(id) {
    if (!wishlist.includes(id)) {
        wishlist.push(id);
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    updateWishlistCount();
}

function updateWishlistCount() {
    document.getElementById("wish-count").innerText = wishlist.length;
}

// Navigation
function goToCart() {
    window.location.href = "cart.html";
}

// Search
document.getElementById("search").addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = allProducts.filter(p =>
        p.name.toLowerCase().includes(value)
    );

    displayProducts(filtered);
});

// Load
fetchProducts();
