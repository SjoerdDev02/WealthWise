import styles from '@/styles/entry_form.module.scss';
import { stagger, useAnimate } from 'framer-motion';
import { useEffect } from 'react';
import { loginUser } from '@/app/actions/userActions';
import { useFormState, useFormStatus } from 'react-dom';

const initialState = {
	isError: false,
	message: '',
};

export default function LoginForm({
	handleSwitch,
}: {
	handleSwitch: () => void;
}) {
	const [state, formAction] = useFormState(loginUser, initialState);
	const { pending } = useFormStatus();
	const [scope, animate] = useAnimate();

	useEffect(() => {
		if (state.isError) {
			animate(
				'input',
				{ x: [-10, 0, 10, 0] },
				{ type: 'spring', duration: 0.2, delay: stagger(0.05) }
			);
		}
	}, [state.isError, animate]);

	return (
		<form
			className={styles.container}
			role='form'
			action={formAction}
			ref={scope}
		>
			<h2 className={styles['container__heading']}>Login</h2>
			{state.isError && <p className={styles['container__error']}>{state.message}</p>}
			<div className={styles['container__form_group']}>
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
					name='email'
					title='Email is required'
					required
				/>
			</div>
			<div className={styles['container__form_group']}>
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
					name='password'
					placeholder='********'
					minLength={6}
					pattern='.*[A-Z].*'
					title='Password must contain at least six characters and one uppercase letter'
					required
				/>
			</div>
			<button type='submit' className='btn' disabled={pending}>
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