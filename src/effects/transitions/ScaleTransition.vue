<template>
  <Transition
    :name="transitionName"
    :mode="mode"
    :appear="appear"
    :duration="computedDuration"
    @before-enter="emitBeforeEnter"
    @enter="emitEnter"
    @after-enter="emitAfterEnter"
    @enter-cancelled="emitEnterCancelled"
    @before-leave="emitBeforeLeave"
    @leave="emitLeave"
    @after-leave="emitAfterLeave"
    @leave-cancelled="emitLeaveCancelled"
  >
    <slot></slot>
  </Transition>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

type DurationType = number | { enter: number, leave: number }

export default defineComponent({
  name: 'ScaleTransition',
  props: {
    origin: {
      type: String,
      default: 'center',
      validator: (value: string) => [
        'center', 'top', 'bottom', 'left', 'right',
        'top-left', 'top-right', 'bottom-left', 'bottom-right'
      ].includes(value)
    },
    from: {
      type: Number,
      default: 0.8,
      validator: (value: number) => value >= 0
    },
    to: {
      type: Number,
      default: 1,
      validator: (value: number) => value > 0
    },
    mode: {
      type: String,
      default: 'out-in',
      validator: (value: string) => ['out-in', 'in-out', ''].includes(value)
    },
    duration: {
      type: [Number, Object] as unknown as () => DurationType,
      default: 300
    },
    appear: {
      type: Boolean,
      default: false
    },
    fade: {
      type: Boolean,
      default: true
    },
    easing: {
      type: String,
      default: 'cubic-bezier(0.25, 0.8, 0.5, 1)'
    }
  },
  emits: [
    'before-enter',
    'enter',
    'after-enter',
    'enter-cancelled',
    'before-leave',
    'leave',
    'after-leave',
    'leave-cancelled'
  ],
  setup(props, { emit }) {
    const transitionName = computed(() => `scale-${props.origin}`)
    
    const computedDuration = computed(() => {
      return props.duration
    })
    
    const emitBeforeEnter = (el: Element) => {
      el.setAttribute('style', getInitialStyles())
      emit('before-enter', el)
    }
    
    const emitEnter = (el: Element, done: () => void) => {
      el.setAttribute('style', getActiveStyles())
      emit('enter', el, done)
    }
    
    const emitAfterEnter = (el: Element) => {
      el.removeAttribute('style')
      emit('after-enter', el)
    }
    
    const emitBeforeLeave = (el: Element) => {
      el.setAttribute('style', getActiveStyles())
      emit('before-leave', el)
    }
    
    const emitLeave = (el: Element, done: () => void) => {
      el.setAttribute('style', getInitialStyles())
      emit('leave', el, done)
    }
    
    const emitAfterLeave = (el: Element) => {
      el.removeAttribute('style')
      emit('after-leave', el)
    }
    
    const emitEnterCancelled = (el: Element) => emit('enter-cancelled', el)
    const emitLeaveCancelled = (el: Element) => emit('leave-cancelled', el)
    
    const getTransformOrigin = (): string => {
      switch (props.origin) {
        case 'center': return 'center center'
        case 'top': return 'center top'
        case 'bottom': return 'center bottom'
        case 'left': return 'left center'
        case 'right': return 'right center'
        case 'top-left': return 'left top'
        case 'top-right': return 'right top'
        case 'bottom-left': return 'left bottom'
        case 'bottom-right': return 'right bottom'
        default: return 'center center'
      }
    }
    
    const getInitialStyles = (): string => {
      const styles = [
        `transform: scale(${props.from})`,
        `transform-origin: ${getTransformOrigin()}`,
        `transition: all ${typeof props.duration === 'number' ? props.duration + 'ms' : props.duration} ${props.easing}`
      ]
      
      if (props.fade) {
        styles.push('opacity: 0')
      }
      
      return styles.join(';')
    }
    
    const getActiveStyles = (): string => {
      const styles = [
        `transform: scale(${props.to})`,
        `transform-origin: ${getTransformOrigin()}`,
        `transition: all ${typeof props.duration === 'number' ? props.duration + 'ms' : props.duration} ${props.easing}`
      ]
      
      if (props.fade) {
        styles.push('opacity: 1')
      }
      
      return styles.join(';')
    }
    
    return {
      transitionName,
      computedDuration,
      emitBeforeEnter,
      emitEnter,
      emitAfterEnter,
      emitEnterCancelled,
      emitBeforeLeave,
      emitLeave,
      emitAfterLeave,
      emitLeaveCancelled
    }
  }
})
</script>

<style scoped>
/* Scale transitions are handled via JavaScript hooks */
</style> 