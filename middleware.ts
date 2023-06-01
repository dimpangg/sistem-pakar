import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const cookiesJwt = request.cookies.has("jwt");
  const path = request.nextUrl.pathname;

  const publicPaths = ["/login", "/", "/register"];

  if (cookiesJwt && publicPaths.includes(path)) {
    return NextResponse.redirect(new URL("/system/diagnose", request.url));
  } else if (!cookiesJwt && !publicPaths.includes(path)) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
