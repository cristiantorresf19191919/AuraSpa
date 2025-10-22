'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Box } from '@mui/material';

export default function OnboardingVideoBackground() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const videoLoadTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const onboardingVideos = useMemo(() => [
        '/onboardingVideos/Video_Showcase_of_Aura_Services.mp4',
        '/onboardingVideos/Wellness_Video_Generation_Request.mp4'
    ], []);

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

    const handleVideoLoadStart = useCallback(() => {
        console.log('Video load started');
        setIsVideoLoaded(false);
    }, []);

    const handleVideoCanPlay = useCallback(() => {
        console.log('Video can play');
        setIsVideoLoaded(true);
        // Clear timeout since video is ready
        if (videoLoadTimeoutRef.current) {
            clearTimeout(videoLoadTimeoutRef.current);
            videoLoadTimeoutRef.current = null;
        }
    }, []);

    const handleVideoWaiting = useCallback(() => {
        console.log('Video waiting/buffering');
        // Video is buffering, keep showing image
    }, []);

    const handleVideoPlaying = useCallback(() => {
        console.log('Video playing');
        // Video is playing successfully
    }, []);

    const handleVideoLoadedData = useCallback(() => {
        console.log('Video data loaded');
        setIsVideoLoaded(true);
        // Clear timeout since video is ready
        if (videoLoadTimeoutRef.current) {
            clearTimeout(videoLoadTimeoutRef.current);
            videoLoadTimeoutRef.current = null;
        }
    }, []);

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

        // Add event listeners
        video.addEventListener('ended', handleVideoEnd);
        video.addEventListener('error', handleVideoError);
        video.addEventListener('loadstart', handleVideoLoadStart);
        video.addEventListener('canplay', handleVideoCanPlay);
        video.addEventListener('loadeddata', handleVideoLoadedData);
        video.addEventListener('waiting', handleVideoWaiting);
        video.addEventListener('playing', handleVideoPlaying);

        // Clear any existing timeout
        if (videoLoadTimeoutRef.current) {
            clearTimeout(videoLoadTimeoutRef.current);
        }

        // Set video source and load
        video.src = onboardingVideos[currentVideoIndex];
        video.load();

        // Set a timeout to force show video after 3 seconds if it hasn't loaded
        const timeout = setTimeout(() => {
            console.log('Video load timeout - forcing video to show');
            setIsVideoLoaded(true);
        }, 3000);
        videoLoadTimeoutRef.current = timeout;

        if (isVisible && !prefersReducedMotion) {
            video.play().catch((error) => {
                console.log('Autoplay failed:', error);
                // Autoplay failed, continue silently
            });
        }

        return () => {
            // Clear timeout
            if (videoLoadTimeoutRef.current) {
                clearTimeout(videoLoadTimeoutRef.current);
            }
            
            // Remove event listeners
            video.removeEventListener('ended', handleVideoEnd);
            video.removeEventListener('error', handleVideoError);
            video.removeEventListener('loadstart', handleVideoLoadStart);
            video.removeEventListener('canplay', handleVideoCanPlay);
            video.removeEventListener('loadeddata', handleVideoLoadedData);
            video.removeEventListener('waiting', handleVideoWaiting);
            video.removeEventListener('playing', handleVideoPlaying);
        };
    }, [currentVideoIndex, onboardingVideos, isVisible, prefersReducedMotion, handleVideoEnd, handleVideoError, handleVideoLoadStart, handleVideoCanPlay, handleVideoLoadedData, handleVideoWaiting, handleVideoPlaying]);

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
            {/* Fallback Image - Shows while video is loading */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url(/images/head_massage.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    zIndex: 1,
                    opacity: isVideoLoaded ? 0 : 1,
                    transition: 'opacity 0.5s ease-in-out'
                }}
            />

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
                    zIndex: 2,
                    opacity: isVideoLoaded ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out'
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
                    zIndex: 3
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
                    zIndex: 4
                }}
            />
        </>
    );
}
