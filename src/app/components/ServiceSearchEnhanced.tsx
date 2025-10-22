'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  InputAdornment,
  Chip,
  IconButton,
  Fade,
  Slide,
  Container,
  Stack,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  Spa as SpaIcon,
  LocalActivity as ActivityIcon,
  Favorite as FavoriteIcon,
  AccessTime as TimeIcon,
  Star as StarIcon,
  TrendingUp as TrendingIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';
import BeautifulCardEnhanced from '@/components/BeautifulCardEnhanced';
import OnboardingVideoBackground from '@/components/OnboardingVideoBackground';

// Enhanced mock service data with more details
const mockServices = [
  {
    id: 1,
    name: 'Swedish Massage',
    description: 'Classic relaxation massage with long, flowing strokes to reduce muscle tension and promote deep relaxation.',
    duration: '60 min',
    price: '$80',
    category: 'Relaxation',
    rating: 4.8,
    reviews: 124,
    image: '/images/swedish-massage.jpg',
    trending: true,
    featured: true,
  },
  {
    id: 2,
    name: 'Deep Tissue Massage',
    description: 'Intense massage targeting deeper muscle layers to relieve chronic pain and muscle tension.',
    duration: '90 min',
    price: '$120',
    category: 'Therapeutic',
    rating: 4.9,
    reviews: 89,
    image: '/images/deep-tissue.jpg',
    trending: false,
    featured: true,
  },
  {
    id: 3,
    name: 'Hot Stone Massage',
    description: 'Heated stones combined with massage techniques for ultimate relaxation and muscle relief.',
    duration: '75 min',
    price: '$100',
    category: 'Relaxation',
    rating: 4.7,
    reviews: 156,
    image: '/images/hot-stone.jpg',
    trending: true,
    featured: false,
  },
  {
    id: 4,
    name: 'Aromatherapy Massage',
    description: 'Essential oils enhance the massage experience with therapeutic scents and healing properties.',
    duration: '60 min',
    price: '$90',
    category: 'Wellness',
    rating: 4.6,
    reviews: 98,
    image: '/images/aromatherapy.jpg',
    trending: false,
    featured: false,
  },
  {
    id: 5,
    name: 'Sports Massage',
    description: 'Specialized massage for athletes to improve performance, prevent injuries, and aid recovery.',
    duration: '45 min',
    price: '$70',
    category: 'Sports',
    rating: 4.9,
    reviews: 67,
    image: '/images/sports-massage.jpg',
    trending: true,
    featured: false,
  },
  {
    id: 6,
    name: 'Reflexology',
    description: 'Pressure point therapy focusing on feet and hands to promote overall wellness and balance.',
    duration: '50 min',
    price: '$65',
    category: 'Wellness',
    rating: 4.5,
    reviews: 43,
    image: '/images/reflexology.jpg',
    trending: false,
    featured: false,
  },
];

const categories = ['All', 'Relaxation', 'Therapeutic', 'Wellness', 'Sports'];

export default function ServiceSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredServices, setFilteredServices] = useState(mockServices);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterServices(value, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterServices(searchTerm, category);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setFilteredServices(mockServices);
  };

  const filterServices = (search: string, category: string) => {
    let filtered = mockServices;

    if (search) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(search.toLowerCase()) ||
        service.description.toLowerCase().includes(search.toLowerCase()) ||
        service.category.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== 'All') {
      filtered = filtered.filter(service => service.category === category);
    }

    setFilteredServices(filtered);
  };

  const featuredServices = mockServices.filter(service => service.featured);
  const trendingServices = mockServices.filter(service => service.trending);

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      {/* Enhanced Video Background */}
      <OnboardingVideoBackground />

      {/* Main Content */}
      <Container maxWidth="lg" sx={{
        position: 'relative',
        zIndex: 30,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        py: { xs: 1, sm: 2, md: 3 }
      }}>
        
        {/* Enhanced Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Box sx={{ textAlign: 'center', mb: { xs: 2, sm: 3, md: 4 } }}>
            <Typography
              variant="h1"
              sx={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 800,
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
                textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                letterSpacing: '-0.02em',
                mb: 2,
                lineHeight: 1.1,
              }}
            >
              Welcome to AuraSpa
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 500,
                fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                letterSpacing: '0.3px',
                mb: 4,
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Discover premium wellness and massage therapy services. Find the perfect treatment for your needs.
            </Typography>
          </Box>
        </motion.div>

        {/* Enhanced Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <BeautifulCardEnhanced variant="glass" size="lg" sx={{ mb: 6 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h4"
                sx={{
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontWeight: 700,
                  mb: 1,
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                }}
              >
                Find Your Perfect Service
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '1.1rem',
                }}
              >
                Search from our curated collection of premium wellness services
              </Typography>
            </Box>

            {/* Enhanced Search Bar */}
            <Box sx={{ mb: 4 }}>
              <TextField
                fullWidth
                placeholder="Search for massage services..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleSearch('')}
                        size="small"
                        sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '16px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    fontSize: '1.1rem',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.15)',
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      borderColor: 'rgba(139, 92, 246, 0.6)',
                      boxShadow: '0 0 0 3px rgba(139, 92, 246, 0.1)',
                    },
                  },
                  '& .MuiInputBase-input': {
                    color: 'rgba(255, 255, 255, 0.9)',
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.6)',
                      opacity: 1,
                    },
                  },
                }}
              />
            </Box>

            {/* Enhanced Category Filters */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontWeight: 600,
                  }}
                >
                  Categories
                </Typography>
                <IconButton
                  onClick={() => setShowFilters(!showFilters)}
                  sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                >
                  <FilterIcon />
                </IconButton>
              </Box>

              <AnimatePresence>
                {showFilters && (
                  <Fade in={showFilters}>
                    <Box sx={{ mb: 3 }}>
                      <Button
                        onClick={clearFilters}
                        startIcon={<ClearIcon />}
                        sx={{
                          color: 'rgba(255, 255, 255, 0.7)',
                          textTransform: 'none',
                          fontSize: '0.9rem',
                        }}
                      >
                        Clear Filters
                      </Button>
                    </Box>
                  </Fade>
                )}
              </AnimatePresence>

              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {categories.map((category) => (
                  <motion.div
                    key={category}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Chip
                      label={category}
                      onClick={() => handleCategoryChange(category)}
                      variant={selectedCategory === category ? 'filled' : 'outlined'}
                      sx={{
                        backgroundColor: selectedCategory === category 
                          ? 'rgba(139, 92, 246, 0.8)' 
                          : 'rgba(255, 255, 255, 0.1)',
                        color: 'rgba(255, 255, 255, 0.9)',
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        height: '36px',
                        '&:hover': {
                          backgroundColor: selectedCategory === category 
                            ? 'rgba(139, 92, 246, 0.9)' 
                            : 'rgba(255, 255, 255, 0.2)',
                        },
                      }}
                    />
                  </motion.div>
                ))}
              </Stack>
            </Box>

            {/* Search Results Summary */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.9rem',
                }}
              >
                {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              </Typography>
            </Box>
          </BeautifulCardEnhanced>
        </motion.div>

        {/* Featured Services Section */}
        {featuredServices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Box sx={{ mb: 6 }}>
              <Typography
                variant="h4"
                sx={{
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontWeight: 700,
                  mb: 3,
                  textAlign: 'center',
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                }}
              >
                ⭐ Featured Services
              </Typography>
              
              <Grid container spacing={3}>
                {featuredServices.map((service, index) => (
                  <Grid item xs={12} sm={6} md={4} key={service.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    >
                      <Card
                        sx={{
                          height: '100%',
                          background: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '20px',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <SpaIcon sx={{ color: 'rgba(139, 92, 246, 0.8)', mr: 1 }} />
                            <Typography
                              variant="h6"
                              sx={{
                                color: 'rgba(255, 255, 255, 0.95)',
                                fontWeight: 600,
                                flex: 1,
                              }}
                            >
                              {service.name}
                            </Typography>
                            <Chip
                              label="Featured"
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(255, 193, 7, 0.2)',
                                color: 'rgba(255, 193, 7, 0.9)',
                                fontSize: '0.7rem',
                              }}
                            />
                          </Box>
                          
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'rgba(255, 255, 255, 0.8)',
                              mb: 2,
                              lineHeight: 1.5,
                            }}
                          >
                            {service.description}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <StarIcon sx={{ color: 'rgba(255, 193, 7, 0.8)', fontSize: '1.2rem', mr: 0.5 }} />
                              <Typography
                                variant="body2"
                                sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}
                              >
                                {service.rating}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: 'rgba(255, 255, 255, 0.6)', ml: 1 }}
                              >
                                ({service.reviews})
                              </Typography>
                            </Box>
                            <Typography
                              variant="h6"
                              sx={{
                                color: 'rgba(139, 92, 246, 0.9)',
                                fontWeight: 700,
                              }}
                            >
                              {service.price}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <TimeIcon sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1rem', mr: 0.5 }} />
                              <Typography
                                variant="body2"
                                sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                              >
                                {service.duration}
                              </Typography>
                            </Box>
                            <Chip
                              label={service.category}
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(139, 92, 246, 0.2)',
                                color: 'rgba(139, 92, 246, 0.9)',
                                fontSize: '0.7rem',
                              }}
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </motion.div>
        )}

        {/* All Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h4"
              sx={{
                color: 'rgba(255, 255, 255, 0.95)',
                fontWeight: 700,
                mb: 3,
                textAlign: 'center',
                fontSize: { xs: '1.5rem', sm: '2rem' },
              }}
            >
              All Services
            </Typography>
            
            <Grid container spacing={3}>
              <AnimatePresence>
                {filteredServices.map((service, index) => (
                  <Grid item xs={12} sm={6} md={4} key={service.id}>
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Card
                        sx={{
                          height: '100%',
                          background: 'rgba(255, 255, 255, 0.1)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '20px',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                          },
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <SpaIcon sx={{ color: 'rgba(139, 92, 246, 0.8)', mr: 1 }} />
                            <Typography
                              variant="h6"
                              sx={{
                                color: 'rgba(255, 255, 255, 0.95)',
                                fontWeight: 600,
                                flex: 1,
                              }}
                            >
                              {service.name}
                            </Typography>
                            {service.trending && (
                              <TrendingIcon sx={{ color: 'rgba(255, 193, 7, 0.8)', fontSize: '1.2rem' }} />
                            )}
                          </Box>
                          
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'rgba(255, 255, 255, 0.8)',
                              mb: 2,
                              lineHeight: 1.5,
                            }}
                          >
                            {service.description}
                          </Typography>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <StarIcon sx={{ color: 'rgba(255, 193, 7, 0.8)', fontSize: '1.2rem', mr: 0.5 }} />
                              <Typography
                                variant="body2"
                                sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}
                              >
                                {service.rating}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{ color: 'rgba(255, 255, 255, 0.6)', ml: 1 }}
                              >
                                ({service.reviews})
                              </Typography>
                            </Box>
                            <Typography
                              variant="h6"
                              sx={{
                                color: 'rgba(139, 92, 246, 0.9)',
                                fontWeight: 700,
                              }}
                            >
                              {service.price}
                            </Typography>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <TimeIcon sx={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '1rem', mr: 0.5 }} />
                              <Typography
                                variant="body2"
                                sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                              >
                                {service.duration}
                              </Typography>
                            </Box>
                            <Chip
                              label={service.category}
                              size="small"
                              sx={{
                                backgroundColor: 'rgba(139, 92, 246, 0.2)',
                                color: 'rgba(139, 92, 246, 0.9)',
                                fontSize: '0.7rem',
                              }}
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </AnimatePresence>
            </Grid>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
