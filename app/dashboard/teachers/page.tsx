export const dynamic = 'force-dynamic'

import { getTeachers } from '@/lib/api/data'
import TeachersClient from './TeachersClient'

export default async function TeachersPage() {
	const teachers = await getTeachers()
	return <TeachersClient data={teachers} />
}
