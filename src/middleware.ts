import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeToken } from './utils/decode';
import { jwtDecrypt } from 'jose';
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  if (url.pathname === '/products') {
    url.pathname = '/products/list';
    return NextResponse.redirect(new URL(url.href)); // Sử dụng `new URL` để tạo URL tuyệt đối.
  }

  const token = req.cookies.get('access-token');
  const decoded = decodeToken(token || '');

  if (
    (!token && url.pathname.includes('/admin')) ||
    (decoded?.role !== 'master_admin' &&
      decoded?.role !== 'admin' &&
      url.pathname.includes('/admin'))
  ) {
    return NextResponse.redirect(new URL('/404', req.nextUrl.origin));
  }
}
