const products = [
  { id: 1, name: "Sneakers", price: 49.99, image: "images/sneakers.jpg" },
  { id: 2, name: "Watch", price: 89.99, image: "images/watch.jpg" },
  { id: 3, name: "Headphones", price: 59.99, image: "images/headphones.jpg" },
  { id: 4, name: "Backpack", price: 39.99, image: "images/backpack.jpg" },
  { id: 5, name: "Sunglasses", price: 19.99, image: "images/sunglasses.jpg" },
  { id: 6, name: "T-shirt", price: 14.99, image: "images/tshirt.jpg" }, 
  { id: 7, name: "Laptop", price: 999.99, image: "images/laptop.jpg" },
  { id: 8, name: "Gaming Mouse", price: 29.99, image: "images/gaming-mouse.jpg" },
  { id: 9, name: "Keyboard", price: 49.99, image: "images/keyboard.jpg" },
  { id: 10, name: "Smartphone", price: 699.99, image: "images/smartphone.jpg" },
  { id: 11, name: "Tablet", price: 399.99, image: "images/tablet.jpg" },
  { id: 12, name: "Camera", price: 549.99, image: "images/camera.jpg" },
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const headerButtons = document.getElementById("header-buttons");


function renderProducts() {
  productList.innerHTML = "";
  products.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

// Add to Cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}


function openCart() {
  document.getElementById("cart-sidebar").classList.add("active");
}


function closeCart() {
  document.getElementById("cart-sidebar").classList.remove("active");
}



function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}


function renderCart() {
  cartItems.innerHTML = "";
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - $${item.price.toFixed(2)} 
      <button onclick="removeFromCart(${index})">❌</button>
    `;
    cartItems.appendChild(li);
  });

  
  if (cart.length > 0) {
    const totalLi = document.createElement("li");
    totalLi.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
    cartItems.appendChild(totalLi);
  }

  cartCount.textContent = cart.length;
}


function renderUser() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    headerButtons.innerHTML = `
      <span class="welcome-text">Welcome, ${user.name}</span>
      <button class="signout-btn" onclick="signOut()">Sign Out</button>
      <div class="cart" onclick="openCart()">
        🛒 Cart <span id="cart-count">${cart.length}</span>
      </div>
    `;
  } else {
    headerButtons.innerHTML = `
      <a href="signup.html" class="signup-btn">Sign Up</a>
      <div class="cart" onclick="openCart()">
        🛒 Cart <span id="cart-count">${cart.length}</span>
      </div>
    `;
  }
}


function signOut() {
  localStorage.removeItem("user");
  alert("Signed out successfully!");
  window.location.reload();
}

renderProducts();
renderCart();
renderUser();


