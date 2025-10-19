'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useLanguage } from '@/lib/language-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
    Grid,
    Container,
    Chip,
    Rating,
    TextField,
    InputAdornment,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Pagination,
    Alert,
    CircularProgress
} from '@mui/material';
import {
    Search as SearchIcon,
    Spa as SpaIcon,
    FilterList as FilterIcon,
    ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { massageServiceManager } from '@/lib/massage-service';
import { MassageService, MASSAGE_CATEGORIES } from '@/lib/massage-types';
import { UserRole } from '@/lib/user-roles';
import BrandButton from '@/components/BrandButton';
import BrandLoader from '@/components/BrandLoader';

import Footer from '@/components/Footer';

const ITEMS_PER_PAGE = 9;

export default function ServicesPage() {
    const { user, userRole } = useAuth();
    const { t } = useLanguage();
    const router = useRouter();
    const [services, setServices] = useState<MassageService[]>([]);
    const [filteredServices, setFilteredServices] = useState<MassageService[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [priceRange, setPriceRange] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [error, setError] = useState('');

    useEffect(() => {
        loadServices();
    }, []);

    useEffect(() => {
        filterServices();
    }, [searchTerm, selectedCategory, priceRange, services]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, priceRange]);

    const loadServices = async () => {
        try {
            setLoading(true);
            const allServices = await massageServiceManager.getServices();
            setServices(allServices);
        } catch (error) {
            console.error('Error loading services:', error);
            setError(t('failed.to.load'));
        } finally {
            setLoading(false);
        }
    };

    const filterServices = () => {
        let filtered = services;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(service =>
                service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                service.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(service => service.category === selectedCategory);
        }

        // Filter by price range
        if (priceRange !== 'all') {
            switch (priceRange) {
                case 'under-50':
                    filtered = filtered.filter(service => service.price < 50);
                    break;
                case '50-100':
                    filtered = filtered.filter(service => service.price >= 50 && service.price <= 100);
                    break;
                case '100-150':
                    filtered = filtered.filter(service => service.price > 100 && service.price <= 150);
                    break;
                case 'over-150':
                    filtered = filtered.filter(service => service.price > 150);
                    break;
            }
        }

        setFilteredServices(filtered);
    };

    const handleServiceClick = (service: MassageService) => {
        if (user && (userRole === UserRole.CUSTOMER || userRole === UserRole.ADMIN)) {
            router.push(`/book-appointment/${service.id}`);
        } else if (user && userRole === UserRole.MASSAGE_PROVIDER) {
            router.push(`/manage-services`);
        } else {
            router.push('/auth');
        }
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'swedish': return '🧘‍♀️';
            case 'deep-tissue': return '💪';
            case 'sports': return '🏃‍♂️';
            case 'hot-stone': return '🔥';
            case 'aromatherapy': return '🌸';
            case 'reflexology': return '🦶';
            case 'thai': return '🙏';
            case 'shiatsu': return '👐';
            case 'couple': return '💕';
            case 'prenatal': return '🤱';
            case 'therapeutic': return '🏥';
            case 'relaxation': return '😌';
            default: return '💆‍♀️';
        }
    };

    const getPaginatedServices = () => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredServices.slice(startIndex, endIndex);
    };

    const totalPages = Math.ceil(filteredServices.length / ITEMS_PER_PAGE);

    if (loading) {
        return <BrandLoader fullScreen message="Loading massage services..." />;
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>


            {/* Hero Section */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #06B6D4 100%)',
                    color: 'white',
                    py: 8,
                    textAlign: 'center',
                    position: 'relative',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)',
                        zIndex: 1
                    }
                }}
            >
                <Container maxWidth="lg">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Typography
                            variant="h2"
                            component="h1"
                            sx={{
                                fontWeight: 700,
                                mb: 2,
                                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                            }}
                        >
                            {t('our.massage.services')}
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                opacity: 0.9,
                                maxWidth: '600px',
                                mx: 'auto',
                                lineHeight: 1.6
                            }}
                        >
                            {t('discover.therapies')}
                        </Typography>
                    </motion.div>
                </Container>
            </Box>

            {/* Search and Filters */}
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Card sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 3 }}>
                        <Grid container spacing={3} alignItems="center">
                            <Grid size={{ xs: 12, md: 4 }}>
                                <TextField
                                    fullWidth
                                    placeholder={t('search.services')}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                        }
                                    }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, md: 4 }}>
                                <FormControl fullWidth>
                                    <InputLabel>{t('category')}</InputLabel>
                                    <Select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        label={t('category')}
                                    >
                                        <MenuItem value="all">{t('all.categories')}</MenuItem>
                                        {MASSAGE_CATEGORIES.map((category) => (
                                            <MenuItem key={category.value} value={category.value}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <span>{category.icon}</span>
                                                    {category.label}
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid size={{ xs: 12, md: 4 }}>
                                <FormControl fullWidth>
                                    <InputLabel>{t('price.range')}</InputLabel>
                                    <Select
                                        value={priceRange}
                                        onChange={(e) => setPriceRange(e.target.value)}
                                        label={t('price.range')}
                                    >
                                        <MenuItem value="all">{t('all.prices')}</MenuItem>
                                        <MenuItem value="under-50">{t('under.50')}</MenuItem>
                                        <MenuItem value="50-100">{t('50.100')}</MenuItem>
                                        <MenuItem value="100-150">{t('100.150')}</MenuItem>
                                        <MenuItem value="over-150">{t('over.150')}</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Card>
                </motion.div>

                {/* Results Summary */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" color="text.secondary">
                        {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
                    </Typography>
                    {!user && (
                        <Button
                            component={Link}
                            href="/auth"
                            variant="outlined"
                            startIcon={<SpaIcon />}
                        >
                            {t('sign.in.to.book')}
                        </Button>
                    )}
                </Box>

                {/* Services Grid */}
                {error ? (
                    <Alert severity="error" sx={{ mb: 3 }}>
                        {error}
                    </Alert>
                ) : filteredServices.length === 0 ? (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <SpaIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                            {t('no.services')}
                        </Typography>
                        <Typography color="text.secondary" sx={{ mb: 3 }}>
                            {t('try.adjusting')}
                        </Typography>
                        <Button
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedCategory('all');
                                setPriceRange('all');
                            }}
                            variant="outlined"
                        >
                            {t('clear.filters')}
                        </Button>
                    </Box>
                ) : (
                    <>
                        <Grid container spacing={3}>
                            {getPaginatedServices().map((service, index) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={service.id}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Card
                                            sx={{
                                                height: '100%',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                '&:hover': {
                                                    transform: 'translateY(-8px)',
                                                    boxShadow: 6,
                                                },
                                                borderRadius: 3,
                                                overflow: 'hidden'
                                            }}
                                            onClick={() => handleServiceClick(service)}
                                        >
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={service.imageUrl || '/images/stock_photo_desktop.png'}
                                                alt={service.name}
                                                sx={{ objectFit: 'cover' }}
                                            />
                                            <CardContent sx={{ p: 3 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600, flex: 1 }}>
                                                        {service.name}
                                                    </Typography>
                                                    <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                                                        ${service.price}
                                                    </Typography>
                                                </Box>

                                                <Typography color="text.secondary" sx={{ mb: 2, minHeight: '3em' }}>
                                                    {service.description}
                                                </Typography>

                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                                                    <Chip
                                                        label={getCategoryIcon(service.category) + ' ' + MASSAGE_CATEGORIES.find(c => c.value === service.category)?.label}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{ fontSize: '0.75rem' }}
                                                    />
                                                    <Typography variant="body2" color="text.secondary">
                                                        {service.duration} {t('min')}
                                                    </Typography>
                                                </Box>

                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <Rating value={4.8} readOnly size="small" />
                                                    <Button
                                                        endIcon={<ArrowForwardIcon />}
                                                        sx={{ color: 'primary.main' }}
                                                    >
                                                        {user ? t('book.now') : t('learn.more')}
                                                    </Button>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={(event, page) => setCurrentPage(page)}
                                    color="primary"
                                    size="large"
                                />
                            </Box>
                        )}
                    </>
                )}
            </Container>

            <Footer />
        </Box>
    );
}
