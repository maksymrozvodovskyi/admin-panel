'use client'

import Link from 'next/link'
import { useReactTable, getCoreRowModel, flexRender, CellContext } from '@tanstack/react-table'
import type { Teacher } from '@/types/teacher'

export default function TeachersTable({ data }: { data: Teacher[] }) {
	const columns = [
		{ accessorKey: 'id', header: 'ID' },
		{
			accessorKey: 'name',
			header: 'Name',
			cell: ({ row }: CellContext<Teacher, unknown>) => (
				<Link href={`/dashboard/teachers/${row.original.id}`} className='text-blue-600 hover:underline'>
					{row.original.name}
				</Link>
			),
		},
		{ accessorKey: 'age', header: 'Age' },
		{ accessorKey: 'email', header: 'Email' },
		{ accessorKey: 'subject', header: 'Subject' },
	]

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<section className='bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden p-6'>
			<h1 className='text-2xl font-semibold mb-6 text-gray-800'>List of Teachers</h1>

			<div className='overflow-x-auto'>
				<table className='min-w-full border-collapse border border-gray-200'>
					<thead className='bg-gray-100'>
						{table.getHeaderGroups().map(headerGroup => (
							<tr key={headerGroup.id}>
								{headerGroup.headers.map(header => (
									<th key={header.id} className='px-4 py-2 text-left border'>
										{flexRender(header.column.columnDef.header, header.getContext())}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{table.getRowModel().rows.map(row => (
							<tr key={row.id} className='hover:bg-gray-50'>
								{row.getVisibleCells().map(cell => (
									<td key={cell.id} className='border px-4 py-2'>
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
