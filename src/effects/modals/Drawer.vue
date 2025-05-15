<template>
  <Teleport to="body">
    <Transition name="drawer-fade">
      <div 
        v-if="modelValue" 
        class="drawer" 
        :class="[`drawer--${placement}`]"
        :style="drawerStyle"
        @click="handleOverlayClick"
      >
        <div 
          class="drawer__mask"
          :style="maskStyle"
        ></div>
        
        <Transition :name="`drawer-${placement}`">
          <div 
            v-if="modelValue"
            ref="content"
            class="drawer__content"
            :class="contentClass"
            :style="contentStyle"
            @click.stop
          >
            <div v-if="$slots.header || title" class="drawer__header">
              <slot name="header">
                <div class="drawer__title">{{ title }}</div>
              </slot>
              
              <button 
                v-if="closable" 
                class="drawer__close-button" 
                type="button" 
                aria-label="Close"
                @click="handleClose"
              >
                <slot name="close-icon">
                  <span class="drawer__close-icon">&times;</span>
                </slot>
              </button>
            </div>
            
            <div class="drawer__body">
              <slot></slot>
            </div>
            
            <div v-if="$slots.footer" class="drawer__footer">
              <slot name="footer"></slot>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'Drawer',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    placement: {
      type: String,
      default: 'right',
      validator: (value: string) => ['left', 'right', 'top', 'bottom'].includes(value)
    },
    size: {
      type: [String, Number],
      default: '300px'
    },
    mask: {
      type: Boolean,
      default: true
    },
    maskColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.5)'
    },
    maskBlur: {
      type: [String, Number],
      default: 0
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    closable: {
      type: Boolean,
      default: true
    },
    contentClass: {
      type: [String, Object, Array],
      default: ''
    },
    zIndex: {
      type: Number,
      default: 1000
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: false
    },
    fullHeight: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'open', 'close'],
  setup(props, { emit }) {
    const content = ref<HTMLElement | null>(null)
    const originalOverflow = ref('')
    let escapeHandler: ((e: KeyboardEvent) => void) | null = null
    
    const drawerStyle = computed(() => {
      return {
        zIndex: props.zIndex.toString()
      }
    })
    
    const maskStyle = computed(() => {
      const styles: Record<string, string> = {
        backgroundColor: props.maskColor
      }
      
      if (props.maskBlur) {
        const blurValue = typeof props.maskBlur === 'number' 
          ? `${props.maskBlur}px` 
          : props.maskBlur
        
        styles.backdropFilter = `blur(${blurValue})`
      }
      
      return styles
    })
    
    const contentStyle = computed(() => {
      const styles: Record<string, string> = {}
      const sizeValue = typeof props.size === 'number' ? `${props.size}px` : props.size
      
      if (props.placement === 'left' || props.placement === 'right') {
        styles.width = sizeValue
      } else {
        styles.height = sizeValue
      }
      
      if (props.fullHeight && (props.placement === 'left' || props.placement === 'right')) {
        styles.height = '100%'
      }
      
      return styles
    })
    
    const handleOverlayClick = () => {
      if (props.maskClosable) {
        handleClose()
      }
    }
    
    const handleClose = () => {
      emit('update:modelValue', false)
      emit('close')
    }
    
    // Lock scroll when drawer is open
    const lockBodyScroll = () => {
      if (props.lockScroll) {
        originalOverflow.value = document.body.style.overflow
        document.body.style.overflow = 'hidden'
      }
    }
    
    const unlockBodyScroll = () => {
      if (props.lockScroll) {
        document.body.style.overflow = originalOverflow.value
      }
    }
    
    // Escape key handler
    const setupEscapeHandler = () => {
      escapeHandler = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && props.closable && props.modelValue) {
          handleClose()
        }
      }
      
      document.addEventListener('keydown', escapeHandler)
    }
    
    const removeEscapeHandler = () => {
      if (escapeHandler) {
        document.removeEventListener('keydown', escapeHandler)
        escapeHandler = null
      }
    }
    
    // Focus trap inside drawer
    const trapFocus = () => {
      if (content.value) {
        nextTick(() => {
          const focusable = content.value?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
          
          if (focusable && focusable.length > 0) {
            ;(focusable[0] as HTMLElement).focus()
          } else {
            content.value?.focus()
          }
        })
      }
    }
    
    watch(() => props.modelValue, (newValue) => {
      if (newValue) {
        lockBodyScroll()
        setupEscapeHandler()
        nextTick(() => {
          trapFocus()
          emit('open')
        })
      } else {
        unlockBodyScroll()
        removeEscapeHandler()
      }
    }, { immediate: true })
    
    onMounted(() => {
      if (props.modelValue) {
        lockBodyScroll()
        setupEscapeHandler()
      }
    })
    
    onBeforeUnmount(() => {
      unlockBodyScroll()
      removeEscapeHandler()
    })
    
    return {
      content,
      drawerStyle,
      maskStyle,
      contentStyle,
      handleOverlayClick,
      handleClose
    }
  }
})
</script>

<style scoped>
.drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}

.drawer__mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.drawer__content {
  position: fixed;
  background-color: #fff;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1;
}

.drawer--left .drawer__content {
  top: 0;
  left: 0;
  height: 100%;
  width: 300px;
}

.drawer--right .drawer__content {
  top: 0;
  right: 0;
  height: 100%;
  width: 300px;
}

.drawer--top .drawer__content {
  top: 0;
  left: 0;
  width: 100%;
  height: 300px;
}

.drawer--bottom .drawer__content {
  bottom: 0;
  left: 0;
  width: 100%;
  height: 300px;
}

.drawer__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
}

.drawer__title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
}

.drawer__close-button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1;
  padding: 0;
  color: #999;
  transition: color 0.2s;
}

.drawer__close-button:hover {
  color: #333;
}

.drawer__close-icon {
  display: block;
}

.drawer__body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.drawer__footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

/* Fade transition for the drawer background */
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
}

/* Slide transition for left drawer */
.drawer-left-enter-active,
.drawer-left-leave-active {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.drawer-left-enter-from,
.drawer-left-leave-to {
  transform: translateX(-100%);
}

/* Slide transition for right drawer */
.drawer-right-enter-active,
.drawer-right-leave-active {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.drawer-right-enter-from,
.drawer-right-leave-to {
  transform: translateX(100%);
}

/* Slide transition for top drawer */
.drawer-top-enter-active,
.drawer-top-leave-active {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.drawer-top-enter-from,
.drawer-top-leave-to {
  transform: translateY(-100%);
}

/* Slide transition for bottom drawer */
.drawer-bottom-enter-active,
.drawer-bottom-leave-active {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.drawer-bottom-enter-from,
.drawer-bottom-leave-to {
  transform: translateY(100%);
}
</style> 