import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { resolveDomainRouting } from '@/lib/domain-routing'

export function proxy(request: NextRequest) {
  const forwardedHost = request.headers.get('x-forwarded-host')
  const host = request.headers.get('host')
  const decision = resolveDomainRouting({
    hostname: forwardedHost ?? host ?? request.nextUrl.hostname,
    pathname: request.nextUrl.pathname,
    search: request.nextUrl.search,
  })

  if (decision.type === 'redirect') {
    return NextResponse.redirect(decision.destination, 308)
  }

  if (decision.type === 'rewrite') {
    const destination = request.nextUrl.clone()
    destination.pathname = decision.pathname
    return NextResponse.rewrite(destination)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
