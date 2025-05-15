<template>
  <div class="progress-bar" :style="progressBarStyle">
    <div class="progress-bar__track">
      <div 
        class="progress-bar__fill" 
        :class="{ 'progress-bar__fill--indeterminate': indeterminate }"
        :style="progressFillStyle"
      ></div>
    </div>
    <div v-if="showLabel" class="progress-bar__label">
      {{ percentageLabel }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'ProgressBar',
  props: {
    value: {
      type: Number,
      default: 0,
      validator: (value: number) => value >= 0 && value <= 100
    },
    height: {
      type: [Number, String],
      default: 8
    },
    color: {
      type: String,
      default: '#4caf50'
    },
    trackColor: {
      type: String,
      default: '#e0e0e0'
    },
    borderRadius: {
      type: [Number, String],
      default: 4
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    showLabel: {
      type: Boolean,
      default: false
    },
    labelFormatter: {
      type: Function,
      default: (value: number) => `${value}%`
    }
  },
  setup(props) {
    const progressBarStyle = computed(() => {
      const heightValue = typeof props.height === 'number' ? `${props.height}px` : props.height
      const borderRadiusValue = typeof props.borderRadius === 'number' 
        ? `${props.borderRadius}px` 
        : props.borderRadius

      return {
        '--progress-height': heightValue,
        '--progress-color': props.color,
        '--progress-track-color': props.trackColor,
        '--progress-border-radius': borderRadiusValue
      }
    })

    const progressFillStyle = computed(() => {
      const styles: Record<string, string> = {
        width: props.indeterminate ? '100%' : `${props.value}%`
      }

      if (props.striped && !props.indeterminate) {
        styles.backgroundImage = 
          `linear-gradient(45deg, 
            rgba(255, 255, 255, 0.15) 25%, 
            transparent 25%, 
            transparent 50%, 
            rgba(255, 255, 255, 0.15) 50%, 
            rgba(255, 255, 255, 0.15) 75%, 
            transparent 75%, 
            transparent)`
        styles.backgroundSize = '1rem 1rem'
      }

      return styles
    })

    const percentageLabel = computed(() => {
      return props.labelFormatter(props.value)
    })

    return {
      progressBarStyle,
      progressFillStyle,
      percentageLabel
    }
  }
})
</script>

<style scoped>
.progress-bar {
  display: flex;
  align-items: center;
  width: 100%;
}

.progress-bar__track {
  height: var(--progress-height);
  flex-grow: 1;
  background-color: var(--progress-track-color);
  border-radius: var(--progress-border-radius);
  overflow: hidden;
}

.progress-bar__fill {
  height: 100%;
  background-color: var(--progress-color);
  border-radius: var(--progress-border-radius);
  transition: width 0.3s ease;
}

.progress-bar__fill--indeterminate {
  position: relative;
  width: 100%;
  transform: translateX(-100%);
  animation: indeterminate 1.5s infinite linear;
}

.progress-bar__label {
  margin-left: 10px;
  font-size: 0.875rem;
  font-weight: 500;
  min-width: 40px;
  text-align: right;
}

@keyframes indeterminate {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style> 