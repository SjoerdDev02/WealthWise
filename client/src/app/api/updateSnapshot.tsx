import axios, { AxiosResponse, AxiosError } from 'axios';
import { getCookie } from './getCookie';
import { SnapshotType } from '../types/SnapshotType';

export default async function updateSnapshot(
    data: SnapshotType
): Promise<AxiosResponse<SnapshotType> | AxiosError> {
    const url = 'http://localhost:8000/api/updateSnapshot';
    const token = getCookie('token');

    try {
        const response = await axios.put(
            url,
            {
                id: data.id,
                year: data.year,
                month: data.month,
                income: data.income,
                expenses: data.expenses,
                total_investments: data.total_investments ? data.total_investments : [],
                total_liabilities: data.total_liabilities ? data.total_liabilities : [],
                investments: data.investments,
                liabilities: data.liabilities,
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
		return error as AxiosError;
    }
}