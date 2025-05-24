import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Check for a simple auth cookie (for demo purposes)
  const isLoggedIn = request.cookies.get("isLoggedIn")?.value === "true";
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/403", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/home",
};
