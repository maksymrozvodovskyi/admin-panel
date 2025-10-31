import Link from 'next/link'
import { getStudents } from '@/lib/api/data'
import type { Student } from '@/types/student'

export default async function StudentsPage() {
	const students: Student[] = await getStudents()

	return (
		<section className='bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden'>
			<h1 className='text-2xl font-semibold text-gray-800 p-6'>List of Students</h1>

			<table className='min-w-full border-collapse'>
				<thead className='bg-gray-100 border-b'>
					<tr>
						<th className='px-4 py-2 border'>ID</th>
						<th className='px-4 py-2 border'>Name</th>
						<th className='px-4 py-2 border'>Group</th>
						<th className='px-4 py-2 border'>Age</th>
						<th className='px-4 py-2 border'>Email</th>
					</tr>
				</thead>
				<tbody>
					{students.map(student => (
						<tr key={student.id} className='hover:bg-gray-50 border-b'>
							<td className='px-4 py-2 border'>{student.id}</td>
							<td className='px-4 py-2 border'>
								<Link href={`/dashboard/students/${student.id}`} className='text-blue-600 hover:underline'>
									{student.name}
								</Link>
							</td>
							<td className='px-4 py-2 border'>{student.group}</td>
							<td className='px-4 py-2 border'>{student.age}</td>
							<td className='px-4 py-2 border'>{student.email}</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	)
}
