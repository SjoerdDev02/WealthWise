'use server';

import { cookies } from 'next/headers';
import { SnapshotType } from '../types/SnapshotType';
import { revalidatePath } from 'next/cache';

export async function createSnapshot(year: string, month: string) {
	const token = cookies().get('token')!.value;

	try {
		const response = await fetch(
			'http://127.0.0.1:8000/api/createSnapshot',
			{
				method: 'POST',
				body: JSON.stringify({
					year: year,
					month: month,
				}),
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const responseData = await response.json();
		return responseData.data.snapshot;
	} catch (error) {
		console.error('There was a problem with the fetch operation:', error);
	}
}

export async function getSnapshot(year?: string, month?: string) {
	let url = 'http://127.0.0.1:8000/api/getSnapshot';

	const token = cookies().get('token')!.value;

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
			},
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const responseData = await response.json();

		revalidatePath('/dashboard');
		return responseData.data.snapshot;
	} catch (error) {
		console.error('There was a problem with the fetch operation:', error);
	}
}

export async function updateSnapshot(
	prevState: { isSuccess: boolean; isError: boolean },
	formData: FormData
) {
	const formattedData: SnapshotType = formatUpdatedData(formData);
	const token = cookies().get('token')!.value;

	try {
		const response = await fetch(
			'http://127.0.0.1:8000/api/updateSnapshot',
			{
				method: 'PUT',
				body: JSON.stringify({
					id: formattedData.id,
					year: formattedData.year,
					month: formattedData.month,
					income: formattedData.income,
					expenses: formattedData.expenses,
					total_investments: formattedData.total_investments
						? formattedData.total_investments
						: [],
					total_liabilities: formattedData.total_liabilities
						? formattedData.total_liabilities
						: [],
					investments: formattedData.investments,
					liabilities: formattedData.liabilities,
				}),
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + token,
				},
			}
		);

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		revalidatePath('/manager');
		return { isSuccess: true, isError: false };
	} catch (error) {
		console.log(error);
		return { isSuccess: false, isError: true };
	}
}

function formatUpdatedData(data: FormData) {
	const investmentsSourceArr = data.getAll('investments_source');
	const investmentsAmountArr = data.getAll('investments_amount');
	const investmentsArr = investmentsSourceArr.map((sourceItem, index) => {
		return { id: index, source: sourceItem.toString(), amount: parseInt(investmentsAmountArr[index].toString()) };
	});

	const liabilitiesSourceArr = data.getAll('liabilities_source');
	const liabilitiesAmountArr = data.getAll('liabilities_amount');
	const liabilitiesArr = liabilitiesSourceArr.map((sourceItem, index) => {
		return { id: index, source: sourceItem.toString(), amount: parseInt(liabilitiesAmountArr[index].toString()) };
	});
	
    const formattedData = {
        id: parseInt(data.get('id')!.toString()),
        year: data.get('year')!.toString(),
        month: data.get('month')!.toString(),
        income: parseInt(data.get('income')!.toString()),
        expenses: parseInt(data.get('expenses')!.toString()),
        total_investments: parseInt(data.get('total_investments')!.toString()),
        total_liabilities: parseInt(data.get('total_liabilities')!.toString()),
        investments: investmentsArr,
        liabilities: liabilitiesArr,
    };

    return formattedData;
}