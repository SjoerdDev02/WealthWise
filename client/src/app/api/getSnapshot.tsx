import { getCookie } from "./getCookie";

export default async function getSnapshot(year?: string | number, month?: string | number) {
    let url = 'http://127.0.0.1:8000/api/getSnapshot';

    const token = getCookie('token');

    if (year && month) {
        url += `?year=${year}&month=${month}`;
    } else if (year) {
        url += `?year=${year}`;
    } else if (month) {
        url += `?month=${month}`;
    }

    try {
        const response = await fetch(url, {
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
        return responseData.data.snapshot;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}