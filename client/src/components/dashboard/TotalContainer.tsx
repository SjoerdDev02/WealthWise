'use client';

import { SnapshotContext } from '@/app/context/SnapshotContext';
import { useContext } from 'react';
import income_icon from '../../../public/icons/income.svg';
import expenses_icon from '../../../public/icons/expenses.svg';
import Image from 'next/image';
import styles from '@/styles/total_container.module.scss';

export default function TotalContainer({
	title,
	icon,
}: {
	title: string;
	icon: string;
}) {
	const snapshot = useContext(SnapshotContext).snapshot;
	let amount = 0;

	if (snapshot) {
		amount = title === 'income' ? parseInt(snapshot.income.toString()) : parseInt(snapshot.expenses.toString());
	}
	
	return (
		<article className={styles.container}>
			<header className={styles.container__header}>
				<h3>{title}</h3>
				<Image
					src={icon === 'income' ? income_icon : expenses_icon}
					alt='Positivity icon'
					style={{ maxWidth: '75%', height: 'auto' }}
				/>
			</header>
			<h3>€{amount}</h3>
		</article>
	);
}