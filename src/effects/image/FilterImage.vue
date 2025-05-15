<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'FilterImage',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    filter: {
      type: String,
      default: 'none',
      validator: (value: string) => 
        ['none', 'grayscale', 'sepia', 'blur', 'brightness', 'contrast', 'hue-rotate', 'vintage', 'duotone'].includes(value)
    },
    amount: {
      type: Number,
      default: 100
    },
    hoverFilter: {
      type: String,
      default: 'none'
    },
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: 'auto'
    },
    objectFit: {
      type: String,
      default: 'cover'
    },
    transitionDuration: {
      type: Number,
      default: 0.3
    },
    lazy: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const widthStyle = computed(() => {
      return typeof props.width === 'number' ? `${props.width}px` : props.width
    })

    const heightStyle = computed(() => {
      return typeof props.height === 'number' ? `${props.height}px` : props.height
    })

    const filterStyle = computed(() => {
      const amount = props.amount / 100
      
      switch (props.filter) {
        case 'grayscale':
          return `grayscale(${amount})`
        case 'sepia':
          return `sepia(${amount})`
        case 'blur':
          return `blur(${amount * 10}px)`
        case 'brightness':
          return `brightness(${0.5 + amount})`
        case 'contrast':
          return `contrast(${0.5 + amount})`
        case 'hue-rotate':
          return `hue-rotate(${amount * 360}deg)`
        case 'vintage':
          return `sepia(${amount * 0.5}) contrast(${1 + amount * 0.1}) brightness(${1 - amount * 0.1})`
        case 'duotone':
          return `grayscale(1) contrast(${1.5 + amount}) brightness(${1 - amount * 0.3})`
        default:
          return 'none'
      }
    })

    const hoverFilterStyle = computed(() => {
      const amount = props.amount / 100
      
      switch (props.hoverFilter) {
        case 'grayscale':
          return `grayscale(${amount})`
        case 'sepia':
          return `sepia(${amount})`
        case 'blur':
          return `blur(${amount * 10}px)`
        case 'brightness':
          return `brightness(${0.5 + amount})`
        case 'contrast':
          return `contrast(${0.5 + amount})`
        case 'hue-rotate':
          return `hue-rotate(${amount * 360}deg)`
        case 'vintage':
          return `sepia(${amount * 0.5}) contrast(${1 + amount * 0.1}) brightness(${1 - amount * 0.1})`
        case 'duotone':
          return `grayscale(1) contrast(${1.5 + amount}) brightness(${1 - amount * 0.3})`
        default:
          return 'none'
      }
    })

    return {
      widthStyle,
      heightStyle,
      filterStyle,
      hoverFilterStyle
    }
  }
})
</script>

<template>
  <div 
    class="filter-image-container" 
    :class="{ 'rounded': rounded }"
    :style="{
      '--width': widthStyle,
      '--height': heightStyle,
      '--filter': filterStyle,
      '--hover-filter': hoverFilterStyle,
      '--transition-duration': `${transitionDuration}s`,
      '--object-fit': objectFit
    }"
  >
    <img 
      :src="src" 
      :alt="alt" 
      :loading="lazy ? 'lazy' : undefined"
      class="filter-image"
    />
  </div>
</template>

<style scoped>
.filter-image-container {
  overflow: hidden;
  width: var(--width);
  height: var(--height);
  position: relative;
}

.rounded {
  border-radius: var(--tx-border-radius-medium);
}

.filter-image {
  width: 100%;
  height: 100%;
  filter: var(--filter);
  transition: filter var(--transition-duration) ease;
  object-fit: var(--object-fit);
}

.filter-image-container:hover .filter-image {
  filter: var(--hover-filter);
}
</style> 