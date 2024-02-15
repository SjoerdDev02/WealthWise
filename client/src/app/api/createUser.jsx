import axios from 'axios';

export default async function createUser(
	name,
	email,
	password,
	password_confirmation
) {
	const url = 'http://localhost:8000/api/register';

	try {
		const response = await axios.post(url, {
			name: name,
			email: email,
			password: password,
			password_confirmation: password_confirmation,
		});

		console.log(response);

		document.cookie = `token=${response.data.data.token}; Secure; Path=/; Domain=localhost`;
		document.cookie = 'mode=dark; Secure; Path=/; Domain=localhost';
		document.cookie = 'currency=euro; Secure; Path=/; Domain=localhost';

		return response;
	} catch (error) {
		return error.response;
	}
}