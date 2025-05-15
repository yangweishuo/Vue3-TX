# Vue3 TX 特效组件库

![版本](https://img.shields.io/badge/version-0.3.0-blue.svg)
![协议](https://img.shields.io/badge/license-MIT-green.svg)

一套基于 Vue 3 的超级实用的前端特效组件库，提供了丰富的动画效果和交互组件，可以快速为你的项目增添现代化的视觉效果与用户体验。

## 功能特点

- **🔥 丰富的特效类型**：按钮特效、加载动画、悬停效果、文字动画、过渡效果、弹窗组件、滚动特效、卡片特效、图像效果和背景特效
- **💪 基于 Vue 3**：利用 Vue 3 的组合式 API 和 TypeScript 构建，支持强类型
- **🎨 高度可定制**：每个组件都提供了丰富的属性和事件，支持深度定制
- **📦 按需引入**：支持按需引入单个组件，优化项目体积
- **📱 响应式设计**：适配各种屏幕尺寸和设备
- **🔒 类型安全**：完整的 TypeScript 类型支持
- **🌓 深色模式**：内置深色模式支持，自动跟随系统主题或手动切换
- **✨ 交互动态**：丰富的动态效果，提升用户体验
- **🚀 高性能**：优化的动画实现，确保流畅运行

## 安装

```bash
# 使用 npm
npm install vue3-tx-component

# 使用 yarn
yarn add vue3-tx-component

# 使用 pnpm
pnpm add vue3-tx-component
```

## 快速开始

### 全局注册

```js
// main.ts
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
import 'vue3-tx-component/dist/style.css' // 导入样式

const handleClick = () => {
  console.log('按钮被点击了！')
}
</script>
```

## 组件列表

### 按钮特效
- `HoverButton`：悬停效果按钮
- `PulseButton`：脉冲效果按钮
- `RippleButton`：涟漪效果按钮

### 加载动画
- `Spinner`：加载旋转动画
- `Skeleton`：骨架屏加载
- `ProgressBar`：进度条

### 悬停效果
- `HoverCard`：悬停卡片
- `ZoomHover`：缩放悬停
- `FloatHover`：悬浮悬停效果
- `MouseFollower`：鼠标跟随特效，支持多种跟随样式

### 文字特效
- `Typewriter`：打字机效果
- `GradientText`：渐变文字
- `GlitchText`：故障风格文字

### 过渡动画
- `FadeTransition`：淡入淡出过渡
- `SlideTransition`：滑动过渡
- `ScaleTransition`：缩放过渡

### 弹窗组件
- `Modal`：模态框
- `Drawer`：抽屉组件
- `Popover`：气泡弹窗

### 滚动特效
- `ScrollReveal`：滚动显示效果
- `ScrollParallax`：视差滚动效果
- `ScrollProgress`：滚动进度条
- `ScrollAnimation`：高级滚动动画，支持多种效果

### 卡片特效
- `FlipCard`：3D翻转卡片
- `TiltCard`：3D倾斜卡片，支持鼠标跟随和陀螺仪

### 图像特效
- `FilterImage`：图像滤镜效果，支持多种滤镜和悬停切换

### 背景特效
- `ParticleBackground`：粒子背景特效，可自定义粒子数量和连接线
- `GradientBackground`：渐变背景特效，支持动态渐变色彩变化
- `WaveBackground`：波浪背景特效，动态波浪动画

### 主题
- `ThemeToggle`：主题切换组件

## 高级用法示例

### 粒子背景效果

```vue
<template>
  <div>
    <ParticleBackground 
      :count="100" 
      :speed="0.5" 
      color="#3498db" 
      :linked="true"
      :linkDistance="150"
    />
    <!-- 您的内容 -->
  </div>
</template>
```

### 渐变背景效果

```vue
<template>
  <div>
    <GradientBackground 
      :colors="['#4158D0', '#C850C0', '#FFCC70']"
      :animated="true"
      :animationDuration="15"
      :opacity="0.8"
    />
    <!-- 您的内容 -->
  </div>
</template>
```

### 波浪背景效果

```vue
<template>
  <div>
    <WaveBackground 
      color1="rgba(66, 133, 244, 0.6)"
      color2="rgba(52, 168, 83, 0.6)"
      color3="rgba(251, 188, 5, 0.6)"
      :height="200"
    />
    <!-- 您的内容 -->
  </div>
</template>
```

### 鼠标跟随效果

```vue
<template>
  <div>
    <MouseFollower 
      type="dot"
      :size="30"
      color="rgba(52, 152, 219, 0.6)"
      :delay="100"
    />
    <!-- 您的内容 -->
  </div>
</template>
```

### 3D翻转卡片

```vue
<template>
  <div>
    <FlipCard>
      <template #front>
        <div class="card-content">正面内容</div>
      </template>
      <template #back>
        <div class="card-content">背面内容</div>
      </template>
    </FlipCard>
  </div>
</template>
```

## 最新更新 (v0.3.0)

- 新增 `GradientBackground` 渐变背景特效组件，支持动态色彩变化
- 新增 `WaveBackground` 波浪背景特效组件，提供动态波浪动画
- 新增 `MouseFollower` 鼠标跟随特效组件，支持多种跟随样式
- 新增组件展示页面，可以在同一页面查看所有特效
- 添加了背景切换功能，可以在不同背景特效之间切换
- 优化了深色模式下的样式表现
- 改进了组件的响应式设计
- 增强了特效组件的交互体验

## 文档

访问我们的[在线文档](https://your-documentation-url.com)获取更详细的使用指南和API文档。

## 贡献

欢迎贡献代码、报告问题或提出功能请求。请查看[贡献指南](CONTRIBUTING.md)了解更多信息。

## 许可证

[MIT](LICENSE)