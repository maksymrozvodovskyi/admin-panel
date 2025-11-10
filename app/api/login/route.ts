import { NextResponse } from 'next/server'
import admins from '@/lib/db/admins.json'

export async function POST(request: Request) {
	try {
		const { email, password } = await request.json()

		const admin = admins.find(a => a.email === email && a.password === password)
		if (!admin) {
			return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 })
		}

		const response = NextResponse.json({
			success: true,
			admin: { id: admin.id, name: admin.name, email: admin.email },
		})

		response.cookies.set(
			'admin_session',
			JSON.stringify({
				id: admin.id,
				email: admin.email,
				name: admin.name,
			}),
			{
				httpOnly: true,
				sameSite: 'strict',
				path: '/',
				maxAge: 60 * 60 * 24,
			}
		)

		return response
	} catch (error) {
		console.error('Login error:', error)
		return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
	}
}
