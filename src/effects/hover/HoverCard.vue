<template>
  <div 
    class="hover-card" 
    :class="[`hover-card--${effect}`]"
    :style="cardStyle"
    @mouseenter="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <div class="hover-card__content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

export default defineComponent({
  name: 'HoverCard',
  props: {
    effect: {
      type: String,
      default: 'float',
      validator: (value: string) => ['float', 'glow', 'lift', 'tilt', 'outline'].includes(value)
    },
    color: {
      type: String,
      default: '#3498db'
    },
    glowIntensity: {
      type: Number,
      default: 0.5,
      validator: (value: number) => value >= 0 && value <= 1
    },
    borderRadius: {
      type: [String, Number],
      default: '8px'
    },
    shadow: {
      type: String,
      default: '0 4px 20px rgba(0, 0, 0, 0.1)'
    },
    tiltAmount: {
      type: Number,
      default: 10,
      validator: (value: number) => value >= 0 && value <= 45
    }
  },
  setup(props) {
    const isHovering = ref(false)

    const cardStyle = computed(() => {
      const styles: Record<string, string> = {
        '--card-color': props.color,
        '--card-glow-intensity': props.glowIntensity.toString(),
        '--card-border-radius': typeof props.borderRadius === 'number' 
          ? `${props.borderRadius}px` 
          : props.borderRadius,
        '--card-shadow': props.shadow,
        '--card-tilt-amount': `${props.tiltAmount}deg`
      }
      
      return styles
    })

    return {
      isHovering,
      cardStyle
    }
  }
})
</script>

<style scoped>
.hover-card {
  position: relative;
  background-color: #ffffff;
  border-radius: var(--card-border-radius);
  box-shadow: var(--card-shadow);
  transition: all 0.3s ease;
  overflow: hidden;
}

.hover-card__content {
  padding: 20px;
  z-index: 2;
  position: relative;
}

/* Float effect */
.hover-card--float:hover {
  transform: translateY(-12px);
  box-shadow: 0 22px 30px rgba(0, 0, 0, 0.15);
}

/* Glow effect */
.hover-card--glow {
  overflow: visible;
}

.hover-card--glow:hover {
  box-shadow: 0 0 20px calc(var(--card-glow-intensity) * 20px) var(--card-color);
}

.hover-card--glow:hover::after {
  content: '';
  position: absolute;
  top: -15px;
  left: -15px;
  right: -15px;
  bottom: -15px;
  background: radial-gradient(
    circle at center,
    var(--card-color) 0%,
    transparent 70%
  );
  opacity: calc(var(--card-glow-intensity) * 0.2);
  z-index: -1;
  border-radius: var(--card-border-radius);
  filter: blur(15px);
}

/* Lift effect */
.hover-card--lift:hover {
  transform: scale(1.05);
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.2);
}

/* Tilt effect */
.hover-card--tilt:hover {
  transform: perspective(1000px) rotateX(calc(var(--card-tilt-amount) * -0.2)) rotateY(calc(var(--card-tilt-amount) * 0.3));
}

/* Outline effect */
.hover-card--outline {
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.hover-card--outline:hover {
  border-color: var(--card-color);
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
}
</style> 