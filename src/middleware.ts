import { NextResponse, NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get("jwtToken");
  const token = jwtToken?.value as string;

  if (!token) {
    return NextResponse.json(
      "The token is invalid The access Denaid message from middleware "
    );
    {
      status: 401;
    }
  }
}

export const config = {
  matcher: "/api/users/profile/:path*",
};
