'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.ComponentProps<'div'> {
  variant?: 'pulse' | 'shimmer';
}

export const Skeleton = React.memo(
  React.forwardRef<HTMLDivElement, SkeletonProps>(
    ({ className, variant = 'shimmer', ...props }, ref) => {
      return (
        <div
          ref={ref}
          role="presentation"
          aria-hidden="true"
          data-slot="skeleton"
          className={cn(
            'relative overflow-hidden rounded-md bg-gray-800/40',
            variant === 'pulse' && 'animate-pulse',
            variant === 'shimmer' &&
              'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.6s_linear_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent',
            className
          )}
          {...props}
        />
      );
    }
  )
);

Skeleton.displayName = 'Skeleton';
