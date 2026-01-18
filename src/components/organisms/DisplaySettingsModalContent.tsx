'use client';

import React, { useState } from 'react';
import {
  X, Zap, Search, Eye, EyeOff, Circle, Layout, BarChart2,
  Rows, MoreHorizontal, Sun, RefreshCw, Square, ArrowRight,
  ExternalLink, Rainbow
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAppSelector, useAppDispatch } from '@/lib/store';

import {
  setQuickBuySize,
  setMetricsSize,
  toggleShowSearchBar,
  toggleNoDecimals,
  toggleShowHiddenTokens,
  toggleUnhideOnMigrated,
  toggleCircleImages,
  toggleProgressBar,
  toggleColorRow,
  setTableLayout,
  setQuickBuyBehavior,
  QuickBuySize,
  MetricsSize,
  QuickBuyBehavior
} from '@/lib/features/settingsSlice';

interface ContentProps {
  onClose: () => void;
}

const DisplaySettingsModalContent: React.FC<ContentProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'layout' | 'metrics' | 'row' | 'extras'>('layout');

  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settings);

  const tabs = [
    { id: 'layout', label: 'Layout' },
    { id: 'metrics', label: 'Metrics' },
    { id: 'row', label: 'Row' },
    { id: 'extras', label: 'Extras' }
  ] as const;

  const protocolColors = [
    { name: 'Pump', color: 'text-green-400', icon: '💊' },
    { name: 'Mayhem', color: 'text-red-400', icon: '🧨' },
    { name: 'Believe', color: 'text-green-500', icon: '♻️' },
    { name: 'Moonit', color: 'text-yellow-400', icon: '🚀' },
    { name: 'Bonk', color: 'text-orange-400', icon: '🔥' },
    { name: 'Jupiter Studio', color: 'text-orange-300', icon: '🪐' },
    { name: 'LaunchLab', color: 'text-blue-400', icon: '⬡' },
    { name: 'Boop', color: 'text-blue-300', icon: '🐱' },
    { name: 'Moonshot App', color: 'text-pink-400', icon: '🌑' },
    { name: 'Heaven', color: 'text-white', icon: '😇' },
    { name: 'Daos.fun', color: 'text-blue-500', icon: '🔵' },
    { name: 'Candle', color: 'text-orange-500', icon: '🕯️' }
  ];

  return (
    <div className="fixed inset-0 z-100 flex items-start justify-end p-4 pt-16 pointer-events-none">
      <div className="w-[340px] bg-[#0a0b0d] border border-gray-800 rounded-xl shadow-2xl overflow-hidden pointer-events-auto animate-in slide-in-from-right-5 duration-200">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <h2 className="text-sm font-medium text-white">Display</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="p-4 space-y-6">

          {/* Metrics Preview */}
          <div className="space-y-2">
            <label className="text-xs text-gray-400 font-medium">Metrics</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => dispatch(setMetricsSize('small'))}
                className={cn("flex flex-col items-center justify-center py-2 rounded border transition-all",
                  settings.metricsSize === 'small'
                    ? "bg-[#1a1d24] border-blue-500/50"
                    : "bg-[#111] border-gray-800 hover:border-gray-700"
                )}
              >
                <div className="text-[10px] text-gray-400">MC 77K</div>
                <div className={cn("text-xs font-medium",
                  settings.metricsSize === 'small' ? "text-blue-400" : "text-gray-500"
                )}>Small</div>
              </button>

              <button
                onClick={() => dispatch(setMetricsSize('large'))}
                className={cn("flex flex-col items-center justify-center py-2 rounded border transition-all",
                  settings.metricsSize === 'large'
                    ? "bg-[#1a1d24] border-blue-500/50"
                    : "bg-[#111] border-gray-800 hover:border-gray-700"
                )}
              >
                <div className="text-[12px] text-white font-bold">MC 77K</div>
                <div className={cn("text-xs font-medium",
                  settings.metricsSize === 'large' ? "text-blue-400" : "text-gray-500"
                )}>Large</div>
              </button>
            </div>
          </div>

          {/* Quick Buy Size */}
          <div className="space-y-2">
            <label className="text-xs text-gray-400 font-medium">Quick Buy</label>
            <div className="grid grid-cols-4 gap-2">
              {(['small', 'large', 'mega', 'ultra'] as QuickBuySize[]).map((size) => (
                <button
                  key={size}
                  onClick={() => dispatch(setQuickBuySize(size))}
                  className={cn("flex flex-col items-center justify-center py-2 rounded border transition-all",
                    settings.quickBuySize === size
                      ? "bg-[#1a1d24] border-blue-500/50"
                      : "bg-[#111] border-gray-800 hover:border-gray-700"
                  )}
                >
                  <div className={cn(
                    "flex items-center justify-center bg-blue-600 rounded mb-1.5 shadow-[0_0_10px_rgba(37,99,235,0.5)]",
                    size === 'small' ? "w-6 h-3" :
                    size === 'large' ? "w-8 h-4" :
                    size === 'mega' ? "w-10 h-5" : "w-12 h-6"
                  )}>
                    <Zap size={8} className="text-white" />
                    <span className="text-[6px] ml-0.5 text-white font-bold">7</span>
                  </div>

                  <span className={cn("text-[10px] capitalize font-medium",
                    settings.quickBuySize === size ? "text-white" : "text-gray-500"
                  )}>
                    {size}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="flex items-center gap-2 text-sm">
            <Sun size={16} className="text-white" />
            <span className="text-white font-medium">Grey</span>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 border-b border-gray-800">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn("flex-1 py-2 text-[13px] font-medium transition-colors relative",
                  activeTab === tab.id ? "text-white" : "text-gray-500"
                )}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-600 mx-2" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-4 min-h-[200px]">

            {/* ------- LAYOUT TAB ------- */}
            {activeTab === 'layout' && (
              <div className="space-y-4">
                <button onClick={() => dispatch(toggleShowSearchBar())} className="flex items-center gap-3">
                  <Search size={16} className={settings.showSearchBar ? "text-white" : "text-gray-600"} />
                  <span className={cn("text-sm font-medium",
                    settings.showSearchBar ? "text-white" : "text-gray-500"
                  )}>
                    Show Search Bar
                  </span>
                </button>

                <button onClick={() => dispatch(toggleNoDecimals())} className="flex items-center gap-3">
                  <span className={cn("text-sm font-bold w-4 text-center",
                    settings.noDecimals ? "text-white" : "text-gray-600"
                  )}>#</span>
                  <span className={cn("text-sm font-medium",
                    settings.noDecimals ? "text-white" : "text-gray-500"
                  )}>
                    No Decimals
                  </span>
                </button>

                <button onClick={() => dispatch(toggleShowHiddenTokens())} className="flex items-center gap-3">
                  <EyeOff size={16} className={settings.showHiddenTokens ? "text-white" : "text-gray-600"} />
                  <span className={cn("text-sm font-medium",
                    settings.showHiddenTokens ? "text-white" : "text-gray-500"
                  )}>
                    Show Hidden Tokens
                  </span>
                </button>

                <button onClick={() => dispatch(toggleUnhideOnMigrated())} className="flex items-center gap-3">
                  <Eye size={16} className={settings.unhideOnMigrated ? "text-white" : "text-gray-600"} />
                  <span className={cn("text-sm font-medium",
                    settings.unhideOnMigrated ? "text-white" : "text-gray-500"
                  )}>
                    Unhide on Migrated
                  </span>
                </button>

                <button onClick={() => dispatch(toggleCircleImages())} className="flex items-center gap-3">
                  <Circle size={16} className={settings.circleImages ? "text-white" : "text-gray-600"} />
                  <span className={cn("text-sm font-medium",
                    settings.circleImages ? "text-white" : "text-gray-500"
                  )}>
                    Circle Images
                  </span>
                </button>

                <button onClick={() => dispatch(toggleProgressBar())} className="flex items-center gap-3">
                  <div className={cn("w-4 h-4 border rounded-sm",
                    settings.progressBar ? "border-white" : "border-gray-600"
                  )} />
                  <span className={cn("text-sm font-medium",
                    settings.progressBar ? "text-white" : "text-gray-500"
                  )}>
                    Progress Bar
                  </span>
                </button>
              </div>
            )}

            {/* ------- METRICS TAB ------- */}
            {activeTab === 'metrics' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-medium">Market Cap</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[30000, 150000, 'Above'].map((v, i) => (
                      <div key={i} className="bg-[#111] border border-gray-800 rounded p-2 relative">
                        <div className="text-sm font-bold text-white">{v}</div>
                        <div className="w-3 h-3 bg-blue-400 rounded-sm mt-1" />
                        <div className="text-[10px] text-gray-500 mt-1">
                          {i === 0 ? '0 - 30K' : i === 1 ? '30K - 150K' : '150K+'}
                        </div>
                        <RefreshCw size={10} className="absolute bottom-2 right-2 text-gray-600" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-medium">Volume</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[1000, 2000, 'Above'].map((v, i) => (
                      <div key={i} className="bg-[#111] border border-gray-800 rounded p-2 relative">
                        <div className="text-sm font-bold text-white">{v}</div>
                        <div className="w-3 h-3 bg-white rounded-sm mt-1" />
                        <div className="text-[10px] text-gray-500 mt-1">
                          {i === 0 ? '0 - 1K' : i === 1 ? '1K - 2K' : '2K+'}
                        </div>
                        <RefreshCw size={10} className="absolute bottom-2 right-2 text-gray-600" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ------- ROW TAB ------- */}
            {activeTab === 'row' && (
              <div className="space-y-4">
                <button onClick={() => dispatch(toggleColorRow())} className="flex items-center gap-3">
                  <Rainbow size={16} className={settings.colorRow ? "text-white" : "text-gray-600"} />
                  <span className={cn("text-sm font-medium",
                    settings.colorRow ? "text-white" : "text-gray-500"
                  )}>
                    Color Row
                  </span>
                </button>

                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-medium">Protocol Row Colors</label>
                  <div className="flex flex-wrap gap-2">
                    {protocolColors.map((p) => (
                      <div key={p.name} className="flex items-center gap-1.5 px-2 py-1 rounded-full border border-gray-800 bg-[#111]">
                        <span className="text-xs">{p.icon}</span>
                        <span className="text-[11px] text-gray-300">{p.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ------- EXTRAS TAB ------- */}
            {activeTab === 'extras' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-medium">Table Layout</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['newPairs', 'finalStretch', 'migrated'] as const).map((layout) => (
                      <button
                        key={layout}
                        onClick={() => dispatch(setTableLayout(layout))}
                        className={cn("py-3 px-2 rounded border text-center transition-all",
                          settings.tableLayout === layout
                            ? "bg-[#1a1d24] border-blue-500 text-blue-400"
                            : "bg-[#111] border-gray-800 text-gray-500 hover:border-gray-700"
                        )}
                      >
                        <span className="text-[11px] font-medium">
                          {layout === 'newPairs'
                            ? 'New Pairs'
                            : layout === 'finalStretch'
                            ? 'Final Stretch'
                            : 'Migrated'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-400 font-medium">Click Quick Buy Behavior</label>
                  <div className="grid grid-cols-2 gap-2">

                    <button
                      onClick={() => dispatch(setQuickBuyBehavior('nothing'))}
                      className={cn("flex flex-col items-center py-3 rounded border gap-1",
                        settings.quickBuyBehavior === 'nothing'
                          ? "bg-[#1a1d24] border-blue-500 text-white"
                          : "bg-[#111] border-gray-800 text-gray-500 hover:border-gray-700"
                      )}
                    >
                      <Square size={14} />
                      <span className="text-[11px]">Nothing</span>
                    </button>

                    <button
                      onClick={() => dispatch(setQuickBuyBehavior('openPage'))}
                      className={cn("flex flex-col items-center py-3 rounded border gap-1",
                        settings.quickBuyBehavior === 'openPage'
                          ? "bg-[#1a1d24] border-blue-500 text-white"
                          : "bg-[#111] border-gray-800 text-gray-500 hover:border-gray-700"
                      )}
                    >
                      <ArrowRight size={14} />
                      <span className="text-[11px]">Open Page</span>
                    </button>

                    <button
                      onClick={() => dispatch(setQuickBuyBehavior('openNewTab'))}
                      className={cn("flex flex-col items-center py-3 rounded border col-span-2 gap-1",
                        settings.quickBuyBehavior === 'openNewTab'
                          ? "bg-[#1a1d24] border-blue-500 text-white"
                          : "bg-[#111] border-gray-800 text-gray-500 hover:border-gray-700"
                      )}
                    >
                      <ExternalLink size={14} />
                      <span className="text-[11px]">Open in New Tab</span>
                    </button>
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default DisplaySettingsModalContent;