<template>
  <div 
    ref="container" 
    class="scroll-parallax"
    :style="containerStyle"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, computed } from 'vue'

export default defineComponent({
  name: 'ScrollParallax',
  props: {
    speed: {
      type: Number,
      default: 0.5,
      validator: (value: number) => value >= -5 && value <= 5
    },
    direction: {
      type: String,
      default: 'vertical',
      validator: (value: string) => ['vertical', 'horizontal'].includes(value)
    },
    easing: {
      type: Number,
      default: 1,
      validator: (value: number) => value > 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    reverse: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const container = ref<HTMLElement | null>(null)
    const parallaxOffset = ref(0)
    let frameId: number | null = null
    let lastScrollY = 0
    let initialPosition = 0
    
    const containerStyle = computed(() => {
      if (props.disabled) return {}
      
      const transform = props.direction === 'vertical' 
        ? `translateY(${parallaxOffset.value}px)` 
        : `translateX(${parallaxOffset.value}px)`
        
      return {
        transform,
        transition: `transform ${props.easing / 16}s ease-out`,
        willChange: 'transform'
      }
    })
    
    const calculateParallax = () => {
      if (!container.value || props.disabled) return
      
      const rect = container.value.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // 检查元素是否在视口内
      if (rect.bottom < 0 || rect.top > windowHeight) {
        return
      }
      
      // 计算元素在视口中的位置比例 (-1 到 1 的范围)
      // 元素顶部在视口顶部为 -1，元素底部在视口底部为 1
      const viewportMiddle = windowHeight / 2
      const elementMiddle = rect.top + rect.height / 2
      const positionRatio = (elementMiddle - viewportMiddle) / (windowHeight / 2)
      
      // 计算视差位移
      const speedFactor = props.reverse ? -props.speed : props.speed
      const offset = positionRatio * speedFactor * 100 // 乘以一个系数以放大效果
      
      // 应用视差位移
      parallaxOffset.value = offset
    }
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // 只有滚动位置发生了变化才重新计算
      if (lastScrollY !== currentScrollY) {
        lastScrollY = currentScrollY
        frameId = requestAnimationFrame(calculateParallax)
      }
    }
    
    onMounted(() => {
      if (!props.disabled) {
        // 记录初始位置
        if (container.value) {
          const style = window.getComputedStyle(container.value)
          initialPosition = props.direction === 'vertical'
            ? parseFloat(style.top)
            : parseFloat(style.left)
        }
        
        // 初始计算一次
        calculateParallax()
        
        // 添加滚动事件监听器
        window.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', calculateParallax, { passive: true })
      }
    })
    
    onUnmounted(() => {
      if (frameId) {
        cancelAnimationFrame(frameId)
      }
      
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', calculateParallax)
    })
    
    return {
      container,
      containerStyle
    }
  }
})
</script>

<style scoped>
.scroll-parallax {
  position: relative;
  will-change: transform;
}
</style> 