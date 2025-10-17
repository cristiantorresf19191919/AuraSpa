'use client';

import { motion } from 'framer-motion';
import { Box, Stepper, Step, StepLabel, Typography, Chip } from '@mui/material';
import { useLanguage } from '@/lib/language-context';
import { CheckCircle, Circle } from '@mui/icons-material';

interface OnboardingStepperProps {
    activeStep: number;
}

export default function OnboardingStepper({ activeStep }: OnboardingStepperProps) {
    const { t } = useLanguage();

    const steps = [
        {
            label: t('your.foundation'),
            description: 'Basic information',
            icon: activeStep > 1 ? CheckCircle : Circle
        },
        {
            label: t('your.professional.showcase'),
            description: 'Profile & services',
            icon: Circle
        },
        {
            label: t('your.practice'),
            description: 'Business details',
            icon: Circle
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
        >
            <Box sx={{ mb: 6, maxWidth: '900px', mx: 'auto' }}>
                {/* Progress Header */}
                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography
                        variant="h6"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontWeight: 600,
                            mb: 1,
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                        }}
                    >
                        Step {activeStep} of 3
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            fontSize: '0.9rem'
                        }}
                    >
                        Complete each step to set up your professional profile
                    </Typography>
                </Box>

                {/* Enhanced Stepper */}
                <Box sx={{
                    position: 'relative',
                    p: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '20px',
                    backdropFilter: 'blur(10px)'
                }}>
                    <Stepper
                        activeStep={activeStep - 1}
                        sx={{
                            '& .MuiStepConnector-root': {
                                '& .MuiStepConnector-line': {
                                    background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.4) 0%, rgba(139, 92, 246, 0.1) 100%)',
                                    height: '4px',
                                    borderRadius: '2px',
                                    border: 'none'
                                }
                            }
                        }}
                    >
                        {steps.map((step, index) => {
                            const isCompleted = index < activeStep - 1;
                            const isActive = index === activeStep - 1;
                            const isUpcoming = index > activeStep - 1;

                            return (
                                <Step key={step.label}>
                                    <StepLabel
                                        StepIconComponent={({ active, completed }) => (
                                            <Box
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    borderRadius: '50%',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    backgroundColor: completed
                                                        ? '#8B5CF6'
                                                        : active
                                                            ? '#8B5CF6'
                                                            : 'rgba(255, 255, 255, 0.2)',
                                                    border: completed || active
                                                        ? '3px solid #8B5CF6'
                                                        : '2px solid rgba(255, 255, 255, 0.3)',
                                                    boxShadow: active
                                                        ? '0 0 20px rgba(139, 92, 246, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)'
                                                        : completed
                                                            ? '0 0 15px rgba(139, 92, 246, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2)'
                                                            : 'none',
                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    '&:hover': {
                                                        transform: 'scale(1.05)',
                                                        boxShadow: active
                                                            ? '0 0 25px rgba(139, 92, 246, 0.5), 0 6px 16px rgba(0, 0, 0, 0.4)'
                                                            : completed
                                                                ? '0 0 20px rgba(139, 92, 246, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)'
                                                                : '0 0 10px rgba(255, 255, 255, 0.2)'
                                                    }
                                                }}
                                            >
                                                {completed ? (
                                                    <CheckCircle sx={{ color: 'white', fontSize: 24 }} />
                                                ) : (
                                                    <Typography
                                                        sx={{
                                                            color: active ? 'white' : 'rgba(255, 255, 255, 0.7)',
                                                            fontWeight: 700,
                                                            fontSize: '1.1rem'
                                                        }}
                                                    >
                                                        {index + 1}
                                                    </Typography>
                                                )}
                                            </Box>
                                        )}
                                        sx={{
                                            '& .MuiStepLabel-labelContainer': {
                                                '& .MuiStepLabel-label': {
                                                    color: isActive || isCompleted ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                                                    fontWeight: isActive ? 700 : isCompleted ? 600 : 500,
                                                    fontSize: { xs: '0.9rem', sm: '1rem' },
                                                    textShadow: isActive || isCompleted ? '0 2px 4px rgba(0, 0, 0, 0.8)' : '0 1px 2px rgba(0, 0, 0, 0.5)',
                                                    transition: 'all 0.3s ease'
                                                }
                                            }
                                        }}
                                    >
                                        <Box sx={{ textAlign: 'center' }}>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    color: isActive || isCompleted ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                                                    fontWeight: isActive ? 700 : isCompleted ? 600 : 500,
                                                    fontSize: { xs: '0.9rem', sm: '1rem' },
                                                    mb: 0.5,
                                                    textShadow: isActive || isCompleted ? '0 2px 4px rgba(0, 0, 0, 0.8)' : '0 1px 2px rgba(0, 0, 0, 0.5)'
                                                }}
                                            >
                                                {step.label}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: isActive || isCompleted ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 400,
                                                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                                                }}
                                            >
                                                {step.description}
                                            </Typography>
                                        </Box>
                                    </StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>

                    {/* Progress Bar */}
                    <Box sx={{ mt: 3 }}>
                        <Box sx={{
                            width: '100%',
                            height: 6,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            borderRadius: 3,
                            overflow: 'hidden'
                        }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(activeStep / 3) * 100}%` }}
                                transition={{ duration: 0.8, ease: 'easeOut' }}
                                style={{
                                    height: '100%',
                                    background: 'linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%)',
                                    borderRadius: 3
                                }}
                            />
                        </Box>
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'rgba(255, 255, 255, 0.7)',
                                fontSize: '0.75rem',
                                mt: 1,
                                display: 'block',
                                textAlign: 'center'
                            }}
                        >
                            {Math.round((activeStep / 3) * 100)}% Complete
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </motion.div>
    );
}
