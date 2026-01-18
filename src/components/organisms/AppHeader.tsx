'use client';

import React, { useCallback, useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import {
  Search,
  Bell,
  Star,
  Wallet,
  User,
  ChevronDown,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SearchModal = dynamic(
  () => import('./SearchModal').then(mod => mod.SearchModal),
  { ssr: false }
);

const ExchangeModal = dynamic(
  () => import('./ExchangeModal').then(mod => mod.ExchangeModal),
  { ssr: false }
);

const WatchlistModal = dynamic(
  () => import('./WatchlistModal').then(mod => mod.WatchlistModal),
  { ssr: false }
);

const NotificationsModal = dynamic(
  () => import('./NotificationsModal').then(mod => mod.NotificationsModal),
  { ssr: false }
);

const WithdrawModal = dynamic(
  () => import('./WithdrawModal').then(mod => mod.WithdrawModal),
  { ssr: false }
);

/* WalletPopover — heavy → lazy load */
const WalletPopover = dynamic(
  () => import('./WalletPopover').then(mod => mod.WalletPopover),
  { ssr: false }
);


/* ---------------------------------------------------------
   MEMOIZED LOGO COMPONENT
--------------------------------------------------------- */
const LogoBase: React.FC = () => (
  <div className="flex items-center gap-2 cursor-pointer select-none">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 2L2 19H22L12 2Z" fill="white" />
    </svg>

    <span className="font-bold text-xl tracking-tight text-white">
      AXIOM <span className="font-normal text-gray-400 text-sm ml-0.5">Pro</span>
    </span>
  </div>
);

export const Logo = React.memo(LogoBase);
Logo.displayName = "Logo";

/* ---------------------------------------------------------
   MEMOIZED NAV TABS
--------------------------------------------------------- */
const Tabs = React.memo(
  ({
    activeTab,
    setActiveTab,
  }: {
    activeTab: string;
    setActiveTab: (tab: string) => void;
  }) => {
    const tabs = useMemo(
      () => ['Discover', 'Pulse', 'Trackers', 'Perpetuals', 'Yield', 'Vision', 'Portfolio'],
      []
    );

    return (
      <nav className="hidden lg:flex items-center gap-1">
        {tabs.map((item) => (
          <button
            key={item}
            onClick={() => setActiveTab(item)}
            className={cn(
              'h-9 px-3 text-sm font-medium transition-colors rounded-md',
              activeTab === item
                ? 'text-blue-400 bg-[#1e293b] border border-blue-500/20'
                : 'text-gray-500 hover:text-white hover:bg-white/5'
            )}
          >
            {item}
          </button>
        ))}
      </nav>
    );
  }
);
Tabs.displayName = 'Tabs';

/* ---------------------------------------------------------
   MAIN HEADER COMPONENT
--------------------------------------------------------- */
interface AppHeaderProps {
  selectedChain?: 'SOL' | 'BNB';
  onChainSelect?: (chain: 'SOL' | 'BNB') => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  selectedChain = 'SOL',
  onChainSelect,
}) => {
  const [activeTab, setActiveTab] = useState('Pulse');

  /* All modal states — now lightweight since modals are lazy */
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const [isWatchlistModalOpen, setIsWatchlistModalOpen] = useState(false);
  const [isNotificationsModalOpen, setIsNotificationsModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  /* Dropdowns */
  const [isChainDropdownOpen, setIsChainDropdownOpen] = useState(false);
  const [isWalletPopoverOpen, setIsWalletPopoverOpen] = useState(false);

  /* ---------------------------------------------------------
     GLOBAL CLICK HANDLER — SINGLE INSTANCE
  --------------------------------------------------------- */
  useEffect(() => {
    if (!isChainDropdownOpen && !isWalletPopoverOpen) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (isChainDropdownOpen && !target.closest('.chain-selector')) {
        setIsChainDropdownOpen(false);
      }

      if (isWalletPopoverOpen && !target.closest('.wallet-info')) {
        setIsWalletPopoverOpen(false);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isChainDropdownOpen, isWalletPopoverOpen]);

  /* ---------------------------------------------------------
     RENDER
  --------------------------------------------------------- */
  return (
    <>
      <header className="h-14 border-b border-border/20 bg-black flex items-center justify-between px-4 shrink-0 z-50 relative">

        {/* LEFT SIDE: LOGO + TABS */}
        <div className="flex items-center gap-8">
          <Logo />

          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* RIGHT SIDE ACTIONS */}
        <div className="flex items-center gap-3">

          {/* SEARCH BAR (lazy modal) */}
          <div
            className="relative hidden xl:block group cursor-pointer"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-hover:text-white transition-colors" />
            <div className="h-9 w-[280px] bg-[#111] border border-border/20 rounded-full pl-9 pr-10 flex items-center text-sm text-gray-500 group-hover:border-gray-700 transition-all">
              Search by token or CA...
            </div>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 border border-border/20 rounded px-1.5 py-0.5 bg-white/5">
              /
            </span>
          </div>

          {/* CHAIN SELECTOR */}
          <div className="flex items-center gap-2 relative chain-selector">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsChainDropdownOpen(!isChainDropdownOpen);
              }}
              className={cn(
                'h-9 px-3 rounded-full border text-xs gap-2 transition-all flex items-center',
                selectedChain === 'SOL'
                  ? 'border-green-900/30 bg-green-900/10 text-green-400 hover:bg-green-900/20 hover:border-green-900/50 hover:text-green-300'
                  : 'border-yellow-900/30 bg-yellow-900/10 text-yellow-400 hover:bg-yellow-900/20 hover:border-yellow-900/50 hover:text-yellow-300'
              )}
            >
              <Image
                src={
                  selectedChain === 'SOL'
                    ? '/images/solana-logo.png'
                    : '/images/bnb-logo.png'
                }
                alt={selectedChain}
                width={16}
                height={16}
                className="object-contain"
              />
              <span className="font-bold">{selectedChain}</span>

              <ChevronDown size={14} className="ml-1 opacity-50" />
            </button>

            {/* CHAIN DROPDOWN */}
            {isChainDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-[#0a0b0d] border border-gray-800 rounded-lg shadow-xl z-50 py-1">
                <button
                  onClick={() => {
                    onChainSelect?.('SOL');
                    setIsChainDropdownOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors',
                    selectedChain === 'SOL'
                      ? 'bg-green-900/20 text-green-400'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <Image
                    src="/images/solana-logo.png"
                    alt="Solana"
                    width={16}
                    height={16}
                  />
                  <span>Solana</span>
                </button>

                <button
                  onClick={() => {
                    onChainSelect?.('BNB');
                    setIsChainDropdownOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors',
                    selectedChain === 'BNB'
                      ? 'bg-yellow-900/20 text-yellow-400'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  )}
                >
                  <Image
                    src="/images/bnb-logo.png"
                    alt="BNB"
                    width={16}
                    height={16}
                  />
                  <span>BNB Chain</span>
                </button>
              </div>
            )}

            <Button
              size="sm"
              onClick={() => setIsExchangeModalOpen(true)}
              className="h-8 rounded-full bg-[#3c5bff] hover:bg-[#324fd6] text-white font-bold px-5 text-xs shadow-[0_0_15px_rgba(60,91,255,0.3)]"
            >
              Deposit
            </Button>
          </div>

          {/* ICONS */}
          <div className="flex items-center gap-1 ml-1">

            {/* Watchlist */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsWatchlistModalOpen(true)}
              className="h-9 w-9 text-gray-500 hover:text-white rounded-full hover:bg-white/5"
            >
              <Star size={18} />
            </Button>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsNotificationsModalOpen(true)}
              className="h-9 w-9 text-gray-500 hover:text-white rounded-full hover:bg-white/5"
            >
              <Bell size={18} />
            </Button>

            {/* WALLET */}
            <div className="relative wallet-info">
              <button
                onClick={() => setIsWalletPopoverOpen(!isWalletPopoverOpen)}
                className="flex items-center bg-[#1A1D24] border border-white/5 rounded-full h-8 pl-3 pr-2 cursor-pointer hover:bg-[#252830] transition-colors gap-3"
              >
                <Wallet size={16} className="text-white" />

                <div className="flex items-center gap-2">
                  <Image
                    src="/images/header-solana.png"
                    alt="SOL"
                    width={16}
                    height={16}
                  />
                  <span className="text-sm font-medium text-white leading-none">0</span>
                </div>

                <div className="h-4 w-px bg-white/10" />

                <div className="flex items-center gap-2">
                  <Image
                    src="/images/header-usdc.png"
                    alt="USDC"
                    width={16}
                    height={16}
                  />
                  <span className="text-sm font-medium text-white leading-none">0</span>
                </div>

                <ChevronDown size={14} className="text-white ml-1" />
              </button>

              {isWalletPopoverOpen && (
                <WalletPopover
                  isOpen
                  onClose={() => setIsWalletPopoverOpen(false)}
                  onDeposit={() => setIsExchangeModalOpen(true)}
                  onWithdraw={() => setIsWithdrawModalOpen(true)}
                />
              )}
            </div>

            {/* Profile */}
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-gray-500 hover:text-white rounded-full hover:bg-white/5 ml-1"
            >
              <User size={20} />
            </Button>
          </div>
        </div>
      </header>

      {/* LAZY MODALS (render only when needed) */}
      {isSearchOpen && (
        <SearchModal isOpen onClose={() => setIsSearchOpen(false)} />
      )}

      {isExchangeModalOpen && (
        <ExchangeModal isOpen onClose={() => setIsExchangeModalOpen(false)} />
      )}

      {isWatchlistModalOpen && (
        <WatchlistModal isOpen onClose={() => setIsWatchlistModalOpen(false)} />
      )}

      {isNotificationsModalOpen && (
        <NotificationsModal isOpen onClose={() => setIsNotificationsModalOpen(false)} />
      )}

      {isWithdrawModalOpen && (
        <WithdrawModal isOpen onClose={() => setIsWithdrawModalOpen(false)} />
      )}
    </>
  );
};
