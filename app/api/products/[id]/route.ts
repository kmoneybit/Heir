import { NextResponse } from "next/server";
import { db } from "../../data";

// DELETE a product
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id, 10);
  
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  const initialLength = db.products.length;
  db.products = db.products.filter((p) => p.id !== id);

  if (db.products.length === initialLength) {
     return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

