'use client';

import React from 'react';
import { Sheet } from '@/components/ui/sheet';

// Lazy load sidebar content (major Lighthouse boost)
const LazySidebarContent = React.lazy(() => import('./FilterSidebarContent'));

interface FilterSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ isOpen, onClose }) => {
    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <React.Suspense fallback={null}>
                {isOpen && <LazySidebarContent onClose={onClose} />}
            </React.Suspense>
        </Sheet>
    );
};

FilterSidebar.displayName = 'FilterSidebar';
