'use client';

import { SnapshotContext } from '@/app/context/SnapshotContext';
import { useContext } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { SnapshotItemType } from '@/app/types/SnapshotType';
import styles from '@/styles/chart.module.scss';

Chart.register(ArcElement, Tooltip, Legend);

export default function PieChart({ title }: { title: string }) {
	const snapshot = useContext(SnapshotContext).snapshot;
	let chartData: SnapshotItemType[] = [];

    if (snapshot) {
        chartData = title === 'Investments' ? (snapshot.investments || []) : (snapshot.liabilities || []);
    }

    const data = {
        labels: chartData.map((item) => item.source),
        datasets: [
            {
                label: 'Euro',
                data: chartData.map((item) => item.amount),
                backgroundColor: [
                    '#42D292',
                    '#F0454D',
                    '#FAC722',
                    '#FE5100',
                ],
                borderColor: [
                    '#42D292',
                    '#F0454D',
                    '#FAC722',
                    '#FE5100',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <article className={styles.container}>
            <h2>{title}</h2>
            <div className={styles.container__chart}><Pie data={data} options={options} /></div>
        </article>
    );
}