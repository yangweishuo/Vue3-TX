<template>
  <button
    class="pulse-button"
    :class="{ 'pulse-button--disabled': disabled }"
    :style="customStyle"
    :disabled="disabled"
    @click="handleClick"
  >
    <span class="pulse-button__content">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'PulseButton',
  props: {
    color: {
      type: String,
      default: '#e74c3c'
    },
    pulseColor: {
      type: String,
      default: 'rgba(231, 76, 60, 0.4)'
    },
    textColor: {
      type: String,
      default: '#ffffff'
    },
    speed: {
      type: Number,
      default: 1.5,
      validator: (value: number) => value > 0
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  setup(props, { emit }) {
    const customStyle = computed(() => ({
      '--base-color': props.color,
      '--pulse-color': props.pulseColor,
      '--text-color': props.textColor,
      '--animation-speed': `${props.speed}s`
    }))

    const handleClick = (event: MouseEvent) => {
      if (!props.disabled) {
        emit('click', event)
      }
    }

    return {
      customStyle,
      handleClick
    }
  }
})
</script>

<style scoped>
.pulse-button {
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
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.pulse-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--pulse-color);
  border-radius: 50%;
  transform: scale(0);
  animation: pulse var(--animation-speed) infinite;
  z-index: 0;
}

.pulse-button__content {
  position: relative;
  z-index: 1;
}

@keyframes pulse {
  0% {
    transform: scale(0);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.5);
    opacity: 0;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

.pulse-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.pulse-button--disabled::before {
  animation: none;
}
</style> 