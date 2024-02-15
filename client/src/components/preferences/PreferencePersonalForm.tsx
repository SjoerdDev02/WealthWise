'use client';

import styles from '@/styles/entry_form.module.scss';
import preferenceStyles from '@/styles/preference_form.module.scss';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import updateUserInfo from '@/app/api/updateUserInfo';

export default function PreferencePersonalForm({
	name,
	email,
}: {
	name: string;
	email: string;
}) {
	const [isCollapsed, setIsCollapsed] = useState(true);
	const [isSucces, setIsSucces] = useState(false);
	const [isError, setIsError] = useState(false);

	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit,
		reset,
	} = useForm({
		defaultValues: {
			name: name,
			email: email,
		},
	});

	async function onSubmit(data: FieldValues) {
		const response = await updateUserInfo(
			data.name,
			data.email,
		);

		if (response.status !== 200) {
			setIsError(true);
			return;
		}

		reset();

		setIsSucces(true);
		setTimeout(() => {
			setIsCollapsed(true);
		}, 2000);
	}

	const collapseForm = () => {
		if (isCollapsed) {
			setIsSucces(false);
		}
		setIsCollapsed((previousValue) => !previousValue);
	};

	return (
		<article
			className={preferenceStyles.preference_form_container}
		>
			<header className={preferenceStyles['preference_form_container__header']} onClick={collapseForm}>
				<h2 className={preferenceStyles['preference_form_container__header__heading']}>Change email and name?</h2>
				<button className={preferenceStyles['preference_form_container__header__button']}>
					<i>&#9662;</i>
				</button>
			</header>
			{isSucces && <p className={styles.container__success}>Changes in email and name are saved successful!</p>}
			{isError && (
				<p className={styles['container__error']}>
					Something went wrong saving the changes
				</p>
			)}
			<AnimatePresence initial={false}>
			{!isCollapsed && (
				<motion.form
					initial="collapsed"
					animate="open"
					exit="collapsed"
					variants={{
					open: { opacity: 1, height: "auto" },
					collapsed: { opacity: 0, height: 0 },
					}}
					transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
					className={styles.container}
					role='form'
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className={styles['container__form_bundle']}>
						<div className={styles['container__form_group']}>
							{errors.name && (
								<p className={styles['container__error']}>
									{String(errors.name.message)}
								</p>
							)}
							<label
								className={
									styles['container__form_group__label']
								}
								htmlFor='name'
							>
								Name
							</label>
							<input
								className={
									styles['container__form_group__input']
								}
								type='text'
								id='name'
								placeholder='********'
								{...register('name', {
									required: 'Name is required',
								})}
							/>
						</div>
						<div className={styles['container__form_group']}>
							{errors.email && (
								<p className={styles['container__error']}>
									{String(errors.email.message)}
								</p>
							)}
							<label
								className={
									styles['container__form_group__label']
								}
								htmlFor='emailLogin'
							>
								Email adress
							</label>
							<input
								className={
									styles['container__form_group__input']
								}
								type='email'
								id='emailLogin'
								placeholder='name@email.com'
								{...register('email', {
									required: 'Email is required',
								})}
							/>
						</div>
					</div>
					<button
						type='submit'
						className='btn'
						disabled={isSubmitting}
					>
						Save Changes
					</button>
				</motion.form>
			)}
			</AnimatePresence>
		</article>
	);
}