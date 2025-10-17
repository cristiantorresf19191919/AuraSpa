# HeroText Component

A professional, reusable text component built with React, TypeScript, and Material-UI. Features three size variants (small, medium, large) with responsive design and optional gradient effects. Perfect for creating consistent, beautiful text elements throughout your application.

## ✨ Features

- **📏 Size Variants**: Three predefined sizes (small, medium, large) with responsive scaling
- **🎨 Gradient Support**: Optional gradient text effects with customizable colors
- **📱 Responsive Design**: Automatic font size scaling across all device sizes
- **🔧 Highly Customizable**: Extensive props for styling and behavior control
- **📝 TypeScript Support**: Full TypeScript support with proper type definitions
- **🎭 MUI Integration**: Seamlessly integrates with Material-UI design system
- **♿ Accessibility**: Proper semantic HTML and ARIA support
- **🧪 Testing Ready**: Built-in test ID support for automated testing

## 🚀 Installation

The component is available in your project at:
```
src/components/HeroText.tsx
```

## 📖 Basic Usage

### Simple Text with Size Variants
```tsx
import HeroText from '@/components/HeroText';

// Small text
<HeroText size="small">This is small text</HeroText>

// Medium text (default)
<HeroText size="medium">This is medium text</HeroText>

// Large text
<HeroText size="large">This is large text</HeroText>
```

### With Gradient Effect
```tsx
<HeroText 
  size="medium" 
  gradient={true}
  gradientColors={['#FF6B6B', '#4ECDC4']}
>
  Beautiful gradient text
</HeroText>
```

### Custom Styling
```tsx
<HeroText 
  size="large"
  sx={{ 
    textAlign: 'left',
    fontStyle: 'italic',
    fontWeight: 600
  }}
>
  Custom styled text
</HeroText>
```

## 🎨 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | Required | The text content |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Text size variant |
| `variant` | `'body1' \| 'body2' \| 'h6' \| 'subtitle1' \| 'subtitle2' \| 'caption'` | `'body1'` | MUI Typography variant |
| `component` | `'p' \| 'span' \| 'div' \| 'h6'` | `'p'` | HTML element to render |
| `gradient` | `boolean` | `false` | Enable/disable gradient effect |
| `gradientColors` | `string[]` | `['#fff', '#e0e0e0']` | Custom gradient colors |
| `responsive` | `boolean` | `true` | Enable responsive font sizes |
| `className` | `string` | `''` | Additional CSS classes |
| `sx` | `SxProps` | `{}` | Custom MUI styling props |
| `data-testid` | `string` | `'hero-text'` | Test ID for automated testing |

## 📏 Size Variants

### Responsive Font Sizes
The component automatically scales font sizes across different screen sizes:

| Size | Mobile (xs) | Tablet (sm) | Desktop (md) |
|------|-------------|-------------|---------------|
| **Small** | `0.875rem` (14px) | `1rem` (16px) | `1.125rem` (18px) |
| **Medium** | `1rem` (16px) | `1.125rem` (18px) | `1.25rem` (20px) |
| **Large** | `1.125rem` (18px) | `1.25rem` (20px) | `1.5rem` (24px) |

### Usage Examples
```tsx
// Small text for captions, labels, or secondary information
<HeroText size="small">
  Additional information or captions
</HeroText>

// Medium text for body content, descriptions, or general text
<HeroText size="medium">
  Main content and descriptions
</HeroText>

// Large text for subtitles, highlights, or important information
<HeroText size="large">
  Important information or subtitles
</HeroText>
```

## 🎯 Use Cases

### 1. **Hero Sections**
Perfect for hero section subtitles and descriptions.

```tsx
<HeroTitle>Main Hero Title</HeroTitle>
<HeroText size="large">
  Transform your wellness journey with our services
</HeroText>
<HeroText size="medium">
  Join thousands of satisfied customers
</HeroText>
```

### 2. **Feature Descriptions**
Great for describing features and benefits.

```tsx
<HeroText size="medium" gradient={true} gradientColors={['#FFD89B', '#19547B']}>
  Premium Features
</HeroText>
<HeroText size="small">
  Access exclusive content and advanced tools
</HeroText>
```

### 3. **Call-to-Action Sections**
Ideal for call-to-action text and descriptions.

```tsx
<HeroText size="large" gradient={true} gradientColors={['#667eea', '#764ba2', '#f093fb']}>
  Ready to get started?
</HeroText>
<HeroText size="medium">
  Sign up today and unlock your potential
</HeroText>
```

### 4. **Card Content**
Use for card descriptions and content.

```tsx
<HeroText size="medium">
  Service description and details
</HeroText>
<HeroText size="small">
  Additional information and pricing
</HeroText>
```

## 🌈 Gradient Customization

### Enable Gradient
```tsx
<HeroText 
  size="medium" 
  gradient={true}
>
  Gradient text with default colors
</HeroText>
```

### Custom Gradient Colors
```tsx
<HeroText 
  size="large" 
  gradient={true}
  gradientColors={['#FF6B6B', '#4ECDC4']}
>
  Sunset to Ocean gradient
</HeroText>
```

### Multi-Color Gradients
```tsx
<HeroText 
  size="medium" 
  gradient={true}
  gradientColors={['#667eea', '#764ba2', '#f093fb']}
>
  Multi-color gradient text
</HeroText>
```

## 📱 Responsive Design

### Automatic Responsiveness
The component automatically handles responsive font sizing based on the `size` prop.

### Disable Responsiveness
```tsx
<HeroText 
  size="medium"
  responsive={false}
  sx={{ fontSize: '1.25rem' }}
>
  Fixed size text that doesn't scale
</HeroText>
```

### Custom Responsive Behavior
```tsx
<HeroText 
  size="large"
  sx={{ 
    fontSize: { 
      xs: '1rem', 
      sm: '1.25rem', 
      md: '1.5rem',
      lg: '2rem' 
    } 
  }}
>
  Custom responsive scaling
</HeroText>
```

## 🎭 Custom Styling

### Using sx Prop
```tsx
<HeroText 
  size="medium"
  sx={{ 
    textAlign: 'left',
    mb: 4,
    px: 2,
    fontStyle: 'italic',
    fontWeight: 600,
    color: 'customColor'
  }}
>
  Custom styled text
</HeroText>
```

### Typography Customization
```tsx
<HeroText 
  size="large"
  sx={{ 
    fontFamily: 'monospace',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    lineHeight: 1.8
  }}
>
  Custom typography
</HeroText>
```

### Layout and Spacing
```tsx
<HeroText 
  size="medium"
  sx={{ 
    textAlign: 'center',
    mb: 3,
    px: 4,
    py: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2
  }}
>
  Text with custom layout
</HeroText>
```

## 🔧 Advanced Usage

### Conditional Rendering
```tsx
{isFeatureSection ? (
  <HeroText size="large" gradient={true}>
    Feature Highlight
  </HeroText>
) : (
  <HeroText size="medium">
    Regular content
  </HeroText>
)}
```

### Dynamic Sizing
```tsx
const getTextSize = (importance: string) => {
  switch (importance) {
    case 'high': return 'large';
    case 'medium': return 'medium';
    case 'low': return 'small';
    default: return 'medium';
  }
};

<HeroText size={getTextSize(contentImportance)}>
  Dynamic sized text
</HeroText>
```

### With Animation
```tsx
<HeroText 
  size="large"
  sx={{
    animation: 'fadeInUp 1s ease-out',
    '@keyframes fadeInUp': {
      '0%': { opacity: 0, transform: 'translateY(30px)' },
      '100%': { opacity: 1, transform: 'translateY(0)' }
    }
  }}
>
  Animated text
</HeroText>
```

## 🧪 Testing

### Test ID Support
```tsx
<HeroText size="medium" data-testid="hero-subtitle">
  Testable text
</HeroText>
```

### Testing Examples
```typescript
// Cypress
cy.get('[data-testid="hero-subtitle"]').should('be.visible');
cy.get('[data-testid="hero-subtitle"]').should('contain', 'Testable text');

// Jest + Testing Library
expect(screen.getByTestId('hero-subtitle')).toBeInTheDocument();
expect(screen.getByTestId('hero-subtitle')).toHaveTextContent('Testable text');
```

## 🎨 Design System Integration

### MUI Theme Integration
```tsx
<HeroText 
  size="medium"
  sx={{
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.dark
    }
  }}
>
  Theme-aware text
</HeroText>
```

### Consistent Spacing
```tsx
<HeroText 
  size="large"
  sx={{ 
    mb: theme.spacing(4),
    px: theme.spacing(2)
  }}
>
  Properly spaced text
</HeroText>
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
1. Edit `src/components/HeroText.tsx`
2. Test changes in the demo page (`/hero-text-demo`)
3. Update this README if needed
4. Ensure all existing usage still works

## 🌟 Examples in Your App

### Home Page Hero Section
```tsx
// src/app/page.tsx
<HeroTitle>Encuentra tu Masaje Perfecto</HeroTitle>
<HeroText size="large">
  Descubre servicios profesionales de masaje y bienestar
</HeroText>
```

### Demo Page
Visit `/hero-text-demo` to see various configurations and use cases.

## 🚀 Migration Guide

### From Inline Typography
```tsx
// Before: Inline Typography with custom styles
<Typography
  variant="body1"
  sx={{ 
    fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' }, 
    color: 'rgba(255,255,255,.95)', 
    mb: 4, 
    textShadow: '0 1px 2px rgba(0,0,0,.4)' 
  }}
>
  Your text content
</Typography>

// After: HeroText component
<HeroText size="medium">
  Your text content
</HeroText>
```

### From Custom Components
```tsx
// Before: Custom text component
<CustomText size="medium" text="Your content" />

// After: HeroText component
<HeroText size="medium">
  Your content
</HeroText>
```

## 🎨 Best Practices

### 1. **Size Selection**
Choose appropriate sizes for your content hierarchy:
```tsx
// Good: Clear hierarchy
<HeroText size="large">Main subtitle</HeroText>
<HeroText size="medium">Description</HeroText>
<HeroText size="small">Additional info</HeroText>

// Avoid: Inconsistent sizing
<HeroText size="large">Everything large</HeroText>
<HeroText size="large">More large text</HeroText>
```

### 2. **Gradient Usage**
Use gradients sparingly and for emphasis:
```tsx
// Good: Strategic gradient usage
<HeroText size="large" gradient={true}>
  Important call-to-action
</HeroText>

// Avoid: Overusing gradients
<HeroText size="small" gradient={true}>
  Every small text with gradient
</HeroText>
```

### 3. **Responsive Design**
Let the component handle responsive sizing automatically:
```tsx
// Good: Let component handle responsiveness
<HeroText size="medium">Your text</HeroText>

// Avoid: Overriding responsive behavior unnecessarily
<HeroText size="medium" responsive={false} sx={{ fontSize: '1.25rem' }}>
  Your text
</HeroText>
```

### 4. **Testing**
Always include test IDs for automated testing:
```tsx
<HeroText size="medium" data-testid="hero-description">
  Your text
</HeroText>
```

### 5. **Semantic HTML**
Use appropriate HTML elements:
```tsx
// Good: Semantic HTML
<HeroText component="p" size="medium">
  Paragraph content
</HeroText>

// Good: Semantic HTML for headings
<HeroText component="h6" size="large">
  Section subtitle
</HeroText>
```

## 🔄 Component Composition

### With HeroTitle
```tsx
<HeroTitle>Main Title</HeroTitle>
<HeroText size="large">Subtitle</HeroText>
<HeroText size="medium">Description</HeroText>
```

### In Grid Layouts
```tsx
<Grid container spacing={3}>
  <Grid item xs={12} md={6}>
    <HeroText size="medium">
      Left column content
    </HeroText>
  </Grid>
  <Grid item xs={12} md={6}>
    <HeroText size="medium">
      Right column content
    </HeroText>
  </Grid>
</Grid>
```

### In Cards
```tsx
<Card>
  <CardContent>
    <HeroText size="large" gradient={true}>
      Card Title
    </HeroText>
    <HeroText size="medium">
      Card description
    </HeroText>
  </CardContent>
</Card>
```

---

**Happy coding! 🎉**

The HeroText component is now your go-to solution for creating beautiful, consistent text elements throughout your application. Use it alongside HeroTitle for complete hero section solutions!
