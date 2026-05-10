import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl;
  const hostname = req.headers.get('host');
  const path = url.pathname;

  // חילוץ הסאב-דומיין
  const subdomain = hostname.split('.')[0];

  // אם הגולש הגיע מ-form או מ-lab, ננתב אותו לתיקיית ה-lab שבתוך subdomains
  if (subdomain === 'form' || subdomain === 'lab') {
    return NextResponse.rewrite(new URL(`/subdomains/lab${path}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // מבצע בדיקה על כל הנתיבים חוץ מקבצי מערכת ותמונות
    '/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
};