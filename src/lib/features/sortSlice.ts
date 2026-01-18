import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SortField = 'marketCap' | 'volume' | 'liquidity' | 'time' | 'price' | 'holders';
export type SortDirection = 'asc' | 'desc';
export type ColumnType = 'new' | 'final_stretch' | 'migrated';

interface ColumnSortState {
    field: SortField | null;
    direction: SortDirection;
}

interface SortState {
    // Independent sort state for each column
    new: ColumnSortState;
    final_stretch: ColumnSortState;
    migrated: ColumnSortState;
}

const defaultColumnState: ColumnSortState = {
    field: null,
    direction: 'desc', // Default to descending (highest first)
};

const initialState: SortState = {
    new: { ...defaultColumnState },
    final_stretch: { ...defaultColumnState },
    migrated: { ...defaultColumnState },
};

/**
 * Redux slice for managing sorting state of table columns.
 *
 * @remarks
 * This slice provides reducers to set the sort field and direction for each column,
 * toggle the sort direction, reset individual column sort state, and reset all columns
 * to their default sort state.
 *
 * @example
 * // Set sort field and direction for a column
 * dispatch(setSortBy({ column: 'new', field: 'price' }));
 *
 * // Toggle sort direction for a column
 * dispatch(toggleSortDirection('final_stretch'));
 *
 * // Reset sort state for a specific column
 * dispatch(resetSort('migrated'));
 *
 * // Reset sort state for all columns
 * dispatch(resetAllSorts());
 */
export const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setSortBy: (state, action: PayloadAction<{ column: ColumnType; field: SortField }>) => {
            const { column, field } = action.payload;
            // If same field, toggle direction; otherwise set new field with desc
            if (state[column].field === field) {
                state[column].direction = state[column].direction === 'asc' ? 'desc' : 'asc';
            } else {
                state[column].field = field;
                state[column].direction = 'desc';
            }
        },
        toggleSortDirection: (state, action: PayloadAction<ColumnType>) => {
            const column = action.payload;
            state[column].direction = state[column].direction === 'asc' ? 'desc' : 'asc';
        },
        resetSort: (state, action: PayloadAction<ColumnType>) => {
            const column = action.payload;
            state[column] = { ...defaultColumnState };
        },
        resetAllSorts: (state) => {
            state.new = { ...defaultColumnState };
            state.final_stretch = { ...defaultColumnState };
            state.migrated = { ...defaultColumnState };
        },
    },
});

export const {
    setSortBy,
    toggleSortDirection,
    resetSort,
    resetAllSorts,
} = sortSlice.actions;

export default sortSlice.reducer;
