import { createTheme, ThemeOptions } from '@mui/material/styles';

// Beautiful purple color palette
const purplePalette = {
  primary: '#8B5CF6', // Vibrant purple
  primaryLight: '#A78BFA', // Light purple
  primaryDark: '#7C3AED', // Dark purple
  secondary: '#EC4899', // Pink accent
  secondaryLight: '#F472B6', // Light pink
  secondaryDark: '#DB2777', // Dark pink
  accent: '#06B6D4', // Cyan accent
  accentLight: '#22D3EE', // Light cyan
  accentDark: '#0891B2', // Dark cyan
  gradient: {
    primary: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 100%)',
    secondary: 'linear-gradient(135deg, #8B5CF6 0%, #06B6D4 100%)',
    accent: 'linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)',
  },
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
  success: {
    main: '#10B981',
    light: '#34D399',
    dark: '#059669',
  },
  warning: {
    main: '#F59E0B',
    light: '#FBBF24',
    dark: '#D97706',
  },
  error: {
    main: '#EF4444',
    light: '#F87171',
    dark: '#DC2626',
  },
};

// Custom theme configuration
const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: purplePalette.primary,
      light: purplePalette.primaryLight,
      dark: purplePalette.primaryDark,
      contrastText: '#ffffff',
    },
    secondary: {
      main: purplePalette.secondary,
      light: purplePalette.secondaryLight,
      dark: purplePalette.secondaryDark,
      contrastText: '#ffffff',
    },
    background: {
      default: '#FAFAFA',
      paper: '#ffffff',
    },
    text: {
      primary: purplePalette.neutral[900],
      secondary: purplePalette.neutral[600],
    },
    success: purplePalette.success,
    warning: purplePalette.warning,
    error: purplePalette.error,
    info: {
      main: purplePalette.accent,
      light: purplePalette.accentLight,
      dark: purplePalette.accentDark,
    },
  },
  typography: {
    fontFamily: 'var(--font-roboto), Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontFamily: 'var(--font-roboto), Roboto, sans-serif',
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
    },
    h2: {
      fontFamily: 'var(--font-roboto), Roboto, sans-serif',
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: 1.3,
    },
    h3: {
      fontFamily: 'var(--font-roboto), Roboto, sans-serif',
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: 'var(--font-roboto), Roboto, sans-serif',
      fontWeight: 500,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h5: {
      fontFamily: 'var(--font-roboto), Roboto, sans-serif',
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h6: {
      fontFamily: 'var(--font-roboto), Roboto, sans-serif',
      fontWeight: 500,
      fontSize: '1.125rem',
      lineHeight: 1.4,
    },
    body1: {
      fontFamily: 'var(--font-roboto), Roboto, sans-serif',
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: 'var(--font-roboto), Roboto, sans-serif',
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontFamily: 'var(--font-roboto), Roboto, sans-serif',
      fontWeight: 500,
      textTransform: 'none',
    },
    caption: {
      fontFamily: 'var(--font-roboto), Roboto, sans-serif',
      fontWeight: 400,
      fontSize: '0.75rem',
      lineHeight: 1.4,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 24px',
          fontSize: '0.875rem',
          fontWeight: 500,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(7, 190, 184, 0.3)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          border: '1px solid #e5e7eb',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            transition: 'all 0.3s ease',
            minHeight: 56,
            '&:hover': {
              backgroundColor: 'white',
              transform: 'translateY(-1px)',
            },
            '&.Mui-focused': {
              backgroundColor: 'white',
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 15px rgba(139, 92, 246, 0.2)',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(139, 92, 246, 0.3)',
              borderWidth: '1.5px',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: purplePalette.primaryLight,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: purplePalette.primary,
              borderWidth: '2px',
            },
            '& .MuiInputBase-input': {
              padding: '16px 14px',
              fontFamily: 'var(--font-roboto), Roboto, sans-serif',
              fontSize: '1rem',
            },
          },
          '& .MuiInputLabel-root': {
            fontFamily: 'var(--font-roboto), Roboto, sans-serif',
            fontWeight: 500,
            color: 'rgba(0, 0, 0, 0.6)',
            fontSize: '1rem',
            '&.Mui-focused': {
              color: purplePalette.primary,
              fontWeight: 600,
            },
            '&.MuiInputLabel-shrink': {
              color: purplePalette.primary,
              fontWeight: 600,
            },
          },
          '& .MuiInputAdornment-root': {
            marginRight: 8,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: purplePalette.primary,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e5e7eb',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',
          '&:hover': {
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(139, 92, 246, 0.15)',
            '&:hover': {
              backgroundColor: 'rgba(139, 92, 246, 0.2)',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
        },
        colorPrimary: {
          backgroundColor: 'rgba(139, 92, 246, 0.15)',
          color: purplePalette.primary,
        },
        colorSecondary: {
          backgroundColor: 'rgba(236, 72, 153, 0.15)',
          color: purplePalette.secondary,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
        standardInfo: {
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          color: purplePalette.primary,
          '& .MuiAlert-icon': {
            color: purplePalette.primary,
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
        },
        bar: {
          borderRadius: 4,
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: purplePalette.primary,
        },
      },
    },
  },
};

// Create and export the theme
export const theme = createTheme(themeOptions);

// Export the color palette for use in other parts of the app
export { purplePalette };

// Type for theme customization
export type AppTheme = typeof theme; 