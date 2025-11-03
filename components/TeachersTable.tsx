'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender, CellContext } from '@tanstack/react-table'
import type { Teacher } from '@/types/teacher'

export default function TeachersTable({ data }: { data: Teacher[] }) {
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 5,
	})

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
		state: { pagination },
		onPaginationChange: setPagination,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		initialState: {
			pagination: { pageIndex: 0, pageSize: 5 },
		},
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

			<div className='flex justify-center items-center gap-3 mt-4'>
				<button
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
					className='px-3 py-1 border rounded disabled:opacity-50'
				>
					Prev
				</button>

				<span className='text-gray-600'>
					Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
				</span>

				<button
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
					className='px-3 py-1 border rounded disabled:opacity-50'
				>
					Next
				</button>

				<select
					value={table.getState().pagination.pageSize}
					onChange={e => table.setPageSize(Number(e.target.value))}
					className='ml-4 px-2 py-1 border rounded'
				>
					{[5, 10, 20].map(size => (
						<option key={size} value={size}>
							{size} rows
						</option>
					))}
				</select>
			</div>
		</section>
	)
}
