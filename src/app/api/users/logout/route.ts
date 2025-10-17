import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  try {
    (await cookies()).delete("jwtToken");
    return NextResponse.json({ message: "the user logout " }, { status: 200 });
  } catch (error) {
    NextResponse.json(
      { message: "the internal server error" },
      { status: 500 }
    );
  }
}
