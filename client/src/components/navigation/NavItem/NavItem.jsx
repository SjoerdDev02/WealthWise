'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/styles/nav_item.module.scss';

export default function NavItem({ href, children }) {
    const pathname = usePathname();

    return (
        <Link href={href} className={`${styles.nav__item} ${pathname === href ? styles['--active'] : ''}`}>
            {children}
        </Link>
    );
}
