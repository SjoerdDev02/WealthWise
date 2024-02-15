'use client';

import { SnapshotContext } from '@/app/context/SnapshotContext';
import { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from '@/styles/chart.module.scss';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart() {
    const snapshot = useContext(SnapshotContext).snapshot;
	let income = 0;
    let expenses = 0;
    let investments = 0;
    let liabilities = 0;

    if (snapshot) {
        income = parseInt(snapshot.income.toString());
        expenses = parseInt(snapshot.expenses.toString());
        investments = parseInt(snapshot.total_investments.toString());
        liabilities = parseInt(snapshot.total_liabilities.toString());
    }

    const data = {
        labels: ['Income', 'Expenses', 'Investments', 'Liabilities'],
        datasets: [
            {
                label: 'Amount',
                data: [income, expenses, investments, liabilities],
                backgroundColor: [
					'#42D292',
					'#F0454D',
					'#FAC722',
					'#FE5100',
                ],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Totals',
                font: {
                    size: 16,
                },
            },
            legend: {
                display: false,
            },
        },
    };

    return (
        <article className={styles.container}>
            <Bar data={data} options={options} />
        </article>
    );
}