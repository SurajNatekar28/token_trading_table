'use client'

import React from 'react';
import { AlertCircle, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorFallbackUIProps {
    error?: Error;
    onReset?: () => void;
    title?: string;
    message?: string;
}

/**
 * ErrorFallbackUI Component
 * -------------------------
 * A user-friendly fallback UI used when an error boundary catches an exception.
 * Displays an error icon, title, human-readable message, and an optional retry button.
 *
 * This component is meant to be used inside an Error Boundary, such as:
 * <ErrorBoundary FallbackComponent={ErrorFallbackUI} />
 *
 * Props:
 * @param error - The caught error object (usually from React error boundaries).
 * @param onReset - Optional callback to retry or reset the failed state.
 * @param title - Optional custom title displayed above the message.
 * @param message - Optional override message. Falls back to error.message.
 *
 * Behavior:
 * - If no custom message is provided, it uses `error.message` or a generic fallback.
 * - Shows developer-only stack trace in development mode for easier debugging.
 */

export const ErrorFallbackUI: React.FC<ErrorFallbackUIProps> = ({
    error,
    onReset,
    title = 'Something went wrong',
    message,
}) => {
    const displayMessage = message || error?.message || 'An unexpected error occurred. Please try again.';

    return (
        <div className="flex items-center justify-center p-8 min-h-[200px]">
            <div className="text-center max-w-md">
                {/* Error Icon */}
                <div className="mb-4 flex justify-center">
                    <div className="p-3 rounded-full bg-red-500/10 border border-red-500/20">
                        <AlertCircle className="w-8 h-8 text-red-400" />
                    </div>
                </div>

                {/* Error Title */}
                <h3 className="text-white text-base font-semibold mb-2">
                    {title}
                </h3>

                {/* Error Message */}
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {displayMessage}
                </p>

                {/* Retry Button */}
                {onReset && (
                    <Button
                        onClick={onReset}
                        className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
                        size="sm"
                    >
                        <RotateCw className="w-4 h-4" />
                        Try Again
                    </Button>
                )}

                {/* Debug Info (only in development) */}
                {process.env.NODE_ENV === 'development' && error && (
                    <details className="mt-4 text-left">
                        <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-400">
                            Error Details (Dev Only)
                        </summary>
                        <pre className="mt-2 p-2 bg-gray-900/50 rounded text-xs text-gray-400 overflow-auto max-h-32">
                            {error.stack}
                        </pre>
                    </details>
                )}
            </div>
        </div>
    );
};
