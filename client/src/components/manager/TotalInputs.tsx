import { UseFormRegister, FieldErrors, FieldValues } from 'react-hook-form';
import styles from '@/styles/entry_form.module.scss';
import classes from '@/styles/manager_form.module.scss';

type TotalInputsProps = {
    income: string | number,
    expenses: string | number,
    total_investments: string | number,
    total_liabilities: string | number,
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors<FieldValues>;
};

export default function TotalInputs({ income, expenses, total_investments, total_liabilities, register, errors }: TotalInputsProps) {
    return (
        <article className={classes.container}>
            <h3>Total balance: € ?</h3>
            <div>
                <div className={styles['container__form_bundle']} style={{ margin: '1rem 0' }}>
                    <div className={styles['container__form_group']}>
                        {errors.income && (
                            <p className={styles['container__error']}>
                                {String(errors.income.message)}
                            </p>
                        )}
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
                            placeholder='2000,00'
                            {...register('income', {
                                required: 'Income is required',
                            })}
                            defaultValue={income}
                        />
                    </div>
                    <div className={styles['container__form_group']}>
                        {errors.expenses && (
                            <p className={styles['container__error']}>
                                {String(errors.expenses.message)}
                            </p>
                        )}
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
                            placeholder='1800,00'
                            {...register('expenses', {
                                required: 'Expenses is required',
                            })}
                            defaultValue={expenses}
                        />
                    </div>
                </div>
                <div className={styles['container__form_bundle']} style={{ margin: '1rem 0' }}>
                    <div className={styles['container__form_group']}>
                        {errors.total_investments && (
                            <p className={styles['container__error']}>
                                {String(errors.total_investments.message)}
                            </p>
                        )}
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
                            placeholder='2000,00'
                            {...register('total_investments', {
                                required: 'Investments is required',
                            })}
                            defaultValue={total_investments}
                        />
                    </div>
                    <div className={styles['container__form_group']}>
                        {errors.total_liabilities && (
                            <p className={styles['container__error']}>
                                {String(errors.total_liabilities.message)}
                            </p>
                        )}
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
                            placeholder='1800,00'
                            {...register('total_liabilities', {
                                required: 'Liabilities is required',
                            })}
                            defaultValue={total_liabilities}
                        />
                    </div>
                </div>
            </div>
        </article>
    );
}