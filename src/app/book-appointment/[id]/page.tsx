'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
    Container,
    Chip,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    CircularProgress,
    Stepper,
    Step,
    StepLabel,
    Paper,
    Divider
} from '@mui/material';
import {
    CalendarMonth as CalendarIcon,
    AccessTime as TimeIcon,
    Person as PersonIcon,
    ArrowBack as ArrowBackIcon,
    CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { massageServiceManager } from '@/lib/massage-service';
import { appointmentService, CreateAppointmentData } from '@/lib/appointment-service';
import { MassageService, MASSAGE_CATEGORIES } from '@/lib/massage-types';
import { TimeSlot, generateTimeSlots } from '@/lib/appointment-types';
import { UserRole } from '@/lib/user-roles';
import RoleGuard from '@/components/RoleGuard';
import BrandButton from '@/components/BrandButton';
import BrandLoader from '@/components/BrandLoader';
import InlineLoader from '@/components/InlineLoader';

const steps = ['Select Date & Time', 'Review & Confirm', 'Booking Complete'];

export default function BookAppointmentPage() {
    const { user, userRole } = useAuth();
    const router = useRouter();
    const params = useParams();
    const serviceId = params.id as string;

    const [service, setService] = useState<MassageService | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = useState(0);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
    const [customerNotes, setCustomerNotes] = useState('');
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (serviceId) {
            loadService();
        }
    }, [serviceId]);

    useEffect(() => {
        if (selectedDate && service) {
            generateAvailableSlots();
        }
    }, [selectedDate, service]);

    const loadService = async () => {
        try {
            setLoading(true);
            const serviceData = await massageServiceManager.getServiceById(serviceId);
            if (serviceData) {
                setService(serviceData);
            } else {
                setError('Service not found');
            }
        } catch (error) {
            console.error('Error loading service:', error);
            setError('Failed to load service');
        } finally {
            setLoading(false);
        }
    };

    const generateAvailableSlots = () => {
        if (!selectedDate || !service) return;

        // Generate time slots from 9 AM to 6 PM
        const slots = generateTimeSlots(9, 18, service.duration);
        setAvailableSlots(slots);
    };

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        setSelectedTime('');
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
    };

    const handleNext = () => {
        if (activeStep === 0 && (!selectedDate || !selectedTime)) {
            setError('Please select both date and time');
            return;
        }

        if (activeStep === steps.length - 1) {
            return;
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setError('');
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = async () => {
        if (!service || !selectedDate || !selectedTime || !user) return;

        try {
            setLoading(true);

            // Calculate end time based on service duration
            const startTime = selectedTime;
            const startHour = parseInt(startTime.split(':')[0]);
            const startMinute = parseInt(startTime.split(':')[1]);
            const endHour = startHour + Math.floor(service.duration / 60);
            const endMinute = startMinute + (service.duration % 60);
            const endTime = `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;

            const appointmentData: CreateAppointmentData = {
                customerId: user.uid,
                providerId: service.providerId,
                serviceId: service.id!,
                serviceName: service.name,
                serviceDuration: service.duration,
                servicePrice: service.price,
                appointmentDate: selectedDate,
                startTime,
                endTime,
                customerNotes,
                totalPrice: service.price
            };

            await appointmentService.bookAppointment(appointmentData);
            setBookingSuccess(true);
            setActiveStep(2);
        } catch (error: any) {
            console.error('Error booking appointment:', error);
            setError(error.message || 'Failed to book appointment');
        } finally {
            setLoading(false);
        }
    };

    const getDateOptions = () => {
        const dates = [];
        const today = new Date();

        for (let i = 0; i < 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push(date);
        }

        return dates;
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    };

    const isDateDisabled = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date < today;
    };

    if (loading && !service) {
        return <BrandLoader fullScreen message="Loading service details..." />;
    }

    if (!service) {
        return (
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error || 'Service not found'}
                </Alert>
                <Button component={Link} href="/" startIcon={<ArrowBackIcon />}>
                    Back to Home
                </Button>
            </Container>
        );
    }

    return (
        <RoleGuard requiredRole={UserRole.CUSTOMER}>
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 3 }}>
                <Container maxWidth="md">
                    {/* Header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                        <Button
                            component={Link}
                            href="/"
                            startIcon={<ArrowBackIcon />}
                            sx={{ mr: 2 }}
                        >
                            Back to Services
                        </Button>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                            Book Appointment
                        </Typography>
                    </Box>

                    {/* Service Summary */}
                    <Card sx={{ mb: 4, borderRadius: 3 }}>
                        <CardContent sx={{ p: 3 }}>
                            <Grid container spacing={3} alignItems="center">
                                <Grid size={{ xs: 12, md: 8 }}>
                                    <Typography variant="h5" component="h2" sx={{ fontWeight: 600, mb: 1 }}>
                                        {service.name}
                                    </Typography>
                                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                                        {service.description}
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                        <Chip
                                            icon={<TimeIcon />}
                                            label={`${service.duration} minutes`}
                                            variant="outlined"
                                        />
                                        <Chip
                                            icon={<PersonIcon />}
                                            label={MASSAGE_CATEGORIES.find(c => c.value === service.category)?.label}
                                            variant="outlined"
                                        />
                                    </Box>
                                </Grid>
                                <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: 'center' }}>
                                    <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                                        ${service.price}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        per session
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    {/* Stepper */}
                    <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
                        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        {/* Step 1: Date & Time Selection */}
                        {activeStep === 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Typography variant="h6" sx={{ mb: 3 }}>
                                    Select Date & Time
                                </Typography>

                                <Grid container spacing={3}>
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                                            Choose Date
                                        </Typography>
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                            {getDateOptions().map((date) => (
                                                <Button
                                                    key={date.toISOString()}
                                                    variant={selectedDate?.toDateString() === date.toDateString() ? 'contained' : 'outlined'}
                                                    onClick={() => handleDateChange(date)}
                                                    disabled={isDateDisabled(date)}
                                                    sx={{ minWidth: 'auto', px: 2 }}
                                                >
                                                    {formatDate(date)}
                                                </Button>
                                            ))}
                                        </Box>
                                    </Grid>

                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                                            Choose Time
                                        </Typography>
                                        {selectedDate ? (
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                {availableSlots.map((slot) => (
                                                    <Button
                                                        key={slot.startTime}
                                                        variant={selectedTime === slot.startTime ? 'contained' : 'outlined'}
                                                        onClick={() => handleTimeSelect(slot.startTime)}
                                                        disabled={!slot.isAvailable}
                                                        sx={{ minWidth: 'auto', px: 2 }}
                                                    >
                                                        {slot.startTime}
                                                    </Button>
                                                ))}
                                            </Box>
                                        ) : (
                                            <Typography color="text.secondary">
                                                Please select a date first
                                            </Typography>
                                        )}
                                    </Grid>

                                    <Grid size={{ xs: 12 }}>
                                        <TextField
                                            fullWidth
                                            label="Special Requests or Notes (optional)"
                                            value={customerNotes}
                                            onChange={(e) => setCustomerNotes(e.target.value)}
                                            multiline
                                            rows={3}
                                            placeholder="Any special requests, allergies, or notes for your therapist..."
                                        />
                                    </Grid>
                                </Grid>
                            </motion.div>
                        )}

                        {/* Step 2: Review & Confirm */}
                        {activeStep === 1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Typography variant="h6" sx={{ mb: 3 }}>
                                    Review Your Booking
                                </Typography>

                                <Card variant="outlined" sx={{ p: 3, mb: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid size={{ xs: 6 }}>
                                            <Typography variant="body2" color="text.secondary">Service:</Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 600 }}>{service.name}</Typography>
                                        </Grid>
                                        <Grid size={{ xs: 6 }}>
                                            <Typography variant="body2" color="text.secondary">Duration:</Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 600 }}>{service.duration} minutes</Typography>
                                        </Grid>
                                        <Grid size={{ xs: 6 }}>
                                            <Typography variant="body2" color="text.secondary">Date:</Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                {selectedDate?.toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </Typography>
                                        </Grid>
                                        <Grid size={{ xs: 6 }}>
                                            <Typography variant="body2" color="text.secondary">Time:</Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 600 }}>{selectedTime}</Typography>
                                        </Grid>
                                        <Grid size={{ xs: 12 }}>
                                            <Typography variant="body2" color="text.secondary">Total Price:</Typography>
                                            <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                                                ${service.price}
                                            </Typography>
                                        </Grid>
                                        {customerNotes && (
                                            <Grid size={{ xs: 12 }}>
                                                <Typography variant="body2" color="text.secondary">Notes:</Typography>
                                                <Typography variant="body1">{customerNotes}</Typography>
                                            </Grid>
                                        )}
                                    </Grid>
                                </Card>
                            </motion.div>
                        )}

                        {/* Step 3: Booking Complete */}
                        {activeStep === 2 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Box sx={{ textAlign: 'center', py: 4 }}>
                                    <CheckCircleIcon sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
                                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                                        Booking Confirmed!
                                    </Typography>
                                    <Typography color="text.secondary" sx={{ mb: 3 }}>
                                        Your appointment has been successfully booked. You will receive a confirmation email shortly.
                                    </Typography>
                                    <Button
                                        component={Link}
                                        href="/dashboard"
                                        variant="contained"
                                        size="large"
                                    >
                                        View My Appointments
                                    </Button>
                                </Box>
                            </motion.div>
                        )}
                    </Paper>

                    {/* Navigation Buttons */}
                    {activeStep < 2 && (
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                            >
                                Back
                            </Button>

                            <Box sx={{ display: 'flex', gap: 2 }}>
                                {activeStep === steps.length - 2 ? (
                                    <BrandButton
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        startIcon={loading ? <InlineLoader size={20} /> : undefined}
                                    >
                                        {loading ? 'Booking...' : 'Confirm Booking'}
                                    </BrandButton>
                                ) : (
                                    <BrandButton onClick={handleNext}>
                                        Next
                                    </BrandButton>
                                )}
                            </Box>
                        </Box>
                    )}
                </Container>
            </Box>
        </RoleGuard>
    );
}
