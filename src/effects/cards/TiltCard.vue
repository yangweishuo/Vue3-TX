<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'TiltCard',
  props: {
    perspective: {
      type: Number,
      default: 1000
    },
    maxTilt: {
      type: Number,
      default: 15
    },
    scale: {
      type: Number,
      default: 1.05
    },
    speed: {
      type: Number,
      default: 300
    },
    easing: {
      type: String,
      default: 'cubic-bezier(.03,.98,.52,.99)'
    },
    disableAxis: {
      type: String,
      default: null,
      validator: (value: string | null) => ['x', 'y', null].includes(value)
    },
    glare: {
      type: Boolean,
      default: false
    },
    maxGlare: {
      type: Number,
      default: 0.5
    },
    glareColor: {
      type: String,
      default: 'rgba(255, 255, 255, 0.75)'
    },
    reset: {
      type: Boolean,
      default: true
    },
    transitionExit: {
      type: Boolean,
      default: true
    },
    gyroscope: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const cardRef = ref<HTMLElement | null>(null)
    const glareElementRef = ref<HTMLElement | null>(null)
    let width = 0
    let height = 0
    let left = 0
    let top = 0
    let transitionTimeout: number | null = null
    let gyroscopeActive = false
    let isActive = false

    const initTiltEffect = () => {
      if (!cardRef.value) return
      
      const rect = cardRef.value.getBoundingClientRect()
      width = rect.width
      height = rect.height
      left = rect.left
      top = rect.top
    }

    const resetCardStyles = () => {
      if (!cardRef.value) return
      
      cardRef.value.style.transform = `perspective(${props.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
      
      if (props.glare && glareElementRef.value) {
        glareElementRef.value.style.transform = 'rotate(180deg) translate(-50%, -50%)'
        glareElementRef.value.style.opacity = '0'
      }
    }

    const updateTilt = (event: MouseEvent | TouchEvent) => {
      if (!cardRef.value || !isActive) return
      
      const isTouchEvent = window.TouchEvent && event instanceof TouchEvent
      
      // 获取鼠标或触摸位置
      const eventX = isTouchEvent ? (event as TouchEvent).touches[0].clientX : (event as MouseEvent).clientX
      const eventY = isTouchEvent ? (event as TouchEvent).touches[0].clientY : (event as MouseEvent).clientY
      
      // 计算鼠标在卡片上的相对位置 (0 - 1)
      const relX = (eventX - left) / width
      const relY = (eventY - top) / height
      
      // 计算倾斜角度
      const tiltX = props.disableAxis === 'x' ? 0 : (relY * props.maxTilt * 2) - props.maxTilt
      const tiltY = props.disableAxis === 'y' ? 0 : (relX * props.maxTilt * 2) - props.maxTilt
      
      // 应用变换
      cardRef.value.style.transition = `transform ${props.speed}ms ${props.easing}`
      cardRef.value.style.transform = `perspective(${props.perspective}px) rotateX(${-tiltX}deg) rotateY(${tiltY}deg) scale3d(${props.scale}, ${props.scale}, ${props.scale})`
      
      // 发出事件
      emit('tilt', { tiltX, tiltY, percentX: relX * 100, percentY: relY * 100 })
      
      // 更新光晕效果
      if (props.glare && glareElementRef.value) {
        // 光晕位置取决于鼠标位置
        const angle = 180 * Math.atan2(relY - 0.5, relX - 0.5) / Math.PI
        const opacity = Math.min(props.maxGlare, Math.max(0, relX * relY * props.maxGlare))
        
        glareElementRef.value.style.transform = `rotate(${angle}deg) translate(-50%, -50%)`
        glareElementRef.value.style.opacity = opacity.toString()
      }
    }

    const handleGyroscope = (event: DeviceOrientationEvent) => {
      if (!cardRef.value || !gyroscopeActive || !props.gyroscope) return
      
      const beta = event.beta ? event.beta : 0 // Y 轴旋转 (-180 到 180)
      const gamma = event.gamma ? event.gamma : 0 // X 轴旋转 (-90 到 90)
      
      // 将陀螺仪数据转换为倾斜限制范围
      const tiltX = props.disableAxis === 'x' ? 0 : (beta - 90) * (props.maxTilt / 90)
      const tiltY = props.disableAxis === 'y' ? 0 : gamma * (props.maxTilt / 90)
      
      // 应用变换
      cardRef.value.style.transition = `transform ${props.speed}ms ${props.easing}`
      cardRef.value.style.transform = `perspective(${props.perspective}px) rotateX(${-tiltX}deg) rotateY(${tiltY}deg) scale3d(${props.scale}, ${props.scale}, ${props.scale})`
      
      // 发出事件
      emit('tilt', { tiltX, tiltY, percentX: 0, percentY: 0 })
    }

    const handleMouseEnter = () => {
      isActive = true
      initTiltEffect()
      emit('enter')
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (transitionTimeout) {
        clearTimeout(transitionTimeout)
        transitionTimeout = null
      }
      
      updateTilt(event)
    }
    
    const handleTouchMove = (event: TouchEvent) => {
      if (transitionTimeout) {
        clearTimeout(transitionTimeout)
        transitionTimeout = null
      }
      
      updateTilt(event)
    }

    const handleMouseLeave = () => {
      isActive = false
      
      if (props.reset) {
        if (props.transitionExit) {
          transitionTimeout = window.setTimeout(() => {
            resetCardStyles()
          }, props.speed) as unknown as number
        } else {
          resetCardStyles()
        }
      }
      
      emit('leave')
    }

    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      handleGyroscope(event)
    }

    const enableGyroscope = () => {
      if (window.DeviceOrientationEvent && props.gyroscope) {
        gyroscopeActive = true
        window.addEventListener('deviceorientation', handleDeviceOrientation)
      }
    }

    const disableGyroscope = () => {
      gyroscopeActive = false
      
      if (window.DeviceOrientationEvent) {
        window.removeEventListener('deviceorientation', handleDeviceOrientation)
      }
    }

    onMounted(() => {
      if (props.gyroscope) {
        enableGyroscope()
      }
    })

    onBeforeUnmount(() => {
      if (transitionTimeout) {
        clearTimeout(transitionTimeout)
      }
      
      disableGyroscope()
    })

    return {
      cardRef,
      glareElementRef,
      handleMouseEnter,
      handleMouseMove,
      handleTouchMove,
      handleMouseLeave
    }
  }
})
</script>

<template>
  <div 
    ref="cardRef" 
    class="tilt-card"
    @mouseenter="handleMouseEnter"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    @touchstart="handleMouseEnter"
    @touchmove="handleTouchMove"
    @touchend="handleMouseLeave"
  >
    <div v-if="glare" class="tilt-card-glare-wrapper">
      <div ref="glareElementRef" class="tilt-card-glare" :style="{ 'background': `linear-gradient(0deg, rgba(255,255,255,0) 0%, ${glareColor} 100%)` }"></div>
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>
.tilt-card {
  position: relative;
  transform-style: preserve-3d;
  transform: perspective(1000px);
  width: 100%;
  height: 100%;
  transition: transform 0.1s ease;
  will-change: transform;
}

.tilt-card-glare-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
  border-radius: inherit;
  transform-style: preserve-3d;
  pointer-events: none;
}

.tilt-card-glare {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: 0% 0%;
  width: 200%;
  height: 200%;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.tilt-card > :deep(*) {
  transform: translateZ(30px);
}
</style> 