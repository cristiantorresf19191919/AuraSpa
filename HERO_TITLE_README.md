# HeroTitle Component

A professional, reusable hero title component built with React, TypeScript, and Material-UI. Perfect for creating stunning, gradient-based hero titles with responsive design and extensive customization options.

## ✨ Features

- **🎨 Beautiful Gradients**: Built-in gradient text effects with customizable colors
- **📱 Responsive Design**: Automatic responsive font sizing for all screen sizes
- **🔧 Highly Customizable**: Extensive props for styling and behavior control
- **📝 TypeScript Support**: Full TypeScript support with proper type definitions
- **🎭 MUI Integration**: Seamlessly integrates with Material-UI design system
- **♿ Accessibility**: Proper semantic HTML and ARIA support
- **🧪 Testing Ready**: Built-in test ID support for automated testing

## 🚀 Installation

The component is available in your project at:
```
src/components/HeroTitle.tsx
```

## 📖 Basic Usage

### Simple Hero Title
```tsx
import HeroTitle from '@/components/HeroTitle';

<HeroTitle>
  Encuentra tu Masaje Perfecto
</HeroTitle>
```

### With Custom Gradient
```tsx
<HeroTitle gradientColors={['#FF6B6B', '#4ECDC4']}>
  Custom Gradient Title
</HeroTitle>
```

### No Gradient (Solid Text)
```tsx
<HeroTitle gradient={false}>
  Solid White Text
</HeroTitle>
```

## 🎨 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | Required | The title text content |
| `variant` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h1'` | MUI Typography variant |
| `component` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | Matches `variant` | HTML element to render |
| `gradient` | `boolean` | `true` | Enable/disable gradient effect |
| `gradientColors` | `string[]` | `['#fff', '#e0e0e0']` | Custom gradient colors |
| `responsive` | `boolean` | `true` | Enable responsive font sizes |
| `className` | `string` | `''` | Additional CSS classes |
| `sx` | `SxProps` | `{}` | Custom MUI styling props |
| `data-testid` | `string` | `'hero-title'` | Test ID for automated testing |

## 🎯 Use Cases

### 1. **Hero Sections**
Perfect for main page hero titles and landing page headlines.

```tsx
<HeroTitle>
  Transform Your Wellness Journey
</HeroTitle>
```

### 2. **Section Headers**
Great for different content sections with various heading levels.

```tsx
<HeroTitle variant="h2" gradientColors={['#667eea', '#764ba2']}>
  Our Services
</HeroTitle>
```

### 3. **Card Titles**
Use for card and component titles with smaller variants.

```tsx
<HeroTitle variant="h4" gradient={false}>
  Service Details
</HeroTitle>
```

### 4. **Marketing Copy**
Eye-catching titles for promotional content.

```tsx
<HeroTitle gradientColors={['#FF6B6B', '#4ECDC4', '#45B7D1']}>
  Limited Time Offer
</HeroTitle>
```

## 🌈 Gradient Customization

### Default Gradient
```tsx
<HeroTitle>
  Default White to Light Gray
</HeroTitle>
```

### Custom Two-Color Gradient
```tsx
<HeroTitle gradientColors={['#FF6B6B', '#4ECDC4']}>
  Sunset to Ocean
</HeroTitle>
```

### Multi-Color Gradient
```tsx
<HeroTitle gradientColors={['#667eea', '#764ba2', '#f093fb']}>
  Multi-Color Magic
</HeroTitle>
```

### Brand Colors
```tsx
<HeroTitle gradientColors={['#8B5CF6', '#EC4899']}>
  Brand Gradient
</HeroTitle>
```

## 📱 Responsive Design

### Automatic Responsive Sizing
The component automatically adjusts font sizes based on screen size:

- **H1**: `2.5rem` (mobile) → `4rem` (desktop)
- **H2**: `2rem` (mobile) → `3rem` (desktop)
- **H3**: `1.75rem` (mobile) → `2.5rem` (desktop)
- **H4**: `1.5rem` (mobile) → `2rem` (desktop)
- **H5**: `1.25rem` (mobile) → `1.75rem` (desktop)
- **H6**: `1rem` (mobile) → `1.5rem` (desktop)

### Disable Responsiveness
```tsx
<HeroTitle responsive={false} sx={{ fontSize: '3rem' }}>
  Fixed Size Title
</HeroTitle>
```

## 🎭 Custom Styling

### Using sx Prop
```tsx
<HeroTitle 
  sx={{ 
    fontFamily: 'monospace',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    textAlign: 'left'
  }}
>
  Custom Styled Title
</HeroTitle>
```

### Custom Typography
```tsx
<HeroTitle 
  variant="h2"
  component="h3"
  sx={{ 
    fontStyle: 'italic',
    fontWeight: 300,
    textDecoration: 'underline'
  }}
>
  Elegant Style
</HeroTitle>
```

## 🔧 Advanced Usage

### Conditional Rendering
```tsx
{isHeroSection ? (
  <HeroTitle variant="h1">
    Main Hero Title
  </HeroTitle>
) : (
  <HeroTitle variant="h3" gradient={false}>
    Section Title
  </HeroTitle>
)}
```

### Dynamic Gradients
```tsx
const getGradientColors = (theme: string) => {
  switch (theme) {
    case 'sunset': return ['#FF6B6B', '#4ECDC4'];
    case 'ocean': return ['#667eea', '#764ba2'];
    case 'forest': return ['#11998e', '#38ef7d'];
    default: return ['#fff', '#e0e0e0'];
  }
};

<HeroTitle gradientColors={getGradientColors(currentTheme)}>
  Dynamic Gradient Title
</HeroTitle>
```

### With Animation
```tsx
<HeroTitle 
  sx={{
    animation: 'fadeInUp 1s ease-out',
    '@keyframes fadeInUp': {
      '0%': { opacity: 0, transform: 'translateY(30px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' }
    }
  }}
>
  Animated Title
</HeroTitle>
```

## 🧪 Testing

### Test ID Support
```tsx
<HeroTitle data-testid="main-hero-title">
  Testable Title
</HeroTitle>
```

### Testing Examples
```typescript
// Cypress
cy.get('[data-testid="main-hero-title"]').should('be.visible');
cy.get('[data-testid="main-hero-title"]').should('contain', 'Testable Title');

// Jest + Testing Library
expect(screen.getByTestId('main-hero-title')).toBeInTheDocument();
expect(screen.getByTestId('main-hero-title')).toHaveTextContent('Testable Title');
```

## 🎨 Design System Integration

### MUI Theme Integration
```tsx
<HeroTitle 
  sx={{
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.dark
    }
  }}
>
  Theme-Aware Title
</HeroTitle>
```

### Consistent Spacing
```tsx
<HeroTitle 
  sx={{ 
    mb: theme.spacing(4),
    px: theme.spacing(2)
  }}
>
  Properly Spaced Title
</HeroTitle>
```

## 🚀 Performance Optimizations

### Memoization
The component is optimized for performance with:
- Efficient prop handling
- Minimal re-renders
- Optimized style calculations

### Bundle Size
- Lightweight implementation
- Tree-shakable exports
- No external dependencies beyond MUI

## 🔮 Future Enhancements

Potential future improvements:
- **Animation Variants**: Different entrance animations
- **Theme Support**: Dark/light mode variants
- **Internationalization**: Multi-language support
- **Accessibility**: Enhanced screen reader support
- **Performance**: Virtual scrolling for long lists

## 📝 Contributing

To modify the component:
1. Edit `src/components/HeroTitle.tsx`
2. Test changes in the demo page (`/hero-title-demo`)
3. Update this README if needed
4. Ensure all existing usage still works

## 🌟 Examples in Your App

### Home Page Hero
```tsx
// src/app/page.tsx
<HeroTitle>
  Encuentra tu Masaje Perfecto
</HeroTitle>
```

### Demo Page
Visit `/hero-title-demo` to see various configurations and use cases.

## 🚀 Migration Guide

### From Inline Typography
```tsx
// Before: Inline Typography with custom styles
<Typography
  variant="h1"
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
  Your Title
</Typography>

// After: HeroTitle component
<HeroTitle>
  Your Title
</HeroTitle>
```

### From Custom Components
```tsx
// Before: Custom hero title component
<CustomHeroTitle text="Your Title" />

// After: HeroTitle component
<HeroTitle>
  Your Title
</HeroTitle>
```

## 🎨 Best Practices

### 1. **Semantic HTML**
Always use appropriate heading levels for SEO and accessibility:
```tsx
<HeroTitle variant="h1">Main Page Title</HeroTitle>
<HeroTitle variant="h2">Section Title</HeroTitle>
<HeroTitle variant="h3">Subsection Title</HeroTitle>
```

### 2. **Gradient Colors**
Choose colors that provide good contrast and readability:
```tsx
// Good: High contrast
<HeroTitle gradientColors={['#fff', '#e0e0e0']}>

// Better: Brand colors with good contrast
<HeroTitle gradientColors={['#8B5CF6', '#EC4899']}>
```

### 3. **Responsive Design**
Let the component handle responsive sizing automatically:
```tsx
// Good: Let component handle responsiveness
<HeroTitle>Your Title</HeroTitle>

// Avoid: Overriding responsive behavior unnecessarily
<HeroTitle responsive={false} sx={{ fontSize: '3rem' }}>
```

### 4. **Testing**
Always include test IDs for automated testing:
```tsx
<HeroTitle data-testid="hero-title">
  Your Title
</HeroTitle>
```

---

**Happy coding! 🎉**

The HeroTitle component is now your go-to solution for creating beautiful, consistent hero titles throughout your application.
