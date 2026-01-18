'use client'

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NotificationsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose }) => {
    const [displayNotifications, setDisplayNotifications] = useState(true);
    const [toastPosition, setToastPosition] = useState<ToastPosition>('top-center');
    const [transactionSounds, setTransactionSounds] = useState(false);

    if (!isOpen) return null;

    const renderPositionBox = (position: ToastPosition, label: string) => {
        const isSelected = toastPosition === position;
        return (
            <div className="flex flex-col items-center gap-2">
                <button
                    onClick={() => setToastPosition(position)}
                    className={cn(
                        "w-[100px] h-[60px] rounded-lg border flex items-center justify-center transition-all relative overflow-hidden bg-[#0F1114]",
                        isSelected
                            ? "border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]"
                            : "border-gray-800 hover:border-gray-700"
                    )}
                >
                    {/* Visual representation of the toast position */}
                    <div className={cn(
                        "absolute w-8 h-2 rounded-sm bg-gray-700/50",
                        position.includes('top') ? "top-2" : "bottom-2",
                        position.includes('left') ? "left-2" :
                            position.includes('right') ? "right-2" : "left-1/2 -translate-x-1/2"
                    )}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 absolute top-1/2 -translate-y-1/2 left-1 shadow-[0_0_5px_rgba(34,211,238,0.8)]" />}
                    </div>
                </button>
                <span className="text-[10px] text-gray-500 font-medium">{label}</span>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-100 flex items-end justify-center sm:items-center pointer-events-none">
            {/* Backdrop for mobile, transparent for desktop to mimic popover feel if desired, 
                 but usually modals have a backdrop. User screenshot looks like a modal. 
                 We'll use a fixed position relative to the footer or just centered for now as requested "models".
                 The screenshot shows it floating. Let's center it for standard modal behavior or position it near footer if requested.
                 Given "Notification Settings", centering is safe.
             */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto" onClick={onClose} />

            <div className="pointer-events-auto w-[380px] bg-[#0F1114] border border-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 relative z-[101] mb-20 sm:mb-0">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800/50">
                    <h2 className="text-white font-semibold text-[15px]">Notification Settings</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                        <X size={16} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-5 space-y-6">
                    {/* Display Notifications */}
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h3 className="text-gray-300 text-sm font-medium">Display notifications</h3>
                            <p className="text-gray-500 text-xs">Display wallet tracker toasts, and notification cards</p>
                        </div>
                        <Switch
                            checked={displayNotifications}
                            onCheckedChange={setDisplayNotifications}
                            className="data-[state=checked]:bg-cyan-400"
                        />
                    </div>

                    {/* Toast Position */}
                    <div className="space-y-3">
                        <h3 className="text-gray-400 text-sm font-medium">Toast Position</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {renderPositionBox('top-left', 'Top Left')}
                            {renderPositionBox('top-center', 'Top Center')}
                            {renderPositionBox('top-right', 'Top Right')}
                            {renderPositionBox('bottom-left', 'Bottom Left')}
                            {renderPositionBox('bottom-center', 'Bottom Center')}
                            {renderPositionBox('bottom-right', 'Bottom Right')}
                        </div>
                    </div>

                    {/* Transaction Sounds */}
                    <div className="flex items-center justify-between pt-2">
                        <h3 className="text-gray-300 text-sm font-medium">Transaction Sounds</h3>
                        <Switch
                            checked={transactionSounds}
                            onCheckedChange={setTransactionSounds}
                            className="data-[state=checked]:bg-cyan-400"
                        />
                    </div>

                    {/* Done Button */}
                    <Button
                        className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-bold rounded-full h-10 mt-2"
                        onClick={onClose}
                    >
                        Done
                    </Button>
                </div>
            </div>
        </div>
    );
};
