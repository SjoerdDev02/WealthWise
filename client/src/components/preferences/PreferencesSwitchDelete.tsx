'use client';

import PreferenceSwitch from '@/components/preferences/PreferenceSwitch';
import styles from '@/styles/preferences_switch_delete.module.scss';
import { useState } from 'react';
import { updatePreferences } from '@/app/actions/preferenceActions';
import { deleteUser } from '@/app/actions/userActions';
import { useRouter } from 'next/navigation';
import { useFormState, useFormStatus } from 'react-dom';

const initialState = {
	isSuccess: false,
	isError: false,
}

export default function PreferencesSwitchDelete({
	values,
	names,
	activeValues,
}: {
	values: string[][];
	names: string[];
	activeValues: string[];
}) {
	const [state, formAction] = useFormState(updatePreferences, initialState);
	const { pending } = useFormStatus();

	const [isDeleteError, setIsDeleteError] = useState(false);
	const router = useRouter();

	async function handleDelete() {
		const response = await deleteUser();

		if (!response) {
			setIsDeleteError(true);
			return;
		}

		router.push('/');
	}

	return (
		<>
			{state.isSuccess && (
				<p className={styles.switch_delete_container__success}>
					Changes in preferences are saved successful!
				</p>
			)}
			{state.isError || isDeleteError && (
				<p className={styles.switch_delete_container__error}>
					Something went wrong saving the changes
				</p>
			)}
			<form
				className={styles.switch_delete_container}
				role='form'
				action={formAction}
			>
				{activeValues.map((item, index) => (
					<PreferenceSwitch
						key={index}
						values={values[index]}
						name={names[index]}
						activeValue={item}
					/>
				))}
				<button
					type='button'
					className={styles.switch_delete_container__delete_btn}
					onClick={handleDelete}
					style={{ width: '100%' }}
				>
					Delete Account
				</button>
				<button
					type='submit'
					className='btn'
					disabled={pending}
					style={{ width: '100%' }}
				>
					Save Changes
				</button>
			</form>
		</>
	);
}
