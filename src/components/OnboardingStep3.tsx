'use client';

import { motion } from 'framer-motion';
import { Typography, Grid, Box, Chip, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material';
import { LocationOn as LocationIcon, AttachMoney as AttachMoneyIcon } from '@mui/icons-material';
import { useLanguage } from '@/lib/language-context';
import { MassageCategory, MASSAGE_CATEGORIES } from '@/lib/massage-types';
import StyledTextField from './StyledTextField';

interface OnboardingStep3Props {
    formData: {
        primaryServiceCity: string;
        serviceAreas: string[];
        servicesOffered: MassageCategory[];
        pricing: {
            [key in MassageCategory]?: number;
        };
        availability: {
            [key: string]: {
                morning: boolean;
                afternoon: boolean;
                evening: boolean;
            };
        };
    };
    errors: Record<string, string>;
    handleChange: (field: string, value: any) => void;
    handlePricingChange: (service: MassageCategory, price: number) => void;
    handleAvailabilityChange: (day: string, timeSlot: string, checked: boolean) => void;
}

const DAYS_OF_WEEK = [
    'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
];

const DAY_LABELS = {
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday'
};

const TIME_SLOTS = {
    morning: 'Morning (8AM-12PM)',
    afternoon: 'Afternoon (12PM-5PM)',
    evening: 'Evening (5PM-9PM)'
};

export default function OnboardingStep3({ 
    formData, 
    errors, 
    handleChange, 
    handlePricingChange, 
    handleAvailabilityChange 
}: OnboardingStep3Props) {
    const { t } = useLanguage();

    return (
        <motion.div
            key="step3"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            <Typography variant="h4" component="h2" sx={{ mb: 4, color: '#8B5CF6', fontWeight: 700 }}>
                {t('your.practice')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.8)' }}>
                {t('practice.description')}
            </Typography>

            <Grid container spacing={2}>
                {/* Location Information */}
                <Grid item xs={12}>
                    <StyledTextField
                        fullWidth
                        label={t('primary.service.city')}
                        value={formData.primaryServiceCity}
                        onChange={(e) => handleChange('primaryServiceCity', e.target.value)}
                        error={!!errors.primaryServiceCity}
                        helperText={errors.primaryServiceCity}
                        placeholder={t('placeholder.city')}
                    />
                </Grid>

                <Grid item xs={12}>
                    <StyledTextField
                        fullWidth
                        label={t('service.areas')}
                        value={formData.serviceAreas.join(', ')}
                        onChange={(e) => handleChange('serviceAreas', e.target.value.split(',').map(area => area.trim()).filter(area => area))}
                        error={!!errors.serviceAreas}
                        helperText={errors.serviceAreas || t('service.areas.helper')}
                        placeholder={t('placeholder.service.areas')}
                    />
                </Grid>

                {/* Pricing Section */}
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>
                        {t('pricing.for.services')}
                    </Typography>
                    <Grid container spacing={2}>
                        {formData.servicesOffered?.map((service) => (
                            <Grid item xs={12} md={6} key={service}>
                                <StyledTextField
                                    fullWidth
                                    label={`${t(`massage.${service}`)} - ${t('price')}`}
                                    type="number"
                                    value={formData.pricing[service] || ''}
                                    onChange={(e) => handlePricingChange(service, Number(e.target.value))}
                                    InputProps={{
                                        startAdornment: (
                                            <AttachMoneyIcon sx={{ color: 'rgba(255, 255, 255, 0.7)', mr: 1 }} />
                                        ),
                                    }}
                                    placeholder={t('placeholder.price')}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    {errors.pricing && (
                        <Typography variant="caption" sx={{ color: '#ef4444', mt: 1 }}>
                            {errors.pricing}
                        </Typography>
                    )}
                </Grid>

                {/* Availability Section */}
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>
                        {t('availability')}
                    </Typography>
                    <Grid container spacing={2}>
                        {DAYS_OF_WEEK.map((day) => (
                            <Grid item xs={12} md={6} key={day}>
                                <Box sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.06)',
                                    backdropFilter: 'blur(15px)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    borderRadius: '12px',
                                    p: 2
                                }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, color: 'white', fontWeight: 600 }}>
                                        {t(`day.${day}`)}
                                    </Typography>
                                    {Object.entries(TIME_SLOTS).map(([timeSlot, label]) => (
                                        <Box key={timeSlot} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                            <input
                                                type="checkbox"
                                                id={`${day}-${timeSlot}`}
                                                checked={formData.availability[day]?.[timeSlot] || false}
                                                onChange={(e) => handleAvailabilityChange(day, timeSlot, e.target.checked)}
                                                style={{ marginRight: '8px' }}
                                            />
                                            <label htmlFor={`${day}-${timeSlot}`} style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.9rem' }}>
                                                {label}
                                            </label>
                                        </Box>
                                    ))}
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                    {errors.availability && (
                        <Typography variant="caption" sx={{ color: '#ef4444', mt: 1 }}>
                            {errors.availability}
                        </Typography>
                    )}
                </Grid>
            </Grid>
        </motion.div>
    );
}
