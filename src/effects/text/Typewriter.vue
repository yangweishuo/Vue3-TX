<template>
  <div class="typewriter" :style="customStyle">
    <span class="typewriter__text">{{ displayText }}</span>
    <span 
      v-if="showCursor" 
      class="typewriter__cursor"
      :class="{ 'typewriter__cursor--blink': cursorBlink }"
    >{{ cursor }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect, onMounted, onUnmounted, watch, nextTick, shallowRef } from 'vue'
import type { TypewriterProps } from '../../types'

export default defineComponent({
  name: 'Typewriter',
  props: {
    text: {
      type: String,
      required: true
    },
    startDelay: {
      type: Number,
      default: 0
    },
    speed: {
      type: Number,
      default: 100
    },
    cursor: {
      type: String,
      default: '|'
    },
    showCursor: {
      type: Boolean,
      default: true
    },
    cursorBlink: {
      type: Boolean,
      default: true
    },
    loop: {
      type: Boolean,
      default: false
    },
    loopDelay: {
      type: Number,
      default: 2000
    },
    deleteSpeed: {
      type: Number,
      default: 50
    },
    color: {
      type: String,
      default: 'inherit'
    },
    fontSize: {
      type: [String, Number],
      default: 'inherit'
    },
    fontWeight: {
      type: [String, Number],
      default: 'inherit'
    },
    fontFamily: {
      type: String,
      default: 'inherit'
    }
  } as const,
  emits: ['type-start', 'type-end', 'type-delete-start', 'type-delete-end', 'type-char'],
  setup(props, { emit }) {
    const displayText = shallowRef('')
    const isTyping = ref(false)
    const isDeleting = ref(false)
    const charIndex = ref(0)
    let timeoutId: number | null = null
    let isMounted = false
    
    const customStyle = computed(() => {
      const styles: Record<string, string> = {
        color: props.color
      }
      
      if (props.fontSize !== 'inherit') {
        styles.fontSize = typeof props.fontSize === 'number' 
          ? `${props.fontSize}px` 
          : props.fontSize
      }
      
      if (props.fontWeight !== 'inherit') {
        styles.fontWeight = props.fontWeight.toString()
      }
      
      if (props.fontFamily !== 'inherit') {
        styles.fontFamily = props.fontFamily
      }
      
      return styles
    })
    
    const typeText = () => {
      if (!isMounted) return
      
      if (charIndex.value === 0 && !isTyping.value) {
        emit('type-start')
        isTyping.value = true
      }
      
      if (charIndex.value < props.text.length) {
        displayText.value = props.text.substring(0, charIndex.value + 1)
        charIndex.value++
        emit('type-char', displayText.value)
        
        timeoutId = window.setTimeout(typeText, props.speed)
      } else {
        isTyping.value = false
        emit('type-end')
        
        if (props.loop) {
          timeoutId = window.setTimeout(startDelete, props.loopDelay)
        }
      }
    }
    
    const startDelete = () => {
      if (!isMounted) return
      
      isDeleting.value = true
      emit('type-delete-start')
      deleteText()
    }
    
    const deleteText = () => {
      if (!isMounted) return
      
      if (charIndex.value > 0) {
        displayText.value = props.text.substring(0, charIndex.value - 1)
        charIndex.value--
        
        timeoutId = window.setTimeout(deleteText, props.deleteSpeed)
      } else {
        isDeleting.value = false
        emit('type-delete-end')
        
        timeoutId = window.setTimeout(typeText, props.startDelay)
      }
    }
    
    const startTyping = () => {
      if (!isMounted) return
      
      clearAllTimeouts()
      charIndex.value = 0
      displayText.value = ''
      
      if (props.startDelay > 0) {
        timeoutId = window.setTimeout(typeText, props.startDelay)
      } else {
        typeText()
      }
    }
    
    const clearAllTimeouts = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
    }
    
    const reset = () => {
      clearAllTimeouts()
      charIndex.value = 0
      displayText.value = ''
      isTyping.value = false
      isDeleting.value = false
    }
    
    watch(() => props.text, () => {
      reset()
      nextTick(() => {
        startTyping()
      })
    })
    
    onMounted(() => {
      isMounted = true
      nextTick(() => {
        startTyping()
      })
    })
    
    onUnmounted(() => {
      isMounted = false
      clearAllTimeouts()
    })
    
    return {
      displayText,
      isTyping,
      isDeleting,
      customStyle
    }
  }
})
</script>

<style scoped>
.typewriter {
  display: inline-block;
}

.typewriter__cursor {
  display: inline-block;
}

.typewriter__cursor--blink {
  animation: cursor-blink 1s step-end infinite;
}

@keyframes cursor-blink {
  from, to { opacity: 1; }
  50% { opacity: 0; }
}
</style> 