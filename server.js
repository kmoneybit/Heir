const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const cors = require("cors");
const session = require("express-session");
const bcrypt = require("bcrypt");

const DB_FILE = path.join(__dirname, "data.db");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  }),
);

// Initialize DB
let dbExists = fs.existsSync(DB_FILE);
const db = new sqlite3.Database(DB_FILE);

db.serialize(() => {
  if (!dbExists) {
    db.run(`CREATE TABLE products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      price REAL,
      image TEXT,
      colors TEXT
    )`);

    db.run(`CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      password TEXT,
      role TEXT
    )`);
    // orders table stores JSON-encoded cart items and timestamp
    db.run(`CREATE TABLE orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      items TEXT,
      customer_email TEXT,
      customer_name TEXT,
      customer_address TEXT,
      customer_phone TEXT,
      amount REAL,
      status TEXT DEFAULT 'completed',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    const stmt = db.prepare(
      "INSERT INTO products (name, price, image, colors) VALUES (?,?,?,?)",
    );
    stmt.run(
      "Premium Straight",
      30.0,
      "/image/product-img6.jpg",
      JSON.stringify(["brown", "black", "gold", "grey"]),
    );
    stmt.run(
      "Glam Curls",
      45.0,
      "/image/product-img6.jpg",
      JSON.stringify(["black", "brown"]),
    );
    stmt.finalize();
    // seed admin user
    const pw = bcrypt.hashSync("admin123", 10);
    db.run("INSERT INTO users (email,password,role) VALUES (?,?,?)", [
      "admin@example.com",
      pw,
      "admin",
    ]);
  }
  // ensure users table has phone column (safe to run even if DB existed)
  db.run("ALTER TABLE users ADD COLUMN phone TEXT", (err) => {
    // ignore error if column exists
  });
  
  // ensure otps table exists for phone verification
  db.run(
    `CREATE TABLE IF NOT EXISTS otps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone TEXT,
    code TEXT,
    expires_at INTEGER
  )`,
    () => {
      // Check if products table is empty and seed if needed
      db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
        if (err || (row && row.count === 0)) {
          // Seed sample products if table is empty
          const stmt = db.prepare(
            "INSERT INTO products (name, price, image, colors) VALUES (?,?,?,?)",
          );
          stmt.run(
            "Premium Straight",
            30.0,
            "/image/product-img6.jpg",
            JSON.stringify(["brown", "black", "gold", "grey"]),
          );
          stmt.run(
            "Glam Curls",
            45.0,
            "/image/product-img6.jpg",
            JSON.stringify(["black", "brown"]),
          );
          stmt.run(
            "Natural Waves",
            35.0,
            "/image/product-img6.jpg",
            JSON.stringify(["black", "dark brown"]),
          );
          stmt.finalize();
        }
        
        // Start server only after DB is fully initialized
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log("Server running on port", PORT));
      });
    },
  );
});

// helper: send SMS using Twilio if configured, otherwise log
async function sendSms(to, message) {
  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_TOKEN;
  const from = process.env.TWILIO_FROM;
  if (accountSid && authToken && from) {
    try {
      const twilio = require("twilio")(accountSid, authToken);
      await twilio.messages.create({ body: message, from, to });
      return true;
    } catch (e) {
      console.error("Twilio send error", e.message);
      return false;
    }
  }
  console.log(`SMS to ${to}: ${message}`);
  return true;
}

// send OTP for phone signup
app.post("/api/send-otp", async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ error: "Missing phone" });
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = Date.now() + 5 * 60 * 1000; // 5 minutes
  db.run(
    "INSERT INTO otps (phone,code,expires_at) VALUES (?,?,?)",
    [phone, code, expires],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      sendSms(phone, `Your verification code is ${code}`)
        .then(() => res.json({ ok: true }))
        .catch(() => res.status(500).json({ error: "Failed to send SMS" }));
    },
  );
});

// verify OTP and create/log-in user
app.post("/api/verify-otp", async (req, res) => {
  const { phone, code, password } = req.body;
  if (!phone || !code) return res.status(400).json({ error: "Missing fields" });
  db.get(
    "SELECT * FROM otps WHERE phone=? AND code=? ORDER BY id DESC LIMIT 1",
    [phone, code],
    async (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(400).json({ error: "Invalid code" });
      if (Date.now() > row.expires_at)
        return res.status(400).json({ error: "Code expired" });
      // create or update user with this phone
      try {
        if (password) {
          const hash = await bcrypt.hash(password, 10);
          db.run(
            'INSERT OR REPLACE INTO users (email,password,role,phone) VALUES ((SELECT email FROM users WHERE phone=?),?,"user",?)',
            [phone, hash, phone],
            function (err) {
              // fallback insert if above didn't create
              if (err) {
                db.run(
                  "INSERT INTO users (phone,password,role) VALUES (?,?,?)",
                  [phone, hash, "user"],
                  function (e) {
                    if (e) return res.status(500).json({ error: e.message });
                    req.session.user = { id: this.lastID, phone, role: "user" };
                    return res.json({ ok: true });
                  },
                );
              } else {
                // find the user id
                db.get(
                  "SELECT * FROM users WHERE phone=?",
                  [phone],
                  (er, u) => {
                    if (er) return res.status(500).json({ error: er.message });
                    req.session.user = {
                      id: u.id,
                      phone: u.phone,
                      role: u.role,
                    };
                    return res.json({ ok: true });
                  },
                );
              }
            },
          );
        } else {
          // create user without password
          db.run(
            "INSERT INTO users (phone,role) VALUES (?,?)",
            [phone, "user"],
            function (err) {
              if (err) {
                // if user exists, just log them in
                db.get(
                  "SELECT * FROM users WHERE phone=?",
                  [phone],
                  (er, u) => {
                    if (er) return res.status(500).json({ error: er.message });
                    req.session.user = {
                      id: u.id,
                      phone: u.phone,
                      role: u.role,
                    };
                    return res.json({ ok: true });
                  },
                );
              } else {
                req.session.user = { id: this.lastID, phone, role: "user" };
                return res.json({ ok: true });
              }
            },
          );
        }
      } catch (e) {
        return res.status(500).json({ error: e.message });
      }
    },
  );
});

// update login to accept email or phone
app.post("/api/login", (req, res) => {
  const { email, password, phone } = req.body;
  if ((!email && !phone) || !password)
    return res.status(400).json({ error: "Missing fields" });
  const lookup = email ? ["email", email] : ["phone", phone];
  db.get(
    `SELECT * FROM users WHERE ${lookup[0]}=?`,
    [lookup[1]],
    async (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) return res.status(400).json({ error: "Invalid credentials" });
      if (!user.password)
        return res
          .status(400)
          .json({ error: "No password set for this account" });
      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return res.status(400).json({ error: "Invalid credentials" });
      req.session.user = {
        id: user.id,
        email: user.email,
        phone: user.phone,
        role: user.role,
      };
      res.json({
        id: user.id,
        email: user.email,
        phone: user.phone,
        role: user.role,
      });
    },
  );
});

// APIs
app.get("/api/products", (req, res) => {
  db.all("SELECT * FROM products", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    const out = rows.map((r) => ({
      ...r,
      colors: JSON.parse(r.colors || "[]"),
    }));
    res.json(out);
  });
});

// Authentication endpoints
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Missing fields" });
  try {
    const hash = await bcrypt.hash(password, 10);
    db.run(
      "INSERT INTO users (email,password,role) VALUES (?,?,?)",
      [email, hash, "user"],
      function (err) {
        if (err)
          return res.status(400).json({ error: "Email already registered" });
        // set session
        req.session.user = { id: this.lastID, email, role: "user" };
        res.json({ id: this.lastID });
      },
    );
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/logout", (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

// Admin protected page
app.get("/admin", (req, res) => {
  if (req.session && req.session.user && req.session.user.role === "admin") {
    return res.sendFile(path.join(__dirname, "admin.html"));
  }
  return res.sendFile(path.join(__dirname, "admin-login.html"));
});

function requireAdmin(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === "admin")
    return next();
  return res.status(403).json({ error: "Admin only" });
}

app.post("/api/products", requireAdmin, (req, res) => {
  const { name, price, image, colors } = req.body;
  const colorsStr = JSON.stringify(colors || []);
  db.run(
    "INSERT INTO products (name, price, image, colors) VALUES (?,?,?,?)",
    [name, price, image, colorsStr],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    },
  );
});

// orders API
app.get("/api/orders", requireAdmin, (req, res) => {
  db.all("SELECT * FROM orders ORDER BY created_at DESC", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    // parse JSON items for convenience
    const out = rows.map((r) => ({
      id: r.id,
      items: JSON.parse(r.items || "[]"),
      created_at: r.created_at,
    }));
    res.json(out);
  });
});

app.post("/api/orders", async (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items) || items.length === 0)
    return res.status(400).json({ error: "No items provided" });
  const itemsStr = JSON.stringify(items);
  db.run("INSERT INTO orders (items) VALUES (?)", [itemsStr], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID });
  });
});

// endpoint for uploading product images
app.post("/api/upload", requireAdmin, upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  // the file has been stored in image/ directory
  const relativePath = "/image/" + req.file.filename;
  res.json({ path: relativePath });
});

app.put("/api/products/:id", requireAdmin, (req, res) => {
  const { id } = req.params;
  const { name, price, image, colors } = req.body;
  const colorsStr = JSON.stringify(colors || []);
  db.run(
    "UPDATE products SET name=?, price=?, image=?, colors=? WHERE id=?",
    [name, price, image, colorsStr, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ changes: this.changes });
    },
  );
});

// checkout endpoint - process payment and create order
app.post("/api/checkout", async (req, res) => {
  const {
    items,
    customer_email,
    customer_name,
    customer_address,
    customer_phone,
    card_number,
    amount,
  } = req.body;

  if (
    !items ||
    !Array.isArray(items) ||
    items.length === 0 ||
    !customer_email ||
    !customer_name ||
    !customer_address ||
    !customer_phone ||
    !card_number ||
    !amount
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Simple payment simulation - in production use Stripe, PayPal, etc.
  // For now, accept any card ending in valid digits
  if (!/^\d{4}$/.test(card_number)) {
    return res.status(400).json({ error: "Invalid card number" });
  }

  const itemsStr = JSON.stringify(items);
  db.run(
    `INSERT INTO orders (items, customer_email, customer_name, customer_address, customer_phone, amount, status)
     VALUES (?, ?, ?, ?, ?, ?, 'completed')`,
    [
      itemsStr,
      customer_email,
      customer_name,
      customer_address,
      customer_phone,
      amount,
    ],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ order_id: this.lastID, status: "completed" });
    },
  );
});

  const { id } = req.params;
  db.run("DELETE FROM products WHERE id=?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ changes: this.changes });
  });
});
