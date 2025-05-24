import { NextResponse } from "next/server";

export async function POST() {
  // Xóa cookie bằng cách đặt maxAge = 0
  const response = NextResponse.json({ success: true });
  response.cookies.set("isLoggedIn", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite: "lax",
  });
  return response;
}
