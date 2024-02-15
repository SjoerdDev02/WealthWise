import NavItem from '../NavItem/NavItem';
import styles from '@/styles/user_navigation.module.scss';
import Image from 'next/image';
import logo_icon from '../../../../public/icons/logo.svg';
import dashboard_icon from '../../../../public/icons/dashboard.svg';
import manager_icon from '../../../../public/icons/manager.svg';
import preferences_icon from '../../../../public/icons/preferences.svg';
import Link from 'next/link';
import LogoutButton from '../LogoutButton/LogoutButton';

export default function UserNavigation() {
	return (
		<nav className={`shadow ${styles.nav}`}>
			<ul className={styles.nav__list}>
				<li className={styles.nav__item}>
					<Link href='/dashboard'>
						<Image
							src={logo_icon}
							alt='Logo image'
							style={{ maxWidth: '100%', height: 'auto' }}
						/>
					</Link>
				</li>
				<div className={styles['nav__list__container']}>
					<li className={styles.nav__item}>
						<NavItem href='/dashboard'>
							<Image
								src={dashboard_icon}
								alt='Dashboard icon'
								style={{ maxWidth: '75%', height: 'auto' }}
							/>
						</NavItem>
					</li>
					<li className={styles.nav__item}>
						<NavItem href='/manager'>
							<Image
								src={manager_icon}
								alt='Manager icon'
								style={{ maxWidth: '75%', height: 'auto' }}
							/>
						</NavItem>
					</li>
					<li className={styles.nav__item}>
						<NavItem href='/preferences'>
							<Image
								src={preferences_icon}
								alt='Preferences icon'
								style={{ maxWidth: '75%', height: 'auto' }}
							/>
						</NavItem>
					</li>
					<li className={styles.nav__item}>
						<LogoutButton />
					</li>
				</div>
			</ul>
		</nav>
	);
}
