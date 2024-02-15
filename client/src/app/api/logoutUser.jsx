import axios from 'axios';
import { getCookie } from './getCookie';

export default async function logoutUser() {
	const url = 'http://localhost:8000/api/logout';
    const token = getCookie('token');

	try {
		const response = await axios.post(
			url,
			{},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);

        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
		document.cookie = 'mode=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
		document.cookie = 'currency=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

		return response;
	} catch (error) {
		return error.response;
	}
}
