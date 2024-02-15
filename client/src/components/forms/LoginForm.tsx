import styles from '@/styles/entry_form.module.scss';
import { stagger, useAnimate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm, type FieldValues } from 'react-hook-form';
import loginUser from '../../app/api/loginUser';
import { useRouter } from 'next/navigation';

export default function LoginForm({
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
		const response = await loginUser(data.email, data.password);

		if (response.status !== 200) {
			setError(`${response.data.status} ${response.data.message}`);
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
			<h2 className={styles['container__heading']}>Login</h2>
			{error && <p className={styles['container__error']}>{error}</p>}
			<div className={styles['container__form_group']}>
				{errors.email && (
					<p className={styles['container__error']}>
						{String(errors.email.message)}
					</p>
				)}
				<label
					className={styles['container__form_group__label']}
					htmlFor='emailLogin'
				>
					Email adress
				</label>
				<input
					className={styles['container__form_group__input']}
					type='email'
					id='emailLogin'
					placeholder='name@email.com'
					{...register('email', {
						required: 'Email is required',
					})}
				/>
			</div>
			<div className={styles['container__form_group']}>
				{errors.password && (
					<p className={styles['container__error']}>
						{String(errors.password.message)}
					</p>
				)}
				<label
					className={styles['container__form_group__label']}
					htmlFor='passwordLogin'
				>
					Password
				</label>
				<input
					className={styles['container__form_group__input']}
					type='password'
					id='passwordLogin'
					placeholder='********'
					{...register('password', {
						required: 'Password is required',
						minLength: {
							value: 6,
							message: 'Password must have at least 6 characters',
						},
						pattern: {
							value: /^(?=.*[A-Z]).{6,}$/,
							message:
								'Password must contain at least one uppercase letter',
						},
					})}
				/>
			</div>
			<button type='submit' className='btn' disabled={isSubmitting}>
				Login
			</button>
			<p className={styles['container__switch']}>
				Don&apos;t have an account?{' '}
				<button type='button' onClick={handleSwitch}>
					Register
				</button>
			</p>
		</form>
	);
}
