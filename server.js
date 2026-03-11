const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // serve your HTML, CSS, images

let products = []; // in-memory products

// GET all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// POST a new product
app.post("/api/products", (req, res) => {
  const { name, price, image, colors } = req.body;
  if (!name || !price) return res.status(400).json({ error: "Missing data" });

  const product = {
    id: Date.now(),
    name,
    price,
    image: image || "/image/hair-product.jpg",
    colors: colors || [],
  };

  products.push(product);
  res.json(product);
});

// DELETE a product
app.delete("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter((p) => p.id !== id);
  res.json({ success: true });
});

// Serve homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Serve admin page
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "admin.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
