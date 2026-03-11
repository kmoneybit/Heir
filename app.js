const hamIcon = document.querySelector("#hamburger");
const navLinks = document.querySelector(".navLinks");

if (hamIcon && navLinks) {
  hamIcon.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// Fetch products from backend and render into the products section
const API_BASE =
  window.location.protocol === "file:" || window.location.origin === "null"
    ? "http://localhost:3000"
    : window.location.origin;

const PRODUCTS_URL = `${API_BASE}/api/products`;

// ---------------- PRODUCT CARD ----------------
function createProductCard(p) {
  const card = document.createElement("div");
  card.classList.add("product-card");

  card.dataset.id = p.id;

  const img = p.image || "image/product-img6.jpg";

  const colorsHtml = (p.colors || [])
    .map(
      (c) =>
        `<button class="colors-btn" style="background-color:${c};"></button>`,
    )
    .join("");

  card.innerHTML = `
    <img src="${img}" alt="${p.name}" class="product-img">
    <h3>${p.name}</h3>
    <p>₦${Number(p.price).toLocaleString()}</p>
    <button class="add-cart-btn">Add to cart</button>
    <p>colors</p>
    ${colorsHtml}
  `;

  return card;
}

// ---------------- CART UTILITIES ----------------
function getCart() {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  if (countEl) countEl.textContent = getCart().length;
}

function addToCart(product) {
  const cart = getCart();
  cart.push(product);
  saveCart(cart);
  alert(product.name + " added to cart");
}

// ---------------- LOAD PRODUCTS ----------------
async function loadProducts() {
  const container = document.querySelector(".products");
  if (!container) return;

  container.innerHTML = '<p style="color:#666">Loading products...</p>';

  try {
    const res = await fetch(PRODUCTS_URL, { cache: "no-store" });

    if (!res.ok) throw new Error("Failed to load products");

    const products = await res.json();

    if (!Array.isArray(products) || products.length === 0) {
      container.innerHTML = '<p style="color:#666">No products available.</p>';
      return;
    }

    container.innerHTML = "";

    products.forEach((p) => {
      container.appendChild(createProductCard(p));
    });
  } catch (e) {
    console.error("Product load error:", e);

    container.innerHTML = '<p style="color:#666">Could not load products.</p>';

    const fallback = [
      {
        id: 1,
        name: "Sample Straight",
        price: 2999,
        image: "image/product-img6.jpg",
        colors: ["#000", "#8b4513"],
      },
      {
        id: 2,
        name: "Sample Curls",
        price: 3999,
        image: "image/product-img6.jpg",
        colors: ["#000"],
      },
    ];

    fallback.forEach((p) => {
      container.appendChild(createProductCard(p));
    });
  }
}

// ---------------- ADD TO CART CLICK ----------------
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-cart-btn")) {
    const card = e.target.closest(".product-card");

    const id = card.dataset.id;
    const name = card.querySelector("h3").textContent;

    const priceText = card.querySelector("p").textContent.replace("₦", "");
    const price = Number(priceText.replace(",", ""));

    const product = { id, name, price };

    addToCart(product);
  }
});

// ---------------- TEAM TOGGLE ----------------
function setupTeamToggle() {
  const toggleBtn = document.getElementById("team-toggle");
  const content = document.getElementById("team-content");

  if (!toggleBtn || !content) return;

  toggleBtn.addEventListener("click", () => {
    if (content.style.display === "none" || content.style.display === "") {
      content.style.display = "block";
      toggleBtn.textContent = "Hide Team";
    } else {
      content.style.display = "none";
      toggleBtn.textContent = "Show Team";
    }
  });
}

// ---------------- ADMIN PAGE ----------------
function setupAdminPage() {
  const list = document.getElementById("list");
  if (!list) return;

  async function load() {
    const res = await fetch("/api/products");
    const data = await res.json();

    const tbody = document.getElementById("list");
    tbody.innerHTML = "";

    data.forEach((p) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${p.id}</td>
        <td><input data-id="${p.id}" class="name" value="${p.name}"></td>
        <td><input data-id="${p.id}" class="price" value="${p.price}"></td>
        <td><input data-id="${p.id}" class="colors" value="${(p.colors || []).join(",")}"></td>
        <td>
          <button class="action-btn save-btn" data-id="${p.id}">Save</button>
          <button class="action-btn del-btn" data-id="${p.id}">Delete</button>
        </td>
      `;

      tbody.appendChild(tr);
    });
  }

  load();
}

// ---------------- PAGE LOAD ----------------
document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  updateCartCount();
  setupTeamToggle();
  setupAdminPage();
});
