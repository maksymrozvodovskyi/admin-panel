'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	flexRender,
	type SortingState,
	type CellContext,
} from '@tanstack/react-table'
import { useDebounce } from 'use-debounce'
import type { Teacher } from '@/types/teacher'
import { saveAs } from 'file-saver'
import Papa from 'papaparse'

export default function TeachersTable({ data }: { data: Teacher[] }) {
	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })
	const [sorting, setSorting] = useState<SortingState>([])
	const [search, setSearch] = useState('')

	const [debouncedSearch] = useDebounce(search, 400)

	const exportToCSV = () => {
		const csv = Papa.unparse(data)
		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
		saveAs(blob, 'teachers.csv')
	}

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
		state: {
			pagination,
			sorting,
			globalFilter: debouncedSearch,
		},
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		onGlobalFilterChange: setSearch,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		initialState: {
			pagination: { pageIndex: 0, pageSize: 5 },
		},
	})

	return (
		<section className='bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden'>
			<div className='flex flex-col md:flex-row justify-between md:items-center gap-4 p-4 md:p-6'>
				<h1 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 text-center md:text-left leading-tight'>
					List of Students
				</h1>

				<div className='flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto'>
					<input
						value={search}
						onChange={e => setSearch(e.target.value)}
						placeholder='Search...'
						className='border px-3 py-2 rounded-md text-sm w-full sm:w-60 md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-400'
					/>
					<button
						onClick={exportToCSV}
						className='h-10 px-4 border border-transparent rounded-md bg-blue-600 text-white 
						hover:bg-blue-700 active:bg-blue-800 transition-colors text-sm font-medium 
						flex-shrink-0 w-auto select-none'
					>
						Export CSV
					</button>
				</div>
			</div>

			<div className='overflow-x-auto'>
				<div className='min-w-[600px]'>
					<table className='w-full border-collapse border border-gray-200 text-sm md:text-base'>
						<thead className='bg-gray-100'>
							{table.getHeaderGroups().map(headerGroup => (
								<tr key={headerGroup.id}>
									{headerGroup.headers.map(header => (
										<th
											key={header.id}
											onClick={header.column.getToggleSortingHandler()}
											className='px-3 md:px-4 py-2 text-left border cursor-pointer select-none whitespace-nowrap text-gray-700 font-medium'
										>
											{flexRender(header.column.columnDef.header, header.getContext())}
										</th>
									))}
								</tr>
							))}
						</thead>
						<tbody>
							{table.getRowModel().rows.map(row => (
								<tr key={row.id} className='hover:bg-gray-50 border-b transition-colors'>
									{row.getVisibleCells().map(cell => (
										<td
											key={cell.id}
											className='px-3 md:px-4 py-2 border whitespace-nowrap text-gray-700 text-sm md:text-base'
										>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<div className='flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-3 p-4 border-t text-sm md:text-base'>
				<div className='flex items-center gap-2'>
					<button
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						className='px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100 active:bg-gray-200 transition-colors'
					>
						Prev
					</button>

					<span className='text-gray-600'>
						Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
					</span>

					<button
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
						className='px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-100 active:bg-gray-200 transition-colors'
					>
						Next
					</button>
				</div>

				<select
					value={table.getState().pagination.pageSize}
					onChange={e => table.setPageSize(Number(e.target.value))}
					className='px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400'
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
