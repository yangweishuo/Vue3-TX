# Vue3 TX 特效组件库使用指南

本指南详细介绍了如何使用 Vue3 TX 特效组件库的各个组件，包括基础配置、属性说明以及高级用法。

## 目录

- [安装与配置](#安装与配置)
- [按钮特效](#按钮特效)
- [加载动画](#加载动画)
- [悬停效果](#悬停效果)
- [文字特效](#文字特效)
- [过渡动画](#过渡动画)
- [弹窗组件](#弹窗组件)
- [滚动特效](#滚动特效)
- [卡片特效](#卡片特效)
- [图像特效](#图像特效)
- [背景特效](#背景特效)
- [主题系统](#主题系统)
- [最佳实践](#最佳实践)

## 安装与配置

### 安装

```bash
# 使用 npm
npm install vue3-tx-component

# 使用 yarn
yarn add vue3-tx-component

# 使用 pnpm
pnpm add vue3-tx-component
```

### 全局注册

```js
// main.ts 或 main.js
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
<script setup>
import { HoverButton, Typewriter } from 'vue3-tx-component'
import 'vue3-tx-component/dist/style.css' // 导入样式
</script>

<template>
  <HoverButton>悬停按钮</HoverButton>
  <Typewriter text="这是一个打字机效果" />
</template>
```

## 背景特效

### ParticleBackground 粒子背景

粒子背景组件可以为页面添加动态的粒子动画效果，粒子可以随机移动并可选择性地相互连接。

#### 基础用法

```vue
<template>
  <div class="container">
    <ParticleBackground />
    <!-- 页面内容放在这里 -->
  </div>
</template>

<script setup>
import { ParticleBackground } from 'vue3-tx-component'
</script>

<style>
.container {
  position: relative;
  min-height: 100vh;
}
</style>
```

#### 配置属性

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| count | Number | 50 | 粒子数量 |
| color | String | 'var(--tx-primary-color)' | 粒子颜色 |
| speed | Number | 1 | 粒子移动速度 |
| linked | Boolean | true | 是否显示粒子之间的连接线 |
| linkDistance | Number | 120 | 粒子之间连接的最大距离 |
| size | Number | 3 | 粒子大小 |
| responsive | Boolean | true | 是否响应窗口大小变化 |
| zIndex | Number | -1 | 粒子层的 z-index 值 |

#### 自定义示例

```vue
<template>
  <div class="hero">
    <ParticleBackground 
      :count="100" 
      color="rgba(52, 152, 219, 0.7)" 
      :speed="0.5" 
      :linked="true" 
      :linkDistance="150"
      :size="2"
    />
    <div class="hero-content">
      <h1>欢迎使用我们的服务</h1>
      <p>创新科技，改变生活</p>
      <HoverButton>了解更多</HoverButton>
    </div>
  </div>
</template>
```

## 卡片特效

### FlipCard 翻转卡片

FlipCard 组件提供了一个可以在正反面之间翻转的 3D 卡片效果，适用于创建交互式信息展示、卡片游戏等场景。

#### 基础用法

```vue
<template>
  <FlipCard :flipped="isFlipped">
    <template #front>
      <div class="card-content">
        <h3>卡片正面</h3>
        <button @click="isFlipped = true">翻转卡片</button>
      </div>
    </template>
    <template #back>
      <div class="card-content">
        <h3>卡片背面</h3>
        <button @click="isFlipped = false">返回正面</button>
      </div>
    </template>
  </FlipCard>
</template>

<script setup>
import { ref } from 'vue'
import { FlipCard } from 'vue3-tx-component'

const isFlipped = ref(false)
</script>
```

#### 配置属性

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| flipped | Boolean | false | 控制卡片是否翻转 |
| direction | String | 'horizontal' | 翻转方向，可选值：'horizontal'、'vertical' |
| height | String/Number | '300px' | 卡片高度 |
| width | String/Number | '100%' | 卡片宽度 |
| speed | Number | 0.6 | 翻转动画持续时间(秒) |

#### 垂直翻转示例

```vue
<template>
  <FlipCard 
    :flipped="isFlipped" 
    direction="vertical" 
    height="250px" 
    width="200px" 
    :speed="0.8"
  >
    <!-- 卡片内容 -->
  </FlipCard>
</template>
```

### TiltCard 3D 倾斜卡片

TiltCard 组件可以根据鼠标位置产生倾斜效果，创造出逼真的 3D 交互体验。

#### 基础用法

```vue
<template>
  <div style="width: 300px; height: 200px;">
    <TiltCard>
      <div class="content">
        <h3>3D 倾斜效果</h3>
        <p>移动鼠标查看效果</p>
      </div>
    </TiltCard>
  </div>
</template>

<script setup>
import { TiltCard } from 'vue3-tx-component'
</script>
```

#### 配置属性

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| perspective | Number | 1000 | 3D 透视值 |
| maxTilt | Number | 15 | 最大倾斜角度 |
| scale | Number | 1.05 | 鼠标悬停时的缩放比例 |
| speed | Number | 300 | 过渡动画时长(毫秒) |
| easing | String | 'cubic-bezier(.03,.98,.52,.99)' | 过渡动画曲线 |
| disableAxis | String | null | 禁用的倾斜轴，可选值：'x'、'y'、null |
| glare | Boolean | false | 是否启用光晕效果 |
| maxGlare | Number | 0.5 | 最大光晕不透明度 |
| glareColor | String | 'rgba(255, 255, 255, 0.75)' | 光晕颜色 |
| reset | Boolean | true | 鼠标离开时是否重置卡片位置 |
| gyroscope | Boolean | false | 是否启用陀螺仪支持(移动设备) |

#### 带光晕效果示例

```vue
<template>
  <div style="width: 300px; height: 200px;">
    <TiltCard
      :maxTilt="20"
      :scale="1.05"
      :speed="400"
      :glare="true"
      :maxGlare="0.6"
      @tilt="handleTilt"
      @enter="handleEnter"
      @leave="handleLeave"
    >
      <div class="content">
        <h3>光晕效果</h3>
        <p>移动鼠标查看效果</p>
      </div>
    </TiltCard>
  </div>
</template>

<script setup>
import { TiltCard } from 'vue3-tx-component'

const handleTilt = (data) => {
  console.log('倾斜数据:', data)
}

const handleEnter = () => {
  console.log('鼠标进入')
}

const handleLeave = () => {
  console.log('鼠标离开')
}
</script>
```

## 图像特效

### FilterImage 滤镜图像

FilterImage 组件为图像提供各种滤镜效果，可以在鼠标悬停时改变滤镜。

#### 基础用法

```vue
<template>
  <FilterImage 
    src="/path/to/image.jpg" 
    alt="图片描述"
    filter="grayscale"
  />
</template>

<script setup>
import { FilterImage } from 'vue3-tx-component'
</script>
```

#### 配置属性

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| src | String | - | 图片地址(必填) |
| alt | String | '' | 图片的替代文本 |
| filter | String | 'none' | 应用的滤镜，支持值：'none'、'grayscale'、'sepia'、'blur'、'brightness'、'contrast'、'hue-rotate'、'vintage'、'duotone' |
| amount | Number | 100 | 滤镜效果强度(0-100) |
| hoverFilter | String | 'none' | 鼠标悬停时应用的滤镜 |
| width | String/Number | '100%' | 图片容器宽度 |
| height | String/Number | 'auto' | 图片容器高度 |
| objectFit | String | 'cover' | 图片填充模式 |
| transitionDuration | Number | 0.3 | 过渡动画时长(秒) |
| lazy | Boolean | false | 是否启用懒加载 |
| rounded | Boolean | false | 是否使用圆角 |

#### 悬停效果示例

```vue
<template>
  <div class="image-gallery">
    <FilterImage 
      src="/images/photo1.jpg" 
      filter="grayscale" 
      hoverFilter="none" 
      :rounded="true"
      width="300px"
      height="200px"
    />
    
    <FilterImage 
      src="/images/photo2.jpg" 
      filter="sepia" 
      hoverFilter="none" 
      :rounded="true"
      width="300px"
      height="200px"
    />
    
    <FilterImage 
      src="/images/photo3.jpg" 
      filter="blur" 
      :amount="50"
      hoverFilter="none" 
      :rounded="true"
      width="300px"
      height="200px"
    />
  </div>
</template>
```

## 滚动特效

### ScrollAnimation 滚动动画

ScrollAnimation 组件可以在元素滚动到视口时触发各种动画效果。

#### 基础用法

```vue
<template>
  <div class="content">
    <ScrollAnimation animation="fade">
      <h2>淡入效果标题</h2>
      <p>这段内容会随着滚动淡入显示</p>
    </ScrollAnimation>
    
    <ScrollAnimation animation="slide-up" :delay="0.2">
      <div class="feature-box">向上滑入的内容</div>
    </ScrollAnimation>
    
    <ScrollAnimation animation="zoom" :delay="0.4">
      <div class="feature-box">缩放显示的内容</div>
    </ScrollAnimation>
  </div>
</template>

<script setup>
import { ScrollAnimation } from 'vue3-tx-component'
</script>
```

#### 配置属性

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| animation | String | 'fade' | 动画类型，支持值：'fade'、'slide-up'、'slide-down'、'slide-left'、'slide-right'、'zoom'、'flip'、'blur' |
| delay | Number | 0 | 动画延迟时间(秒) |
| duration | Number | 0.6 | 动画持续时间(秒) |
| offset | Number | 100 | 元素距离视口多少像素时触发动画 |
| once | Boolean | true | 是否只触发一次动画 |
| easing | String | 'cubic-bezier(0.25, 0.1, 0.25, 1)' | 动画缓动函数 |
| intersectionRatio | Number | 0.2 | 元素可见比例的阈值(0-1) |

#### 创建序列动画示例

```vue
<template>
  <div class="features">
    <h2>我们的特色</h2>
    
    <div class="feature-row">
      <ScrollAnimation 
        v-for="(feature, index) in features" 
        :key="index"
        animation="slide-up"
        :delay="index * 0.1"
        :duration="0.8"
      >
        <div class="feature-card">
          <img :src="feature.icon" :alt="feature.title">
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </ScrollAnimation>
    </div>
  </div>
</template>

<script setup>
import { ScrollAnimation } from 'vue3-tx-component'

const features = [
  { 
    icon: '/icons/feature1.svg', 
    title: '便捷操作', 
    description: '简单易用的界面设计' 
  },
  { 
    icon: '/icons/feature2.svg', 
    title: '数据安全', 
    description: '全程加密保护您的数据' 
  },
  { 
    icon: '/icons/feature3.svg', 
    title: '快速响应', 
    description: '高效的处理速度' 
  }
]
</script>
```

## 主题系统

Vue3 TX 组件库内置了主题系统，支持亮色和深色模式。

### ThemeToggle 主题切换组件

```vue
<template>
  <div class="theme-controls">
    <ThemeToggle />
  </div>
</template>

<script setup>
import { ThemeToggle } from 'vue3-tx-component'
</script>
```

### 自定义主题颜色

您可以通过 CSS 变量覆盖默认主题颜色：

```css
/* styles.css */
:root {
  /* 亮色主题变量 */
  --tx-primary-color: #4a6cf7; /* 主色调 */
  --tx-secondary-color: #6ae979; /* 次色调 */
  --tx-accent-color: #ff6b6b; /* 强调色 */
  --tx-text-color: #333333; /* 文本颜色 */
  --tx-text-color-secondary: #666666; /* 次要文本颜色 */
  --tx-bg-color: #f5f7fa; /* 背景色 */
  --tx-card-bg: #ffffff; /* 卡片背景色 */
  --tx-border-color: #eaecef; /* 边框颜色 */
}

[data-theme="dark"] {
  /* 深色主题变量 */
  --tx-primary-color: #5a7eff; /* 深色模式主色调 */
  --tx-secondary-color: #4cd97b; /* 深色模式次色调 */
  --tx-accent-color: #ff6b6b; /* 深色模式强调色 */
  --tx-text-color: #e0e0e0; /* 深色模式文本颜色 */
  --tx-text-color-secondary: #a0a0a0; /* 深色模式次要文本颜色 */
  --tx-bg-color: #1a1a1a; /* 深色模式背景色 */
  --tx-card-bg: #2a2a2a; /* 深色模式卡片背景色 */
  --tx-border-color: #3a3a3a; /* 深色模式边框颜色 */
}
```

## 最佳实践

### 性能优化建议

1. **按需引入组件**：仅引入需要的组件，减少包体积
2. **延迟加载**：对于图片使用 FilterImage 组件的 lazy 属性
3. **动画数量控制**：页面上同时运行的动画效果不宜过多
4. **响应式设计**：使用组件的响应式属性，适应不同设备

### 常见问题解决

1. **动画卡顿**：
   - 减少页面同时运行的动画数量
   - 对于 ParticleBackground，可以减少粒子数量
   - 考虑使用 `will-change` CSS 属性优化渲染

2. **移动设备兼容性**：
   - 对于触摸设备，可以使用 TiltCard 的 gyroscope 属性
   - 确保响应式设计适应小屏幕

3. **主题切换闪烁**：
   - 在 HTML 头部添加主题初始化脚本，避免闪烁

### 组件组合示例

下面是一个结合多个组件创建吸引人界面的示例：

```vue
<template>
  <div class="landing-page">
    <!-- 背景粒子效果 -->
    <ParticleBackground :count="60" color="var(--tx-primary-color)" />
    
    <!-- 页面头部 -->
    <header>
      <ScrollAnimation animation="fade" :duration="0.8">
        <h1>
          <GradientText :animated="true">创新科技解决方案</GradientText>
        </h1>
        <p>为您的业务提供全方位支持</p>
      </ScrollAnimation>
      
      <div class="theme-toggle-wrapper">
        <ThemeToggle />
      </div>
    </header>
    
    <!-- 特色部分 -->
    <section class="features">
      <ScrollAnimation animation="slide-up" :duration="0.6">
        <h2>我们的优势</h2>
      </ScrollAnimation>
      
      <div class="feature-cards">
        <ScrollAnimation 
          v-for="(feature, index) in features" 
          :key="index"
          animation="slide-up"
          :delay="index * 0.1"
        >
          <TiltCard :glare="true" :perspective="1000">
            <div class="feature-card">
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
          </TiltCard>
        </ScrollAnimation>
      </div>
    </section>
    
    <!-- 产品展示 -->
    <section class="products">
      <ScrollAnimation animation="slide-up">
        <h2>产品展示</h2>
      </ScrollAnimation>
      
      <div class="product-list">
        <ScrollAnimation 
          v-for="(product, index) in products" 
          :key="index"
          animation="fade"
          :delay="index * 0.2"
        >
          <FlipCard :flipped="flippedCards[index]" height="300px">
            <template #front>
              <div class="product-front">
                <FilterImage 
                  :src="product.image" 
                  :alt="product.name" 
                  height="200px" 
                  :rounded="true"
                />
                <h3>{{ product.name }}</h3>
                <HoverButton @click="flipCard(index)">查看详情</HoverButton>
              </div>
            </template>
            <template #back>
              <div class="product-back">
                <h3>{{ product.name }}</h3>
                <p>{{ product.description }}</p>
                <RippleButton @click="flipCard(index)">返回</RippleButton>
              </div>
            </template>
          </FlipCard>
        </ScrollAnimation>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  ParticleBackground,
  ScrollAnimation,
  GradientText,
  ThemeToggle,
  TiltCard,
  FlipCard,
  FilterImage,
  HoverButton,
  RippleButton
} from 'vue3-tx-component'

const features = [
  { title: '高效服务', description: '快速响应客户需求' },
  { title: '创新科技', description: '运用前沿技术解决问题' },
  { title: '质量保证', description: '严格的质量控制体系' }
]

const products = [
  { 
    name: '智能助手', 
    image: '/products/product1.jpg',
    description: '基于AI技术的智能助手，提高工作效率' 
  },
  { 
    name: '数据分析平台', 
    image: '/products/product2.jpg',
    description: '专业的数据分析工具，洞察业务趋势' 
  },
  { 
    name: '安全防护系统', 
    image: '/products/product3.jpg',
    description: '全方位保护您的数据安全' 
  }
]

const flippedCards = ref(products.map(() => false))

const flipCard = (index) => {
  flippedCards.value[index] = !flippedCards.value[index]
}
</script>
```

以上示例展示了如何组合使用多个组件创建一个吸引人的产品展示页面，包括背景特效、滚动动画、3D卡片、翻转效果和图像滤镜等。

---

我们希望本指南能帮助您充分利用 Vue3 TX 特效组件库，创建令人印象深刻的用户界面。如有任何问题或建议，欢迎在 GitHub 仓库提交 issue 或贡献代码。 