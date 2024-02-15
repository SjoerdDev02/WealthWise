'use client';

import { SnapshotContext } from '@/app/context/SnapshotContext';
import { useContext } from 'react';
import Image from 'next/image';
import balance_icon from '../../../public/icons/balance.svg';
import positive_icon from '../../../public/icons/positive.svg';
import negative_icon from '../../../public/icons/negative.svg';
import styles from '@/styles/balance_container.module.scss';

export default function BalanceContainer() {
	const snapshot = useContext(SnapshotContext).snapshot;
	let balance = 0;

	if (snapshot) {
		balance =
			parseInt(snapshot.income.toString()) -
			parseInt(snapshot.expenses.toString()) +
			parseInt(snapshot.total_investments.toString()) -
			parseInt(snapshot.total_liabilities.toString());
	}

	return (
		<article className={styles.container}>
			<Image
				src={balance_icon}
				alt='Balance icon'
				style={{ maxWidth: '75%', height: 'auto' }}
			/>
			<h2 className={styles.container__heading}>Total Balance</h2>
			<hr className={styles.container__divider} />
			<h2 className={styles.container__heading}>€{balance}</h2>
			<Image
				src={balance >= 0 ? positive_icon : negative_icon}
				alt='Positivity icon'
				style={{ maxWidth: '75%', height: 'auto' }}
			/>
		</article>
	);
}
