'use client'

import Table from '@/components/Table'
import Link from 'next/link'
import type { ColumnDef } from '@tanstack/react-table'
import type { Teacher } from '@/types/teacher'

export default function TeachersClient({ data }: { data: Teacher[] }) {
	const columns: ColumnDef<Teacher>[] = [
		{ accessorKey: 'id', header: 'ID' },
		{
			accessorKey: 'name',
			header: 'Name',
			cell: ({ row }) => (
				<Link href={`/dashboard/teachers/${row.original.id}`} className='text-blue-600 hover:underline'>
					{row.original.name}
				</Link>
			),
		},
		{ accessorKey: 'subject', header: 'Subject' },
		{ accessorKey: 'email', header: 'Email' },
	]

	return <Table title='Teachers List' data={data} columns={columns} csvName='teachers.csv' />
}
