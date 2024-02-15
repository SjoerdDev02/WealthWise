import NavItem from '../NavItem/NavItem';
import styles from '@/styles/visitor_navigation.module.scss';
import Image from 'next/image';
import logo from '../../../../public/icons/logo.svg';
import Link from 'next/link';

export default function VisitorNavigation() {
	return (
		<nav className={styles.nav}>
			<ul className={styles.nav__list}>
				<li className={styles.nav__item}>
					<Link href='/'>
						<Image
							src={logo}
							alt='Logo image'
							style={{ maxWidth: '100%', height: 'auto' }}
						/>
					</Link>
				</li>
				<li className={styles.nav__item}>
					<NavItem href='/entry'>Login | Register</NavItem>
				</li>
			</ul>
		</nav>
	);
}
