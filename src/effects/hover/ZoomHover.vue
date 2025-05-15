<template>
  <div 
    class="zoom-hover" 
    :class="[
      `zoom-hover--${direction}`,
      { 'zoom-hover--overflow': overflow }
    ]"
    :style="customStyle"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <div 
      class="zoom-hover__content"
      :style="contentStyle"
    >
      <slot></slot>
    </div>
    <div v-if="overlay" class="zoom-hover__overlay" :style="overlayStyle">
      <slot name="overlay"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'

export default defineComponent({
  name: 'ZoomHover',
  props: {
    scale: {
      type: Number,
      default: 1.1,
      validator: (value: number) => value > 0
    },
    duration: {
      type: Number,
      default: 0.3,
      validator: (value: number) => value > 0
    },
    direction: {
      type: String,
      default: 'center',
      validator: (value: string) => [
        'center', 'top', 'bottom', 'left', 'right', 
        'top-left', 'top-right', 'bottom-left', 'bottom-right'
      ].includes(value)
    },
    easing: {
      type: String,
      default: 'ease'
    },
    overlay: {
      type: Boolean,
      default: false
    },
    overlayColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.4)'
    },
    overflow: {
      type: Boolean,
      default: false
    },
    borderRadius: {
      type: [String, Number],
      default: '0'
    }
  },
  setup(props, { emit }) {
    const isHovering = ref(false)

    const customStyle = computed(() => {
      const borderRadius = typeof props.borderRadius === 'number' 
        ? `${props.borderRadius}px` 
        : props.borderRadius

      return {
        '--zoom-duration': `${props.duration}s`,
        '--zoom-easing': props.easing,
        '--zoom-border-radius': borderRadius,
        '--overlay-color': props.overlayColor
      }
    })

    const contentStyle = computed(() => {
      return {
        transform: isHovering.value ? `scale(${props.scale})` : 'scale(1)'
      }
    })

    const overlayStyle = computed(() => {
      return {
        opacity: isHovering.value ? '1' : '0'
      }
    })

    watch(isHovering, (newValue) => {
      emit(newValue ? 'hover' : 'leave')
    })

    return {
      isHovering,
      customStyle,
      contentStyle,
      overlayStyle
    }
  }
})
</script>

<style scoped>
.zoom-hover {
  position: relative;
  overflow: hidden;
  border-radius: var(--zoom-border-radius);
}

.zoom-hover--overflow {
  overflow: visible;
}

.zoom-hover__content {
  transition: transform var(--zoom-duration) var(--zoom-easing);
  width: 100%;
  height: 100%;
}

.zoom-hover__overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--overlay-color);
  opacity: 0;
  transition: opacity var(--zoom-duration) var(--zoom-easing);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

/* Transform Origin Variations */
.zoom-hover--center .zoom-hover__content {
  transform-origin: center center;
}

.zoom-hover--top .zoom-hover__content {
  transform-origin: center top;
}

.zoom-hover--bottom .zoom-hover__content {
  transform-origin: center bottom;
}

.zoom-hover--left .zoom-hover__content {
  transform-origin: left center;
}

.zoom-hover--right .zoom-hover__content {
  transform-origin: right center;
}

.zoom-hover--top-left .zoom-hover__content {
  transform-origin: left top;
}

.zoom-hover--top-right .zoom-hover__content {
  transform-origin: right top;
}

.zoom-hover--bottom-left .zoom-hover__content {
  transform-origin: left bottom;
}

.zoom-hover--bottom-right .zoom-hover__content {
  transform-origin: right bottom;
}
</style> 