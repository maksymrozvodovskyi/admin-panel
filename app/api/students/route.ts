import { NextResponse } from 'next/server'
import students from '@/lib/db/students.json'

export async function GET() {
	return NextResponse.json(students)
}
