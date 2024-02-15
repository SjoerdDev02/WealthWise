import axios from 'axios';
import { getCookie } from './getCookie';

export default async function updatePreferences(
	currency,
	mode,
) {
	const url = 'http://localhost:8000/api/updatePreferences';
    const token = getCookie('token');

	try {
		const response = await axios.put(
			url,
			{
				currency: currency,
				mode: mode,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);

		document.cookie = `mode=${response.data.data.preference.mode}; Secure; Path=/; Domain=localhost`;
		document.cookie = `currency=${response.data.data.preference.currency}; Secure; Path=/; Domain=localhost`;

		return response;
	} catch (error) {
		return error.response;
	}
}