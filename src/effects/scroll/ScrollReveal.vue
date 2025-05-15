<template>
  <div 
    ref="container" 
    class="scroll-reveal" 
    :class="{ 
      'scroll-reveal--visible': isVisible,
      [`scroll-reveal--${direction}`]: true
    }"
    :style="customStyle"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, computed } from 'vue'

export default defineComponent({
  name: 'ScrollReveal',
  props: {
    threshold: {
      type: Number,
      default: 0.3,
      validator: (value: number) => value >= 0 && value <= 1
    },
    delay: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 0.8,
      validator: (value: number) => value > 0
    },
    distance: {
      type: [String, Number],
      default: '50px'
    },
    direction: {
      type: String,
      default: 'bottom',
      validator: (value: string) => ['top', 'right', 'bottom', 'left'].includes(value)
    },
    origin: {
      type: String,
      default: 'bottom',
      validator: (value: string) => ['top', 'right', 'bottom', 'left'].includes(value)
    },
    easing: {
      type: String,
      default: 'cubic-bezier(0.5, 0, 0, 1)'
    },
    opacity: {
      type: Number,
      default: 0,
      validator: (value: number) => value >= 0 && value <= 1
    },
    rotate: {
      type: Number,
      default: 0
    },
    scale: {
      type: Number,
      default: 1,
      validator: (value: number) => value > 0
    },
    once: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['reveal', 'hidden'],
  setup(props, { emit }) {
    const container = ref<HTMLElement | null>(null)
    const isVisible = ref(false)
    let observer: IntersectionObserver | null = null
    
    const customStyle = computed(() => {
      const styles: Record<string, string> = {
        '--reveal-duration': `${props.duration}s`,
        '--reveal-delay': `${props.delay}ms`,
        '--reveal-easing': props.easing
      }

      if (typeof props.distance === 'number') {
        styles['--reveal-distance'] = `${props.distance}px`
      } else {
        styles['--reveal-distance'] = props.distance
      }
      
      return styles
    })
    
    const setupObserver = () => {
      if (!container.value || props.disabled) return
      
      observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries
          
          if (entry.isIntersecting) {
            if (!isVisible.value) {
              isVisible.value = true
              emit('reveal')
            }
            
            if (props.once && observer) {
              observer.disconnect()
            }
          } else if (!props.once && isVisible.value) {
            isVisible.value = false
            emit('hidden')
          }
        },
        {
          threshold: props.threshold,
          rootMargin: '0px'
        }
      )
      
      observer.observe(container.value)
    }
    
    onMounted(() => {
      setupObserver()
    })
    
    onUnmounted(() => {
      if (observer) {
        observer.disconnect()
      }
    })
    
    return {
      container,
      isVisible,
      customStyle
    }
  }
})
</script>

<style scoped>
.scroll-reveal {
  transition-property: transform, opacity;
  transition-duration: var(--reveal-duration);
  transition-timing-function: var(--reveal-easing);
  transition-delay: var(--reveal-delay);
  will-change: transform, opacity;
}

.scroll-reveal:not(.scroll-reveal--visible) {
  opacity: 0;
}

.scroll-reveal--top:not(.scroll-reveal--visible) {
  transform: translateY(calc(var(--reveal-distance) * -1));
}

.scroll-reveal--right:not(.scroll-reveal--visible) {
  transform: translateX(var(--reveal-distance));
}

.scroll-reveal--bottom:not(.scroll-reveal--visible) {
  transform: translateY(var(--reveal-distance));
}

.scroll-reveal--left:not(.scroll-reveal--visible) {
  transform: translateX(calc(var(--reveal-distance) * -1));
}

.scroll-reveal--visible {
  opacity: 1;
  transform: translateX(0) translateY(0);
}
</style> 