'use client';

import styles from '@/styles/snapshot_shuffle.module.scss';
import { useContext } from 'react';
import { SnapshotContext } from '@/app/context/SnapshotContext';

export default function Snapshotshuffle() {
	const { snapshot, changeSnapshot } = useContext(SnapshotContext);

	return (
		<div className={styles.container}>
			<button
				className={styles.container__button}
				onClick={() => changeSnapshot('previous')}
			>
				&#9664;
			</button>
			<h2 className={styles.container__date}>{snapshot ? `${Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(snapshot.month))} ${snapshot.year}` : 'Loading..'}</h2>
			<button
				className={styles.container__button}
				onClick={() => changeSnapshot('next')}
			>
				&#9654;
			</button>
		</div>
	);
}
