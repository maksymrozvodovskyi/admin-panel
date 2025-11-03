'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginRequest } from '@/lib/api/login'
import { useAuthStore } from '@/lib/store/authStore'

export default function SignInPage() {
	const [email, setEmail] = useState('')

	const [password, setPassword] = useState('')

	const [error, setError] = useState('')

	const router = useRouter()

	const { loginWithServer } = useAuthStore()

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')

		const data = await loginRequest(email, password)

		if (!data.success) {
			setError(data.message || 'Invalid credentials')
			return
		}

		loginWithServer(data.admin)

		router.push('/dashboard')
	}

	return (
		<div className='flex items-center justify-center h-screen bg-gray-100'>
			<form onSubmit={handleLogin} className='bg-white p-8 rounded-lg shadow-md w-80 flex flex-col gap-4'>
				<h1 className='text-2xl font-semibold text-center'>Admin Login</h1>

				<input
					type='email'
					value={email}
					onChange={e => setEmail(e.target.value)}
					placeholder='Email'
					className='border rounded px-3 py-2'
				/>
				<input
					type='password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					placeholder='Password'
					className='border rounded px-3 py-2'
				/>

				{error && <p className='text-red-600 text-sm text-center'>{error}</p>}

				<button
					type='submit'
					className='bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer'
				>
					Sign in
				</button>
			</form>
		</div>
	)
}
