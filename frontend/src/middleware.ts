import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { nextUrl } = request;

  const host = request.headers.get('host') || '';
  const protocol = request.headers.get('x-forwarded-proto') || 'http';
  const path = nextUrl.pathname;
  const fullUrl = `${protocol}://${host}${path}`;

  const response = NextResponse.next();

  response.headers.set('x-forwarded-url', fullUrl);
  return response;
}
