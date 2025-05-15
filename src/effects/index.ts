import type { App } from 'vue'

// 按钮特效
import HoverButtonVue from './buttons/HoverButton.vue'
import PulseButtonVue from './buttons/PulseButton.vue'
import RippleButtonVue from './buttons/RippleButton.vue'

// 加载动画
import SpinnerVue from './loading/Spinner.vue'
import SkeletonVue from './loading/Skeleton.vue'
import ProgressBarVue from './loading/ProgressBar.vue'

// 悬停效果
import HoverCardVue from './hover/HoverCard.vue'
import ZoomHoverVue from './hover/ZoomHover.vue'
import FloatHoverVue from './hover/FloatHover.vue'
import MouseFollowerVue from './hover/MouseFollower.vue'

// 文字特效
import TypewriterVue from './text/Typewriter.vue'
import GradientTextVue from './text/GradientText.vue'
import GlitchTextVue from './text/GlitchText.vue'

// 过渡动画
import FadeTransitionVue from './transitions/FadeTransition.vue'
import SlideTransitionVue from './transitions/SlideTransition.vue'
import ScaleTransitionVue from './transitions/ScaleTransition.vue'

// 模态框
import ModalVue from './modals/Modal.vue'
import DrawerVue from './modals/Drawer.vue'
import PopoverVue from './modals/Popover.vue'

// 滚动特效
import ScrollRevealVue from './scroll/ScrollReveal.vue'
import ScrollParallaxVue from './scroll/ScrollParallax.vue'
import ScrollProgressVue from './scroll/ScrollProgress.vue'
import ScrollAnimationVue from './scroll/ScrollAnimation.vue'

// 主题
import ThemeToggleVue from './theme/ThemeToggle.vue'

// 卡片特效
import FlipCardVue from './cards/FlipCard.vue'
import TiltCardVue from './cards/TiltCard.vue'

// 图像特效
import FilterImageVue from './image/FilterImage.vue'

// 背景特效
import ParticleBackgroundVue from './background/ParticleBackground.vue'
import GradientBackgroundVue from './background/GradientBackground.vue'
import WaveBackgroundVue from './background/WaveBackground.vue'

// 引入主题样式
import '../styles/theme.css'

// 组件列表
const components = {
  HoverButton: HoverButtonVue,
  PulseButton: PulseButtonVue,
  RippleButton: RippleButtonVue,
  Spinner: SpinnerVue,
  Skeleton: SkeletonVue,
  ProgressBar: ProgressBarVue,
  HoverCard: HoverCardVue,
  ZoomHover: ZoomHoverVue,
  FloatHover: FloatHoverVue,
  MouseFollower: MouseFollowerVue,
  Typewriter: TypewriterVue,
  GradientText: GradientTextVue,
  GlitchText: GlitchTextVue,
  FadeTransition: FadeTransitionVue,
  SlideTransition: SlideTransitionVue,
  ScaleTransition: ScaleTransitionVue,
  Modal: ModalVue,
  Drawer: DrawerVue,
  Popover: PopoverVue,
  ScrollReveal: ScrollRevealVue,
  ScrollParallax: ScrollParallaxVue,
  ScrollProgress: ScrollProgressVue,
  ScrollAnimation: ScrollAnimationVue,
  ThemeToggle: ThemeToggleVue,
  FlipCard: FlipCardVue,
  TiltCard: TiltCardVue,
  FilterImage: FilterImageVue,
  ParticleBackground: ParticleBackgroundVue,
  GradientBackground: GradientBackgroundVue,
  WaveBackground: WaveBackgroundVue
}

// 插件安装函数
const install = (app: App): void => {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component)
  })
}

export default {
  install
}

// 单独导出各组件
export {
  HoverButtonVue,
  PulseButtonVue,
  RippleButtonVue,
  SpinnerVue,
  SkeletonVue,
  ProgressBarVue,
  HoverCardVue,
  ZoomHoverVue,
  FloatHoverVue,
  MouseFollowerVue,
  TypewriterVue,
  GradientTextVue,
  GlitchTextVue,
  FadeTransitionVue,
  SlideTransitionVue,
  ScaleTransitionVue,
  ModalVue,
  DrawerVue,
  PopoverVue,
  ScrollRevealVue,
  ScrollParallaxVue,
  ScrollProgressVue,
  ScrollAnimationVue,
  ThemeToggleVue,
  FlipCardVue,
  TiltCardVue,
  FilterImageVue,
  ParticleBackgroundVue,
  GradientBackgroundVue,
  WaveBackgroundVue
} 