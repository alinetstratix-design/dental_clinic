import { NextResponse } from "next/server";
export function middleware(req) {
  const pass = process.env.ADMIN_PASSWORD;
  const deny = (m) => new NextResponse(m, { status: 401, headers: { "WWW-Authenticate": 'Basic realm="admin"' } });
  if (!pass) return new NextResponse("Admin locked. ADMIN_PASSWORD set karo.", { status: 403 });
  const h = req.headers.get("authorization") || "";
  if (!h.startsWith("Basic ")) return deny("Login required");
  const [, p] = atob(h.slice(6)).split(/:(.*)/s);
  return p === pass ? NextResponse.next() : deny("Wrong password");
}
export const config = { matcher: ["/admin", "/admin/:path*"] };
