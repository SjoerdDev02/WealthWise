export type SnapshotItemType = {
    id: number,
    source: string,
    amount: string | number,
}

export type SnapshotType = {
    id: number,
    year: string | number,
    month: string | number,
    income: string | number,
    expenses: string | number,
    total_investments: string | number,
    total_liabilities: string | number,
    investments?: SnapshotItemType[],
    liabilities?: SnapshotItemType[],
};