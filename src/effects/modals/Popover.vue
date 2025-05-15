<template>
  <div class="popover-container" ref="container">
    <div 
      ref="reference" 
      class="popover-reference" 
      @click="handleReferenceClick"
      @mouseenter="handleReferenceMouseEnter"
      @mouseleave="handleReferenceMouseLeave"
    >
      <slot></slot>
    </div>
    
    <Teleport to="body">
      <Transition name="popover">
        <div 
          v-if="visible" 
          ref="popover"
          class="popover" 
          :class="[
            `popover--${placement}`,
            { 'popover--with-arrow': arrow }
          ]"
          :style="popoverStyle"
          @mouseenter="handlePopoverMouseEnter"
          @mouseleave="handlePopoverMouseLeave"
        >
          <div class="popover__content">
            <div v-if="title" class="popover__title">{{ title }}</div>
            <div class="popover__body">
              <slot name="content">{{ content }}</slot>
            </div>
          </div>
          <div v-if="arrow" class="popover__arrow" :style="arrowStyle"></div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'

type Placement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'

export default defineComponent({
  name: 'Popover',
  props: {
    trigger: {
      type: String,
      default: 'click',
      validator: (value: string) => ['click', 'hover', 'manual'].includes(value)
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    placement: {
      type: String as () => Placement,
      default: 'top',
      validator: (value: string) => [
        'top', 'top-start', 'top-end',
        'bottom', 'bottom-start', 'bottom-end',
        'left', 'left-start', 'left-end',
        'right', 'right-start', 'right-end'
      ].includes(value)
    },
    width: {
      type: [String, Number],
      default: 200
    },
    modelValue: {
      type: Boolean,
      default: undefined
    },
    arrow: {
      type: Boolean,
      default: true
    },
    arrowSize: {
      type: Number,
      default: 8
    },
    offset: {
      type: Number,
      default: 12
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    hideOnClickOutside: {
      type: Boolean,
      default: true
    },
    hoverDelay: {
      type: Number,
      default: 200
    },
    transition: {
      type: String,
      default: 'popover'
    },
    showDelay: {
      type: Number,
      default: 0
    },
    hideDelay: {
      type: Number,
      default: 200
    },
    popoverClass: {
      type: [String, Object, Array],
      default: ''
    },
    zIndex: {
      type: Number,
      default: 2000
    }
  },
  emits: ['update:modelValue', 'show', 'hide'],
  setup(props, { emit }) {
    const container = ref<HTMLElement | null>(null)
    const reference = ref<HTMLElement | null>(null)
    const popover = ref<HTMLElement | null>(null)
    const visible = ref(false)
    const position = ref({ top: '0', left: '0' })
    const arrowPosition = ref({ top: '0', left: '0' })
    
    let hoverTimer: number | null = null
    let showTimer: number | null = null
    let hideTimer: number | null = null
    
    const clearTimers = () => {
      if (hoverTimer) {
        clearTimeout(hoverTimer)
        hoverTimer = null
      }
      
      if (showTimer) {
        clearTimeout(showTimer)
        showTimer = null
      }
      
      if (hideTimer) {
        clearTimeout(hideTimer)
        hideTimer = null
      }
    }
    
    const setPosition = () => {
      if (!reference.value || !popover.value) return
      
      const referenceRect = reference.value.getBoundingClientRect()
      const popoverRect = popover.value.getBoundingClientRect()
      
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      
      let top = 0
      let left = 0
      
      const totalOffset = props.offset + (props.arrow ? props.arrowSize : 0)
      
      switch (props.placement) {
        case 'top':
          top = referenceRect.top - popoverRect.height - totalOffset + scrollTop
          left = referenceRect.left + (referenceRect.width / 2) - (popoverRect.width / 2) + scrollLeft
          break
        case 'top-start':
          top = referenceRect.top - popoverRect.height - totalOffset + scrollTop
          left = referenceRect.left + scrollLeft
          break
        case 'top-end':
          top = referenceRect.top - popoverRect.height - totalOffset + scrollTop
          left = referenceRect.right - popoverRect.width + scrollLeft
          break
        case 'bottom':
          top = referenceRect.bottom + totalOffset + scrollTop
          left = referenceRect.left + (referenceRect.width / 2) - (popoverRect.width / 2) + scrollLeft
          break
        case 'bottom-start':
          top = referenceRect.bottom + totalOffset + scrollTop
          left = referenceRect.left + scrollLeft
          break
        case 'bottom-end':
          top = referenceRect.bottom + totalOffset + scrollTop
          left = referenceRect.right - popoverRect.width + scrollLeft
          break
        case 'left':
          top = referenceRect.top + (referenceRect.height / 2) - (popoverRect.height / 2) + scrollTop
          left = referenceRect.left - popoverRect.width - totalOffset + scrollLeft
          break
        case 'left-start':
          top = referenceRect.top + scrollTop
          left = referenceRect.left - popoverRect.width - totalOffset + scrollLeft
          break
        case 'left-end':
          top = referenceRect.bottom - popoverRect.height + scrollTop
          left = referenceRect.left - popoverRect.width - totalOffset + scrollLeft
          break
        case 'right':
          top = referenceRect.top + (referenceRect.height / 2) - (popoverRect.height / 2) + scrollTop
          left = referenceRect.right + totalOffset + scrollLeft
          break
        case 'right-start':
          top = referenceRect.top + scrollTop
          left = referenceRect.right + totalOffset + scrollLeft
          break
        case 'right-end':
          top = referenceRect.bottom - popoverRect.height + scrollTop
          left = referenceRect.right + totalOffset + scrollLeft
          break
      }
      
      position.value = {
        top: `${top}px`,
        left: `${left}px`
      }
      
      // Calculate arrow position
      if (props.arrow) {
        if (props.placement.startsWith('top')) {
          arrowPosition.value = {
            bottom: `-${props.arrowSize - 1}px`,
            left: '50%',
            transform: 'translateX(-50%) rotate(45deg)'
          }
        } else if (props.placement.startsWith('bottom')) {
          arrowPosition.value = {
            top: `-${props.arrowSize - 1}px`,
            left: '50%',
            transform: 'translateX(-50%) rotate(45deg)'
          }
        } else if (props.placement.startsWith('left')) {
          arrowPosition.value = {
            right: `-${props.arrowSize - 1}px`,
            top: '50%',
            transform: 'translateY(-50%) rotate(45deg)'
          }
        } else if (props.placement.startsWith('right')) {
          arrowPosition.value = {
            left: `-${props.arrowSize - 1}px`,
            top: '50%',
            transform: 'translateY(-50%) rotate(45deg)'
          }
        }
      }
    }
    
    const popoverStyle = computed(() => {
      const styles: Record<string, string> = {
        ...position.value,
        zIndex: props.zIndex.toString()
      }
      
      if (typeof props.width === 'number') {
        styles.width = `${props.width}px`
      } else {
        styles.width = props.width
      }
      
      return styles
    })
    
    const arrowStyle = computed(() => {
      return {
        ...arrowPosition.value,
        width: `${props.arrowSize * 2}px`,
        height: `${props.arrowSize * 2}px`
      }
    })
    
    const show = () => {
      clearTimers()
      
      showTimer = window.setTimeout(() => {
        visible.value = true
        nextTick(() => {
          setPosition()
          emit('show')
          emit('update:modelValue', true)
        })
      }, props.showDelay)
    }
    
    const hide = () => {
      clearTimers()
      
      hideTimer = window.setTimeout(() => {
        visible.value = false
        emit('hide')
        emit('update:modelValue', false)
      }, props.hideDelay)
    }
    
    const handleReferenceClick = () => {
      if (props.trigger === 'click') {
        if (visible.value) {
          hide()
        } else {
          show()
        }
      }
    }
    
    const handleReferenceMouseEnter = () => {
      if (props.trigger === 'hover') {
        clearTimers()
        
        hoverTimer = window.setTimeout(() => {
          show()
        }, props.hoverDelay)
      }
    }
    
    const handleReferenceMouseLeave = () => {
      if (props.trigger === 'hover') {
        clearTimers()
        
        hoverTimer = window.setTimeout(() => {
          hide()
        }, props.hoverDelay)
      }
    }
    
    const handlePopoverMouseEnter = () => {
      if (props.trigger === 'hover') {
        clearTimers()
      }
    }
    
    const handlePopoverMouseLeave = () => {
      if (props.trigger === 'hover') {
        hide()
      }
    }
    
    const handleDocumentClick = (e: MouseEvent) => {
      if (props.hideOnClickOutside && visible.value) {
        const target = e.target as HTMLElement
        if (
          popover.value && 
          reference.value && 
          !popover.value.contains(target) && 
          !reference.value.contains(target)
        ) {
          hide()
        }
      }
    }
    
    // Handle v-model and manual trigger
    watch(() => props.modelValue, (val) => {
      if (props.trigger === 'manual') {
        if (val) {
          show()
        } else {
          hide()
        }
      }
    })
    
    watch(visible, () => {
      if (visible.value) {
        document.addEventListener('mousedown', handleDocumentClick)
        nextTick(() => {
          setPosition()
        })
      } else {
        document.removeEventListener('mousedown', handleDocumentClick)
      }
    })
    
    onMounted(() => {
      if (props.modelValue && props.trigger === 'manual') {
        show()
      }
      
      // Handle window resize
      window.addEventListener('resize', setPosition)
      window.addEventListener('scroll', setPosition, true)
    })
    
    onBeforeUnmount(() => {
      clearTimers()
      document.removeEventListener('mousedown', handleDocumentClick)
      window.removeEventListener('resize', setPosition)
      window.removeEventListener('scroll', setPosition, true)
    })
    
    return {
      container,
      reference,
      popover,
      visible,
      popoverStyle,
      arrowStyle,
      handleReferenceClick,
      handleReferenceMouseEnter,
      handleReferenceMouseLeave,
      handlePopoverMouseEnter,
      handlePopoverMouseLeave
    }
  }
})
</script>

<style scoped>
.popover-container {
  display: inline-block;
  position: relative;
}

.popover-reference {
  display: inline-block;
}

.popover {
  position: absolute;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  z-index: 2000;
  max-width: 350px;
  word-wrap: break-word;
}

.popover__content {
  padding: 12px;
}

.popover__title {
  color: #303133;
  font-size: 14px;
  line-height: 1.4;
  font-weight: 500;
  margin-bottom: 8px;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}

.popover__body {
  color: #606266;
  font-size: 14px;
  line-height: 1.4;
}

.popover__arrow {
  position: absolute;
  background: #fff;
  width: 16px;
  height: 16px;
  transform: rotate(45deg);
  z-index: -1;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
}

/* Arrow positions according to placement */
.popover--top .popover__arrow {
  bottom: -7px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.07);
}

.popover--bottom .popover__arrow {
  top: -7px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.06);
}

.popover--left .popover__arrow {
  right: -7px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  box-shadow: 2px -2px 5px rgba(0, 0, 0, 0.06);
}

.popover--right .popover__arrow {
  left: -7px;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.06);
}

/* Transition effects */
.popover-enter-active,
.popover-leave-active {
  transition: opacity 0.15s, transform 0.15s;
}

.popover-enter-from,
.popover-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style> 