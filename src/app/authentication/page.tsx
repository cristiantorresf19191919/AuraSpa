'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Button,
  Grid,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Login as LoginIcon,
  PersonAdd as PersonAddIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import BeautifulCard from '@/components/BeautifulCard';
import OnboardingVideoBackground from '@/components/OnboardingVideoBackground';

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

    const handleAuth0Login = () => {
      setLoading(true);
      setError('');
      // Redirect to Auth0 login
      window.location.href = '/auth/login';
  };

  const handleAuth0Signup = () => {
    setLoading(true);
    setError('');
    // Redirect to Auth0 signup
    window.location.href = '/auth/login?screen_hint=signup';
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
        {/* Back to Home Button */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ position: 'absolute', top: '2rem', left: '2rem' }}
        >
          <Button
            variant="outlined"
            component={Link}
            href="/"
            startIcon={<ArrowBackIcon />}
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '&:hover': {
                borderColor: 'rgba(255, 255, 255, 0.6)',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
              }
            }}
          >
            Back to Home
          </Button>
        </motion.div>

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
            Your premium wellness and massage therapy platform. Choose how you&apos;d like to access your personalized experience.
          </Typography>
        </motion.div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '2rem', maxWidth: '600px', width: '100%' }}
          >
            <Alert 
              severity="error" 
              sx={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: 'white'
              }}
            >
              {error}
            </Alert>
          </motion.div>
        )}

        {/* Authentication Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Grid container spacing={4} sx={{ maxWidth: '900px', mb: 6 }}>
            {/* Sign In Card */}
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <BeautifulCard isBlurred={true}>
                  <Box sx={{ textAlign: 'center', p: 3 }}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <Box sx={{
                        width: 90,
                        height: 90,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        boxShadow: '0 12px 40px rgba(139, 92, 246, 0.4)'
                      }}>
                        <LoginIcon sx={{ fontSize: 45, color: 'white' }} />
                      </Box>
                    </motion.div>

                    <Typography 
                      variant="h4" 
                      sx={{ 
                        mb: 2, 
                        color: '#8B5CF6', 
                        fontWeight: 700,
                        fontSize: { xs: '1.8rem', sm: '2rem' }
                      }}
                    >
                      Sign In
                    </Typography>
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: 4, 
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '1.1rem',
                        lineHeight: 1.6
                      }}
                    >
                      Access your account and continue your wellness journey with secure authentication
                    </Typography>

                    <a href="/auth/login" style={{ textDecoration: 'none', width: '100%', display: 'block' }}>
                      <Button
                        variant="contained"
                        disabled={loading}
                        sx={{
                          background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                          color: 'white',
                          px: 4,
                          py: 2,
                          borderRadius: 3,
                          fontWeight: 600,
                          textTransform: 'none',
                          fontSize: '1.1rem',
                          width: '100%',
                          minHeight: '56px',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 12px 30px rgba(139, 92, 246, 0.5)'
                          },
                          '&:disabled': {
                            background: 'rgba(139, 92, 246, 0.5)',
                            color: 'rgba(255, 255, 255, 0.7)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <LoginIcon />}
                      >
                        {loading ? 'Redirecting...' : 'Sign In with Auth0'}
                      </Button>
                    </a>
                  </Box>
                </BeautifulCard>
              </motion.div>
            </Grid>

            {/* Sign Up Card */}
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <BeautifulCard isBlurred={true}>
                  <Box sx={{ textAlign: 'center', p: 3 }}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      <Box sx={{
                        width: 90,
                        height: 90,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        boxShadow: '0 12px 40px rgba(16, 185, 129, 0.4)'
                      }}>
                        <PersonAddIcon sx={{ fontSize: 45, color: 'white' }} />
                      </Box>
                    </motion.div>

                    <Typography 
                      variant="h4" 
                      sx={{ 
                        mb: 2, 
                        color: '#10B981', 
                        fontWeight: 700,
                        fontSize: { xs: '1.8rem', sm: '2rem' }
                      }}
                    >
                      Sign Up
                    </Typography>
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        mb: 4, 
                        color: 'rgba(255, 255, 255, 0.8)',
                        fontSize: '1.1rem',
                        lineHeight: 1.6
                      }}
                    >
                      Create a new account and start your wellness journey today with our premium services
                    </Typography>

                    <a href="/auth/login?screen_hint=signup" style={{ textDecoration: 'none', width: '100%', display: 'block' }}>
                      <Button
                        variant="contained"
                        disabled={loading}
                        sx={{
                          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                          color: 'white',
                          px: 4,
                          py: 2,
                          borderRadius: 3,
                          fontWeight: 600,
                          textTransform: 'none',
                          fontSize: '1.1rem',
                          width: '100%',
                          minHeight: '56px',
                          '&:hover': {
                            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 12px 30px rgba(16, 185, 129, 0.5)'
                          },
                          '&:disabled': {
                            background: 'rgba(16, 185, 129, 0.5)',
                            color: 'rgba(255, 255, 255, 0.7)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PersonAddIcon />}
                      >
                        {loading ? 'Redirecting...' : 'Sign Up with Auth0'}
                      </Button>
                    </a>
                  </Box>
                </BeautifulCard>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <Box sx={{ textAlign: 'center', maxWidth: '600px' }}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '0.9rem',
                lineHeight: 1.6
              }}
            >
              By continuing, you agree to our{' '}
              <Link href="/terms" style={{ color: '#8B5CF6', textDecoration: 'none' }}>
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link href="/privacy" style={{ color: '#8B5CF6', textDecoration: 'none' }}>
                Privacy Policy
              </Link>
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
} 