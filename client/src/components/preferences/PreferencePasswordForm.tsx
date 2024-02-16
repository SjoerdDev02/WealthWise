'use client';

import styles from '@/styles/entry_form.module.scss';
import preferenceStyles from '@/styles/preference_form.module.scss';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { updateUserPassword } from '@/app/actions/userActions';
import { useFormState, useFormStatus } from 'react-dom';

const initialState = {
	isSuccess: false,
	isError: false,
}

export default function PreferencePasswordForm() {
	const [state, formAction] = useFormState(updateUserPassword, initialState);
	const { pending } = useFormStatus();

	const [isCollapsed, setIsCollapsed] = useState(true);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordMatch, setPasswordMatch] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsCollapsed(true);
		}, 2000);
	}, [state.isSuccess])

	const collapseForm = () => {
		setIsCollapsed((previousValue) => !previousValue);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		setPasswordMatch(e.target.value === confirmPassword);
	};

	const handleConfirmPasswordChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setConfirmPassword(e.target.value);
		setPasswordMatch(e.target.value === password);
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
			{state.isSuccess && !isCollapsed && <p className={styles.container__success}>Password changed successful!</p>}
			{state.isError && (
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
						action={formAction}
					>
						<div className={styles['container__form_bundle']}>
							<div className={styles['container__form_group']}>
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
									name='oldPassword'
									placeholder='********'
									min={6}
									pattern='.*[A-Z].*'
									title='Old password must contain at least six characters and one uppercase letter'
									required
								/>
							</div>
							<div className={styles['container__form_group']}>
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
									name='password'
									min={6}
									pattern='.*[A-Z].*'
									title='New password must contain at least six characters and one uppercase letter'
									required
									value={password}
									onChange={handlePasswordChange}
								/>
							</div>
						</div>
						{!passwordMatch && (
							<p className={styles['container__error']}>
								Passwords do not match
							</p>
						)}
						<div className={styles['container__form_bundle']}>
							<div className={styles['container__form_group']}>
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
									name='passwordConfirm'
									min={6}
									pattern='.*[A-Z].*'
									title='Password confirmation must contain at least six characters and one uppercase letter'
									required
									value={confirmPassword}
									onChange={handleConfirmPasswordChange}
								/>
							</div>
							<div className={styles['container__form_group']}>
							<button
								type='submit'
								className='btn'
								disabled={pending}
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
