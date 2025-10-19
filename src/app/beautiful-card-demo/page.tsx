'use client';

import { Box, Typography, Grid, Button, TextField } from '@mui/material';
import BeautifulCard from '@/components/BeautifulCard';
import OnboardingVideoBackground from '@/components/OnboardingVideoBackground';

export default function BeautifulCardDemo() {
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
                    BeautifulCard Component Demo
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
                        textAlign: 'center'
                    }}
                >
                    Reusable beautiful frosted glass cards for your application
                </Typography>

                {/* Demo Cards Grid */}
                <Grid container spacing={4} sx={{ maxWidth: "1200px" }}>
                    {/* Blurred Card with Form */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <BeautifulCard isBlurred={true}>
                            <Typography variant="h4" sx={{ mb: 3, color: '#8B5CF6', fontWeight: 700 }}>
                                ✨ Blurred Card
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3, color: 'rgba(255, 255, 255, 0.8)' }}>
                                This card has the full blur effect with beautiful glassmorphism styling.
                            </Typography>
                            <TextField
                                fullWidth
                                label="Full Name"
                                placeholder="Enter your name"
                                sx={{ mb: 2 }}
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                placeholder="Enter your email"
                                sx={{ mb: 2 }}
                            />
                            <Button
                                variant="contained"
                                sx={{
                                    background: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
                                    color: 'white',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)'
                                    }
                                }}
                            >
                                Submit
                            </Button>
                        </BeautifulCard>
                    </Grid>

                    {/* Non-blurred Card */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <BeautifulCard isBlurred={false}>
                            <Typography variant="h4" sx={{ mb: 3, color: '#8B5CF6', fontWeight: 700 }}>
                                🌟 Subtle Card
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3, color: 'rgba(255, 255, 255, 0.8)' }}>
                                This card has minimal blur for a more subtle, elegant appearance.
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                gap: 2,
                                flexWrap: 'wrap',
                                justifyContent: 'center'
                            }}>
                                <Button variant="outlined" sx={{ borderColor: 'rgba(255, 255, 255, 0.3)', color: 'white' }}>
                                    Option 1
                                </Button>
                                <Button variant="outlined" sx={{ borderColor: 'rgba(255, 255, 255, 0.3)', color: 'white' }}>
                                    Option 2
                                </Button>
                                <Button variant="outlined" sx={{ borderColor: 'rgba(255, 255, 255, 0.3)', color: 'white' }}>
                                    Option 3
                                </Button>
                            </Box>
                        </BeautifulCard>
                    </Grid>

                    {/* Info Card */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <BeautifulCard isBlurred={true}>
                            <Typography variant="h4" sx={{ mb: 3, color: '#8B5CF6', fontWeight: 700 }}>
                                📚 Information Card
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.8)' }}>
                                Perfect for displaying information, statistics, or content sections.
                            </Typography>
                            <Box sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: 2,
                                mt: 3
                            }}>
                                <Box sx={{ textAlign: 'center', p: 2, background: 'rgba(139, 92, 246, 0.1)', borderRadius: 2 }}>
                                    <Typography variant="h3" sx={{ color: '#8B5CF6', fontWeight: 700 }}>42</Typography>
                                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Projects</Typography>
                                </Box>
                                <Box sx={{ textAlign: 'center', p: 2, background: 'rgba(139, 92, 246, 0.1)', borderRadius: 2 }}>
                                    <Typography variant="h3" sx={{ color: '#8B5CF6', fontWeight: 700 }}>99%</Typography>
                                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Success</Typography>
                                </Box>
                            </Box>
                        </BeautifulCard>
                    </Grid>

                    {/* Custom Styled Card */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <BeautifulCard
                            isBlurred={true}
                            sx={{
                                maxWidth: '100%',
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.15) 100%)',
                                border: '2px solid rgba(139, 92, 246, 0.4)',
                                '&:hover': {
                                    borderColor: 'rgba(139, 92, 246, 0.6)',
                                    transform: 'translateY(-3px) scale(1.02)'
                                }
                            }}
                        >
                            <Typography variant="h4" sx={{ mb: 3, color: '#8B5CF6', fontWeight: 700 }}>
                                🎨 Custom Styled
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3, color: 'rgba(255, 255, 255, 0.8)' }}>
                                This card has custom styling applied through the sx prop, showing the flexibility of the component.
                            </Typography>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                    Custom border and hover effects
                                </Typography>
                                <Button
                                    size="small"
                                    sx={{
                                        background: 'rgba(139, 92, 246, 0.2)',
                                        color: '#8B5CF6',
                                        border: '1px solid rgba(139, 92, 246, 0.4)'
                                    }}
                                >
                                    Learn More
                                </Button>
                            </Box>
                        </BeautifulCard>
                    </Grid>
                </Grid>

                {/* Usage Instructions */}
                <Box sx={{ mt: 6, maxWidth: '800px' }}>
                    <BeautifulCard isBlurred={false}>
                        <Typography variant="h5" sx={{ mb: 3, color: '#8B5CF6', fontWeight: 700, textAlign: 'center' }}>
                            🚀 How to Use BeautifulCard
                        </Typography>
                        <Box sx={{
                            background: 'rgba(0, 0, 0, 0.1)',
                            borderRadius: 2,
                            p: 3,
                            fontFamily: 'monospace',
                            fontSize: '0.9rem',
                            color: 'rgba(255, 255, 255, 0.9)'
                        }}>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                {`import BeautifulCard from '@/components/BeautifulCard';`}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                {`// Basic usage with blur effect`}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                {`<BeautifulCard isBlurred={true}>`}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                {`  <YourContent />`}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                {`</BeautifulCard>`}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                {`// Subtle card without blur`}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                {`<BeautifulCard isBlurred={false}>`}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                {`  <YourContent />`}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                {`</BeautifulCard>`}
                            </Typography>
                        </Box>
                    </BeautifulCard>
                </Box>
            </Box>
        </Box>
    );
}
