// 全局组件类型
import type { DefineComponent } from 'vue'

// 组件通用类型
export type ComponentSize = 'small' | 'default' | 'large'
export type ComponentType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type Placement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
export type Direction = 'horizontal' | 'vertical'
export type Position = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'

// 主题相关类型
export interface ThemeVars {
  colorPrimary: string
  colorSuccess: string
  colorWarning: string
  colorDanger: string
  colorInfo: string
  colorText: string
  colorTextSecondary: string
  colorBorder: string
  colorBackground: string
  colorBackgroundSecondary: string
  borderRadius: string
  shadowSmall: string
  shadowMedium: string
  shadowLarge: string
}

// 按钮组件类型
export interface ButtonProps {
  color?: string
  textColor?: string
  disabled?: boolean
}

// 悬停按钮特定属性
export interface HoverButtonProps extends ButtonProps {
  hoverColor?: string
}

// 脉冲按钮特定属性
export interface PulseButtonProps extends ButtonProps {
  pulseColor?: string
  speed?: number
}

// 涟漪按钮特定属性
export interface RippleButtonProps extends ButtonProps {
  rippleColor?: string
  duration?: number
}

// 加载组件类型
export interface SpinnerProps {
  size?: number
  color?: string
  thickness?: number
  speed?: number
}

export interface SkeletonProps {
  type?: 'text' | 'avatar' | 'card' | 'custom'
  lines?: number
  color?: string
  highlightColor?: string
  width?: string | number
  height?: string | number
  borderRadius?: string | number
  animated?: boolean
}

export interface ProgressBarProps {
  value?: number
  height?: number | string
  color?: string
  trackColor?: string
  borderRadius?: number | string
  indeterminate?: boolean
  striped?: boolean
  showLabel?: boolean
  labelFormatter?: (value: number) => string
}

// 悬停效果类型
export interface HoverCardProps {
  effect?: 'float' | 'glow' | 'lift' | 'tilt' | 'outline'
  color?: string
  glowIntensity?: number
  borderRadius?: string | number
  shadow?: string
  tiltAmount?: number
}

export interface ZoomHoverProps {
  scale?: number
  duration?: number
  direction?: string
  easing?: string
  overlay?: boolean
  overlayColor?: string
  overflow?: boolean
  borderRadius?: string | number
}

export interface FloatHoverProps {
  perspective?: number
  tiltAmount?: number
  scale?: number
  speed?: number
  shadow?: boolean
  shadowColor?: string
  glare?: boolean
  glareSize?: number
  glareColor?: string
  reset?: boolean
  borderRadius?: string | number
}

// 文字特效类型
export interface TypewriterProps {
  text: string
  startDelay?: number
  speed?: number
  cursor?: string
  showCursor?: boolean
  cursorBlink?: boolean
  loop?: boolean
  loopDelay?: number
  deleteSpeed?: number
  color?: string
  fontSize?: string | number
  fontWeight?: string | number
  fontFamily?: string
}

export interface GradientTextProps {
  colors?: string[]
  type?: 'linear' | 'radial' | 'conic'
  direction?: string
  animated?: boolean
  animationDuration?: number
  fontSize?: string | number
  fontWeight?: string | number
  fontFamily?: string
  backgroundSize?: string | number
}

export interface GlitchTextProps {
  intensity?: number
  primaryColor?: string
  secondaryColor?: string
  triggerOnHover?: boolean
  active?: boolean
  fontSize?: string | number
  fontWeight?: string | number
  fontFamily?: string
  blendMode?: string
}

// 过渡动画类型
export type DurationType = number | { enter: number; leave: number }

export interface FadeTransitionProps {
  name?: string
  mode?: 'out-in' | 'in-out' | ''
  duration?: DurationType
  appear?: boolean
}

export interface SlideTransitionProps {
  direction?: 'up' | 'right' | 'down' | 'left'
  distance?: number | string
  mode?: 'out-in' | 'in-out' | ''
  duration?: DurationType
  appear?: boolean
  fade?: boolean
  easing?: string
}

export interface ScaleTransitionProps {
  origin?: string
  from?: number
  to?: number
  mode?: 'out-in' | 'in-out' | ''
  duration?: DurationType
  appear?: boolean
  fade?: boolean
  easing?: string
}

// 弹窗组件类型
export interface ModalProps {
  modelValue?: boolean
  title?: string
  size?: 'small' | 'default' | 'large' | 'fullscreen'
  width?: string | number
  maxWidth?: string | number
  height?: string | number
  maxHeight?: string | number
  top?: string | number
  mask?: boolean
  maskColor?: string
  maskBlur?: string | number
  maskClosable?: boolean
  closable?: boolean
  contentClass?: string | object | any[]
  zIndex?: number
  lockScroll?: boolean
}

export interface DrawerProps {
  modelValue?: boolean
  title?: string
  placement?: 'left' | 'right' | 'top' | 'bottom'
  size?: string | number
  mask?: boolean
  maskColor?: string
  maskBlur?: string | number
  maskClosable?: boolean
  closable?: boolean
  contentClass?: string | object | any[]
  zIndex?: number
  lockScroll?: boolean
  showFooter?: boolean
  fullHeight?: boolean
}

export interface PopoverProps {
  trigger?: 'click' | 'hover' | 'manual'
  title?: string
  content?: string
  placement?: Placement
  width?: string | number
  modelValue?: boolean
  arrow?: boolean
  arrowSize?: number
  offset?: number
  appendToBody?: boolean
  hideOnClickOutside?: boolean
  hoverDelay?: number
  transition?: string
  showDelay?: number
  hideDelay?: number
  popoverClass?: string | object | any[]
  zIndex?: number
}

// 滚动特效组件类型
export interface ScrollRevealProps {
  threshold?: number
  delay?: number
  duration?: number
  distance?: string | number
  direction?: 'top' | 'right' | 'bottom' | 'left'
  origin?: 'top' | 'right' | 'bottom' | 'left'
  easing?: string
  opacity?: number
  rotate?: number
  scale?: number
  once?: boolean
  disabled?: boolean
}

export interface ScrollParallaxProps {
  speed?: number
  direction?: 'vertical' | 'horizontal'
  easing?: number
  disabled?: boolean
  reverse?: boolean
}

export interface ScrollProgressProps {
  color?: string
  backgroundColor?: string
  height?: string | number
  width?: string | number
  position?: 'top' | 'bottom' | 'left' | 'right'
  fixed?: boolean
  zIndex?: number
  showValue?: boolean
  valueFormat?: (value: number) => string
  target?: string
  offset?: string | number
}

// 扩展组件
export interface ComponentCustomProps {
  class?: any
  style?: any
} 