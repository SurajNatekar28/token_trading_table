import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, BarChart2, TrendingUp, Droplets, History, User } from 'lucide-react';
import { Token } from '@/types';
import { MOCK_TOKENS, MOCK_TOKENS_BNB } from '@/lib/mockData';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const getAvatarColor = (symbol: string) => {
    const colors = [
        'bg-yellow-200 text-yellow-900',
        'bg-purple-300 text-purple-900',
        'bg-blue-300 text-blue-900',
        'bg-green-300 text-green-900',
        'bg-orange-300 text-orange-900',
        'bg-pink-300 text-pink-900',
        'bg-cyan-300 text-cyan-900',
        'bg-red-300 text-red-900',
    ];
    const index = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
};

/**
 * SearchModal
 *
 * A modal for searching tokens by name, symbol, or address.
 *
 * Behavior:
 * - Renders only when `isOpen` is true.
 * - Auto-focuses the input when opened.
 * - Closes on `Escape` key.
 * - Filters tokens from both mock datasets (max 5 results).
 * - Shows results when typing, otherwise shows history placeholder.
 * - Calls `onClose` when the modal should be closed.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible.
 * @param {() => void} props.onClose - Function to close the modal.
 *
 * @returns {JSX.Element | null}
 */


export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Token[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    // Combine all tokens for search
    const allTokens = [...MOCK_TOKENS, ...MOCK_TOKENS_BNB];

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    useEffect(() => {
        if (!searchTerm.trim()) {
            setSearchResults([]);
            return;
        }

        const term = searchTerm.toLowerCase();
        const results = allTokens.filter(token =>
            token.name.toLowerCase().includes(term) ||
            token.symbol.toLowerCase().includes(term) ||
            token.address.toLowerCase().includes(term)
        ).slice(0, 5); // Limit to 5 results

        setSearchResults(results);
    }, [searchTerm]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[100px] bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-[600px] bg-[#0F1114] border border-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col">

                {/* Header / Filters */}
                <div className="p-3 border-b border-gray-800 flex items-center justify-between bg-[#16181D]">
                    <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                        {['Pump', 'Bonk', 'Bags', 'USD1', 'OG Mode', 'Graduated'].map((filter, i) => (
                            <button
                                key={filter}
                                className={`px-2 py-1 rounded text-[10px] font-medium border flex items-center gap-1 whitespace-nowrap ${i === 0 ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                                    i === 1 ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' :
                                        'bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-gray-300'
                                    }`}
                            >
                                {i < 3 && <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-green-500' : i === 1 ? 'bg-orange-500' : 'bg-green-400'
                                    }`}></div>}
                                {filter}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 pl-2 border-l border-gray-800 ml-2 shrink-0">
                        <span className="text-[10px] text-gray-500">Sort by</span>
                        <div className="flex items-center gap-1">
                            <button className="p-1 hover:bg-gray-800 rounded text-gray-400 hover:text-white"><Clock size={12} /></button>
                            <button className="p-1 hover:bg-gray-800 rounded text-gray-400 hover:text-white"><TrendingUp size={12} /></button>
                            <button className="p-1 bg-blue-500/10 text-blue-400 rounded"><BarChart2 size={12} /></button>
                            <button className="p-1 hover:bg-gray-800 rounded text-gray-400 hover:text-white"><Droplets size={12} /></button>
                        </div>
                    </div>
                </div>

                {/* Search Input */}
                <div className="p-4 relative">
                    <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />
                    <input
                        ref={inputRef}
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by name, ticker, or CA..."
                        className="w-full bg-transparent text-lg text-white placeholder:text-gray-600 focus:outline-none pl-10 pr-12 font-medium"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border border-gray-800 bg-gray-900 text-[10px] text-gray-500 font-mono">
                        Esc
                    </div>
                </div>

                {/* Results / History */}
                <div className="min-h-[300px] bg-[#0F1114] border-t border-gray-800/50">
                    {searchTerm ? (
                        <div className="p-2">
                            <div className="text-sm text-gray-400 px-2 py-2">Results</div>
                            {searchResults.length > 0 ? (
                                searchResults.map(token => (
                                    <div key={token.id} className="flex items-center gap-4 p-3 hover:bg-white/5 rounded-lg cursor-pointer group transition-colors border border-transparent hover:border-gray-800">
                                        {/* Token Image */}
                                        <div className="relative shrink-0">
                                            <Avatar className="h-12 w-12 rounded-md ring-1 ring-green-500/50">
                                                <AvatarImage src={token.logoUrl} alt={token.symbol} className="object-cover" />
                                                <AvatarFallback className={cn("rounded-md text-xs font-bold", getAvatarColor(token.symbol))}>
                                                    {token.symbol.slice(0, 2)}
                                                </AvatarFallback>
                                            </Avatar>
                                            {/* Chain Badge */}
                                            <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-[2px]">
                                                <div className="bg-orange-500 rounded-full p-[3px] w-4 h-4"></div>
                                            </div>
                                        </div>

                                        {/* Token Info */}
                                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-white text-lg">{token.symbol}</span>
                                                <span className="text-gray-500 text-sm truncate">{token.name}</span>
                                                <div className="h-4 w-4 text-gray-600"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg></div>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm mt-1">
                                                <span className="text-green-400 font-medium">10mo</span>
                                                <div className="flex items-center gap-2 text-gray-400">
                                                    <span className="bg-blue-500/20 text-blue-400 text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
                                                        <span className="w-1 h-1 bg-blue-400 rounded-full"></span> USDC
                                                    </span>
                                                    <div className="flex gap-1">
                                                        <User size={12} />
                                                        <div className="w-3 h-3 rounded-full border border-gray-600"></div>
                                                        <div className="w-3 h-3 rounded-full border border-green-500 text-green-500 flex items-center justify-center text-[8px]">🛡️</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Metrics */}
                                        <div className="flex items-center gap-8 mr-4">
                                            <div className="text-right">
                                                <div className="text-[10px] text-gray-500 uppercase tracking-wider">MC</div>
                                                <div className="text-white font-bold">${(token.marketCap / 1000).toFixed(1)}K</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[10px] text-gray-500 uppercase tracking-wider">V</div>
                                                <div className="text-white font-bold">${(token.volume24h / 1000).toFixed(1)}K</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-[10px] text-gray-500 uppercase tracking-wider">L</div>
                                                <div className="text-white font-bold">${(token.liquidity / 1000).toFixed(1)}K</div>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <button className="h-10 w-10 rounded-full bg-[#5e87ff] hover:bg-[#4b70e0] flex items-center justify-center text-white shadow-[0_0_15px_rgba(94,135,255,0.3)] transition-all shrink-0">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
                                            </svg>
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                                    <Search size={32} className="mb-2 opacity-20" />
                                    <span className="text-sm">No results found</span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="p-4">
                            <div className="text-xs font-medium text-gray-500 mb-3">History</div>
                            {/* Mock History Items */}
                            <div className="space-y-1">
                                <div className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg cursor-pointer group transition-colors opacity-50 hover:opacity-100">
                                    <History size={16} className="text-gray-600 group-hover:text-gray-400" />
                                    <span className="text-sm text-gray-400 group-hover:text-white">Previous search term...</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
