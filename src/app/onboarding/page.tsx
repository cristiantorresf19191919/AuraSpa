'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Box,
    Typography,
    Alert,
    CircularProgress,
    Container
} from '@mui/material';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { UserRole } from '@/lib/user-roles';
import { MassageCategory, MASSAGE_CATEGORIES } from '@/lib/massage-types';
import { partnerService } from '@/lib/partner-service';
import { useLanguage } from '@/lib/language-context';
import BrandButton from '@/components/BrandButton';
import BrandLoader from '@/components/BrandLoader';
import InlineLoader from '@/components/InlineLoader';

// Import modular components
import OnboardingVideoBackground from '@/components/OnboardingVideoBackground';
import OnboardingFormContainer from '@/components/OnboardingFormContainer';
import OnboardingStepper from '@/components/OnboardingStepper';
import OnboardingStep1 from '@/components/OnboardingStep1';
import OnboardingStep2 from '@/components/OnboardingStep2';
import OnboardingStep3 from '@/components/OnboardingStep3';
import OnboardingNavigation from '@/components/OnboardingNavigation';

interface OnboardingData {
    // Step 1: Personal & Account Details
    fullName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;

    // Step 2: Professional Showcase
    profilePicture: File | null;
    professionalTitle: string;
    aboutMe: string;
    servicesOffered: MassageCategory[];

    // Step 3: Practice Details
    primaryServiceCity: string;
    serviceAreas: string[];
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
}

export default function OnboardingPage() {
    const router = useRouter();
    const { t } = useLanguage();
    const [activeStep, setActiveStep] = useState(1); // Start at Step 1
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);

    const [formData, setFormData] = useState<OnboardingData>({
        // Step 1
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',

        // Step 2
        profilePicture: null,
        professionalTitle: '',
        aboutMe: '',
        servicesOffered: [],

        // Step 3
        primaryServiceCity: '',
        serviceAreas: [],
        pricing: {},
        availability: {
            monday: { morning: false, afternoon: false, evening: false },
            tuesday: { morning: false, afternoon: false, evening: false },
            wednesday: { morning: false, afternoon: false, evening: false },
            thursday: { morning: false, afternoon: false, evening: false },
            friday: { morning: false, afternoon: false, evening: false },
            saturday: { morning: false, afternoon: false, evening: false },
            sunday: { morning: false, afternoon: false, evening: false }
        }
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Validation functions - memoized to prevent recreation on every render
    const validateStep1 = useCallback(() => {
        const newErrors: Record<string, string> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = t('validation.fullname.required');
        }

        if (!formData.email.trim()) {
            newErrors.email = t('validation.email.required');
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                newErrors.email = t('validation.email.invalid');
            }
        }

        if (!formData.phone.trim()) {
            newErrors.phone = t('validation.phone.required');
        } else {
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            const cleanPhone = formData.phone.replace(/[\s\-\(\)]/g, '');
            if (!phoneRegex.test(cleanPhone)) {
                newErrors.phone = t('validation.phone.invalid');
            }
        }

        if (!formData.password) {
            newErrors.password = t('validation.password.required');
        } else if (formData.password.length < 6) {
            newErrors.password = t('validation.password.min');
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = t('validation.confirmpassword.required');
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = t('validation.confirmpassword.mismatch');
        }

        return newErrors;
    }, [formData, t]);

    const validateStep2 = useCallback(() => {
        const newErrors: Record<string, string> = {};

        if (!formData.professionalTitle.trim()) {
            newErrors.professionalTitle = t('validation.professionaltitle.required');
        }

        if (!formData.aboutMe.trim()) {
            newErrors.aboutMe = t('validation.aboutme.required');
        } else if (formData.aboutMe.trim().length < 50) {
            newErrors.aboutMe = t('validation.aboutme.min');
        }

        if (formData.servicesOffered.length === 0) {
            newErrors.servicesOffered = t('validation.services.required');
        }

        return newErrors;
    }, [formData, t]);

    const validateStep3 = useCallback(() => {
        const newErrors: Record<string, string> = {};

        if (!formData.primaryServiceCity.trim()) {
            newErrors.primaryServiceCity = t('validation.city.required');
        }

        if (formData.serviceAreas.length === 0) {
            newErrors.serviceAreas = t('validation.areas.required');
        }

        // Check if at least one service has pricing
        const hasPricing = Object.values(formData.pricing).some(price => price && price > 0);
        if (!hasPricing) {
            newErrors.pricing = t('validation.pricing.required');
        }

        // Check if at least one time slot is selected
        const hasAvailability = Object.values(formData.availability).some(day =>
            day.morning || day.afternoon || day.evening
        );
        if (!hasAvailability) {
            newErrors.availability = t('validation.availability.required');
        }

        return newErrors;
    }, [formData, t]);

    // Memoized handlers to prevent recreation on every render
    const handleChange = useCallback((field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));

        // Clear error for this field when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    }, [errors]);

    const handleProfilePictureChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, profilePicture: file }));

            // Create preview URL
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfilePicturePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const handlePricingChange = useCallback((service: MassageCategory, price: number) => {
        setFormData(prev => ({
            ...prev,
            pricing: {
                ...prev.pricing,
                [service]: price
            }
        }));
    }, []);

    const handleAvailabilityChange = useCallback((day: string, timeSlot: string, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            availability: {
                ...prev.availability,
                [day]: {
                    ...prev.availability[day],
                    [timeSlot]: checked
                }
            }
        }));
    }, []);

    const handleNext = useCallback(() => {
        let newErrors: Record<string, string> = {};

        if (activeStep === 1) {
            newErrors = { ...validateStep1(), ...validateStep2() };
        } else if (activeStep === 2) {
            newErrors = validateStep3();
        }

        if (Object.keys(newErrors).length === 0) {
            setActiveStep(prev => prev + 1);
            setErrors({});
        } else {
            setErrors(newErrors);
        }
    }, [activeStep, validateStep1, validateStep2, validateStep3]);

    const handleBack = useCallback(() => {
        setActiveStep(prev => prev - 1);
        setErrors({});
    }, []);

    const handleSubmit = useCallback(async () => {
        setLoading(true);
        setError('');

        try {
            // Create Firebase Auth user
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            const user = userCredential.user;

            // Step 2: Update display name
            await updateProfile(user, {
                displayName: formData.fullName
            });

            // Step 3: Create Partner document in Partners collection
            await partnerService.createPartner({
                uid: user.uid,
                email: formData.email,
                fullName: formData.fullName,
                phone: formData.phone,
                role: UserRole.MASSAGE_PROVIDER,
                // Include all collected data (some may be empty if user skipped steps)
                professionalTitle: formData.professionalTitle || '',
                aboutMe: formData.aboutMe || '',
                servicesOffered: formData.servicesOffered || [],
                primaryServiceCity: formData.primaryServiceCity || '',
                serviceAreas: formData.serviceAreas || [],
                pricing: formData.pricing || {},
                availability: formData.availability || {},
                profilePictureUrl: profilePicturePreview || undefined
            });

            setSuccess(true);
            setTimeout(() => {
                router.push('/dashboard');
            }, 2000);
        } catch (error: any) {
            console.error('Error creating account:', error);
            setError(error.message || 'Failed to create account. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [formData, profilePicturePreview, router]);

    const handleCreateLater = useCallback(async () => {
        setLoading(true);
        setError('');

        try {
            // Create Firebase Auth user with only basic info
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            const user = userCredential.user;

            // Update display name
            await updateProfile(user, {
                displayName: formData.fullName
            });

            // Create minimal Partner document with only required fields
            await partnerService.createPartner({
                uid: user.uid,
                email: formData.email,
                fullName: formData.fullName,
                phone: formData.phone,
                role: UserRole.MASSAGE_PROVIDER,
                // Empty optional fields - user can complete later
                professionalTitle: '',
                aboutMe: '',
                servicesOffered: [],
                primaryServiceCity: '',
                serviceAreas: [],
                pricing: {},
                availability: {},
                profilePictureUrl: undefined
            });

            setSuccess(true);
            setTimeout(() => {
                router.push('/dashboard');
            }, 2000);
        } catch (error: any) {
            console.error('Error creating account:', error);
            setError(error.message || 'Failed to create account. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [formData, router]);

    // Memoized computed value to prevent recalculation on every render
    const canProceed = useMemo(() => {
        if (activeStep === 1) {
            const step1Errors = validateStep1();
            const step2Errors = validateStep2();
            return Object.keys(step1Errors).length === 0 && Object.keys(step2Errors).length === 0;
        } else if (activeStep === 2) {
            const step3Errors = validateStep3();
            return Object.keys(step3Errors).length === 0;
        }
        return false;
    }, [activeStep, validateStep1, validateStep2, validateStep3]);

    // Memoized step 3 form data to prevent recreation on every render
    const step3FormData = useMemo(() => ({
        primaryServiceCity: formData.primaryServiceCity,
        serviceAreas: formData.serviceAreas,
        servicesOffered: formData.servicesOffered,
        pricing: formData.pricing,
        availability: formData.availability
    }), [formData.primaryServiceCity, formData.serviceAreas, formData.servicesOffered, formData.pricing, formData.availability]);

    if (success) {
        return (
            <Box sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                color: 'white'
            }}>
                <Box sx={{ textAlign: 'center' }}>
                    <BrandLoader />
                    <Typography variant="h5" sx={{ mt: 3, fontWeight: 600 }}>
                        {t('partner.account.created')}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1, opacity: 0.8 }}>
                        {t('redirecting.to.dashboard')}
                    </Typography>
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', position: 'relative' }}>
            {/* Video Background - Separate Component */}
            <OnboardingVideoBackground />

            {/* Main Content Container with Filter Background */}
            <Box sx={{
                position: 'relative',
                zIndex: 30,
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <OnboardingFormContainer>
                    {/* Enhanced Header with Better Composition */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                    >
                        <Box sx={{
                            textAlign: 'center',
                            mb: 6,
                            maxWidth: '900px',
                            mx: 'auto',
                            px: 2
                        }}>
                            {/* Rocket Icon */}
                            <Box sx={{ mb: 3 }}>
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.9,
                                        type: 'spring',
                                        stiffness: 200
                                    }}
                                >
                                    <Box sx={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mx: 'auto',
                                        boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                                        backdropFilter: 'blur(10px)'
                                    }}>
                                        <Typography sx={{ fontSize: '2.5rem' }}>🚀</Typography>
                                    </Box>
                                </motion.div>
                            </Box>

                            {/* Main Title */}
                            <Typography
                                variant="h2"
                                sx={{
                                    background: 'linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontWeight: 800,
                                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                                    textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                                    letterSpacing: '-0.02em',
                                    mb: 3,
                                    lineHeight: 1.2
                                }}
                            >
                                {t('join.thousands.professionals')}
                            </Typography>

                            {/* Subtitle with Enhanced Typography */}
                            <Typography
                                variant="h5"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.9)',
                                    fontWeight: 500,
                                    fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.4rem' },
                                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                                    letterSpacing: '0.01em',
                                    lineHeight: 1.4,
                                    mb: 2
                                }}
                            >
                                {t('complete.profile.steps')}
                                <motion.span
                                    style={{
                                        background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        fontWeight: 700,
                                        display: 'inline-block',
                                        marginLeft: '8px'
                                    }}
                                    animate={{
                                        scale: [1, 1.05, 1],
                                        opacity: [1, 0.8, 1]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: 'easeInOut'
                                    }}
                                >
                                    {t('success')}
                                </motion.span>
                            </Typography>

                            {/* Additional Context */}
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'rgba(255, 255, 255, 0.75)',
                                    fontWeight: 400,
                                    fontSize: { xs: '0.9rem', sm: '1rem' },
                                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)',
                                    maxWidth: '600px',
                                    mx: 'auto',
                                    lineHeight: 1.5
                                }}
                            >
                                Join our community of wellness professionals and start building your successful practice today
                            </Typography>
                        </Box>
                    </motion.div>

                    {/* Stepper - Separate Component */}
                    <OnboardingStepper activeStep={activeStep} />

                    {/* Form Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <Box sx={{
                            p: { xs: 4, sm: 5, md: 6 },
                            position: 'relative'
                        }}>
                            <AnimatePresence mode="wait">
                                {activeStep === 1 && (
                                    <OnboardingStep1
                                        formData={formData}
                                        errors={errors}
                                        handleChange={handleChange}
                                    />
                                )}
                                {activeStep === 2 && (
                                    <OnboardingStep2
                                        formData={formData}
                                        errors={errors}
                                        handleChange={handleChange}
                                        handleProfilePictureChange={handleProfilePictureChange}
                                        profilePicturePreview={profilePicturePreview}
                                    />
                                )}
                                {activeStep === 3 && (
                                    <OnboardingStep3
                                        formData={step3FormData}
                                        errors={errors}
                                        handleChange={handleChange}
                                        handlePricingChange={handlePricingChange}
                                        handleAvailabilityChange={handleAvailabilityChange}
                                    />
                                )}
                            </AnimatePresence>
                        </Box>
                    </motion.div>

                    {/* Navigation - Separate Component */}
                    <OnboardingNavigation
                        activeStep={activeStep}
                        onNext={handleNext}
                        onBack={handleBack}
                        onSubmit={handleSubmit}
                        onCreateLater={handleCreateLater}
                        loading={loading}
                        canProceed={canProceed}
                    />

                    {/* Error Alert */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <Alert
                                severity="error"
                                sx={{
                                    mt: 3,
                                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(239, 68, 68, 0.3)',
                                    color: '#ef4444'
                                }}
                            >
                                {error}
                            </Alert>
                        </motion.div>
                    )}
                </OnboardingFormContainer>
            </Box>
        </Box>
    );
}
