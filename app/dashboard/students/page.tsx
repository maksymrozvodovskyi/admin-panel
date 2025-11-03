import { getStudents } from '@/lib/api/data'
import StudentsTable from '@/components/StudentsTable'

export default async function StudentsPage() {
	const students = await getStudents()

	return <StudentsTable data={students} />
}
