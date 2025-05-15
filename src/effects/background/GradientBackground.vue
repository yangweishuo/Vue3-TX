<template>
  <div 
    class="gradient-background" 
    :style="{ 
      background: gradientStyle, 
      opacity: opacity,
      animationDuration: `${animationDuration}s`,
      animationPlayState: paused ? 'paused' : 'running'
    }"
  ></div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'GradientBackground',
  props: {
    colors: {
      type: Array as () => string[],
      default: () => ['#4158D0', '#C850C0', '#FFCC70']
    },
    angle: {
      type: Number,
      default: 45
    },
    animated: {
      type: Boolean,
      default: true
    },
    paused: {
      type: Boolean,
      default: false
    },
    animationDuration: {
      type: Number,
      default: 15
    },
    opacity: {
      type: Number,
      default: 1
    }
  },
  setup(props) {
    const angle = ref(props.angle)

    // 计算渐变样式
    const gradientStyle = computed(() => {
      if (props.animated) {
        return `linear-gradient(${angle.value}deg, ${props.colors.join(', ')})`
      } else {
        return `linear-gradient(${props.angle}deg, ${props.colors.join(', ')})`
      }
    })

    // 动画函数
    let animationFrame: number | null = null
    let startTime = 0
    
    const animateGradient = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      
      // 每10秒旋转一周
      angle.value = (props.angle + (elapsed / 10000) * 360) % 360
      
      animationFrame = requestAnimationFrame(animateGradient)
    }
    
    onMounted(() => {
      if (props.animated && !props.paused) {
        animationFrame = requestAnimationFrame(animateGradient)
      }
    })
    
    onBeforeUnmount(() => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    })

    return {
      gradientStyle
    }
  }
})
</script>

<style scoped>
.gradient-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background-size: 400% 400%;
  animation-name: gradientAnimation;
  animation-timing-function: ease;
  animation-iteration-count: infinite;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style> 