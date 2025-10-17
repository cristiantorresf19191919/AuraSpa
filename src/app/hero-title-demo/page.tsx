'use client';

import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import HeroTitle from '@/components/HeroTitle';

export default function HeroTitleDemo() {
    return (
        <Box sx={{ minHeight: '100vh', py: 4 }}>
            <Container maxWidth="lg">
                {/* Page Header */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography variant="h3" sx={{ color: '#8B5CF6', fontWeight: 700, mb: 2 }}>
                        HeroTitle Component Demo
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '600px', mx: 'auto' }}>
                        A professional, reusable hero title component with customizable gradients, responsive design, and TypeScript support.
                    </Typography>
                </Box>

                {/* Basic Usage */}
                <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                    <Typography variant="h5" sx={{ mb: 3, color: 'white', fontWeight: 600 }}>
                        🎯 Basic Usage
                    </Typography>
                    <HeroTitle data-testid="basic-hero-title">
                        Encuentra tu Masaje Perfecto
                    </HeroTitle>
                </Paper>

                {/* Different Variants */}
                <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                    <Typography variant="h5" sx={{ mb: 3, color: 'white', fontWeight: 600 }}>
                        📝 Different Variants
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <HeroTitle variant="h1" data-testid="h1-variant">
                                H1 - Main Title
                            </HeroTitle>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <HeroTitle variant="h2" data-testid="h2-variant">
                                H2 - Section Title
                            </HeroTitle>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <HeroTitle variant="h3" data-testid="h3-variant">
                                H3 - Subsection
                            </HeroTitle>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <HeroTitle variant="h4" data-testid="h4-variant">
                                H4 - Card Title
                            </HeroTitle>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Custom Gradients */}
                <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                    <Typography variant="h5" sx={{ mb: 3, color: 'white', fontWeight: 600 }}>
                        🌈 Custom Gradients
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <HeroTitle
                                gradientColors={['#FF6B6B', '#4ECDC4']}
                                data-testid="custom-gradient-1"
                            >
                                Sunset to Ocean
                            </HeroTitle>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <HeroTitle
                                gradientColors={['#A8EDEA', '#FED6E3']}
                                data-testid="custom-gradient-2"
                            >
                                Mint to Pink
                            </HeroTitle>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <HeroTitle
                                gradientColors={['#FFD89B', '#19547B']}
                                data-testid="custom-gradient-3"
                            >
                                Golden to Navy
                            </HeroTitle>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <HeroTitle
                                gradientColors={['#667eea', '#764ba2', '#f093fb']}
                                data-testid="custom-gradient-4"
                            >
                                Multi-Color
                            </HeroTitle>
                        </Grid>
                    </Grid>
                </Paper>

                {/* No Gradient */}
                <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)' }}>
                    <Typography variant="h5" sx={{ mb: 3, color: 'white', fontWeight: 600 }}>
                        🎨 No Gradient
                    </Typography>
                    <HeroTitle
                        gradient={false}
                        data-testid="no-gradient-title"
                    >
                        Solid White Text
                    </HeroTitle>
                </Paper>

                {/* Custom Styling */}
                <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)' }}>
                    <Typography variant="h5" sx={{ mb: 3, color: 'white', fontWeight: 600 }}>
                        🎭 Custom Styling
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <HeroTitle
                                sx={{
                                    fontFamily: 'monospace',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase'
                                }}
                                data-testid="custom-styling-1"
                            >
                                Monospace Style
                            </HeroTitle>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <HeroTitle
                                sx={{
                                    fontStyle: 'italic',
                                    fontWeight: 300,
                                    textDecoration: 'underline'
                                }}
                                data-testid="custom-styling-2"
                            >
                                Elegant Style
                            </HeroTitle>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Non-Responsive */}
                <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' }}>
                    <Typography variant="h5" sx={{ mb: 3, color: 'white', fontWeight: 600 }}>
                        📱 Non-Responsive
                    </Typography>
                    <HeroTitle
                        responsive={false}
                        sx={{ fontSize: '3rem' }}
                        data-testid="non-responsive-title"
                    >
                        Fixed Size Title
                    </HeroTitle>
                </Paper>

                {/* Different Components */}
                <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)' }}>
                    <Typography variant="h5" sx={{ mb: 3, color: 'white', fontWeight: 600 }}>
                        🏷️ Different HTML Components
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <HeroTitle
                                component="h1"
                                data-testid="h1-component"
                            >
                                H1 Element
                            </HeroTitle>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <HeroTitle
                                component="h2"
                                data-testid="h2-component"
                            >
                                H2 Element
                            </HeroTitle>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <HeroTitle
                                component="h3"
                                data-testid="h3-component"
                            >
                                H3 Element
                            </HeroTitle>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Usage Examples */}
                <Paper sx={{ p: 4, mb: 4, background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                    <Typography variant="h5" sx={{ mb: 3, color: '#8B5CF6', fontWeight: 600 }}>
                        💻 Usage Examples
                    </Typography>
                    <Box sx={{
                        background: 'rgba(0, 0, 0, 0.05)',
                        borderRadius: 2,
                        p: 3,
                        fontFamily: 'monospace',
                        fontSize: '0.9rem',
                        overflow: 'auto'
                    }}>
                        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                            {/* Basic usage */}
                            {`// Basic usage
<HeroTitle>Your Title Here</HeroTitle>`}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                            {/* Custom gradient */}
                            {`// Custom gradient colors
<HeroTitle gradientColors={['#FF6B6B', '#4ECDC4']}>
  Custom Gradient Title
</HeroTitle>`}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                            {/* No gradient */}
                            {`// No gradient (solid text)
<HeroTitle gradient={false}>
  Solid Text Title
</HeroTitle>`}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                            {/* Custom styling */}
                            {`// Custom styling with sx prop
<HeroTitle 
  sx={{ 
    fontFamily: 'monospace',
    letterSpacing: '0.1em'
  }}
>
  Custom Styled Title
</HeroTitle>`}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {/* Non-responsive */}
                            {`// Non-responsive with fixed size
<HeroTitle 
  responsive={false}
  sx={{ fontSize: '3rem' }}
>
  Fixed Size Title
</HeroTitle>`}
                        </Typography>
                    </Box>
                </Paper>

                {/* Props Documentation */}
                <Paper sx={{ p: 4, background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                    <Typography variant="h5" sx={{ mb: 3, color: '#8B5CF6', fontWeight: 600 }}>
                        📚 Props Documentation
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ mb: 2, color: '#8B5CF6' }}>
                                Required Props
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>children:</strong> ReactNode - The title text content
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ mb: 2, color: '#8B5CF6' }}>
                                Optional Props
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>variant:</strong> 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' (default: 'h1')
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>component:</strong> HTML element to render (default: matches variant)
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>gradient:</strong> boolean - Enable/disable gradient (default: true)
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>gradientColors:</strong> string[] - Custom gradient colors
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>responsive:</strong> boolean - Enable responsive font sizes (default: true)
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
}
