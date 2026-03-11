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

function createProductCard(p) {
  const card = document.createElement("div");
  card.classList.add("product-card");
  card.dataset.id = p.id; // store id for cart actions
  const img = p.image || "/image/product-img6.jpg";
  const colorsHtml = (p.colors || [])
    .map(
      (c) =>
        `<button class="colors-btn" style="background-color: ${c};"></button>`,
    )
    .join("");
  card.innerHTML = `
    <img src="${img}" alt="${p.name}" class="product-img">
    <h1>${p.name}</h1>
    <p>₦${p.price}</p>
    <button class="add-cart-btn">Add to cart</button>
    <p>colors</p>
    ${colorsHtml}
  `;
  return card;
}

// CART UTILITIES
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
  alert(`${product.name} added to cart`);
}

// load products from backend and render
async function loadProducts() {
  const container = document.querySelector(".products");
  if (!container) return;
  container.innerHTML = '<p style="color:#666">Loading products...</p>';
  try {
    const res = await fetch(PRODUCTS_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load products: ${res.status}`);
    const products = await res.json();
    if (!Array.isArray(products) || products.length === 0) {
      container.innerHTML = '<p style="color:#666">No products available.</p>';
      return;
    }
    container.innerHTML = "";
    products.forEach((p) => container.appendChild(createProductCard(p)));
  } catch (e) {
    console.error("Product load error:", e);
    container.innerHTML = `
      <p style="color:#666">Could not load products from ${PRODUCTS_URL}.</p>
      <p style="color:#666">Make sure the dev server is running: <code>npm start</code></p>
    `;
    const fallback = [
      {
        name: "Sample Straight",
        price: 2999,
        image: "/image/product-img6.jpg",
        colors: ["#000", "#8b4513"],
      },
      {
        name: "Sample Curls",
        price: 3999,
        image: "/image/product-img6.jpg",
        colors: ["#000"],
      },
    ];
    fallback.forEach((p) => container.appendChild(createProductCard(p)));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  setupHomeSignup();
  updateCartCount();
  setupTeamToggle();
});

function setupHomeSignup() {
  // ... your signup and OTP code (unchanged)
}

function setupSignupPage() {
  // ... your signup page code (unchanged)
}

function setupLoginPage() {
  // ... your login page code (unchanged)
}

function setupAdminPage() {
  async function loadOrders() {
    const res = await fetch("/api/orders");
    const data = await res.json();
    const tbody = document.getElementById("orders-list");
    if (!tbody) return;
    tbody.innerHTML = "";
    data.forEach((o) => {
      const tr = document.createElement("tr");
      const itemsList = (o.items || []).map((i) => i.name || "").join(", ");
      tr.innerHTML = `
        <td>${o.id}</td>
        <td>${o.customer_name || ""}</td>
        <td>${o.customer_email || ""}</td>
        <td>${o.customer_phone || ""}</td>
        <td>₦${o.amount ? o.amount.toFixed(2) : "0.00"}</td>
        <td>${itemsList}</td>
        <td>${o.created_at || ""}</td>
      `;
      tbody.appendChild(tr);
    });
  }

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

    tbody.querySelectorAll(".save-btn").forEach((b) =>
      b.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        const row = e.target.closest("tr");
        const name = row.querySelector(".name").value;
        const price = parseFloat(row.querySelector(".price").value) || 0;
        const colors = row
          .querySelector(".colors")
          .value.split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        await fetch("/api/products/" + id, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, price, image: "", colors }),
        });
        load();
      }),
    );

    tbody.querySelectorAll(".del-btn").forEach((b) =>
      b.addEventListener("click", async (e) => {
        const id = e.target.dataset.id;
        if (!confirm("Delete product " + id + "?")) return;
        await fetch("/api/products/" + id, { method: "DELETE" });
        load();
      }),
    );
  }

  const createBtn = document.getElementById("create");
  if (createBtn)
    createBtn.addEventListener("click", async () => {
      const name = document.getElementById("name").value;
      const price = parseFloat(document.getElementById("price").value) || 0;
      const fileInput = document.getElementById("imageFile");
      let image = document.getElementById("image").value || "";
      if (fileInput && fileInput.files.length) {
        const fd = new FormData();
        fd.append("image", fileInput.files[0]);
        const r = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await r.json();
        if (r.ok && data.path) {
          image = data.path;
        } else {
          alert(data.error || "Image upload failed");
          return;
        }
      }
      const colors = document
        .getElementById("colors")
        .value.split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      if (!name) {
        alert("Please enter a product name");
        return;
      }
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, image, colors }),
      });
      document.getElementById("name").value = "";
      document.getElementById("price").value = "";
      document.getElementById("image").value = "";
      document.getElementById("colors").value = "";
      load();
    });

  const logoutLink = document.getElementById("admin-logout");
  if (logoutLink)
    logoutLink.addEventListener("click", async (e) => {
      e.preventDefault();
      await fetch("/api/logout", { method: "POST" });
      location.href = "/";
    });

  load();
  loadOrders();
}

// initialize page-specific handlers
document.addEventListener("DOMContentLoaded", () => {
  setupSignupPage();
  setupLoginPage();
  setupAdminPage();
});

// Delegated click handler (unchanged)
// ...

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
// --- Homepage products (Naira) ---
async function loadProductsHome() {
  const container = document.getElementById("product-container");
  if (!container) return;

  container.innerHTML = "Loading products...";

  try {
    const res = await fetch("/api/products");
    const products = await res.json();

    container.innerHTML = "";

    products.forEach((product) => {
      const div = document.createElement("div");
      div.className = "product-card";

      div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>₦${product.price}</p>
      `;

      container.appendChild(div);
    });
  } catch (err) {
    console.error("Failed to load products", err);
    container.innerHTML = "Could not load products.";
  }
}

loadProductsHome();
