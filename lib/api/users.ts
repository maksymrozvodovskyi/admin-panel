import { api } from './api'

export const deleteUserRequest = async (id: number) => {
	const res = await api.delete(`/users`, { data: { id } })
	return res.data
}
