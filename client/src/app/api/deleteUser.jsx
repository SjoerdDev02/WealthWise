import axios from 'axios';
import { getCookie } from './getCookie';

export default async function deleteUser() {
	const url = 'http://localhost:8000/api/delete';
    const token = getCookie('token');

	try {
		const response = await axios.delete(
			url,
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