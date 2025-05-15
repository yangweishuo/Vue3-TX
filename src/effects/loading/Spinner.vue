<template>
  <div class="spinner" :style="spinnerStyle">
    <div class="spinner__circle" :style="circleStyle"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'Spinner',
  props: {
    size: {
      type: Number,
      default: 40
    },
    color: {
      type: String,
      default: '#3498db'
    },
    thickness: {
      type: Number,
      default: 3
    },
    speed: {
      type: Number,
      default: 0.7,
      validator: (value: number) => value > 0
    }
  },
  setup(props) {
    const spinnerStyle = computed(() => ({
      '--spinner-size': `${props.size}px`,
      '--spinner-color': props.color,
      '--spinner-thickness': `${props.thickness}px`,
      '--spinner-speed': `${props.speed}s`
    }))

    const circleStyle = computed(() => ({
      borderWidth: `${props.thickness}px`
    }))

    return {
      spinnerStyle,
      circleStyle
    }
  }
})
</script>

<style scoped>
.spinner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--spinner-size);
  height: var(--spinner-size);
}

.spinner__circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border-style: solid;
  border-color: var(--spinner-color) transparent transparent transparent;
  animation: spinner-rotate var(--spinner-speed) infinite linear;
}

@keyframes spinner-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style> 