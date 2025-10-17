import { TextField, TextFieldProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)(({ theme }) => ({
    width: '100% !important',
    minWidth: '100% !important',
    maxWidth: '100% !important',
    '& .MuiOutlinedInput-root': {
        borderRadius: '20px',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.04) 100%)',
        backdropFilter: 'blur(15px)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        width: '100% !important',
        minWidth: '100% !important',
        maxWidth: '100% !important',
        padding: '2px 4px',
        '& fieldset': {
            border: 'none',
        },
        '&:hover': {
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 100%)',
            borderColor: 'rgba(139, 92, 246, 0.6)',
            transform: 'translateY(-1px) scale(1.01)',
            boxShadow: '0 4px 15px rgba(139, 92, 246, 0.25), 0 0 10px rgba(139, 92, 246, 0.08)',
        },
        '&.Mui-focused': {
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.05) 100%)',
            borderColor: '#8B5CF6',
            borderWidth: '2px',
            transform: 'translateY(-1px) scale(1.01)',
            boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3), 0 0 10px rgba(139, 92, 246, 0.1)',
        },
        '&.Mui-error': {
            borderColor: '#EF4444',
            borderWidth: '3px',
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.08) 100%)',
            boxShadow: '0 8px 25px rgba(239, 68, 68, 0.3)',
        },
        '&.Mui-disabled': {
            background: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            opacity: 0.6,
        }
    },
    '& .MuiInputLabel-root': {
        color: 'rgba(255, 255, 255, 0.95)',
        fontWeight: 700,
        fontSize: '0.9rem',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.6), 0 0 10px rgba(139, 92, 246, 0.3)',
        letterSpacing: '0.5px',
        '&.Mui-focused': {
            color: '#8B5CF6',
            fontWeight: 800,
            textShadow: '0 2px 4px rgba(139, 92, 246, 0.6), 0 0 15px rgba(139, 92, 246, 0.4)',
        },
        '&.Mui-error': {
            color: '#EF4444',
            textShadow: '0 2px 4px rgba(239, 68, 68, 0.6), 0 0 15px rgba(239, 68, 68, 0.4)',
        },
        '&.Mui-disabled': {
            color: 'rgba(255, 255, 255, 0.5)',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
        }
    },
    '& .MuiInputBase-input': {
        color: 'rgba(255, 255, 255, 0.98)',
        fontSize: '1rem',
        fontWeight: 600,
        letterSpacing: '0.3px',
        padding: '16px',
        '&::placeholder': {
            color: 'rgba(255, 255, 255, 0.7)',
            opacity: 1,
            fontWeight: 500,
            fontStyle: 'italic',
        },
        '&.Mui-disabled': {
            color: 'rgba(255, 255, 255, 0.5)',
            WebkitTextFillColor: 'rgba(255, 255, 255, 0.5)',
        }
    },
    '& .MuiFormHelperText-root': {
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '0.85rem',
        marginLeft: '12px',
        fontWeight: 600,
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.5), 0 0 8px rgba(139, 92, 246, 0.2)',
        letterSpacing: '0.3px',
        '&.Mui-error': {
            color: '#EF4444',
            fontWeight: 700,
            textShadow: '0 2px 4px rgba(239, 68, 68, 0.5), 0 0 8px rgba(239, 68, 68, 0.3)',
        }
    },
    '& .MuiInputAdornment-root': {
        color: 'rgba(255, 255, 255, 0.8)',
        '& .MuiIconButton-root': {
            color: 'rgba(255, 255, 255, 0.8)',
            transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            '&:hover': {
                color: '#8B5CF6',
                backgroundColor: 'rgba(139, 92, 246, 0.15)',
                transform: 'scale(1.1)',
                boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
            }
        }
    },
    // Add a subtle glow effect
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: '20px',
        background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.1))',
        opacity: 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
        zIndex: -1,
    },
    '&:hover::before': {
        opacity: 1,
    },
    '&.Mui-focused::before': {
        opacity: 1,
        background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.2), rgba(236, 72, 153, 0.2))',
    }
}));

export default StyledTextField;
