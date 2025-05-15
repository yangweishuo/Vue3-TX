<template>
  <div>
    <div 
      v-if="!disabled" 
      class="mouse-follower" 
      :class="[
        `type-${type}`, 
        { 'delay-effect': delayEffect }
      ]"
      :style="{ 
        width: `${size}px`, 
        height: `${size}px`,
        backgroundColor: color,
        borderColor: borderColor,
        borderWidth: `${borderWidth}px`,
        opacity: opacity,
        filter: `blur(${blur}px)`,
        transitionDuration: `${delay}ms`,
        transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
        mixBlendMode: blendMode
      }"
    ></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, reactive } from 'vue'

export default defineComponent({
  name: 'MouseFollower',
  props: {
    type: {
      type: String,
      default: 'dot',
      validator: (value: string) => ['dot', 'ring', 'spotlight', 'glow', 'trail'].includes(value)
    },
    size: {
      type: Number,
      default: 30
    },
    color: {
      type: String,
      default: 'rgba(52, 152, 219, 0.6)'
    },
    borderColor: {
      type: String,
      default: 'rgba(52, 152, 219, 0.8)'
    },
    borderWidth: {
      type: Number,
      default: 1
    },
    delay: {
      type: Number,
      default: 100
    },
    delayEffect: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    opacity: {
      type: Number,
      default: 0.7
    },
    blur: {
      type: Number,
      default: 0
    },
    scale: {
      type: Number,
      default: 1
    },
    blendMode: {
      type: String,
      default: 'normal'
    }
  },
  setup() {
    const position = reactive({ x: -100, y: -100 }) // 初始位置在视口外
    const scale = ref(1)
    
    // 鼠标移动处理函数
    const handleMouseMove = (event: MouseEvent) => {
      position.x = event.clientX
      position.y = event.clientY
    }
    
    // 鼠标按下时效果
    const handleMouseDown = () => {
      scale.value = 0.8
    }
    
    // 鼠标释放时效果
    const handleMouseUp = () => {
      scale.value = 1
    }
    
    onMounted(() => {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mousedown', handleMouseDown)
      window.addEventListener('mouseup', handleMouseUp)
    })
    
    onBeforeUnmount(() => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    })
    
    return {
      position,
      scale
    }
  }
})
</script>

<style scoped>
.mouse-follower {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  transform-origin: center center;
  will-change: transform;
  transition-property: transform, width, height, background-color, border-color, opacity;
  transition-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
}

.delay-effect {
  transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
}

.type-dot {
  border-radius: 50%;
}

.type-ring {
  border-radius: 50%;
  background-color: transparent !important;
}

.type-spotlight {
  border-radius: 50%;
  box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0.3);
  mix-blend-mode: overlay;
}

.type-glow {
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 70%);
  mix-blend-mode: overlay;
}

.type-trail {
  border-radius: 50%;
  transform-origin: center center;
  transition-duration: 800ms !important;
}
</style> 