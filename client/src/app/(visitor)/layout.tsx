import VisitorNavigation from "@/components/navigation/VisitorNavigation/VisitorNavigation";
import styles from '@/styles/visitor_layout.module.scss';
import { Suspense } from "react";

export default function VisitorLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
        <>
            <VisitorNavigation />
            <Suspense fallback={<p>Loading content...</p>}><main className={styles.main}>{children}</main></Suspense>
        </> 
    );
}
