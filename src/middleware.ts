import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeToken } from './utils/decode';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get('access-token');
  const decoded = decodeToken(token || '');

  // if (url.pathname === '/products') {
  //   url.pathname = '/products/list';
  //   return NextResponse.redirect(new URL(url.href));
  // }

  if (
    (!token && url.pathname.includes('/admin')) ||
    (decoded?.role !== 'master_admin' &&
      decoded?.role !== 'admin' &&
      url.pathname.includes('/admin'))
  ) {
    return NextResponse.redirect(new URL('/404', req.nextUrl.origin));
  }

  if (!token && url.pathname === '/transaction') {
    return NextResponse.redirect(new URL('/404', req.nextUrl.origin));
  }

  if (token && url.pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.nextUrl.origin));
  }
}
