'use client'

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeftRight } from 'lucide-react';

interface WalletPopoverProps {
    isOpen: boolean;
    onClose: () => void;
    onDeposit: () => void;
    onWithdraw: () => void;
}

/**
 * WalletPopover
 *
 * A small popover showing wallet totals, balances, and deposit/withdraw actions.
 *
 * Behavior:
 * - Renders only when `isOpen` is true.
 * - Displays total value and token balances.
 * - Calls `onDeposit` or `onWithdraw` and then closes the popover.
 * - Calls `onClose` when dismissed via an action.
 *
 * @component
 * @param {WalletPopoverProps} props
 * @param {boolean} props.isOpen - Whether the popover is visible.
 * @param {() => void} props.onClose - Close handler.
 * @param {() => void} props.onDeposit - Deposit action handler.
 * @param {() => void} props.onWithdraw - Withdraw action handler.
 *
 * @returns {JSX.Element | null}
 */


export const WalletPopover: React.FC<WalletPopoverProps> = ({ isOpen, onClose, onDeposit, onWithdraw }) => {
    if (!isOpen) return null;

    return (
        <div className="absolute top-full right-0 mt-2 w-[320px] bg-[#0F1114] border border-gray-800/50 rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 z-[60]">
            {/* Header Stats */}
            <div className="p-5 border-b border-white/5">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-400 text-xs font-medium">Total Value</span>
                    <div className="flex gap-3">
                        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                            <div className="w-3 h-3 relative opacity-70">
                                <Image src="/images/solana-logo.png" alt="SOL" fill className="object-contain" />
                            </div>
                            Solana
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                            <div className="w-3 h-3 relative opacity-70">
                                <Image src="/images/solana-logo.png" alt="Perps" fill className="object-contain" />
                            </div>
                            Perps
                        </div>
                    </div>
                </div>
                <div className="text-2xl font-semibold text-white">$0</div>
            </div>

            {/* Balances */}
            <div className="p-5 py-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="relative h-5 w-5">
                        <Image src="/images/solana-logo.png" alt="SOL" fill className="object-contain" />
                    </div>
                    <span className="text-xl font-medium text-white">0</span>
                </div>

                <ArrowLeftRight size={16} className="text-gray-500" />

                <div className="flex items-center gap-2">
                    <div className="relative h-5 w-5">
                        {/* Placeholder for the blue coin icon in screenshot */}
                        <div className="w-full h-full rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center">
                            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>
                        </div>
                    </div>
                    <span className="text-xl font-medium text-white">0</span>
                </div>
            </div>

            {/* Actions */}
            <div className="p-4 grid grid-cols-2 gap-3 bg-[#13151A]/50">
                <Button
                    onClick={() => {
                        onDeposit();
                        onClose();
                    }}
                    className="bg-[#5e87ff] hover:bg-[#4b70e0] text-white font-semibold h-10 rounded-lg text-sm shadow-[0_0_15px_rgba(94,135,255,0.2)]"
                >
                    Deposit
                </Button>
                <Button
                    onClick={() => {
                        onWithdraw();
                        onClose();
                    }}
                    className="bg-[#1A1D24] hover:bg-[#252830] text-white font-semibold h-10 rounded-lg text-sm border border-white/5"
                >
                    Withdraw
                </Button>
            </div>
        </div>
    );
};
