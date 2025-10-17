'use client';

import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { BoxesLoader } from 'react-awesome-loaders';

interface InlineLoaderProps {
    size?: number;
    color?: string;
}

export default function InlineLoader({
    size = 20,
    color = '#8B5CF6'
}: InlineLoaderProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
                duration: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94]
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BoxesLoader
                    boxColor={color}
                    desktopSize={`${size}px`}
                    mobileSize={`${size}px`}
                />
            </Box>
        </motion.div>
    );
} 