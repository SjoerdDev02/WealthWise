'use client';

import PreferenceSwitch from '@/components/preferences/PreferenceSwitch';
import styles from '@/styles/preferences_switch_delete.module.scss';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import updatePreferences from '../../app/api/updatePreferences';
import deleteUser from '../../app/api/deleteUser';
import { useRouter } from 'next/navigation';

export default function PreferencesSwitchDelete({
	values,
	names,
	activeValues,
}: {
	values: string[][];
	names: string[];
	activeValues: string[];
}) {
	const [isSucces, setIsSucces] = useState(false);
	const [isError, setIsError] = useState(false);

	const router = useRouter();

	const {
        register,
		formState: { isSubmitting },
		handleSubmit,
		reset,
	} = useForm();

	async function onSubmit(data: FieldValues) {
		const response = await updatePreferences(
			data.currency,
			data.mode,
		);

		if (response.status !== 200) {
			setIsError(true);
			return;
		}

        setIsSucces(true);
		reset();

		setTimeout(() => {
			setIsSucces(false);
		}, 5000)
	}

    async function handleDelete() {
		const response = await deleteUser();

		if (response.status !== 200) {
			setIsError(true);
			return;
		}

		reset();
		router.push('/');
    }

	return (
		<>
			{isSucces && (
				<p className={styles.switch_delete_container__success}>
					Changes in preferences are saved successful!
				</p>
			)}
			{isError && (
				<p className={styles.switch_delete_container__error}>
					Something went wrong saving the changes
				</p>
			)}
			<form
				className={styles.switch_delete_container}
				role='form'
				onSubmit={handleSubmit(onSubmit)}
			>
				{activeValues.map((item, index) => (
					<PreferenceSwitch
						key={index}
						values={values[index]}
						name={names[index]}
						activeValue={item}
                        register={register}
					/>
				))}
				<button
					type='button'
					className={styles.switch_delete_container__delete_btn}
                    onClick={handleDelete} style={{ width: '100%' }}
				>
					Delete Account
				</button>
				<button type='submit' className='btn' disabled={isSubmitting} style={{ width: '100%' }}>
					Save Changes
				</button>
			</form>
		</>
	);
}
