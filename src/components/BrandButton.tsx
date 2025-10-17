'use client';

import { Button, ButtonProps } from '@mui/material';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

interface BrandButtonProps extends Omit<ButtonProps, 'variant'> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    loading?: boolean;
    icon?: React.ReactNode;
    iconPosition?: 'start' | 'end';
}

const BrandButton = forwardRef<HTMLButtonElement, BrandButtonProps>(({
    variant = 'primary',
    size = 'medium',
    loading = false,
    icon,
    iconPosition = 'start',
    children,
    disabled,
    sx,
    ...props
}, ref) => {
    // Size configurations
    const sizeConfig = {
        small: { px: 2, py: 1, fontSize: '0.875rem', minHeight: 36 },
        medium: { px: 3, py: 1.5, fontSize: '1rem', minHeight: 44 },
        large: { px: 4, py: 2, fontSize: '1.125rem', minHeight: 52 }
    };

    // Variant configurations
    const variantConfig = {
        primary: {
            bgcolor: '#8B5CF6',
            color: 'white',
            '&:hover': {
                bgcolor: '#7C3AED',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)'
            },
            '&:active': {
                transform: 'translateY(0)',
                boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
            },
            '&:disabled': {
                bgcolor: '#9CA3AF',
                transform: 'none',
                boxShadow: 'none'
            }
        },
        secondary: {
            bgcolor: '#EC4899',
            color: 'white',
            '&:hover': {
                bgcolor: '#DB2777',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(236, 72, 153, 0.4)'
            },
            '&:active': {
                transform: 'translateY(0)',
                boxShadow: '0 4px 15px rgba(236, 72, 153, 0.3)'
            },
            '&:disabled': {
                bgcolor: '#9CA3AF',
                transform: 'none',
                boxShadow: 'none'
            }
        },
        outline: {
            bgcolor: 'transparent',
            color: '#8B5CF6',
            border: '2px solid #8B5CF6',
            '&:hover': {
                bgcolor: 'rgba(139, 92, 246, 0.1)',
                borderColor: '#7C3AED',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(139, 92, 246, 0.2)'
            },
            '&:active': {
                transform: 'translateY(0)',
                boxShadow: '0 4px 15px rgba(139, 92, 246, 0.15)'
            },
            '&:disabled': {
                color: '#9CA3AF',
                borderColor: '#9CA3AF',
                transform: 'none',
                boxShadow: 'none'
            }
        },
        ghost: {
            bgcolor: 'transparent',
            color: '#8B5CF6',
            '&:hover': {
                bgcolor: 'rgba(139, 92, 246, 0.1)',
                transform: 'translateY(-1px)'
            },
            '&:active': {
                transform: 'translateY(0)'
            },
            '&:disabled': {
                color: '#9CA3AF',
                transform: 'none'
            }
        }
    };

    // Icon positioning
    const iconElement = icon && (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
        >
            {icon}
        </motion.div>
    );

    return (
        <motion.div
            whileHover={!disabled ? { scale: 1.02 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            transition={{ duration: 0.1 }}
        >
            <Button
                ref={ref}
                variant="contained"
                disabled={disabled || loading}
                startIcon={iconPosition === 'start' ? iconElement : undefined}
                endIcon={iconPosition === 'end' ? iconElement : undefined}
                sx={{
                    // Base styles
                    borderRadius: 3,
                    fontWeight: 600,
                    textTransform: 'none',
                    letterSpacing: '0.025em',
                    position: 'relative',
                    overflow: 'hidden',

                    // Size styles
                    ...sizeConfig[size],

                    // Variant styles
                    ...variantConfig[variant],

                    // Loading state
                    '&:disabled': {
                        cursor: loading ? 'wait' : 'not-allowed'
                    },

                    // Focus styles for accessibility
                    '&:focus-visible': {
                        outline: '3px solid rgba(139, 92, 246, 0.5)',
                        outlineOffset: '2px'
                    },

                    // Smooth transitions
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',

                    // Custom styles
                    ...sx
                }}
                {...props}
            >
                {/* Loading indicator */}
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            style={{
                                width: 16,
                                height: 16,
                                border: '2px solid rgba(255,255,255,0.3)',
                                borderTop: '2px solid white',
                                borderRadius: '50%'
                            }}
                        />
                    </motion.div>
                )}

                {/* Button content with loading state */}
                <motion.div
                    animate={{ opacity: loading ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                >
                    {children}
                </motion.div>

                {/* Ripple effect */}
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 0.1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        transform: 'translate(-50%, -50%) scale(0)',
                        pointerEvents: 'none'
                    }}
                />
            </Button>
        </motion.div>
    );
});

BrandButton.displayName = 'BrandButton';

export default BrandButton; 