<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FlipCard',
  props: {
    flipped: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator: (value: string) => ['horizontal', 'vertical'].includes(value)
    },
    height: {
      type: [String, Number],
      default: '300px'
    },
    width: {
      type: [String, Number],
      default: '100%'
    },
    speed: {
      type: Number,
      default: 0.6
    }
  }
})
</script>

<template>
  <div 
    class="flip-card" 
    :class="[flipped ? 'flipped' : '', direction]"
    :style="{
      '--height': typeof height === 'number' ? `${height}px` : height,
      '--width': typeof width === 'number' ? `${width}px` : width,
      '--speed': `${speed}s`
    }"
  >
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <slot name="front"></slot>
      </div>
      <div class="flip-card-back">
        <slot name="back"></slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flip-card {
  background-color: transparent;
  width: var(--width);
  height: var(--height);
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform var(--speed) ease;
  transform-style: preserve-3d;
}

.flip-card.flipped .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card.vertical.flipped .flip-card-inner {
  transform: rotateX(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--tx-border-radius-medium);
  overflow: hidden;
  box-shadow: var(--tx-shadow-medium);
}

.flip-card-front {
  background-color: var(--tx-card-bg);
  color: var(--tx-text-color);
  z-index: 1;
}

.flip-card-back {
  background-color: var(--tx-primary-color);
  color: white;
  transform: rotateY(180deg);
}

.flip-card.vertical .flip-card-back {
  transform: rotateX(180deg);
}
</style> 