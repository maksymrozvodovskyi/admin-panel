'use client'

import { useAuthStore } from '@/lib/store/authStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SignInPage() {
	const router = useRouter()
	const login = useAuthStore(state => state.login)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')

	const handleLogin = (e: React.FormEvent) => {
		e.preventDefault()

		const success = login(email, password)

		if (success) {
			router.push('/dashboard')
		} else {
			setError('Invalid email or password')
		}
	}

	return (
		<div className='flex items-center justify-center h-screen bg-gray-100'>
			<form onSubmit={handleLogin} className='bg-white p-8 rounded-lg shadow-md w-80 flex flex-col gap-4'>
				<h1 className='text-2xl font-semibold text-center'>Sign in Admin Panel</h1>

				<div>
					<label className='block text-sm font-medium text-gray-600 mb-1'>Email</label>
					<input
						type='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						className='w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
					/>
				</div>

				<div>
					<label className='block text-sm font-medium text-gray-600 mb-1'>Password</label>
					<input
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						className='w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
					/>
				</div>

				{error && <p className='text-red-500 text-sm text-center'>{error}</p>}

				<button type='submit' className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition'>
					Sign in
				</button>
			</form>
		</div>
	)
}
