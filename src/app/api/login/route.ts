import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();
  if (username === "admin" && password === "Admin12345") {
    // Set a simple auth cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set("isLoggedIn", "true", {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60, // 1 hour
    });
    return response;
  }
  return NextResponse.json({ success: false, message: "Invalid username or password" }, { status: 401 });
}
