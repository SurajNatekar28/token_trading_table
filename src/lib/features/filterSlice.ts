import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
    keywords: string;
    excludeKeywords: string;
    minLiquidity: number | null;
    maxLiquidity: number | null;
    minVolume: number | null;
    maxVolume: number | null;
    deselectedProtocols: string[]; // Protocols to EXCLUDE
    deselectedQuoteTokens: string[]; // Quote tokens to EXCLUDE
    activeIconFilters: {
        settings: boolean;
        star: boolean;
        chart: boolean;
    };
}

const initialState: FilterState = {
    keywords: '',
    excludeKeywords: '',
    minLiquidity: null,
    maxLiquidity: null,
    minVolume: null,
    maxVolume: null,
    deselectedProtocols: [], // Empty = show all
    deselectedQuoteTokens: [], // Empty = show all
    activeIconFilters: {
        settings: false,
        star: false,
        chart: false,
    },
};

/**
 * Redux slice for managing filter state in the token trading table application.
 *
 * @remarks
 * This slice contains reducers for updating various filter criteria such as keywords,
 * liquidity, volume, protocol and quote token selections, as well as toggling icon-based filters.
 * It also provides a reducer to reset all filters to their initial state.
 *
 * @example
 * // Dispatching an action to set keywords
 * dispatch(setKeywords('ETH'));
 *
 * @public
 */
export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setKeywords: (state, action: PayloadAction<string>) => {
            state.keywords = action.payload;
        },
        setExcludeKeywords: (state, action: PayloadAction<string>) => {
            state.excludeKeywords = action.payload;
        },
        setMinLiquidity: (state, action: PayloadAction<number | null>) => {
            state.minLiquidity = action.payload;
        },
        setMaxLiquidity: (state, action: PayloadAction<number | null>) => {
            state.maxLiquidity = action.payload;
        },
        setMinVolume: (state, action: PayloadAction<number | null>) => {
            state.minVolume = action.payload;
        },
        setMaxVolume: (state, action: PayloadAction<number | null>) => {
            state.maxVolume = action.payload;
        },
        setDeselectedProtocols: (state, action: PayloadAction<string[]>) => {
            state.deselectedProtocols = action.payload;
        },
        setDeselectedQuoteTokens: (state, action: PayloadAction<string[]>) => {
            state.deselectedQuoteTokens = action.payload;
        },
        toggleProtocol: (state, action: PayloadAction<string>) => {
            const protocol = action.payload;
            if (state.deselectedProtocols.includes(protocol)) {
                // Was deselected, now select it (remove from exclusion list)
                state.deselectedProtocols = state.deselectedProtocols.filter(p => p !== protocol);
            } else {
                // Was selected, now deselect it (add to exclusion list)
                state.deselectedProtocols.push(protocol);
            }
        },
        toggleQuoteToken: (state, action: PayloadAction<string>) => {
            const token = action.payload;
            if (state.deselectedQuoteTokens.includes(token)) {
                // Was deselected, now select it (remove from exclusion list)
                state.deselectedQuoteTokens = state.deselectedQuoteTokens.filter(t => t !== token);
            } else {
                // Was selected, now deselect it (add to exclusion list)
                state.deselectedQuoteTokens.push(token);
            }
        },
        toggleIconFilter: (state, action: PayloadAction<'settings' | 'star' | 'chart'>) => {
            const icon = action.payload;
            state.activeIconFilters[icon] = !state.activeIconFilters[icon];
        },
        resetFilters: (state) => {
            state.keywords = '';
            state.excludeKeywords = '';
            state.minLiquidity = null;
            state.maxLiquidity = null;
            state.minVolume = null;
            state.maxVolume = null;
            state.deselectedProtocols = [];
            state.deselectedQuoteTokens = [];
            state.activeIconFilters = {
                settings: false,
                star: false,
                chart: false,
            };
        },
    },
});

export const {
    setKeywords,
    setExcludeKeywords,
    setMinLiquidity,
    setMaxLiquidity,
    setMinVolume,
    setMaxVolume,
    setDeselectedProtocols,
    setDeselectedQuoteTokens,
    toggleProtocol,
    toggleIconFilter,
    toggleQuoteToken,
    resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
