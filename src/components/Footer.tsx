'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitHub } from '@mui/icons-material';
import {
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Link,
  Avatar,
  Container,
  Button
} from '@mui/material';
import {
  Person,
  Person2,
  Spa as SpaIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon
} from '@mui/icons-material';
import Image from 'next/image';

interface TeamMember {
  name: string;
  github: string;
  linkedin?: string;
  role: 'Developer' | 'UI/UX Designer' | 'Scrum Master' | 'Product Owner';
  gender: 'male' | 'female';
  imageName: string;
}

const teamMembers: TeamMember[] = [
  { name: 'Cristian Torres', github: 'https://github.com/cristiantorresf19191919', role: 'Developer', gender: 'male', imageName: 'Cristian.jpeg' }
];

const availableColors = [
  '#8B5CF6', // Purple
  '#FF6B6B', // Red/Orange
  '#00CED1', // Dark Turquoise
  '#4169E1', // Royal Blue
  '#FF8E53', // Orange
  '#32CD32', // Lime Green
  '#FF1493', // Deep Pink
  '#228B22', // Forest Green
  '#8B4513', // Saddle Brown
  '#9B59B6', // Purple
  '#1E90FF', // Dodger Blue
  '#E74C3C', // Red
  '#2ECC71', // Green
  '#FF4500', // Orange Red
  '#20B2AA', // Light Sea Green
  '#8A2BE2', // Blue Violet
  '#DC143C', // Crimson
  '#00FA9A', // Medium Spring Green
  '#FF6347', // Tomato
  '#9370DB', // Medium Purple
  '#3CB371', // Medium Sea Green
  '#FF69B4', // Hot Pink
  '#4682B4', // Steel Blue
  '#9932CC', // Dark Orchid
  '#B8860B', // Dark Goldenrod
  '#006400', // Dark Green
  '#191970', // Midnight Blue
  '#8B008B', // Dark Magenta
  '#B22222', // Fire Brick
];

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Animation variants for staggering
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const
    }
  }
};

export default function Footer() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Group team members by role
  const groupedMembers = useMemo(() => {
    const grouped = teamMembers.reduce((acc, member) => {
      if (!acc[member.role]) {
        acc[member.role] = [];
      }
      acc[member.role].push(member);
      return acc;
    }, {} as Record<string, TeamMember[]>);

    // Shuffle the order of roles and members for variety
    const shuffledEntries = shuffleArray(Object.entries(grouped));
    const shuffledGrouped = Object.fromEntries(shuffledEntries);
    const shuffledColors = shuffleArray(availableColors);
    const roleColors: Record<string, string> = {};

    Object.keys(shuffledGrouped).forEach((role, index) => {
      roleColors[role] = shuffledColors[index % shuffledColors.length];
    });

    return { grouped: shuffledGrouped, colors: roleColors };
  }, []);

  const { grouped, colors: roleColors } = groupedMembers;

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#0F0F23',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%)'
        }
      }}
    >
      {/* Background Pattern */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.05,
        background: `
          radial-gradient(circle at 20% 80%, #8B5CF6 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, #EC4899 0%, transparent 50%)
        `,
        zIndex: 1
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        {/* Main Footer Content */}
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          py: 10
        }}>
          {/* Company Info - Enhanced */}
          <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                  delay: 0.5
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Box sx={{
                  width: 100,
                  height: 100,
                  borderRadius: '24px',
                  bgcolor: 'rgba(255,255,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 4,
                  boxShadow: '0 12px 40px rgba(139, 92, 246, 0.4)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  backdropFilter: 'blur(15px)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 16px 50px rgba(139, 92, 246, 0.6)',
                    borderColor: 'rgba(255,255,255,0.5)'
                  }
                }}>
                  <img
                    src="/logo.png"
                    alt="Aura Logo"
                    style={{
                      width: '90%',
                      height: '90%',
                      objectFit: 'contain'
                    }}
                  />
                </Box>
              </motion.div>
            </Box>

            <Typography variant="body1" sx={{
              mb: 4,
              lineHeight: 1.8,
              opacity: 0.9,
              fontSize: '1.1rem',
              maxWidth: '400px'
            }}>
              Experimenta la relajación definitiva con nuestros servicios premium de terapia de masajes.
              Terapeutas profesionales, programación flexible y satisfacción garantizada.
            </Typography>

            {/* Enhanced Social Media Links */}
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              {[
                { icon: FacebookIcon, color: '#1877F2' },
                { icon: TwitterIcon, color: '#1DA1F2' },
                { icon: InstagramIcon, color: '#E4405F' },
                { icon: LinkedInIcon, color: '#0A66C2' }
              ].map((social, index) => (
                <IconButton
                  key={index}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.08)',
                    color: 'white',
                    width: 48,
                    height: 48,
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      bgcolor: social.color,
                      transform: 'translateY(-3px)',
                      boxShadow: `0 12px 25px ${social.color}40`,
                      borderColor: social.color
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <social.icon />
                </IconButton>
              ))}
            </Box>

            {/* Enhanced Newsletter Signup */}
            <Box sx={{
              bgcolor: 'rgba(255,255,255,0.05)',
              borderRadius: '20px',
              p: 3,
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)'
            }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'white' }}>
                🎉 Stay Updated
              </Typography>
              <Typography variant="body2" sx={{ mb: 3, opacity: 0.8, lineHeight: 1.6 }}>
                Get exclusive wellness tips and special offers delivered to your inbox
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, flexDirection: { xs: 'column', sm: 'row' } }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    flex: 1,
                    padding: '14px 18px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    fontSize: '14px',
                    outline: 'none',
                    background: 'rgba(255,255,255,0.1)',
                    color: 'white',
                    backdropFilter: 'blur(10px)'
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontWeight: 600,
                    minWidth: { xs: '100%', sm: 'auto' },
                    '&:hover': {
                      bgcolor: 'primary.dark',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 25px rgba(139, 92, 246, 0.4)'
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Box>
          </Box>

          {/* Quick Links - Enhanced */}
          <Box sx={{ flex: '0 1 200px', minWidth: 0 }}>
            <Typography variant="h6" sx={{
              fontWeight: 700,
              mb: 4,
              color: 'white',
              fontSize: '1.2rem',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: 30,
                height: '3px',
                bgcolor: 'primary.main',
                borderRadius: '2px'
              }
            }}>
              Services
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {[
                { name: 'Swedish Massage', icon: '🧘‍♀️' },
                { name: 'Deep Tissue', icon: '💪' },
                { name: 'Sports Massage', icon: '🏃‍♂️' },
                { name: 'Hot Stone', icon: '🔥' },
                { name: 'Aromatherapy', icon: '🌸' }
              ].map((service, index) => (
                <Link
                  key={index}
                  href="#"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 1.5,
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: 'rgba(139, 92, 246, 0.1)',
                      transform: 'translateX(8px)',
                      paddingLeft: '20px'
                    }
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{service.icon}</span>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.95rem' }}>
                    {service.name}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Box>

          {/* Company - Enhanced */}
          <Box sx={{ flex: '0 1 200px', minWidth: 0 }}>
            <Typography variant="h6" sx={{
              fontWeight: 700,
              mb: 4,
              color: 'white',
              fontSize: '1.2rem',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -8,
                left: 0,
                width: 30,
                height: '3px',
                bgcolor: 'primary.main',
                borderRadius: '2px'
              }
            }}>
              Company
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {[
                { name: 'About Us', icon: '🏢' },
                { name: 'Our Team', icon: '👥' },
                { name: 'Careers', icon: '💼' },
                { name: 'Privacy Policy', icon: '🔒' },
                { name: 'Terms of Service', icon: '📋' }
              ].map((item, index) => (
                <Link
                  key={index}
                  href="#"
                  sx={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 1.5,
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: 'rgba(139, 92, 246, 0.1)',
                      transform: 'translateX(8px)',
                      paddingLeft: '20px'
                    }
                  }}
                >
                  <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.95rem' }}>
                    {item.name}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Box>
        </Box>

        {/* Simplified Developer Section */}
        <Box sx={{ py: 4, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 3,
                  color: 'white',
                  fontSize: '1.5rem'
                }}
              >
                Developed by
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 2,
                  borderRadius: '16px',
                  bgcolor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderColor: 'rgba(139, 92, 246, 0.5)',
                    transform: 'translateY(-2px)'
                  }
                }}
              >
                <Avatar
                  src="/images/Cristian.jpeg"
                  sx={{
                    width: 50,
                    height: 50,
                    border: '2px solid #8B5CF6'
                  }}
                />
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '1rem'
                    }}
                  >
                    Cristian Torres
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.7)',
                      fontSize: '0.9rem'
                    }}
                  >
                    Full Stack Developer
                  </Typography>
                </Box>
                <IconButton
                  size="small"
                  onClick={() => window.open('https://github.com/cristiantorresf19191919', '_blank')}
                  sx={{
                    color: 'rgba(255,255,255,0.8)',
                    '&:hover': {
                      color: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  <GitHub />
                </IconButton>
              </Box>
            </Box>
          </motion.div>
        </Box>

        {/* Partner/Affiliate Section */}
        <Box sx={{ py: 4, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  color: 'white',
                  fontSize: '1.5rem'
                }}
              >
                Se nuestro Aura Socio
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  mb: 3,
                  fontSize: '1rem'
                }}
              >
                Be our Aura Partner
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="outlined"
                onClick={() => window.open('/partner', '_blank')}
                sx={{
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.3)',
                  borderWidth: '2px',
                  px: 4,
                  py: 1.5,
                  borderRadius: '25px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255,255,255,0.1)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 20px rgba(255,255,255,0.2)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Join as Partner
              </Button>
            </Box>
          </motion.div>
        </Box>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Box sx={{
            py: 3,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            textAlign: 'center'
          }}>
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              © 2024 Aura. All rights reserved. | Built with ❤️ by Cristian Torres
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
