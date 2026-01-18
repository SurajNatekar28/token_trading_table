import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface AlertsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AlertsModal: React.FC<AlertsModalProps> = ({ isOpen, onClose }) => {
    const [soundAlertsEnabled, setSoundAlertsEnabled] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-[400px] bg-[#0a0b0d] border border-gray-800 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                    <h2 className="text-sm font-medium text-white">Alerts</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Sound Alerts Toggle */}
                    <div className="space-y-1">
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-white">Sound Alerts</div>
                            <Switch
                                checked={soundAlertsEnabled}
                                onCheckedChange={setSoundAlertsEnabled}
                                className="data-[state=checked]:bg-blue-600"
                            />
                        </div>
                        <p className="text-xs text-gray-500">Play sound alerts for Tokens in Pulse</p>
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
