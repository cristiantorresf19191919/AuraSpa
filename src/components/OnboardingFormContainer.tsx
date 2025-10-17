'use client';

import { Container, Box } from '@mui/material';
import { ReactNode } from 'react';
import BeautifulCard from './BeautifulCard';

interface OnboardingFormContainerProps {
    children: ReactNode;
}

export default function OnboardingFormContainer({ children }: OnboardingFormContainerProps) {
    return (
        <Container
            maxWidth="lg"
            sx={{
                position: 'relative',
                zIndex: 20,
                py: { xs: 2, sm: 4, md: 6 },
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%'
            }}
        >
            <Box sx={{ width: '100%', maxWidth: '1000px' }}>
                <BeautifulCard
                    isBlurred={true}
                    sx={{
                        width: '100%',
                        maxWidth: 'none',
                        margin: 0,
                        minHeight: 'auto',
                        position: 'relative',
                        overflow: 'visible'
                    }}
                >
                    {children}
                </BeautifulCard>
            </Box>
        </Container>
    );
}
