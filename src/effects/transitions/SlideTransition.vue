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
  name: 'SlideTransition',
  props: {
    direction: {
      type: String,
      default: 'right',
      validator: (value: string) => ['up', 'right', 'down', 'left'].includes(value)
    },
    distance: {
      type: [Number, String],
      default: 100
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
    const transitionName = computed(() => `slide-${props.direction}`)
    
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
    
    const getTransformValue = (): string => {
      const distance = typeof props.distance === 'number' ? `${props.distance}px` : props.distance
      switch (props.direction) {
        case 'up': return `translateY(${distance})`
        case 'right': return `translateX(-${distance})`
        case 'down': return `translateY(-${distance})`
        case 'left': return `translateX(${distance})`
        default: return `translateX(-${distance})`
      }
    }
    
    const getInitialStyles = (): string => {
      const styles = [
        `transform: ${getTransformValue()}`,
        `transition: all ${typeof props.duration === 'number' ? props.duration + 'ms' : props.duration} ${props.easing}`
      ]
      
      if (props.fade) {
        styles.push('opacity: 0')
      }
      
      return styles.join(';')
    }
    
    const getActiveStyles = (): string => {
      const styles = [
        'transform: translateX(0) translateY(0)',
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
/* Slide transitions are handled via JavaScript hooks */
</style> 