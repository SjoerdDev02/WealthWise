'use client';

import logoutUser from '../../../app/api/logoutUser';
import Image from 'next/image';
import logout_icon from '../../../../public/icons/logout.svg';
import styles from '@/styles/nav_item.module.scss';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();

    async function handleLogout() {
        const response = await logoutUser();

        console.log(response);

        router.push('/');
    }


    return (
        <button className={styles.nav__item} style={{ border: 'none' }} onClick={handleLogout}>
            <Image
                src={logout_icon}
                alt='Logout icon'
                style={{ maxWidth: '75%', height: 'auto' }}
            />
        </button>
    );
}