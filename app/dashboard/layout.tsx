import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import '../globals.css'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='min-h-screen flex flex-col bg-[#FFFDF5]'>
			<Header />
			<div className='flex flex-1'>
				<Sidebar />
				<main className='flex-1 p-6'>{children}</main>
			</div>
		</div>
	)
}
