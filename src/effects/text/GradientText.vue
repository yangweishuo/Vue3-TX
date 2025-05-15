<template>
  <div 
    class="gradient-text"
    :class="[
      `gradient-text--${type}`,
      { 'gradient-text--animated': animated }
    ]"
    :style="customStyle"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'GradientText',
  props: {
    colors: {
      type: Array as () => string[],
      default: () => ['#ff9a9e', '#fad0c4', '#fbc2eb', '#a6c1ee']
    },
    type: {
      type: String,
      default: 'linear',
      validator: (value: string) => ['linear', 'radial', 'conic'].includes(value)
    },
    direction: {
      type: String,
      default: 'right',
      validator: (value: string) => [
        'right', 'left', 'top', 'bottom', 
        'right-top', 'right-bottom', 'left-top', 'left-bottom'
      ].includes(value)
    },
    animated: {
      type: Boolean,
      default: false
    },
    animationDuration: {
      type: Number,
      default: 3,
      validator: (value: number) => value > 0
    },
    fontSize: {
      type: [String, Number],
      default: 'inherit'
    },
    fontWeight: {
      type: [String, Number],
      default: 700
    },
    fontFamily: {
      type: String,
      default: 'inherit'
    },
    backgroundSize: {
      type: [String, Number],
      default: '100%'
    }
  },
  setup(props) {
    const getDirection = () => {
      switch (props.direction) {
        case 'right': return 'to right'
        case 'left': return 'to left'
        case 'top': return 'to top'
        case 'bottom': return 'to bottom'
        case 'right-top': return 'to right top'
        case 'right-bottom': return 'to right bottom'
        case 'left-top': return 'to left top'
        case 'left-bottom': return 'to left bottom'
        default: return 'to right'
      }
    }
    
    const colorStops = computed(() => {
      return props.colors.map((color, index) => {
        const percent = (index / (props.colors.length - 1)) * 100
        return `${color} ${percent}%`
      }).join(', ')
    })
    
    const gradientBackground = computed(() => {
      if (props.type === 'linear') {
        return `linear-gradient(${getDirection()}, ${colorStops.value})`
      } else if (props.type === 'radial') {
        return `radial-gradient(circle, ${colorStops.value})`
      } else if (props.type === 'conic') {
        return `conic-gradient(from 0deg, ${colorStops.value})`
      }
      return `linear-gradient(${getDirection()}, ${colorStops.value})`
    })
    
    const customStyle = computed(() => {
      const bgSize = typeof props.backgroundSize === 'number' 
        ? `${props.backgroundSize}%` 
        : props.backgroundSize
        
      const styles: Record<string, string> = {
        background: gradientBackground.value,
        backgroundSize: bgSize,
        '--animation-duration': `${props.animationDuration}s`
      }
      
      if (props.fontSize !== 'inherit') {
        styles.fontSize = typeof props.fontSize === 'number' 
          ? `${props.fontSize}px` 
          : props.fontSize
      }
      
      if (props.fontWeight !== 'inherit') {
        styles.fontWeight = props.fontWeight.toString()
      }
      
      if (props.fontFamily !== 'inherit') {
        styles.fontFamily = props.fontFamily
      }
      
      if (props.animated) {
        styles.backgroundSize = '200% auto'
      }
      
      return styles
    })
    
    return {
      customStyle
    }
  }
})
</script>

<style scoped>
.gradient-text {
  display: inline-block;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  position: relative;
}

.gradient-text--animated {
  animation: gradient-animation var(--animation-duration) ease infinite alternate;
}

@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
</style> 