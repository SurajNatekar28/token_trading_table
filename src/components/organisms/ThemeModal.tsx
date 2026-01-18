'use client'

import React, { useState } from 'react';
import { X, RotateCw, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface ThemeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type ThemeId = 'dark' | 'light' | 'dusk' | 'astro' | 'neo' | 'crimson' | 'stealth-blue' | 'orange' | 'custom';

interface ThemeOption {
    id: ThemeId;
    label: string;
    colors: {
        bg: string;
        card: string;
        accent: string;
        text: string;
    };
}

const themes: ThemeOption[] = [
    { id: 'dark', label: 'Dark', colors: { bg: '#0F1114', card: '#1A1D21', accent: '#3B82F6', text: '#FFFFFF' } },
    { id: 'light', label: 'Light', colors: { bg: '#FFFFFF', card: '#F3F4F6', accent: '#3B82F6', text: '#000000' } },
    { id: 'dusk', label: 'Dusk', colors: { bg: '#1E1E2E', card: '#252538', accent: '#3B82F6', text: '#CDD6F4' } },
    { id: 'astro', label: 'Astro', colors: { bg: '#13111C', card: '#1C1929', accent: '#7C3AED', text: '#E2E8F0' } },
    { id: 'neo', label: 'Neo', colors: { bg: '#0D1F18', card: '#132B22', accent: '#10B981', text: '#E2E8F0' } },
    { id: 'crimson', label: 'Crimson', colors: { bg: '#1F0D0D', card: '#2B1313', accent: '#EF4444', text: '#E2E8F0' } },
    { id: 'stealth-blue', label: 'Stealth Blue', colors: { bg: '#0B1120', card: '#0F172A', accent: '#06B6D4', text: '#E2E8F0' } },
    { id: 'orange', label: 'Orange', colors: { bg: '#1F1205', card: '#2B1A08', accent: '#F97316', text: '#E2E8F0' } },
    { id: 'custom', label: 'Custom', colors: { bg: '#0F1114', card: '#1A1D21', accent: '#3B82F6', text: '#FFFFFF' } },
];

export const ThemeModal: React.FC<ThemeModalProps> = ({ isOpen, onClose }) => {
    const [selectedTheme, setSelectedTheme] = useState<ThemeId>('stealth-blue');
    const [primaryColor, setPrimaryColor] = useState('00EOFF');
    const [customFont, setCustomFont] = useState('');

    if (!isOpen) return null;

    const renderThemeBox = (theme: ThemeOption) => {
        const isSelected = selectedTheme === theme.id;
        return (
            <div className="flex flex-col items-center gap-2" key={theme.id}>
                <button
                    onClick={() => setSelectedTheme(theme.id)}
                    className={cn(
                        "w-full aspect-[1.6/1] rounded-lg overflow-hidden relative transition-all",
                        isSelected
                            ? "ring-2 ring-cyan-400"
                            : "hover:ring-1 hover:ring-gray-600"
                    )}
                    style={{ backgroundColor: theme.colors.bg }}
                >
                    {/* Mock UI representation */}
                    <div className="absolute top-0 left-0 right-0 h-full p-2 flex flex-col gap-1">
                        {/* Sidebar / Header area */}
                        <div className="w-1/4 h-full absolute left-0 top-0 bottom-0 opacity-20" style={{ backgroundColor: theme.colors.accent }} />
                        <div className="w-full h-1/3 absolute top-0 left-0 right-0 opacity-10 bg-white" />

                        {/* Content area mock */}
                        <div className="absolute right-2 top-1/2 flex gap-1">
                            <div className="w-4 h-1.5 rounded-full opacity-40 bg-gray-400" />
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.colors.accent }} />
                        </div>
                    </div>
                </button>
                <span className="text-[11px] text-gray-400 font-medium">{theme.label}</span>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto" onClick={onClose} />

            <div className="pointer-events-auto w-[450px] bg-[#0F1114] border border-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200 relative z-[101]">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800/50">
                    <h2 className="text-white font-semibold text-[15px]">Customize Theme</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                        <X size={16} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-5 space-y-6 max-h-[80vh] overflow-y-auto custom-scrollbar">
                    {/* Theme Grid */}
                    <div className="grid grid-cols-3 gap-4">
                        {themes.map(renderThemeBox)}
                    </div>

                    {/* Primary Color */}
                    <div className="space-y-2">
                        <h3 className="text-gray-200 text-sm font-medium">Primary Color</h3>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.5)]" />
                            <Input
                                value={primaryColor}
                                onChange={(e) => setPrimaryColor(e.target.value)}
                                className="pl-10 bg-[#0a0b0d] border-gray-800 text-white h-10 font-mono text-sm"
                            />
                            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                                <RotateCw size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Custom Font */}
                    <div className="space-y-2">
                        <h3 className="text-gray-200 text-sm font-medium">Custom Font</h3>
                        <Input
                            value={customFont}
                            onChange={(e) => setCustomFont(e.target.value)}
                            placeholder="Enter Google Fonts URL or custom font URL"
                            className="bg-[#0a0b0d] border-gray-800 text-white h-10 text-sm placeholder:text-gray-600"
                        />
                        <p className="text-[10px] text-gray-500">Try Google Fonts: https://fonts.google.com/</p>
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex items-center justify-between pt-2">
                        <div className="flex gap-2">
                            <Button variant="secondary" className="bg-[#1A1D21] hover:bg-[#252930] text-white border border-gray-800 h-9 text-xs font-medium rounded-full px-4">
                                Export
                            </Button>
                            <Button variant="secondary" className="bg-[#1A1D21] hover:bg-[#252930] text-white border border-gray-800 h-9 text-xs font-medium rounded-full px-4">
                                Import
                            </Button>
                        </div>
                        <Button
                            className="bg-cyan-400 hover:bg-cyan-500 text-black font-bold rounded-full h-9 px-6"
                            onClick={onClose}
                        >
                            Done
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
