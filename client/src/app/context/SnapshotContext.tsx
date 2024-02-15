import { createContext } from 'react';
import { SnapshotType } from '../types/SnapshotType';

type SnapshotContextType = {
    snapshot: SnapshotType | null;
    changeSnapshot: (direction: string) => void;
};

export const SnapshotContext = createContext<SnapshotContextType>({
    snapshot: null,
    changeSnapshot: () => {},
});