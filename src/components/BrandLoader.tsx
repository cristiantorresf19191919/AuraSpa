'use client';

import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { BoxesLoader } from 'react-awesome-loaders';

interface BrandLoaderProps {
    size?: number;
    message?: string;
    fullScreen?: boolean;
}

export default function BrandLoader({
    size = 80,
    message = "Loading...",
    fullScreen = false
}: BrandLoaderProps) {
    const containerStyle = fullScreen ? {
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(4px)',
        zIndex: 9999,
    } : {
        position: 'fixed' as const,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: fullScreen ? '100vh' : 'auto',
                    ...containerStyle
                }}
            >
                {/* BoxesLoader */}
                <Box sx={{ mb: 2 }}>
                    <BoxesLoader
                        boxColor="#8B5CF6"
                        desktopSize="128px"
                        mobileSize="80px"
                    />
                </Box>

                {/* Loading Message */}
                <motion.div
                    animate={{
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Box
                        sx={{
                            color: '#8B5CF6',
                            fontSize: '1rem',
                            fontWeight: 600,
                            textAlign: 'center',
                            fontFamily: 'var(--font-roboto), Roboto, sans-serif',
                            letterSpacing: '0.5px',
                        }}
                    >
                        {message}
                    </Box>
                </motion.div>
            </Box>
        </motion.div>
    );
} 