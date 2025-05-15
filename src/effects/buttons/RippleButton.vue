<template>
  <button
    class="ripple-button"
    :class="{ 'ripple-button--disabled': disabled }"
    :style="customStyle"
    :disabled="disabled"
    @click="handleClick"
    @mousedown="createRipple"
  >
    <slot></slot>
    <span v-for="(ripple, index) in ripples" 
          :key="index" 
          class="ripple" 
          :style="ripple.style"></span>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

interface Ripple {
  x: number
  y: number
  size: number
  style: Record<string, string>
}

export default defineComponent({
  name: 'RippleButton',
  props: {
    color: {
      type: String,
      default: '#9c27b0'
    },
    rippleColor: {
      type: String,
      default: 'rgba(255, 255, 255, 0.7)'
    },
    textColor: {
      type: String,
      default: '#ffffff'
    },
    duration: {
      type: Number,
      default: 0.6,
      validator: (value: number) => value > 0
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const ripples = ref<Ripple[]>([])
    let rippleCount = 0
    const MAX_RIPPLES = 5

    const customStyle = computed(() => ({
      '--base-color': props.color,
      '--ripple-color': props.rippleColor,
      '--text-color': props.textColor,
      '--animation-duration': `${props.duration}s`
    }))

    const createRipple = (event: MouseEvent) => {
      if (props.disabled) return

      const button = event.currentTarget as HTMLElement
      const rect = button.getBoundingClientRect()
      
      const size = Math.max(button.offsetWidth, button.offsetHeight) * 2
      const x = event.clientX - rect.left - (size / 2)
      const y = event.clientY - rect.top - (size / 2)
      
      const newRipple: Ripple = {
        x,
        y,
        size,
        style: {
          top: `${y}px`,
          left: `${x}px`,
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: `${props.duration}s`
        }
      }
      
      ripples.value.push(newRipple)
      rippleCount++
      
      // 限制最大涟漪数量
      if (ripples.value.length > MAX_RIPPLES) {
        ripples.value.shift()
      }
      
      setTimeout(() => {
        ripples.value = ripples.value.filter((_, i) => i !== 0)
      }, props.duration * 1000)
    }

    const handleClick = (event: MouseEvent) => {
      if (!props.disabled) {
        emit('click', event)
      }
    }

    return {
      ripples,
      customStyle,
      createRipple,
      handleClick
    }
  }
})
</script>

<style scoped>
.ripple-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.5rem;
  background-color: var(--base-color);
  color: var(--text-color);
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.ripple-button:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.ripple {
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  background-color: var(--ripple-color);
  pointer-events: none;
  animation: ripple-effect var(--animation-duration) linear;
}

@keyframes ripple-effect {
  to {
    transform: scale(2);
    opacity: 0;
  }
}

.ripple-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style> 