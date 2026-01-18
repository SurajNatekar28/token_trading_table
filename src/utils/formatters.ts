/**
 * Utility functions for formatting values
 * Memoize at call site for better performance
 */

/**
 * Format a number as currency with K/M suffixes
 */
export const formatCurrency = (num: number): string => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`;
    return `$${num.toFixed(2)}`;
};

/**
 * Format a date string as time ago (e.g., "5m", "2h", "3d")
 */
export const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    return `${Math.floor(diffInSeconds / 86400)}d`;
};

/**
 * Get consistent avatar color based on symbol
 */
export const getAvatarColor = (symbol: string): string => {
    const colors = [
        'bg-yellow-200 text-yellow-900',
        'bg-purple-300 text-purple-900',
        'bg-blue-300 text-blue-900',
        'bg-green-300 text-green-900',
        'bg-orange-300 text-orange-900',
        'bg-pink-300 text-pink-900',
        'bg-cyan-300 text-cyan-900',
        'bg-red-300 text-red-900',
    ];
    const index = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
};

/**
 * Format a number with thousand separators
 */
export const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US').format(num);
};

/**
 * Format percentage with sign
 */
export const formatPercentage = (value: number): string => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(2)}%`;
};
