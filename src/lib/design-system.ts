/**
 * AuraSpa Design System
 * Comprehensive design tokens and utilities for consistent UI/UX
 */

// =============================================================================
// COLOR SYSTEM
// =============================================================================

export const colors = {
  // Primary Brand Colors
  primary: {
    50: '#f3f0ff',
    100: '#e9e5ff',
    200: '#d6ceff',
    300: '#b8a6ff',
    400: '#9575ff',
    500: '#8B5CF6', // Main brand color
    600: '#7C3AED',
    700: '#6D28D9',
    800: '#5B21B6',
    900: '#4C1D95',
    950: '#2E1065',
  },
  
  // Secondary Accent Colors
  secondary: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6', // Teal accent
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
    950: '#042f2e',
  },
  
  // Neutral Colors
  neutral: {
    0: '#ffffff',
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
    950: '#0a0a0a',
  },
  
  // Semantic Colors
  success: {
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
  },
  
  warning: {
    50: '#fffbeb',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
  },
  
  error: {
    50: '#fef2f2',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
  },
  
  info: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  },
} as const;

// =============================================================================
// TYPOGRAPHY SYSTEM
// =============================================================================

export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    serif: ['Georgia', 'serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
    '7xl': ['4.5rem', { lineHeight: '1' }],
    '8xl': ['6rem', { lineHeight: '1' }],
    '9xl': ['8rem', { lineHeight: '1' }],
  },
  
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

// =============================================================================
// SPACING SYSTEM
// =============================================================================

export const spacing = {
  0: '0px',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  7: '1.75rem',   // 28px
  8: '2rem',      // 32px
  9: '2.25rem',   // 36px
  10: '2.5rem',   // 40px
  11: '2.75rem',  // 44px
  12: '3rem',     // 48px
  14: '3.5rem',   // 56px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  28: '7rem',     // 112px
  32: '8rem',     // 128px
  36: '9rem',     // 144px
  40: '10rem',    // 160px
  44: '11rem',    // 176px
  48: '12rem',    // 192px
  52: '13rem',    // 208px
  56: '14rem',    // 224px
  60: '15rem',    // 240px
  64: '16rem',    // 256px
  72: '18rem',    // 288px
  80: '20rem',    // 320px
  96: '24rem',    // 384px
} as const;

// =============================================================================
// BORDER RADIUS SYSTEM
// =============================================================================

export const borderRadius = {
  none: '0px',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  '4xl': '2rem',    // 32px
  full: '9999px',
} as const;

// =============================================================================
// SHADOW SYSTEM
// =============================================================================

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  glow: {
    primary: '0 0 20px rgb(139 92 246 / 0.3)',
    secondary: '0 0 20px rgb(20 184 166 / 0.3)',
    success: '0 0 20px rgb(34 197 94 / 0.3)',
    error: '0 0 20px rgb(239 68 68 / 0.3)',
  },
} as const;

// =============================================================================
// BREAKPOINTS
// =============================================================================

export const breakpoints = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// =============================================================================
// ANIMATION SYSTEM
// =============================================================================

export const animations = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '700ms',
  },
  
  easing: {
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  keyframes: {
    fadeIn: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    slideUp: {
      '0%': { transform: 'translateY(100%)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    slideDown: {
      '0%': { transform: 'translateY(-100%)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
    scaleIn: {
      '0%': { transform: 'scale(0.9)', opacity: '0' },
      '100%': { transform: 'scale(1)', opacity: '1' },
    },
    pulse: {
      '0%, 100%': { opacity: '1' },
      '50%': { opacity: '0.5' },
    },
    bounce: {
      '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
      '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
    },
  },
} as const;

// =============================================================================
// COMPONENT VARIANTS
// =============================================================================

export const componentVariants = {
  button: {
    primary: {
      background: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[600]} 100%)`,
      color: colors.neutral[0],
      shadow: shadows.glow.primary,
      hover: {
        transform: 'translateY(-2px)',
        shadow: shadows.xl,
      },
    },
    secondary: {
      background: `linear-gradient(135deg, ${colors.secondary[500]} 0%, ${colors.secondary[600]} 100%)`,
      color: colors.neutral[0],
      shadow: shadows.glow.secondary,
      hover: {
        transform: 'translateY(-2px)',
        shadow: shadows.xl,
      },
    },
    outline: {
      background: 'transparent',
      color: colors.primary[500],
      border: `1px solid ${colors.primary[500]}`,
      hover: {
        background: colors.primary[500],
        color: colors.neutral[0],
      },
    },
    ghost: {
      background: 'transparent',
      color: colors.neutral[700],
      hover: {
        background: colors.neutral[100],
        color: colors.neutral[900],
      },
    },
  },
  
  card: {
    default: {
      background: colors.neutral[0],
      border: `1px solid ${colors.neutral[200]}`,
      shadow: shadows.md,
      borderRadius: borderRadius.xl,
    },
    elevated: {
      background: colors.neutral[0],
      border: `1px solid ${colors.neutral[200]}`,
      shadow: shadows.lg,
      borderRadius: borderRadius['2xl'],
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: `1px solid rgba(255, 255, 255, 0.2)`,
      shadow: shadows.lg,
      borderRadius: borderRadius['2xl'],
    },
  },
  
  input: {
    default: {
      background: colors.neutral[0],
      border: `1px solid ${colors.neutral[300]}`,
      borderRadius: borderRadius.lg,
      focus: {
        border: `2px solid ${colors.primary[500]}`,
        shadow: `0 0 0 3px ${colors.primary[50]}`,
      },
    },
    filled: {
      background: colors.neutral[100],
      border: `1px solid transparent`,
      borderRadius: borderRadius.lg,
      focus: {
        background: colors.neutral[0],
        border: `2px solid ${colors.primary[500]}`,
        shadow: `0 0 0 3px ${colors.primary[50]}`,
      },
    },
  },
} as const;

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

export const utils = {
  // Generate responsive values
  responsive: (values: Record<string, string>) => {
    return Object.entries(values)
      .map(([breakpoint, value]) => {
        if (breakpoint === 'base') return value;
        return `@media (min-width: ${breakpoints[breakpoint as keyof typeof breakpoints]}) { ${value} }`;
      })
      .join(' ');
  },
  
  // Generate hover states
  hover: (styles: Record<string, string>) => {
    return `&:hover { ${Object.entries(styles).map(([prop, value]) => `${prop}: ${value}`).join('; ')} }`;
  },
  
  // Generate focus states
  focus: (styles: Record<string, string>) => {
    return `&:focus { ${Object.entries(styles).map(([prop, value]) => `${prop}: ${value}`).join('; ')} }`;
  },
  
  // Generate active states
  active: (styles: Record<string, string>) => {
    return `&:active { ${Object.entries(styles).map(([prop, value]) => `${prop}: ${value}`).join('; ')} }`;
  },
} as const;

// =============================================================================
// ACCESSIBILITY TOKENS
// =============================================================================

export const accessibility = {
  // Focus ring styles
  focusRing: {
    primary: `0 0 0 3px ${colors.primary[100]}`,
    secondary: `0 0 0 3px ${colors.secondary[100]}`,
    error: `0 0 0 3px ${colors.error[100]}`,
  },
  
  // Minimum touch target sizes
  touchTarget: {
    min: '44px',
    recommended: '48px',
    comfortable: '56px',
  },
  
  // Color contrast ratios
  contrast: {
    AA: 4.5,
    AAA: 7,
  },
} as const;

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
  animations,
  componentVariants,
  utils,
  accessibility,
};
