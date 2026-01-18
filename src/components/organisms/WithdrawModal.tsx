'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ChevronDown, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WithdrawModalProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * WithdrawModal
 *
 * A modal for withdrawing tokens, including network selection,
 * amount input, destination address, and output preview.
 *
 * Behavior:
 * - Renders only when `isOpen` is true.
 * - Provides UI for selecting network, entering amount, and entering
 *   destination address.
 * - Calls `onClose` when the modal is dismissed or close button is clicked.
 *
 * @component
 * @param {WithdrawModalProps} props
 * @param {boolean} props.isOpen - Whether the modal is visible.
 * @param {() => void} props.onClose - Function to close the modal.
 *
 * @returns {JSX.Element | null}
 */

export const WithdrawModal: React.FC<WithdrawModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="w-[440px] bg-[#0F1114] border border-gray-800/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4">
                    <h2 className="text-white font-semibold text-base">Withdraw</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                        <X size={18} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-5 pt-2 space-y-4">
                    {/* Network Selector */}
                    <div className="flex gap-3">
                        <div className="flex-1 bg-[#13151A] border border-white/5 rounded-xl px-3 py-2.5 flex items-center gap-2.5 cursor-pointer hover:border-white/10 transition-colors group">
                            <div className="relative h-5 w-5">
                                <Image src="/images/solana-logo.png" alt="Solana" fill className="object-contain" />
                            </div>
                            <span className="text-white text-sm font-medium group-hover:text-gray-200">Solana</span>
                            <ChevronDown size={14} className="text-gray-500 ml-auto" />
                        </div>
                        <div className="flex-1 bg-[#13151A] border border-white/5 rounded-xl px-3 py-2.5 flex items-center justify-between">
                            <span className="text-gray-500 text-sm">Balance:</span>
                            <span className="text-white text-sm font-medium">0 SOL</span>
                        </div>
                    </div>

                    {/* Withdraw Amount */}
                    <div className="bg-[#13151A] border border-white/5 rounded-xl p-3.5 transition-colors hover:border-white/10">
                        <div className="flex justify-between text-xs text-gray-500 mb-2">
                            <span>Withdraw Amount</span>
                            <span className="text-[#5e87ff] cursor-pointer hover:text-[#4b70e0]">Max</span>
                        </div>
                        <div className="flex items-center justify-between gap-3">
                            <input
                                type="text"
                                placeholder="0.0"
                                className="bg-transparent text-2xl text-white font-medium outline-none w-full placeholder:text-gray-700"
                            />
                            <div className="flex items-center gap-2 bg-black/40 border border-white/5 rounded-full pl-2 pr-3 py-1.5 shrink-0">
                                <div className="relative h-5 w-5">
                                    <Image src="/images/solana-logo.png" alt="SOL" fill className="object-contain" />
                                </div>
                                <span className="text-white font-medium text-sm">SOL</span>
                            </div>
                        </div>
                        <div className="text-right text-[10px] text-gray-600 mt-1.5 font-mono">$0.00</div>
                    </div>

                    {/* Arrow Divider */}
                    <div className="flex justify-center -my-2">
                        <ArrowDown size={16} className="text-gray-600" />
                    </div>

                    {/* Destination Network (Same as source usually for simple withdraw) */}
                    <div className="bg-[#13151A] border border-white/5 rounded-xl px-3 py-3 flex items-center justify-between cursor-pointer hover:border-white/10">
                        <div className="flex items-center gap-2.5">
                            <div className="relative h-5 w-5">
                                <Image src="/images/solana-logo.png" alt="Solana" fill className="object-contain" />
                            </div>
                            <span className="text-white text-sm font-medium">Solana</span>
                        </div>
                        <ChevronDown size={14} className="text-gray-500" />
                    </div>

                    {/* Address Input */}
                    <div className="bg-[#13151A] border border-white/5 rounded-xl px-3 py-3">
                        <input
                            type="text"
                            placeholder="Address: Address of destination wallet"
                            className="bg-transparent text-sm text-white w-full outline-none placeholder:text-gray-600"
                        />
                    </div>

                    {/* To Amount */}
                    <div className="bg-[#13151A] border border-white/5 rounded-xl p-3.5">
                        <div className="text-xs text-gray-500 mb-1">To</div>
                        <div className="flex items-center justify-between gap-3">
                            <span className="text-xl text-white font-medium">0.0</span>
                            <div className="flex items-center gap-2">
                                <div className="relative h-5 w-5">
                                    <Image src="/images/solana-logo.png" alt="SOL" fill className="object-contain" />
                                </div>
                                <span className="text-white font-medium text-sm">SOL</span>
                                <ChevronDown size={14} className="text-gray-500" />
                            </div>
                        </div>
                    </div>

                    <Button
                        className="w-full bg-[#5e87ff] hover:bg-[#4b70e0] text-white font-semibold h-11 rounded-xl text-sm shadow-[0_0_20px_rgba(94,135,255,0.2)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled
                    >
                        Missing Destination Address
                    </Button>
                </div>
            </div>
        </div>
    );
};
