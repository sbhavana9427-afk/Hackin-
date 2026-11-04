import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const pw = process.env.ADMIN_PASSWORD;
  const auth = req.headers.get("authorization");
  if (pw && auth?.startsWith("Basic ")) {
    const [, pass] = atob(auth.slice(6)).split(":");
    if (pass === pw) return NextResponse.next();
  }
  return new NextResponse("Admin access required", { status: 401, headers: { "WWW-Authenticate": 'Basic realm="NammaScholar admin"' } });
}
export const config = { matcher: ["/admin/:path*"] };
