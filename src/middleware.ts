import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeToken } from './utils/decode';

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

  const res = NextResponse.next();

  // add the CORS headers to the response
  res.headers.append('Access-Control-Allow-Credentials', 'true');
  res.headers.append('Access-Control-Allow-Origin', '*'); // replace this your actual origin
  res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
  res.headers.append(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  );

  return res;
}
export const config = {
  matcher: '/api/:path*',
};
