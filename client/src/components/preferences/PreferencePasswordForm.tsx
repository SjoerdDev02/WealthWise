'use client';

import styles from '@/styles/entry_form.module.scss';
import preferenceStyles from '@/styles/preference_form.module.scss';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import updateUserPassword from '../../app/api/updateUserPassword';

export default function PreferencePasswordForm() {
	const [isCollapsed, setIsCollapsed] = useState(true);
	const [isSucces, setIsSucces] = useState(false);
	const [isError, setIsError] = useState(false);

	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit,
		reset,
		watch,
	} = useForm();

	async function onSubmit(data: FieldValues) {
		const response = await updateUserPassword(
			data.newPassword,
			data.confirmPassword,
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
		<article className={preferenceStyles.preference_form_container}>
			<header
				className={
					preferenceStyles['preference_form_container__header']
				}
				onClick={collapseForm}
			>
				<h2
					className={
						preferenceStyles[
							'preference_form_container__header__heading'
						]
					}
				>
					Change password?
				</h2>
				<button
					className={
						preferenceStyles[
							'preference_form_container__header__button'
						]
					}
				>
					<i>&#9662;</i>
				</button>
			</header>
			{isSucces && <p className={styles.container__success}>Password changed successful!</p>}
			{isError && (
				<p className={styles['container__error']}>
					Something went wrong saving the changes
				</p>
			)}
			<AnimatePresence initial={false}>
				{!isCollapsed && (
					<motion.form
						initial='collapsed'
						animate='open'
						exit='collapsed'
						variants={{
							open: { opacity: 1, height: 'auto' },
							collapsed: { opacity: 0, height: 0 },
						}}
						transition={{
							duration: 0.4,
							ease: [0.04, 0.62, 0.23, 0.98],
						}}
						className={styles.container}
						role='form'
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className={styles['container__form_bundle']}>
							<div className={styles['container__form_group']}>
								{errors.oldPassword && (
									<p className={styles['container__error']}>
										{String(errors.oldPassword.message)}
									</p>
								)}
								<label
									className={
										styles['container__form_group__label']
									}
									htmlFor='oldPassword'
								>
									Old Password
								</label>
								<input
									className={
										styles['container__form_group__input']
									}
									type='password'
									id='oldPassword'
									placeholder='********'
									{...register('oldPassword', {
										required: 'Old password is required',
										minLength: {
											value: 6,
											message:
												'Password must have at least 6 characters',
										},
										pattern: {
											value: /^(?=.*[A-Z]).{6,}$/,
											message:
												'Password must contain at least one uppercase letter',
										},
									})}
								/>
							</div>
							<div className={styles['container__form_group']}>
								{errors.newPassword && (
									<p className={styles['container__error']}>
										{String(errors.newPassword.message)}
									</p>
								)}
								<label
									className={
										styles['container__form_group__label']
									}
									htmlFor='newPassword'
								>
									New Password
								</label>
								<input
									className={
										styles['container__form_group__input']
									}
									type='password'
									id='newPassword'
									placeholder='********'
									{...register('newPassword', {
										required: 'New password is required',
										minLength: {
											value: 6,
											message:
												'Password must have at least 6 characters',
										},
										pattern: {
											value: /^(?=.*[A-Z]).{6,}$/,
											message:
												'Password must contain at least one uppercase letter',
										},
									})}
								/>
							</div>
						</div>
						<div className={styles['container__form_bundle']}>
							<div className={styles['container__form_group']}>
								{errors.confirmPassword && (
									<p className={styles['container__error']}>
										{String(errors.confirmPassword.message)}
									</p>
								)}
								<label
									className={
										styles['container__form_group__label']
									}
									htmlFor='confirmPassword'
								>
									Confirm Password
								</label>
								<input
									className={
										styles['container__form_group__input']
									}
									type='password'
									id='confirmPassword'
									placeholder='********'
									{...register('confirmPassword', {
										required: 'Confirmation is required',
										validate: (value) =>
											value === watch('newPassword') ||
											'Passwords do not match',
									})}
								/>
							</div>
							<div className={styles['container__form_group']}>
							<button
								type='submit'
								className='btn'
								disabled={isSubmitting}
							>
								Save Password
							</button>
							</div>
						</div>
					</motion.form>
				)}
			</AnimatePresence>
		</article>
	);
}
