// API route: login-secure với kiểm tra số lần đăng nhập sai theo IP
import { NextResponse } from "next/server";

// Lưu trữ tạm thời số lần đăng nhập sai và thời gian chặn theo IP (chỉ dùng demo, không dùng production)
const attempts: Record<string, { count: number; lastFail: number; blockedUntil?: number }> = {};
const MAX_ATTEMPTS = 5;
const BLOCK_TIME = 60; // 1 phút (giây)

function getClientIp(req: Request) {
  // Next.js edge API: lấy IP từ header
  // X-Forwarded-For có thể là "ip1, ip2, ..."
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  // fallback (không chính xác lắm)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (req as any).ip || "unknown";
}

export async function POST(request: Request) {
  const { username, password } = await request.json();
  const ip = getClientIp(request);
  const now = Math.floor(Date.now() / 1000);
  if (!attempts[ip]) attempts[ip] = { count: 0, lastFail: 0 };
  // Nếu đã hết thời gian block thì reset lại attempts
  if (attempts[ip].blockedUntil && now >= attempts[ip].blockedUntil) {
    attempts[ip] = { count: 0, lastFail: 0 };
  }
  // Nếu đang bị block
  if (attempts[ip].blockedUntil && now < attempts[ip].blockedUntil) {
    return NextResponse.json({
      success: false,
      message: "Too many attempts.",
      wait: attempts[ip].blockedUntil - now,
      remaining: 0,
    }, { status: 429 });
  }
  // Kiểm tra tài khoản
  if (username === "admin" && password === "Admin12345") {
    // Đăng nhập thành công, reset đếm
    attempts[ip] = { count: 0, lastFail: 0 };
    const response = NextResponse.json({ success: true });
    response.cookies.set("isLoggedIn", "true", {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60,
    });
    return response;
  } else {
    // Đăng nhập sai
    attempts[ip].count++;
    attempts[ip].lastFail = now;
    if (attempts[ip].count >= MAX_ATTEMPTS) {
      attempts[ip].blockedUntil = now + BLOCK_TIME;
      return NextResponse.json(
        {
          success: false,
          message: `Too many attempts.`,
          wait: BLOCK_TIME,
          remaining: 0,
        },
        { status: 429 }
      );
    }
    return NextResponse.json({
      success: false,
      message: "Invalid username or password.",
      remaining: MAX_ATTEMPTS - attempts[ip].count,
    }, { status: 401 });
  }
}
