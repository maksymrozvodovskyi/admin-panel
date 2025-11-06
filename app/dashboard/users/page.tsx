'use client'

import { useState, useOptimistic, startTransition } from 'react'
import { deleteUserRequest } from '@/lib/api/users'

export default function UsersPage() {
	const [users, setUsers] = useState([
		{ id: 1, name: 'Alice' },
		{ id: 2, name: 'Bob' },
		{ id: 3, name: 'Charlie' },
	])

	const [optimisticUsers, removeUserOptimistic] = useOptimistic(users, (state, id: number) =>
		state.filter(u => u.id !== id)
	)

	async function handleDelete(id: number) {
		startTransition(() => removeUserOptimistic(id))

		startTransition(async () => {
			try {
				const res = await deleteUserRequest(id)
				if (res.success) {
					setUsers(prev => prev.filter(u => u.id !== id))
				} else {
					throw new Error('Server error')
				}
			} catch (err) {
				setUsers(prev => {
					const deleted = users.find(u => u.id === id)
					return deleted ? [...prev, deleted] : prev
				})
			}
		})
	}

	return (
		<div className='p-6'>
			<h2 className='text-xl font-semibold mb-4'>Users</h2>
			<ul className='space-y-2'>
				{optimisticUsers.map(u => (
					<li key={u.id} className='flex justify-between border p-2 rounded transition'>
						<span>{u.name}</span>
						<button
							onClick={() => handleDelete(u.id)}
							className='bg-red-100 text-red-600 px-2 py-1 rounded hover:bg-red-200'
						>
							Delete
						</button>
					</li>
				))}
			</ul>
		</div>
	)
}
