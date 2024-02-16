'use client';

import { useContext } from 'react';
import TotalInputs from './TotalInputs';
import FinanceForm from './FinanceForm';
import styles from '@/styles/manager_data.module.scss';
import { SnapshotContext } from '@/app/context/SnapshotContext';
import { updateSnapshot } from '@/app/actions/snapshotActions';
import { useFormState, useFormStatus } from 'react-dom';

const initialState = {
	isSuccess: false,
	isError: false,
};

export default function ManagerData() {
	const [state, formAction] = useFormState(updateSnapshot, initialState);
	const { pending } = useFormStatus();

	const snapshot = useContext(SnapshotContext).snapshot;

	return (
		<>
			{state.isSuccess && (
				<p className={styles.container__success}>
					Changes in the snapshot are saved successful!
				</p>
			)}
			{state.isError && (
				<p className={styles['container__error']}>
					Something went wrong saving the changes
				</p>
			)}
			<form className={styles.container} role='form' action={formAction}>
				{snapshot && (
					<>
						<input type='hidden' name='id' defaultValue={snapshot!.id} />
						<input
							type='hidden'
							name='year'
							defaultValue={snapshot!.year}
						/>
						<input
							type='hidden'
							name='month'
							defaultValue={snapshot!.month}
						/>
						<TotalInputs
							income={snapshot.income}
							expenses={snapshot.expenses}
							total_investments={snapshot.total_investments}
							total_liabilities={snapshot.total_liabilities}
						/>
						<FinanceForm
							type='liabilities'
							data={
								snapshot.liabilities ? snapshot.liabilities : []
							}
						/>
						<FinanceForm
							type='investments'
							data={
								snapshot.investments ? snapshot.investments : []
							}
						/>
						<button
							type='submit'
							className='btn'
							disabled={pending}
						>
							Save Snapshot
						</button>
					</>
				)}
			</form>
		</>
	);
}
