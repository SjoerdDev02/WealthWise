import axios from 'axios';

export default async function loginUser(
	email,
	password,
) {
	const url = 'http://localhost:8000/api/login';

	try {
		const response = await axios.post(url, {
			email: email,
			password: password,
		});

		document.cookie = `token=${response.data.data.token}; Secure; Path=/; Domain=localhost`;
		document.cookie = `mode=${response.data.data.user.preference.mode}; Secure; Path=/; Domain=localhost`;
		document.cookie = `currency=${response.data.data.user.preference.currency}; Secure; Path=/; Domain=localhost`;

		return response;
	} catch (error) {
		return error.response;
	}
}