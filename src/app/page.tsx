'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Box, Container, Typography, Button, TextField, Chip, IconButton, Modal, Backdrop, Fade } from '@mui/material'
import { motion } from 'framer-motion'
import { Search as SearchIcon, Close as CloseIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@mui/icons-material'
import { MASSAGE_CATEGORIES } from '@/lib/massage-types'
import BeautifulCard from '@/components/BeautifulCard'

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const videos = ['/reflexologia.mp4', '/stoneMassage.mp4', '/massageRelax.mp4', '/massageRelax2.mp4']
  const videoTitles = ['Reflexología Terapéutica', 'Terapia con Piedras Calientes', 'Masaje Relajante', 'Masaje Relajante Avanzado']

  const reduceMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  // styles
  const videoBgSx = {
    position: 'fixed',
    inset: 0,
    zIndex: 0,
    opacity: 0.9,
    willChange: 'transform',
    transform: 'translateZ(0)'
  } as const


  const inputSx = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'transparent',
      borderRadius: '14px',
      transition: 'box-shadow 120ms ease, border-color 120ms ease',
      '& fieldset': { borderColor: 'rgba(0,0,0,.12)' },
      '&:hover fieldset': { borderColor: 'rgba(0,0,0,.2)' },
      '&.Mui-focused fieldset': {
        borderColor: '#8B5CF6',
        boxShadow: '0 0 0 4px rgba(139,92,246,.18)'
      },
      '& *': { transition: 'none' }
    },
    '& input:-webkit-autofill': {
      WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,.92) inset',
      WebkitTextFillColor: '#111'
    }
  } as const

  // init media
  useEffect(() => {
    const v = videoRef.current
    const a = audioRef.current
    if (v) {
      v.src = videos[0]
      v.load()
    }
    if (a) {
      a.volume = 0.3
      a.play().then(() => setIsAudioPlaying(true)).catch(() => { })
    }
  }, [])

  // rotate videos
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onEnd = () => setCurrentVideoIndex(prev => (prev + 1) % videos.length)
    v.addEventListener('ended', onEnd)
    return () => v.removeEventListener('ended', onEnd)
  }, [videos.length])

  // update src on index change
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.src = videos[currentVideoIndex]
    v.load()
    v.play().catch(() => { })
  }, [currentVideoIndex])

  // pause bg video when modal open or tab hidden
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    isVideoPlayerOpen ? v.pause() : v.play().catch(() => { })
  }, [isVideoPlayerOpen])

  useEffect(() => {
    const onVis = () => {
      const v = videoRef.current
      if (!v) return
      document.hidden ? v.pause() : v.play().catch(() => { })
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const handleVideoPlayerOpen = () => {
    setIsVideoPlayerOpen(true)
    if ((window as any).decreaseAudioVolume) (window as any).decreaseAudioVolume()
  }

  const handleVideoPlayerClose = () => {
    setIsVideoPlayerOpen(false)
    if ((window as any).restoreAudioVolume) (window as any).restoreAudioVolume()
  }

  const goToPreviousVideo = () => setCurrentVideoIndex(prev => (prev - 1 + videos.length) % videos.length)
  const goToNextVideo = () => setCurrentVideoIndex(prev => (prev + 1) % videos.length)
  const goToVideo = (i: number) => setCurrentVideoIndex(i)

  const filteredServices = MASSAGE_CATEGORIES.filter(s =>
    s.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'swedish': return '💆‍♀️'
      case 'deep-tissue': return '💪'
      case 'sports': return '🏃‍♂️'
      case 'hot-stone': return '🔥'
      case 'aromatherapy': return '🌸'
      case 'reflexology': return '🦶'
      case 'thai': return '🙏'
      case 'shiatsu': return '👐'
      case 'couple': return '💕'
      case 'prenatal': return '🤱'
      case 'therapeutic': return '🏥'
      case 'relaxation': return '😌'
      case 'barberia': return '✂️'
      case 'masajes': return '💆‍♀️'
      case 'reflexologia': return '🦶'
      case 'piedras-calientes': return '🔥'
      default: return '💆‍♀️'
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
      {/* hidden audio */}
      <audio ref={audioRef} src='/brandingAudio.mp3' preload='auto' style={{ display: 'none' }} />

      {/* background video */}
      <Box sx={videoBgSx}>
        <video ref={videoRef} autoPlay muted loop={false} playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Box>

      {/* readability veil */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(0deg, rgba(12,5,20,.45), rgba(12,5,20,.25))' }} />

      {/* video player button */}
      <Box sx={{ position: 'fixed', top: 20, right: 20, zIndex: 20, cursor: 'pointer' }}>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={handleVideoPlayerOpen}>
          <Box sx={{
            width: 50, height: 50, borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 24
          }}>
            🎬
          </Box>
        </motion.div>
      </Box>

      {/* main content */}
      <Container test-id='home-container' maxWidth='lg' sx={{ position: 'relative', zIndex: 2, pt: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 1.2, delay: reduceMotion ? 0 : 0.6, ease: 'easeOut' }}
        >
          {/* hero */}
          <Box text-id="hero-box" sx={{ textAlign: 'center', mb: 8, mt: 4 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.9, ease: 'easeOut' }}
            >
              <Typography
                variant='h1'
                component='h1'
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontWeight: 700,
                  color: 'white',
                  mb: 3,
                  background: 'linear-gradient(45deg, #fff, #e0e0e0)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Encuentra tu Masaje Perfecto
              </Typography>

              <Typography
                variant='h2'
                component='h2'
                sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' }, color: 'rgba(255,255,255,.95)', mb: 4, textShadow: '0 1px 2px rgba(0,0,0,.4)' }}
              >
                Descubre servicios profesionales de masaje y bienestar
              </Typography>
            </motion.div>

            {/* search */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 1.1, ease: 'easeOut' }}
            >
              <BeautifulCard
                isBlurred={true}
                sx={{ maxWidth: 600, mx: 'auto', mb: 6, p: 3, position: 'relative' }}
              >
                <TextField
                  fullWidth
                  placeholder='Buscar servicios de masaje...'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  sx={inputSx}
                  InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} /> }}
                />

                {/* category chips */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mt: 2 }}>
                  {MASSAGE_CATEGORIES.map(category => (
                    <Chip
                      key={category.value}
                      label={`${getCategoryIcon(category.value)} ${category.label}`}
                      onClick={() => setSelectedCategory(category.value)}
                      sx={{
                        backgroundColor: selectedCategory === category.value ? 'rgba(139,92,246,.9)' : 'rgba(255,255,255,.9)',
                        color: selectedCategory === category.value ? 'white' : 'text.primary',
                        '&:hover': { backgroundColor: selectedCategory === category.value ? 'rgba(139,92,246,1)' : 'rgba(255,255,255,1)' }
                      }}
                    />
                  ))}
                </Box>
              </BeautifulCard>
            </motion.div>

            {/* services grid */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.7, delay: reduceMotion ? 0 : 1.3, ease: 'easeOut' }}
            >
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(4, 1fr)'
                },
                gap: 3,
                justifyContent: 'center',
                maxWidth: '1200px',
                mx: 'auto'
              }}>
                {filteredServices.map(service => (
                  <motion.div
                    key={service.value}
                    whileHover={{ y: -6, scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <BeautifulCard
                      isBlurred={true}
                      sx={{
                        height: '100%',
                        minHeight: '280px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                          transform: 'translateY(-6px) scale(1.03)',
                        }
                      }}
                    >
                      <Typography variant='h3' sx={{ fontSize: '3rem', mb: 2 }}>
                        {getCategoryIcon(service.value)}
                      </Typography>
                      <Typography variant='h6' sx={{ color: 'white', mb: 1, fontWeight: 600, textShadow: '1px 1px 2px rgba(0,0,0,.5)' }}>
                        {service.label}
                      </Typography>
                      <Typography variant='body2' sx={{ color: 'rgba(255,255,255,.85)', textShadow: '1px 1px 2px rgba(0,0,0,.5)' }}>
                        {service.description}
                      </Typography>
                    </BeautifulCard>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      </Container>

      {/* video modal */}
      <Modal
        open={isVideoPlayerOpen}
        onClose={handleVideoPlayerClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 300 }}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}
      >
        <Fade in={isVideoPlayerOpen}>
          <Box sx={{ position: 'relative', width: '90vw', maxWidth: 1200, height: '80vh', backgroundColor: 'rgba(0,0,0,.95)', borderRadius: '20px', overflow: 'hidden', border: '2px solid rgba(255,255,255,.2)' }}>
            <IconButton
              onClick={handleVideoPlayerClose}
              sx={{ position: 'absolute', top: 15, right: 15, zIndex: 10, color: 'white', backgroundColor: 'rgba(0,0,0,.5)', '&:hover': { backgroundColor: 'rgba(0,0,0,.7)' } }}
            >
              <CloseIcon />
            </IconButton>

            <Box sx={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <video src={videos[currentVideoIndex]} controls autoPlay style={{ width: '100%', height: '100%', objectFit: 'contain' }} />

              <Box sx={{ position: 'absolute', top: '50%', left: 20, transform: 'translateY(-50%)', zIndex: 10 }}>
                <IconButton onClick={goToPreviousVideo} sx={{ color: 'white', backgroundColor: 'rgba(0,0,0,.5)', '&:hover': { backgroundColor: 'rgba(0,0,0,.7)' } }}>
                  <ChevronLeftIcon sx={{ fontSize: '2rem' }} />
                </IconButton>
              </Box>

              <Box sx={{ position: 'absolute', top: '50%', right: 20, transform: 'translateY(-50%)', zIndex: 10 }}>
                <IconButton onClick={goToNextVideo} sx={{ color: 'white', backgroundColor: 'rgba(0,0,0,.5)', '&:hover': { backgroundColor: 'rgba(0,0,0,.7)' } }}>
                  <ChevronRightIcon sx={{ fontSize: '2rem' }} />
                </IconButton>
              </Box>

              <Box sx={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
                <Typography variant='h6' sx={{ color: 'white', backgroundColor: 'rgba(0,0,0,.7)', px: 2, py: 1, borderRadius: '20px', textShadow: '1px 1px 2px rgba(0,0,0,.8)' }}>
                  {videoTitles[currentVideoIndex]}
                </Typography>
              </Box>

              <Box sx={{ position: 'absolute', bottom: 30, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '12px', zIndex: 10 }}>
                {videos.map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => goToVideo(index)}
                    sx={{
                      width: 16, height: 16, borderRadius: '50%',
                      backgroundColor: index === currentVideoIndex ? '#8B5CF6' : 'rgba(255,255,255,.5)',
                      cursor: 'pointer', transition: 'all .3s ease',
                      '&:hover': { backgroundColor: index === currentVideoIndex ? '#8B5CF6' : 'rgba(255,255,255,.8)', transform: 'scale(1.2)' }
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Box>
  )
}