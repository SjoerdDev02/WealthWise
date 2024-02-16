'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function createUser(
	prevState: { isError: boolean; message: string },
	formData: FormData
) {
	try {
		const response = await fetch('http://127.0.0.1:8000/api/register', {
			method: 'POST',
			body: JSON.stringify({
				name: formData.get('name'),
				email: formData.get('email'),
				password: formData.get('password'),
				password_confirmation: formData.get('passwordConfirm'),
			}),
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});

		if (!response.ok) {
			return { isError: true, message: 'Form input is not valid' };
		}

		const data = await response.json();

		cookies().set('token', data.data.token, {
			maxAge: 30 * 24 * 60 * 60,
		});
		cookies().set('mode', 'dark');
		cookies().set('currency', 'euro');
	} catch (error) {
		return { isError: true, message: 'Form input is not valid' };
	}

	redirect('/dashboard');
}

export async function loginUser(
	prevState: { isError: boolean; message: string },
	formData: FormData
) {
	try {
		const response = await fetch('http://127.0.0.1:8000/api/login', {
			method: 'POST',
			body: JSON.stringify({
				email: formData.get('email'),
				password: formData.get('password'),
			}),
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		});

		if (!response.ok) {
			return { isError: true, message: 'Credentials do not match' };
		}

		const data = await response.json();
		console.log(data);

		cookies().set('token', data.data.token, {
			maxAge: 30 * 24 * 60 * 60,
		});
		cookies().set('mode', data.data.user.preference.mode);
		cookies().set('currency', data.data.user.preference.currency);
	} catch (error) {
		return { isError: true, message: 'Credentials do not match' };
	}

	redirect('/dashboard');
}

export async function getUser() {
    const token = cookies().get('token')!.value;

    try {
        const response = await fetch('http://127.0.0.1:8000/api/getUser', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        return responseData.data.user;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

export async function updateUserInfo(prevState: { isSuccess: boolean, isError: boolean }, formData: FormData) {
    const token = cookies().get('token')!.value;

	try {
		const response = await fetch('http://127.0.0.1:8000/api/updateInfo', {
			method: 'PUT',
			body: JSON.stringify({
				name: formData.get('name'),
				email: formData.get('email'),
			}),
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		});

		if (!response.ok) {
			return { isSuccess: false, isError: true };
		}

		return { isSuccess: true, isError: false };
	} catch (error) {
		return { isSuccess: false, isError: true };
	}
}

export async function updateUserPassword(prevState: { isSuccess: boolean, isError: boolean }, formData: FormData) {
    const token = cookies().get('token')!.value;

	try {
		const response = await fetch('http://127.0.0.1:8000/api/updatePassword', {
			method: 'PUT',
			body: JSON.stringify({
				password: formData.get('password'),
				password_confirmation: formData.get('passwordConfirm'),
			}),
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			},
		});

		if (!response.ok) {
			return { isSuccess: false, isError: true };
		}

		return { isSuccess: true, isError: false };
	} catch (error) {
		return { isSuccess: false, isError: true };
	}
}

export async function logoutUser() {
	const token = cookies().get('token');

	try {
		const response = await fetch('http://127.0.0.1:8000/api/logout', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token,
			}
		});

		cookies().delete('token');
		cookies().delete('mode');
		cookies().delete('currency');

	} catch (error) {
		console.error(error);
	}
}

export async function deleteUser() {
    const token = cookies().get('token')!.value;

	try {
		const response = await fetch('http://127.0.0.1:8000/api/delete', {
			method: 'DELETE',
			headers: {
				Authorization: 'Bearer ' + token,
			},
		});

		if (!response.ok) {
			return false;
		}

		cookies().delete('token');
		cookies().delete('mode');
		cookies().delete('currency');

		return true;
	} catch (error) {
		console.error(error);
		return false;;
	}
}