const API_URL = "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/apiCartData.json?v=1728384889";

const cartItemsContainer = document.getElementById("cart-items");
const subtotalElement = document.getElementById("subtotal");
const totalElement = document.getElementById("total");
const checkoutBtn = document.getElementById("checkout-btn");

let cartData = [];

// Fetch cart data from API
async function fetchCartData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    cartData = data.items;
    renderCartItems();
    updateTotals();
  } catch (error) {
    console.error("Error fetching cart data:", error);
  }
}

// Render cart items
function renderCartItems() {
  cartItemsContainer.innerHTML = "";
  cartData.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");
    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="details">
        <h3>${item.title}</h3>
        <p>Price: ₹${item.price.toFixed(2)}</p>
        <p>Subtotal: ₹${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <div class="actions">
        <input type="number" value="${item.quantity}" min="1" data-index="${index}">
        <button class="remove-btn" data-index="${index}">🗑</button>
      </div>
    `;
    cartItemsContainer.appendChild(itemElement);
  });
  addEventListeners();
}

// Update totals
function updateTotals() {
  const subtotal = cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
  subtotalElement.textContent = `₹${subtotal.toFixed(2)}`;
  totalElement.textContent = `₹${subtotal.toFixed(2)}`;
}

// Add event listeners to quantity inputs and remove buttons
function addEventListeners() {
  const quantityInputs = document.querySelectorAll(".cart-item input[type='number']");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      const index = e.target.dataset.index;
      cartData[index].quantity = parseInt(e.target.value, 10);
      renderCartItems();
      updateTotals();
    });
  });

  const removeButtons = document.querySelectorAll(".cart-item .remove-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cartData.splice(index, 1);
      renderCartItems();
      updateTotals();
    });
  });
}

// Initialize cart
fetchCartData();

checkoutBtn.addEventListener("click", () => {
  alert("Proceeding to checkout!");
});