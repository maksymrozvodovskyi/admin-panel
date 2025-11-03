'use client'

import Link from 'next/link'
import { useReactTable, getCoreRowModel, flexRender, CellContext } from '@tanstack/react-table'
import type { Student } from '@/types/student'

export default function StudentsTable({ data }: { data: Student[] }) {
	const columns = [
		{ accessorKey: 'id', header: 'ID' },
		{
			accessorKey: 'name',
			header: 'Name',
			cell: ({ row }: CellContext<Student, unknown>) => (
				<Link href={`/dashboard/students/${row.original.id}`} className='text-blue-600 hover:underline'>
					{row.original.name}
				</Link>
			),
		},
		{ accessorKey: 'group', header: 'Group' },
		{ accessorKey: 'age', header: 'Age' },
		{ accessorKey: 'email', header: 'Email' },
	]

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<section className='bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden'>
			<h1 className='text-2xl font-semibold text-gray-800 p-6'>List of Students</h1>

			<div className='overflow-x-auto'>
				<table className='min-w-full border-collapse'>
					<thead className='bg-gray-100 border-b'>
						{table.getHeaderGroups().map(hg => (
							<tr key={hg.id}>
								{hg.headers.map(header => (
									<th key={header.id} className='px-4 py-2 border text-left'>
										{flexRender(header.column.columnDef.header, header.getContext())}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map(row => (
							<tr key={row.id} className='hover:bg-gray-50 border-b'>
								{row.getVisibleCells().map(cell => (
									<td key={cell.id} className='px-4 py-2 border'>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	)
}
