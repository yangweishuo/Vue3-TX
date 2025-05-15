<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, computed } from 'vue'

export default defineComponent({
  name: 'ScrollAnimation',
  props: {
    animation: {
      type: String,
      default: 'fade',
      validator: (value: string) => 
        ['fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'zoom', 'flip', 'blur'].includes(value)
    },
    delay: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 0.6
    },
    offset: {
      type: Number,
      default: 100
    },
    once: {
      type: Boolean,
      default: true
    },
    easing: {
      type: String,
      default: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
    },
    intersectionRatio: {
      type: Number,
      default: 0.2
    }
  },
  setup(props) {
    const elementRef = ref<HTMLElement | null>(null)
    const isVisible = ref(false)
    let observer: IntersectionObserver | null = null

    const animationClass = computed(() => {
      return props.animation
    })

    const animationStyle = computed(() => {
      return {
        '--duration': `${props.duration}s`,
        '--delay': `${props.delay}s`,
        '--easing': props.easing
      }
    })

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      
      if (entry.isIntersecting) {
        isVisible.value = true
        
        // 如果只触发一次，解除观察
        if (props.once && observer) {
          observer.disconnect()
        }
      } else if (!props.once) {
        isVisible.value = false
      }
    }

    onMounted(() => {
      if (!elementRef.value) return

      const options = {
        rootMargin: `0px 0px ${-props.offset}px 0px`,
        threshold: props.intersectionRatio
      }

      observer = new IntersectionObserver(handleIntersect, options)
      observer.observe(elementRef.value)
    })

    onBeforeUnmount(() => {
      if (observer) {
        observer.disconnect()
      }
    })

    return {
      elementRef,
      isVisible,
      animationClass,
      animationStyle
    }
  }
})
</script>

<template>
  <div
    ref="elementRef"
    class="scroll-animation"
    :class="[animationClass, { 'visible': isVisible }]"
    :style="animationStyle"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.scroll-animation {
  opacity: 0;
  will-change: transform, opacity;
}

.scroll-animation.visible {
  transition: transform var(--duration) var(--easing) var(--delay),
              opacity var(--duration) var(--easing) var(--delay);
  opacity: 1;
  transform: translate3d(0, 0, 0) rotate(0) scale(1);
}

/* 淡入 */
.scroll-animation.fade {
  opacity: 0;
}

/* 上滑淡入 */
.scroll-animation.slide-up {
  transform: translate3d(0, 50px, 0);
}

/* 下滑淡入 */
.scroll-animation.slide-down {
  transform: translate3d(0, -50px, 0);
}

/* 左滑淡入 */
.scroll-animation.slide-left {
  transform: translate3d(50px, 0, 0);
}

/* 右滑淡入 */
.scroll-animation.slide-right {
  transform: translate3d(-50px, 0, 0);
}

/* 缩放淡入 */
.scroll-animation.zoom {
  transform: scale(0.9);
}

/* 翻转淡入 */
.scroll-animation.flip {
  transform: perspective(800px) rotateX(25deg);
}

/* 模糊淡入 */
.scroll-animation.blur {
  filter: blur(10px);
}

.scroll-animation.blur.visible {
  filter: blur(0);
  transition: transform var(--duration) var(--easing) var(--delay),
              opacity var(--duration) var(--easing) var(--delay),
              filter var(--duration) var(--easing) var(--delay);
}
</style> 