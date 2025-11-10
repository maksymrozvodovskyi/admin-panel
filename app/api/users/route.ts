import { NextResponse } from 'next/server'

let users = [
	{ id: 1, name: 'Alice' },
	{ id: 2, name: 'Bob' },
	{ id: 3, name: 'Charlie' },
]

const delay = (ms: number) => new Promise(res => setTimeout(res, ms))

export async function GET() {
	return NextResponse.json(users)
}

export async function DELETE(req: Request) {
	const { id } = await req.json()
	await delay(5000)
	users = users.filter(u => u.id !== id)
	return NextResponse.json({ success: true })
}
