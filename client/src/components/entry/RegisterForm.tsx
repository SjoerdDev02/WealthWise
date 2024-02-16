import React, { useState, useEffect } from 'react';
import styles from '@/styles/entry_form.module.scss';
import { useAnimate, stagger } from 'framer-motion';
import { createUser } from '../../app/actions/userActions';
import { useFormState, useFormStatus } from 'react-dom';

const initialState = {
	isError: false,
	message: '',
};

export default function RegisterForm({
	handleSwitch,
}: {
	handleSwitch: () => void;
}) {
	const [state, formAction] = useFormState(createUser, initialState);
	const { pending } = useFormStatus();
	const [scope, animate] = useAnimate();

	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordMatch, setPasswordMatch] = useState(true);

	useEffect(() => {
		if (state.isError) {
			animate(
				'input',
				{ x: [-10, 0, 10, 0] },
				{ type: 'spring', duration: 0.2, delay: stagger(0.05) }
			);
		}
	}, [state.isError, animate]);

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
		<form
			className={styles.container}
			role='form'
			action={formAction}
			ref={scope}
		>
			<h2 className={styles['container__heading']}>Signup</h2>
			{state.isError && (
				<p className={styles['container__error']}>{state.message}</p>
			)}
			<div className={styles['container__form_bundle']}>
				<div className={styles['container__form_group']}>
					<label
						className={styles['container__form_group__label']}
						htmlFor='emailRegister'
					>
						Email address
					</label>
					<input
						className={styles['container__form_group__input']}
						type='email'
						id='emailRegister'
						name='email'
						placeholder='name@email.com'
						title='Email is required'
						required
					/>
				</div>
				<div className={styles['container__form_group']}>
					<label
						className={styles['container__form_group__label']}
						htmlFor='nameRegister'
					>
						Name
					</label>
					<input
						className={styles['container__form_group__input']}
						type='text'
						id='nameRegister'
						name='name'
						placeholder='John'
						title='Name is required'
						required
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
						className={styles['container__form_group__label']}
						htmlFor='passwordRegister'
					>
						Password
					</label>
					<input
						className={styles['container__form_group__input']}
						type='password'
						id='passwordRegister'
						name='password'
						placeholder='********'
						min={6}
						pattern='.*[A-Z].*'
						title='Password must contain at least six characters and one uppercase letter'
						required
						value={password}
						onChange={handlePasswordChange}
					/>
				</div>
				<div className={styles['container__form_group']}>
					<label
						className={styles['container__form_group__label']}
						htmlFor='passwordConfirmRegister'
					>
						Password Confirm
					</label>
					<input
						className={styles['container__form_group__input']}
						type='password'
						id='passwordConfirmRegister'
						name='passwordConfirm'
						placeholder='********'
						min={6}
						required
						value={confirmPassword}
						onChange={handleConfirmPasswordChange}
						title={
							passwordMatch
								? 'Passwords match'
								: 'Passwords do not match'
						}
					/>
				</div>
			</div>
			<button
				type='submit'
				className='btn'
				disabled={pending || !passwordMatch}
			>
				Create Account
			</button>
			<p className={styles['container__switch']}>
				Already have an account?{' '}
				<button type='button' onClick={handleSwitch}>
					Login
				</button>
			</p>
		</form>
	);
}
