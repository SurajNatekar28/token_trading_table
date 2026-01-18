import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type QuickBuySize = 'small' | 'large' | 'mega' | 'ultra';
export type MetricsSize = 'small' | 'large';
export type QuickBuyBehavior = 'nothing' | 'openPage' | 'openNewTab';

interface SettingsState {
    // Top Section
    metricsSize: MetricsSize;
    quickBuySize: QuickBuySize;

    // Layout Tab
    showSearchBar: boolean;
    noDecimals: boolean;
    showHiddenTokens: boolean;
    unhideOnMigrated: boolean;
    circleImages: boolean;
    progressBar: boolean;

    // Row Tab
    colorRow: boolean;

    // Extras Tab
    tableLayout: 'newPairs' | 'finalStretch' | 'migrated';
    quickBuyBehavior: QuickBuyBehavior;
}

const initialState: SettingsState = {
    metricsSize: 'large',
    quickBuySize: 'small',

    showSearchBar: true,
    noDecimals: false,
    showHiddenTokens: false,
    unhideOnMigrated: true,
    circleImages: false,
    progressBar: false,

    colorRow: true,

    tableLayout: 'newPairs',
    quickBuyBehavior: 'nothing',
};

/**
 * Redux slice for managing application settings.
 *
 * This slice contains reducers for updating various UI and behavioral settings,
 * such as metrics size, quick buy size, visibility toggles, table layout, and more.
 *
 * ### Reducers:
 * - `setMetricsSize`: Sets the size of metrics display.
 * - `setQuickBuySize`: Sets the size of the quick buy component.
 * - `toggleShowSearchBar`: Toggles the visibility of the search bar.
 * - `toggleNoDecimals`: Toggles the display of decimals.
 * - `toggleShowHiddenTokens`: Toggles the visibility of hidden tokens.
 * - `toggleUnhideOnMigrated`: Toggles whether to unhide tokens on migration.
 * - `toggleCircleImages`: Toggles the use of circular images.
 * - `toggleProgressBar`: Toggles the display of a progress bar.
 * - `toggleColorRow`: Toggles row coloring in the table.
 * - `setTableLayout`: Sets the current table layout (`'newPairs'`, `'finalStretch'`, or `'migrated'`).
 * - `setQuickBuyBehavior`: Sets the behavior for the quick buy feature.
 *
 * @module settingsSlice
 */
const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setMetricsSize: (state, action: PayloadAction<MetricsSize>) => {
            state.metricsSize = action.payload;
        },
        setQuickBuySize: (state, action: PayloadAction<QuickBuySize>) => {
            state.quickBuySize = action.payload;
        },
        toggleShowSearchBar: (state) => {
            state.showSearchBar = !state.showSearchBar;
        },
        toggleNoDecimals: (state) => {
            state.noDecimals = !state.noDecimals;
        },
        toggleShowHiddenTokens: (state) => {
            state.showHiddenTokens = !state.showHiddenTokens;
        },
        toggleUnhideOnMigrated: (state) => {
            state.unhideOnMigrated = !state.unhideOnMigrated;
        },
        toggleCircleImages: (state) => {
            state.circleImages = !state.circleImages;
        },
        toggleProgressBar: (state) => {
            state.progressBar = !state.progressBar;
        },
        toggleColorRow: (state) => {
            state.colorRow = !state.colorRow;
        },
        setTableLayout: (state, action: PayloadAction<'newPairs' | 'finalStretch' | 'migrated'>) => {
            state.tableLayout = action.payload;
        },
        setQuickBuyBehavior: (state, action: PayloadAction<QuickBuyBehavior>) => {
            state.quickBuyBehavior = action.payload;
        },
    },
});

export const {
    setMetricsSize,
    setQuickBuySize,
    toggleShowSearchBar,
    toggleNoDecimals,
    toggleShowHiddenTokens,
    toggleUnhideOnMigrated,
    toggleCircleImages,
    toggleProgressBar,
    toggleColorRow,
    setTableLayout,
    setQuickBuyBehavior,
} = settingsSlice.actions;

export default settingsSlice.reducer;
