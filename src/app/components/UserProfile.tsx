'use client';

import { useUser } from '@auth0/nextjs-auth0';
import { Box, Typography, Button, Avatar, Card, CardContent, Grid } from '@mui/material';
import { Logout } from '@mui/icons-material';
import BeautifulCard from '@/components/BeautifulCard';

export default function UserProfile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Box sx={{ minHeight: '100vh', padding: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid size={{ xs: 12, md: 8, lg: 6 }}>
          <BeautifulCard isBlurred={true}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Avatar
                src={user?.picture}
                alt={user?.name}
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 3,
                  border: '4px solid rgba(139, 92, 246, 0.3)',
                  boxShadow: '0 8px 32px rgba(139, 92, 246, 0.3)'
                }}
              />
              <Typography variant="h3" sx={{ 
                color: '#8B5CF6', 
                fontWeight: 700, 
                mb: 2,
                background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Welcome, {user?.name}!
              </Typography>
              <Typography variant="h6" sx={{ 
                color: 'rgba(255, 255, 255, 0.8)', 
                mb: 4,
                fontWeight: 400
              }}>
                You are successfully authenticated
              </Typography>
            </Box>

            <Card sx={{ 
              background: 'rgba(255, 255, 255, 0.1)', 
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              mb: 4
            }}>
              <CardContent>
                <Typography variant="h5" sx={{ color: '#8B5CF6', mb: 3, fontWeight: 600 }}>
                  Profile Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 0.5 }}>
                      Email
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'white', fontWeight: 500 }}>
                      {user?.email}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 0.5 }}>
                      User ID
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'white', fontWeight: 500, wordBreak: 'break-all' }}>
                      {user?.sub}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', mb: 0.5 }}>
                      Email Verified
                    </Typography>
                    <Typography variant="body1" sx={{ color: user?.email_verified ? '#10B981' : '#EF4444', fontWeight: 500 }}>
                      {user?.email_verified ? 'Yes' : 'No'}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                startIcon={<Logout />}
                href="/api/auth/logout"
                sx={{
                  background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(239, 68, 68, 0.4)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Logout
              </Button>
            </Box>
          </BeautifulCard>
        </Grid>
      </Grid>
    </Box>
  );
}

