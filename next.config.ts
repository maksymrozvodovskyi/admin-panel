import withPWA from 'next-pwa'

const withPWAModule = withPWA({
	dest: 'public',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
}

export default withPWAModule(nextConfig)
