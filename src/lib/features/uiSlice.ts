import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UiState {
    isTradingSettingsOpen: boolean;
    isOrderTrackersOpen: boolean;
    isNotificationsOpen: boolean;
    isThemeOpen: boolean;
}

const initialState: UiState = {
    isTradingSettingsOpen: false,
    isOrderTrackersOpen: false,
    isNotificationsOpen: false,
    isThemeOpen: false,
};

/**
 * UI Slice
 * --------
 * Manages the visibility state of various UI modals across the application.
 *
 * This slice controls:
 * - Trading Settings modal
 * - Order Trackers modal
 * - Notifications modal
 * - Theme selector modal
 *
 * Provides reducers to individually toggle each modal, as well as a utility
 * reducer (`closeAllModals`) to close all open UI dialogs at once.
 */
const uiSlice = createSlice({
    name: 'ui',

    /**
     * The initial UI state containing the visibility flags
     * for all modals.
     */
    initialState,

    reducers: {
        /**
         * Toggles the visibility of the Trading Settings modal.
         *
         * @param state - The current UI state.
         * @param action - A boolean indicating whether the modal should be open.
         */
        setTradingSettingsOpen: (state, action: PayloadAction<boolean>) => {
            state.isTradingSettingsOpen = action.payload;
        },

        /**
         * Toggles the visibility of the Order Trackers modal.
         *
         * @param state - The current UI state.
         * @param action - A boolean indicating whether the modal should be open.
         */
        setOrderTrackersOpen: (state, action: PayloadAction<boolean>) => {
            state.isOrderTrackersOpen = action.payload;
        },

        /**
         * Toggles the visibility of the Notifications panel/modal.
         *
         * @param state - The current UI state.
         * @param action - A boolean indicating whether the notifications should be visible.
         */
        setNotificationsOpen: (state, action: PayloadAction<boolean>) => {
            state.isNotificationsOpen = action.payload;
        },

        /**
         * Toggles the visibility of the Theme selector modal.
         *
         * @param state - The current UI state.
         * @param action - A boolean indicating whether the theme modal should be open.
         */
        setThemeOpen: (state, action: PayloadAction<boolean>) => {
            state.isThemeOpen = action.payload;
        },

        /**
         * Closes all UI modals at once.
         *
         * Useful when navigating away from the current screen or performing
         * a global UI reset action.
         *
         * @param state - The current UI state.
         */
        closeAllModals: (state) => {
            state.isTradingSettingsOpen = false;
            state.isOrderTrackersOpen = false;
            state.isNotificationsOpen = false;
            state.isThemeOpen = false;
        }
    },
});

export const {
    setTradingSettingsOpen,
    setOrderTrackersOpen,
    setNotificationsOpen,
    setThemeOpen,
    closeAllModals
} = uiSlice.actions;

export default uiSlice.reducer;
