'use client';

import React from 'react';

// Lazy load modal contents only when needed
const LazyDisplaySettingsContent = React.lazy(
  () => import('./DisplaySettingsModalContent')
);

interface DisplaySettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * DisplaySettingsModal Component
 *
 * This component renders a modal used for configuring display-related settings.
 * It uses React suspense to lazy-load the modal content for improved performance.
 *
 * @component
 *
 * @param {Object} DisplaySettingsModalProps
 * @param {boolean} DisplaySettingsModalProps.isOpen
 *        Controls whether the modal is visible. If `false`, nothing is rendered.
 *
 * @param {() => void} DisplaySettingsModalProps.onClose
 *        Callback invoked when the modal requests to be closed.
 *
 * @returns {JSX.Element | null}
 *          Returns the modal UI when open, otherwise `null`.
 *
 * @example
 * <DisplaySettingsModal
 *   isOpen={isModalVisible}
 *   onClose={() => setModalVisible(false)}
 * />
 */

export const DisplaySettingsModal: React.FC<DisplaySettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <React.Suspense fallback={null}>
      <LazyDisplaySettingsContent onClose={onClose} />
    </React.Suspense>
  );
};

DisplaySettingsModal.displayName = 'DisplaySettingsModal';
