# Vue3 TX Effect Component Library

![Version](https://img.shields.io/badge/version-0.3.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

A super practical front-end effect component library based on Vue 3, providing rich animation effects and interactive components that can quickly add modern visual effects and user experience to your project.

## Features

- **🔥 Rich Effect Types**: Button effects, loading animations, hover effects, text animations, transitions, modal components, scroll effects, card effects, image effects, and background effects
- **💪 Based on Vue 3**: Built with Vue 3's Composition API and TypeScript, with strong typing support
- **🎨 Highly Customizable**: Each component provides rich properties and events, supporting deep customization
- **📦 On-demand Import**: Support for importing individual components to optimize project size
- **📱 Responsive Design**: Adapts to various screen sizes and devices
- **🔒 Type Safety**: Complete TypeScript type support
- **🌓 Dark Mode**: Built-in dark mode support, automatically following system theme or manual switching
- **✨ Interactive Dynamics**: Rich dynamic effects to enhance user experience
- **🚀 High Performance**: Optimized animation implementation for smooth operation

## Installation

```bash
# Using npm
npm install vue3-tx-component

# Using yarn
yarn add vue3-tx-component

# Using pnpm
pnpm add vue3-tx-component
```

## Quick Start

### Global Registration

```js
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import TXComponent from 'vue3-tx-component'
import 'vue3-tx-component/dist/style.css' // Import styles

const app = createApp(App)
app.use(TXComponent)
app.mount('#app')
```

### On-demand Import

```vue
<template>
  <div>
    <HoverButton @click="handleClick">Click Me</HoverButton>
    <Typewriter text="This is a typewriter effect" />
  </div>
</template>

<script setup>
import { HoverButton, Typewriter } from 'vue3-tx-component'
import 'vue3-tx-component/dist/style.css' // Import styles

const handleClick = () => {
  console.log('Button was clicked!')
}
</script>
```

## Component List

### Button Effects
- `HoverButton`: Hover effect button
- `PulseButton`: Pulse effect button
- `RippleButton`: Ripple effect button

### Loading Animations
- `Spinner`: Loading spinner animation
- `Skeleton`: Skeleton screen loading
- `ProgressBar`: Progress bar

### Hover Effects
- `HoverCard`: Hover card
- `ZoomHover`: Zoom hover
- `FloatHover`: Float hover effect
- `MouseFollower`: Mouse follower effect, supporting multiple following styles

### Text Effects
- `Typewriter`: Typewriter effect
- `GradientText`: Gradient text
- `GlitchText`: Glitch style text

### Transitions
- `FadeTransition`: Fade in/out transition
- `SlideTransition`: Slide transition
- `ScaleTransition`: Scale transition

### Modal Components
- `Modal`: Modal dialog
- `Drawer`: Drawer component
- `Popover`: Popover dialog

### Scroll Effects
- `ScrollReveal`: Scroll reveal effect
- `ScrollParallax`: Parallax scroll effect
- `ScrollProgress`: Scroll progress bar
- `ScrollAnimation`: Advanced scroll animation, supporting multiple effects

### Card Effects
- `FlipCard`: 3D flip card
- `TiltCard`: 3D tilt card, supporting mouse following and gyroscope

### Image Effects
- `FilterImage`: Image filter effect, supporting multiple filters and hover switching

### Background Effects
- `ParticleBackground`: Particle background effect, with customizable particle count and connection lines
- `GradientBackground`: Gradient background effect, supporting dynamic gradient color changes
- `WaveBackground`: Wave background effect, dynamic wave animation

### Theme
- `ThemeToggle`: Theme toggle component

## Advanced Usage Examples

### Particle Background Effect

```vue
<template>
  <div>
    <ParticleBackground 
      :count="100" 
      :speed="0.5" 
      color="#3498db" 
      :linked="true"
      :linkDistance="150"
    />
    <!-- Your content -->
  </div>
</template>
```

### Gradient Background Effect

```vue
<template>
  <div>
    <GradientBackground 
      :colors="['#4158D0', '#C850C0', '#FFCC70']"
      :animated="true"
      :animationDuration="15"
      :opacity="0.8"
    />
    <!-- Your content -->
  </div>
</template>
```

### Wave Background Effect

```vue
<template>
  <div>
    <WaveBackground 
      color1="rgba(66, 133, 244, 0.6)"
      color2="rgba(52, 168, 83, 0.6)"
      color3="rgba(251, 188, 5, 0.6)"
      :height="200"
    />
    <!-- Your content -->
  </div>
</template>
```

### Mouse Follower Effect

```vue
<template>
  <div>
    <MouseFollower 
      type="dot"
      :size="30"
      color="rgba(52, 152, 219, 0.6)"
      :delay="100"
    />
    <!-- Your content -->
  </div>
</template>
```

### 3D Flip Card

```vue
<template>
  <div>
    <FlipCard>
      <template #front>
        <div class="card-content">Front Content</div>
      </template>
      <template #back>
        <div class="card-content">Back Content</div>
      </template>
    </FlipCard>
  </div>
</template>
```

## Latest Updates (v0.3.0)

- Added `GradientBackground` gradient background effect component, supporting dynamic color changes
- Added `WaveBackground` wave background effect component, providing dynamic wave animations
- Added `MouseFollower` mouse follower effect component, supporting multiple following styles
- Added component showcase page, allowing you to view all effects on a single page
- Added background switching functionality, enabling switching between different background effects
- Optimized styles in dark mode
- Improved responsive design of components
- Enhanced interaction experience of effect components

## Documentation

Visit our [online documentation](https://your-documentation-url.com) for more detailed usage guides and API documentation.

## Contributing

Contributions, issue reports, and feature requests are welcome. Please check the [contribution guidelines](CONTRIBUTING.md) for more information.

## License

[MIT](LICENSE) 