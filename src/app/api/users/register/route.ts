import { prisma } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import { RegisterUser } from "@/utils/dtos";
import { registerValidationSchema } from "@/utils/validation";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateJWT, Set_Cookies } from "@/utils/generatetoken";
import { Jwtpayload } from "@/types/mytyps";
import { headers } from "next/headers";

// ✅ Register user API
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as RegisterUser;

    // ✅ Validate the request body
    const validation = registerValidationSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: validation.error.format(),
        },
        { status: 400 }
      );
    }

    // ✅ Hash the password before saving it
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(body.password, salt);

    // ✅ Check if a user with the same email already exists
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (user) {
      return NextResponse.json(
        { message: "This email is already registered" },
        { status: 400 }
      );
    }

    // ✅ Create a new user
    const newUser = await prisma.user.create({
      data: {
        id: body.id,
        username: body.username,
        email: body.email,
        password: hashpassword,
        isAdmin: body.isAdmin,
      },
      select: {
        username: true,
        email: true,
        id: true,
        isAdmin: true,
      },
    });

    // ✅ Cookies
    const cookie = Set_Cookies({
      id: newUser.id,
      username: newUser.username,
      isAdmin: newUser.isAdmin,
    });

    // ✅ Return new user + cookies
    return NextResponse.json(
      { newUser, message: "The register is success" },
      { status: 200, headers: { "Set-Cookie": cookie } }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const user = await prisma.user.findMany();
  return NextResponse.json(user, { status: 200 });
}
