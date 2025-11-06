'use client'

import { useAuthStore } from '@/lib/store/authStore'
import { useRouter } from 'next/navigation'
import { Menu } from 'lucide-react'

type HeaderProps = {
	toggleSidebar: () => void
}

export default function Header({ toggleSidebar }: HeaderProps) {
	const { isLoggedIn, user, logout } = useAuthStore()
	const router = useRouter()

	const handleLogout = () => {
		logout()
		router.push('/sign-in')
	}

	return (
		<header className='w-full h-14 border-b border-gray-300 bg-[#FFFDF5] px-4 md:px-6 flex items-center justify-between'>
			<div className='flex items-center gap-3'>
				{/* Mobile menu button */}
				<button
					onClick={toggleSidebar}
					className='p-2 rounded-md hover:bg-gray-100 transition-colors md:hidden'
					aria-label='Toggle sidebar'
				>
					<Menu className='w-5 h-5 text-gray-800' />
				</button>

				<h1 className='text-lg font-semibold text-gray-800 truncate'>Admin Panel {user ? `— ${user.name}` : ''}</h1>
			</div>

			{isLoggedIn && (
				<button
					onClick={handleLogout}
					className='px-3 py-1.5 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors'
				>
					Logout
				</button>
			)}
		</header>
	)
}
