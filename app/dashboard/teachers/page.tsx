import { getTeachers } from '@/lib/api/data'
import TeachersTable from '@/components/TeachersTable'

export default async function TeachersPage() {
	const teachers = await getTeachers()
	return <TeachersTable data={teachers} />
}
