import axios from 'axios';
import { getCookie } from './getCookie';

export default async function createSnapshot(year, month) {
    const url = 'http://localhost:8000/api/createSnapshot';
    const token = getCookie('token');

    try {
        const response = await axios.post(
            url,
            {
                year: year,
                month: month,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            }
        );

        return response.data.data.snapshot;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}