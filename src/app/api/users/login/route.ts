import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/utils/db";
import bcrypt from "bcryptjs";
import { LoginUser } from "@/utils/dtos";
import { LoginValidationSchema } from "@/utils/validation";
import { generateJWT, Set_Cookies } from "@/utils/generatetoken";
import { Jwtpayload } from "@/types/mytyps";
import { serialize } from "cookie";
import { Cookie } from "next/font/google";

export async function POST(request: NextRequest) {
  try {
    // 1) Parse the request body and validate with Zod
    const body = (await request.json()) as LoginUser;
    const parsed = LoginValidationSchema.safeParse(body);
    if (!parsed.success) {
      // You can return detailed errors if needed: parsed.error.flatten()
      return NextResponse.json(
        { message: "Validation failed" },
        { status: 400 }
      );
    }

    // 2) Find the user by email
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (!user) {
      // To reduce information disclosure, you can unify the message
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 3) Compare the provided password with the stored hash
    const isPasswordMatch = await bcrypt.compare(body.password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 4) Create the payload and issue the token
    // Set_Cookies  فانكشن تم وضعها في ملف
    //  generatetoken  ,cookies تستقبل  دالة انشاء التوكن

    const cookie = Set_Cookies({
      id: user.id,
      username: user.username,
      // Note the DB field name: it was "iSAdmin" in some of your previous code.
      // Adjust here to match your actual field.
      isAdmin: (user as any).isAdmin ?? (user as any).iSAdmin ?? false,
    });

    return NextResponse.json(
      {
        message: "Login successful",
        cookie,
      },
      { status: 200, headers: { "Set-Cookie": cookie } } // save the cookie
    );
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
