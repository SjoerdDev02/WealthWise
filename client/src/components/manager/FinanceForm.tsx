import { useState } from 'react';
import styles from '@/styles/entry_form.module.scss';
import classes from '@/styles/manager_form.module.scss';
import { SnapshotItemType } from '@/app/types/SnapshotType';

export default function FinanceForm({
	type,
	data,
}: {
	type: string;
	data: SnapshotItemType[];
}) {
	const [formItems, setFormItems] =
		useState<{ source: string; amount: string | number }[]>(data);
	const [source, setSource] = useState('');
	const [amount, setAmount] = useState('');

	const addItem = () => {
		setFormItems((prevItems) => [...prevItems, { source, amount }]);
		setSource('');
		setAmount('');
	};

	const deleteItem = (index: number) => {
		const filteredItems = formItems.filter((_, i) => i !== index);
		setFormItems(filteredItems);
	};

	return (
		<article className={classes.container}>
			<h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
			<div className={classes.container__input_container}>
				<div
					className={styles['container__form_bundle']}
					style={{ margin: '1rem 0' }}
				>
					<div className={styles['container__form_group']}>
						<label
							className={styles['container__form_group__label']}
							htmlFor='source'
						>
							Source
						</label>
						<input
							className={styles['container__form_group__input']}
							type='text'
							id='source'
							placeholder='Stocks'
							value={source}
							onChange={(e) => setSource(e.target.value)}
							name='source'
						/>
					</div>
					<div className={styles['container__form_group']}>
						<label
							className={styles['container__form_group__label']}
							htmlFor='amount'
						>
							Amount
						</label>
						<input
							className={styles['container__form_group__input']}
							type='text'
							id='amount'
							placeholder='4200,00'
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							name='amount'
						/>
					</div>
					<button className='btn' type='button' onClick={addItem}>
						+
					</button>
				</div>
			</div>
			{formItems.map((item, index) => (
				<article
					key={index}
					className={classes.container__item_container}
					onClick={() => deleteItem(index)}
				>
					<input
						type='hidden'
						name={`${type}_source`}
						defaultValue={item.source}
					/>
					<input
						type='hidden'
						name={`${type}_amount`}
						defaultValue={item.amount}
					/>
					<p>{item.source}</p>
					<p>€{item.amount}</p>
				</article>
			))}
		</article>
	);
}
