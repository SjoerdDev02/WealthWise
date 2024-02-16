import styles from '@/styles/entry_form.module.scss';
import classes from '@/styles/manager_form.module.scss';

type TotalInputsProps = {
    income: string | number,
    expenses: string | number,
    total_investments: string | number,
    total_liabilities: string | number,
};

export default function TotalInputs({ income, expenses, total_investments, total_liabilities }: TotalInputsProps) {
    return (
        <article className={classes.container}>
            <h3>Total balance: € ?</h3>
            <div>
                <div className={styles['container__form_bundle']} style={{ margin: '1rem 0' }}>
                    <div className={styles['container__form_group']}>
                        <label
                            className={styles['container__form_group__label']}
                            htmlFor='income'
                        >
                            Total Income
                        </label>
                        <input
                            className={styles['container__form_group__input']}
                            type='text'
                            id='income'
                            name='income'
                            placeholder='2000,00'
                            defaultValue={income}
                            title='Income is required'
                            required
                        />
                    </div>
                    <div className={styles['container__form_group']}>
                        <label
                            className={styles['container__form_group__label']}
                            htmlFor='expenses'
                        >
                            Total Expenses
                        </label>
                        <input
                            className={styles['container__form_group__input']}
                            type='text'
                            id='expenses'
                            name='expenses'
                            placeholder='1800,00'
                            defaultValue={expenses}
                            title='Expenses is required'
                            required
                        />
                    </div>
                </div>
                <div className={styles['container__form_bundle']} style={{ margin: '1rem 0' }}>
                    <div className={styles['container__form_group']}>
                        <label
                            className={styles['container__form_group__label']}
                            htmlFor='total_investments'
                        >
                            Total Investments
                        </label>
                        <input
                            className={styles['container__form_group__input']}
                            type='text'
                            id='total_investments'
                            name='total_investments'
                            placeholder='2000,00'
                            defaultValue={total_investments}
                            title='Investments is required'
                            required
                        />
                    </div>
                    <div className={styles['container__form_group']}>
                        <label
                            className={styles['container__form_group__label']}
                            htmlFor='total_liabilities'
                        >
                            Total Liabilities
                        </label>
                        <input
                            className={styles['container__form_group__input']}
                            type='text'
                            id='total_liabilities'
                            name='total_liabilities'
                            placeholder='1800,00'
                            defaultValue={total_liabilities}
                            title='Liabilities is required'
                            required
                        />
                    </div>
                </div>
            </div>
        </article>
    );
}