'use client';

import { ReactNode } from 'react';
import { Box } from '@mui/material';

interface BeautifulCardProps {
    children: ReactNode;
    isBlurred?: boolean;
    className?: string;
    sx?: any;
}

export default function BeautifulCard({
    children,
    isBlurred = true,
    className = '',
    sx = {}
}: BeautifulCardProps) {
    return (
        <Box
            className={`beautiful-card ${className}`}
            sx={{
                borderRadius: '20px',
                padding: { xs: '24px 16px', sm: '32px 20px', md: '40px 24px' },
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: isBlurred ? 'blur(33px)' : 'blur(20px)',
                WebkitBackdropFilter: isBlurred ? 'blur(33px)' : 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: isBlurred
                    ? `
                        0 8px 32px rgba(0, 0, 0, 0.1),
                        inset 0 1px 0 rgba(255, 255, 255, 0.5),
                        inset 0 -1px 0 rgba(255, 255, 255, 0.1),
                        inset 0 0 24px 12px rgba(255, 255, 255, 0.12)
                    `
                    : `
                        0 4px 16px rgba(0, 0, 0, 0.08),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3),
                        inset 0 -1px 0 rgba(255, 255, 255, 0.05),
                        inset 0 0 12px 6px rgba(255, 255, 255, 0.06)
                    `,
                position: 'relative',
                overflow: 'hidden',
                width: '100%',
                maxWidth: '800px',
                margin: '0 auto',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                    transform: isBlurred ? 'translateY(-2px)' : 'translateY(-1px)',
                    boxShadow: isBlurred
                        ? `
                            0 12px 48px rgba(0, 0, 0, 0.15),
                            inset 0 1px 0 rgba(255, 255, 255, 0.6),
                            inset 0 -1px 0 rgba(255, 255, 255, 0.15),
                            inset 0 0 32px 16px rgba(255, 255, 255, 0.15)
                        `
                        : `
                            0 8px 24px rgba(0, 0, 0, 0.12),
                            inset 0 1px 0 rgba(255, 255, 255, 0.4),
                            inset 0 -1px 0 rgba(255, 255, 255, 0.08),
                            inset 0 0 16px 8px rgba(255, 255, 255, 0.08)
                        `,
                },
                ...sx
            }}
        >
            {/* Glassmorphism highlight lines */}
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
                    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.8), transparent, rgba(255, 255, 255, 0.3))',
                    zIndex: 1
                }}
            />

            {/* Content */}
            <Box sx={{ position: 'relative', zIndex: 2 }}>
                {children}
            </Box>
        </Box>
    );
}

// Add global styles for the beautiful card
const styles = `
    .beautiful-card {
        /* Ensure form inputs don't have backdrop-filter when card is blurred */
        .beautiful-card .MuiInputBase-root,
        .beautiful-card .MuiTextField-root {
            backdrop-filter: none !important;
        }

        /* Ensure form inputs have proper contrast for glassmorphism */
        .beautiful-card .MuiInputBase-root {
            background: rgba(255, 255, 255, 0.1) !important;
            border: 1px solid rgba(255, 255, 255, 0.2) !important;
            backdrop-filter: blur(10px) !important;
            -webkit-backdrop-filter: blur(10px) !important;
        }

        .beautiful-card .MuiInputBase-root:hover {
            background: rgba(255, 255, 255, 0.15) !important;
            border-color: rgba(255, 255, 255, 0.3) !important;
        }

        .beautiful-card .MuiInputBase-root.Mui-focused {
            background: rgba(255, 255, 255, 0.2) !important;
            border-color: rgba(255, 255, 255, 0.4) !important;
            box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1) !important;
        }

        /* Glassmorphism text styling */
        .beautiful-card h1,
        .beautiful-card h2,
        .beautiful-card h3,
        .beautiful-card h4,
        .beautiful-card h5,
        .beautiful-card h6 {
            color: rgba(255, 255, 255, 0.9) !important;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .beautiful-card p,
        .beautiful-card span,
        .beautiful-card div {
            color: rgba(255, 255, 255, 0.8) !important;
        }

        /* Custom scrollbar for the card */
        .beautiful-card::-webkit-scrollbar {
            width: 8px;
        }

        .beautiful-card::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 4px;
        }

        .beautiful-card::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 4px;
            backdrop-filter: blur(10px);
        }

        .beautiful-card::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
        }
    }
`;

// Inject styles into the document head
if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
}
