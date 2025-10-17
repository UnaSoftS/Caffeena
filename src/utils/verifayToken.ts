import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Jwtpayload } from "@/types/mytyps";
//This function his function open the encrypt
// وظيفة هذه الدالة فتح تشفير الدالة

export function verifyToken(request: NextRequest): Jwtpayload | null {
  try {
    const jwtToken = request.cookies.get("jwtToken");
    const token = jwtToken?.value as string;
    if (!token) return null;
    const privatekey = process.env.JWT_SECRET as string;
    const userFromToken = jwt.verify(token, privatekey) as Jwtpayload;
    return userFromToken;
  } catch (error) {
    return null;
  }
}
