'use client'

import Table from '@/components/Table'
import Link from 'next/link'
import type { ColumnDef } from '@tanstack/react-table'
import type { Student } from '@/types/student'

export default function StudentsClient({ data }: { data: Student[] }) {
	const columns: ColumnDef<Student>[] = [
		{ accessorKey: 'id', header: 'ID' },
		{
			accessorKey: 'name',
			header: 'Name',
			cell: ({ row }) => (
				<Link href={`/dashboard/students/${row.original.id}`} className='text-blue-600 hover:underline'>
					{row.original.name}
				</Link>
			),
		},
		{ accessorKey: 'group', header: 'Group' },
		{ accessorKey: 'email', header: 'Email' },
	]

	return <Table title='Students List' data={data} columns={columns} csvName='students.csv' />
}
