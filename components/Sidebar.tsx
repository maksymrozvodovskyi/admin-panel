'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Sidebar() {
	const pathname = usePathname()
	const [isOpen, setIsOpen] = useState(false)

	const links = [
		{ href: '/dashboard/students', label: 'Students' },
		{ href: '/dashboard/teachers', label: 'Teachers' },
	]

	return (
		<>
			<aside className='hidden md:flex w-60 min-h-screen bg-[#FFFDF5] border-r border-red-300 p-6 flex-col gap-6'>
				<nav className='flex flex-col gap-3'>
					{links.map(link => (
						<Link
							key={link.href}
							href={link.href}
							className={clsx(
								'block text-sm font-medium px-3 py-2 rounded-md border border-transparent transition',
								pathname.startsWith(link.href)
									? 'bg-green-200 border-green-400 text-green-900'
									: 'hover:bg-green-50 text-gray-700'
							)}
						>
							{link.label}
						</Link>
					))}
				</nav>
			</aside>

			{!isOpen && (
				<div className='md:hidden fixed top-3 left-3 z-50'>
					<button
						onClick={() => setIsOpen(true)}
						className='p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition'
						aria-label='Open sidebar'
					>
						<Menu className='w-5 h-5 text-gray-800' />
					</button>
				</div>
			)}

			{isOpen && (
				<div className='fixed inset-0 bg-black/40 backdrop-blur-sm z-40 flex'>
					<div className='w-64 bg-[#FFFDF5] border-r border-red-300 p-6 flex flex-col gap-6 shadow-lg animate-slide-in'>
						<div className='flex justify-between items-center mb-4'>
							<h2 className='text-lg font-semibold text-gray-800'>Menu</h2>
							<button
								onClick={() => setIsOpen(false)}
								className='p-2 rounded-md hover:bg-gray-100 transition'
								aria-label='Close sidebar'
							>
								<X className='w-5 h-5 text-gray-700' />
							</button>
						</div>

						<nav className='flex flex-col gap-3'>
							{links.map(link => (
								<Link
									key={link.href}
									href={link.href}
									onClick={() => setIsOpen(false)}
									className={clsx(
										'block text-sm font-medium px-3 py-2 rounded-md border border-transparent transition',
										pathname.startsWith(link.href)
											? 'bg-green-200 border-green-400 text-green-900'
											: 'hover:bg-green-50 text-gray-700'
									)}
								>
									{link.label}
								</Link>
							))}
						</nav>
					</div>

					<div className='flex-1' onClick={() => setIsOpen(false)} />
				</div>
			)}
		</>
	)
}
