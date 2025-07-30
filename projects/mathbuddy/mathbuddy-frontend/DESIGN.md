# MathBuddy Frontend - Design System

## Role
You are a **senior front-end developer**.
You pay close attention to every pixel, spacing, font, color;
Whenever there are UI implementation task, think deeply of the design style first, and then implement UI bit by bit

## Current Design System: Dark Financial App Theme

### **Visual Style**
- **Dark sophisticated theme** inspired by modern financial applications
- **Glass morphism effects** with backdrop blur and semi-transparent elements
- **Teal accent colors** (#10b981) for primary actions and success states
- **High contrast typography** with proper accessibility
- **Immersive dark experience** with elegant visual hierarchy

### **Color Palette**
```css
/* Primary Colors */
--primary-teal: #10b981;
--primary-teal-dark: #059669;
--accent-teal: #14b8a6;
--accent-cyan: #06b6d4;

/* Background Colors */
--bg-primary: #1a1a1a;
--bg-secondary: #2d2d2d;
--bg-card: rgba(45, 45, 45, 0.8);
--bg-card-subtle: rgba(45, 45, 45, 0.6);

/* Text Colors */
--text-primary: #ffffff;
--text-secondary: rgba(255, 255, 255, 0.7);
--text-muted: rgba(255, 255, 255, 0.5);

/* Status Colors */
--success: #10b981;
--error: #ef4444;
--warning: #f59e0b;
```

### **Typography**
- **Font Family**: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif
- **Font Weights**: 300 (light), 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
- **Size Scale**: 12px, 14px, 16px, 18px, 20px, 24px, 32px, 48px
- **Line Heights**: 1.2 (tight), 1.5 (normal), 1.75 (relaxed)

### **Spacing System**
- **Base Unit**: 4px
- **Scale**: 4px, 8px, 16px, 24px, 32px, 48px, 64px, 96px
- **Consistent grid-based spacing** for visual rhythm

### **Component Specifications**

#### **Cards**
```css
.card {
  background: rgba(45, 45, 45, 0.8);
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
}

.card-subtle {
  background: rgba(45, 45, 45, 0.6);
  border-radius: 16px;
  padding: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

#### **Buttons**
```css
.btn-primary {
  background: #10b981;
  color: #ffffff;
  border-radius: 16px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);
  transition: all 0.2s ease;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border-radius: 16px;
  padding: 12px 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}
```

#### **Input Fields**
```css
.input-field {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 16px;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.input-field:focus {
  background: rgba(255, 255, 255, 0.1);
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
}
```

#### **Progress Bars**
```css
.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
}

.progress-complete {
  background: linear-gradient(90deg, #10b981 0%, #059669 100%);
}

.progress-partial {
  background: linear-gradient(90deg, #14b8a6 0%, #06b6d4 100%);
}
```

#### **Navigation**
```css
.nav {
  background: rgba(45, 45, 45, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
```

### **Design Principles**

1. **Glass Morphism**: All cards and overlays use backdrop blur with semi-transparent backgrounds
2. **Consistent Shadows**: Layered shadows create depth without being overwhelming
3. **Teal Accent System**: Primary teal (#10b981) for actions, gradients for progress
4. **Typography Hierarchy**: Clear contrast with white/semi-transparent text
5. **Spacing Rhythm**: 8px base grid system for consistent visual rhythm
6. **Accessibility**: High contrast ratios and proper focus states
7. **Responsive Design**: Mobile-first approach with flexible layouts

### **Page Layouts**

#### **Dashboard/Home Page**
- **Stats Grid**: 4-column overview cards showing totals
- **Exercise Cards**: Glass morphism cards with progress bars
- **Navigation**: Dark nav bar with user info and logout

#### **Exercise Pages**
- **Centered Layout**: Single card design for focus
- **Progress Visualization**: Linear progress bars and percentage displays
- **Question Display**: Large, readable typography for math problems

#### **Auth Pages**
- **Centered Form**: Single card layout with consistent styling
- **Form Fields**: Dark inputs with teal focus states
- **Toggle Buttons**: Underlined text buttons for form switching

### **Interaction States**
- **Hover**: Subtle lift effect (translateY(-2px)) and enhanced shadows
- **Focus**: Teal outline with appropriate shadow
- **Active**: Slight scale and color adjustments
- **Disabled**: 50% opacity with not-allowed cursor

### **Responsive Breakpoints**
- **Mobile**: 375px and up
- **Tablet**: 768px and up  
- **Desktop**: 1024px and up
- **Wide**: 1440px and up

### **Performance Considerations**
- **Backdrop Filter**: Used judiciously for glass effects
- **CSS Transitions**: Limited to transform and opacity for smoothness
- **Shadow Optimization**: Minimal shadow layers for performance
- **Dark Theme**: Reduces eye strain and modern aesthetic

This design system creates a cohesive, modern, and accessible user experience that feels premium while maintaining excellent usability for mathematical exercises.