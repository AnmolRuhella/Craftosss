import { NextRequest, NextResponse } from "next/server";
import { getProducts, addProduct } from "@/lib/products-store";

export async function GET() {
  try {
    const products = getProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const product = addProduct(body);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
