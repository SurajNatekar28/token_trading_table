import React, { useState } from 'react';
import { X, Info, RotateCcw, Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface HotkeysModalProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * HotkeysModal Component
 *
 * Displays a modal for configuring hotkey settings such as enabling hotkeys,
 * pause-on-hover behavior, and selecting modifier keys.
 *
 * @param {boolean} isOpen - Controls whether the modal is visible.
 * @param {() => void} onClose - Callback to close the modal.
 *
 * @returns {JSX.Element | null}
 */

export const HotkeysModal: React.FC<HotkeysModalProps> = ({ isOpen, onClose }) => {
    const [hotkeysEnabled, setHotkeysEnabled] = useState(true);
    const [pauseOnHover, setPauseOnHover] = useState(true);

    // Mock state for modifiers
    const [modifiers, setModifiers] = useState({
        newPairs: 'Shift',
        finalStretch: 'Ctrl',
        migrated: 'Alt'
    });

    if (!isOpen) return null;

    const modifierOptions = ['Shift', 'Ctrl', 'Alt', 'Win'];

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-[500px] bg-[#0a0b0d] border border-gray-800 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 shrink-0">
                    <h2 className="text-sm font-medium text-white">Pulse Hotkeys</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="p-4 space-y-6 overflow-y-auto custom-scrollbar">
                    {/* Toggles */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <div className="text-sm font-medium text-white">Hotkeys</div>
                                <div className="text-xs text-gray-500">Quick buy tokens with custom hotkeys</div>
                            </div>
                            <Switch
                                checked={hotkeysEnabled}
                                onCheckedChange={setHotkeysEnabled}
                                className="data-[state=checked]:bg-blue-600"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-sm font-medium text-white">Pause live feed on Hover</div>
                            <Switch
                                checked={pauseOnHover}
                                onCheckedChange={setPauseOnHover}
                                className="data-[state=checked]:bg-blue-600"
                            />
                        </div>
                    </div>

                    {/* Info Banner */}
                    <div className="flex items-center gap-2 px-3 py-2 bg-[#111] rounded border border-gray-800/50">
                        <Info size={14} className="text-gray-500" />
                        <span className="text-xs text-gray-400">Combine the Pause + Modifier + Row keys to buy tokens</span>
                    </div>

                    {/* Pause Key */}
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-gray-300">Pause Key</span>
                        <div className="px-3 py-1.5 bg-[#111] border border-gray-800 rounded text-xs font-medium text-white min-w-[60px] text-center">
                            Space
                        </div>
                    </div>

                    {/* Table Modifier Keys */}
                    <div className="space-y-3 pt-2 border-t border-gray-800/50">
                        <h3 className="text-xs font-medium text-white">Table Modifier Keys</h3>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">New Pairs</span>
                                <div className="flex gap-1">
                                    {modifierOptions.map(mod => (
                                        <button
                                            key={`new-${mod}`}
                                            onClick={() => setModifiers({ ...modifiers, newPairs: mod })}
                                            className={cn(
                                                "px-2 py-1 rounded text-[10px] font-medium border transition-colors min-w-[40px]",
                                                modifiers.newPairs === mod
                                                    ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                                                    : "bg-[#111] border-gray-800 text-gray-500 hover:border-gray-700"
                                            )}
                                        >
                                            {mod}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">Final Stretch</span>
                                <div className="flex gap-1">
                                    {modifierOptions.map(mod => (
                                        <button
                                            key={`final-${mod}`}
                                            onClick={() => setModifiers({ ...modifiers, finalStretch: mod })}
                                            className={cn(
                                                "px-2 py-1 rounded text-[10px] font-medium border transition-colors min-w-10",
                                                modifiers.finalStretch === mod
                                                    ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                                                    : "bg-[#111] border-gray-800 text-gray-500 hover:border-gray-700"
                                            )}
                                        >
                                            {mod}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">Migrated</span>
                                <div className="flex gap-1">
                                    {modifierOptions.map(mod => (
                                        <button
                                            key={`migrated-${mod}`}
                                            onClick={() => setModifiers({ ...modifiers, migrated: mod })}
                                            className={cn(
                                                "px-2 py-1 rounded text-[10px] font-medium border transition-colors min-w-10",
                                                modifiers.migrated === mod
                                                    ? "bg-blue-500/20 border-blue-500/50 text-blue-400"
                                                    : "bg-[#111] border-gray-800 text-gray-500 hover:border-gray-700"
                                            )}
                                        >
                                            {mod}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row Keys */}
                    <div className="space-y-3 pt-2 border-t border-gray-800/50">
                        <h3 className="text-xs font-medium text-white">Row Keys</h3>
                        <div className="space-y-2">
                            {[1, 2, 3].map((row) => (
                                <div key={row} className="flex items-center justify-between">
                                    <span className="text-xs text-gray-400">Row {row}</span>
                                    <Input
                                        value={row.toString()}
                                        className="w-16 h-7 bg-[#111] border-gray-800 text-center text-xs font-medium text-white focus-visible:ring-1 focus-visible:ring-blue-500"
                                        readOnly
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-800 bg-[#0a0b0d] shrink-0 flex items-center justify-between">
                    <button className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors">
                        <RotateCcw size={12} />
                        <span>Reset</span>
                    </button>
                    <Button
                        onClick={onClose}
                        className="bg-[#5e87ff] hover:bg-blue-600 text-white font-medium px-6 h-8 text-xs rounded-full"
                    >
                        Done
                    </Button>
                </div>
            </div>
        </div>
    );
};
