'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
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
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Switch,
    FormControlLabel,
    Alert,
    CircularProgress,
    Fab
} from '@mui/material';
import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Spa as SpaIcon,
    ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { massageServiceManager, CreateMassageServiceData } from '@/lib/massage-service';
import { MassageService, MASSAGE_CATEGORIES } from '@/lib/massage-types';
import { UserRole } from '@/lib/user-roles';
import RoleGuard from '@/components/RoleGuard';
import BrandButton from '@/components/BrandButton';
import BrandLoader from '@/components/BrandLoader';
import InlineLoader from '@/components/InlineLoader';

export default function ManageServicesPage() {
    const { user, userRole } = useAuth();
    const router = useRouter();
    const [services, setServices] = useState<MassageService[]>([]);
    const [loading, setLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [editingService, setEditingService] = useState<MassageService | null>(null);
    const [formData, setFormData] = useState<CreateMassageServiceData>({
        name: '',
        description: '',
        duration: 60,
        price: 0,
        category: 'swedish' as any,
        imageUrl: '',
        isActive: true,
        providerId: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (user) {
            loadServices();
        }
    }, [user]);

    const loadServices = async () => {
        try {
            setLoading(true);
            const userServices = await massageServiceManager.getServicesByProvider(user!.uid);
            setServices(userServices);
        } catch (error) {
            console.error('Error loading services:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenDialog = (service?: MassageService) => {
        if (service) {
            setEditingService(service);
            setFormData({
                name: service.name,
                description: service.description,
                duration: service.duration,
                price: service.price,
                category: service.category,
                imageUrl: service.imageUrl || '',
                isActive: service.isActive,
                providerId: service.providerId
            });
        } else {
            setEditingService(null);
            setFormData({
                name: '',
                description: '',
                duration: 60,
                price: 0,
                category: 'swedish' as any,
                imageUrl: '',
                isActive: true,
                providerId: user!.uid
            });
        }
        setErrors({});
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setEditingService(null);
        setFormData({
            name: '',
            description: '',
            duration: 60,
            price: 0,
            category: 'swedish' as any,
            imageUrl: '',
            isActive: true,
            providerId: ''
        });
        setErrors({});
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Service name is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        if (formData.duration <= 0) {
            newErrors.duration = 'Duration must be greater than 0';
        }

        if (formData.price <= 0) {
            newErrors.price = 'Price must be greater than 0';
        }

        if (!formData.category) {
            newErrors.category = 'Category is required';
        }

        return newErrors;
    };

    const handleSubmit = async () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            if (editingService) {
                await massageServiceManager.updateService(editingService.id!, formData);
            } else {
                await massageServiceManager.addService({
                    ...formData,
                    providerId: user!.uid
                });
            }

            handleCloseDialog();
            loadServices();
        } catch (error: any) {
            console.error('Error saving service:', error);
            setErrors({ submit: error.message || 'Failed to save service' });
        }
    };

    const handleDelete = async (serviceId: string) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await massageServiceManager.deleteService(serviceId);
                loadServices();
            } catch (error) {
                console.error('Error deleting service:', error);
            }
        }
    };

    const getCategoryLabel = (category: string) => {
        return MASSAGE_CATEGORIES.find(cat => cat.value === category)?.label || category;
    };

    if (loading) {
        return <BrandLoader fullScreen message="Loading your services..." />;
    }

    return (
        <RoleGuard requiredRole={UserRole.MASSAGE_PROVIDER}>
            <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 3 }}>
                <Container maxWidth="lg">
                    {/* Header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                        <Button
                            component={Link}
                            href="/dashboard"
                            startIcon={<ArrowBackIcon />}
                            sx={{ mr: 2 }}
                        >
                            Back to Dashboard
                        </Button>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
                            Manage Your Services
                        </Typography>
                    </Box>

                    {/* Add Service Button */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                        <Typography variant="h6" color="text.secondary">
                            {services.length} service{services.length !== 1 ? 's' : ''} available
                        </Typography>
                        <BrandButton
                            onClick={() => handleOpenDialog()}
                            startIcon={<AddIcon />}
                        >
                            Add New Service
                        </BrandButton>
                    </Box>

                    {/* Services Grid */}
                    {services.length === 0 ? (
                        <Card sx={{ p: 6, textAlign: 'center' }}>
                            <SpaIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                                No services yet
                            </Typography>
                            <Typography color="text.secondary" sx={{ mb: 3 }}>
                                Start by adding your first massage service to attract customers
                            </Typography>
                            <BrandButton
                                onClick={() => handleOpenDialog()}
                                startIcon={<AddIcon />}
                            >
                                Add Your First Service
                            </BrandButton>
                        </Card>
                    ) : (
                        <Grid container spacing={3}>
                            {services.map((service, index) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={service.id}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Card sx={{ height: '100%', position: 'relative' }}>
                                            <CardContent sx={{ p: 3 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600, flex: 1 }}>
                                                        {service.name}
                                                    </Typography>
                                                    <Chip
                                                        label={service.isActive ? 'Active' : 'Inactive'}
                                                        color={service.isActive ? 'success' : 'default'}
                                                        size="small"
                                                    />
                                                </Box>

                                                <Typography color="text.secondary" sx={{ mb: 2, minHeight: '3em' }}>
                                                    {service.description}
                                                </Typography>

                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                                    <Chip
                                                        label={getCategoryLabel(service.category)}
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {service.duration} min
                                                    </Typography>
                                                </Box>

                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                                    <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                                                        ${service.price}
                                                    </Typography>
                                                    <Box>
                                                        <IconButton
                                                            onClick={() => handleOpenDialog(service)}
                                                            size="small"
                                                            color="primary"
                                                        >
                                                            <EditIcon />
                                                        </IconButton>
                                                        <IconButton
                                                            onClick={() => handleDelete(service.id!)}
                                                            size="small"
                                                            color="error"
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Box>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Container>

                {/* Add/Edit Service Dialog */}
                <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                    <DialogTitle>
                        {editingService ? 'Edit Service' : 'Add New Service'}
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{ pt: 2 }}>
                            {errors.submit && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {errors.submit}
                                </Alert>
                            )}

                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        label="Service Name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        error={!!errors.name}
                                        helperText={errors.name}
                                        required
                                    />
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        error={!!errors.description}
                                        helperText={errors.description}
                                        multiline
                                        rows={3}
                                        required
                                    />
                                </Grid>

                                <Grid size={{ xs: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Duration (minutes)"
                                        type="number"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                                        error={!!errors.duration}
                                        helperText={errors.duration}
                                        required
                                    />
                                </Grid>

                                <Grid size={{ xs: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Price ($)"
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                                        error={!!errors.price}
                                        helperText={errors.price}
                                        required
                                    />
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <FormControl fullWidth required>
                                        <InputLabel>Category</InputLabel>
                                        <Select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                                            error={!!errors.category}
                                            label="Category"
                                        >
                                            {MASSAGE_CATEGORIES.map((category) => (
                                                <MenuItem key={category.value} value={category.value}>
                                                    {category.label}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        label="Image URL (optional)"
                                        value={formData.imageUrl}
                                        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </Grid>

                                <Grid size={{ xs: 12 }}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={formData.isActive}
                                                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                            />
                                        }
                                        label="Service is active and visible to customers"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <BrandButton onClick={handleSubmit}>
                            {editingService ? 'Update Service' : 'Add Service'}
                        </BrandButton>
                    </DialogActions>
                </Dialog>

                {/* Floating Action Button for Mobile */}
                <Fab
                    color="primary"
                    aria-label="add service"
                    onClick={() => handleOpenDialog()}
                    sx={{
                        position: 'fixed',
                        bottom: 16,
                        right: 16,
                        display: { xs: 'flex', md: 'none' }
                    }}
                >
                    <AddIcon />
                </Fab>
            </Box>
        </RoleGuard>
    );
}
