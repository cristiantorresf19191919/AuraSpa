'use client';

import { Box, Container, Typography, Grid, Paper, Divider } from '@mui/material';
import HeroText from '@/components/HeroText';
import HeroTitle from '@/components/HeroTitle';

export default function HeroTextDemo() {
    return (
        <Box sx={{ minHeight: '100vh', py: 4 }}>
            <Container maxWidth="lg">
                {/* Page Header */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography variant="h3" sx={{ color: '#8B5CF6', fontWeight: 700, mb: 2 }}>
                        HeroText Component Demo
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '600px', mx: 'auto' }}>
                        A professional, reusable text component with size variants (small, medium, large) and gradient support.
                    </Typography>
                </Box>

                {/* Size Variants */}
                <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                    <Typography variant="h5" sx={{ mb: 3, color: 'white', fontWeight: 600 }}>
                        📏 Size Variants
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>
                                    Small Text
                                </Typography>
                                <HeroText size="small" data-testid="small-text">
                                    This is small text with responsive sizing
                                </HeroText>
                                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', display: 'block', mt: 1 }}>
                                    xs: 0.875rem, sm: 1rem, md: 1.125rem
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>
                                    Medium Text
                                </Typography>
                                <HeroText size="medium" data-testid="medium-text">
                                    This is medium text with responsive sizing
                                </HeroText>
                                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', display: 'block', mt: 1 }}>
                                    xs: 1rem, sm: 1.125rem, md: 1.25rem
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>
                                    Large Text
                                </Typography>
                                <HeroText size="large" data-testid="large-text">
                                    This is large text with responsive sizing
                                </HeroText>
                                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', display: 'block', mt: 1 }}>
                                    xs: 1.125rem, sm: 1.25rem, md: 1.5rem
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Gradient Text Examples */}
                <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                    <Typography variant="h5" sx={{ mb: 3, color: 'white', fontWeight: 600 }}>
                        🌈 Gradient Text Examples
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>
                                    Small Gradient
                                </Typography>
                                <HeroText
                                    size="small"
                                    gradient={true}
                                    gradientColors={['#FF6B6B', '#4ECDC4']}
                                    data-testid="small-gradient-text"
                                >
                                    Beautiful gradient text in small size
                                </HeroText>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>
                                    Large Gradient
                                </Typography>
                                <HeroText
                                    size="large"
                                    gradient={true}
                                    gradientColors={['#A8EDEA', '#FED6E3']}
                                    data-testid="large-gradient-text"
                                >
                                    Beautiful gradient text in large size
                                </HeroText>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Real-World Usage Examples */}
                <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                    <Typography variant="h5" sx={{ mb: 3, color: 'white', fontWeight: 600 }}>
                        🎯 Real-World Usage Examples
                    </Typography>

                    {/* Hero Section Example */}
                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>
                            Hero Section
                        </Typography>
                        <HeroTitle variant="h2" gradientColors={['#fff', '#e0e0e0']}>
                            Welcome to Our Platform
                        </HeroTitle>
                        <HeroText size="large" data-testid="hero-subtitle">
                            Discover amazing services and transform your experience
                        </HeroText>
                        <HeroText size="medium" data-testid="hero-description">
                            Join thousands of satisfied customers who trust our platform
                        </HeroText>
                    </Box>

                    <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

                    {/* Feature Section Example */}
                    <Box sx={{ mb: 4, textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>
                            Feature Section
                        </Typography>
                        <HeroText size="medium" gradient={true} gradientColors={['#FFD89B', '#19547B']} data-testid="feature-title">
                            Premium Features
                        </HeroText>
                        <HeroText size="small" data-testid="feature-description">
                            Access exclusive content and advanced tools
                        </HeroText>
                    </Box>

                    <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

                    {/* Call-to-Action Example */}
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h6" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>
                            Call-to-Action
                        </Typography>
                        <HeroText size="large" gradient={true} gradientColors={['#667eea', '#764ba2', '#f093fb']} data-testid="cta-text">
                            Ready to get started?
                        </HeroText>
                        <HeroText size="medium" data-testid="cta-subtitle">
                            Sign up today and unlock your potential
                        </HeroText>
                    </Box>
                </Paper>

                {/* Custom Styling */}
                <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)' }}>
                    <Typography variant="h5" sx={{ mb: 3, color: 'white', fontWeight: 600 }}>
                        🎭 Custom Styling
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>
                                    Custom Alignment & Spacing
                                </Typography>
                                <HeroText
                                    size="medium"
                                    sx={{
                                        textAlign: 'left',
                                        mb: 4,
                                        px: 2,
                                        fontStyle: 'italic'
                                    }}
                                    data-testid="custom-styled-text-1"
                                >
                                    Left-aligned text with custom spacing and italic style
                                </HeroText>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>
                                    Custom Typography
                                </Typography>
                                <HeroText
                                    size="large"
                                    sx={{
                                        fontFamily: 'monospace',
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                        fontWeight: 600
                                    }}
                                    data-testid="custom-styled-text-2"
                                >
                                    Monospace uppercase text
                                </HeroText>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Non-Responsive Examples */}
                <Paper sx={{ p: 4, mb: 4, background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' }}>
                    <Typography variant="h5" sx={{ mb: 3, color: 'white', fontWeight: 600 }}>
                        📱 Non-Responsive Examples
                    </Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>
                                    Fixed Small Size
                                </Typography>
                                <HeroText
                                    size="small"
                                    responsive={false}
                                    sx={{ fontSize: '0.875rem' }}
                                    data-testid="fixed-small-text"
                                >
                                    Fixed size text that doesn't scale
                                </HeroText>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>
                                    Fixed Medium Size
                                </Typography>
                                <HeroText
                                    size="medium"
                                    responsive={false}
                                    sx={{ fontSize: '1.25rem' }}
                                    data-testid="fixed-medium-text"
                                >
                                    Fixed size text that doesn't scale
                                </HeroText>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="h6" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>
                                    Fixed Large Size
                                </Typography>
                                <HeroText
                                    size="large"
                                    responsive={false}
                                    sx={{ fontSize: '1.5rem' }}
                                    data-testid="fixed-large-text"
                                >
                                    Fixed size text that doesn't scale
                                </HeroText>
                            </Box>
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
                            {`// Basic usage with size variants
<HeroText size="small">Small text</HeroText>
<HeroText size="medium">Medium text</HeroText>
<HeroText size="large">Large text</HeroText>`}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                            {/* With gradient */}
                            {`// With gradient effect
<HeroText 
  size="medium" 
  gradient={true}
  gradientColors={['#FF6B6B', '#4ECDC4']}
>
  Beautiful gradient text
</HeroText>`}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                            {/* Custom styling */}
                            {`// Custom styling with sx prop
<HeroText 
  size="large"
  sx={{ 
    textAlign: 'left',
    fontStyle: 'italic',
    fontWeight: 600
  }}
>
  Custom styled text
</HeroText>`}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {/* Non-responsive */}
                            {`// Non-responsive with fixed size
<HeroText 
  size="medium"
  responsive={false}
  sx={{ fontSize: '1.25rem' }}
>
  Fixed size text
</HeroText>`}
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
                                <strong>children:</strong> ReactNode - The text content
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ mb: 2, color: '#8B5CF6' }}>
                                Optional Props
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>size:</strong> 'small' | 'medium' | 'large' (default: 'medium')
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>variant:</strong> MUI Typography variant (default: 'body1')
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>component:</strong> HTML element to render (default: 'p')
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>gradient:</strong> boolean - Enable gradient effect (default: false)
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>gradientColors:</strong> string[] - Custom gradient colors
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                <strong>responsive:</strong> boolean - Enable responsive sizing (default: true)
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Size Comparison Table */}
                <Paper sx={{ p: 4, background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
                    <Typography variant="h5" sx={{ mb: 3, color: '#8B5CF6', fontWeight: 600 }}>
                        📊 Size Comparison Table
                    </Typography>
                    <Box sx={{ overflow: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(139, 92, 246, 0.2)' }}>
                                    <th style={{ padding: '12px', textAlign: 'left', color: '#8B5CF6', fontWeight: 600 }}>Size</th>
                                    <th style={{ padding: '12px', textAlign: 'left', color: '#8B5CF6', fontWeight: 600 }}>Mobile (xs)</th>
                                    <th style={{ padding: '12px', textAlign: 'left', color: '#8B5CF6', fontWeight: 600 }}>Tablet (sm)</th>
                                    <th style={{ padding: '12px', textAlign: 'left', color: '#8B5CF6', fontWeight: 600 }}>Desktop (md)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid rgba(139, 92, 246, 0.1)' }}>
                                    <td style={{ padding: '12px', fontWeight: 600 }}>Small</td>
                                    <td style={{ padding: '12px' }}>0.875rem (14px)</td>
                                    <td style={{ padding: '12px' }}>1rem (16px)</td>
                                    <td style={{ padding: '12px' }}>1.125rem (18px)</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid rgba(139, 92, 246, 0.1)' }}>
                                    <td style={{ padding: '12px', fontWeight: 600 }}>Medium</td>
                                    <td style={{ padding: '12px' }}>1rem (16px)</td>
                                    <td style={{ padding: '12px' }}>1.125rem (18px)</td>
                                    <td style={{ padding: '12px' }}>1.25rem (20px)</td>
                                </tr>
                                <tr>
                                    <td style={{ padding: '12px', fontWeight: 600 }}>Large</td>
                                    <td style={{ padding: '12px' }}>1.125rem (18px)</td>
                                    <td style={{ padding: '12px' }}>1.25rem (20px)</td>
                                    <td style={{ padding: '12px' }}>1.5rem (24px)</td>
                                </tr>
                            </tbody>
                        </table>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
}
