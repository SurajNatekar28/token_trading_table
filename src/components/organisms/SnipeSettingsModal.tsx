import React, { useState } from 'react';
import { X, Info, Wind, FileText, Coins, Shield, Zap, Ban } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SnipeSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * SnipeSettingsModal
 *
 * A modal for configuring sniping parameters such as slippage,
 * priority, bribe, MEV mode, and RPC endpoint.
 *
 * Behavior:
 * - Renders only when `isOpen` is true.
 * - Allows updating local state for all snipe settings.
 * - Closes when the user clicks the close button or presses Continue.
 * - Calls `onClose` to exit the modal.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible.
 * @param {() => void} props.onClose - Function to close the modal.
 *
 * @returns {JSX.Element | null}
 */


export const SnipeSettingsModal: React.FC<SnipeSettingsModalProps> = ({ isOpen, onClose }) => {
    const [mevMode, setMevMode] = useState<'Off' | 'Reduced' | 'Secure'>('Off');
    const [slippage, setSlippage] = useState('0');
    const [priority, setPriority] = useState('0');
    const [bribe, setBribe] = useState('0');
    const [rpc, setRpc] = useState('');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-[450px] bg-[#0a0b0d] border border-gray-800 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                    <h2 className="text-sm font-medium text-white">Snipe Settings</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Top Inputs Grid */}
                    <div className="grid grid-cols-3 gap-3">
                        {/* Slippage */}
                        <div className="bg-[#111] border border-gray-800 rounded-lg p-2 flex flex-col items-center gap-1">
                            <div className="flex items-center gap-1">
                                <Input
                                    value={slippage}
                                    onChange={(e) => setSlippage(e.target.value)}
                                    className="w-12 h-6 bg-transparent border-none text-center text-white font-medium p-0 focus-visible:ring-0"
                                />
                                <span className="text-gray-500 text-xs">%</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-gray-500 uppercase font-medium">
                                <Wind size={10} />
                                <span>Slippage</span>
                            </div>
                        </div>

                        {/* Priority */}
                        <div className="bg-[#111] border border-gray-800 rounded-lg p-2 flex flex-col items-center gap-1">
                            <Input
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full h-6 bg-transparent border-none text-center text-white font-medium p-0 focus-visible:ring-0"
                            />
                            <div className="flex items-center gap-1 text-[10px] text-gray-500 uppercase font-medium">
                                <FileText size={10} />
                                <span>Priority</span>
                            </div>
                        </div>

                        {/* Bribe */}
                        <div className="bg-[#111] border border-gray-800 rounded-lg p-2 flex flex-col items-center gap-1">
                            <Input
                                value={bribe}
                                onChange={(e) => setBribe(e.target.value)}
                                className="w-full h-6 bg-transparent border-none text-center text-white font-medium p-0 focus-visible:ring-0"
                            />
                            <div className="flex items-center gap-1 text-[10px] text-gray-500 uppercase font-medium">
                                <Coins size={10} />
                                <span>Bribe</span>
                            </div>
                        </div>
                    </div>

                    {/* MEV Mode */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <span className="text-sm font-medium text-white">MEV Mode</span>
                            <Info size={12} className="text-gray-500" />
                        </div>
                        <div className="flex bg-[#111] rounded-lg p-1 border border-gray-800">
                            <button
                                onClick={() => setMevMode('Off')}
                                className={cn(
                                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                                    mevMode === 'Off'
                                        ? "bg-[#1a1d24] text-blue-400 border border-blue-500/30"
                                        : "text-gray-500 hover:text-gray-300"
                                )}
                            >
                                <Ban size={12} />
                                Off
                            </button>
                            <button
                                onClick={() => setMevMode('Reduced')}
                                className={cn(
                                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                                    mevMode === 'Reduced'
                                        ? "bg-[#1a1d24] text-blue-400 border border-blue-500/30"
                                        : "text-gray-500 hover:text-gray-300"
                                )}
                            >
                                <Shield size={12} />
                                Reduced
                            </button>
                            <button
                                onClick={() => setMevMode('Secure')}
                                className={cn(
                                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
                                    mevMode === 'Secure'
                                        ? "bg-[#1a1d24] text-blue-400 border border-blue-500/30"
                                        : "text-gray-500 hover:text-gray-300"
                                )}
                            >
                                <Shield size={12} className="fill-current" />
                                Secure
                            </button>
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
                        className="w-full bg-[#5e87ff] hover:bg-blue-600 text-white font-bold h-10 rounded-full"
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    );
};
