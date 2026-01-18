import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, useStore } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import filterReducer from './features/filterSlice'
import settingsReducer from './features/settingsSlice'
import trackerReducer from './features/trackerSlice'
import uiReducer from './features/uiSlice'
import sortReducer from './features/sortSlice'

/**
 * Creates and returns the application's Redux store configured with the root reducers.
 *
 * The store is created via Redux Toolkit's `configureStore` and includes the following slice reducers:
 * - `filter`
 * - `settings`
 * - `tracker`
 * - `ui`
 * - `sort`
 *
 * The returned store is ready to be provided to React-Redux's `<Provider />` and used throughout the app.
 *
 * @returns A configured Redux store instance containing the `filter`, `settings`, `tracker`, `ui`, and `sort` slices.
 *
 * @remarks
 * - Middleware and enhancers are those supplied by `configureStore` unless overridden elsewhere.
 * - The resulting state shape will include keys for each listed slice.
 *
 * @example
 * const store = makeStore();
 * // <Provider store={store}><App /></Provider>
 */
export const makeStore = () => {
  return configureStore({
    reducer: {
      filter: filterReducer,
      settings: settingsReducer,
      tracker: trackerReducer,
      ui: uiReducer,
      sort: sortReducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore
