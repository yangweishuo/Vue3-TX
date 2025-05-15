<template>
  <div 
    class="float-hover"
    :style="containerStyle"
    ref="container"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div 
      class="float-hover__content"
      :style="contentStyle"
      ref="content"
    >
      <slot></slot>
    </div>
    
    <div 
      v-if="glare && isHovering" 
      class="float-hover__glare"
      :style="glareStyle"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, onMounted, watch } from 'vue'

export default defineComponent({
  name: 'FloatHover',
  props: {
    perspective: {
      type: Number,
      default: 1000
    },
    tiltAmount: {
      type: Number,
      default: 20,
      validator: (value: number) => value >= 0
    },
    scale: {
      type: Number,
      default: 1.05,
      validator: (value: number) => value > 0
    },
    speed: {
      type: Number,
      default: 400,
      validator: (value: number) => value > 0
    },
    shadow: {
      type: Boolean,
      default: true
    },
    shadowColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.2)'
    },
    glare: {
      type: Boolean,
      default: false
    },
    glareSize: {
      type: Number,
      default: 100,
      validator: (value: number) => value > 0 && value <= 100
    },
    glareColor: {
      type: String,
      default: 'rgba(255, 255, 255, 0.4)'
    },
    reset: {
      type: Boolean,
      default: true
    },
    borderRadius: {
      type: [String, Number],
      default: '8px'
    }
  },
  setup(props, { emit }) {
    const container = ref<HTMLElement | null>(null)
    const content = ref<HTMLElement | null>(null)
    const isHovering = ref(false)
    
    const transforms = reactive({
      rotateX: 0,
      rotateY: 0
    })
    
    const glarePosition = reactive({
      x: 0,
      y: 0
    })
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!container.value || !isHovering.value) return
      
      const rect = container.value.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      
      // Calculate mouse position relative to the container
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      
      // Calculate rotation values (reversed to create "following" effect)
      const tiltX = ((mouseY / height) * 2 - 1) * -props.tiltAmount
      const tiltY = ((mouseX / width) * 2 - 1) * props.tiltAmount
      
      // Update transforms with smooth transition
      transforms.rotateX = tiltX
      transforms.rotateY = tiltY
      
      // Update glare position
      if (props.glare) {
        glarePosition.x = (mouseX / width) * 100
        glarePosition.y = (mouseY / height) * 100
      }
      
      emit('move', { tiltX, tiltY, mouseX, mouseY })
    }
    
    const handleMouseEnter = () => {
      isHovering.value = true
      emit('enter')
    }
    
    const handleMouseLeave = () => {
      isHovering.value = false
      
      if (props.reset) {
        // Reset transforms with smooth transition
        transforms.rotateX = 0
        transforms.rotateY = 0
      }
      
      emit('leave')
    }
    
    const containerStyle = computed(() => {
      const borderRadius = typeof props.borderRadius === 'number' 
        ? `${props.borderRadius}px` 
        : props.borderRadius
        
      return {
        perspective: `${props.perspective}px`,
        borderRadius
      }
    })
    
    const contentStyle = computed(() => {
      const styles: Record<string, string> = {
        transform: `
          rotateX(${transforms.rotateX}deg) 
          rotateY(${transforms.rotateY}deg)
          ${isHovering.value ? `scale3d(${props.scale}, ${props.scale}, ${props.scale})` : 'scale3d(1, 1, 1)'}
        `,
        transition: `transform ${props.speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`
      }
      
      if (props.shadow && isHovering.value) {
        const shadowDistance = Math.max(props.tiltAmount / 20, 1)
        styles.boxShadow = `
          ${transforms.rotateY / 4 * -1}px 
          ${transforms.rotateX / 4}px 
          ${shadowDistance * 10}px 
          ${props.shadowColor}
        `
      }
      
      return styles
    })
    
    const glareStyle = computed(() => {
      return {
        background: `radial-gradient(
          circle at ${glarePosition.x}% ${glarePosition.y}%, 
          ${props.glareColor} 0%, 
          transparent ${props.glareSize}%
        )`
      }
    })
    
    return {
      container,
      content,
      isHovering,
      transforms,
      glarePosition,
      containerStyle,
      contentStyle,
      glareStyle,
      handleMouseMove,
      handleMouseEnter,
      handleMouseLeave
    }
  }
})
</script>

<style scoped>
.float-hover {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: perspective(1000px);
}

.float-hover__content {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  z-index: 1;
}

.float-hover__glare {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 2;
}
</style> 