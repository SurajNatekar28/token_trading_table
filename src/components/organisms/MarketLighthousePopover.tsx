'use client'

import React, { useState, useRef, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, Zap, Box, Layers, ArrowRightLeft, CircleDollarSign, BarChart3, Pill, Wind } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * MarketLighthousePopover Component
 *
 * Shows a hover-activated popover displaying market stats.
 * Popover opens on mouse enter and closes with a slight delay on mouse leave.
 *
 * @returns {JSX.Element}
 */

export const MarketLighthousePopover: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 300); // Small delay to allow moving cursor to popover
    };

    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Trigger Button */}
            {/* Trigger Button */}
            <div className={cn(
                "relative group cursor-pointer",
                isOpen ? "opacity-100" : "opacity-90 hover:opacity-100"
            )}>
                {/* Gradient Border Container */}
                <div className="absolute inset-0 rounded-full bg-linear-to-r from-[#14F195] via-[#FBA92E] to-[#FF4B4B] p-px" />

                {/* Inner Content */}
                <div className="relative h-7 px-2 bg-[#0a0b0d] rounded-full flex items-center gap-2 m-px">
                    <Pill size={14} className="text-[#14F195] rotate-45" />
                    <span className="text-sm leading-none">🐕</span>
                    <Wind size={14} className="text-[#FF4B4B]" />
                </div>
            </div>

            {/* Popover Content */}
            {isOpen && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-[380px] bg-[#0a0b0d] border border-border/40 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border/20 bg-[#111]/50">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-[#14F195] animate-pulse" />
                            <span className="text-sm font-semibold text-gray-200">Market Lighthouse</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
                            <span className="hover:text-white cursor-pointer transition-colors">5m</span>
                            <span className="hover:text-white cursor-pointer transition-colors">1h</span>
                            <span className="hover:text-white cursor-pointer transition-colors">6h</span>
                            <span className="text-blue-400 cursor-pointer">24h</span>
                        </div>
                    </div>

                    <div className="p-4 space-y-5">
                        {/* Main Stats Row 1 */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-[#111]/50 rounded-lg p-3 border border-border/10">
                                <div className="text-[10px] text-gray-500 mb-1">Total Trades</div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-gray-200 font-semibold">
                                        <BarChart3 size={12} className="text-gray-400" />
                                        <span>11.6M</span>
                                    </div>
                                    <span className="text-[10px] text-[#14F195] font-medium">+27.88%</span>
                                </div>
                            </div>
                            <div className="bg-[#111]/50 rounded-lg p-3 border border-border/10">
                                <div className="text-[10px] text-gray-500 mb-1">Traders</div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-gray-200 font-semibold">
                                        <ArrowRightLeft size={12} className="text-gray-400" />
                                        <span>420K</span>
                                    </div>
                                    <span className="text-[10px] text-[#FF4B4B] font-medium">-1.184%</span>
                                </div>
                            </div>
                        </div>

                        {/* Volume Bar */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] text-gray-500">24h Vol</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-bold text-gray-200">$1.95B</span>
                                    <span className="text-[10px] text-[#14F195] font-medium">+15.50%</span>
                                </div>
                            </div>
                            <div className="h-1.5 w-full bg-[#1a1a1a] rounded-full overflow-hidden flex">
                                <div className="h-full bg-[#14F195]" style={{ width: '55%' }} />
                                <div className="h-full bg-[#FF4B4B]" style={{ width: '45%' }} />
                            </div>
                            <div className="flex items-center justify-between mt-1.5 text-[10px] font-medium">
                                <span className="text-[#14F195]">6.72M / $987M</span>
                                <span className="text-[#FF4B4B]">4.86M / $960M</span>
                            </div>
                        </div>

                        {/* Token Stats */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Layers size={12} className="text-gray-500" />
                                <span className="text-xs font-medium text-gray-400">Token Stats</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#111]/50 rounded-lg p-3 border border-border/10">
                                    <div className="text-[10px] text-gray-500 mb-1">Created</div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-gray-200 font-semibold">
                                            <Zap size={12} className="text-gray-400" />
                                            <span>32.5K</span>
                                        </div>
                                        <span className="text-[10px] text-[#FF4B4B] font-medium">-5.039%</span>
                                    </div>
                                </div>
                                <div className="bg-[#111]/50 rounded-lg p-3 border border-border/10">
                                    <div className="text-[10px] text-gray-500 mb-1">Migrations</div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 text-gray-200 font-semibold">
                                            <ArrowRightLeft size={12} className="text-blue-400" />
                                            <span>5.64K</span>
                                        </div>
                                        <span className="text-[10px] text-[#14F195] font-medium">+2.845%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Top Launchpads */}
                        <div>
                            <div className="text-[10px] text-gray-500 mb-2">Top Launchpads</div>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="bg-[#111]/30 rounded-full border border-border/10 px-2 py-1.5 flex items-center gap-2">
                                    <div className="h-4 w-4 rounded-full bg-[#14F195] flex items-center justify-center shrink-0">
                                        <Zap size={8} className="text-black fill-black" />
                                    </div>
                                    <div className="flex flex-col leading-none">
                                        <span className="text-[10px] font-bold text-[#14F195]">$191M</span>
                                        <span className="text-[8px] text-[#FF4B4B]">-16.2%</span>
                                    </div>
                                </div>
                                <div className="bg-[#111]/30 rounded-full border border-border/10 px-2 py-1.5 flex items-center gap-2">
                                    <div className="h-4 w-4 rounded-full bg-[#FBA92E] flex items-center justify-center shrink-0">
                                        <span className="text-[8px]">🐕</span>
                                    </div>
                                    <div className="flex flex-col leading-none">
                                        <span className="text-[10px] font-bold text-[#FBA92E]">$9.63M</span>
                                        <span className="text-[8px] text-[#14F195]">+56.85%</span>
                                    </div>
                                </div>
                                <div className="bg-[#111]/30 rounded-full border border-border/10 px-2 py-1.5 flex items-center gap-2">
                                    <div className="h-4 w-4 rounded-full bg-[#FF4B4B] flex items-center justify-center shrink-0">
                                        <Activity size={8} className="text-white" />
                                    </div>
                                    <div className="flex flex-col leading-none">
                                        <span className="text-[10px] font-bold text-[#FF4B4B]">$6.75M</span>
                                        <span className="text-[8px] text-[#14F195]">+7.91%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Top Protocols */}
                        <div>
                            <div className="text-[10px] text-gray-500 mb-2">Top Protocols</div>
                            <div className="grid grid-cols-3 gap-2">
                                <div className="bg-[#111]/30 rounded-full border border-border/10 px-2 py-1.5 flex items-center gap-2">
                                    <div className="h-4 w-4 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0 border border-orange-500/40">
                                        <Activity size={8} className="text-orange-500" />
                                    </div>
                                    <div className="flex flex-col leading-none">
                                        <span className="text-[10px] font-bold text-gray-200">$311M</span>
                                        <span className="text-[8px] text-[#14F195]">+20.35%</span>
                                    </div>
                                </div>
                                <div className="bg-[#111]/30 rounded-full border border-border/10 px-2 py-1.5 flex items-center gap-2">
                                    <div className="h-4 w-4 rounded-full bg-orange-400/20 flex items-center justify-center shrink-0 border border-orange-400/40">
                                        <Activity size={8} className="text-orange-400" />
                                    </div>
                                    <div className="flex flex-col leading-none">
                                        <span className="text-[10px] font-bold text-gray-200">$208M</span>
                                        <span className="text-[8px] text-[#14F195]">+4.74%</span>
                                    </div>
                                </div>
                                <div className="bg-[#111]/30 rounded-full border border-border/10 px-2 py-1.5 flex items-center gap-2">
                                    <div className="h-4 w-4 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 border border-purple-500/40">
                                        <Box size={8} className="text-purple-500" />
                                    </div>
                                    <div className="flex flex-col leading-none">
                                        <span className="text-[10px] font-bold text-gray-200">$77.6M</span>
                                        <span className="text-[8px] text-[#14F195]">+64.82%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
