'use client'

import { useState, useEffect } from 'react';

/**
 * Custom hook for progressive loading of items with staggered appearance
 * @param totalItems - Total number of items to load
 * @param delayMs - Delay between each item appearance in milliseconds (default: 30ms)
 * @param initialCount - Initial number of items to show immediately (default: 1)
 * @returns Current count of visible items
 */
export function useProgressiveLoad(
    totalItems: number,
    delayMs: number = 30,
    initialCount: number = 1
): number {
    const [visibleCount, setVisibleCount] = useState(initialCount);

    useEffect(() => {
        // Reset when totalItems changes
        setVisibleCount(initialCount);

        // Don't set timeouts if all items already visible
        if (initialCount >= totalItems) {
            return;
        }

        // Create staggered intervals for each item
        const timeouts: NodeJS.Timeout[] = [];

        for (let i = initialCount; i < totalItems; i++) {
            const timeout = setTimeout(() => {
                setVisibleCount(i + 1);
            }, (i - initialCount + 1) * delayMs);

            timeouts.push(timeout);
        }

        // Cleanup all timeouts on unmount or when dependencies change
        return () => {
            timeouts.forEach(timeout => clearTimeout(timeout));
        };
    }, [totalItems, delayMs, initialCount]);

    return visibleCount;
}
