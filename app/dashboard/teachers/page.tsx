import Link from 'next/link'
import { getTeachers } from '@/lib/api/data'
import type { Teacher } from '@/types/teacher'

export default async function TeachersPage() {
	const teachers: Teacher[] = await getTeachers()

	return (
		<section className='bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden p-6'>
			<h1 className='text-2xl font-semibold mb-6 text-gray-800'>List of Teachers</h1>

			<table className='min-w-full border-collapse border border-gray-200'>
				<thead className='bg-gray-100'>
					<tr>
						<th className='px-4 py-2 text-left border'>ID</th>
						<th className='px-4 py-2 text-left border'>Name</th>
						<th className='px-4 py-2 text-left border'>Age</th>
						<th className='px-4 py-2 text-left border'>Email</th>
						<th className='px-4 py-2 text-left border'>Subject</th>
					</tr>
				</thead>
				<tbody>
					{teachers.map(teacher => (
						<tr key={teacher.id} className='hover:bg-gray-50'>
							<td className='border px-4 py-2'>{teacher.id}</td>
							<td className='border px-4 py-2'>
								<Link href={`/dashboard/teachers/${teacher.id}`} className='text-blue-600 hover:underline'>
									{teacher.name}
								</Link>
							</td>
							<td className='border px-4 py-2'>{teacher.age}</td>
							<td className='border px-4 py-2'>{teacher.email}</td>
							<td className='border px-4 py-2'>{teacher.subject}</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	)
}
