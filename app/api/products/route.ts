import { NextResponse } from "next/server";
import { db } from "../data";

// GET all products
export async function GET() {
  return NextResponse.json(db.products);
}

// POST a new product
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, image, colors } = body;
    
    if (!name || !price) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const product = {
      id: Date.now(),
      name,
      price,
      image: image || "/image/hair-product.jpg",
      colors: colors || [],
    };

    db.products.push(product);
    return NextResponse.json(product, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
