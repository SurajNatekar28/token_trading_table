/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import { Token } from "@/types";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Copy,
  Twitter,
  Search,
  User,
  Link2,
  Shield,
  Zap,
  Music,
  Users,
  BarChart2,
  Sprout,
  Crosshair,
  Lock,
  TreePine,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatCurrency, formatTimeAgo, getAvatarColor } from "@/utils/formatters";

interface TokenCardProps {
  token: Token;
  index: number;
  currentTime: number;
}

/* -------------------------
   SimpleTooltip (tiny)
   - uses aria-describedby for accessibility
   - shows on hover/focus
--------------------------*/
function SimpleTooltip({ children, content, id }: { children: React.ReactNode; content: React.ReactNode; id: string }) {
  return (
    <span className="relative inline-block" aria-describedby={id}>
      {children}
      <span
        id={id}
        role="tooltip"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block group-focus:block z-50 text-xs bg-black/90 text-white px-2 py-1 rounded"
      >
        {content}
      </span>
    </span>
  );
}

/* -------------------------
   SimplePopover (tiny)
   - opens on click, closes on outside click or Escape
   - minimal DOM
--------------------------*/
function SimplePopover({ trigger, content, ariaLabel }: { trigger: React.ReactNode; content: React.ReactNode; ariaLabel?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen(v => !v)}
        className="focus:outline-none"
      >
        {trigger}
      </button>

      {open && (
        <div role="dialog" aria-modal="false" className="absolute z-50 right-0 mt-2 w-80 bg-black/95 border border-gray-800 p-4 rounded-lg shadow-xl">
          {content}
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------
   MEMOIZED BADGES
---------------------------------------------------- */
const Badges = React.memo(function Badges({ badges }: { badges: Token["badges"] }) {
  const Icons = [User, Sprout, Crosshair, Lock, TreePine];

  return (
    <div className="flex items-center gap-2 mt-1.5">
      {badges.map((b, i) => {
        const Icon = Icons[i];
        const isRed = b.color === "red";

        return (
          <div
            key={i}
            className={cn(
              "flex items-center gap-1 bg-[#0a0a0a] rounded px-1.5 py-0.5 border",
              isRed ? "border-red-900/30" : "border-green-900/30"
            )}
            aria-hidden
          >
            <Icon
              size={9}
              className={isRed ? "text-red-500" : "text-green-500"}
            />
            <span
              className={cn(
                "text-[9px] font-bold",
                isRed ? "text-red-500" : "text-green-500"
              )}
            >
              {b.value}%
            </span>
          </div>
        );
      })}
    </div>
  );
});

/* ----------------------------------------------------
   MAIN CARD COMPONENT
---------------------------------------------------- */
/**
 * TokenCardInternal Component
 * ---------------------------
 * Renders a single token row inside the token list with:
 *
 * • Token avatar with popover (details + similar tokens)
 * • Market stats (market cap, volume, bonding %, user count, chart count)
 * • Token metadata (symbol, name, contract ID, creation time)
 * • Quick interaction buttons (copy, social actions)
 * • "Quick Buy" action button
 *
 * Performance:
 * ------------
 * Memoizes repeated formatting:
 * - Market cap + volume → formatCurrency()
 * - Time since creation → formatTimeAgo()
 * - Deterministic avatar background → getAvatarColor()
 *
 * UI Behavior:
 * ------------
 * - Hover states for card + popover
 * - Alternating background rows for visual grouping
 * - Responsive layout using Tailwind
 *
 * Props:
 * ------
 * @prop {Token} token         Token data model
 * @prop {number} index        Row index (used for striping background)
 * @prop {number} currentTime  Timestamp for time-ago recalculation
 *
 * Notes:
 * ------
 * This is an internal component optimized for list rendering.
 * Expects stable parent rendering + memoization at list level.
 */

const TokenCardInternal: React.FC<TokenCardProps> = ({ token, index, currentTime }) => {
  /* Memoized formatting (cheap) */
  const formattedMarketCap = useMemo(
    () => formatCurrency(token.marketCap),
    [token.marketCap]
  );
  const formattedVolume = useMemo(
    () => formatCurrency(token.volume24h),
    [token.volume24h]
  );

  const timeAgo = useMemo(
    () => formatTimeAgo(token.createdAt),
    [token.createdAt, currentTime]
  );

  const avatarColor = useMemo(() => getAvatarColor(token.symbol), [token.symbol]);

  /* Row striping */
  const bgColor = index % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]";
  const bondingPercentage = token.badges[3]?.value || 0;

  /* Buy button fixed size (Axiom style) */
  const buttonSizeCls = "h-6 px-3 text-[11px]";

  return (
    <div className="group">
      <Card
        className={cn(
          'p-2 transition-colors duration-150 border-b border-border/10 shadow-none rounded-none group relative overflow-hidden cursor-pointer min-h-[118px] will-change-transform',
          'hover:bg-accent/5',
          bgColor
        )}
      >
        <div className="flex gap-3 h-full">

          {/* LEFT SIDE: avatar with click popover (lightweight) */}
          <div className="flex flex-col items-center gap-1 shrink-0 mt-0.5">
            <SimplePopover
              ariaLabel={`Open details for ${token.symbol}`}
              trigger={
                <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
                  <Avatar className="h-[52px] w-[52px] rounded-md ring-1 ring-green-500/50">
                    <AvatarImage src={token.logoUrl} alt={`${token.symbol} logo`} width={52} height={52} sizes="52px" className="object-cover" />
                    <AvatarFallback className={cn('rounded-md text-xs font-bold', avatarColor)}>
                      {token.symbol.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  {/* Shield icon */}
                  <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-0.5">
                    <div className="bg-green-500 rounded-full p-[3px]">
                      <Shield size={7} className="text-black" />
                    </div>
                  </div>
                </div>
              }
              content={
                <div className="space-y-3">
                  <div className="relative">
                    <img src={token.logoUrl} alt={token.symbol} className="w-full h-64 object-cover rounded-lg" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-gray-400">
                      Similar Tokens
                    </h3>

                    <div className="flex items-center gap-2 text-xs">
                      <Avatar className="h-8 w-8 rounded-md">
                        <AvatarImage src={token.logoUrl} alt={`${token.symbol} small`} />
                        <AvatarFallback className={cn('rounded-md text-xs', avatarColor)}>
                          {token.symbol[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <p className="text-white font-medium">{token.symbol}</p>
                        <p className="text-gray-500 text-[10px]">{timeAgo}</p>
                      </div>

                      <span className="text-blue-400 font-bold">
                        {formattedMarketCap}
                      </span>
                    </div>
                  </div>
                </div>
              }
            />

            <span className="text-[9px] text-gray-500 font-medium">
              {token.contractId}
            </span>
          </div>

          {/* MIDDLE SECTION */}
          <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
            {/* Symbol + Copy */}
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[14px] text-white truncate">
                {token.symbol}
              </span>

              <SimpleTooltip id={`name-tip-${token.id}`} content={token.name}>
                <span className="text-[12px] text-gray-500 hover:text-blue-400 truncate max-w-[100px] cursor-pointer group">
                  {token.name}
                </span>
              </SimpleTooltip>

              <button aria-label={`Copy ${token.contractId}`} className="text-gray-600 hover:text-white cursor-pointer">
                <Copy size={11} />
              </button>
            </div>

            {/* Time + Social */}
            <div className="flex items-center gap-3 text-[11px] mt-0.5">
              <span className="text-green-500 font-bold">{timeAgo}</span>

              <div className="flex items-center gap-2 text-gray-500">
                <button aria-label="Play audio" className="hover:text-white"><Music size={11} /></button>
                <button aria-label="Open twitter" className="hover:text-white"><Twitter size={11} /></button>
                <button aria-label="Open link" className="hover:text-white"><Link2 size={11} /></button>
                <button aria-label="Search" className="hover:text-white"><Search size={11} /></button>

                <div className="flex items-center gap-0.5 hover:text-white cursor-pointer" aria-hidden>
                  <Users size={11} />
                  <span className="text-[10px] font-bold text-white">
                    {token.userCount}
                  </span>
                </div>

                <div className="flex items-center gap-0.5 hover:text-white cursor-pointer" aria-hidden>
                  <BarChart2 size={11} />
                  <span className="text-[10px] font-bold text-gray-500">
                    {token.chartCount}
                  </span>
                </div>
              </div>
            </div>

            {/* BADGES */}
            <Badges badges={token.badges} />
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col items-end justify-between min-w-[100px] py-0.5">
            <div className="text-right w-full">
              <div className="flex flex-col items-end gap-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-500 font-medium text-[11px]">MC</span>
                  <span className="text-blue-400 font-bold text-[15px]">
                    {formattedMarketCap}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-gray-500 font-medium text-[11px]">V</span>
                  <span className="text-white font-bold text-[15px]">
                    {formattedVolume}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 text-[10px] mt-2">
                <div className="flex items-center gap-1">
                  <span className="text-gray-500 text-[9px]">F</span>
                  <div className="flex items-center gap-0.5">
                    <div className="h-2 w-2 rounded-sm bg-linear-to-br from-blue-400 to-pink-500" />
                    <span className="text-white font-bold">0.025</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-gray-500 text-[9px]">TX</span>
                  <span className="text-white font-bold">19</span>
                </div>
              </div>
            </div>

            {/* QUICK BUY */}
            <Button
              size="sm"
              className={cn(
                "bg-[#5e87ff] hover:bg-blue-600 text-white rounded-full font-bold shadow-[0_0_10px_rgba(94,135,255,0.3)]",
                buttonSizeCls
              )}
              aria-label={`Buy ${token.symbol}`}
            >
              <Zap size={10} className="mr-1" />
              0 SOL
            </Button>
          </div>
        </div>
      </Card>

      {/* Small tooltip that shows bonding on card hover (kept as small element) */}
      <div aria-hidden className="sr-only">Bonding: {bondingPercentage}%</div>
    </div>
  );
};

/* ----------------------------------------------------
   MEMOIZED EXPORT
---------------------------------------------------- */
export const TokenCard = React.memo(
  TokenCardInternal,
  (prev, next) => {
    return (
      prev.token.id === next.token.id &&
      prev.token.price === next.token.price &&
      prev.token.priceChange24h === next.token.priceChange24h &&
      prev.token.marketCap === next.token.marketCap &&
      prev.token.volume24h === next.token.volume24h &&
      prev.currentTime === next.currentTime && // new stable compare
      prev.index === next.index
    );
  }
);
