'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { Activity } from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const [showSidebar, setShowSidebar] = useState(true)

	return (
		<div className='min-h-screen flex flex-col bg-[#FFFDF5]'>
			<Header toggleSidebar={() => setShowSidebar(prev => !prev)} />

			<div className='flex flex-1'>
				<Activity mode={showSidebar ? 'visible' : 'hidden'}>
					<Sidebar />
				</Activity>

				<main className='flex-1 p-4 sm:p-6 md:p-8 overflow-x-hidden min-w-0' style={{ scrollBehavior: 'smooth' }}>
					{children}
				</main>
			</div>
		</div>
	)
}
