import styles from '@/styles/chart_container.module.scss';
import BalanceContainer from './BalanceContainer';
import TotalContainer from './TotalContainer';
import PieChart from './PieChart';
import BarChart from './BarChart';

export default function ChartContainer() {
	return (
		<div className={styles.container}>
			<div className={styles.container__chart_container}>
				<BalanceContainer />
				<div
					className={
						styles.container__chart_container__total_container
					}
				>
					<TotalContainer title={'Total Income'} icon={'income'} />
					<TotalContainer
						title={'Total Expenses'}
						icon={'expenses'}
					/>
				</div>
			</div>
			<PieChart title={'Investments'} />
			<BarChart />
			<PieChart title={'Liabilities'} />
		</div>
	);
}
