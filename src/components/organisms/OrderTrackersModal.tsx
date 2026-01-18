'use client'

import React from 'react';
import { X, Wallet, Twitter, Globe, Activity, BarChart3, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { setActiveTracker, setDisplayMode, resetTrackers, type TrackerType, type DisplayMode } from '@/lib/features/trackerSlice';

interface OrderTrackersModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const trackerConfig = [
    { id: 'wallet' as TrackerType, label: 'Wallet Tracker', icon: Wallet },
    { id: 'twitter' as TrackerType, label: 'Twitter Tracker', icon: Twitter },
    { id: 'discover' as TrackerType, label: 'Discover Tracker', icon: Globe },
    { id: 'pulse' as TrackerType, label: 'Pulse Tracker', icon: Activity },
    { id: 'pnl' as TrackerType, label: 'PnL Tracker', icon: BarChart3 },
];

/**
 * OrderTrackersModal
 *
 * A modal used to configure and manage order-tracking views.  
 * Provides UI for selecting the active tracker type, switching
 * between display modes (full / compact / icon), and resetting
 * tracker state.
 *
 * Behavior:
 * - Opens only when `isOpen` is true (otherwise returns null).
 * - Clicking outside the modal closes it.
 * - Uses Redux to update:
 *    • active tracker (`setActiveTracker`)
 *    • display mode (`setDisplayMode`)
 *    • reset all trackers (`resetTrackers`)
 * - Calls `onClose` when the user finishes configuration.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls modal visibility.
 * @param {() => void} props.onClose - Callback to close the modal.
 *
 * @returns {JSX.Element | null}
 */

export const OrderTrackersModal: React.FC<OrderTrackersModalProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const activeTracker = useAppSelector((state) => state.tracker.activeTracker);
    const displayMode = useAppSelector((state) => state.tracker.displayMode);

    if (!isOpen) return null;

    const handleTrackerSelect = (trackerId: TrackerType) => {
        console.log('🎯 Tracker selected:', trackerId);
        dispatch(setActiveTracker(trackerId));
    };

    const handleDisplayModeChange = (mode: DisplayMode) => {
        console.log('🔧 Display mode changed to:', mode);
        dispatch(setDisplayMode(mode));
    };

    const handleReset = () => {
        dispatch(resetTrackers());
    };

    const handleDone = () => {
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={(e) => {
            if (e.target === e.currentTarget) {
                onClose();
            }
        }}>
            <div className="bg-[#0a0a0a] border border-border/40 rounded-lg w-[600px] max-w-[90vw] shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border/20">
                    <h2 className="text-base font-semibold text-white">Order Trackers</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Tracker Tabs */}
                <div className="flex items-center justify-center gap-4 px-4 pt-4 pb-3 border-b border-border/10">
                    {trackerConfig.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            type="button"
                            onClick={() => handleTrackerSelect(id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-all relative cursor-pointer ${activeTracker === id
                                ? 'text-white'
                                : 'text-gray-400 hover:text-gray-300'
                                }`}
                        >
                            <Icon size={12} />
                            <span>{label.replace(' Tracker', '')}</span>
                            {/* Pink notification dot */}
                            <div className="absolute -top-0.5 -right-0.5 h-1.5 w-1.5 rounded-full bg-pink-500" />
                        </button>
                    ))}
                </div>

                {/* Display Mode Options */}
                <div className="p-4">
                    <div className="grid grid-cols-3 gap-3">
                        {/* Full Mode */}
                        <button
                            type="button"
                            onClick={() => handleDisplayModeChange('full')}
                            className={`relative group cursor-pointer transition-all rounded-lg p-3 ${displayMode === 'full'
                                ? 'bg-[#1a1a2e] border-2 border-blue-500'
                                : 'bg-[#0f0f0f] border border-border/20 hover:border-border/40'
                                }`}
                        >
                            <div className="flex flex-col items-center justify-center h-24">
                                <div className="flex flex-col items-center gap-1.5 text-gray-300 text-[9px]">
                                    {trackerConfig.slice(0, 3).map(({ id, icon: Icon, label }) => (
                                        <div key={id} className="flex items-center gap-1">
                                            <Icon size={10} />
                                            <span>{label}</span>
                                            <div className="h-1 w-1 rounded-full bg-pink-500" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-2 text-center">
                                <span className={`text-xs font-medium ${displayMode === 'full' ? 'text-white' : 'text-gray-400'}`}>
                                    Full
                                </span>
                            </div>
                        </button>

                        {/* Compact Mode */}
                        <button
                            type="button"
                            onClick={() => handleDisplayModeChange('compact')}
                            className={`relative group cursor-pointer transition-all rounded-lg p-3 ${displayMode === 'compact'
                                ? 'bg-[#1a1a2e] border-2 border-blue-500'
                                : 'bg-[#0f0f0f] border border-border/20 hover:border-border/40'
                                }`}
                        >
                            <div className="flex flex-col items-center justify-center h-24">
                                <div className="flex flex-col items-center gap-1.5 text-gray-300 text-[9px]">
                                    {trackerConfig.slice(0, 3).map(({ id, icon: Icon, label }) => (
                                        <div key={id} className="flex items-center gap-1">
                                            <Icon size={10} />
                                            <span>{label.replace(' Tracker', '')}</span>
                                            <div className="h-1 w-1 rounded-full bg-pink-500" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-2 text-center">
                                <span className={`text-xs font-medium ${displayMode === 'compact' ? 'text-white' : 'text-gray-400'}`}>
                                    Compact
                                </span>
                            </div>
                        </button>

                        {/* Icon Mode */}
                        <button
                            type="button"
                            onClick={() => handleDisplayModeChange('icon')}
                            className={`relative group cursor-pointer transition-all rounded-lg p-3 ${displayMode === 'icon'
                                ? 'bg-[#1a1a2e] border-2 border-blue-500'
                                : 'bg-[#0f0f0f] border border-border/20 hover:border-border/40'
                                }`}
                        >
                            <div className="flex flex-col items-center justify-center h-24">
                                <div className="flex items-center gap-2 text-gray-300">
                                    {trackerConfig.slice(0, 5).map(({ id, icon: Icon }) => (
                                        <div key={id} className="relative">
                                            <Icon size={12} />
                                            <div className="absolute -top-0.5 -right-0.5 h-1 w-1 rounded-full bg-pink-500" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-2 text-center">
                                <span className={`text-xs font-medium ${displayMode === 'icon' ? 'text-white' : 'text-gray-400'}`}>
                                    Icon
                                </span>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-4 border-t border-border/20">
                    <Button
                        variant="ghost"
                        onClick={handleReset}
                        className="text-gray-400 hover:text-white flex items-center gap-2"
                    >
                        <RotateCcw size={14} />
                    </Button>
                    <Button
                        onClick={handleDone}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-1.5 rounded-md font-medium text-sm flex-1 ml-4"
                    >
                        Done
                    </Button>
                </div>
            </div>
        </div>
    );
};
