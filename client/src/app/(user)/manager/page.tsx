import ManagerData from '@/components/manager/ManagerData';
import { getUser } from '@/app/actions/userActions';
import Snapshotshuffle from '@/components/manager/SnapshotShuffle';
import styles from '@/styles/manager.module.scss';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
	const response = await getUser();

    const name = response.name.endsWith('s') ? `${response.name}'` : `${response.name}'s`;
   
    return {
        title: `WealthWise - ${name} Finances`,
    }
}

export default async function Manager() {
	const user = await getUser();

    const currentTime = new Date();
    const month = currentTime.toLocaleString('en-US', { month: 'long' });
    const day = currentTime.toLocaleString('en-US', { weekday: 'long' });    
    const dayInfo = `${day}, ${currentTime.getDate()} ${month}, ${currentTime.getFullYear()}`;

	return (
        <div className={styles.container}>
            <header className={styles.container__header}>
                <div className={styles.container__header__left}>
                    <h1 className={styles.container__header__heading}>Hi {user.name}</h1>
                    <h2 className={styles.container__header__heading}>{dayInfo}</h2>
                </div>
                <Snapshotshuffle />
            </header>
            <ManagerData />
        </div>
    );
}
