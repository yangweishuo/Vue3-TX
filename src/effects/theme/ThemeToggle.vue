<template>
  <button 
    class="theme-toggle" 
    :class="{ 'theme-toggle--dark': isDark }" 
    type="button" 
    @click="toggleTheme"
    :aria-label="isDark ? '切换到亮色模式' : '切换到深色模式'"
  >
    <div class="theme-toggle__icon">
      <!-- 太阳图标 -->
      <svg 
        v-if="!isDark" 
        class="theme-toggle__sun" 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
      
      <!-- 月亮图标 -->
      <svg 
        v-else 
        class="theme-toggle__moon" 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'ThemeToggle',
  props: {
    darkMode: {
      type: Boolean,
      default: undefined
    },
    size: {
      type: [String, Number],
      default: 'medium',
      validator: (value: string) => ['small', 'medium', 'large'].includes(value) || typeof value === 'number'
    },
    color: {
      type: String,
      default: ''
    },
    iconOnly: {
      type: Boolean,
      default: true
    },
    autoDetect: {
      type: Boolean,
      default: true
    },
    storageKey: {
      type: String,
      default: 'vue-tx-theme'
    }
  },
  emits: ['change'],
  setup(props, { emit }) {
    const isDark = ref(false)
    
    const getPreferredTheme = (): boolean => {
      // 1. 首先检查用户设置
      const savedTheme = localStorage.getItem(props.storageKey)
      if (savedTheme) {
        return savedTheme === 'dark'
      }
      
      // 2. 检查系统首选项
      if (props.autoDetect && window.matchMedia) {
        return window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      
      // 3. 默认为亮色模式
      return false
    }
    
    const applyTheme = (dark: boolean): void => {
      document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
      localStorage.setItem(props.storageKey, dark ? 'dark' : 'light')
      isDark.value = dark
      emit('change', dark)
    }
    
    const toggleTheme = (): void => {
      applyTheme(!isDark.value)
    }
    
    const setupTheme = (): void => {
      // 如果props.darkMode有值，优先使用
      if (typeof props.darkMode === 'boolean') {
        applyTheme(props.darkMode)
        return
      }
      
      // 否则根据首选项设置
      applyTheme(getPreferredTheme())
    }
    
    // 监听系统主题变化
    const setupMediaListener = (): void => {
      if (props.autoDetect && window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        
        // 处理系统主题变化
        const handleChange = (e: MediaQueryListEvent): void => {
          // 只有当用户未手动设置过主题时，才跟随系统主题
          if (!localStorage.getItem(props.storageKey)) {
            applyTheme(e.matches)
          }
        }
        
        // 为匹配媒体查询添加变化监听器
        try {
          // Chrome、Firefox、Safari 14+
          mediaQuery.addEventListener('change', handleChange)
        } catch (err) {
          // Safari 14之前、IE、早期浏览器
          try {
            // @ts-ignore
            mediaQuery.addListener(handleChange)
          } catch (e) {
            console.error('浏览器不支持媒体查询监听', e)
          }
        }
      }
    }
    
    onMounted(() => {
      setupTheme()
      setupMediaListener()
    })
    
    return {
      isDark,
      toggleTheme
    }
  }
})
</script>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  position: relative;
  padding: 8px;
  border-radius: var(--tx-border-radius-small, 4px);
  transition: all var(--tx-transition-normal, 0.3s) ease;
  color: var(--tx-text-color, #333);
}

.theme-toggle:hover {
  background-color: var(--tx-hover-bg, rgba(0, 0, 0, 0.05));
}

.theme-toggle--dark {
  color: var(--tx-text-color, #e0e0e0);
}

.theme-toggle__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.5s ease;
}

.theme-toggle__sun,
.theme-toggle__moon {
  transform-origin: center;
  transition: all 0.5s ease;
}

.theme-toggle:hover .theme-toggle__icon {
  transform: rotate(30deg);
}
</style> 