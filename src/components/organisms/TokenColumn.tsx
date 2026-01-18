'use client';

import React, { useCallback, useMemo, useRef } from 'react';
import Image from 'next/image';
import { useVirtualizer } from '@tanstack/react-virtual';

import { Token, SortField, ColumnType } from '@/types';
import { TokenCard } from '@/components/molecules/TokenCard';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppSelector, useAppDispatch } from '@/lib/store';

import {
  setSortBy,
  toggleSortDirection
} from '@/lib/features/sortSlice';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';

import {
  Zap,
  ArrowRightLeft,
  Fuel,
  Coins,
  ShieldOff,
  Settings,
  Star,
  TrendingUp,
  ArrowDown,
  ArrowUp,
  ArrowUpDown
} from 'lucide-react';

import { ErrorBoundary } from '@/components/ErrorBoundary';

/* -----------------------------------------------------
   Props
----------------------------------------------------- */
interface TokenColumnProps {
  title: string;
  tokens: Token[];
  isLoading?: boolean;
  showFilter?: boolean;
  onFilterClick?: () => void;
  selectedChain?: 'SOL' | 'BNB';
  columnType: ColumnType;
}

/* small activeIconFilters type */
interface ActiveIconFilters {
  settings: boolean;
  star: boolean;
  chart: boolean;
}

interface ColumnHeaderProps {
  title: string;
  activeIconFilters: ActiveIconFilters;
  selectedChain: "SOL" | "BNB";
  selectedPriority: "P1" | "P2" | "P3";
  hoveredPriority: "P1" | "P2" | "P3" | null;
  priorityOptions: Record<"P1" | "P2" | "P3", { value: string }>;
  handlePriorityClick: (p: "P1" | "P2" | "P3") => void;
  handlePriorityOptionChange: (p: "P1" | "P2" | "P3", v: string) => void;
  setHoveredPriority: (v: "P1" | "P2" | "P3" | null) => void;
  sortState: {
    field: SortField | null;
    direction: "asc" | "desc";
  };
  sortOptions: { label: string; value: SortField }[];
  handleSortFieldChange: (field: SortField) => void;
  handleSortToggle: () => void;
  onFilterClick?: () => void;
}

/**
 * ColumnHeader
 *
 * Header component for table columns, showing title, active filters,
 * chain selector, priority controls, and sorting actions.
 *
 * Behavior:
 * - Displays active filter icons.
 * - Allows selecting chain priorities (P1/P2/P3) with hover popups.
 * - Supports changing sort field and toggling sort direction.
 * - Calls provided callbacks for sorting, priority changes, and filter actions.
 *
 * @component
 * @param {ColumnHeaderProps} props - Props for configuring the header.
 *
 * @returns {JSX.Element}
 */


const ColumnHeader = React.memo(function ColumnHeader({
  title,
  activeIconFilters,
  selectedChain,
  selectedPriority,
  hoveredPriority,
  priorityOptions,
  handlePriorityClick,
  handlePriorityOptionChange,
  setHoveredPriority,
  sortState,
  sortOptions,
  handleSortFieldChange,
  handleSortToggle,
  onFilterClick
}: ColumnHeaderProps) {
  const SortIcon = sortState.field
    ? sortState.direction === 'desc'
      ? ArrowDown
      : ArrowUp
    : ArrowUpDown;

  return (
    <div className="px-3 py-2 border-b border-border/10 flex items-center justify-between shrink-0 h-[42px] bg-card/5">
      {/* Left */}
      <div className="flex items-center gap-2">
        <h2 className="font-bold text-[13px] text-white tracking-tight">
          {title}
        </h2>

        {/* Active Filters */}
        <div className="flex items-center gap-1">
          {activeIconFilters.settings && (
            <div className="p-1 bg-blue-500/20 rounded" aria-hidden>
              <Settings size={10} className="text-blue-400" />
            </div>
          )}

          {activeIconFilters.star && (
            <div className="p-1 bg-blue-500/20 rounded" aria-hidden>
              <Star size={10} className="text-blue-400" />
            </div>
          )}

          {activeIconFilters.chart && (
            <div className="p-1 bg-blue-500/20 rounded" aria-hidden>
              <TrendingUp size={10} className="text-blue-400" />
            </div>
          )}
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* TPS */}
        <div className="flex items-center gap-1 text-gray-500" aria-hidden>
          <Zap size={10} />
          <span className="text-[11px] font-medium">0</span>
        </div>

        {/* Chain + Priorities */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 relative">
            <Image
              src={
                selectedChain === 'SOL'
                  ? '/images/solana-logo.png'
                  : '/images/bnb-logo.png'
              }
              alt={selectedChain + " chain"}
              width={12}
              height={12}
              sizes="12px"
            />

            {/* Priority Buttons */}
            <div
              className="flex items-center gap-0.5 ml-1"
              onMouseLeave={() => setHoveredPriority(null)}
            >
              {(['P1', 'P2', 'P3'] as const).map(p => (
                <div key={p} className="relative group">
                  <button
                    onClick={() => handlePriorityClick(p)}
                    onDoubleClick={() => handlePriorityClick(p)}
                    onMouseEnter={() => setHoveredPriority(p)}
                    className={
                      selectedPriority === p
                        ? 'text-[10px] font-bold px-1.5 py-0.5 rounded cursor-pointer text-blue-400 bg-blue-500/10'
                        : 'text-[10px] font-bold px-1.5 py-0.5 rounded cursor-pointer text-gray-600 hover:text-gray-400'
                    }
                    aria-pressed={selectedPriority === p}
                    aria-label={`Set priority ${p}`}
                  >
                    {p}
                  </button>

                  {/* Priority Popup */}
                  {hoveredPriority === p && (
                    <div role="menu" aria-label={`${p} settings`} className="absolute top-full right-0 mt-2 w-32 bg-[#0a0b0d] border border-gray-800 rounded-lg shadow-xl z-50 p-1 flex flex-col gap-0.5">
                      <div className="text-[10px] font-medium text-gray-400 px-2 py-1 border-b border-gray-800 mb-1">
                        {p} Settings
                      </div>

                      <button
                        onClick={() => handlePriorityOptionChange(p, '20%')}
                        className={`flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/5 text-[11px] w-full text-left ${
                          priorityOptions[p].value === '20%'
                            ? 'text-yellow-400'
                            : 'text-gray-400'
                        }`}
                      >
                        <Zap size={10} />
                        <span>20%</span>
                      </button>

                      <button
                        onClick={() => handlePriorityOptionChange(p, '0.001')}
                        className={`flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/5 text-[11px] w-full text-left ${
                          priorityOptions[p].value === '0.001'
                            ? 'text-yellow-400'
                            : 'text-gray-400'
                        }`}
                      >
                        <Fuel size={10} />
                        <span>0.001</span>
                      </button>

                      <button
                        onClick={() => handlePriorityOptionChange(p, '0.01')}
                        className={`flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/5 text-[11px] w-full text-left ${
                          priorityOptions[p].value === '0.01'
                            ? 'text-yellow-400'
                            : 'text-gray-400'
                        }`}
                      >
                        <Coins size={10} />
                        <span>0.01</span>
                      </button>

                      <button
                        onClick={() => handlePriorityOptionChange(p, 'Off')}
                        className={`flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/5 text-[11px] w-full text-left ${
                          priorityOptions[p].value === 'Off'
                            ? 'text-gray-400'
                            : 'text-gray-500'
                        }`}
                      >
                        <ShieldOff size={10} />
                        <span>Off</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sort */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="text-gray-500 hover:text-white flex items-center gap-0.5"
                aria-label={`Sort ${title}`}
              >
                <SortIcon
                  size={12}
                  className={sortState.field ? 'text-blue-400' : ''}
                />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-40 bg-[#0a0b0d] border-gray-800"
            >
              {sortOptions.map((opt: { label: string; value: SortField }) => (
                <DropdownMenuItem
                  key={opt.value}
                  onClick={() => handleSortFieldChange(opt.value)}
                  className="text-xs cursor-pointer hover:bg-white/5 flex items-center justify-between"
                >
                  <span
                    className={
                      sortState.field === opt.value
                        ? "text-blue-400 font-medium"
                        : "text-gray-300"
                    }
                  >
                    {opt.label}
                  </span>

                  {sortState.field === opt.value &&
                    (sortState.direction === "desc" ? (
                      <ArrowDown size={10} className="text-blue-400" />
                    ) : (
                      <ArrowUp size={10} className="text-blue-400" />
                    ))}
                </DropdownMenuItem>
              ))}

            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={onFilterClick}
            className="text-gray-500 hover:text-white ml-1"
            aria-label={`Open filters for ${title}`}
          >
            <ArrowRightLeft size={12} />
          </button>
        </div>
      </div>
    </div>
  );
});

/* -----------------------------------------------------
   Main Component
----------------------------------------------------- */
/**
 * TokenColumn
 *
 * A column component that displays a virtualized list of tokens with
 * sorting, priority controls, and optional filter UI.
 *
 * Behavior:
 * - Shows a header with sorting and priority settings.
 * - Uses react-virtualizer to efficiently render token rows.
 * - Supports loading skeletons when data is not ready.
 * - Calls sorting & priority handlers via Redux actions.
 * - Shows an empty state when no tokens are available.
 *
 * @component
 * @param {TokenColumnProps} props - Column configuration and data.
 *
 * @returns {JSX.Element}
 */


export const TokenColumn: React.FC<TokenColumnProps> = ({
  title,
  tokens,
  isLoading = false,
  onFilterClick,
  showFilter = false,
  selectedChain = 'SOL',
  columnType
}) => {
  const activeIconFilters = useAppSelector(s => s.filter.activeIconFilters);
  const sortState = useAppSelector(s => s.sort[columnType]);

  const dispatch = useAppDispatch();

  /* Priority UI local state */
  const [selectedPriority, setSelectedPriority] = React.useState<'P1' | 'P2' | 'P3'>('P1');
  const [hoveredPriority, setHoveredPriority] = React.useState<
    'P1' | 'P2' | 'P3' | null
  >(null);

  const [priorityOptions, setPriorityOptions] = React.useState({
    P1: { value: '0.001' as string },
    P2: { value: 'Off' as string },
    P3: { value: 'Off' as string }
  });

  /* Priority Handlers */
  const handlePriorityClick = useCallback((p: 'P1' | 'P2' | 'P3') => {
    setSelectedPriority(p);
  }, []);

  const handlePriorityOptionChange = useCallback(
    (p: 'P1' | 'P2' | 'P3', v: string) => {
      setPriorityOptions(prev => ({
        ...prev,
        [p]: { value: v }
      }));
    },
    []
  );

  /* Sort Handlers */
  const handleSortFieldChange = useCallback(
    (field: SortField) => {
      dispatch(setSortBy({ column: columnType, field }));
    },
    [dispatch, columnType]
  );

  const handleSortToggle = useCallback(() => {
    dispatch(toggleSortDirection(columnType));
  }, [dispatch, columnType]);

  /* Virtualizer */
  const parentRef = useRef<HTMLDivElement | null>(null);
  const ITEM_HEIGHT = 118;

  const rowVirtualizer = useVirtualizer({
    count: tokens.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => ITEM_HEIGHT,
    overscan: 5
  });

  const virtualRows = rowVirtualizer.getVirtualItems();
  const totalHeight = rowVirtualizer.getTotalSize();

  /* Sort Options */
  const sortOptions: { label: string; value: SortField }[] = [
    { label: "Market Cap", value: "marketCap" },
    { label: "Volume 24h", value: "volume" },
    { label: "Liquidity", value: "liquidity" },
    { label: "Time", value: "time" },
    { label: "Price", value: "price" },
    { label: "Holders", value: "holders" },
  ];

  /* Loading State */
  if (isLoading) {
    return (
      <div className="flex flex-col h-full min-h-0 border-r border-border/10 last:border-r-0">
        <ColumnHeader
          title={title}
          activeIconFilters={activeIconFilters}
          selectedChain={selectedChain}
          selectedPriority={selectedPriority}
          hoveredPriority={hoveredPriority}
          priorityOptions={priorityOptions}
          handlePriorityClick={handlePriorityClick}
          handlePriorityOptionChange={handlePriorityOptionChange}
          setHoveredPriority={setHoveredPriority}
          sortState={sortState}
          sortOptions={sortOptions}
          handleSortFieldChange={handleSortFieldChange}
          handleSortToggle={handleSortToggle}
          onFilterClick={onFilterClick}
        />

        <div className="flex-1 min-h-0 overflow-y-auto p-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[118px] w-full mb-3 rounded-md" />
          ))}
        </div>
      </div>
    );
  }

  /* Render */
  return (
    <div className="flex flex-col h-full min-h-0 border-r border-border/10 last:border-r-0 bg-gradient-to-b from-gray-900/20 to-gray-900/10">
      <ColumnHeader
        title={title}
        activeIconFilters={activeIconFilters}
        selectedChain={selectedChain}
        selectedPriority={selectedPriority}
        hoveredPriority={hoveredPriority}
        priorityOptions={priorityOptions}
        handlePriorityClick={handlePriorityClick}
        handlePriorityOptionChange={handlePriorityOptionChange}
        setHoveredPriority={setHoveredPriority}
        sortState={sortState}
        sortOptions={sortOptions}
        handleSortFieldChange={handleSortFieldChange}
        handleSortToggle={handleSortToggle}
        onFilterClick={onFilterClick}
      />

      <div
        ref={parentRef}
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-thin"
        tabIndex={0}
        aria-label={`${title} list`}
      >
        <ErrorBoundary>
          <div style={{ height: totalHeight, position: 'relative' }}>
            {virtualRows.map(row => {
              const token = tokens[row.index];
              if (!token) return null;

              return (
                <div
                  key={token.id}
                  style={{
                    position: 'absolute',
                    top: row.start,
                    width: '100%',
                    height: row.size
                  }}
                  className="px-2"
                >
                  <TokenCard
                    token={token}
                    index={row.index}
                    currentTime={Date.now()}
                  />
                </div>
              );
            })}

            {tokens.length === 0 && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%'
                }}
                className="p-4 text-center text-sm text-gray-500"
              >
                No tokens found
              </div>
            )}
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
};
