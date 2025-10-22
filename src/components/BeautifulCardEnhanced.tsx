'use client';

import { ReactNode, useEffect } from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import { motion } from 'framer-motion';

interface BeautifulCardProps {
    children: ReactNode;
    variant?: 'default' | 'elevated' | 'glass' | 'minimal';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
    sx?: SxProps<Theme>;
    animate?: boolean;
    hover?: boolean;
}

export default function BeautifulCard({
    children,
    variant = 'glass',
    size = 'md',
    className = '',
    sx = {},
    animate = true,
    hover = true
}: BeautifulCardProps) {
    // Inject styles into the document head only on client side
    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
        
        // Cleanup function to remove styles when component unmounts
        return () => {
            if (document.head.contains(styleElement)) {
                document.head.removeChild(styleElement);
            }
        };
    }, []);

    // Size configurations
    const sizeConfig = {
        sm: { padding: { xs: '16px 12px', sm: '20px 16px', md: '24px 20px' }, maxWidth: '400px' },
        md: { padding: { xs: '24px 16px', sm: '32px 20px', md: '40px 24px' }, maxWidth: '600px' },
        lg: { padding: { xs: '32px 20px', sm: '40px 24px', md: '48px 32px' }, maxWidth: '800px' },
        xl: { padding: { xs: '40px 24px', sm: '48px 32px', md: '56px 40px' }, maxWidth: '1000px' },
    };

    // Variant configurations
    const variantConfig = {
        default: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: `
                0 4px 20px rgba(0, 0, 0, 0.08),
                inset 0 1px 0 rgba(255, 255, 255, 0.3)
            `,
            hoverShadow: `
                0 8px 30px rgba(0, 0, 0, 0.12),
                inset 0 1px 0 rgba(255, 255, 255, 0.4)
            `,
        },
        elevated: {
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.12),
                inset 0 1px 0 rgba(255, 255, 255, 0.5),
                inset 0 -1px 0 rgba(255, 255, 255, 0.1)
            `,
            hoverShadow: `
                0 16px 48px rgba(0, 0, 0, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.6),
                inset 0 -1px 0 rgba(255, 255, 255, 0.15)
            `,
        },
        glass: {
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: `
                0 8px 32px rgba(0, 0, 0, 0.1),
                inset 0 1px 0 rgba(255, 255, 255, 0.3),
                inset 0 -1px 0 rgba(255, 255, 255, 0.1),
                inset 0 0 24px 12px rgba(255, 255, 255, 0.05)
            `,
            hoverShadow: `
                0 12px 48px rgba(0, 0, 0, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.4),
                inset 0 -1px 0 rgba(255, 255, 255, 0.15),
                inset 0 0 32px 16px rgba(255, 255, 255, 0.08)
            `,
        },
        minimal: {
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: `
                0 2px 8px rgba(0, 0, 0, 0.04),
                inset 0 1px 0 rgba(255, 255, 255, 0.2)
            `,
            hoverShadow: `
                0 4px 16px rgba(0, 0, 0, 0.08),
                inset 0 1px 0 rgba(255, 255, 255, 0.3)
            `,
        },
    };

    const config = variantConfig[variant];
    const sizeProps = sizeConfig[size];

    const cardStyles = {
        borderRadius: '24px',
        padding: sizeProps.padding,
        background: config.background,
        backdropFilter: config.backdropFilter,
        WebkitBackdropFilter: config.backdropFilter,
        border: config.border,
        boxShadow: config.boxShadow,
        position: 'relative' as const,
        overflow: 'hidden' as const,
        width: '100%',
        maxWidth: sizeProps.maxWidth,
        margin: '0 auto',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        ...(hover && {
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: config.hoverShadow,
            },
        }),
        ...sx
    };

    const MotionBox = animate ? motion(Box) : Box;
    const motionProps = animate ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
    } : {};

    return (
        <MotionBox
            className={`beautiful-card beautiful-card--${variant} beautiful-card--${size} ${className}`}
            sx={cardStyles}
            {...motionProps}
        >
            {/* Enhanced glassmorphism highlight lines */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
                    zIndex: 1
                }}
            />

            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '1px',
                    height: '100%',
                    background: 'linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
                    zIndex: 1
                }}
            />

            {/* Subtle gradient overlay for depth */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: variant === 'glass' 
                        ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
                        : 'transparent',
                    zIndex: 1
                }}
            />

            {/* Content */}
            <Box sx={{ position: 'relative', zIndex: 2 }}>
                {children}
            </Box>
        </MotionBox>
    );
}

// Enhanced global styles for the beautiful card
const styles = `
    .beautiful-card {
        /* Enhanced form input styling */
        .MuiInputBase-root,
        .MuiTextField-root {
            backdrop-filter: none !important;
        }

        .MuiInputBase-root {
            background: rgba(255, 255, 255, 0.1) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            backdrop-filter: blur(10px) !important;
            -webkit-backdrop-filter: blur(10px) !important;
            border-radius: 12px !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .MuiInputBase-root:hover {
            background: rgba(255, 255, 255, 0.15) !important;
            border-color: rgba(255, 255, 255, 0.3) !important;
            transform: translateY(-1px) !important;
        }

        .MuiInputBase-root.Mui-focused {
            background: rgba(255, 255, 255, 0.2) !important;
            border-color: rgba(139, 92, 246, 0.6) !important;
            box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1) !important;
            transform: translateY(-2px) !important;
        }

        /* Enhanced typography styling */
        h1, h2, h3, h4, h5, h6 {
            color: rgba(255, 255, 255, 0.95) !important;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            font-weight: 600 !important;
            letter-spacing: -0.025em !important;
        }

        p, span, div {
            color: rgba(255, 255, 255, 0.85) !important;
            line-height: 1.6 !important;
        }

        /* Enhanced button styling */
        .MuiButton-root {
            border-radius: 12px !important;
            font-weight: 600 !important;
            text-transform: none !important;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
        }

        .MuiButton-root:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
        }

        /* Enhanced chip styling */
        .MuiChip-root {
            background: rgba(255, 255, 255, 0.15) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            color: rgba(255, 255, 255, 0.9) !important;
            backdrop-filter: blur(10px) !important;
            transition: all 0.3s ease !important;
        }

        .MuiChip-root:hover {
            background: rgba(255, 255, 255, 0.25) !important;
            transform: translateY(-1px) !important;
        }

        /* Custom scrollbar styling */
        &::-webkit-scrollbar {
            width: 8px;
        }

        &::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
        }

        &::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 4px;
            backdrop-filter: blur(10px);
        }

        &::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
        }

        /* Enhanced focus states for accessibility */
        *:focus-visible {
            outline: 2px solid rgba(139, 92, 246, 0.6) !important;
            outline-offset: 2px !important;
        }

        /* Improved selection styling */
        ::selection {
            background: rgba(139, 92, 246, 0.3) !important;
            color: rgba(255, 255, 255, 0.9) !important;
        }

        /* Enhanced loading states */
        .MuiCircularProgress-root {
            color: rgba(139, 92, 246, 0.8) !important;
        }

        /* Improved divider styling */
        .MuiDivider-root {
            border-color: rgba(255, 255, 255, 0.2) !important;
        }
    }

    /* Variant-specific enhancements */
    .beautiful-card--elevated {
        .MuiInputBase-root {
            background: rgba(255, 255, 255, 0.15) !important;
        }
    }

    .beautiful-card--minimal {
        .MuiInputBase-root {
            background: rgba(255, 255, 255, 0.8) !important;
            border-color: rgba(0, 0, 0, 0.1) !important;
        }
        
        h1, h2, h3, h4, h5, h6 {
            color: rgba(0, 0, 0, 0.9) !important;
        }
        
        p, span, div {
            color: rgba(0, 0, 0, 0.7) !important;
        }
    }
`;
