import { getStudents } from '@/lib/api/data'
import StudentsClient from './StudentsClient'

export default async function StudentsPage() {
	const students = await getStudents()
	return <StudentsClient data={students} />
}
