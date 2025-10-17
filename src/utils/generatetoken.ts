import { Jwtpayload } from "@/types/mytyps";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
//generate token
export function generateJWT(jtwPayload: Jwtpayload): string {
  const privatekey = process.env.JWT_SECRET as string;
  const token = jwt.sign(jtwPayload, privatekey, { expiresIn: "30h" });

  //هنا استخدمنا  process.evn للوصول للمتغير الموجوج بملف env
  //هنا تسطيع كتابة رقم او تحدد ساعات او ايام
  return token;
}

//cookies

export function Set_Cookies(JwtPayload: Jwtpayload): string {
  const token = generateJWT(JwtPayload);
  const cookie = serialize("jwtToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // development=http, production=https
    sameSite: "strict",
    path: "/", // make the cookie available to the whole app
    maxAge: 60 * 60 * 24 * 30,
  });
  return cookie;
}
