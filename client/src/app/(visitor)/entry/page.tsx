'use client';

import LoginForm from '@/components/entry/LoginForm';
import RegisterForm from '@/components/entry/RegisterForm';
import styles from '@/styles/entry.module.scss';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Entry() {
	const [formState, setFormState] = useState(true);
    const [isMobile, setIsMobile] = useState(true);

	const mobileVariant = {
		hidden: { opacity: 0, y: 30 },
		visible: { opacity: 1, y: 0 },
	};

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

	return (
		<section className={`shadow ${styles.container}`}>
			{((formState && isMobile) || !isMobile) && (
				<motion.div
					variants={mobileVariant}
					initial={isMobile ? 'hidden' : ''}
					animate={isMobile && 'visible'}
					exit={isMobile ? 'hidden' : ''}
					className={styles['container__side']}
				>
					<LoginForm
						handleSwitch={() =>
							setFormState((prevState) => !prevState)
						}
					/>
				</motion.div>
			)}
			{((!formState && isMobile) || !isMobile) && (
				<motion.div
					variants={mobileVariant}
					initial={isMobile ? 'hidden' : ''}
					animate={isMobile && 'visible'}
					exit={isMobile ? 'hidden' : ''}
					className={styles['container__side']}
				>
					<RegisterForm
						handleSwitch={() =>
							setFormState((prevState) => !prevState)
						}
					/>
				</motion.div>
			)}
			<motion.div
				animate={{
					left: formState ? '2%' : '',
					right: !formState ? '2%' : '',
				}}
				className={styles['container__form_cover']}
			>
				<h1 className={styles['container__form_cover__heading']}>
					Start Your Money Makeover Today
				</h1>
				<div className={styles['container__form_cover__image']}></div>
			</motion.div>
		</section>
	);
}
