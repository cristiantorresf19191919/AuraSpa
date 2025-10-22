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
    Slide,
    Stack,
    alpha,
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
    Menu as MenuIcon,
    Close as CloseIcon,
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

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            await logout();
            handleMenuClose();
            router.push('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const toggleAudio = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isAudioPlaying) {
                audio.pause();
            } else {
                audio.play().catch((error) => {
                    console.error('Audio play failed:', error);
                    setAudioError(true);
                });
            }
        }
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (audio) {
            audio.muted = !audio.muted;
            setIsMuted(audio.muted);
        }
    };

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'es' : 'en');
    };

    const getRoleColor = (role: UserRole) => {
        switch (role) {
            case UserRole.ADMIN:
                return 'error';
            case UserRole.PROVIDER:
                return 'primary';
            case UserRole.CLIENT:
                return 'success';
            default:
                return 'default';
        }
    };

    const getRoleLabel = (role: UserRole) => {
        switch (role) {
            case UserRole.ADMIN:
                return 'Admin';
            case UserRole.PROVIDER:
                return 'Provider';
            case UserRole.CLIENT:
                return 'Client';
            default:
                return 'Guest';
        }
    };

    return (
        <>
            {/* Hidden audio element */}
            <audio
                ref={audioRef}
                src="/brandingAudio.mp3"
                loop
                preload="auto"
                style={{ display: 'none' }}
            />

            {/* Enhanced Header */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.95) 0%, rgba(124, 58, 237, 0.95) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Container maxWidth="xl">
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            py: { xs: 1.5, sm: 2 },
                            minHeight: { xs: '60px', sm: '70px' },
                        }}
                    >
                        {/* Enhanced Logo Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Link href="/" style={{ textDecoration: 'none' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                        },
                                    }}
                                >
                                    {/* Enhanced Logo Icon */}
                                    <Box
                                        sx={{
                                            width: { xs: 40, sm: 48 },
                                            height: { xs: 40, sm: 48 },
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mr: 2,
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            backdropFilter: 'blur(10px)',
                                        }}
                                    >
                                        <SpaIcon
                                            sx={{
                                                fontSize: { xs: '1.5rem', sm: '1.8rem' },
                                                color: 'rgba(255, 255, 255, 0.9)',
                                            }}
                                        />
                                    </Box>

                                    {/* Enhanced Brand Text */}
                                    <Box>
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.95)',
                                                fontWeight: 800,
                                                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                                                letterSpacing: '-0.02em',
                                                lineHeight: 1,
                                            }}
                                        >
                                            AURA
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.8)',
                                                fontSize: { xs: '0.7rem', sm: '0.8rem' },
                                                fontWeight: 500,
                                                letterSpacing: '0.1em',
                                            }}
                                        >
                                            WELLNESS
                                        </Typography>
                                    </Box>
                                </Box>
                            </Link>
                        </motion.div>

                        {/* Enhanced Navigation */}
                        {!isMobile && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Button
                                        component={Link}
                                        href="/"
                                        startIcon={<HomeIcon />}
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.9)',
                                            fontWeight: 600,
                                            textTransform: 'none',
                                            borderRadius: '12px',
                                            px: 2,
                                            py: 1,
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            '&:hover': {
                                                background: 'rgba(255, 255, 255, 0.2)',
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                                            },
                                        }}
                                    >
                                        Home
                                    </Button>
                                    <Button
                                        component={Link}
                                        href="/services"
                                        startIcon={<SpaIcon />}
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.9)',
                                            fontWeight: 600,
                                            textTransform: 'none',
                                            borderRadius: '12px',
                                            px: 2,
                                            py: 1,
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            '&:hover': {
                                                background: 'rgba(255, 255, 255, 0.2)',
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
                                            },
                                        }}
                                    >
                                        Services
                                    </Button>
                                </Stack>
                            </motion.div>
                        )}

                        {/* Enhanced Right Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <Stack direction="row" spacing={1} alignItems="center">
                                {/* Audio Controls */}
                                <Tooltip title={isAudioPlaying ? 'Pause Audio' : 'Play Audio'}>
                                    <IconButton
                                        onClick={toggleAudio}
                                        disabled={audioError}
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.8)',
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            '&:hover': {
                                                background: 'rgba(255, 255, 255, 0.2)',
                                                transform: 'scale(1.1)',
                                            },
                                        }}
                                    >
                                        {isAudioLoading ? (
                                            <Box
                                                sx={{
                                                    width: 20,
                                                    height: 20,
                                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                                    borderTop: '2px solid rgba(255, 255, 255, 0.8)',
                                                    borderRadius: '50%',
                                                    animation: 'spin 1s linear infinite',
                                                }}
                                            />
                                        ) : isAudioPlaying ? (
                                            <PauseIcon />
                                        ) : (
                                            <PlayIcon />
                                        )}
                                    </IconButton>
                                </Tooltip>

                                {/* Mute Control */}
                                <Tooltip title={isMuted ? 'Unmute' : 'Mute'}>
                                    <IconButton
                                        onClick={toggleMute}
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.8)',
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            '&:hover': {
                                                background: 'rgba(255, 255, 255, 0.2)',
                                                transform: 'scale(1.1)',
                                            },
                                        }}
                                    >
                                        {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                                    </IconButton>
                                </Tooltip>

                                {/* Language Toggle */}
                                <Tooltip title="Toggle Language">
                                    <Button
                                        onClick={toggleLanguage}
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.9)',
                                            fontWeight: 600,
                                            textTransform: 'none',
                                            borderRadius: '12px',
                                            px: 2,
                                            py: 1,
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            '&:hover': {
                                                background: 'rgba(255, 255, 255, 0.2)',
                                                transform: 'translateY(-2px)',
                                            },
                                        }}
                                    >
                                        {language === 'en' ? 'ES' : 'EN'}
                                    </Button>
                                </Tooltip>

                                {/* Partner Button */}
                                <Button
                                    component={Link}
                                    href="/onboarding"
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.9)',
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        borderRadius: '12px',
                                        px: 2,
                                        py: 1,
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        backdropFilter: 'blur(10px)',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        '&:hover': {
                                            background: 'rgba(255, 255, 255, 0.2)',
                                            transform: 'translateY(-2px)',
                                        },
                                    }}
                                >
                                    Become Partner
                                </Button>

                                {/* User Section */}
                                {user ? (
                                    <>
                                        {/* Notifications */}
                                        <Tooltip title="Notifications">
                                            <IconButton
                                                sx={{
                                                    color: 'rgba(255, 255, 255, 0.8)',
                                                    background: 'rgba(255, 255, 255, 0.1)',
                                                    backdropFilter: 'blur(10px)',
                                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    '&:hover': {
                                                        background: 'rgba(255, 255, 255, 0.2)',
                                                        transform: 'scale(1.1)',
                                                    },
                                                }}
                                            >
                                                <Badge badgeContent={0} color="error">
                                                    <NotificationsIcon />
                                                </Badge>
                                            </IconButton>
                                        </Tooltip>

                                        {/* User Menu */}
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Chip
                                                label={getRoleLabel(userRole)}
                                                color={getRoleColor(userRole)}
                                                size="small"
                                                sx={{
                                                    mr: 1,
                                                    fontWeight: 600,
                                                    fontSize: '0.7rem',
                                                }}
                                            />
                                            <IconButton
                                                onClick={handleMenuOpen}
                                                sx={{
                                                    p: 0.5,
                                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                    '&:hover': {
                                                        transform: 'scale(1.1)',
                                                    },
                                                }}
                                            >
                                                <Avatar
                                                    src={userInfo?.photoURL || undefined}
                                                    sx={{
                                                        width: { xs: 32, sm: 36 },
                                                        height: { xs: 32, sm: 36 },
                                                        border: '2px solid rgba(255, 255, 255, 0.3)',
                                                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
                                                    }}
                                                >
                                                    {userInfo?.displayName?.[0] || user.email?.[0] || 'U'}
                                                </Avatar>
                                            </IconButton>
                                        </Box>

                                        {/* Enhanced User Menu */}
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleMenuClose}
                                            TransitionComponent={Fade}
                                            PaperProps={{
                                                sx: {
                                                    background: 'rgba(255, 255, 255, 0.95)',
                                                    backdropFilter: 'blur(20px)',
                                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                                    borderRadius: '16px',
                                                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                                                    mt: 1,
                                                    minWidth: 200,
                                                },
                                            }}
                                        >
                                            <MenuItem onClick={handleMenuClose}>
                                                <AccountCircleIcon sx={{ mr: 2, color: 'rgba(139, 92, 246, 0.8)' }} />
                                                Profile
                                            </MenuItem>
                                            <MenuItem onClick={handleMenuClose}>
                                                <DashboardIcon sx={{ mr: 2, color: 'rgba(139, 92, 246, 0.8)' }} />
                                                Dashboard
                                            </MenuItem>
                                            <MenuItem onClick={handleMenuClose}>
                                                <SettingsIcon sx={{ mr: 2, color: 'rgba(139, 92, 246, 0.8)' }} />
                                                Settings
                                            </MenuItem>
                                            <Divider />
                                            <MenuItem onClick={handleLogout}>
                                                <LogoutIcon sx={{ mr: 2, color: 'rgba(239, 68, 68, 0.8)' }} />
                                                Logout
                                            </MenuItem>
                                        </Menu>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            component={Link}
                                            href="/authentication"
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.9)',
                                                fontWeight: 600,
                                                textTransform: 'none',
                                                borderRadius: '12px',
                                                px: 2,
                                                py: 1,
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                backdropFilter: 'blur(10px)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                '&:hover': {
                                                    background: 'rgba(255, 255, 255, 0.2)',
                                                    transform: 'translateY(-2px)',
                                                },
                                            }}
                                        >
                                            Sign In
                                        </Button>
                                        <Button
                                            component={Link}
                                            href="/authentication"
                                            variant="contained"
                                            sx={{
                                                background: 'rgba(255, 255, 255, 0.9)',
                                                color: 'rgba(139, 92, 246, 0.9)',
                                                fontWeight: 700,
                                                textTransform: 'none',
                                                borderRadius: '12px',
                                                px: 3,
                                                py: 1,
                                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                '&:hover': {
                                                    background: 'rgba(255, 255, 255, 1)',
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
                                                },
                                            }}
                                        >
                                            Get Started
                                        </Button>
                                    </>
                                )}

                                {/* Mobile Menu Button */}
                                {isMobile && (
                                    <IconButton
                                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.9)',
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                            '&:hover': {
                                                background: 'rgba(255, 255, 255, 0.2)',
                                                transform: 'scale(1.1)',
                                            },
                                        }}
                                    >
                                        <AnimatedHamburger isOpen={mobileMenuOpen} />
                                    </IconButton>
                                )}
                            </Stack>
                        </motion.div>
                    </Box>
                </Container>
            </Box>

            {/* Enhanced Mobile Menu */}
            <AnimatePresence>
                {isMobile && mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Box
                            sx={{
                                position: 'fixed',
                                top: { xs: '60px', sm: '70px' },
                                left: 0,
                                right: 0,
                                zIndex: 999,
                                background: 'rgba(139, 92, 246, 0.95)',
                                backdropFilter: 'blur(20px)',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <Container>
                                <Box sx={{ py: 2 }}>
                                    <Stack spacing={2}>
                                        <Button
                                            component={Link}
                                            href="/"
                                            startIcon={<HomeIcon />}
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.9)',
                                                fontWeight: 600,
                                                textTransform: 'none',
                                                justifyContent: 'flex-start',
                                                borderRadius: '12px',
                                                px: 2,
                                                py: 1.5,
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                backdropFilter: 'blur(10px)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                            }}
                                        >
                                            Home
                                        </Button>
                                        <Button
                                            component={Link}
                                            href="/services"
                                            startIcon={<SpaIcon />}
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.9)',
                                                fontWeight: 600,
                                                textTransform: 'none',
                                                justifyContent: 'flex-start',
                                                borderRadius: '12px',
                                                px: 2,
                                                py: 1.5,
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                backdropFilter: 'blur(10px)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                            }}
                                        >
                                            Services
                                        </Button>
                                    </Stack>
                                </Box>
                            </Container>
                        </Box>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Spacer to prevent content overlap */}
            <Box sx={{ height: { xs: '60px', sm: '70px' } }} />
        </>
    );
}
