import UserNavigation from '@/components/navigation/UserNavigation/UserNavigation';
import styles from '@/styles/user_layout.module.scss';
import { SnapshotProvider } from '../context/SnapshotProvider';
import { cookies } from 'next/headers';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';

export default function UserLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const authenticated = cookies().get('token')?.value;
	const mode = cookies().get('mode')?.value;

	if (!authenticated) {
		redirect('/');
	}

	return (
		<main
			className={`${styles.main} ${
				mode === 'light' && styles.light_mode
			}`}
		>
			<UserNavigation />
			<SnapshotProvider>
				<Suspense fallback={<p>Loading content...</p>}>
					<section className='shadow'>{children}</section>
				</Suspense>
			</SnapshotProvider>
		</main>
	);
}
