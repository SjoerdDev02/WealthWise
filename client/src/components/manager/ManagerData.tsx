'use client';

import { useContext, useState } from 'react';
import TotalInputs from './TotalInputs';
import { FieldValues, useForm } from 'react-hook-form';
import FinanceForm from './FinanceForm';
import styles from '@/styles/manager_data.module.scss';
import { SnapshotContext } from '@/app/context/SnapshotContext';
import updateSnapshot from '../../app/api/updateSnapshot';

export default function ManagerData() {
	const [isSucces, setIsSucces] = useState(false);
	const [isError, setIsError] = useState(false);
	const snapshot = useContext(SnapshotContext).snapshot;

	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit,
	} = useForm();

	async function onSubmit(data: FieldValues) {
		if (snapshot) {
			const investmentsArr = Object.keys(data)
				.filter((key) => key.startsWith('investments_source_'))
				.map((key, id) => {
					const index = key.split('_')[2];
					const source = data[key];
					const amount = parseInt(
						data[`investments_amount_${index}`]
					);
					return { id, source, amount };
				});

			const liabilitiesArr = Object.keys(data)
				.filter((key) => key.startsWith('liabilities_source_'))
				.map((key, id) => {
					const index = key.split('_')[2];
					const source = data[key];
					const amount = parseInt(
						data[`liabilities_amount_${index}`]
					);
					return { id, source, amount };
				});

			const formattedData = {
				id: snapshot.id,
				year: snapshot.year,
				month: snapshot.month,
				income: parseInt(data.income.toString()),
				expenses: parseInt(data.expenses.toString()),
				total_investments: parseInt(data.total_investments.toString()),
				total_liabilities: parseInt(data.total_liabilities.toString()),
				investments: investmentsArr,
				liabilities: liabilitiesArr,
			};

			const response = await updateSnapshot(formattedData);

			if (response.status !== 200) {
				setIsError(true);
				setIsSucces(false);
				return;
			}

			setIsSucces(true);
			setIsError(false);
		}
	}

	return (
		<>
			{isSucces && (
				<p className={styles.container__success}>
					Changes in the snapshot are saved successful!
				</p>
			)}
			{isError && (
				<p className={styles['container__error']}>
					Something went wrong saving the changes
				</p>
			)}
			<form
				className={styles.container}
				role='form'
				onSubmit={handleSubmit(onSubmit)}
			>
				{snapshot && (
					<>
						<TotalInputs
							income={snapshot.income}
							expenses={snapshot.expenses}
							total_investments={snapshot.total_investments}
							total_liabilities={snapshot.total_liabilities}
							register={register}
							errors={errors}
						/>
						<FinanceForm
							type='liabilities'
							data={
								snapshot.liabilities ? snapshot.liabilities : []
							}
							register={register}
							errors={errors}
						/>
						<FinanceForm
							type='investments'
							data={
								snapshot.investments ? snapshot.investments : []
							}
							register={register}
							errors={errors}
						/>
						<button
							type='submit'
							className='btn'
							disabled={isSubmitting}
						>
							Save Snapshot
						</button>
					</>
				)}
			</form>
		</>
	);
}
