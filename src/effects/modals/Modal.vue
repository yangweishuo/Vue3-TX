<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div 
        v-if="modelValue" 
        class="modal" 
        :class="[
          `modal--${size}`,
          { 'modal--mask-closable': maskClosable }
        ]"
        :style="customStyle"
        @click="handleOverlayClick"
      >
        <div 
          class="modal__mask"
          :style="maskStyle"
        ></div>
        
        <div 
          ref="content"
          class="modal__content"
          :class="contentClass"
          :style="contentStyle"
          @click.stop
        >
          <div v-if="$slots.header || title" class="modal__header">
            <slot name="header">
              <div class="modal__title">{{ title }}</div>
            </slot>
            
            <button 
              v-if="closable" 
              class="modal__close-button" 
              type="button" 
              aria-label="Close"
              @click="handleClose"
            >
              <slot name="close-icon">
                <span class="modal__close-icon">&times;</span>
              </slot>
            </button>
          </div>
          
          <div class="modal__body">
            <slot></slot>
          </div>
          
          <div v-if="$slots.footer" class="modal__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'

export default defineComponent({
  name: 'Modal',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'default',
      validator: (value: string) => ['small', 'default', 'large', 'fullscreen'].includes(value)
    },
    width: {
      type: [String, Number],
      default: null
    },
    maxWidth: {
      type: [String, Number],
      default: null
    },
    height: {
      type: [String, Number],
      default: null
    },
    maxHeight: {
      type: [String, Number],
      default: null
    },
    top: {
      type: [String, Number],
      default: null
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
    }
  },
  emits: ['update:modelValue', 'open', 'close', 'cancel'],
  setup(props, { emit }) {
    const content = ref<HTMLElement | null>(null)
    const originalOverflow = ref('')
    let escapeHandler: ((e: KeyboardEvent) => void) | null = null
    
    const customStyle = computed(() => {
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
      
      if (props.width) {
        styles.width = typeof props.width === 'number' ? `${props.width}px` : props.width
      }
      
      if (props.maxWidth) {
        styles.maxWidth = typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth
      }
      
      if (props.height) {
        styles.height = typeof props.height === 'number' ? `${props.height}px` : props.height
      }
      
      if (props.maxHeight) {
        styles.maxHeight = typeof props.maxHeight === 'number' ? `${props.maxHeight}px` : props.maxHeight
      }
      
      if (props.top) {
        styles.marginTop = typeof props.top === 'number' ? `${props.top}px` : props.top
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
    
    const handleCancel = () => {
      emit('update:modelValue', false)
      emit('cancel')
    }
    
    // Lock scroll when modal is open
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
    
    // Focus trap inside modal
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
      customStyle,
      maskStyle,
      contentStyle,
      handleOverlayClick,
      handleClose,
      handleCancel
    }
  }
})
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
  z-index: 1000;
}

.modal__mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal__content {
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 2rem);
  max-width: calc(100vw - 2rem);
  z-index: 1;
}

.modal--small .modal__content {
  width: 400px;
}

.modal--default .modal__content {
  width: 600px;
}

.modal--large .modal__content {
  width: 800px;
}

.modal--fullscreen .modal__content {
  width: 100%;
  height: 100%;
  border-radius: 0;
  max-height: 100vh;
  max-width: 100vw;
}

.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
}

.modal__title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
}

.modal__close-button {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  line-height: 1;
  padding: 0;
  color: #999;
  transition: color 0.2s;
}

.modal__close-button:hover {
  color: #333;
}

.modal__close-icon {
  display: block;
}

.modal__body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.modal__footer {
  padding: 1rem 1.5rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

/* Transition Effects */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-active .modal__content {
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal__content {
  transform: scale(0.9);
}

/* Responsive Adjustments */
@media screen and (max-width: 576px) {
  .modal--small .modal__content,
  .modal--default .modal__content,
  .modal--large .modal__content {
    width: 100%;
  }
}
</style> 