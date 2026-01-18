'use client'

import React, { useState } from 'react';
import { Server, RotateCw, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Region {
    id: string;
    name: string;
    latency: number;
    color: 'text-orange-400' | 'text-yellow-400' | 'text-red-400' | 'text-green-400';
}

const regions: Region[] = [
    { id: 'us-w', name: 'US-W', latency: 142, color: 'text-orange-400' },
    { id: 'us-c', name: 'US-C', latency: 142, color: 'text-orange-400' },
    { id: 'us-e', name: 'US-E', latency: 115, color: 'text-orange-400' },
    { id: 'eu-w', name: 'EU-W', latency: 91, color: 'text-yellow-400' },
    { id: 'eu-c', name: 'EU-C', latency: 101, color: 'text-orange-400' },
    { id: 'eu-e', name: 'EU-E', latency: 91, color: 'text-yellow-400' },
    { id: 'asia', name: 'ASIA', latency: 57, color: 'text-yellow-400' },
    { id: 'asia-v2', name: 'ASIA-V2', latency: 53, color: 'text-yellow-400' },
    { id: 'aus', name: 'AUS', latency: 99, color: 'text-yellow-400' },
    { id: 'global', name: 'GLOBAL', latency: 150, color: 'text-red-400' },
];

export const RegionsPopover: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState<string>('global');

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <button
                    className={cn(
                        "flex items-center gap-1 hover:text-white transition-colors outline-none",
                        isOpen ? "text-white" : "text-gray-400"
                    )}
                >
                    <span className="font-bold text-[11px]">{regions.find(r => r.id === selectedRegion)?.name || 'GLOBAL'}</span>
                    <ChevronDown size={10} className={cn("transition-transform duration-200", isOpen && "rotate-180")} />
                </button>
            </PopoverTrigger>
            <PopoverContent
                side="top"
                align="end"
                className="w-[200px] p-0 bg-[#0a0b0d] border border-border/20 rounded-lg shadow-xl overflow-hidden"
            >
                {/* Header */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-border/10 bg-[#111]/50">
                    <span className="text-xs font-medium text-gray-400">Regions</span>
                    <button className="text-gray-500 hover:text-white transition-colors">
                        <RotateCw size={12} />
                    </button>
                </div>

                {/* Regions List */}
                <div className="py-1">
                    {regions.map((region) => (
                        <button
                            key={region.id}
                            onClick={() => {
                                setSelectedRegion(region.id);
                                setIsOpen(false);
                            }}
                            className={cn(
                                "w-full flex items-center justify-between px-3 py-2 text-[11px] font-medium transition-colors relative group",
                                selectedRegion === region.id
                                    ? "bg-[#1a1a2e] text-white"
                                    : "text-gray-400 hover:bg-[#111] hover:text-gray-200"
                            )}
                        >
                            {/* Active Indicator Line */}
                            {selectedRegion === region.id && (
                                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-red-500 rounded-r-sm" />
                            )}

                            <div className="flex items-center gap-2.5 ml-1">
                                <Server size={12} className={selectedRegion === region.id ? "text-red-400" : "text-yellow-600"} />
                                <span>{region.name}</span>
                            </div>
                            <span className={region.color}>{region.latency}ms</span>
                        </button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
};
