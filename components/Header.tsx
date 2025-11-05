'use client'

import { Menu } from 'lucide-react'
import { useAuthStore } from '@/lib/store/authStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type HeaderProps = {
	toggleSidebar: () => void
}

export default function Header({ toggleSidebar }: HeaderProps) {
	const { isLoggedIn, user, logout } = useAuthStore()
	const router = useRouter()
	const [menuOpen, setMenuOpen] = useState(false)

	const handleLogout = () => {
		logout()
		setMenuOpen(false)
		router.push('/sign-in')
	}

	return (
		<header className='relative w-full h-14 border-b border-gray-300 bg-[#FFFDF5] px-4 md:px-6 flex items-center justify-between'>
			<div className='flex items-center gap-3'>
				<button
					onClick={toggleSidebar}
					className='p-2 rounded-md hover:bg-gray-100 transition-colors'
					aria-label='Toggle sidebar'
				>
					Toggle{' '}
				</button>

				<h1 className='text-lg font-semibold text-gray-800'>Admin Panel {user ? `— ${user.name}` : ''}</h1>
			</div>

			{isLoggedIn && (
				<button
					onClick={handleLogout}
					className='inline-flex px-3 py-1.5 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-200'
				>
					Logout
				</button>
			)}
		</header>
	)
}
