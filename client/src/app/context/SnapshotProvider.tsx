'use client';

import { SnapshotContext } from './SnapshotContext';
import { useState, useEffect } from 'react';
import getSnapshot from '../api/getSnapshot';
import createSnapshot from '../api/createSnapshot';
import { SnapshotType } from '../types/SnapshotType';

export const SnapshotProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [snapshot, setSnapshot] = useState<SnapshotType | null>(null);

	const fetchSnapshot = async (
		year?: string | number,
		month?: string | number
	) => {
		try {
			let snapshotData: SnapshotType | null = null;

			snapshotData = await getSnapshot(
				year?.toString(),
				month?.toString()
			);

			if (!snapshotData && year && month) {
				snapshotData = await createSnapshot(
					year.toString(),
					month.toString()
				);
			}

			setSnapshot(snapshotData);
		} catch (error) {
			console.error('Error fetching snapshot:', error);
		}
	};

	useEffect(() => {
		fetchSnapshot();
	}, []);

	const changeSnapshot = (direction: string) => {
		if (direction === 'previous') {
			if (snapshot && snapshot.month == '1') {
				fetchSnapshot(parseInt(snapshot.year.toString()) - 1, 12);
			} else if (snapshot && snapshot.year != '1') {
				fetchSnapshot(
					parseInt(snapshot.year.toString()),
					parseInt(snapshot.month.toString()) - 1
				);
			}
		} else if (direction === 'next') {
			if (snapshot && snapshot.month == '12') {
				fetchSnapshot(parseInt(snapshot.year.toString()) + 1, 1);
			} else if (snapshot && snapshot.month != '12') {
				fetchSnapshot(
					parseInt(snapshot.year.toString()),
					parseInt(snapshot.month.toString()) + 1
				);
			}
		}
	};

	return (
		<SnapshotContext.Provider value={{ snapshot, changeSnapshot }}>
			{children}
		</SnapshotContext.Provider>
	);
};
