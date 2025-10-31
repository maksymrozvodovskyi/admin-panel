import { getStudents } from '@/lib/api/data'
import type { Student } from '@/types/student'

type Props = {
	params: Promise<{ id: string }>
}

export default async function StudentDetailsPage({ params }: Props) {
	const { id } = await params

	const students: Student[] = await getStudents()

	const student = students.find(s => s.id === Number(id))

	if (!student) {
		return <p className='text-xl font-semibold'>Student not found</p>
	}

	return (
		<section className='bg-white border border-gray-300 rounded-xl shadow-sm p-8 max-w-2xl mx-auto'>
			<div className='flex items-center justify-between mb-6'>
				<h1 className='text-2xl font-semibold text-gray-800'>Student {student.name} Details</h1>
			</div>

			<ul className='space-y-2 text-gray-700'>
				<li>
					<span className='font-medium'>Name:</span> {student.name}
				</li>
				<li>
					<span className='font-medium'>Group:</span> {student.group}
				</li>
				<li>
					<span className='font-medium'>Age:</span> {student.age}
				</li>
				<li>
					<span className='font-medium'>Email:</span> {student.email}
				</li>
			</ul>
		</section>
	)
}
