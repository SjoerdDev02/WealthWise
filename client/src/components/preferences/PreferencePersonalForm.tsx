'use client';

import styles from '@/styles/entry_form.module.scss';
import preferenceStyles from '@/styles/preference_form.module.scss';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { updateUserInfo } from '@/app/actions/userActions';
import { useFormState, useFormStatus } from 'react-dom';

const initialState = {
	isSuccess: false,
	isError: false,
}

export default function PreferencePersonalForm({
	name,
	email,
}: {
	name: string;
	email: string;
}) {
	const [state, formAction] = useFormState(updateUserInfo, initialState);
	const { pending } = useFormStatus();

	const [isCollapsed, setIsCollapsed] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsCollapsed(true);
		}, 2000);
	}, [state.isSuccess])

	const collapseForm = () => {
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
			{state.isSuccess && !isCollapsed && <p className={styles.container__success}>Changes in email and name are saved successful!</p>}
			{state.isError && (
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
					action={formAction}
				>
					<div className={styles['container__form_bundle']}>
						<div className={styles['container__form_group']}>
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
								name='name'
								title='Name is required'
								required
								defaultValue={name}
							/>
						</div>
						<div className={styles['container__form_group']}>
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
								name='email'
								title='Email is required'
								required
								defaultValue={email}
							/>
						</div>
					</div>
					<button
						type='submit'
						className='btn'
						disabled={pending}
					>
						Save Changes
					</button>
				</motion.form>
			)}
			</AnimatePresence>
		</article>
	);
}