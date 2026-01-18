'use client';

import React, { useCallback, memo } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { toggleIconFilter } from '@/lib/features/filterSlice';

/* ------------------------------------------------------
   Memoized SVG Icons (prevents re-render cost)
------------------------------------------------------ */
const SettingsIcon = memo(({ active }: { active: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={active ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-200'}
    aria-hidden="true"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
));
SettingsIcon.displayName = 'SettingsIcon';


const StarIcon = memo(({ active }: { active: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={active ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-200'}
    aria-hidden="true"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
));
StarIcon.displayName = 'StarIcon';


const ChartIcon = memo(({ active }: { active: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={active ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-200'}
    aria-hidden="true"
  >
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
));
ChartIcon.displayName = 'ChartIcon';


/* ------------------------------------------------------
   MAIN COMPONENT
------------------------------------------------------ */
/**
 * ActionIcons Component
 * ---------------------
 * Renders a compact toolbar containing three interactive action icons:
 * - Settings
 * - Favorites (Star)
 * - Analytics (Chart)
 *
 * Each icon:
 * - Dispatches a filter toggle to the Redux store.
 * - Optionally triggers a callback passed in through props.
 *
 * The component is memoized to prevent unnecessary re-renders.
 *
 * Props:
 * @param onSettingsClick - Optional callback triggered after toggling the Settings filter.
 * @param onStarClick - Optional callback triggered after toggling the Star/Favorites filter.
 * @param onChartClick - Optional callback triggered after toggling the Analytics/Chart filter.
 */

export const ActionIcons: React.FC<{
  onSettingsClick?: () => void;
  onStarClick?: () => void;
  onChartClick?: () => void;
}> = memo(({ onSettingsClick, onStarClick, onChartClick }) => {
  const dispatch = useAppDispatch();
  const activeFilters = useAppSelector((state) => state.filter.activeIconFilters);

  /** 
   * Memoized callbacks ensure the component does NOT re-render 
   * when parent components re-render, unless the props change.
   */

  const handleSettingsClick = useCallback(() => {
    dispatch(toggleIconFilter('settings'));
    onSettingsClick?.();
  }, [dispatch, onSettingsClick]);

  const handleStarClick = useCallback(() => {
    dispatch(toggleIconFilter('star'));
    onStarClick?.();
  }, [dispatch, onStarClick]);

  const handleChartClick = useCallback(() => {
    dispatch(toggleIconFilter('chart'));
    onChartClick?.();
  }, [dispatch, onChartClick]);

  return (
    <div
      className="flex items-center gap-0.5 px-4 py-2 border-b border-border/20 bg-background/95 backdrop-blur-sm"
      style={{ minHeight: 40 }}
    >
      {/* SETTINGS */}
      <button
        onClick={handleSettingsClick}
        className={`p-1.5 rounded hover:bg-accent/10 transition-colors duration-200 group ${
          activeFilters.settings ? 'bg-blue-500/20' : ''
        }`}
        aria-label="Settings"
      >
        <SettingsIcon active={activeFilters.settings} />
      </button>

      <div className="w-px h-4 bg-gray-700 mx-0.5" />

      {/* STAR */}
      <button
        onClick={handleStarClick}
        className={`p-1.5 rounded hover:bg-accent/10 transition-colors duration-200 group ${
          activeFilters.star ? 'bg-blue-500/20' : ''
        }`}
        aria-label="Favorites"
      >
        <StarIcon active={activeFilters.star} />
      </button>

      <div className="w-px h-4 bg-gray-700 mx-0.5" />

      {/* CHART */}
      <button
        onClick={handleChartClick}
        className={`p-1.5 rounded hover:bg-accent/10 transition-colors duration-200 group ${
          activeFilters.chart ? 'bg-blue-500/20' : ''
        }`}
        aria-label="Analytics"
      >
        <ChartIcon active={activeFilters.chart} />
      </button>
    </div>
  );
});

ActionIcons.displayName = 'ActionIcons';
