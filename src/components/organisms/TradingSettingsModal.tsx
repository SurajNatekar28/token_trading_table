import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface TradingSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type PresetType = 1 | 2 | 3;
type SettingsMode = 'buy' | 'sell';

export const TradingSettingsModal: React.FC<TradingSettingsModalProps> = ({ isOpen, onClose }) => {
    const [selectedPreset, setSelectedPreset] = useState<PresetType>(1);
    const [settingsMode, setSettingsMode] = useState<SettingsMode>('buy');
    const [slippage, setSlippage] = useState('20');
    const [priority, setPriority] = useState('0.001');
    const [bribe, setBribe] = useState('0.01');
    const [autoFee, setAutoFee] = useState(false);
    const [mevMode, setMevMode] = useState<'Off' | 'Reduced' | 'Secure'>('Off');
    const [rpc, setRpc] = useState('');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-[500px] bg-[#0a0b0d] border border-gray-800 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                    <h2 className="text-base font-medium text-white">Trading Settings</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Preset Tabs */}
                    <div className="flex gap-2 p-1 bg-[#111] rounded-lg border border-gray-800">
                        {[1, 2, 3].map((preset) => (
                            <button
                                key={preset}
                                onClick={() => setSelectedPreset(preset as PresetType)}
                                className={cn(
                                    "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                                    selectedPreset === preset
                                        ? "bg-[#1a1d24] text-blue-400 border border-blue-500/30"
                                        : "text-gray-500 hover:text-gray-300"
                                )}
                            >
                                PRESET {preset}
                            </button>
                        ))}
                    </div>

                    {/* Buy/Sell Toggle */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => setSettingsMode('buy')}
                            className={cn(
                                "py-3 rounded-lg text-sm font-medium transition-all border",
                                settingsMode === 'buy'
                                    ? "bg-green-900/20 text-green-400 border-green-500/30"
                                    : "bg-[#111] text-gray-500 border-gray-800 hover:text-gray-300"
                            )}
                        >
                            Buy Settings
                        </button>
                        <button
                            onClick={() => setSettingsMode('sell')}
                            className={cn(
                                "py-3 rounded-lg text-sm font-medium transition-all border",
                                settingsMode === 'sell'
                                    ? "bg-red-900/20 text-red-400 border-red-500/30"
                                    : "bg-[#111] text-gray-500 border-gray-800 hover:text-gray-300"
                            )}
                        >
                            Sell Settings
                        </button>
                    </div>

                    {/* Input Fields Grid */}
                    <div className="grid grid-cols-3 gap-3">
                        {/* Slippage */}
                        <div className="bg-[#111] border border-gray-800 rounded-lg p-3 flex flex-col items-center gap-2">
                            <div className="flex items-center gap-1 w-full justify-center">
                                <Input
                                    value={slippage}
                                    onChange={(e) => setSlippage(e.target.value)}
                                    className="w-16 h-8 bg-transparent border-none text-center text-white font-medium text-lg p-0 focus-visible:ring-0"
                                />
                                <span className="text-gray-500 text-sm">%</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-gray-500 uppercase font-medium">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                </svg>
                                <span>SLIPPAGE</span>
                            </div>
                        </div>

                        {/* Priority */}
                        <div className="bg-[#111] border border-gray-800 rounded-lg p-3 flex flex-col items-center gap-2">
                            <Input
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full h-8 bg-transparent border-none text-center text-white font-medium text-lg p-0 focus-visible:ring-0"
                            />
                            <div className="flex items-center gap-1 text-[10px] text-gray-500 uppercase font-medium">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                </svg>
                                <span>PRIORITY</span>
                            </div>
                        </div>

                        {/* Bribe */}
                        <div className="bg-[#111] border border-gray-800 rounded-lg p-3 flex flex-col items-center gap-2">
                            <Input
                                value={bribe}
                                onChange={(e) => setBribe(e.target.value)}
                                className="w-full h-8 bg-transparent border-none text-center text-white font-medium text-lg p-0 focus-visible:ring-0"
                            />
                            <div className="flex items-center gap-1 text-[10px] text-gray-500 uppercase font-medium">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="8" cy="8" r="6" />
                                    <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
                                    <path d="M7 6h1v4" />
                                </svg>
                                <span>BRIBE</span>
                            </div>
                        </div>
                    </div>

                    {/* Auto Fee */}
                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={autoFee}
                                onChange={(e) => setAutoFee(e.target.checked)}
                                className="w-4 h-4 rounded border-gray-700 bg-transparent text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
                            />
                            <span className="text-sm font-medium text-white">Auto Fee</span>
                        </label>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="uppercase text-xs font-medium">MAX FEE</span>
                            <span className="text-white font-medium">0.1</span>
                        </div>
                    </div>

                    {/* MEV Mode */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <span className="text-sm font-medium text-white">MEV Mode</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4" />
                                <path d="M12 8h.01" />
                            </svg>
                        </div>
                        <div className="flex bg-[#111] rounded-lg p-1 border border-gray-800 gap-1">
                            {(['Off', 'Reduced', 'Secure'] as const).map((mode) => (
                                <button
                                    key={mode}
                                    onClick={() => setMevMode(mode)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                                        mevMode === mode
                                            ? mode === 'Off'
                                                ? "bg-[#1a1d24] text-blue-400 border border-blue-500/30"
                                                : "bg-[#1a1d24] text-blue-400 border border-blue-500/30"
                                            : "text-gray-500 hover:text-gray-300"
                                    )}
                                >
                                    {mode === 'Off' && (
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline mr-1">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                                        </svg>
                                    )}
                                    {mode}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RPC Input */}
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">RPC</div>
                        <Input
                            value={rpc}
                            onChange={(e) => setRpc(e.target.value)}
                            placeholder="https://a...e.com"
                            className="bg-[#111] border-gray-800 pl-12 text-white placeholder:text-gray-600 focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:border-blue-500"
                        />
                    </div>

                    {/* Continue Button */}
                    <Button
                        onClick={onClose}
                        className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-bold h-11 rounded-full text-base"
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    );
};
