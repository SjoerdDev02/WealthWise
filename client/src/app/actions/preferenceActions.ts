'use server';

import { cookies } from 'next/headers';

export async function updatePreferences(
	prevState: { isSuccess: boolean; isError: boolean },
	formData: FormData
) {
	const token = cookies().get('token')!.value;

	try {
		const response = await fetch(
			'http://127.0.0.1:8000/api/updatePreferences',
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
				body: JSON.stringify({
					currency: formData.get('currency'),
					mode: formData.get('mode'),
				}),
			}
		);

		const responseData = await response.json();

		cookies().set('mode', responseData.data.preference.mode);
		cookies().set('currency', responseData.data.preference.currency);

		return { isSuccess: true, isError: false };
	} catch (error) {
		console.error(error);
		return { isSuccess: false, isError: true };
	}
}
