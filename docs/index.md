# Vue3 TX 特效组件库

Vue3 TX 是一个基于 Vue 3 的特效组件库，提供丰富的交互和动画效果，帮助开发者快速构建具有现代感的用户界面。

## 特点

- 🚀 **基于 Vue 3**：充分利用Vue 3的Composition API和TypeScript
- 🎨 **丰富的特效**：包含按钮、加载、悬停、文字、过渡动画等多种特效
- 📦 **按需引入**：支持Tree Shaking，只打包你需要的组件
- 🌓 **深色模式**：所有组件都支持亮色/深色主题切换
- 🔧 **高度可定制**：灵活的API和完善的TypeScript类型支持

## 安装

```bash
npm install vue3-tx-component
```

或使用 yarn:

```bash
yarn add vue3-tx-component
```

## 快速开始

### 全局注册

```js
import { createApp } from 'vue'
import App from './App.vue'
import TXComponent from 'vue3-tx-component'
import 'vue3-tx-component/dist/style.css' // 导入样式

const app = createApp(App)
app.use(TXComponent)
app.mount('#app')
```

### 按需引入

```vue
<template>
  <div>
    <HoverButton @click="handleClick">点击我</HoverButton>
    <Typewriter text="这是一个打字机效果" />
  </div>
</template>

<script setup>
import { HoverButton, Typewriter } from 'vue3-tx-component'
import 'vue3-tx-component/es/style.css' // 导入样式

const handleClick = () => {
  console.log('按钮被点击了!')
}
</script>
```

## 组件列表

### 按钮特效
- [HoverButton](./components/buttons/HoverButton.md) - 悬停按钮
- PulseButton - 脉冲按钮
- RippleButton - 涟漪按钮

### 加载动画
- Spinner - 加载旋转
- Skeleton - 骨架屏
- ProgressBar - 进度条

### 悬停效果
- HoverCard - 悬停卡片
- ZoomHover - 缩放悬停
- FloatHover - 悬浮卡片

### 文字特效
- Typewriter - 打字机
- GradientText - 渐变文字
- GlitchText - 故障文字

### 过渡动画
- FadeTransition - 淡入淡出
- SlideTransition - 滑动过渡
- ScaleTransition - 缩放过渡

### 弹窗组件
- Modal - 模态框
- Drawer - 抽屉
- Popover - 气泡弹窗

### 滚动特效
- ScrollReveal - 滚动显示
- ScrollParallax - 视差滚动
- ScrollProgress - 滚动进度

### 主题
- ThemeToggle - 主题切换

## 贡献

欢迎提交 Pull Request 或创建 Issue。

## 许可

[MIT](./LICENSE) 