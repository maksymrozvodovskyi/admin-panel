import Link from 'next/link'

export default function HomePage() {
	return (
		<main className='flex flex-col items-center justify-center h-screen bg-[#FFFDF5]'>
			<h1 className='text-3xl font-bold mb-4 text-gray-800'>Welcome!</h1>
			<Link href='/sign-in' className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition'>
				Sign-in
			</Link>
		</main>
	)
}
