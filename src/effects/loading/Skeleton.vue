<template>
  <div 
    class="skeleton" 
    :class="[
      `skeleton--${type}`, 
      { 'skeleton--animated': animated }
    ]"
    :style="skeletonStyle"
  >
    <div v-if="type === 'avatar'" class="skeleton__avatar"></div>
    <div v-else-if="type === 'card'" class="skeleton__card">
      <div class="skeleton__card-header">
        <div class="skeleton__avatar skeleton__avatar--small"></div>
        <div class="skeleton__lines">
          <div class="skeleton__line skeleton__line--short"></div>
          <div class="skeleton__line skeleton__line--shorter"></div>
        </div>
      </div>
      <div class="skeleton__card-body">
        <div class="skeleton__line"></div>
        <div class="skeleton__line"></div>
        <div class="skeleton__line skeleton__line--long"></div>
      </div>
    </div>
    <div v-else-if="type === 'text'" class="skeleton__lines">
      <div 
        v-for="i in lines" 
        :key="i" 
        class="skeleton__line" 
        :class="{ 
          'skeleton__line--short': i % 3 === 0,
          'skeleton__line--long': i % 4 === 0
        }"
      ></div>
    </div>
    <div v-else class="skeleton__custom">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'Skeleton',
  props: {
    type: {
      type: String,
      default: 'text',
      validator: (value: string) => ['text', 'avatar', 'card', 'custom'].includes(value)
    },
    lines: {
      type: Number,
      default: 3,
      validator: (value: number) => value > 0
    },
    color: {
      type: String,
      default: '#e0e0e0'
    },
    highlightColor: {
      type: String,
      default: '#f5f5f5'
    },
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: null
    },
    borderRadius: {
      type: [String, Number],
      default: '4px'
    },
    animated: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    const skeletonStyle = computed(() => {
      const styles: Record<string, string> = {
        '--skeleton-base-color': props.color,
        '--skeleton-highlight-color': props.highlightColor,
        '--skeleton-border-radius': typeof props.borderRadius === 'number' 
          ? `${props.borderRadius}px` 
          : props.borderRadius,
        width: typeof props.width === 'number' ? `${props.width}px` : props.width
      }

      if (props.height) {
        styles.height = typeof props.height === 'number' 
          ? `${props.height}px` 
          : props.height
      }

      return styles
    })

    return {
      skeletonStyle
    }
  }
})
</script>

<style scoped>
.skeleton {
  display: inline-block;
  position: relative;
  overflow: hidden;
  background-color: var(--skeleton-base-color);
  border-radius: var(--skeleton-border-radius);
}

.skeleton--text {
  width: 100%;
}

.skeleton--avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.skeleton--card {
  width: 100%;
  padding: 16px;
  border-radius: 8px;
}

.skeleton__avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: var(--skeleton-base-color);
}

.skeleton__avatar--small {
  width: 32px;
  height: 32px;
}

.skeleton__card-header {
  display: flex;
  margin-bottom: 16px;
}

.skeleton__card-header .skeleton__lines {
  flex: 1;
  margin-left: 12px;
}

.skeleton__lines {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.skeleton__line {
  height: 16px;
  width: 100%;
  background-color: var(--skeleton-base-color);
  border-radius: var(--skeleton-border-radius);
}

.skeleton__line--short {
  width: 80%;
}

.skeleton__line--shorter {
  width: 60%;
}

.skeleton__line--long {
  width: 95%;
}

.skeleton--animated::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent,
    var(--skeleton-highlight-color),
    transparent
  );
  animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style> 