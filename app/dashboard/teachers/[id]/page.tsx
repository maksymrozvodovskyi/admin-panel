import { getTeachers } from '@/lib/api/data'
import type { Teacher } from '@/types/teacher'

type Props = {
	params: Promise<{ id: string }>
}

export default async function TeacherDetailsPage({ params }: Props) {
	const { id } = await params

	const teachers: Teacher[] = await getTeachers()

	const teacher = teachers.find(t => t.id === Number(id))

	if (!teacher) {
		return <p className='text-xl font-semibold'>Teacher not found</p>
	}

	return (
		<section className='bg-white border border-gray-300 rounded-xl shadow-sm p-8 max-w-2xl mx-auto'>
			<div className='flex items-center justify-between mb-6'>
				<h1 className='text-2xl font-semibold text-gray-800'>Teacher {teacher.name} Details</h1>
			</div>

			<ul className='space-y-2 text-gray-700'>
				<li>
					<span className='font-medium'>Name:</span> {teacher.name}
				</li>
				<li>
					<span className='font-medium'>Age:</span> {teacher.age}
				</li>
				<li>
					<span className='font-medium'>Email:</span> {teacher.email}
				</li>
				<li>
					<span className='font-medium'>Subject:</span> {teacher.subject}
				</li>
			</ul>
		</section>
	)
}
