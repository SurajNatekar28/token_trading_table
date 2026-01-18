'use client';

import React, {
    useEffect,
    useState,
    useMemo,
    useCallback,
    useDeferredValue,
    useTransition
} from 'react';
import dynamic from 'next/dynamic';
import { TokenColumn } from './TokenColumn';
import { FilterSidebar } from './FilterSidebar';
import {
    MOCK_TOKENS,
    MOCK_TOKENS_BNB,
    updateTokenData,
    generateNewSOLToken,
    generateNewBNBToken
} from '@/lib/mockData';
import { Token, MarketUpdate } from '@/types';
import { webSocketService } from '@/services/websocketMock';
import { AppHeader } from './AppHeader';
import { AppFooter } from './AppFooter';
import { PulseHeader } from './PulseHeader';
import { ActionIcons } from '../molecules/ActionIcons';
import { useAppSelector } from '@/lib/store';

const TickerSettingsModal = dynamic(
    () => import('./TickerSettingsModal').then(mod => ({ default: mod.TickerSettingsModal })),
    { ssr: false }
);

const DisplaySettingsModal = dynamic(
    () => import('./DisplaySettingsModal').then(mod => ({ default: mod.DisplaySettingsModal })),
    { ssr: false }
);

export const TokenTable: React.FC = () => {
    const [selectedChain, setSelectedChain] = useState<'SOL' | 'BNB'>('SOL');
    const [tokens, setTokens] = useState<Token[]>(MOCK_TOKENS);
    const [isLoading, setIsLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [isTickerSettingsModalOpen, setIsTickerSettingsModalOpen] = useState(false);
    const [isDisplaySettingsModalOpen, setIsDisplaySettingsModalOpen] = useState(false);

    const [isPending, startTransition] = useTransition();

    const filterState = useAppSelector(state => state.filter);
    const sortState = useAppSelector(state => state.sort);

    const deferredFilter = useDeferredValue(filterState);


    useEffect(() => {
    setIsLoading(true);

    const newTokens =
        selectedChain === 'SOL' ? MOCK_TOKENS : MOCK_TOKENS_BNB;

    startTransition(() => {
        setTokens(newTokens);
        webSocketService.setTokens(newTokens);
    });

    const timer = setTimeout(() => {
        setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
}, [selectedChain]);


    useEffect(() => {
        webSocketService.connect();

        const buffer: Record<string, MarketUpdate> = {};
        const unsubscribe = webSocketService.subscribe((updates: MarketUpdate[]) => {
            updates.forEach(u => {
                buffer[u.tokenId] = u;
            });
        });

        let raf = 0;
        const flush = () => {
            if (Object.keys(buffer).length) {
                setTokens(prev =>
                    prev.map(t => {
                        const u = buffer[t.id];
                        return u
                            ? { ...t, price: u.price, priceChange24h: u.priceChange24h }
                            : t;
                    })
                );
                for (const k in buffer) delete buffer[k];
            }
            raf = requestAnimationFrame(flush);
        };

        raf = requestAnimationFrame(flush);

        return () => {
            unsubscribe();
            webSocketService.disconnect();
            cancelAnimationFrame(raf);
        };
    }, [selectedChain]);

    useEffect(() => {
        const id = setInterval(() => {
            setTokens(prev => prev.map(updateTokenData));
        }, 2000);
        return () => clearInterval(id);
    }, []);


    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        const loop = () => {
            timeoutId = setTimeout(() => {
                const newToken =
                    selectedChain === 'SOL'
                        ? generateNewSOLToken()
                        : generateNewBNBToken();

                setTokens(prev => [newToken, ...prev]);
                loop();
            }, Math.random() * 15000);
        };

        loop();
        return () => clearTimeout(timeoutId);
    }, [selectedChain]);


    const filteredTokens = useMemo(() => {
        const {
            keywords,
            excludeKeywords,
            deselectedProtocols,
            deselectedQuoteTokens,
            minLiquidity,
            maxLiquidity,
            minVolume,
            maxVolume
        } = deferredFilter;

        const search = keywords.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);
        const exclude = excludeKeywords.toLowerCase().split(',').map(s => s.trim()).filter(Boolean);

        return tokens.filter(token => {
            const matchesSearch =
                !search.length ||
                search.some(s =>
                    token.name.toLowerCase().includes(s) ||
                    token.symbol.toLowerCase().includes(s)
                );

            const matchesExclude =
                !exclude.length ||
                !exclude.some(s =>
                    token.name.toLowerCase().includes(s) ||
                    token.symbol.toLowerCase().includes(s)
                );

            const matchesProtocol =
                !deselectedProtocols.length ||
                !deselectedProtocols.includes(token.protocol);

            const matchesQuote =
                !deselectedQuoteTokens.length ||
                !deselectedQuoteTokens.includes(token.quoteToken);

            return (
                matchesSearch &&
                matchesExclude &&
                matchesProtocol &&
                matchesQuote &&
                (minLiquidity === null || token.liquidity >= minLiquidity) &&
                (maxLiquidity === null || token.liquidity <= maxLiquidity) &&
                (minVolume === null || token.volume24h >= minVolume) &&
                (maxVolume === null || token.volume24h <= maxVolume)
            );
        });
    }, [tokens, deferredFilter]);


    const comparator = useMemo(() => ({
        marketCap: (a: Token, b: Token) => b.marketCap - a.marketCap,
        volume: (a: Token, b: Token) => b.volume24h - a.volume24h,
        liquidity: (a: Token, b: Token) => b.liquidity - a.liquidity,
        time: (a: Token, b: Token) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        price: (a: Token, b: Token) => b.price - a.price,
        holders: (a: Token, b: Token) => b.holders - a.holders
    }), []);

    const applySort = useCallback(
        (list: Token[], column: 'new' | 'final_stretch' | 'migrated') => {
            const { field, direction } = sortState[column];
            if (!field) return list;
            const sorted = [...list].sort(comparator[field]);
            return direction === 'asc' ? sorted.reverse() : sorted;
        },
        [sortState, comparator]
    );


    const MAX = 12;

    const newPairs = useMemo(
        () => applySort(filteredTokens.filter(t => t.status === 'new'), 'new').slice(0, MAX),
        [filteredTokens, sortState.new, applySort]
    );

    const finalStretch = useMemo(
        () =>
            applySort(
                filteredTokens.filter(t => t.status === 'final_stretch'),
                'final_stretch'
            ).slice(0, MAX),
        [filteredTokens, sortState.final_stretch, applySort]
    );

    const migrated = useMemo(
        () =>
            applySort(
                filteredTokens.filter(t => t.status === 'migrated'),
                'migrated'
            ).slice(0, MAX),
        [filteredTokens, sortState.migrated, applySort]
    );


    return (
        <div className="flex flex-col h-[100dvh] w-full fixed inset-0 bg-transparent">

            <div className="sticky top-0 z-50 bg-background">
                <AppHeader selectedChain={selectedChain} onChainSelect={setSelectedChain} />
                <ActionIcons
                    onSettingsClick={() => setIsTickerSettingsModalOpen(true)}
                    onStarClick={() => {}}
                    onChartClick={() => {}}
                />
                <PulseHeader
                    selectedChain={selectedChain}
                    onChainSelect={setSelectedChain}
                    onDisplayClick={() => setIsDisplaySettingsModalOpen(true)}
                />
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto relative">
                <div
                    className={`h-full min-h-0 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 border-t border-border/20 transition-opacity duration-300 ${
                        isLoading || isPending ? 'opacity-60' : 'opacity-100'
                    }`}
                >
                    <TokenColumn
                        title="New Pairs"
                        tokens={newPairs}
                        isLoading={isLoading}
                        showFilter
                        onFilterClick={() => setIsFilterOpen(true)}
                        selectedChain={selectedChain}
                        columnType="new"
                    />

                    <TokenColumn
                        title="Final Stretch"
                        tokens={finalStretch}
                        isLoading={isLoading}
                        onFilterClick={() => setIsFilterOpen(true)}
                        selectedChain={selectedChain}
                        columnType="final_stretch"
                    />

                    <TokenColumn
                        title="Migrated"
                        tokens={migrated}
                        isLoading={isLoading}
                        onFilterClick={() => setIsFilterOpen(true)}
                        selectedChain={selectedChain}
                        columnType="migrated"
                    />
                </div>
            </div>

            <div className="sticky bottom-0 z-50 bg-background border-t border-border/20">
                <AppFooter selectedChain={selectedChain} />
            </div>

            <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
            <TickerSettingsModal
                isOpen={isTickerSettingsModalOpen}
                onClose={() => setIsTickerSettingsModalOpen(false)}
            />
            <DisplaySettingsModal
                isOpen={isDisplaySettingsModalOpen}
                onClose={() => setIsDisplaySettingsModalOpen(false)}
            />
        </div>
    );
};
