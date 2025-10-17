'use client';

import { TextField, Typography, Box, Paper } from '@mui/material';
import { useLanguage } from '@/lib/language-context';
import { MassageCategory } from '@/lib/massage-types';
import { memo } from 'react';

interface OnboardingStep1Props {
    formData: {
        fullName: string;
        email: string;
        phone: string;
        password: string;
        confirmPassword: string;
    };
    errors: Record<string, string>;
    handleChange: (field: string, value: any) => void;
}

const OnboardingStep1 = memo(function OnboardingStep1({
    formData,
    errors,
    handleChange
}: OnboardingStep1Props) {
    const { t } = useLanguage();

    return (
        <Box>
            {/* Enhanced Section Header with Better Typography Hierarchy */}
            <Box sx={{ mb: 5, textAlign: 'center' }}>
                <Typography
                    variant="h4"
                    sx={{
                        mb: 1,
                        color: '#8B5CF6',
                        fontWeight: 700,
                        fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                        letterSpacing: '-0.02em'
                    }}
                >
                    {t('personal.details')}
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        color: 'rgba(255, 255, 255, 0.85)',
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        fontWeight: 400,
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                    }}
                >
                    Complete your basic information to get started
                </Typography>
            </Box>

            {/* Form Fields with Improved Grouping and Spacing */}
            <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
                {/* Personal Information Group */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        mb: 4,
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 3,
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                        }}
                    >
                        Personal Information
                    </Typography>

                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                        gap: 3
                    }}>
                        <TextField
                            fullWidth
                            label={t('full.name')}
                            placeholder={t('placeholder.full.name')}
                            value={formData.fullName}
                            onChange={(e) => handleChange('fullName', e.target.value)}
                            error={!!errors.fullName}
                            helperText={errors.fullName}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                    borderRadius: '12px',
                                    '& fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.2)',
                                        borderWidth: '1px'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.4)',
                                        borderWidth: '1px'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#8B5CF6',
                                        borderWidth: '2px',
                                        boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1)'
                                    }
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    fontWeight: 500,
                                    '&.Mui-focused': { color: '#8B5CF6' }
                                },
                                '& .MuiFormHelperText-root': {
                                    color: errors.fullName ? '#ef4444' : 'rgba(255, 255, 255, 0.7)',
                                    fontWeight: 400,
                                    fontSize: '0.875rem'
                                }
                            }}
                        />

                        <TextField
                            fullWidth
                            label={t('email')}
                            placeholder={t('placeholder.email')}
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            error={!!errors.email}
                            helperText={errors.email}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                    borderRadius: '12px',
                                    '& fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.2)',
                                        borderWidth: '1px'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.4)',
                                        borderWidth: '1px'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#8B5CF6',
                                        borderWidth: '2px',
                                        boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1)'
                                    }
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    fontWeight: 500,
                                    '&.Mui-focused': { color: '#8B5CF6' }
                                },
                                '& .MuiFormHelperText-root': {
                                    color: errors.email ? '#ef4444' : 'rgba(255, 255, 255, 0.7)',
                                    fontWeight: 400,
                                    fontSize: '0.875rem'
                                }
                            }}
                        />

                        <TextField
                            fullWidth
                            label={t('phone')}
                            placeholder={t('placeholder.phone')}
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            error={!!errors.phone}
                            helperText={errors.phone}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                    borderRadius: '12px',
                                    '& fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.2)',
                                        borderWidth: '1px'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.4)',
                                        borderWidth: '1px'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#8B5CF6',
                                        borderWidth: '2px',
                                        boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1)'
                                    }
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    fontWeight: 500,
                                    '&.Mui-focused': { color: '#8B5CF6' }
                                },
                                '& .MuiFormHelperText-root': {
                                    color: errors.phone ? '#ef4444' : 'rgba(255, 255, 255, 0.7)',
                                    fontWeight: 400,
                                    fontSize: '0.875rem'
                                }
                            }}
                        />
                    </Box>
                </Paper>

                {/* Security Information Group */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            mb: 3,
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                        }}
                    >
                        Security Information
                    </Typography>

                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                        gap: 3
                    }}>
                        <TextField
                            fullWidth
                            label={t('password')}
                            placeholder={t('placeholder.password')}
                            type="password"
                            value={formData.password}
                            onChange={(e) => handleChange('password', e.target.value)}
                            error={!!errors.password}
                            helperText={errors.password}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                    borderRadius: '12px',
                                    '& fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.2)',
                                        borderWidth: '1px'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.4)',
                                        borderWidth: '1px'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#8B5CF6',
                                        borderWidth: '2px',
                                        boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1)'
                                    }
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    fontWeight: 500,
                                    '&.Mui-focused': { color: '#8B5CF6' }
                                },
                                '& .MuiFormHelperText-root': {
                                    color: errors.password ? '#ef4444' : 'rgba(255, 255, 255, 0.7)',
                                    fontWeight: 400,
                                    fontSize: '0.875rem'
                                }
                            }}
                        />

                        <TextField
                            fullWidth
                            label={t('confirm.password')}
                            placeholder={t('placeholder.confirm.password')}
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleChange('confirmPassword', e.target.value)}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                    borderRadius: '12px',
                                    '& fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.2)',
                                        borderWidth: '1px'
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'rgba(255, 255, 255, 0.4)',
                                        borderWidth: '1px'
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#8B5CF6',
                                        borderWidth: '2px',
                                        boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1)'
                                    }
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    fontWeight: 500,
                                    '&.Mui-focused': { color: '#8B5CF6' }
                                },
                                '& .MuiFormHelperText-root': {
                                    color: errors.confirmPassword ? '#ef4444' : 'rgba(255, 255, 255, 0.7)',
                                    fontWeight: 400,
                                    fontSize: '0.875rem'
                                }
                            }}
                        />
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
});

export default OnboardingStep1;
