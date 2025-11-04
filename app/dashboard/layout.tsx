import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import '../globals.css'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='min-h-screen flex flex-col bg-[#FFFDF5]'>
			<Header />

			<div className='flex flex-1'>
				<Sidebar />

				<main className='flex-1 p-4 sm:p-6 md:p-8 overflow-x-hidden min-w-0' style={{ scrollBehavior: 'smooth' }}>
					{children}
				</main>
			</div>
		</div>
	)
}
