<template>
  <div 
    class="scroll-progress"
    :class="{
      [`scroll-progress--${position}`]: true,
      'scroll-progress--fixed': fixed
    }"
    :style="containerStyle"
  >
    <div 
      class="scroll-progress__bar" 
      :style="progressStyle"
    ></div>
    <slot 
      v-if="showValue" 
      :progress="progressValue"
    >
      <div class="scroll-progress__value">{{ formattedProgress }}</div>
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, computed, watch } from 'vue'

export default defineComponent({
  name: 'ScrollProgress',
  props: {
    color: {
      type: String,
      default: '#3498db'
    },
    backgroundColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.1)'
    },
    height: {
      type: [String, Number],
      default: '4px'
    },
    width: {
      type: [String, Number],
      default: '100%'
    },
    position: {
      type: String,
      default: 'top',
      validator: (value: string) => ['top', 'bottom', 'left', 'right'].includes(value)
    },
    fixed: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 100
    },
    showValue: {
      type: Boolean,
      default: false
    },
    valueFormat: {
      type: Function,
      default: (value: number) => `${Math.round(value * 100)}%`
    },
    target: {
      type: String,
      default: 'window'
    },
    offset: {
      type: [String, Number],
      default: 0
    }
  },
  emits: ['update:progress', 'start', 'complete'],
  setup(props, { emit }) {
    const progressValue = ref(0)
    const isComplete = ref(false)
    const targetElement = ref<HTMLElement | Window | null>(null)
    
    const isHorizontal = computed(() => {
      return props.position === 'left' || props.position === 'right'
    })
    
    const containerStyle = computed(() => {
      const styles: Record<string, string> = {
        backgroundColor: props.backgroundColor,
        zIndex: props.zIndex.toString()
      }
      
      if (isHorizontal.value) {
        styles.width = typeof props.height === 'number' 
          ? `${props.height}px` 
          : props.height
          
        styles.height = typeof props.width === 'number' 
          ? `${props.width}px` 
          : props.width
      } else {
        styles.height = typeof props.height === 'number' 
          ? `${props.height}px` 
          : props.height
          
        styles.width = typeof props.width === 'number' 
          ? `${props.width}px` 
          : props.width
      }
      
      const offsetValue = typeof props.offset === 'number' 
        ? `${props.offset}px` 
        : props.offset
        
      if (props.position === 'top') {
        styles.top = offsetValue
      } else if (props.position === 'bottom') {
        styles.bottom = offsetValue
      } else if (props.position === 'left') {
        styles.left = offsetValue
      } else if (props.position === 'right') {
        styles.right = offsetValue
      }
      
      return styles
    })
    
    const progressStyle = computed(() => {
      const styles: Record<string, string> = {
        backgroundColor: props.color
      }
      
      if (isHorizontal.value) {
        styles.height = `${progressValue.value * 100}%`
        styles.width = '100%'
      } else {
        styles.width = `${progressValue.value * 100}%`
        styles.height = '100%'
      }
      
      return styles
    })
    
    const formattedProgress = computed(() => {
      return props.valueFormat(progressValue.value)
    })
    
    const calculateProgress = () => {
      if (!targetElement.value) return
      
      let scrollHeight = 0
      let scrollTop = 0
      let clientHeight = 0
      
      if (targetElement.value === window) {
        scrollHeight = document.documentElement.scrollHeight - window.innerHeight
        scrollTop = window.scrollY
        clientHeight = window.innerHeight
      } else {
        const element = targetElement.value as HTMLElement
        scrollHeight = element.scrollHeight - element.clientHeight
        scrollTop = element.scrollTop
        clientHeight = element.clientHeight
      }
      
      // 防止除以零
      if (scrollHeight <= 0) {
        progressValue.value = 1
        return
      }
      
      const newProgress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1)
      progressValue.value = newProgress
      
      // 触发进度更新事件
      emit('update:progress', newProgress)
      
      // 检查是否完成滚动
      if (newProgress >= 0.99 && !isComplete.value) {
        isComplete.value = true
        emit('complete')
      } else if (newProgress < 0.99 && isComplete.value) {
        isComplete.value = false
      }
      
      // 检查是否开始滚动
      if (newProgress > 0 && progressValue.value === 0) {
        emit('start')
      }
    }
    
    const handleScroll = () => {
      requestAnimationFrame(calculateProgress)
    }
    
    const initTargetElement = () => {
      if (props.target === 'window') {
        targetElement.value = window
      } else {
        targetElement.value = document.querySelector(props.target) as HTMLElement
      }
      
      if (targetElement.value) {
        targetElement.value.addEventListener('scroll', handleScroll, { passive: true })
        window.addEventListener('resize', calculateProgress, { passive: true })
        
        // 初始计算一次
        calculateProgress()
      }
    }
    
    onMounted(() => {
      initTargetElement()
    })
    
    onUnmounted(() => {
      if (targetElement.value) {
        targetElement.value.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', calculateProgress)
      }
    })
    
    // 监听 target 属性变化
    watch(() => props.target, () => {
      if (targetElement.value) {
        targetElement.value.removeEventListener('scroll', handleScroll)
      }
      
      initTargetElement()
    })
    
    return {
      progressValue,
      containerStyle,
      progressStyle,
      formattedProgress
    }
  }
})
</script>

<style scoped>
.scroll-progress {
  position: relative;
  overflow: hidden;
}

.scroll-progress--fixed {
  position: fixed;
  left: 0;
  right: 0;
}

.scroll-progress--top {
  top: 0;
}

.scroll-progress--bottom {
  bottom: 0;
}

.scroll-progress--left {
  left: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
}

.scroll-progress--right {
  right: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
}

.scroll-progress__bar {
  position: absolute;
  transition: width 0.1s, height 0.1s;
  will-change: width, height;
}

.scroll-progress--left .scroll-progress__bar,
.scroll-progress--right .scroll-progress__bar {
  bottom: 0;
  width: 100%;
}

.scroll-progress--top .scroll-progress__bar,
.scroll-progress--bottom .scroll-progress__bar {
  left: 0;
  height: 100%;
}

.scroll-progress__value {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
  z-index: 1;
}
</style> 