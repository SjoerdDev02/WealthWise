import Link from 'next/link';
import styles from '@/styles/not_found.module.scss';

export default function NotFound() {
	return (
		<div className={styles.container}>
			<h1 className={styles.container__heading_one}>404</h1>
			<h2 className={styles.container__heading_two}>Page Not Found</h2>
			<Link className='btn' href='/'>GO TO HOMEPAGE</Link>
		</div>
	);
}
