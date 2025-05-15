<template>
  <div 
    class="glitch-text" 
    :class="{ 'glitch-text--hover': triggerOnHover }"
    :style="customStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="glitch-text__content" aria-hidden="true" data-text=""><slot></slot></div>
    <div v-if="showLayers" class="glitch-text__layers" aria-hidden="true">
      <div 
        class="glitch-text__layer glitch-text__layer--1" 
        :style="layerStyle1"
        :data-text="text"
      ></div>
      <div 
        class="glitch-text__layer glitch-text__layer--2" 
        :style="layerStyle2"
        :data-text="text"
      ></div>
    </div>
    <div class="glitch-text__original">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'

export default defineComponent({
  name: 'GlitchText',
  props: {
    intensity: {
      type: Number,
      default: 1,
      validator: (value: number) => value >= 0 && value <= 3
    },
    primaryColor: {
      type: String,
      default: '#ff00c1'
    },
    secondaryColor: {
      type: String,
      default: '#3498db'
    },
    triggerOnHover: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: true
    },
    fontSize: {
      type: [String, Number],
      default: 'inherit'
    },
    fontWeight: {
      type: [String, Number],
      default: 'bold'
    },
    fontFamily: {
      type: String,
      default: 'inherit'
    },
    blendMode: {
      type: String,
      default: 'screen',
      validator: (value: string) => [
        'normal', 'multiply', 'screen', 'overlay', 'darken', 
        'lighten', 'color-dodge', 'color-burn', 'difference', 
        'exclusion', 'hue', 'saturation', 'color', 'luminosity'
      ].includes(value)
    }
  },
  setup(props) {
    const isHovering = ref(false)
    const text = ref('')
    
    const showLayers = computed(() => {
      if (props.triggerOnHover) {
        return isHovering.value && props.active
      }
      return props.active
    })
    
    const customStyle = computed(() => {
      const styles: Record<string, string> = {
        '--primary-color': props.primaryColor,
        '--secondary-color': props.secondaryColor,
        '--blend-mode': props.blendMode,
        '--intensity': props.intensity.toString()
      }
      
      if (props.fontSize !== 'inherit') {
        styles.fontSize = typeof props.fontSize === 'number' 
          ? `${props.fontSize}px` 
          : props.fontSize
      }
      
      if (props.fontWeight !== 'inherit') {
        styles.fontWeight = props.fontWeight.toString()
      }
      
      if (props.fontFamily !== 'inherit') {
        styles.fontFamily = props.fontFamily
      }
      
      return styles
    })
    
    const layerStyle1 = computed(() => {
      return {
        '--layer-offset': `${-3 * props.intensity}px`,
        '--layer-color': props.primaryColor
      }
    })
    
    const layerStyle2 = computed(() => {
      return {
        '--layer-offset': `${3 * props.intensity}px`,
        '--layer-color': props.secondaryColor
      }
    })
    
    const handleMouseEnter = () => {
      isHovering.value = true
    }
    
    const handleMouseLeave = () => {
      isHovering.value = false
    }
    
    return {
      isHovering,
      text,
      showLayers,
      customStyle,
      layerStyle1,
      layerStyle2,
      handleMouseEnter,
      handleMouseLeave
    }
  }
})
</script>

<style scoped>
.glitch-text {
  position: relative;
  display: inline-block;
  font-size: inherit;
  font-weight: inherit;
}

.glitch-text__content {
  position: relative;
  opacity: 0;
}

.glitch-text__original {
  position: relative;
  z-index: 1;
}

.glitch-text__layers {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.glitch-text__layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: transparent;
}

.glitch-text__layer::before {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: var(--layer-color);
  transform: translateX(var(--layer-offset));
  mix-blend-mode: var(--blend-mode);
}

.glitch-text__layer--1 {
  animation: glitch-anim-1 calc(4s / var(--intensity)) infinite linear alternate;
}

.glitch-text__layer--2 {
  animation: glitch-anim-2 calc(3s / var(--intensity)) infinite linear alternate;
}

/* Only show effects when active or hovering */
.glitch-text--hover .glitch-text__layer {
  animation-play-state: paused;
}

.glitch-text--hover:hover .glitch-text__layer {
  animation-play-state: running;
}

@keyframes glitch-anim-1 {
  0%, 100% { opacity: 1; transform: translate3d(0, 0, 0); clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%); }
  20% { clip-path: polygon(0 20%, 100% 20%, 100% 21%, 0 21%); }
  40% { clip-path: polygon(0 58%, 100% 58%, 100% 59%, 0 59%); }
  60% { clip-path: polygon(0 10%, 100% 10%, 100% 11%, 0 11%); }
  80% { clip-path: polygon(0 75%, 100% 75%, 100% 76%, 0 76%); }
}

@keyframes glitch-anim-2 {
  0%, 100% { opacity: 1; transform: translate3d(0, 0, 0); clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%); }
  15% { clip-path: polygon(0 40%, 100% 40%, 100% 41%, 0 41%); }
  35% { clip-path: polygon(0 15%, 100% 15%, 100% 16%, 0 16%); }
  55% { clip-path: polygon(0 63%, 100% 63%, 100% 64%, 0 64%); }
  75% { clip-path: polygon(0 30%, 100% 30%, 100% 31%, 0 31%); }
}
</style> 