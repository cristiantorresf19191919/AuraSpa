'use client';

import { motion } from 'framer-motion';
import { Typography, Grid, Box, Avatar, FormControl, InputLabel, Select, MenuItem, Chip, TextField } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { useLanguage } from '@/lib/language-context';
import { MassageCategory, MASSAGE_CATEGORIES } from '@/lib/massage-types';
import StyledTextField from './StyledTextField';

interface OnboardingStep2Props {
    formData: {
        profilePicture: File | null;
        professionalTitle: string;
        aboutMe: string;
        servicesOffered: MassageCategory[];
    };
    errors: Record<string, string>;
    handleChange: (field: string, value: any) => void;
    handleProfilePictureChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    profilePicturePreview: string | null;
}

export default function OnboardingStep2({
    formData,
    errors,
    handleChange,
    handleProfilePictureChange,
    profilePicturePreview
}: OnboardingStep2Props) {
    const { t } = useLanguage();

    return (
        <motion.div
            key="step2"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {/* Clean Form Container - No Card, Direct Content */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                width: '100%'
            }}>
                {/* Profile Picture Section */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                }}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        style={{ display: 'none' }}
                        id="profile-picture-upload"
                    />
                    <label htmlFor="profile-picture-upload">
                        <Box
                            sx={{
                                position: 'relative',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                    '& .upload-glow': {
                                        opacity: 1
                                    }
                                },
                                '&:active': {
                                    transform: 'scale(0.95)'
                                }
                            }}
                        >
                            <Avatar
                                src={profilePicturePreview || undefined}
                                sx={{
                                    width: 80,
                                    height: 80,
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    border: '2px solid rgba(255, 255, 255, 0.2)',
                                    fontSize: '2rem',
                                    fontWeight: 600
                                }}
                            >
                                {profilePicturePreview ? '' : 'U'}
                            </Avatar>
                            <Box
                                className="upload-glow"
                                sx={{
                                    position: 'absolute',
                                    top: -10,
                                    left: -10,
                                    right: -10,
                                    bottom: -10,
                                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
                                    borderRadius: '50%',
                                    opacity: 0,
                                    transition: 'opacity 0.3s ease',
                                    pointerEvents: 'none'
                                }}
                            />
                            <CloudUploadIcon
                                sx={{
                                    position: 'absolute',
                                    bottom: -5,
                                    right: -5,
                                    backgroundColor: '#8B5CF6',
                                    color: 'white',
                                    borderRadius: '50%',
                                    padding: 0.5,
                                    fontSize: 20,
                                    border: '2px solid white',
                                    animation: 'pulse 2s infinite',
                                    '@keyframes pulse': {
                                        '0%': { transform: 'scale(1)', opacity: 1 },
                                        '50%': { transform: 'scale(1.1)', opacity: 0.8 },
                                        '100%': { transform: 'scale(1)', opacity: 1 }
                                    }
                                }}
                            />
                        </Box>
                    </label>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center' }}>
                        {t('click.to.upload.profile.picture')}
                    </Typography>
                </Box>

                {/* Professional Information */}
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label={t('professional.title')}
                            value={formData.professionalTitle}
                            onChange={(e) => handleChange('professionalTitle', e.target.value)}
                            error={!!errors.professionalTitle}
                            helperText={errors.professionalTitle}
                            placeholder={t('placeholder.professional.title')}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                                    '&.Mui-focused fieldset': { borderColor: '#8B5CF6' }
                                },
                                '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.8)' },
                                '& .MuiFormHelperText-root': { color: 'rgba(255, 255, 255, 0.7)' }
                            }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                            fullWidth
                            label={t('about.me')}
                            value={formData.aboutMe}
                            onChange={(e) => handleChange('aboutMe', e.target.value)}
                            error={!!errors.aboutMe}
                            helperText={errors.aboutMe}
                            placeholder={t('placeholder.about.me')}
                            multiline
                            rows={4}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: 'white',
                                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.5)' },
                                    '&.Mui-focused fieldset': { borderColor: '#8B5CF6' }
                                },
                                '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.8)' },
                                '& .MuiFormHelperText-root': { color: 'rgba(255, 255, 255, 0.7)' }
                            }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <FormControl fullWidth error={!!errors.servicesOffered}>
                            <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>
                                {t('services.offered')}
                            </InputLabel>
                            <Select
                                multiple
                                value={formData.servicesOffered}
                                onChange={(e) => handleChange('servicesOffered', e.target.value)}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip
                                                key={value}
                                                label={t(`massage.${value}`)}
                                                size="small"
                                                sx={{
                                                    backgroundColor: 'rgba(139, 92, 246, 0.2)',
                                                    color: 'white',
                                                    border: '1px solid rgba(139, 92, 246, 0.3)'
                                                }}
                                            />
                                        ))}
                                    </Box>
                                )}
                                sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                                    border: '2px solid rgba(255, 255, 255, 0.2)',
                                    borderRadius: '20px',
                                    color: 'white',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        border: 'none'
                                    },
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                        borderColor: 'rgba(139, 92, 246, 0.6)'
                                    },
                                    '&.Mui-focused': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                        borderColor: '#8B5CF6'
                                    }
                                }}
                            >
                                {MASSAGE_CATEGORIES.map((category) => (
                                    <MenuItem key={category.value} value={category.value}>
                                        {t(`massage.${category.value}`)}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.servicesOffered && (
                                <Typography variant="caption" sx={{ color: '#ef4444', ml: 2, mt: 0.5 }}>
                                    {errors.servicesOffered}
                                </Typography>
                            )}
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        </motion.div>
    );
}
