'use client';

import { useAuth } from '@/lib/auth-context';
import { UserRole } from '@/lib/user-roles';
import { useLanguage } from '@/lib/language-context';
import { useToast } from '@/lib/toast-context';
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
    Stack,
} from '@mui/material';
import {
    Person as PersonIcon,
    Logout as LogoutIcon,
    AccountCircle as AccountCircleIcon,
    Notifications as NotificationsIcon,
    Dashboard as DashboardIcon,
    Settings as SettingsIcon,
    Home as HomeIcon,
    Spa as SpaIcon,
    VolumeUp as VolumeUpIcon,
    VolumeOff as VolumeOffIcon,
    PlayArrow as PlayIcon,
    Pause as PauseIcon,
    Menu as MenuIcon,
} from '@mui/icons-material';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
    const { user, userRole, userInfo, logout } = useAuth();
    const { language, setLanguage } = useLanguage();
    const { showSuccess, showError } = useToast();
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isAudioLoading, setIsAudioLoading] = useState(false);
    const [audioError, setAudioError] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Initialize audio on component mount
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = 0.3;

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
            const handleError = () => {
                setIsAudioPlaying(false);
                setIsAudioLoading(false);
                setAudioError(true);
            };

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
            showSuccess('Logging out...');
            await logout();
            // The logout function will handle the redirect
        } catch (error) {
            console.error('Logout error:', error);
            showError('Failed to logout. Please try again.');
        }
    };

    const toggleAudio = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isAudioPlaying) {
                audio.pause();
            } else {
                audio.play().catch(() => setAudioError(true));
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
            case UserRole.ADMIN: return 'error';
            case UserRole.PROVIDER: return 'primary';
            case UserRole.CLIENT: return 'success';
            default: return 'default';
        }
    };

    const getRoleLabel = (role: UserRole) => {
        switch (role) {
            case UserRole.ADMIN: return 'Admin';
            case UserRole.PROVIDER: return 'Provider';
            case UserRole.CLIENT: return 'Client';
            default: return 'Guest';
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

            {/* Compact Header */}
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
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Container maxWidth="xl">
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            py: 1, // Reduced padding
                            minHeight: '56px', // Reduced height
                        }}
                    >
                        {/* Compact Logo */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <Link href="/" style={{ textDecoration: 'none' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s ease',
                                        '&:hover': { transform: 'translateY(-1px)' },
                                    }}
                                >
                                    {/* Compact Logo Icon */}
                                    <Box
                                        sx={{
                                            width: 32,
                                            height: 32,
                                            borderRadius: '50%',
                                            background: 'rgba(255, 255, 255, 0.2)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            mr: 1.5,
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                        }}
                                    >
                                        <SpaIcon sx={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.9)' }} />
                                    </Box>

                                    {/* Compact Brand Text */}
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.95)',
                                            fontWeight: 700,
                                            fontSize: '1.1rem',
                                            letterSpacing: '-0.01em',
                                        }}
                                    >
                                        AURA
                                    </Typography>
                                </Box>
                            </Link>
                        </motion.div>

                        {/* Desktop Navigation */}
                        {!isMobile && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                            >
                                <Stack direction="row" spacing={0.5} alignItems="center">
                                    <Button
                                        component={Link}
                                        href="/"
                                        startIcon={<HomeIcon />}
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.9)',
                                            fontWeight: 500,
                                            textTransform: 'none',
                                            borderRadius: '8px',
                                            px: 1.5,
                                            py: 0.5,
                                            fontSize: '0.9rem',
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            '&:hover': {
                                                background: 'rgba(255, 255, 255, 0.2)',
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
                                            fontWeight: 500,
                                            textTransform: 'none',
                                            borderRadius: '8px',
                                            px: 1.5,
                                            py: 0.5,
                                            fontSize: '0.9rem',
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            '&:hover': {
                                                background: 'rgba(255, 255, 255, 0.2)',
                                            },
                                        }}
                                    >
                                        Services
                                    </Button>
                                </Stack>
                            </motion.div>
                        )}

                        {/* Compact Right Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            <Stack direction="row" spacing={0.5} alignItems="center">
                                {/* Compact Audio Controls */}
                                <Tooltip title={isAudioPlaying ? 'Pause' : 'Play'}>
                                    <IconButton
                                        onClick={toggleAudio}
                                        disabled={audioError}
                                        size="small"
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.8)',
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            '&:hover': { background: 'rgba(255, 255, 255, 0.2)' },
                                        }}
                                    >
                                        {isAudioLoading ? (
                                            <Box
                                                sx={{
                                                    width: 16,
                                                    height: 16,
                                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                                    borderTop: '2px solid rgba(255, 255, 255, 0.8)',
                                                    borderRadius: '50%',
                                                    animation: 'spin 1s linear infinite',
                                                }}
                                            />
                                        ) : isAudioPlaying ? (
                                            <PauseIcon fontSize="small" />
                                        ) : (
                                            <PlayIcon fontSize="small" />
                                        )}
                                    </IconButton>
                                </Tooltip>

                                {/* Compact Mute Control */}
                                <Tooltip title={isMuted ? 'Unmute' : 'Mute'}>
                                    <IconButton
                                        onClick={toggleMute}
                                        size="small"
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.8)',
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            '&:hover': { background: 'rgba(255, 255, 255, 0.2)' },
                                        }}
                                    >
                                        {isMuted ? <VolumeOffIcon fontSize="small" /> : <VolumeUpIcon fontSize="small" />}
                                    </IconButton>
                                </Tooltip>

                                {/* Compact Language Toggle */}
                                <Button
                                    onClick={toggleLanguage}
                                    size="small"
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.9)',
                                        fontWeight: 500,
                                        textTransform: 'none',
                                        borderRadius: '6px',
                                        px: 1,
                                        py: 0.5,
                                        fontSize: '0.8rem',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        minWidth: 'auto',
                                        '&:hover': { background: 'rgba(255, 255, 255, 0.2)' },
                                    }}
                                >
                                    {language === 'en' ? 'ES' : 'EN'}
                                </Button>

                                {/* Compact Partner Button */}
                                <Button
                                    component={Link}
                                    href="/onboarding"
                                    size="small"
                                    sx={{
                                        color: 'rgba(255, 255, 255, 0.9)',
                                        fontWeight: 500,
                                        textTransform: 'none',
                                        borderRadius: '6px',
                                        px: 1.5,
                                        py: 0.5,
                                        fontSize: '0.8rem',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        '&:hover': { background: 'rgba(255, 255, 255, 0.2)' },
                                    }}
                                >
                                    Partner
                                </Button>

                                {/* User Section */}
                                {user ? (
                                    <>
                                        {/* Compact Notifications */}
                                        <Tooltip title="Notifications">
                                            <IconButton
                                                size="small"
                                                sx={{
                                                    color: 'rgba(255, 255, 255, 0.8)',
                                                    background: 'rgba(255, 255, 255, 0.1)',
                                                    '&:hover': { background: 'rgba(255, 255, 255, 0.2)' },
                                                }}
                                            >
                                                <Badge badgeContent={0} color="error" size="small">
                                                    <NotificationsIcon fontSize="small" />
                                                </Badge>
                                            </IconButton>
                                        </Tooltip>

                                        {/* Compact User Menu */}
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Chip
                                                label={getRoleLabel(userRole)}
                                                color={getRoleColor(userRole)}
                                                size="small"
                                                sx={{
                                                    mr: 0.5,
                                                    fontWeight: 500,
                                                    fontSize: '0.65rem',
                                                    height: '20px',
                                                }}
                                            />
                                            <IconButton
                                                onClick={handleMenuOpen}
                                                size="small"
                                                sx={{ p: 0.25 }}
                                            >
                                                <Avatar
                                                    src={userInfo?.photoURL || undefined}
                                                    sx={{
                                                        width: 28,
                                                        height: 28,
                                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                                        fontSize: '0.8rem',
                                                    }}
                                                >
                                                    {userInfo?.displayName?.[0] || user.email?.[0] || 'U'}
                                                </Avatar>
                                            </IconButton>
                                        </Box>

                                        {/* Compact User Menu */}
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
                                                    borderRadius: '12px',
                                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                                                    mt: 0.5,
                                                    minWidth: 160,
                                                },
                                            }}
                                        >
                                            <MenuItem onClick={handleMenuClose} sx={{ py: 1 }}>
                                                <AccountCircleIcon sx={{ mr: 1.5, fontSize: '1.1rem', color: 'rgba(139, 92, 246, 0.8)' }} />
                                                Profile
                                            </MenuItem>
                                            <MenuItem onClick={handleMenuClose} sx={{ py: 1 }}>
                                                <DashboardIcon sx={{ mr: 1.5, fontSize: '1.1rem', color: 'rgba(139, 92, 246, 0.8)' }} />
                                                Dashboard
                                            </MenuItem>
                                            <MenuItem onClick={handleMenuClose} sx={{ py: 1 }}>
                                                <SettingsIcon sx={{ mr: 1.5, fontSize: '1.1rem', color: 'rgba(139, 92, 246, 0.8)' }} />
                                                Settings
                                            </MenuItem>
                                            <Divider />
                                            <MenuItem onClick={handleLogout} sx={{ py: 1 }}>
                                                <LogoutIcon sx={{ mr: 1.5, fontSize: '1.1rem', color: 'rgba(239, 68, 68, 0.8)' }} />
                                                Logout
                                            </MenuItem>
                                        </Menu>
                                    </>
                                ) : (
                                    <>
                                        <Button
                                            component={Link}
                                            href="/authentication"
                                            size="small"
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.9)',
                                                fontWeight: 500,
                                                textTransform: 'none',
                                                borderRadius: '6px',
                                                px: 1.5,
                                                py: 0.5,
                                                fontSize: '0.8rem',
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                '&:hover': { background: 'rgba(255, 255, 255, 0.2)' },
                                            }}
                                        >
                                            Sign In
                                        </Button>
                                        <Button
                                            component={Link}
                                            href="/authentication"
                                            variant="contained"
                                            size="small"
                                            sx={{
                                                background: 'rgba(255, 255, 255, 0.9)',
                                                color: 'rgba(139, 92, 246, 0.9)',
                                                fontWeight: 600,
                                                textTransform: 'none',
                                                borderRadius: '6px',
                                                px: 1.5,
                                                py: 0.5,
                                                fontSize: '0.8rem',
                                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                                '&:hover': {
                                                    background: 'rgba(255, 255, 255, 1)',
                                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
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
                                        size="small"
                                        sx={{
                                            color: 'rgba(255, 255, 255, 0.9)',
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            '&:hover': { background: 'rgba(255, 255, 255, 0.2)' },
                                        }}
                                    >
                                        <MenuIcon fontSize="small" />
                                    </IconButton>
                                )}
                            </Stack>
                        </motion.div>
                    </Box>
                </Container>
            </Box>

            {/* Compact Mobile Menu */}
            <AnimatePresence>
                {isMobile && mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Box
                            sx={{
                                position: 'fixed',
                                top: '56px',
                                left: 0,
                                right: 0,
                                zIndex: 999,
                                background: 'rgba(139, 92, 246, 0.95)',
                                backdropFilter: 'blur(20px)',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <Container>
                                <Box sx={{ py: 1.5 }}>
                                    <Stack spacing={1}>
                                        <Button
                                            component={Link}
                                            href="/"
                                            startIcon={<HomeIcon />}
                                            sx={{
                                                color: 'rgba(255, 255, 255, 0.9)',
                                                fontWeight: 500,
                                                textTransform: 'none',
                                                justifyContent: 'flex-start',
                                                borderRadius: '8px',
                                                px: 1.5,
                                                py: 1,
                                                fontSize: '0.9rem',
                                                background: 'rgba(255, 255, 255, 0.1)',
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
                                                fontWeight: 500,
                                                textTransform: 'none',
                                                justifyContent: 'flex-start',
                                                borderRadius: '8px',
                                                px: 1.5,
                                                py: 1,
                                                fontSize: '0.9rem',
                                                background: 'rgba(255, 255, 255, 0.1)',
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

            {/* Reduced spacer */}
            <Box sx={{ height: '56px' }} />
        </>
    );
}
