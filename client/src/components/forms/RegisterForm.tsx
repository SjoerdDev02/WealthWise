import styles from '@/styles/entry_form.module.scss';
import { useForm, type FieldValues } from 'react-hook-form';
import { useAnimate, stagger } from 'framer-motion';
import { useEffect, useState } from 'react';
import createUser from '../../app/api/createUser';
import { useRouter } from 'next/navigation';

export default function RegisterForm({
	handleSwitch,
}: {
	handleSwitch: () => void;
}) {
	const [error, setError] = useState<string | null>(null);
	const [scope, animate] = useAnimate();
	const router = useRouter();

	const {
		register,
		formState: { errors, isSubmitting },
		handleSubmit,
		watch,
		reset,
	} = useForm();

	useEffect(() => {
		if (errors) {
			animate(
				'input',
				{ x: [-10, 0, 10, 0] },
				{ type: 'spring', duration: 0.2, delay: stagger(0.05) }
			);
		}
	}, [errors, animate]);

	async function onSubmit(data: FieldValues) {
		const response = await createUser(
			data.name,
			data.email,
			data.password,
			data.passwordConfirm
		);
		console.log(response);

		if (response.status !== 200) {
			setError(response.data.message);
			return;
		}

		reset();
		router.push('/dashboard');
	}

	return (
		<form
			className={styles.container}
			role='form'
			onSubmit={handleSubmit(onSubmit)}
			ref={scope}
		>
			<h2 className={styles['container__heading']}>Signup</h2>
			{error && <p className={styles['container__error']}>{error}</p>}
			<div className={styles['container__form_bundle']}>
				<div className={styles['container__form_group']}>
					{errors.email && (
						<p className={styles['container__error']}>
							{String(errors.email.message)}
						</p>
					)}
					<label
						className={styles['container__form_group__label']}
						htmlFor='emailRegister'
					>
						Email adress
					</label>
					<input
						className={styles['container__form_group__input']}
						type='email'
						id='emailRegister'
						placeholder='name@email.com'
						{...register('email', {
							required: 'Email is required',
						})}
					/>
				</div>
				<div className={styles['container__form_group']}>
					{errors.name && (
						<p className={styles['container__error']}>
							{String(errors.name.message)}
						</p>
					)}
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
						placeholder='John'
						{...register('name', {
							required: 'Name is required',
						})}
					/>
				</div>
			</div>
			<div className={styles['container__form_bundle']}>
				<div className={styles['container__form_group']}>
					{errors.password && (
						<p className={styles['container__error']}>
							{String(errors.password.message)}
						</p>
					)}
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
						placeholder='********'
						{...register('password', {
							required: 'Password is required',
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
					{errors.passwordConfirm && (
						<p className={styles['container__error']}>
							{String(errors.passwordConfirm.message)}
						</p>
					)}
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
						placeholder='********'
						{...register('passwordConfirm', {
							required: 'Confirmation is required',
							validate: (value) =>
								value === watch('password') ||
								'Passwords do not match',
						})}
					/>
				</div>
			</div>
			<button type='submit' className='btn' disabled={isSubmitting}>
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
