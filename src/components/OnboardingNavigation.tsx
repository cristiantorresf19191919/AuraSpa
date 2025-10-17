'use client';

import { motion } from 'framer-motion';
import { Box, Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import { useLanguage } from '@/lib/language-context';

interface OnboardingNavigationProps {
    activeStep: number;
    onNext: () => void;
    onBack: () => void;
    onSubmit: () => void;
    onCreateLater: () => void;
    loading: boolean;
    canProceed: boolean;
}

export default function OnboardingNavigation({ 
    activeStep, 
    onNext, 
    onBack, 
    onSubmit, 
    onCreateLater, 
    loading, 
    canProceed 
}: OnboardingNavigationProps) {
    const { t } = useLanguage();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
        >
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 6,
                gap: 2
            }}>
                {/* Back Button */}
                {activeStep > 0 && (
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                            onClick={onBack}
                            disabled={loading}
                            startIcon={<ArrowBackIcon />}
                            sx={{
                                color: 'white',
                                borderColor: 'rgba(255, 255, 255, 0.4)',
                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                backdropFilter: 'blur(10px)',
                                px: 3,
                                py: 1.5,
                                borderRadius: '12px',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                textTransform: 'none',
                                borderWidth: '1.5px',
                                '&:hover': {
                                    borderColor: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                                },
                                '&:disabled': {
                                    opacity: 0.5,
                                    cursor: 'not-allowed'
                                },
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                            }}
                        >
                            {t('back')}
                        </Button>
                    </motion.div>
                )}

                {/* Spacer for centering when no back button */}
                {activeStep === 0 && <Box sx={{ flex: 1 }} />}

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    {/* Step 2: Create Account & Add More Info buttons */}
                    {activeStep === 1 && (
                        <>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    onClick={onCreateLater}
                                    disabled={loading || !canProceed}
                                    sx={{
                                        color: 'white',
                                        borderColor: 'rgba(255, 255, 255, 0.4)',
                                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                        backdropFilter: 'blur(10px)',
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: '12px',
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        borderWidth: '1.5px',
                                        '&:hover': {
                                            borderColor: 'white',
                                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                            transform: 'translateY(-1px)',
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                                        },
                                        '&:disabled': {
                                            opacity: 0.5,
                                            cursor: 'not-allowed'
                                        },
                                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}
                                >
                                    {loading ? t('creating.account') : t('create.account')}
                                </Button>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    onClick={onNext}
                                    disabled={loading || !canProceed}
                                    endIcon={<ArrowForwardIcon />}
                                    sx={{
                                        backgroundColor: '#8B5CF6',
                                        color: 'white',
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: '12px',
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                                        '&:hover': {
                                            backgroundColor: '#7C3AED',
                                            transform: 'translateY(-1px)',
                                            boxShadow: '0 8px 24px rgba(139, 92, 246, 0.4)'
                                        },
                                        '&:disabled': {
                                            opacity: 0.5,
                                            cursor: 'not-allowed'
                                        },
                                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}
                                >
                                    {t('add.more.info')}
                                </Button>
                            </motion.div>
                        </>
                    )}

                    {/* Step 3: Complete Onboarding button */}
                    {activeStep === 2 && (
                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                                onClick={onSubmit}
                                disabled={loading || !canProceed}
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    backgroundColor: '#8B5CF6',
                                    color: 'white',
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: '12px',
                                    fontSize: '0.9rem',
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
                                    '&:hover': {
                                        backgroundColor: '#7C3AED',
                                        transform: 'translateY(-1px)',
                                        boxShadow: '0 8px 24px rgba(139, 92, 246, 0.4)'
                                    },
                                    '&:disabled': {
                                        opacity: 0.5,
                                        cursor: 'not-allowed'
                                    },
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                                }}
                            >
                                {loading ? t('completing.onboarding') : t('complete.onboarding')}
                            </Button>
                        </motion.div>
                    )}
                </Box>
            </Box>
        </motion.div>
    );
}
