import PreferencePersonalForm from '@/components/preferences/PreferencePersonalForm';
import { getUser } from '@/app/actions/userActions';
import PreferencePasswordForm from '@/components/preferences/PreferencePasswordForm';
import styles from '@/styles/preferences.module.scss';
import PreferencesSwitchDelete from '@/components/preferences/PreferencesSwitchDelete';
import { Metadata } from 'next';


export async function generateMetadata(): Promise<Metadata> {
	const response = await getUser();

    const name = response.name.endsWith('s') ? `${response.name}'` : `${response.name}'s`;
   
    return {
        title: `WealthWise - ${name} Preferences`,
    }
}

export default async function Preferences() {
	const response = await getUser();

    const name = response.name.endsWith('s') ? `${response.name}'` : `${response.name}'s`;

	return (
        <div className={styles.preferences_container}>
            <h1 className={styles['preferences_container__heading']}>{name} Preferences</h1>
            <PreferencePersonalForm name={response.name} email={response.email} />
            <PreferencePasswordForm />
            <PreferencesSwitchDelete values={[['euro', 'dollar'], ['dark', 'light']]} names={['currency', 'mode']} activeValues={[response.preference.currency, response.preference.mode]} />
        </div>
    );
}