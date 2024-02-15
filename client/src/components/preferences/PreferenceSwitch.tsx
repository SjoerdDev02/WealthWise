import styles from '@/styles/preference_switch.module.scss';
import Image from 'next/image';
import { useState } from 'react';
import euro_icon from '../../../public/icons/euro.svg';
import dollar_icon from '../../../public/icons/dollar.svg';
import dark_icon from '../../../public/icons/dark.svg';
import light_icon from '../../../public/icons/light.svg';
import { FieldValues, UseFormRegister } from 'react-hook-form';

export default function PreferenceSwitch({
	values,
	name,
	activeValue,
    register,
}: {
	values: string[];
	name: string;
	activeValue: string;
    register: UseFormRegister<FieldValues>
}) {
	const [value, setValue] = useState(activeValue);

	const icons: Record<string, any> = {
		euro: euro_icon,
		dollar: dollar_icon,
		dark: dark_icon,
		light: light_icon,
	};

	return (
		<article
			className={styles.container}
			onClick={() =>
				setValue(
					(prevValue) =>
						values.filter((item) => item !== prevValue)[0]
				)
			}
		>
			<Image
				className={styles.container__image}
				src={icons[value as keyof typeof icons]}
				alt='Dynamically loaded icon'
				style={{ maxWidth: '100%', height: 'auto' }}
			/>
			<h2 className={styles.container__heading}>{value}</h2>
			<input
				type='hidden'
				value={value}
				{...register(name)}
			/>
		</article>
	);
}
