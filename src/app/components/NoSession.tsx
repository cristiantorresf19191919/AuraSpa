'use client';

import { Box, Typography, Button, Grid } from '@mui/material';
import { Login, PersonAdd } from '@mui/icons-material';
import BeautifulCard from '@/components/BeautifulCard';
import OnboardingVideoBackground from '@/components/OnboardingVideoBackground';

export default function NoSession() {
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
        <Typography
          variant="h2"
          sx={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
            letterSpacing: '-0.5px',
            mb: 4,
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
            fontSize: { xs: '1.1rem', sm: '1.3rem' },
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
            letterSpacing: '0.3px',
            mb: 6,
            textAlign: 'center',
            maxWidth: '600px'
          }}
        >
          Your premium wellness and massage therapy platform. Please sign in to access your personalized experience.
        </Typography>

        {/* Authentication Cards */}
        <Grid container spacing={4} sx={{ maxWidth: '800px', mb: 6 }}>
          {/* Login Card */}
          <Grid size={{ xs: 12, md: 6 }}>
            <BeautifulCard isBlurred={true}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                  boxShadow: '0 8px 32px rgba(139, 92, 246, 0.4)'
                }}>
                  <Login sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                <Typography variant="h4" sx={{ mb: 3, color: '#8B5CF6', fontWeight: 700 }}>
                  Sign In
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.8)' }}>
                  Access your account and continue your wellness journey
                </Typography>
                <Button
                  variant="contained"
                  href="/auth"
                  sx={{
                    background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    width: '100%',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Sign In
                </Button>
              </Box>
            </BeautifulCard>
          </Grid>

          {/* Sign Up Card */}
          <Grid size={{ xs: 12, md: 6 }}>
            <BeautifulCard isBlurred={true}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3,
                  boxShadow: '0 8px 32px rgba(16, 185, 129, 0.4)'
                }}>
                  <PersonAdd sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                <Typography variant="h4" sx={{ mb: 3, color: '#10B981', fontWeight: 700 }}>
                  Sign Up
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, color: 'rgba(255, 255, 255, 0.8)' }}>
                  Create a new account and start your wellness journey today
                </Typography>
                <Button
                  variant="contained"
                  href="/auth"
                  sx={{
                    background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    width: '100%',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            </BeautifulCard>
          </Grid>
        </Grid>

        {/* Features Preview */}
        <BeautifulCard isBlurred={false}>
          <Typography variant="h5" sx={{ mb: 4, color: '#8B5CF6', fontWeight: 700, textAlign: 'center' }}>
            🌟 What Awaits You
          </Typography>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ color: '#8B5CF6', mb: 1, fontWeight: 600 }}>
                  📅 Book Appointments
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  Schedule your wellness sessions with ease
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ color: '#8B5CF6', mb: 1, fontWeight: 600 }}>
                  👥 Manage Patients
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  Comprehensive patient management tools
                </Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h6" sx={{ color: '#8B5CF6', mb: 1, fontWeight: 600 }}>
                  💬 AI Chatbot
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                  Get instant support and information
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </BeautifulCard>
      </Box>
    </Box>
  );
}

