import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl
	const session = req.cookies.get('admin_session')

	if (pathname.startsWith('/api/login')) {
		return NextResponse.next()
	}

	if (!session) {
		const url = req.nextUrl.clone()
		url.pathname = '/sign-in'
		return NextResponse.redirect(url)
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*'],
}
