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
  name: 'FadeTransition',
  props: {
    name: {
      type: String,
      default: 'fade'
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
    const transitionName = computed(() => props.name)
    
    const computedDuration = computed(() => {
      return props.duration
    })
    
    // Event handlers to pass through events to parent
    const emitBeforeEnter = (el: Element) => emit('before-enter', el)
    const emitEnter = (el: Element, done: () => void) => emit('enter', el, done)
    const emitAfterEnter = (el: Element) => emit('after-enter', el)
    const emitEnterCancelled = (el: Element) => emit('enter-cancelled', el)
    const emitBeforeLeave = (el: Element) => emit('before-leave', el)
    const emitLeave = (el: Element, done: () => void) => emit('leave', el, done)
    const emitAfterLeave = (el: Element) => emit('after-leave', el)
    const emitLeaveCancelled = (el: Element) => emit('leave-cancelled', el)
    
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
/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Fade through black transition */
.fade-through-enter-active,
.fade-through-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-through-enter-from,
.fade-through-leave-to {
  opacity: 0;
  filter: brightness(0);
}

/* Fade up transition */
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-up-enter-from,
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Fade down transition */
.fade-down-enter-active,
.fade-down-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-down-enter-from,
.fade-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Fade left transition */
.fade-left-enter-active,
.fade-left-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-left-enter-from,
.fade-left-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* Fade right transition */
.fade-right-enter-active,
.fade-right-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-right-enter-from,
.fade-right-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style> 