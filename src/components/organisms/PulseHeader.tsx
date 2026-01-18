"use client";

import React, { useCallback, useState } from "react";
import {
  HelpCircle,
  Volume2,
  BookmarkX,
  Keyboard,
  Crosshair,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { ChainSelector } from "@/components/molecules/ChainSelector";
import { ActiveWalletsPopover } from "./ActiveWalletsPopover";

/* -------------------------------------------------------
   LAZY LOAD HEAVY MODALS (Faster initial UI render)
------------------------------------------------------- */
const RecommendedSettingsModal = React.lazy(() =>
  import("./RecommendedSettingsModal").then((m) => ({
    default: m.RecommendedSettingsModal,
  }))
);

const BlacklistModal = React.lazy(() =>
  import("./BlacklistModal").then((m) => ({
    default: m.BlacklistModal,
  }))
);

const HotkeysModal = React.lazy(() =>
  import("./HotkeysModal").then((m) => ({
    default: m.HotkeysModal,
  }))
);

const AlertsModal = React.lazy(() =>
  import("./AlertsModal").then((m) => ({
    default: m.AlertsModal,
  }))
);

const SnipeSettingsModal = React.lazy(() =>
  import("./SnipeSettingsModal").then((m) => ({
    default: m.SnipeSettingsModal,
  }))
);


interface PulseHeaderProps {
  selectedChain: "SOL" | "BNB";
  onChainSelect: (chain: "SOL" | "BNB") => void;
  onDisplayClick: () => void;
}

export const PulseHeader: React.FC<PulseHeaderProps> = React.memo(
  ({ selectedChain, onChainSelect, onDisplayClick }) => {
    /* -------------------------- Local UI State --------------------------- */
    const [modals, setModals] = useState({
      help: false,
      blacklist: false,
      hotkeys: false,
      alerts: false,
      snipe: false,
    });

    const open = useCallback(
      (key: keyof typeof modals) => setModals((p) => ({ ...p, [key]: true })),
      []
    );

    const close = useCallback(
      (key: keyof typeof modals) => setModals((p) => ({ ...p, [key]: false })),
      []
    );

    return (
      <>
        {/* ------------------------------------------------------------------
           HEADER
        ------------------------------------------------------------------ */}
        <div className="h-12 border-b border-border/10 bg-black flex items-center justify-between px-4 shrink-0">
          {/* LEFT SECTION */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-white tracking-tight">
                Pulse
              </h1>
              <ChainSelector selectedChain={selectedChain} onSelect={onChainSelect} />
            </div>
          </div>

          {/* RIGHT CONTROLS */}
          <div className="flex items-center gap-2">

            {/* Help */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500 hover:text-white rounded-md"
              onClick={() => open("help")}
            >
              <HelpCircle size={16} />
            </Button>

            {/* Display */}
            <Button
              variant="outline"
              size="sm"
              onClick={onDisplayClick}
              className="h-8 bg-transparent border-gray-700 hover:border-gray-500 text-white hover:bg-gray-800/50 gap-2 px-3 rounded-lg transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
              <span className="text-[13px] font-medium">Display</span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="opacity-50"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Button>

            {/* Blacklist */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-white rounded-md"
                  onClick={() => open("blacklist")}
                >
                  <BookmarkX size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                Blacklist dev, handle, keywords
              </TooltipContent>
            </Tooltip>

            {/* Hotkeys */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-white rounded-md"
                  onClick={() => open("hotkeys")}
                >
                  <Keyboard size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Pulse Hotkeys</TooltipContent>
            </Tooltip>

            {/* Alerts */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-white rounded-md"
                  onClick={() => open("alerts")}
                >
                  <Volume2 size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Alerts</TooltipContent>
            </Tooltip>

            {/* Snipe Settings */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-white rounded-md"
                  onClick={() => open("snipe")}
                >
                  <Crosshair size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Snipe Settings</TooltipContent>
            </Tooltip>

            <ActiveWalletsPopover selectedChain={selectedChain} />
          </div>
        </div>

        {/* ------------------------------------------------------------------
           MODALS (LAZY MOUNTED ONLY WHEN OPEN)
        ------------------------------------------------------------------ */}
        <React.Suspense fallback={null}>
          {modals.help && (
            <RecommendedSettingsModal
              isOpen={modals.help}
              onClose={() => close("help")}
              onApply={() => close("help")}
            />
          )}

          {modals.blacklist && (
            <BlacklistModal
              isOpen={modals.blacklist}
              onClose={() => close("blacklist")}
            />
          )}

          {modals.hotkeys && (
            <HotkeysModal
              isOpen={modals.hotkeys}
              onClose={() => close("hotkeys")}
            />
          )}

          {modals.alerts && (
            <AlertsModal
              isOpen={modals.alerts}
              onClose={() => close("alerts")}
            />
          )}

          {modals.snipe && (
            <SnipeSettingsModal
              isOpen={modals.snipe}
              onClose={() => close("snipe")}
            />
          )}
        </React.Suspense>
      </>
    );
  }
);

PulseHeader.displayName = "PulseHeader";