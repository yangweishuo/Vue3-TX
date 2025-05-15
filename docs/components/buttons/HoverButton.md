# HoverButton 悬停按钮

悬停按钮组件提供了一个带有悬停效果的按钮，当用户将鼠标悬停在按钮上时，按钮会有视觉反馈。

## 基本用法

```vue
<template>
  <HoverButton>基本按钮</HoverButton>
  <HoverButton color="#42b883" hover-color="#2c855c">自定义颜色</HoverButton>
  <HoverButton :disabled="true">禁用状态</HoverButton>
</template>
```

## 自定义样式

```vue
<template>
  <HoverButton 
    color="#8e44ad" 
    hover-color="#6c3483" 
    text-color="#ffffff"
  >
    自定义样式
  </HoverButton>
</template>
```

## 处理点击事件

```vue
<template>
  <HoverButton @click="handleClick">点击我</HoverButton>
</template>

<script>
export default {
  methods: {
    handleClick() {
      alert('按钮被点击了！')
    }
  }
}
</script>
```

## API

### 属性

| 属性名 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 按钮背景颜色 | string | #3498db |
| hoverColor | 悬停时的背景颜色 | string | #2980b9 |
| textColor | 按钮文字颜色 | string | #ffffff |
| disabled | 是否禁用 | boolean | false |

### 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击按钮时触发 | (event: MouseEvent) |

### 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 按钮的内容 |

## 主题定制

HoverButton 组件使用以下 CSS 变量进行样式定制，可以通过覆盖这些变量来自定义组件样式：

```css
:root {
  --tx-primary-color: #3498db;      /* 用于按钮默认背景色 */
  --tx-primary-color-dark: #2980b9; /* 用于按钮悬停背景色 */
  --tx-text-color-light: #ffffff;   /* 用于按钮文字颜色 */
  --tx-disabled-opacity: 0.6;       /* 用于禁用状态的透明度 */
  --tx-shadow-small: 0 2px 5px rgba(0, 0, 0, 0.1); /* 用于按钮阴影 */
  --tx-border-radius-small: 4px;    /* 用于按钮边框圆角 */
}
```

## 兼容性说明

- 现代浏览器：Chrome, Firefox, Safari, Edge 的最新版本
- 不支持 IE 11 及以下版本 