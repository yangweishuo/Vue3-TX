# Vue3 TX 新增特效组件使用指南

本文档详细介绍了Vue3 TX特效组件库最新版本新增的特效组件，包括背景特效和鼠标跟随特效。

## 目录

- [背景特效](#背景特效)
  - [GradientBackground 渐变背景](#gradientbackground-渐变背景)
  - [WaveBackground 波浪背景](#wavebackground-波浪背景)
- [鼠标特效](#鼠标特效)
  - [MouseFollower 鼠标跟随](#mousefollower-鼠标跟随)
- [组合使用示例](#组合使用示例)

## 背景特效

### GradientBackground 渐变背景

GradientBackground组件提供了动态变化的渐变背景效果，可以通过多种参数自定义渐变效果。

#### 基础用法

```vue
<template>
  <div class="container">
    <GradientBackground />
    <!-- 页面内容放在这里 -->
  </div>
</template>

<script setup>
import { GradientBackground } from 'vue3-tx-component'
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
| colors | Array | ['#4158D0', '#C850C0', '#FFCC70'] | 渐变使用的颜色数组 |
| angle | Number | 45 | 渐变角度（度数） |
| animated | Boolean | true | 是否启用动画效果 |
| paused | Boolean | false | 是否暂停动画 |
| animationDuration | Number | 15 | 动画周期时长（秒） |
| opacity | Number | 1 | 背景透明度 |

#### 自定义示例

```vue
<template>
  <div class="hero">
    <GradientBackground 
      :colors="['#00F260', '#0575E6', '#0052D4']" 
      :angle="60" 
      :animationDuration="20"
      :opacity="0.8"
    />
    <div class="hero-content">
      <h1>欢迎使用我们的服务</h1>
      <p>创新科技，改变生活</p>
      <button>了解更多</button>
    </div>
  </div>
</template>
```

### WaveBackground 波浪背景

WaveBackground组件提供了动态波浪效果的背景，非常适合作为页面底部的装饰元素。

#### 基础用法

```vue
<template>
  <div class="container">
    <WaveBackground />
    <!-- 页面内容放在这里 -->
  </div>
</template>

<script setup>
import { WaveBackground } from 'vue3-tx-component'
</script>
```

#### 配置属性

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| color1 | String | 'rgba(66, 133, 244, 0.6)' | 第一层波浪的颜色 |
| color2 | String | 'rgba(52, 168, 83, 0.6)' | 第二层波浪的颜色 |
| color3 | String | 'rgba(251, 188, 5, 0.6)' | 第三层波浪的颜色 |
| wave1Opacity | Number | 0.7 | 第一层波浪的不透明度 |
| wave2Opacity | Number | 0.5 | 第二层波浪的不透明度 |
| wave3Opacity | Number | 0.3 | 第三层波浪的不透明度 |
| height | Number | 200 | 波浪区域的高度 |
| opacity | Number | 1 | 整体不透明度 |
| animationDuration | Number | 12 | 动画周期时长（秒） |
| zIndex | Number | -1 | CSS z-index值 |

#### 自定义示例

```vue
<template>
  <div class="landing-page">
    <div class="content">
      <!-- 网站内容 -->
    </div>
    
    <WaveBackground 
      color1="#ff6b6b" 
      color2="#4ecdc4" 
      color3="#45b7d8"
      :height="300"
      :animationDuration="15"
    />
  </div>
</template>
```

## 鼠标特效

### MouseFollower 鼠标跟随

MouseFollower组件为鼠标指针添加跟随效果，可以是光点、光环或其他效果，为网站增添互动体验。

#### 基础用法

```vue
<template>
  <div>
    <MouseFollower />
    <!-- 页面内容 -->
  </div>
</template>

<script setup>
import { MouseFollower } from 'vue3-tx-component'
</script>
```

#### 配置属性

| 属性名 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| type | String | 'dot' | 跟随效果类型，可选值：'dot'(圆点)、'ring'(圆环)、'spotlight'(聚光)、'glow'(光晕)、'trail'(轨迹) |
| size | Number | 30 | 跟随元素大小(像素) |
| color | String | 'rgba(52, 152, 219, 0.6)' | 跟随元素颜色 |
| borderColor | String | 'rgba(52, 152, 219, 0.8)' | 边框颜色(用于ring类型) |
| borderWidth | Number | 1 | 边框宽度(像素) |
| delay | Number | 100 | 跟随延迟(毫秒) |
| delayEffect | Boolean | true | 是否启用延迟动画效果 |
| disabled | Boolean | false | 是否禁用跟随效果 |
| opacity | Number | 0.7 | 不透明度 |
| blur | Number | 0 | 模糊效果(像素) |
| scale | Number | 1 | 缩放比例 |
| blendMode | String | 'normal' | 混合模式，如'overlay'、'screen'等 |

#### 自定义示例

```vue
<template>
  <div class="portfolio">
    <MouseFollower 
      type="glow"
      :size="50"
      color="rgba(255, 107, 107, 0.5)"
      :delay="150"
      :blur="5"
      blendMode="overlay"
    />
    
    <!-- 作品展示区域 -->
    <div class="projects">
      <!-- 项目内容 -->
    </div>
  </div>
</template>
```

## 组合使用示例

以下是组合使用多种特效的示例，创建引人入胜的页面效果：

```vue
<template>
  <div class="landing-page">
    <!-- 动态渐变背景 -->
    <GradientBackground 
      :colors="isDarkMode ? ['#0f2027', '#203a43', '#2c5364'] : ['#f9d423', '#ff4e50', '#fc6076']"
      :opacity="0.7"
      :animationDuration="20"
    />
    
    <!-- 波浪底部 -->
    <WaveBackground 
      :color1="isDarkMode ? 'rgba(77, 182, 172, 0.6)' : 'rgba(66, 133, 244, 0.6)'"
      :color2="isDarkMode ? 'rgba(66, 165, 245, 0.5)' : 'rgba(52, 168, 83, 0.5)'"
      :color3="isDarkMode ? 'rgba(41, 121, 255, 0.4)' : 'rgba(251, 188, 5, 0.4)'"
      :height="250"
    />
    
    <!-- 鼠标跟随效果 -->
    <MouseFollower 
      :type="isDarkMode ? 'glow' : 'spotlight'"
      :size="isDarkMode ? 60 : 40"
      :color="isDarkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(52, 152, 219, 0.6)'"
      :blur="isDarkMode ? 8 : 0"
      :blendMode="isDarkMode ? 'screen' : 'overlay'"
    />
    
    <!-- 页面内容 -->
    <header>
      <h1>创意工作室</h1>
      <ThemeToggle @change="toggleTheme" />
    </header>
    
    <main>
      <!-- 主要内容区域 -->
      <section class="hero">
        <h2>
          <GradientText :animated="true">创新设计，卓越体验</GradientText>
        </h2>
        <p>我们提供前沿的网页设计和开发服务</p>
      </section>
      
      <!-- 其他内容 -->
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  GradientBackground, 
  WaveBackground, 
  MouseFollower,
  ThemeToggle,
  GradientText
} from 'vue3-tx-component'

const isDarkMode = ref(false)
const toggleTheme = (dark) => {
  isDarkMode.value = dark
}
</script>
```

通过上述示例，您可以看到如何组合使用多种特效组件创建现代化、吸引人的网页界面。特效组件也都支持响应主题变化，可以根据深色/浅色模式自动调整效果表现。

---

欢迎使用Vue3 TX特效组件库的新增特效功能。如有任何问题或建议，欢迎在GitHub仓库提交issue或贡献代码。 