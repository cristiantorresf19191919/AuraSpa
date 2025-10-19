'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
} from '@mui/material';
import {
  Search as SearchIcon,
  Spa as SpaIcon,
  LocalActivity as ActivityIcon,
  Favorite as FavoriteIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';
import BeautifulCard from '@/components/BeautifulCard';
import OnboardingVideoBackground from '@/components/OnboardingVideoBackground';

// Mock service data - replace with actual data from your API
const mockServices = [
  {
    id: 1,
    name: 'Swedish Massage',
    description: 'Classic relaxation massage with long, flowing strokes',
    duration: '60 min',
    price: '$80',
    category: 'Relaxation',
    rating: 4.8,
    image: '/images/swedish-massage.jpg'
  },
  {
    id: 2,
    name: 'Deep Tissue Massage',
    description: 'Intense massage targeting deeper muscle layers',
    duration: '90 min',
    price: '$120',
    category: 'Therapeutic',
    rating: 4.9,
    image: '/images/deep-tissue.jpg'
  },
  {
    id: 3,
    name: 'Hot Stone Massage',
    description: 'Heated stones combined with massage techniques',
    duration: '75 min',
    price: '$100',
    category: 'Relaxation',
    rating: 4.7,
    image: '/images/hot-stone.jpg'
  },
  {
    id: 4,
    name: 'Aromatherapy Massage',
    description: 'Essential oils enhance the massage experience',
    duration: '60 min',
    price: '$90',
    category: 'Wellness',
    rating: 4.6,
    image: '/images/aromatherapy.jpg'
  }
];

const categories = ['All', 'Relaxation', 'Therapeutic', 'Wellness', 'Sports'];

export default function ServiceSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredServices, setFilteredServices] = useState(mockServices);

  const handleSearch = () => {
    let filtered = mockServices;
    
    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }
    
    setFilteredServices(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    let filtered = mockServices;
    
    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (category !== 'All') {
      filtered = filtered.filter(service => service.category === category);
    }
    
    setFilteredServices(filtered);
  };

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      {/* Video Background */}
      <OnboardingVideoBackground />

      {/* Main Content */}
      <Box sx={{
        position: 'relative',
        zIndex: 30,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography
            variant="h2"
            sx={{
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 800,
              fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
              letterSpacing: '-0.5px',
              mb: 3,
              textAlign: 'center'
            }}
          >
            Welcome to AuraSpa
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 500,
              fontSize: { xs: '1.2rem', sm: '1.4rem' },
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
              letterSpacing: '0.3px',
              mb: 6,
              textAlign: 'center',
              maxWidth: '700px'
            }}
          >
            Discover premium wellness and massage therapy services. Find the perfect treatment for your needs.
          </Typography>
        </motion.div>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ width: '100%', maxWidth: '800px', marginBottom: '3rem' }}
        >
          <BeautifulCard isBlurred={true}>
            <Box sx={{ p: 4 }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  mb: 3, 
                  color: '#FFFFFF', 
                  fontWeight: 700, 
                  textAlign: 'center',
                  textShadow: `
                    2px 2px 4px rgba(0, 0, 0, 0.8),
                    -1px -1px 2px rgba(0, 0, 0, 0.6),
                    0 0 8px rgba(0, 0, 0, 0.4)
                  `,
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                  letterSpacing: '-0.5px'
                }}
              >
                Find Your Perfect Service
              </Typography>
              
              {/* Search Bar */}
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  placeholder="Search for massage services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 3,
                      '& fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#8B5CF6',
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: 'white',
                      fontSize: '1.1rem',
                      '&::placeholder': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          variant="contained"
                          onClick={handleSearch}
                          sx={{
                            background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                            color: 'white',
                            px: 3,
                            py: 1,
                            borderRadius: 2,
                            fontWeight: 600,
                            textTransform: 'none',
                            '&:hover': {
                              background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
                            },
                          }}
                        >
                          Search
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              {/* Category Filters */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                {categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    onClick={() => handleCategoryChange(category)}
                    sx={{
                      backgroundColor: selectedCategory === category 
                        ? 'rgba(139, 92, 246, 0.3)' 
                        : 'rgba(255, 255, 255, 0.1)',
                      color: selectedCategory === category ? '#8B5CF6' : 'rgba(255, 255, 255, 0.8)',
                      border: selectedCategory === category 
                        ? '1px solid #8B5CF6' 
                        : '1px solid rgba(255, 255, 255, 0.3)',
                      '&:hover': {
                        backgroundColor: 'rgba(139, 92, 246, 0.2)',
                        color: '#8B5CF6',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          </BeautifulCard>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ width: '100%', maxWidth: '1200px' }}
        >
          <Grid container spacing={3}>
            {filteredServices.map((service, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={service.id}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <BeautifulCard isBlurred={true}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Box sx={{
                          width: 60,
                          height: 60,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 2,
                          boxShadow: '0 8px 25px rgba(139, 92, 246, 0.3)'
                        }}>
                          <SpaIcon sx={{ fontSize: 30, color: 'white' }} />
                        </Box>

                        <Typography 
                          variant="h6" 
                          sx={{ 
                            mb: 1, 
                            color: '#FFFFFF', 
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            textShadow: `
                              1px 1px 3px rgba(0, 0, 0, 0.8),
                              -1px -1px 2px rgba(0, 0, 0, 0.6),
                              0 0 6px rgba(0, 0, 0, 0.4)
                            `,
                            filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.3))',
                            letterSpacing: '-0.25px',
                            lineHeight: 1.3
                          }}
                        >
                          {service.name}
                        </Typography>

                        <Typography 
                          variant="body2" 
                          sx={{ 
                            mb: 2, 
                            color: 'rgba(255, 255, 255, 0.95)', 
                            fontSize: '0.95rem',
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.6)',
                            lineHeight: 1.5,
                            fontWeight: 400
                          }}
                        >
                          {service.description}
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <TimeIcon sx={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.6)' }} />
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                color: 'rgba(255, 255, 255, 0.9)', 
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                                fontWeight: 500
                              }}
                            >
                              {service.duration}
                            </Typography>
                          </Box>
                          <Typography variant="h6" sx={{ color: '#10B981', fontWeight: 700 }}>
                            {service.price}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Chip
                            label={service.category}
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(16, 185, 129, 0.2)',
                              color: '#10B981',
                              fontSize: '0.7rem',
                            }}
                          />
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <FavoriteIcon sx={{ fontSize: 16, color: '#EF4444' }} />
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                color: 'rgba(255, 255, 255, 0.9)', 
                                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                                fontWeight: 500
                              }}
                            >
                              {service.rating}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </BeautifulCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{ marginTop: '4rem', textAlign: 'center' }}
        >
          <Typography variant="h5" sx={{ mb: 3, color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600 }}>
            Ready to book your wellness experience?
          </Typography>
          <Button
            variant="contained"
            href="/authentication"
            sx={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
              color: 'white',
              px: 6,
              py: 2,
              borderRadius: 3,
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '1.2rem',
              '&:hover': {
                background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 30px rgba(139, 92, 246, 0.5)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Sign In to Book
          </Button>
        </motion.div>
      </Box>
    </Box>
  );
}
