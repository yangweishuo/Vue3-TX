<template>
  <button
    class="hover-button"
    :class="{ 'hover-button--disabled': disabled }"
    :style="customStyle"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'HoverButton',
  props: {
    color: {
      type: String,
      default: '#3498db'
    },
    hoverColor: {
      type: String,
      default: '#2980b9'
    },
    textColor: {
      type: String,
      default: '#ffffff'
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
      '--hover-color': props.hoverColor,
      '--text-color': props.textColor
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
.hover-button {
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
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.hover-button:hover {
  background-color: var(--hover-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.hover-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
}

.hover-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.hover-button--disabled:hover {
  transform: none;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: var(--base-color);
}
</style> 