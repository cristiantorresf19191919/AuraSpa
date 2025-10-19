'use client';

import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/lib/user-roles';
import { useLanguage } from '@/lib/language-context';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Avatar,
    Box,
    Typography,
    Menu,
    MenuItem,
    IconButton,
    Divider,
    Chip,
    useMediaQuery,
    useTheme,
    Button,
    Badge,
    Tooltip,
    Container,
    Fade,
    Slide
} from '@mui/material';
import {
    Person as PersonIcon,
    Logout as LogoutIcon,
    AccountCircle as AccountCircleIcon,
    Notifications as NotificationsIcon,
    PushPin as PushPinIcon,
    Group as GroupIcon,
    Dashboard as DashboardIcon,
    Settings as SettingsIcon,
    Home as HomeIcon,
    Spa as SpaIcon,
    VolumeUp as VolumeUpIcon,
    VolumeOff as VolumeOffIcon,
    PlayArrow as PlayIcon,
    Pause as PauseIcon,
    Menu as MenuIcon
} from '@mui/icons-material';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedHamburger from './AnimatedHamburger';
import MobileMenu from './MobileMenu';

export default function Header() {
    const { user, userRole, userInfo, logout } = useAuth();
    const { language, setLanguage, t } = useLanguage();
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const hamburgerRef = useRef<HTMLDivElement>(null);

    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isAudioLoading, setIsAudioLoading] = useState(false);
    const [audioError, setAudioError] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Initialize audio on component mount and set up event listeners
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = 0.3;

            // Set up event listeners for audio state changes
            const handlePlay = () => {
                setIsAudioPlaying(true);
                setIsAudioLoading(false);
                setAudioError(false);
            };
            const handlePause = () => {
                setIsAudioPlaying(false);
                setIsAudioLoading(false);
            };
            const handleEnded = () => {
                setIsAudioPlaying(false);
                setIsAudioLoading(false);
            };
            const handleVolumeChange = () => setIsMuted(audio.muted);
            const handleLoadStart = () => setIsAudioLoading(true);
            const handleCanPlay = () => setIsAudioLoading(false);
            const handleError = (e: Event) => {
                console.error('Audio loading error:', e);
                setIsAudioPlaying(false);
                setIsAudioLoading(false);
                setAudioError(true);
            };

            // Add event listeners
            audio.addEventListener('play', handlePlay);
            audio.addEventListener('pause', handlePause);
            audio.addEventListener('ended', handleEnded);
            audio.addEventListener('volumechange', handleVolumeChange);
            audio.addEventListener('loadstart', handleLoadStart);
            audio.addEventListener('canplay', handleCanPlay);
            audio.addEventListener('error', handleError);

            // Initialize state based on current audio state
            setIsAudioPlaying(!audio.paused);
            setIsMuted(audio.muted);

            // Cleanup event listeners
            return () => {
                audio.removeEventListener('play', handlePlay);
                audio.removeEventListener('pause', handlePause);
                audio.removeEventListener('ended', handleEnded);
                audio.removeEventListener('volumechange', handleVolumeChange);
                audio.removeEventListener('loadstart', handleLoadStart);
                audio.removeEventListener('canplay', handleCanPlay);
                audio.removeEventListener('error', handleError);
            };
        }
    }, []);

    // Function to decrease audio volume when video modal opens
    const decreaseAudioVolume = () => {
        const audio = audioRef.current;
        if (audio && isAudioPlaying) {
            audio.volume = 0.1; // Reduce to 10% when video modal opens
        }
    };

    // Function to restore audio volume when video modal closes
    const restoreAudioVolume = () => {
        const audio = audioRef.current;
        if (audio && isAudioPlaying) {
            audio.volume = 0.3; // Restore to 30% when video modal closes
        }
    };

    // Expose these functions globally so they can be called from the video modal
    useEffect(() => {
        (window as any).decreaseAudioVolume = decreaseAudioVolume;
        (window as any).restoreAudioVolume = restoreAudioVolume;

        return () => {
            delete (window as any).decreaseAudioVolume;
            delete (window as any).restoreAudioVolume;
        };
    }, [isAudioPlaying]);

    const handleAudioToggle = () => {
        const audio = audioRef.current;
        if (audio) {
            // Reset error state when user tries to interact
            if (audioError) {
                setAudioError(false);
            }

            try {
                if (isAudioPlaying) {
                    audio.pause();
                    // State will be updated by the 'pause' event listener
                } else {
                    setIsAudioLoading(true);
                    audio.play().catch(err => {
                        console.error('Audio play failed:', err);
                        setIsAudioLoading(false);
                        // Handle autoplay policy restrictions
                        if (err.name === 'NotAllowedError') {
                            console.log('Autoplay blocked by browser policy');
                        }
                    });
                    // State will be updated by the 'play' event listener
                }
            } catch (error) {
                console.error('Error toggling audio:', error);
                setIsAudioLoading(false);
            }
        }
    };

    const handleMuteToggle = () => {
        const audio = audioRef.current;
        if (audio) {
            try {
                audio.muted = !audio.muted;
                // State will be updated by the 'volumechange' event listener
            } catch (error) {
                console.error('Error toggling mute:', error);
            }
        }
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        handleMenuClose();
        await logout();
        router.push('/');
    };

    // Get current date in dd.mm.yyyy format - use static date to prevent hydration mismatch
    const currentDate = '19.10.2024'; // Static date to prevent hydration mismatch

    return (
        <header data-testid="header">
            {/* Hidden Audio Element */}
            <audio
                ref={audioRef}
                src="/brandingAudio.MP3"
                preload="auto"
                style={{ display: 'none' }}
                data-testid="background-audio"
            />

            {/* Enhanced Header with Modern Design */}
            <Box
                component="nav"
                sx={{
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.95) 0%, rgba(124, 58, 237, 0.95) 100%)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1200,
                    boxShadow: '0 8px 32px rgba(139, 92, 246, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                data-testid="header-navigation"
            >
                <Container maxWidth="xl">
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            py: { xs: 1.5, md: 2 },
                            minHeight: { xs: 64, md: 72 }
                        }}
                        data-testid="header-container"
                    >
                        {/* Left Section - Logo & Navigation */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 4 } }} data-testid="header-left-section">
                            {/* Mobile Menu Button */}
                            {isMobile && (
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Box ref={hamburgerRef}>
                                        <Tooltip title="Menu" arrow placement="bottom">
                                            <IconButton
                                                onClick={() => setMobileMenuOpen(true)}
                                                data-testid="mobile-menu-button"
                                                sx={{
                                                    color: 'white',
                                                    p: 1.5,
                                                    borderRadius: '12px',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                    backdropFilter: 'blur(10px)',
                                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                        transform: 'translateY(-1px)',
                                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                                                    },
                                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                                                }}
                                            >
                                                <AnimatedHamburger
                                                    isOpen={mobileMenuOpen}
                                                    onClick={() => setMobileMenuOpen(true)}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </motion.div>
                            )}

                            {/* Logo */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }} data-testid="logo-link">
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            cursor: 'pointer'
                                        }}
                                        data-testid="logo-container"
                                    >
                                        <img
                                            src="/logo.png"
                                            alt="Aura Logo"
                                            data-testid="logo-image"
                                            style={{
                                                width: isMobile ? '48px' : '56px',
                                                height: 'auto',
                                                objectFit: 'contain',
                                                filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2))'
                                            }}
                                        />
                                        {!isTablet && (
                                            <Typography
                                                variant="h5"
                                                data-testid="logo-text"
                                                sx={{
                                                    fontWeight: 800,
                                                    background: 'linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%)',
                                                    backgroundClip: 'text',
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                                    letterSpacing: '-0.5px'
                                                }}
                                            >
                                                AURA
                                            </Typography>
                                        )}
                                    </Box>
                                </Link>
                            </motion.div>

                            {/* Desktop Navigation */}
                            {!isMobile && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        ml: 4
                                    }}
                                    data-testid="desktop-navigation"
                                >
                                    {[
                                        { href: '/', icon: HomeIcon, label: t('home'), testId: 'nav-home' },
                                        { href: '/services', icon: SpaIcon, label: t('services'), testId: 'nav-services' },
                                        ...(user ? [{ href: '/dashboard', icon: DashboardIcon, label: t('dashboard'), testId: 'nav-dashboard' }] : [])
                                    ].map((item) => (
                                        <motion.div
                                            key={item.href}
                                            whileHover={{ y: -2 }}
                                            whileTap={{ y: 0 }}
                                        >
                                            <Tooltip title={item.label} arrow placement="bottom">
                                                <Link href={item.href} style={{ textDecoration: 'none' }} data-testid={item.testId}>
                                                    <Button
                                                        startIcon={<item.icon />}
                                                        data-testid={`${item.testId}-button`}
                                                        sx={{
                                                            color: 'white',
                                                            textTransform: 'none',
                                                            fontWeight: 600,
                                                            fontSize: '0.95rem',
                                                            px: 3,
                                                            py: 1.5,
                                                            borderRadius: '12px',
                                                            backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                                            backdropFilter: 'blur(10px)',
                                                            border: '1px solid rgba(255, 255, 255, 0.15)',
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                                                borderColor: 'rgba(255, 255, 255, 0.3)',
                                                                transform: 'translateY(-1px)',
                                                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                                                            },
                                                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                                                        }}
                                                    >
                                                        {item.label}
                                                    </Button>
                                                </Link>
                                            </Tooltip>
                                        </motion.div>
                                    ))}
                                </Box>
                            )}
                        </Box>

                        {/* Right Section - Actions & User */}
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: { xs: 1, sm: 2, md: 3 }
                            }}
                            data-testid="header-right-section"
                        >
                            {/* Audio Controls */}
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }} data-testid="audio-controls">
                                {/* Play/Pause Button */}
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Tooltip
                                        title={
                                            audioError ? "Audio Error - Click to retry" :
                                                isAudioLoading ? "Loading Audio..." :
                                                    isAudioPlaying ? "Pause Audio" : "Play Audio"
                                        }
                                        arrow
                                        placement="bottom"
                                    >
                                        <IconButton
                                            onClick={handleAudioToggle}
                                            disabled={isAudioLoading}
                                            data-testid="audio-play-pause-button"
                                            sx={{
                                                width: 44,
                                                height: 44,
                                                backgroundColor: audioError
                                                    ? 'rgba(239, 68, 68, 0.2)'
                                                    : 'rgba(255, 255, 255, 0.1)',
                                                backdropFilter: 'blur(10px)',
                                                border: `1px solid ${audioError
                                                    ? 'rgba(239, 68, 68, 0.3)'
                                                    : 'rgba(255, 255, 255, 0.2)'}`,
                                                color: audioError ? '#ef4444' : 'white',
                                                borderRadius: '12px',
                                                '&:hover': {
                                                    backgroundColor: audioError
                                                        ? 'rgba(239, 68, 68, 0.3)'
                                                        : 'rgba(255, 255, 255, 0.2)',
                                                    transform: 'translateY(-1px)',
                                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                                                },
                                                '&:disabled': {
                                                    opacity: 0.6,
                                                    cursor: 'not-allowed'
                                                },
                                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                                            }}
                                        >
                                            {isAudioLoading ? (
                                                <Box sx={{
                                                    width: 20,
                                                    height: 20,
                                                    border: '2px solid transparent',
                                                    borderTop: '2px solid currentColor',
                                                    borderRadius: '50%',
                                                    animation: 'spin 1s linear infinite',
                                                    '@keyframes spin': {
                                                        '0%': { transform: 'rotate(0deg)' },
                                                        '100%': { transform: 'rotate(360deg)' }
                                                    }
                                                }} data-testid="audio-loading-spinner" />
                                            ) : isAudioPlaying ? <PauseIcon data-testid="pause-icon" /> : <PlayIcon data-testid="play-icon" />}
                                        </IconButton>
                                    </Tooltip>
                                </motion.div>

                                {/* Mute/Unmute Button */}
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Tooltip title={isMuted ? "Unmute" : "Mute"} arrow placement="bottom">
                                        <IconButton
                                            onClick={handleMuteToggle}
                                            data-testid="audio-mute-button"
                                            sx={{
                                                width: 44,
                                                height: 44,
                                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                backdropFilter: 'blur(10px)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                color: isMuted ? '#ef4444' : 'white',
                                                borderRadius: '12px',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                    transform: 'translateY(-1px)',
                                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                                                },
                                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                                            }}
                                        >
                                            {isMuted ? <VolumeOffIcon data-testid="volume-off-icon" /> : <VolumeUpIcon data-testid="volume-up-icon" />}
                                        </IconButton>
                                    </Tooltip>
                                </motion.div>
                            </Box>

                            {/* Language Toggle */}
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Tooltip title="Change Language" arrow placement="bottom">
                                    <IconButton
                                        onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                                        data-testid="language-toggle-button"
                                        sx={{
                                            width: 48,
                                            height: 48,
                                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            borderRadius: '12px',
                                            color: 'white',
                                            fontSize: '0.9rem',
                                            fontWeight: 700,
                                            '&:hover': {
                                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                borderColor: 'rgba(255, 255, 255, 0.4)',
                                                transform: 'translateY(-1px)',
                                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                                            },
                                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                                        }}
                                    >
                                        <span data-testid="language-text">{language === 'es' ? 'EN' : 'ES'}</span>
                                    </IconButton>
                                </Tooltip>
                            </motion.div>

                            {/* Partner Button */}
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    component={Link}
                                    href="/partner"
                                    variant="outlined"
                                    data-testid="partner-button"
                                    sx={{
                                        color: 'white',
                                        borderColor: 'rgba(255, 255, 255, 0.4)',
                                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                        backdropFilter: 'blur(10px)',
                                        px: 3,
                                        py: 1.5,
                                        borderRadius: '12px',
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        borderWidth: '1.5px',
                                        '&:hover': {
                                            borderColor: 'white',
                                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                            transform: 'translateY(-1px)',
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                                        },
                                        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}
                                >
                                    <span data-testid="partner-button-text">{isMobile ? 'Socio' : 'Se nuestro Aura Socio'}</span>
                                </Button>
                            </motion.div>

                            {/* User Section */}
                            {user ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} data-testid="user-section">
                                    {/* Notifications */}
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Tooltip title="Notifications" arrow placement="bottom">
                                            <IconButton
                                                data-testid="notifications-button"
                                                sx={{
                                                    width: 44,
                                                    height: 44,
                                                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                                    backdropFilter: 'blur(10px)',
                                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                                    color: 'white',
                                                    borderRadius: '12px',
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                        transform: 'translateY(-1px)',
                                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                                                    },
                                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                                                }}
                                            >
                                                <Badge
                                                    badgeContent={3}
                                                    color="error"
                                                    data-testid="notifications-badge"
                                                    sx={{
                                                        '& .MuiBadge-badge': {
                                                            backgroundColor: '#ef4444',
                                                            color: 'white',
                                                            fontWeight: 600
                                                        }
                                                    }}
                                                >
                                                    <NotificationsIcon sx={{ fontSize: 20 }} data-testid="notifications-icon" />
                                                </Badge>
                                            </IconButton>
                                        </Tooltip>
                                    </motion.div>

                                    {/* User Role Badge */}
                                    {!isMobile && (
                                        <Chip
                                            label={userRole === UserRole.ADMIN ? 'Admin' :
                                                userRole === UserRole.MASSAGE_PROVIDER ? 'Provider' :
                                                    userRole === UserRole.CUSTOMER ? 'Customer' : 'Guest'}
                                            size="small"
                                            data-testid="user-role-badge"
                                            sx={{
                                                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                                color: 'white',
                                                fontWeight: 600,
                                                fontSize: '0.75rem',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(255, 255, 255, 0.2)'
                                            }}
                                        />
                                    )}

                                    {/* User Avatar */}
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Tooltip title="User Menu" arrow placement="bottom">
                                            <IconButton
                                                onClick={handleMenuOpen}
                                                data-testid="user-avatar-button"
                                                sx={{
                                                    p: 0,
                                                    '&:hover': {
                                                        transform: 'translateY(-1px)',
                                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                                                    },
                                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                                                }}
                                            >
                                                <Avatar
                                                    data-testid="user-avatar"
                                                    sx={{
                                                        width: { xs: 40, md: 44 },
                                                        height: { xs: 40, md: 44 },
                                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                        border: '2px solid rgba(255, 255, 255, 0.3)',
                                                        fontSize: '1.1rem',
                                                        fontWeight: 600,
                                                        '&:hover': {
                                                            borderColor: 'rgba(255, 255, 255, 0.5)'
                                                        }
                                                    }}
                                                >
                                                    <span data-testid="user-avatar-initial">
                                                        {userInfo?.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                                                    </span>
                                                </Avatar>
                                            </IconButton>
                                        </Tooltip>
                                    </motion.div>

                                    {/* User Menu */}
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl)}
                                        onClose={handleMenuClose}
                                        data-testid="user-menu"
                                        PaperProps={{
                                            sx: {
                                                mt: 1,
                                                minWidth: 240,
                                                borderRadius: '16px',
                                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 32px rgba(139, 92, 246, 0.1)',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                backdropFilter: 'blur(20px)',
                                                backgroundColor: 'rgba(255, 255, 255, 0.95)'
                                            }
                                        }}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        TransitionComponent={Fade}
                                        transitionDuration={200}
                                    >
                                        {/* User Info Header */}
                                        <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }} data-testid="user-menu-header">
                                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }} data-testid="user-menu-name">
                                                {userInfo?.name || 'User'}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }} data-testid="user-menu-email">
                                                {user.email}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" data-testid="user-menu-date">
                                                {currentDate}
                                            </Typography>
                                        </Box>

                                        {/* Menu Items */}
                                        {[
                                            { icon: DashboardIcon, label: t('dashboard'), href: '/dashboard', testId: 'menu-dashboard' },
                                            { icon: AccountCircleIcon, label: t('profile'), href: '/profile', testId: 'menu-profile' },
                                            { icon: SettingsIcon, label: t('settings'), href: '/settings', testId: 'menu-settings' }
                                        ].map((item) => (
                                            <MenuItem
                                                key={item.href}
                                                onClick={() => {
                                                    handleMenuClose();
                                                    router.push(item.href);
                                                }}
                                                data-testid={item.testId}
                                                sx={{
                                                    py: 2,
                                                    px: 3,
                                                    '&:hover': {
                                                        backgroundColor: 'rgba(139, 92, 246, 0.08)'
                                                    }
                                                }}
                                            >
                                                <item.icon sx={{ mr: 2, fontSize: 20, color: 'primary.main' }} data-testid={`${item.testId}-icon`} />
                                                <Typography sx={{ fontWeight: 500 }} data-testid={`${item.testId}-label`}>
                                                    {item.label}
                                                </Typography>
                                            </MenuItem>
                                        ))}

                                        <Divider sx={{ my: 1 }} data-testid="user-menu-divider" />

                                        {/* Logout */}
                                        <MenuItem
                                            onClick={handleLogout}
                                            data-testid="menu-logout"
                                            sx={{
                                                py: 2,
                                                px: 3,
                                                color: 'error.main',
                                                '&:hover': {
                                                    backgroundColor: 'error.light',
                                                    color: 'white'
                                                }
                                            }}
                                        >
                                            <LogoutIcon sx={{ mr: 2, fontSize: 20 }} data-testid="logout-icon" />
                                            <Typography sx={{ fontWeight: 500 }} data-testid="logout-label">
                                                {t('logout')}
                                            </Typography>
                                        </MenuItem>
                                    </Menu>
                                </Box>
                            ) : (
                                /* Guest Actions */
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} data-testid="guest-actions">
                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                            component={Link}
                                            href="/authentication"
                                            variant="outlined"
                                            data-testid="sign-in-button"
                                            sx={{
                                                color: 'white',
                                                borderColor: 'rgba(255, 255, 255, 0.4)',
                                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                                backdropFilter: 'blur(10px)',
                                                textTransform: 'none',
                                                fontWeight: 600,
                                                px: 3,
                                                py: 1.5,
                                                borderRadius: '12px',
                                                borderWidth: '1.5px',
                                                '&:hover': {
                                                    borderColor: 'white',
                                                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                                                    transform: 'translateY(-1px)',
                                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                                                },
                                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                                            }}
                                        >
                                            <span data-testid="sign-in-text">{t('sign.in')}</span>
                                        </Button>
                                    </motion.div>

                                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                            component={Link}
                                            href="/auth"
                                            variant="contained"
                                            data-testid="get-started-button"
                                            sx={{
                                                backgroundColor: 'white',
                                                color: 'primary.main',
                                                textTransform: 'none',
                                                fontWeight: 700,
                                                px: 4,
                                                py: 1.5,
                                                borderRadius: '12px',
                                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                                '&:hover': {
                                                    backgroundColor: 'grey.50',
                                                    transform: 'translateY(-1px)',
                                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
                                                },
                                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                                            }}
                                        >
                                            <span data-testid="get-started-text">{t('get.started')}</span>
                                        </Button>
                                    </motion.div>
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                triggerRef={hamburgerRef}
            />
        </header>
    );
}
