import React from 'react';
import { X, Check, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RecommendedSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: () => void;
}

export const RecommendedSettingsModal: React.FC<RecommendedSettingsModalProps> = ({
    isOpen,
    onClose,
    onApply
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
            <div className="w-[600px] bg-[#0F1114] border border-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">

                {/* Preview Image Area */}
                <div className="bg-[#5D7EF7] h-[240px] relative flex items-center justify-center p-8">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors cursor-pointer"
                    >
                        <X size={20} />
                    </button>

                    {/* Mock UI Preview - Recreated with CSS/HTML to look like the screenshot */}
                    <div className="w-full max-w-md bg-[#13141b] rounded-lg shadow-2xl border border-gray-700/50 overflow-hidden">
                        <div className="h-8 border-b border-gray-800 flex items-center justify-between px-3 bg-[#1a1b23]">
                            <div className="text-[10px] text-gray-400 font-medium">Filters</div>
                            <X size={10} className="text-gray-500" />
                        </div>
                        <div className="p-4 space-y-3">
                            <div className="flex items-center gap-4 text-[10px] text-gray-400 border-b border-gray-800 pb-2">
                                <span className="text-white font-bold border-b-2 border-blue-500 pb-2 -mb-2.5">New Pairs <span className="bg-blue-500/20 text-blue-400 px-1 rounded text-[9px]">2</span></span>
                                <span>Final Stretch <span className="bg-blue-900/20 text-blue-800 px-1 rounded text-[9px]">4</span></span>
                                <span>Migrated <span className="bg-blue-900/20 text-blue-800 px-1 rounded text-[9px]">4</span></span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-[10px] text-gray-500">
                                    <span>Protocols</span>
                                    <span className="text-xs underline">Select All</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <div className="h-5 px-2 rounded-full bg-[#14F195]/10 border border-[#14F195]/20 flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#14F195]"></div>
                                        <span className="text-[9px] text-[#14F195]">Pump</span>
                                    </div>
                                    <div className="h-5 px-2 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                                        <span className="text-[9px] text-orange-500">Bonk</span>
                                    </div>
                                    <div className="h-5 px-2 rounded-full bg-green-500/10 border border-green-500/20 flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                        <span className="text-[9px] text-green-500">Sage</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="p-6 space-y-6">
                    <p className="text-sm text-gray-400 leading-relaxed">
                        Apply our recommended Pulse filters and Display Settings to help you get started.
                        These hide risky tokens and show only what you need to get started.
                    </p>

                    <div className="space-y-3 bg-[#16181D] p-4 rounded-lg border border-gray-800/50">
                        <h3 className="text-sm font-medium text-white mb-2">Recommended Settings</h3>

                        <div className="flex items-start gap-3">
                            <CheckCircle2 size={16} className="text-blue-500 mt-0.5 shrink-0" />
                            <span className="text-xs text-gray-300">Focus on popular launch platforms (Pump, Bonk, etc.)</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle2 size={16} className="text-blue-500 mt-0.5 shrink-0" />
                            <span className="text-xs text-gray-300">Filter out new tokens with a low market cap</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <CheckCircle2 size={16} className="text-blue-500 mt-0.5 shrink-0" />
                            <span className="text-xs text-gray-300">Optimized display to show essential info on Pulse</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <Button
                            variant="ghost"
                            onClick={onClose}
                            className="text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={onApply}
                            className="bg-[#5D7EF7] hover:bg-[#4B6FE0] text-white px-6 rounded-full font-medium cursor-pointer"
                        >
                            Apply Settings
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
