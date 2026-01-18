import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TrackerType = 'wallet' | 'twitter' | 'discover' | 'pulse' | 'pnl';
export type DisplayMode = 'full' | 'compact' | 'icon';

export interface TrackerState {
    activeTracker: TrackerType;
    displayMode: DisplayMode;
}

const initialState: TrackerState = {
    activeTracker: 'pnl',
    displayMode: 'compact',
};

/**
 * Redux slice for managing tracker state and display settings.
 * 
 * @remarks
 * Handles the following state management concerns:
 * - Active tracker selection
 * - Display mode configuration
 * - State reset functionality
 * 
 * @example
 * ```typescript
 * // Dispatch actions
 * dispatch(setActiveTracker(trackerType));
 * dispatch(setDisplayMode(displayMode));
 * dispatch(resetTrackers());
 * ```
 */
const trackerSlice = createSlice({
    name: 'tracker',
    initialState,
    reducers: {
        setActiveTracker: (state, action: PayloadAction<TrackerType>) => {
            state.activeTracker = action.payload;
        },
        setDisplayMode: (state, action: PayloadAction<DisplayMode>) => {
            state.displayMode = action.payload;
        },
        resetTrackers: (state) => {
            state.activeTracker = initialState.activeTracker;
            state.displayMode = initialState.displayMode;
        },
    },
});

export const { setActiveTracker, setDisplayMode, resetTrackers } = trackerSlice.actions;
export default trackerSlice.reducer;
