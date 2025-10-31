'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
	const pathname = usePathname()
	const links = [
		{ href: '/dashboard/students', label: 'Students' },
		{ href: '/dashboard/teachers', label: 'Teachers' },
	]

	return (
		<aside className='w-60 bg-[#FFFDF5] border-r border-red-300 p-6 flex flex-col gap-6'>
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
	)
}
