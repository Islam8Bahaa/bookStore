// js/cart.js

(() => {
    const CART_KEY = "bonyCart";

    // Helpers
    function getCart() {
        return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    }
    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    // Add / remove / update
    function addToCart(item) {
        const cart = getCart();
        const existing = cart.find(i => i.id === item.id);
        if (existing) existing.quantity += item.quantity;
        else cart.push(item);
        saveCart(cart);
        updateCartCount();
        renderCartTable();
    }
    function removeFromCart(id) {
        const cart = getCart().filter(i => i.id !== id);
        saveCart(cart);
        updateCartCount();
        renderCartTable();
    }
    function updateQuantity(id, newQty) {
        let cart = getCart();
        const item = cart.find(i => i.id === id);
        if (!item) return;
        item.quantity = newQty;
        if (item.quantity < 1) {
            cart = cart.filter(i => i.id !== id);
        }
        saveCart(cart);
        updateCartCount();
        renderCartTable();
    }

    // Update the little badge
    function updateCartCount() {
        const count = getCart().reduce((sum, i) => sum + (i.quantity||0), 0);
        document.querySelectorAll(".cart-count").forEach(el => el.innerText = count);
    }

    // Recompute and write out the subtotal/shipping/total
    function updateCartTotals() {
        const cart = getCart();
        const subtotal = cart.reduce((sum, i) => {
            const price = Number(i.price) || 0;
            const qty   = Number(i.quantity) || 0;
            return sum + price * qty;
        }, 0);
        const shipping = 0;

        const fmt = n => `$${n.toFixed(2)}`;
        const subEl  = document.getElementById("cartSubtotal");
        const shipEl = document.getElementById("cartShipping");
        const totEl  = document.getElementById("cartTotal");
        if (subEl)  subEl.innerText  = fmt(subtotal);
        if (shipEl) shipEl.innerText = shipping === 0 ? "Free" : fmt(shipping);
        if (totEl)  totEl.innerText  = fmt(subtotal + shipping);
    }

    // Render the table rows
    function renderCartTable() {
        const cart = getCart();
        const tbody = document.getElementById("cartTableBody");
        if (!tbody) {
            updateCartTotals();
            return;
        }

        tbody.innerHTML = cart.map(item => {
            const price    = Number(item.price) || 0;
            const qty      = Number(item.quantity) || 0;
            const line     = (price * qty).toFixed(2);
            return `
        <tr data-item-id="${item.id}">
          <td>
            <button class="remove-icon btn btn-link p-0" data-remove>
              <i class="fa fa-times"></i>
            </button>
            <img src="${item.cover}" width="50" class="ms-2" alt="">
            ${item.name}
          </td>
          <td>$${price.toFixed(2)}</td>
          <td>
            <div class="quantity-basket" data-qty-input>
              <button class="qtyminus">−</button>
              <input type="number" min="1" max="10" step="1" value="${qty}">
              <button class="qtyplus">+</button>
            </div>
          </td>
          <td class="subtotal-price">$${line}</td>
        </tr>
      `;
        }).join("");

        // bind remove
        tbody.querySelectorAll("[data-remove]").forEach(btn => {
            btn.onclick = () => {
                const id = btn.closest("tr").dataset.itemId;
                removeFromCart(id);
            };
        });

        // bind +/-
        tbody.querySelectorAll(".qtyminus, .qtyplus").forEach(btn => {
            btn.onclick = () => {
                const row = btn.closest("tr");
                const id  = row.dataset.itemId;
                const input = row.querySelector("input");
                const delta = btn.classList.contains("qtyplus") ? 1 : -1;
                updateQuantity(id, parseInt(input.value, 10) + delta);
            };
        });

        // bind direct edits
        tbody.querySelectorAll("input[type=number]").forEach(input => {
            input.onchange = () => {
                const row = input.closest("tr");
                const id  = row.dataset.itemId;
                updateQuantity(id, parseInt(input.value, 10));
            };
        });

        // update totals underneath
        updateCartTotals();
    }

    // global Add to Cart handler
    document.addEventListener("click", e => {
        const btn = e.target.closest(".add-to-cart");
        if (!btn) return;
        const id    = btn.dataset.id;
        const name  = btn.dataset.name;
        const price = parseFloat(btn.dataset.price) || 0;
        const cover = btn.dataset.cover;
        const qtyInput = btn.closest("[data-qty-input]")?.querySelector("input");
        const quantity = qtyInput ? parseInt(qtyInput.value, 10) : 1;
        addToCart({ id, name, price, cover, quantity });
    });

    // on load
    document.addEventListener("DOMContentLoaded", () => {
        updateCartCount();
        renderCartTable();
    });
})();
