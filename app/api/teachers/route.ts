import { NextResponse } from 'next/server'
import teachers from '@/lib/db/teachers.json'

export async function GET() {
	return NextResponse.json(teachers)
}
