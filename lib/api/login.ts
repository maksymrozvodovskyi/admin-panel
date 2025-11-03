import axios from 'axios'
import { api } from './api'

export const loginRequest = async (email: string, password: string) => {
	try {
		const res = await api.post('/login', { email, password })
		return res.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			return error.response?.data || { success: false, message: 'Request failed' }
		}
		return { success: false, message: 'Unexpected error' }
	}
}
