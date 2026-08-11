import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const AUTH_COOKIE = 'funlingi_auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAuth = request.cookies.get(AUTH_COOKIE)?.value === '1';

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/robots.txt') ||
    pathname.includes('.') // static files
  ) {
    if (pathname.startsWith('/login') && hasAuth) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/';
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
  }

  if (!hasAuth) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
