'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Admin } from '@/types/admin'

type AuthState = {
	isLoggedIn: boolean
	user: Admin | null
	loginWithServer: (admin: Admin) => void
	logout: () => void
}

export const useAuthStore = create<AuthState>()(
	persist(
		set => ({
			isLoggedIn: false,
			user: null,

			loginWithServer: admin =>
				set({
					isLoggedIn: true,
					user: admin,
				}),

			logout: () =>
				set({
					isLoggedIn: false,
					user: null,
				}),
		}),
		{ name: 'auth-storage' }
	)
)
