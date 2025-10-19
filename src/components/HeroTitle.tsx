'use client';

import { Typography, TypographyProps } from '@mui/material';
import { ReactNode } from 'react';

interface HeroTitleProps extends Omit<TypographyProps, 'variant' | 'component'> {
    children: ReactNode;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    gradient?: boolean;
    gradientColors?: string[];
    responsive?: boolean;
    className?: string;
    'data-testid'?: string;
}

export default function HeroTitle({
    children,
    variant = 'h1',
    component = 'h1',
    gradient = true,
    gradientColors = ['#fff', '#e0e0e0'],
    responsive = true,
    className = '',
    'data-testid': testId = 'hero-title',
    sx = {},
    ...otherProps
}: HeroTitleProps) {
    // Default responsive font sizes
    const defaultResponsiveSizes = {
        h1: { xs: '2.5rem', md: '4rem' },
        h2: { xs: '2rem', md: '3rem' },
        h3: { xs: '1.75rem', md: '2.5rem' },
        h4: { xs: '1.5rem', md: '2rem' },
        h5: { xs: '1.25rem', md: '1.75rem' },
        h6: { xs: '1rem', md: '1.5rem' }
    };

    // Build gradient background
    const gradientBackground = gradient
        ? `linear-gradient(45deg, ${gradientColors.join(', ')})`
        : 'inherit';

    // Build responsive font sizes
    const responsiveFontSize = responsive
        ? defaultResponsiveSizes[variant as keyof typeof defaultResponsiveSizes]
        : undefined;

    // Default styles
    const defaultStyles = {
        fontSize: responsiveFontSize,
        fontWeight: 700,
        color: gradient ? 'transparent' : 'white',
        mb: 3,
        background: gradientBackground,
        backgroundClip: gradient ? 'text' : undefined,
        WebkitBackgroundClip: gradient ? 'text' : undefined,
        WebkitTextFillColor: gradient ? 'transparent' : undefined,
        textAlign: 'center' as const,
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
        textShadow: gradient ? 'none' : '0 2px 4px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': gradient ? {
            transform: 'scale(1.02)',
            filter: 'brightness(1.1)'
        } : undefined
    };

    return (
        <Typography
            variant={variant}
            className={`hero-title ${className}`}
            data-testid={testId}
            sx={{
                ...defaultStyles,
                ...sx
            }}
            {...otherProps}
        >
            {children}
        </Typography>
    );
}

// Export types for external use
export type { HeroTitleProps };
