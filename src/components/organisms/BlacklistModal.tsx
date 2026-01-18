import React, { useState } from 'react';
import { X, Info, Upload, Download, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface BlacklistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const BlacklistModal: React.FC<BlacklistModalProps> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<'All' | 'Dev' | 'CA' | 'Keyword' | 'Website' | 'Twitter'>('All');
    const [inputValue, setInputValue] = useState('');

    if (!isOpen) return null;

    const tabs = ['All', 'Dev', 'CA', 'Keyword', 'Website', 'Twitter'] as const;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-[600px] bg-[#0a0b0d] border border-gray-800 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                    <h2 className="text-sm font-medium text-white">Blacklist</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="p-4 space-y-4">
                    {/* Input Section */}
                    <div className="flex gap-2">
                        <Input
                            placeholder="Enter twitter profile, dev address or keyword"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="bg-[#111] border-gray-800 text-sm text-white placeholder:text-gray-600 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500"
                        />
                        <Button className="bg-[#5e87ff] hover:bg-blue-600 text-white font-medium px-6">
                            Blacklist
                        </Button>
                    </div>

                    {/* Info Banner */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#111] rounded border border-gray-800/50">
                        <Info size={14} className="text-gray-500" />
                        <span className="text-xs text-gray-400">Blacklist all types of metrics!</span>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-1 border-b border-gray-800">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "px-4 py-2 text-xs font-medium transition-colors relative",
                                    activeTab === tab
                                        ? "text-white bg-[#1a1d24] rounded-t-md"
                                        : "text-gray-500 hover:text-gray-300"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Content Area (Empty State) */}
                    <div className="h-[300px] bg-[#050607] rounded-b-md border-x border-b border-gray-800/50 flex items-center justify-center">
                        {/* Empty state content would go here */}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-gray-500 font-medium">0 / 1000 blacklists</span>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="destructive"
                                size="sm"
                                className="h-8 bg-pink-600 hover:bg-pink-700 text-white text-xs font-bold px-4 rounded-full"
                            >
                                Delete All
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="h-8 bg-[#1a1d24] hover:bg-[#252932] text-gray-300 hover:text-white text-xs font-medium px-4 rounded-full border border-gray-800"
                            >
                                Import
                            </Button>
                            <Button
                                variant="secondary"
                                size="sm"
                                className="h-8 bg-[#1a1d24] hover:bg-[#252932] text-gray-300 hover:text-white text-xs font-medium px-4 rounded-full border border-gray-800"
                            >
                                Export
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
