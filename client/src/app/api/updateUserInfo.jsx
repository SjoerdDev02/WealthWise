import axios from 'axios';
import { getCookie } from './getCookie';

export default async function updateUserInfo(
	name,
	email,
) {
	const url = 'http://localhost:8000/api/updateInfo';
    const token = getCookie('token');

	try {
		const response = await axios.put(
			url,
			{
				name: name,
				email: email,
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