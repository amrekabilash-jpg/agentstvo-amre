import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Редирект-мап для старых URL (если есть)
  const redirectMap: Record<string, string> = {
    // Добавьте старые URL → новые URL если нужно
    // "/old-page": "/new-page",
  };

  if (redirectMap[pathname]) {
    const newPath = redirectMap[pathname];
    return NextResponse.redirect(
      new URL(newPath, request.nextUrl.origin),
      { status: 301 }
    );
  }

  // Убрать trailing slash
  if (pathname !== "/" && pathname.endsWith("/")) {
    return NextResponse.redirect(
      new URL(pathname.slice(0, -1), request.nextUrl.origin),
      { status: 301 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
