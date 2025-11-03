'use client'
import { useAuthStore } from '@/lib/store/authStore'
import { useRouter } from 'next/navigation'

export default function Header() {
	const { isLoggedIn, user, logout } = useAuthStore()
	const router = useRouter()

	const handleLogout = () => {
		logout()
		router.push('/sign-in')
	}

	return (
		<header className='h-14 border-b border-red-300 flex items-center justify-between px-6 bg-[#FFFDF5]'>
			<h1 className='text-lg font-semibold text-gray-800'>Admin Panel {user ? `— ${user.name}` : ''}</h1>

			{isLoggedIn && (
				<button
					onClick={handleLogout}
					className='px-3 py-1.5 text-sm font-medium text-white bg-red-500 rounded-md 
						hover:bg-red-600 active:bg-red-700 transition-colors duration-200 cursor-pointer'
				>
					Logout
				</button>
			)}
		</header>
	)
}
