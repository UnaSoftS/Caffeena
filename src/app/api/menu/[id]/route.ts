import { NextRequest, NextResponse } from "next/server";

import { Menu } from "@prisma/client";
import { prisma } from "@/utils/db";

interface props {
  params: { id: "string" };
}

//GET function

export async function GET(request: Request, { params }: props) {
  try {
    const menuItem = await prisma.menu.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!menuItem) {
      return NextResponse.json({ message: "not found" }, { status: 404 });
    }
    return NextResponse.json(menuItem);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return NextResponse.json(
      { error: "Failed to fetch menu items" },
      { status: 500 }
    );
  }
}
export async function PUT(request: NextRequest, { params }: props) {
  try {
    const menuItem = await prisma.menu.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!menuItem) {
      return NextResponse.json({ message: "not found" }, { status: 404 });
    }
    const body = (await request.json()) as Menu;
    const Updatedmenu = await prisma.menu.update({
      where: { id: parseInt(params.id) },
      data: {
        name: body.name,
        price: body.price,
        category: body.category,
        image: body.image,
      },
    });
    return NextResponse.json(Updatedmenu, { status: 200 });
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return NextResponse.json(
      { error: "Failed to fetch menu items" },
      { status: 500 }
    );
  }
}

//DELETE
export async function DELETE(request: NextRequest, { params }: props) {
  try {
    const menuItem = prisma.menu.findUnique({
      where: { id: parseInt(params.id) },
    });
    if (!menuItem) {
      return NextResponse.json({ message: "not found" }, { status: 404 });
    }
    //هذه الدالة تقوم بمسح بقاعدة البيانات
    await prisma.menu.delete({ where: { id: parseInt(params.id) } });
    return NextResponse.json(
      { message: "the item is deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return NextResponse.json(
      { error: "Failed to fetch menu items" },
      { status: 500 }
    );
  }
}
