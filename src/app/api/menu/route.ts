import { NextRequest, NextResponse } from "next/server";
import { Menu } from "@prisma/client";
import { prisma } from "@/utils/db";

// GET /api/menu
export async function GET(request: NextRequest) {
  try {
    // جلب البيانات من قاعدة البيانات
    const menuItems = await prisma.menu.findMany();

    return NextResponse.json(menuItems, { status: 200 });
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return NextResponse.json(
      { error: "Failed to fetch menu items" },
      { status: 500 }
    );
  }
}

// POST /api/menu
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Menu;

    const newMenuItem = await prisma.menu.create({
      data: {
        name: body.name,
        price: body.price,
        category: body.category,
        image: body.image,
      },
    });

    // إرجاع البيانات الجديدة إلى المستخدم
    // (أي أنك ترغب في إرجاع البيانات الجديدة إلى
    return NextResponse.json(newMenuItem, { status: 201 });
  } catch (error) {
    console.error("Error creating menu item:", error);
    return NextResponse.json(
      { error: "Failed to create menu item" },
      { status: 500 }
    );
  }
}
