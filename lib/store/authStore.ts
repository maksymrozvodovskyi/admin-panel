'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
	isLoggedIn: boolean
	login: (email: string, password: string) => boolean
	logout: () => void
}

export const useAuthStore = create<AuthState>()(
	persist(
		set => ({
			isLoggedIn: false,

			login: (email, password) => {
				if (email === 'admin@example.com' && password === '123456') {
					set({ isLoggedIn: true })
					return true
				}
				return false
			},

			logout: () => {
				set({ isLoggedIn: false })
			},
		}),
		{
			name: 'auth-storage',
		}
	)
)
