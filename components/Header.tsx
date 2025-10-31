'use client'

import { useAuthStore } from '@/lib/store/authStore'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Header() {
	const { isLoggedIn, logout } = useAuthStore()
	const router = useRouter()

	const handleLogout = () => {
		logout()
		router.push('/sign-in')
	}

	return (
		<header
			className='
				h-14
				flex items-center justify-between 
				px-6
				bg-[#FFFDF5]
				border-b border-red-300
			'
		>
			<Link href={'/dashboard'} className='text-lg font-semibold text-red-700 tracking-wide uppercase'>
				Admin
			</Link>

			{isLoggedIn && (
				<button
					onClick={handleLogout}
					className='px-3 py-1.5 text-sm font-medium text-white bg-red-500 rounded-md 
						hover:bg-red-600 active:bg-red-700 transition-colors duration-200 shadow-sm cursor-pointer'
				>
					Logout
				</button>
			)}
		</header>
	)
}
