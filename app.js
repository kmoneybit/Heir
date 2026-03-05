// ================= END OF THEME TOGGLE CODE =================

const hamIcon = document.querySelector(".ham_icon");
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
    <p>$${p.price}</p>
    <button class="add-cart-btn">Add to cart</button>
    <p>colors</p>
    ${colorsHtml}
  `;
  return card;
}

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
    // friendly message with a hint and fallback sample
    container.innerHTML = `
      <p style="color:#666">Could not load products from ${PRODUCTS_URL}.</p>
      <p style="color:#666">Make sure the dev server is running: <code>npm start</code></p>
    `;
    // fallback sample products so the page isn't blank
    const fallback = [
      {
        name: "Sample Straight",
        price: 29.99,
        image: "/image/product-img6.jpg",
        colors: ["#000", "#8b4513"],
      },
      {
        name: "Sample Curls",
        price: 39.99,
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
});

function setupHomeSignup() {
  const section = document.querySelector("#sign-up");
  if (!section) return;
  const methodInputs = section.querySelectorAll('input[name="method"]');
  const emailBlock = section.querySelector("#email-block");
  const phoneBlock = section.querySelector("#phone-block");
  methodInputs.forEach((i) =>
    i.addEventListener("change", () => {
      if (
        section.querySelector('input[name="method"]:checked').value === "phone"
      ) {
        emailBlock.style.display = "none";
        phoneBlock.style.display = "block";
      } else {
        emailBlock.style.display = "block";
        phoneBlock.style.display = "none";
      }
    }),
  );

  // homepage send OTP
  const sendBtn = section.querySelector("#home-send-otp");
  if (sendBtn)
    sendBtn.addEventListener("click", async () => {
      const phone = section.querySelector("#home-phone").value.trim();
      if (!phone) {
        alert("Enter phone number");
        return;
      }
      try {
        const res = await fetch("/api/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone }),
        });
        const data = await res.json();
        if (!res.ok) return alert(data.error || "Failed to send code");
        section.querySelector("#home-otp-area").style.display = "block";
        alert("Verification code sent");
      } catch (e) {
        console.error(e);
        alert("Send OTP error");
      }
    });

  // homepage verify OTP
  const verifyBtn = section.querySelector("#home-verify-otp");
  if (verifyBtn)
    verifyBtn.addEventListener("click", async () => {
      const phone = section.querySelector("#home-phone").value.trim();
      const code = section.querySelector("#home-otp-code").value.trim();
      const pwd = section.querySelector("#home-otp-password").value.trim();
      if (!phone || !code) {
        alert("Enter phone and code");
        return;
      }
      try {
        const res = await fetch("/api/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, code, password: pwd || undefined }),
        });
        const data = await res.json();
        if (!res.ok) return alert(data.error || "Verification failed");
        // success — user is logged in via session
        location.href = "/";
      } catch (e) {
        console.error(e);
        alert("Verification error");
      }
    });

  // homepage email register handled by existing delegated handler when user clicks #home-signup (class signup_button)
}

// Signup page (signup.html) handlers previously inline
function setupSignupPage() {
  const section = document.querySelector("#sign-up");
  if (!section) return;
  const methodInputs = section.querySelectorAll('input[name="method"]');
  const emailBlock = document.getElementById("email-block");
  const phoneBlock = document.getElementById("phone-block");
  methodInputs.forEach((i) =>
    i.addEventListener("change", () => {
      if (
        document.querySelector('input[name="method"]:checked').value === "phone"
      ) {
        emailBlock.style.display = "none";
        phoneBlock.style.display = "block";
      } else {
        emailBlock.style.display = "block";
        phoneBlock.style.display = "none";
      }
    }),
  );

  const signupBtn = document.getElementById("signup");
  if (signupBtn)
    signupBtn.addEventListener("click", async () => {
      if (
        document.querySelector('input[name="method"]:checked').value === "phone"
      )
        return;
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const msg = document.getElementById("msg");
      if (!email || !password) {
        if (msg) {
          msg.style.color = "red";
          msg.textContent = "Provide email and password";
        }
        return;
      }
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (msg) {
          msg.style.color = "red";
          msg.textContent = data.error || "Registration failed";
        }
        return;
      }
      if (msg) {
        msg.style.color = "green";
        msg.textContent = "Registered and logged in";
      }
      setTimeout(() => (location.href = "/"), 900);
    });

  const sendOtp = document.getElementById("send-otp");
  if (sendOtp)
    sendOtp.addEventListener("click", async () => {
      const phone = document.getElementById("phone").value.trim();
      if (!phone) {
        alert("Enter phone number");
        return;
      }
      const res = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Failed to send code");
        return;
      }
      document.getElementById("otp-area").style.display = "block";
      alert("Verification code sent");
    });

  const verifyOtp = document.getElementById("verify-otp");
  if (verifyOtp)
    verifyOtp.addEventListener("click", async () => {
      const phone = document.getElementById("phone").value.trim();
      const code = document.getElementById("otp-code").value.trim();
      const pwd = document.getElementById("otp-password").value.trim();
      if (!phone || !code) {
        alert("Enter phone and code");
        return;
      }
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code, password: pwd || undefined }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Verification failed");
        return;
      }
      location.href = "/";
    });
}

// Generic login page handler for /login.html and /admin-login.html
function setupLoginPage() {
  const btn = document.getElementById("login");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        document.getElementById("msg").textContent =
          data.error || "Login failed";
        return;
      }
      // if admin, redirect to /admin otherwise home
      if (data.role === "admin") location.href = "/admin";
      else location.href = "/";
    } catch (e) {
      console.error(e);
      alert("Login error");
    }
  });
}

// Admin page setup (manage products)
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
      const image = document.getElementById("image").value || "";
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
}

// initialize page-specific handlers
document.addEventListener("DOMContentLoaded", () => {
  setupSignupPage();
  setupLoginPage();
  setupAdminPage();
});

// Signup handler for site sign-up form (index / signup pages)
document.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("signup_button")) return;
  // find sign-up inputs inside #sign-up section
  const section = document.querySelector("#sign-up");
  if (!section) return;
  const emailInput = section.querySelector(
    'input[type="text"], input[placeholder*="Email"]',
  );
  const passInput = section.querySelector('input[type="password"]');
  const email = emailInput ? emailInput.value.trim() : null;
  const password = passInput ? passInput.value.trim() : null;
  if (!email || !password) {
    alert("Please provide email and password");
    return;
  }
  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) return alert(data.error || "Registration failed");
    // on success, redirect to home
    location.href = "/";
  } catch (err) {
    console.error(err);
    alert("Registration error");
  }
});

// Login handler for homepage login section
document.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("login_button")) return;
  const section = document.querySelector("#login");
  if (!section) return;
  const emailInput = section.querySelector("#login-email");
  const passInput = section.querySelector("#login-password");
  const email = emailInput ? emailInput.value.trim() : null;
  const password = passInput ? passInput.value.trim() : null;
  if (!email || !password) {
    alert("Please provide email and password");
    return;
  }
  try {
    const res = await fetch(`${API_BASE}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) return alert(data.error || "Login failed");
    // reload to get session state
    location.href = "/";
  } catch (err) {
    console.error(err);
    alert("Login error");
  }
});

// Team Toggle Functionality
const teamToggleBtn = document.getElementById("team-toggle");
const teamContent = document.getElementById("team-content");

if (teamToggleBtn) {
  teamToggleBtn.addEventListener("click", () => {
    const isHidden = teamContent.style.display === "none";
    teamContent.style.display = isHidden ? "block" : "none";
    teamToggleBtn.textContent = isHidden ? "Hide Team" : "Show Team";
    teamToggleBtn.style.background = isHidden
      ? "linear-gradient(135deg, #ff7700 0%, #ff6600 100%)"
      : "linear-gradient(135deg, #ff8c00 0%, #ff7700 100%)";
  });
}
