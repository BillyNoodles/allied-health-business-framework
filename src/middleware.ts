import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rate limiting maps
const ipRequestCounts = new Map<string, number>()
const ipLastReset = new Map<string, number>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 100

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Rate limiting
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ||
    req.headers.get('x-real-ip') ||
    'unknown'
  const now = Date.now()
  const windowStart = ipLastReset.get(ip) || 0

  if (now - windowStart > RATE_LIMIT_WINDOW) {
    // Reset counter for new window
    ipRequestCounts.set(ip, 1)
    ipLastReset.set(ip, now)
  } else {
    // Increment counter
    const currentCount = ipRequestCounts.get(ip) || 0
    if (currentCount >= MAX_REQUESTS_PER_WINDOW) {
      return new NextResponse('Too Many Requests', { status: 429 })
    }
    ipRequestCounts.set(ip, currentCount + 1)
  }

  // Security headers
  const securityHeaders = new Headers(res.headers)
  securityHeaders.set('X-Frame-Options', 'DENY')
  securityHeaders.set('X-Content-Type-Options', 'nosniff')
  securityHeaders.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  securityHeaders.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  securityHeaders.set('X-XSS-Protection', '1; mode=block')

  // Content Security Policy
  securityHeaders.set('Content-Security-Policy', `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: blob: https:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `.replace(/\s+/g, ' ').trim())

  // CORS headers for API routes
  if (req.nextUrl.pathname.startsWith('/api/')) {
    securityHeaders.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_APP_URL || '*')
    securityHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    securityHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    securityHeaders.set('Access-Control-Max-Age', '86400')
  }

  // Authentication check for protected routes
  const { data: { session } } = await supabase.auth.getSession()

  // Protected routes
  const protectedPaths = ['/dashboard', '/assessment', '/results', '/sop-generator']
  const isProtectedPath = protectedPaths.some(path => req.nextUrl.pathname.startsWith(path))

  if (isProtectedPath && !session) {
    const redirectUrl = new URL('/auth', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  // Apply security headers to response
  const response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  })

  Object.entries(Object.fromEntries(securityHeaders.entries())).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 