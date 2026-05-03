const BASE_URL = "http://localhost:3000";

// Cart stored as object
let cart = JSON.parse(localStorage.getItem("cart")) || {};

async function loadCart() {
    try {
        const res = await fetch(`${BASE_URL}/products`);

        if (!res.ok) {
            throw new Error("Failed to fetch products");
        }

        const products = await res.json();

        let total = 0;
        let container = document.getElementById("cart-items");
        container.innerHTML = "";

        if (Object.keys(cart).length === 0) {
            container.innerHTML = "<h2>Your cart is empty 🛒</h2>";
            document.getElementById("total").innerText = "";
            return;
        }

        Object.keys(cart).forEach(id => {
            const item = products.find(p => p.id == id);

            if (item) {
                let qty = cart[id];
                let subtotal = item.price * qty;
                total += subtotal;

                container.innerHTML += `
                    <div class="card">
                        <img src="${item.image}" />
                        <h3>${item.name}</h3>
                        <p>₹${item.price}</p>

                        <div>
                            <button onclick="decreaseQty(${id})">➖</button>
                            <span>${qty}</span>
                            <button onclick="increaseQty(${id})">➕</button>
                        </div>

                        <p>Subtotal: ₹${subtotal}</p>

                        <button onclick="removeItem(${id})">❌ Remove</button>
                    </div>
                `;
            }
        });

        document.getElementById("total").innerText = "Total: ₹" + total;

    } catch (err) {
        console.log("❌ CART ERROR:", err);
        document.getElementById("cart-items").innerHTML =
            "<h2>Failed to load cart ❌</h2>";
    }
}

// Increase qty
function increaseQty(id) {
    cart[id]++;
    updateCart();
}

// Decrease qty
function decreaseQty(id) {
    if (cart[id] > 1) {
        cart[id]--;
    } else {
        delete cart[id];
    }
    updateCart();
}

// Remove item
function removeItem(id) {
    delete cart[id];
    updateCart();
}

// Update storage + reload
function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Navigation
function checkout() {
    window.location.href = "checkout.html";
}

function goHome() {
    window.location.href = "index.html";
}

// Load cart
loadCart();
