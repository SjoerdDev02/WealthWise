import styles from '@/styles/home.module.scss';
import Image from 'next/image';
import desktop_preview from '../../../public/images/desktop_preview.png';
import ipad_preview from '../../../public/images/ipad_preview.png';
import Link from 'next/link';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'WealthWise - Home',
};

export default function Home() {
	return (
		<section className={styles.container}>
			<div className={styles['container__left']}>
				<h1 className={styles['container__left__heading']}>
					Master Your Money: Effortless Finance Tracking.
					<br />
					<span style={{ fontWeight: 'bold' }}>
						Anytime, Anywhere
					</span>
				</h1>
				<Link href='/entry' className='btn'>
					Get Started Now
				</Link>
			</div>
			<div className={styles['container__right']}>
				<Image
					className={styles['container__right__image__ipad']}
					src={ipad_preview}
					alt='Preview of WealthWise'
					width={2400}
					height={3201}
					layout='responsive'
				/>
				<Image
					className={styles['container__right__image__desktop']}
					src={desktop_preview}
					alt='Preview of WealthWise'
					width={1440}
					height={940}
					layout='responsive'
				/>
				<div
					className={`${styles['container__right__blur_circle']} ${styles['container__right__blur_circle--top']}`}
				></div>
				<div
					className={`${styles['container__right__blur_circle']} ${styles['container__right__blur_circle--bottom']}`}
				></div>
			</div>
		</section>
	);
}
