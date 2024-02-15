import axios from 'axios';
import { getCookie } from './getCookie';

export default async function updateUserPassword(
	password,
	password_confirmation
) {
	const url = 'http://localhost:8000/api/updatePassword';
    const token = getCookie('token');

	try {
		const response = await axios.put(
			url,
			{
				password: password,
				password_confirmation: password_confirmation,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);

		return response;
	} catch (error) {
		return error.response;
	}
}