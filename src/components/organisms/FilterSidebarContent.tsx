'use client';

import React from 'react';
import {
    SheetContent,
    SheetHeader,
    SheetTitle
} from '@/components/ui/sheet';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

import { useAppDispatch, useAppSelector } from '@/lib/store';
import {
    toggleProtocol,
    toggleQuoteToken,
    setDeselectedProtocols,
    setDeselectedQuoteTokens,
    setKeywords,
    setExcludeKeywords,
    resetFilters
} from '@/lib/features/filterSlice';

// --------------------------------------------------
// STATIC ARRAYS (do NOT re-create on every render)
// --------------------------------------------------

const protocols = [
    { name: 'Pump', icon: '🚀' },
    { name: 'Mayhem', icon: '💥' },
    { name: 'Bonk', icon: '👊' },
    { name: 'Bags', icon: '💰' },
    { name: 'Moonshot', icon: '🌙' },
    { name: 'Heaven', icon: '☁️' },
    { name: 'Daos.fun', icon: '🌊' },
    { name: 'Candle', icon: '🕯️' },
    { name: 'Sugar', icon: '🍭' },
    { name: 'Believe', icon: '💚' },
    { name: 'Jupiter Studio', icon: '🪐' },
    { name: 'Moonit', icon: '⚡' },
    { name: 'Boop', icon: '🌀' },
    { name: 'LaunchLab', icon: '@' },
    { name: 'Dynamic BC', icon: '🔥' },
    { name: 'Raydium', icon: '⚛️' },
    { name: 'Meteora AMM', icon: '☄️' },
    { name: 'Meteora AMM V2', icon: '☄️' },
    { name: 'Pump AMM', icon: '🚀' },
    { name: 'Orca', icon: '🐋' }
];

const quoteTokens = [
    { name: 'SOL', icon: '≡' },
    { name: 'USDC', icon: '◉' },
    { name: 'USDT', icon: '◉' }
];

// --------------------------------------------------
// MEMOIZED SUBCOMPONENTS
// --------------------------------------------------

const ProtocolList = React.memo(
    ({
        deselected,
        onToggle,
        onSelectAll
    }: {
        deselected: string[];
        onToggle: (name: string) => void;
        onSelectAll: () => void;
    }) => (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-300">
                    Protocols <span className="text-xs text-gray-500">(click to exclude)</span>
                </Label>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onSelectAll}
                    className="h-7 text-xs text-gray-400 hover:text-white"
                >
                    Select All
                </Button>
            </div>

            <div className="flex flex-wrap gap-2">
                {protocols.map((protocol) => {
                    const isOff = deselected.includes(protocol.name);

                    return (
                        <button
                            key={protocol.name}
                            onClick={() => onToggle(protocol.name)}
                            aria-label={`Toggle protocol ${protocol.name}`}
                            className={cn(
                                'px-3 py-1.5 rounded-full text-xs font-medium transition-all border cursor-pointer',
                                isOff
                                    ? 'border-red-500/30 bg-red-500/10 text-red-400/40 line-through opacity-40'
                                    : 'border-gray-700 bg-gray-900/50 text-gray-300 hover:border-gray-600 hover:bg-gray-800/50'
                            )}
                        >
                            <span className="mr-1">{protocol.icon}</span>
                            {protocol.name}
                        </button>
                    );
                })}
            </div>
        </div>
    )
);
ProtocolList.displayName = 'ProtocolList';

const QuoteTokenList = React.memo(
    ({
        deselected,
        onToggle,
        onSelectAll
    }: {
        deselected: string[];
        onToggle: (name: string) => void;
        onSelectAll: () => void;
    }) => (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-300">
                    Quote Tokens <span className="text-xs text-gray-500">(click to exclude)</span>
                </Label>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onSelectAll}
                    className="h-7 text-xs text-gray-400 hover:text-white"
                >
                    Select All
                </Button>
            </div>

            <div className="flex gap-2">
                {quoteTokens.map((token) => {
                    const isOff = deselected.includes(token.name);

                    return (
                        <button
                            key={token.name}
                            onClick={() => onToggle(token.name)}
                            aria-label={`Toggle quote token ${token.name}`}
                            className={cn(
                                'px-3 py-1.5 rounded-full text-xs font-medium transition-all border cursor-pointer',
                                isOff
                                    ? 'border-red-500/30 bg-red-500/10 text-red-400/40 line-through opacity-40'
                                    : 'border-gray-700 bg-gray-900/50 text-gray-300 hover:border-gray-600 hover:bg-gray-800/50'
                            )}
                        >
                            <span className="mr-1">{token.icon}</span>
                            {token.name}
                        </button>
                    );
                })}
            </div>
        </div>
    )
);
QuoteTokenList.displayName = 'QuoteTokenList';

const KeywordFields = React.memo(
    ({
        keywords,
        excludeKeywords,
        onKeywordsChange,
        onExcludeChange
    }: {
        keywords: string;
        excludeKeywords: string;
        onKeywordsChange: (v: string) => void;
        onExcludeChange: (v: string) => void;
    }) => (
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="search" className="text-sm font-medium text-gray-300">
                    Search Keywords
                </Label>
                <Input
                    id="search"
                    placeholder="keyword1, keyword2..."
                    value={keywords}
                    onChange={(e) => onKeywordsChange(e.target.value)}
                    className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="exclude" className="text-sm font-medium text-gray-300">
                    Exclude Keywords
                </Label>
                <Input
                    id="exclude"
                    placeholder="keyword1, keyword2..."
                    value={excludeKeywords}
                    onChange={(e) => onExcludeChange(e.target.value)}
                    className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
                />
            </div>
        </div>
    )
);
KeywordFields.displayName = 'KeywordFields';

// --------------------------------------------------
// MAIN CONTENT COMPONENT
// --------------------------------------------------

const FilterSidebarContent = ({
    onClose
}: {
    onClose: () => void;
}) => {
    const dispatch = useAppDispatch();
    const { keywords, excludeKeywords, deselectedProtocols, deselectedQuoteTokens } =
        useAppSelector((state) => state.filter);

    return (
        <SheetContent className="w-[550px] border-l border-gray-800 bg-black p-0 overflow-y-auto">
            <SheetHeader className="sticky top-0 z-10 bg-black border-b border-gray-800 px-5 py-4">
                <div className="flex items-center justify-between">
                    <SheetTitle className="text-white text-lg font-semibold">Filters</SheetTitle>
                    <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                        <X size={18} className="text-gray-400" />
                    </Button>
                </div>
            </SheetHeader>

            <div className="px-5 py-4 space-y-6">
                <ProtocolList
                    deselected={deselectedProtocols}
                    onToggle={(name) => dispatch(toggleProtocol(name))}
                    onSelectAll={() => dispatch(setDeselectedProtocols([]))}
                />

                <QuoteTokenList
                    deselected={deselectedQuoteTokens}
                    onToggle={(name) => dispatch(toggleQuoteToken(name))}
                    onSelectAll={() => dispatch(setDeselectedQuoteTokens([]))}
                />

                <KeywordFields
                    keywords={keywords}
                    excludeKeywords={excludeKeywords}
                    onKeywordsChange={(v) => dispatch(setKeywords(v))}
                    onExcludeChange={(v) => dispatch(setExcludeKeywords(v))}
                />

                <div className="flex gap-3 pt-4">
                    <Button
                        variant="outline"
                        onClick={() => dispatch(resetFilters())}
                        className="flex-1 bg-gray-900 border-gray-700 text-white hover:bg-gray-800"
                    >
                        Reset
                    </Button>

                    <Button onClick={onClose} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                        Apply All
                    </Button>
                </div>
            </div>
        </SheetContent>
    );
};

export default FilterSidebarContent;