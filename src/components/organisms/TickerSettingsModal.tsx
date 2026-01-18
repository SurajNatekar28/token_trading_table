'use client';

import React from 'react';

// Lazy-load modal content only when needed
const LazyTickerModalContent = React.lazy(
    () => import('./TickerSettingsModalContent')
);

interface TickerSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

/**
 * TickerSettingsModal
 *
 * A lightweight wrapper modal that lazy-loads the ticker settings UI.
 *
 * Behavior:
 * - Renders nothing when `isOpen` is false.
 * - Uses React.Suspense to lazy-load `LazyTickerModalContent`.
 * - Calls `onClose` when the child component closes the modal.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls modal visibility.
 * @param {() => void} props.onClose - Function to close the modal.
 *
 * @returns {JSX.Element | null}
 */

export const TickerSettingsModal: React.FC<TickerSettingsModalProps> = ({
    isOpen,
    onClose
}) => {
    if (!isOpen) return null;

    return (
        <React.Suspense fallback={null}>
            <LazyTickerModalContent onClose={onClose} />
        </React.Suspense>
    );
};

TickerSettingsModal.displayName = 'TickerSettingsModal';
