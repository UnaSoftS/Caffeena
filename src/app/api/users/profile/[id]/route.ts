import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/utils/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "@/utils/verifayToken";
import { UpgradeHandler } from "next/dist/server/next";
import { UpdateUser } from "@/utils/Dtos";
import bcrypt from "bcryptjs";
import { id } from "zod/locales";

interface Props {
  params: { id: string };
}
/**
 *  @method  DELETE
 *  @route   ~/api/users/profile/:id
 *  @desc    Delete Profile
 *  @access  private (only user himself can delete his account)
 */
export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const iD_params = Number(params.id);
    if (!Number.isInteger(iD_params)) {
      return NextResponse.json({ message: "Invalid user id" }, { status: 400 });
    }

    const userFromToken = verifyToken(request); // يفك/يتحقق من التوكن
    if (!userFromToken) {
      return NextResponse.json(
        { message: "Missing or invalid token" },
        { status: 401 }
      );
    }

    // لا يُسمح بحذف حساب مستخدم آخر
    if (userFromToken.id !== iD_params) {
      return NextResponse.json(
        { message: "Forbidden: you cannot delete another user's account" },
        { status: 403 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: iD_params },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await prisma.user.delete({ where: { id: iD_params } });
    //يتبقى هنا اذ تم مسح المستخدم يتم مسح تعليقاته
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /api/users/profile/:id error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
//
//first thing get to token for jwt  its  crypt the token
//second make var to token

/**
 *  @method  GET
 *  @route   ~/api/users/profile/:id
 *  @desc    Get Profile By Id
 *  @access  private (only user himself can get his account/profile)
 */
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const id = Number(params.id);
    if (!Number.isInteger(id)) {
      return NextResponse.json({ message: "Invalid user id" }, { status: 400 });
    }

    const userFromToken = verifyToken(request);
    if (!userFromToken) {
      return NextResponse.json(
        { message: "Missing or invalid token" },
        { status: 401 }
      );
    }

    // السماح فقط لصاحب الحساب بالوصول
    if (userFromToken.id !== id) {
      return NextResponse.json(
        { message: "Access denied for this user id" },
        { status: 403 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        updatedAt: true,
        isAdmin: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("GET /api/users/profile/:id error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 *  @method   PUT
 *  @route   ~/api/users/profile/:id
 *  @desc    Update Profile By Id
 *  @access  private (only user himself can get his account/profile)
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const id = Number(params.id); //عمل متغير لتحويل  id  الى  number
    if (!Number.isInteger(id)) {
      return NextResponse.json({ message: "Invalid user id" }, { status: 400 });
    }

    const userFromToken = verifyToken(request); //  دالة انشاء التوكن وفك الشفرة
    if (!userFromToken) {
      return NextResponse.json(
        { message: "Missing or invalid token" },
        { status: 401 }
      );
    }

    // السماح فقط لصاحب الحساب بالوصول
    if (userFromToken.id !== id || userFromToken === null) {
      return NextResponse.json(
        { message: "Access denied for this user id" },
        { status: 403 }
      );
    }

    const user = await prisma.user.findUnique({ where: { id: id } });
    const body = (await request.json()) as UpdateUser;
    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(body.password, salt);
    }
    const UpdateUser = await prisma.user.update({
      where: { id: id },
      data: {
        username: body.usernam,
        password: body.password,
        email: body.email,
      },
    });
    const { password, ...other } = UpdateUser; //  الجميع ماعدا الباسورد

    return NextResponse.json({ ...other });
  } catch (error) {
    console.error("PUT /api/users/profile/:id error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
