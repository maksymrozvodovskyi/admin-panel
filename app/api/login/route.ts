import { NextResponse } from 'next/server'
import admins from '@/lib/db/admins.json'

export async function POST(request: Request) {
	try {
		const { email, password } = await request.json()

		const admin = admins.find(a => a.email === email && a.password === password)

		if (!admin) {
			return NextResponse.json({ success: false, message: 'Invalid email or password' }, { status: 401 })
		}

		return NextResponse.json({
			success: true,
			admin: { id: admin.id, name: admin.name, email: admin.email },
		})
	} catch (error) {
		console.error('Login error:', error)
		return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
	}
}
