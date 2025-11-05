'use client'

import { useState } from 'react'
import {
	useReactTable,
	getCoreRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	getFilteredRowModel,
	flexRender,
	type SortingState,
	type ColumnDef,
} from '@tanstack/react-table'
import { useDebounce } from '@/hooks/useDebounce'

type TableProps<T extends object> = {
	title?: string
	data: T[]
	columns: ColumnDef<T, any>[]
	csvName?: string
}

export default function Table<T extends object>({
	title = 'Table',
	data,
	columns,
	csvName = 'data.csv',
}: TableProps<T>) {
	const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })
	const [sorting, setSorting] = useState<SortingState>([])
	const [search, setSearch] = useState('')
	const debouncedSearch = useDebounce(search, 300)

	const exportToCSV = (data: any[], fileName = 'data.csv') => {
		if (!data.length) return

		const headers = Object.keys(data[0]).join(',')
		const rows = data.map(row =>
			Object.values(row)
				.map(value => `"${String(value).replace(/"/g, '""')}"`)
				.join(',')
		)
		const csv = [headers, ...rows].join('\n')

		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
		const url = URL.createObjectURL(blob)
		const link = document.createElement('a')
		link.href = url
		link.download = fileName
		link.click()
		URL.revokeObjectURL(url)
	}

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
	})

	return (
		<section className='bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden'>
			<div className='flex flex-col md:flex-row justify-between md:items-center gap-4 p-4 md:p-6'>
				<h2 className='text-lg sm:text-xl md:text-2xl font-semibold text-gray-800'>{title}</h2>

				<div className='flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto'>
					<input
						value={search}
						onChange={e => setSearch(e.target.value)}
						placeholder='Search...'
						className='border px-3 py-2 rounded-md text-sm w-full sm:w-60 md:w-72 focus:outline-none focus:ring-2 focus:ring-blue-400'
					/>
					<button
						onClick={() => exportToCSV(data, csvName)}
						className='h-10 px-4 rounded-md bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-colors text-sm font-medium'
					>
						Export CSV
					</button>
				</div>
			</div>

			<div className='overflow-x-auto'>
				<table className='min-w-full border-collapse border border-gray-200 text-sm md:text-base'>
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
						{table.getRowModel().rows.length ? (
							table.getRowModel().rows.map(row => (
								<tr key={row.id} className='hover:bg-gray-50 border-b transition-colors'>
									{row.getVisibleCells().map(cell => (
										<td key={cell.id} className='px-3 md:px-4 py-2 border whitespace-nowrap text-gray-700'>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</td>
									))}
								</tr>
							))
						) : (
							<tr>
								<td colSpan={columns.length} className='text-center py-6 text-gray-500'>
									No data available
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			<div className='flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-3 p-4 border-t text-sm'>
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
