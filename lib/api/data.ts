import { api } from './api'
import type { Student } from '@/types/student'
import type { Teacher } from '@/types/teacher'

export async function getStudents(): Promise<Student[]> {
	const res = await api.get<Student[]>('/students')
	return res.data
}

export async function getTeachers(): Promise<Teacher[]> {
	const res = await api.get<Teacher[]>('/teachers')
	return res.data
}
