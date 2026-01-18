import React, { useState, useRef, useEffect } from 'react';
import { Wallet, ChevronDown, Settings, Copy, Plus, Rocket } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface ActiveWalletsPopoverProps {
    selectedChain: 'SOL' | 'BNB';
    position?: 'top' | 'bottom';
}

/**
 * ActiveWalletsPopover
 * ---------------------
 * A controlled popover component that displays the list of active wallets for the selected chain
 * (SOL or BNB). This component provides quick actions such as:
 *  - Selecting/unselecting wallets
 *  - Viewing wallet balances
 *  - Copying wallet addresses
 *  - Toggling wallet activation
 *  - Adding new wallets
 *
 * The popover is triggered by clicking a compact button showing:
 *  - Wallet count
 *  - Selected chain logo (SOL/BNB)
 *  - Chain wallet count
 *
 * Clicking outside the popover automatically closes it.
 *
 * Props:
 * -------
 * @param selectedChain - Blockchain identifier ("SOL" | "BNB").
 * @param position - Defines the tooltip/popover alignment ("top" | "bottom"). Defaults to "bottom".
 *
 * Behavior:
 * ---------
 * - Uses internal state (isOpen) to control visibility.
 * - Detects outside clicks via a document-level event listener (mousedown).
 * - Supports both top and bottom popover placement using conditional classes.
 * - Uses Next.js <Image> for optimized chain logo rendering.
 * - Animates open/close using Tailwind-based transitions.
 *
 * Usage:
 * -------
 * <ActiveWalletsPopover selectedChain="SOL" />
 *
 * Accessibility:
 * --------------
 * - Trigger button is fully keyboard-accessible.
 * - Tooltip provides additional context to assistive technologies.
 *
 * Notes:
 * -------
 * - Wallet items are static placeholders; integrate with your wallet store to render real data.
 * - Ensure the parent container does not cut off overflow if placed inside constrained layouts.
 */

export const ActiveWalletsPopover: React.FC<ActiveWalletsPopoverProps> = ({ selectedChain, position = 'bottom' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    // Close popover when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const chainLogo = selectedChain === 'SOL' ? '/images/solana-logo.png' : '/images/bnb-logo.png';

    return (
        <div className="relative" ref={popoverRef}>
            {/* Trigger Button with Tooltip */}
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={cn(
                            "ml-2 flex items-center gap-2 bg-[#111] border border-border/20 rounded-full px-3 py-1 h-8 cursor-pointer hover:bg-white/5 transition-colors",
                            isOpen && "bg-white/5 border-border/40"
                        )}
                    >
                        <div className="flex items-center gap-1.5">
                            <Wallet size={14} className="text-white" />
                            <span className="text-xs font-bold text-white">1</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <div className="relative w-3.5 h-3.5">
                                <Image
                                    src={chainLogo}
                                    alt={selectedChain}
                                    fill
                                    className="object-contain"
                                    sizes="14px"
                                />
                            </div>
                            <span className="text-xs font-bold text-white">0</span>
                        </div>

                        <ChevronDown size={12} className={cn("ml-1 text-gray-500 transition-transform", isOpen && "rotate-180")} />
                    </button>
                </TooltipTrigger>
                <TooltipContent side={position} className="bg-black/90 text-white border-gray-800 text-xs">
                    <p>Active wallets</p>
                </TooltipContent>
            </Tooltip>

            {/* Popover Content */}
            {isOpen && (
                <div className={cn(
                    "absolute w-[320px] bg-[#0a0b0d] border border-gray-800 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200",
                    position === 'top' ? "bottom-full mb-2 left-0" : "top-full mt-2 right-0"
                )}>
                    {/* Header Actions */}
                    <div className="flex items-center justify-between px-3 py-2 border-b border-gray-800 bg-[#111]/50">
                        <div className="flex items-center gap-2">
                            <button className="px-2 py-1 rounded-md bg-[#1a1d24] hover:bg-[#252830] text-[10px] font-medium text-gray-300 transition-colors border border-gray-800">
                                Unselect All
                            </button>
                            <button className="px-2 py-1 rounded-md hover:bg-[#1a1d24] text-[10px] font-medium text-gray-500 hover:text-gray-300 transition-colors">
                                Select All with Balance
                            </button>
                        </div>
                        <button className="text-gray-500 hover:text-white transition-colors">
                            <Settings size={14} />
                        </button>
                    </div>

                    {/* Wallet List */}
                    <div className="p-2 space-y-1">
                        {/* Wallet Item */}
                        <div className="group flex items-center justify-between p-2 rounded-lg hover:bg-[#111] border border-transparent hover:border-gray-800 transition-all">
                            <div className="flex items-center gap-3">
                                {/* Checkbox */}
                                <div className="w-4 h-4 rounded-sm border border-orange-500 bg-orange-500/10 flex items-center justify-center cursor-pointer">
                                    <div className="w-2 h-2 bg-orange-500 rounded-[1px]" />
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-orange-500">Axiom Main</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <Rocket size={10} className="text-gray-600" />
                                        <span className="text-[10px] font-medium text-gray-500">Off</span>
                                        <span className="text-[10px] text-gray-600 font-mono">9fGuj</span>
                                        <button className="text-gray-600 hover:text-gray-400">
                                            <Copy size={10} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1.5 bg-black px-2 py-1 rounded-md border border-gray-800">
                                    <div className="relative w-3 h-3">
                                        <Image
                                            src={chainLogo}
                                            alt={selectedChain}
                                            fill
                                            className="object-contain"
                                            sizes="12px"
                                        />
                                    </div>
                                    <span className="text-xs font-medium text-gray-300">0</span>
                                </div>
                                <Switch className="scale-75 data-[state=checked]:bg-blue-600" />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-2 border-t border-gray-800">
                        <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-[#111] text-xs font-medium text-gray-400 hover:text-white transition-colors">
                            <Plus size={14} />
                            Add Wallet
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
