'use client'

import React, { useState } from 'react';
import { Wallet, Twitter, Globe, Activity, BarChart3, Settings, Monitor, Folder, Bell, Layout, FileText, Disc, X, Palette } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { TradingSettingsModal } from './TradingSettingsModal';
import { ActiveWalletsPopover } from './ActiveWalletsPopover';
import { OrderTrackersModal } from './OrderTrackersModal';
import { MarketLighthousePopover } from './MarketLighthousePopover';
import { RegionsPopover } from './RegionsPopover';
import { NotificationsModal } from './NotificationsModal';
import { ThemeModal } from './ThemeModal';
import { useAppSelector, useAppDispatch } from '@/lib/store';
import {
    setTradingSettingsOpen,
    setOrderTrackersOpen,
    setNotificationsOpen,
    setThemeOpen
} from '@/lib/features/uiSlice';
import type { TrackerType } from '@/lib/features/trackerSlice';

interface AppFooterProps {
    selectedChain: 'SOL' | 'BNB';
}

const trackerIcons = {
    wallet: Wallet,
    twitter: Twitter,
    discover: Globe,
    pulse: Activity,
    pnl: BarChart3,
};

const trackerLabels = {
    wallet: 'Wallet',
    twitter: 'Twitter',
    discover: 'Discover',
    pulse: 'Pulse',
    pnl: 'PnL',
};

const trackerFullLabels = {
    wallet: 'Wallet_Tracker',
    twitter: 'Twitter_Tracker',
    discover: 'Discover_Tracker',
    pulse: 'Pulse_Tracker',
    pnl: 'PnL_Tracker',
};

export const AppFooter: React.FC<AppFooterProps> = ({ selectedChain }) => {
    const dispatch = useAppDispatch();

    const {
        isTradingSettingsOpen,
        isOrderTrackersOpen,
        isNotificationsOpen,
        isThemeOpen
    } = useAppSelector((state) => state.ui);

    const displayMode = useAppSelector((state) => state.tracker.displayMode);

    const renderTracker = (trackerId: TrackerType) => {
        const Icon = trackerIcons[trackerId];

        if (displayMode === 'icon') {
            return (
                <TooltipProvider key={trackerId}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button className="flex items-center gap-1.5 hover:text-white transition-colors relative">
                                <Icon size={12} />
                                <div className="h-1.5 w-1.5 rounded-full bg-pink-500" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
                            <p>{trackerLabels[trackerId]}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        }

        if (displayMode === 'compact') {
            return (
                <TooltipProvider key={trackerId}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                                <Icon size={12} />
                                <span className="font-medium">{trackerLabels[trackerId]}</span>
                                <div className="h-1.5 w-1.5 rounded-full bg-pink-500" />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
                            <p>{trackerLabels[trackerId]}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        }

        // Full mode
        return (
            <TooltipProvider key={trackerId}>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <button className="flex items-center gap-1.5 hover:text-white transition-colors">
                            <Icon size={12} />
                            <span className="font-medium">{trackerFullLabels[trackerId]}</span>
                            <div className="h-1.5 w-1.5 rounded-full bg-pink-500" />
                        </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
                        <p>{trackerLabels[trackerId]}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    };


    return (
        <>
            <footer className="h-10 border-t border-border/20 bg-background flex items-center justify-between px-2 shrink-0 text-[11px] text-gray-400 select-none">
                {/* Left Section */}
                <div className="flex items-center gap-2">
                    {/* PRESET Button */}
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <button
                                    className="px-2 py-1 rounded hover:bg-white/5 transition-colors text-blue-400 font-medium whitespace-nowrap"
                                    onClick={() => dispatch(setTradingSettingsOpen(true))}
                                >
                                    PRESET 1
                                </button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
                                <p>Trading Settings</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <div className="h-4 w-px bg-border/20" />

                    <ActiveWalletsPopover selectedChain={selectedChain} position="top" />

                    <div className="h-4 w-px bg-border/20 mx-1" />

                    <div className="flex items-center gap-3">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <button
                                        className="flex items-center gap-1.5 hover:text-white transition-colors"
                                        onClick={() => dispatch(setOrderTrackersOpen(true))}
                                    >
                                        <Settings size={12} />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
                                    <p>Tracker Settings</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        {(['wallet', 'twitter', 'discover', 'pulse', 'pnl'] as TrackerType[]).map(renderTracker)}
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Stats */}
                    {/* Stats */}
                    <div className="flex items-center gap-3">
                        <MarketLighthousePopover />

                        <div className="h-4 w-px bg-border/20" />

                        <div className="flex items-center gap-3">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="flex items-center gap-1 text-orange-400 font-medium cursor-default">
                                            <div className="relative w-4 h-4">
                                                <Image
                                                    src="/images/bitcoin-logo-footer.png"
                                                    alt="BTC"
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                            <span>$91.6K</span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
                                        <p>Price of BTC in USD</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="flex items-center gap-1 text-blue-400 font-medium cursor-default">
                                            <div className="relative w-3 h-4">
                                                <Image
                                                    src="/images/ethereum-logo-footer.png"
                                                    alt="ETH"
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                            <span>$3060</span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
                                        <p>Price of ETH in USD</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="flex items-center gap-1 text-[#14F195] font-medium cursor-default">
                                            <div className="relative w-4 h-3">
                                                <Image
                                                    src="/images/solana-logo-footer.png"
                                                    alt="SOL"
                                                    fill
                                                    className="object-contain"
                                                />
                                            </div>
                                            <span>$137.2</span>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
                                        <p>Price of SOL in USD</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className="font-medium cursor-default">$56.4K</span>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
                                    <p>Estimated Migration Price</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className="flex items-center gap-1 font-medium cursor-default">
                                        <FileText size={10} />
                                        0.0<sub className="bottom-0">2</sub>4
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
                                    <p>Recommended Priority Fee</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className="flex items-center gap-1 font-medium cursor-default">
                                        <Disc size={10} />
                                        0.0<sub className="bottom-0">2</sub>33
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
                                    <p>Recommended Bribe Fee</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    <div className="h-4 w-px bg-border/20" />

                    <div className="flex items-center gap-2 bg-[#2A2D35] text-gray-200 px-3 py-1 rounded-md">
                        <div className="h-2 w-2 rounded-full bg-white" />
                        <span className="font-medium text-[11px] whitespace-nowrap">Connection is stable</span>
                    </div>

                    <RegionsPopover />

                    <div className="flex items-center gap-1">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-white">
                                        <Layout size={14} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
                                    <p>Hide Watchlist Ticker</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 text-gray-400 hover:text-white"
                                        onClick={() => dispatch(setNotificationsOpen(true))}
                                    >
                                        <Bell size={14} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
                                    <p>Notification Settings</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 text-gray-400 hover:text-white"
                                        onClick={() => dispatch(setThemeOpen(true))}
                                    >
                                        <Palette size={14} />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
                                    <p>Customize Theme</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <a href="https://discord.com/invite/axiomtrade" target="_blank" rel="noopener noreferrer">
                                        <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-white">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 0 0-.0785-.037 19.7363 19.7363 0 0 0-4.8852 1.515.0699.0699 0 0 0-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 0 0 .0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 0 0 .0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 0 0-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 0 1 .0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 0 1-.0066.1276 12.2986 12.2986 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 0 0 .0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 0 0 .0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 0 0-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
                                            </svg>
                                        </Button>
                                    </a>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
                                    <p>Join our Discord</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <a href="https://x.com/axiomexchange" target="_blank" rel="noopener noreferrer">
                                        <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-white">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                            </svg>
                                        </Button>
                                    </a>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="bg-gray-900 text-white border-gray-700">
                                    <p>Follow us on X</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <a href="https://docs.axiom.trade/" target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="icon" className="h-7 w-auto px-2 text-gray-400 hover:text-white flex items-center gap-1.5">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                    <line x1="10" y1="9" x2="8" y2="9" />
                                </svg>
                                <span className="text-[10px] font-medium">Docs</span>
                            </Button>
                        </a>
                    </div>
                </div>
            </footer>

            <TradingSettingsModal
                isOpen={isTradingSettingsOpen}
                onClose={() => dispatch(setTradingSettingsOpen(false))}
            />

            <OrderTrackersModal
                isOpen={isOrderTrackersOpen}
                onClose={() => dispatch(setOrderTrackersOpen(false))}
            />

            <NotificationsModal
                isOpen={isNotificationsOpen}
                onClose={() => dispatch(setNotificationsOpen(false))}
            />

            <ThemeModal
                isOpen={isThemeOpen}
                onClose={() => dispatch(setThemeOpen(false))}
            />
        </>
    );
};
