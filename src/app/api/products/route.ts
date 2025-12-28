import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      id: "1",
      name: "Handmade Wall Art",
      description: "Crafted with love",
      images: ["/placeholder.jpg"],
      category: "Decor",
    },
    {
      id: "2",
      name: "Wooden Table Decor",
      description: "Natural & minimal",
      images: ["/placeholder.jpg"],
      category: "Furniture",
    },
  ]);
}
