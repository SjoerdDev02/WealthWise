import { cookies } from 'next/headers';

export default async function getUser() {
    const url = 'http://127.0.0.1:8000/api/getUser';
    const token = cookies().get('token').value;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
            next: { revalidate: 60 }
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