'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Box } from '@mui/material';

export default function OnboardingVideoBackground() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    const onboardingVideos = [
        '/onboardingVideos/Video_Showcase_of_Aura_Services.mp4',
        '/onboardingVideos/Wellness_Video_Generation_Request.mp4'
    ];

    // Memoized event handlers to prevent recreation on every render
    const handleReducedMotionChange = useCallback((e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
    }, []);

    const handleVisibilityChange = useCallback(() => {
        const video = videoRef.current;
        if (video) {
            if (document.hidden) {
                video.pause();
                setIsVisible(false);
            } else {
                setIsVisible(true);
                if (!prefersReducedMotion) {
                    video.play().catch(() => {
                        // Autoplay failed, continue silently
                    });
                }
            }
        }
    }, [prefersReducedMotion]);

    const handleVideoEnd = useCallback(() => {
        // Move to next video or loop back to first
        setCurrentVideoIndex((prev) => (prev + 1) % onboardingVideos.length);
    }, [onboardingVideos.length]);

    const handleVideoError = useCallback(() => {
        console.error('Video failed to load, trying next video');
        setCurrentVideoIndex((prev) => (prev + 1) % onboardingVideos.length);
    }, [onboardingVideos.length]);

    useEffect(() => {
        // Check for reduced motion preference
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        mediaQuery.addEventListener('change', handleReducedMotionChange);

        // Handle visibility change to pause/play video
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            mediaQuery.removeEventListener('change', handleReducedMotionChange);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [handleReducedMotionChange, handleVisibilityChange]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || prefersReducedMotion) return;

        // Only add event listeners if they haven't been added yet
        // This prevents duplicate event listeners on re-renders
        const hasEndListener = video.onended !== null;
        const hasErrorListener = video.onerror !== null;

        if (!hasEndListener) {
            video.addEventListener('ended', handleVideoEnd);
        }
        if (!hasErrorListener) {
            video.addEventListener('error', handleVideoError);
        }

        // Set video source and play
        video.src = onboardingVideos[currentVideoIndex];
        video.load();

        if (isVisible && !prefersReducedMotion) {
            video.play().catch(() => {
                // Autoplay failed, continue silently
            });
        }

        return () => {
            // Only remove listeners if they were added
            if (!hasEndListener) {
                video.removeEventListener('ended', handleVideoEnd);
            }
            if (!hasErrorListener) {
                video.removeEventListener('error', handleVideoError);
            }
        };
    }, [currentVideoIndex, onboardingVideos, isVisible, prefersReducedMotion, handleVideoEnd, handleVideoError]);

    if (prefersReducedMotion) {
        // Show static background for users who prefer reduced motion
        return (
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `
                        linear-gradient(135deg, #8B5CF6 0%, #7C3AED 50%, #6D28D9 100%),
                        radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.15) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.12) 0%, transparent 50%)
                    `,
                    zIndex: 1
                }}
            />
        );
    }

    return (
        <>
            {/* Background Video */}
            <video
                ref={videoRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 1
                }}
                autoPlay
                muted
                playsInline
                loop={false} // We handle looping manually for sequential playback
                preload="auto"
            />

            {/* Readability Veil - Subtle dark overlay */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 100%)',
                    zIndex: 2
                }}
            />

            {/* Additional decorative overlays */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `
                        radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
                        radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)
                    `,
                    zIndex: 3
                }}
            />
        </>
    );
}
