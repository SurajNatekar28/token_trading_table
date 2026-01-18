'use client'

import React from 'react';
import { X, Star, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WatchlistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const WatchlistModal: React.FC<WatchlistModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="w-[600px] bg-[#0F1114] border border-gray-800/50 rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                    <h2 className="text-white font-semibold text-sm">Watchlist</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                        <X size={18} />
                    </button>
                </div>

                {/* Column Headers */}
                <div className="grid grid-cols-12 px-5 py-2 border-b border-white/5 text-[11px] font-medium text-gray-500">
                    <div className="col-span-4">Token</div>
                    <div className="col-span-3 text-right">Market Cap</div>
                    <div className="col-span-3 text-right flex items-center justify-end gap-1 cursor-pointer hover:text-gray-300 transition-colors">
                        1h Volume <ArrowDown size={12} />
                    </div>
                    <div className="col-span-2 text-right">Liquidity</div>
                    {/* Actions column implicit/hidden in empty state header usually, but kept for structure */}
                </div>

                {/* Content - Empty State */}
                <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                    <div className="mb-4 text-gray-600">
                        <Star size={48} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-white font-medium text-sm mb-2">Your watchlist is empty</h3>
                    <p className="text-gray-500 text-xs max-w-[300px]">
                        Add tokens to your watchlist by clicking the star icon on any token page
                    </p>
                </div>
            </div>
        </div>
    );
};
