'use client';

import { Typography, TypographyProps } from '@mui/material';
import { ReactNode } from 'react';

type TextSize = 'small' | 'medium' | 'large';

interface HeroTextProps extends Omit<TypographyProps, 'variant' | 'component'> {
    children: ReactNode;
    size?: TextSize;
    variant?: 'body1' | 'body2' | 'h6' | 'subtitle1' | 'subtitle2' | 'caption';
    component?: 'p' | 'span' | 'div' | 'h6';
    gradient?: boolean;
    gradientColors?: string[];
    responsive?: boolean;
    className?: string;
    'data-testid'?: string;
}

export default function HeroText({
    children,
    size = 'medium',
    variant = 'body1',
    component = 'p',
    gradient = false,
    gradientColors = ['#fff', '#e0e0e0'],
    responsive = true,
    className = '',
    'data-testid': testId = 'hero-text',
    sx = {},
    ...otherProps
}: HeroTextProps) {
    // Size-based responsive font sizes
    const sizeResponsiveSizes = {
        small: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
        medium: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
        large: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' }
    };

    // Variant-based responsive font sizes (fallback)
    const variantResponsiveSizes = {
        body1: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
        body2: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
        h6: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
        subtitle1: { xs: '1rem', sm: '1.125rem', md: '1.25rem' },
        subtitle2: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
        caption: { xs: '0.75rem', sm: '0.875rem', md: '1rem' }
    };

    // Build gradient background
    const gradientBackground = gradient
        ? `linear-gradient(45deg, ${gradientColors.join(', ')})`
        : 'inherit';

    // Build responsive font sizes - prioritize size prop over variant
    const responsiveFontSize = responsive
        ? sizeResponsiveSizes[size]
        : variantResponsiveSizes[variant];

    // Default styles based on size and gradient
    const getDefaultStyles = () => {
        const baseStyles = {
            fontSize: responsiveFontSize,
            fontWeight: 400,
            lineHeight: 1.6,
            letterSpacing: '0.01em',
            mb: 2,
            textAlign: 'center' as const,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        };

        if (gradient) {
            return {
                ...baseStyles,
                color: 'transparent',
                background: gradientBackground,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: 'none',
                '&:hover': {
                    transform: 'scale(1.01)',
                    filter: 'brightness(1.05)'
                }
            };
        }

        return {
            ...baseStyles,
            color: 'rgba(255, 255, 255, 0.95)',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.4)',
            '&:hover': {
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.6)'
            }
        };
    };

    const defaultStyles = getDefaultStyles();

    return (
        <Typography
            variant={variant}
            component={component}
            className={`hero-text hero-text--${size} ${className}`}
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
export type { HeroTextProps, TextSize };
