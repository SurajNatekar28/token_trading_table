/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Copy, ArrowUpDown, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ExchangeModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultTab?: 'Convert' | 'Deposit' | 'Buy';
}

export const ExchangeModal: React.FC<ExchangeModalProps> = ({ isOpen, onClose, defaultTab = 'Deposit' }) => {
    const [activeTab, setActiveTab] = useState<'Convert' | 'Deposit' | 'Buy'>(defaultTab);
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText('9fGuJAyVyEDXA2RSknPsnLF91TSuRJDgQLot7GUYArhh');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="w-[440px] bg-[#0F1114] border border-gray-800/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4">
                    <h2 className="text-white font-semibold text-base">Exchange</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                        <X size={18} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="px-5 pb-2">
                    <div className="flex p-1 bg-[#1A1D24] rounded-lg border border-white/5">
                        {['Convert', 'Deposit', 'Buy'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={cn(
                                    "flex-1 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
                                    activeTab === tab
                                        ? "bg-[#2C3038] text-white shadow-sm border border-white/5"
                                        : "text-gray-500 hover:text-gray-300"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 pt-3">
                    {activeTab === 'Deposit' && (
                        <div className="space-y-4">
                            {/* Network Selector */}
                            <div className="flex gap-3">
                                <div className="flex-1 bg-[#13151A] border border-white/5 rounded-xl px-3 py-2.5 flex items-center gap-2.5 cursor-pointer hover:border-white/10 transition-colors group">
                                    <div className="relative h-5 w-5">
                                        <Image src="/images/solana-logo.png" alt="Solana" fill className="object-contain" />
                                    </div>
                                    <span className="text-white text-sm font-medium group-hover:text-gray-200">Solana</span>
                                </div>
                                <div className="flex-1 bg-[#13151A] border border-white/5 rounded-xl px-3 py-2.5 flex items-center justify-between">
                                    <span className="text-gray-500 text-sm">Balance:</span>
                                    <span className="text-white text-sm font-medium">0 SOL</span>
                                </div>
                            </div>

                            <p className="text-gray-500 text-[11px] leading-relaxed px-1">
                                Only deposit Solana through the Solana network for this address.
                            </p>

                            {/* QR Code & Address */}
                            <div className="bg-[#13151A] border border-white/5 rounded-xl p-4 flex gap-4 items-center">
                                <div className="bg-white p-1.5 rounded-lg shrink-0 h-24 w-24 flex items-center justify-center">
                                    {/* QR Code */}
                                    <div className="relative w-full h-full">
                                        <div className="absolute inset-0 flex items-center justify-center z-10">
                                            <div className="h-5 w-5 bg-black rounded-full p-0.5 flex items-center justify-center shadow-sm border border-white/20">
                                                <div className="relative h-full w-full">
                                                    <Image src="/images/solana-logo.png" alt="SOL" fill className="object-contain" />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Mock QR Pattern - using a cleaner pattern if possible, or just the image */}
                                        <img
                                            src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SolanaAddress&bgcolor=ffffff&color=000000&margin=0"
                                            alt="QR"
                                            className="w-full h-full object-contain rendering-pixelated"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col justify-center h-full py-1">
                                    <div className="text-gray-500 text-[11px] mb-1.5">Deposit Address</div>
                                    <div className="text-white text-[13px] font-mono break-all leading-5 tracking-tight">
                                        9fGuJAyVyEDXA2RSknPsnLF91TSuRJDgQLot7GUYArhh
                                    </div>
                                    <div className="flex justify-end mt-1">
                                        <button
                                            onClick={handleCopy}
                                            className="text-gray-500 hover:text-white transition-colors p-1"
                                        >
                                            <Copy size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="text-[11px] text-gray-500 px-1">
                                Don&apos;t have any Solana? <span className="text-[#5e87ff] cursor-pointer hover:text-[#4b70e0] transition-colors">Buy through Onramper</span>.
                            </div>

                            <Button
                                onClick={handleCopy}
                                className="w-full bg-[#5e87ff] hover:bg-[#4b70e0] text-white font-semibold h-11 rounded-xl text-sm shadow-[0_0_20px_rgba(94,135,255,0.2)] transition-all active:scale-[0.98]"
                            >
                                {copied ? 'Copied!' : 'Copy Address'}
                            </Button>
                        </div>
                    )}

                    {activeTab === 'Convert' && (
                        <div className="space-y-4">
                            <div className="text-gray-500 text-xs px-1">Swap SOL for BNB</div>

                            {/* From Input */}
                            <div className="bg-[#13151A] border border-white/5 rounded-xl p-3.5 transition-colors hover:border-white/10">
                                <div className="flex justify-between text-xs text-gray-500 mb-2">
                                    <span>Converting</span>
                                    <span>Balance: 0</span>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <input
                                        type="text"
                                        placeholder="0.0"
                                        className="bg-transparent text-2xl text-white font-medium outline-none w-full placeholder:text-gray-700"
                                    />
                                    <div className="flex items-center gap-2 bg-black/40 border border-white/5 rounded-full pl-2 pr-3 py-1.5 cursor-pointer hover:bg-black/60 transition-colors shrink-0">
                                        <div className="relative h-5 w-5">
                                            <Image src="/images/solana-logo.png" alt="SOL" fill className="object-contain" />
                                        </div>
                                        <span className="text-white font-medium text-sm">SOL</span>
                                        <ChevronDown size={14} className="text-gray-500 ml-1" />
                                    </div>
                                </div>
                                <div className="text-right text-xs text-gray-600 mt-1.5">($0.00)</div>
                            </div>

                            {/* Swap Icon */}
                            <div className="flex justify-center -my-3 relative z-10">
                                <div className="bg-[#2C3038] p-2 rounded-full border border-[#0F1114] cursor-pointer hover:bg-[#3a3e47] transition-colors shadow-lg">
                                    <ArrowUpDown size={16} className="text-gray-400" />
                                </div>
                            </div>

                            {/* To Input */}
                            <div className="bg-[#13151A] border border-white/5 rounded-xl p-3.5 transition-colors hover:border-white/10">
                                <div className="flex justify-between text-xs text-gray-500 mb-2">
                                    <span>Gaining</span>
                                    <span>Balance: 0</span>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <input
                                        type="text"
                                        placeholder="0.0"
                                        className="bg-transparent text-2xl text-white font-medium outline-none w-full placeholder:text-gray-700"
                                    />
                                    <div className="flex items-center gap-2 bg-black/40 border border-white/5 rounded-full pl-2 pr-3 py-1.5 cursor-pointer hover:bg-black/60 transition-colors shrink-0">
                                        <div className="relative h-5 w-5">
                                            <Image src="/images/bnb-logo.png" alt="BNB" fill className="object-contain" />
                                        </div>
                                        <span className="text-white font-medium text-sm">BNB</span>
                                        <ChevronDown size={14} className="text-gray-500 ml-1" />
                                    </div>
                                </div>
                            </div>

                            <div className="text-center text-xs text-gray-600 font-medium">
                                1 SOL ≈ 0.1575 BNB
                            </div>

                            <Button className="w-full bg-[#2C3038] hover:bg-[#3a3e47] text-gray-300 font-semibold h-11 rounded-xl text-sm transition-all">
                                Confirm
                            </Button>
                        </div>
                    )}

                    {activeTab === 'Buy' && (
                        <div className="space-y-4">
                            {/* Network Selector */}
                            <div className="flex gap-3">
                                <div className="flex-1 bg-[#13151A] border border-white/5 rounded-xl px-3 py-2.5 flex items-center gap-2.5 cursor-pointer hover:border-white/10 transition-colors group">
                                    <div className="relative h-5 w-5">
                                        <Image src="/images/solana-logo.png" alt="Solana" fill className="object-contain" />
                                    </div>
                                    <span className="text-white text-sm font-medium group-hover:text-gray-200">Solana</span>
                                </div>
                                <div className="flex-1 bg-[#13151A] border border-white/5 rounded-xl px-3 py-2.5 flex items-center justify-between">
                                    <span className="text-gray-500 text-sm">Balance:</span>
                                    <span className="text-white text-sm font-medium">0 SOL</span>
                                </div>
                            </div>

                            {/* Buy Input */}
                            <div className="bg-[#13151A] border border-white/5 rounded-xl p-3.5 transition-colors hover:border-white/10">
                                <div className="flex justify-between text-xs text-gray-500 mb-2">
                                    <span>Buying</span>
                                    <span>SOL Price: 141.59</span>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <input
                                        type="text"
                                        placeholder="0.0"
                                        className="bg-transparent text-2xl text-white font-medium outline-none w-full placeholder:text-gray-700"
                                    />
                                    <div className="flex items-center gap-2 bg-black/40 border border-white/5 rounded-full pl-2 pr-3 py-1.5 cursor-pointer hover:bg-black/60 transition-colors shrink-0">
                                        <div className="relative h-5 w-5">
                                            <Image src="/images/solana-logo.png" alt="SOL" fill className="object-contain" />
                                        </div>
                                        <span className="text-white font-medium text-sm">SOL</span>
                                    </div>
                                </div>
                                <div className="flex justify-between text-xs mt-3 font-medium">
                                    <span className="text-red-400/90">Minimum: 20 USD</span>
                                    <span className="text-gray-500">≈ 0 USD</span>
                                </div>
                            </div>

                            <div className="flex justify-end items-center gap-1.5 text-[11px] text-gray-500">
                                powered by <span className="text-white font-medium tracking-wide">onramper</span>
                            </div>

                            <Button className="w-full bg-[#2C3038] hover:bg-[#3a3e47] text-gray-300 font-semibold h-11 rounded-xl text-sm transition-all">
                                Buy
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
