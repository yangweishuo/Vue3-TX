<script lang="ts">
import { defineComponent, ref } from 'vue'
import HoverButton from './effects/buttons/HoverButton.vue'
import PulseButton from './effects/buttons/PulseButton.vue'
import RippleButton from './effects/buttons/RippleButton.vue'
import Spinner from './effects/loading/Spinner.vue'
import Skeleton from './effects/loading/Skeleton.vue'
import ProgressBar from './effects/loading/ProgressBar.vue'
import HoverCard from './effects/hover/HoverCard.vue'
import ZoomHover from './effects/hover/ZoomHover.vue'
import FloatHover from './effects/hover/FloatHover.vue'
import MouseFollower from './effects/hover/MouseFollower.vue'
import Typewriter from './effects/text/Typewriter.vue'
import GradientText from './effects/text/GradientText.vue'
import GlitchText from './effects/text/GlitchText.vue'
import FadeTransition from './effects/transitions/FadeTransition.vue'
import SlideTransition from './effects/transitions/SlideTransition.vue'
import ScaleTransition from './effects/transitions/ScaleTransition.vue'
import Modal from './effects/modals/Modal.vue'
import Drawer from './effects/modals/Drawer.vue'
import Popover from './effects/modals/Popover.vue'
import ScrollReveal from './effects/scroll/ScrollReveal.vue'
import ScrollParallax from './effects/scroll/ScrollParallax.vue'
import ScrollProgress from './effects/scroll/ScrollProgress.vue'
import ScrollAnimation from './effects/scroll/ScrollAnimation.vue'
import ThemeToggle from './effects/theme/ThemeToggle.vue'
import FlipCard from './effects/cards/FlipCard.vue'
import TiltCard from './effects/cards/TiltCard.vue'
import FilterImage from './effects/image/FilterImage.vue'
import ParticleBackground from './effects/background/ParticleBackground.vue'
import GradientBackground from './effects/background/GradientBackground.vue'
import WaveBackground from './effects/background/WaveBackground.vue'

export default defineComponent({
  name: 'App',
  components: {
    HoverButton,
    PulseButton,
    RippleButton,
    Spinner,
    Skeleton,
    ProgressBar,
    HoverCard,
    ZoomHover,
    FloatHover,
    MouseFollower,
    Typewriter,
    GradientText,
    GlitchText,
    FadeTransition,
    SlideTransition,
    ScaleTransition,
    Modal,
    Drawer,
    Popover,
    ScrollReveal,
    ScrollParallax,
    ScrollProgress,
    ScrollAnimation,
    ThemeToggle,
    FlipCard,
    TiltCard,
    FilterImage,
    ParticleBackground,
    GradientBackground,
    WaveBackground
  },
  setup() {
    // 主题相关
    const isDarkMode = ref(false)
    const toggleTheme = (dark: boolean) => {
      isDarkMode.value = dark
    }
    
    // 选项卡
    const tabs = [
      { id: 'buttons', name: '按钮特效' },
      { id: 'loading', name: '加载动画' },
      { id: 'hover', name: '悬停效果' },
      { id: 'text', name: '文字特效' },
      { id: 'transitions', name: '过渡动画' },
      { id: 'modals', name: '弹窗组件' },
      { id: 'scroll', name: '滚动特效' },
      { id: 'cards', name: '卡片特效' },
      { id: 'image', name: '图像特效' },
      { id: 'background', name: '背景特效' },
      // { id: 'mouse', name: '鼠标特效' }
    ]
    const activeTab = ref('buttons')
    
    // 加载动画
    const progressValue = ref(75)
    
    // 弹窗组件
    const showModal = ref(false)
    const showDrawer = ref(false)
    
    // 过渡动画
    const showFade = ref(true)
    const showSlide = ref(true)
    const showScale = ref(true)
    const toggleFade = () => { showFade.value = !showFade.value }
    const toggleSlide = () => { showSlide.value = !showSlide.value }
    const toggleScale = () => { showScale.value = !showScale.value }
    
    // 卡片特效
    const isFlipped = ref(false)
    const toggleFlip = () => {
      isFlipped.value = !isFlipped.value
    }

    // 新增的背景特效控制
    const activeBackground = ref('particle')
    const gradientColors = ref(['#4158D0', '#C850C0', '#FFCC70'])
    
    // 新增的鼠标特效控制
    const showMouseFollower = ref(false)
    const mouseFollowerType = ref('dot')
    const mouseFollowerSize = ref(30)
    const mouseFollowerColor = ref('rgba(52, 152, 219, 0.6)')
    
    // 演示区域的鼠标特效参数
    const demoMouseFollowerType = ref('dot')
    const demoMouseFollowerSize = ref('30')

    return {
      // 主题相关
      isDarkMode,
      toggleTheme,
      
      // 选项卡
      tabs,
      activeTab,
      
      // 加载动画
      progressValue,
      
      // 弹窗组件
      showModal,
      showDrawer,
      
      // 过渡动画
      showFade,
      showSlide,
      showScale,
      toggleFade,
      toggleSlide,
      toggleScale,
      
      // 卡片特效
      isFlipped,
      toggleFlip,
      
      // 新增的背景特效控制
      activeBackground,
      gradientColors,
      
      // 新增的鼠标特效控制
      showMouseFollower,
      mouseFollowerType,
      mouseFollowerSize,
      mouseFollowerColor,
      
      // 演示区域的鼠标特效参数
      demoMouseFollowerType,
      demoMouseFollowerSize
    }
  }
})
</script>

<template>
  <div class="app" :class="{ 'dark-mode': isDarkMode }">
    <!-- 背景特效 -->
    <template v-if="activeBackground === 'particle'">
      <ParticleBackground :count="50" :speed="0.5" :linked="true" />
    </template>
    <template v-else-if="activeBackground === 'gradient'">
      <GradientBackground :colors="gradientColors" :animated="true" :opacity="0.8" />
    </template>
    <template v-else-if="activeBackground === 'wave'">
      <WaveBackground :height="200" />
    </template>
    
    <!-- 鼠标跟随效果 -->
    <MouseFollower
      v-if="showMouseFollower"
      :type="mouseFollowerType"
      :size="mouseFollowerSize"
      :color="mouseFollowerColor"
      :delay="100"
    />
    
    <header class="header">
      <h1>Vue3 TX 特效组件库展示</h1>
      <div class="theme-toggle">
        <ThemeToggle @change="toggleTheme" />
      </div>
    </header>

    <div class="controls">
      <div class="control-group">
        <h3>背景切换</h3>
        <div class="button-group">
          <button 
            @click="activeBackground = 'none'" 
            :class="{ active: activeBackground === 'none' }"
          >无背景</button>
          <button 
            @click="activeBackground = 'particle'" 
            :class="{ active: activeBackground === 'particle' }"
          >粒子背景</button>
          <button 
            @click="activeBackground = 'gradient'" 
            :class="{ active: activeBackground === 'gradient' }"
          >渐变背景</button>
          <button 
            @click="activeBackground = 'wave'" 
            :class="{ active: activeBackground === 'wave' }"
          >波浪背景</button>
        </div>
      </div>
      
      <div class="control-group">
        <h3>鼠标特效</h3>
        <div class="button-group">
          <button 
            @click="showMouseFollower = !showMouseFollower" 
            :class="{ active: showMouseFollower }"
          >{{ showMouseFollower ? '关闭鼠标特效' : '开启鼠标特效' }}</button>
          
          <select v-if="showMouseFollower" v-model="mouseFollowerType">
            <option value="dot">圆点</option>
            <option value="ring">圆环</option>
            <option value="spotlight">聚光</option>
            <option value="glow">光晕</option>
            <option value="trail">轨迹</option>
          </select>
        </div>
      </div>
    </div>

    <div class="tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id" 
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.name }}
      </button>
    </div>

    <main class="content">
      <!-- 按钮特效 -->
      <section v-show="activeTab === 'buttons'" class="section">
        <h2>按钮特效</h2>
        <div class="component-group">
          <div class="component-card">
            <h3>悬停效果按钮</h3>
            <HoverButton>悬停效果</HoverButton>
          </div>
          <div class="component-card">
            <h3>脉冲效果按钮</h3>
            <PulseButton>脉冲效果</PulseButton>
          </div>
          <div class="component-card">
            <h3>涟漪效果按钮</h3>
            <RippleButton>涟漪效果</RippleButton>
          </div>
        </div>
      </section>

      <!-- 加载动画 -->
      <section v-show="activeTab === 'loading'" class="section">
        <h2>加载动画</h2>
        <div class="component-group">
          <div class="component-card">
            <h3>加载旋转动画</h3>
            <Spinner />
          </div>
          <div class="component-card">
            <h3>骨架屏加载</h3>
            <Skeleton height="120px" width="250px" />
          </div>
          <div class="component-card">
            <h3>进度条</h3>
            <ProgressBar :value="progressValue" />
          </div>
        </div>
      </section>

      <!-- 悬停效果 -->
      <section v-show="activeTab === 'hover'" class="section">
        <h2>悬停效果</h2>
        <div class="component-group">
          <div class="component-card">
            <h3>悬停卡片</h3>
            <HoverCard>
              <div style="padding: 20px;">
                <h4>悬停卡片效果</h4>
                <p>将鼠标移到卡片上查看效果</p>
              </div>
            </HoverCard>
          </div>
          <div class="component-card">
            <h3>缩放悬停</h3>
            <ZoomHover>
              <div style="padding: 20px;">
                <h4>缩放悬停效果</h4>
                <p>将鼠标移到卡片上查看效果</p>
              </div>
            </ZoomHover>
          </div>
          <div class="component-card">
            <h3>悬浮悬停效果</h3>
            <FloatHover>
              <div style="padding: 20px;">
                <h4>悬浮悬停效果</h4>
                <p>将鼠标移到卡片上查看效果</p>
              </div>
            </FloatHover>
          </div>
        </div>
      </section>

      <!-- 文字特效 -->
      <section v-show="activeTab === 'text'" class="section">
        <h2>文字特效</h2>
        <div class="component-group">
          <div class="component-card">
            <h3>打字机效果</h3>
            <Typewriter text="这是一个打字机效果文本，可以模拟文字逐个出现的效果。" />
          </div>
          <div class="component-card">
            <h3>渐变文字</h3>
            <GradientText :animated="true">渐变文字效果</GradientText>
          </div>
          <div class="component-card">
            <h3>故障风格文字</h3>
            <GlitchText>故障风格文字</GlitchText>
          </div>
        </div>
      </section>

      <!-- 过渡动画 -->
      <section v-show="activeTab === 'transitions'" class="section">
        <h2>过渡动画</h2>
        <div class="component-group">
          <div class="component-card">
            <h3>淡入淡出过渡</h3>
            <button @click="toggleFade">切换显示</button>
            <FadeTransition>
              <div v-if="showFade" style="margin-top: 15px;">
                这个元素会淡入淡出
              </div>
            </FadeTransition>
          </div>
          <div class="component-card">
            <h3>滑动过渡</h3>
            <button @click="toggleSlide">切换显示</button>
            <SlideTransition>
              <div v-if="showSlide" style="margin-top: 15px;">
                这个元素会滑动过渡
              </div>
            </SlideTransition>
          </div>
          <div class="component-card">
            <h3>缩放过渡</h3>
            <button @click="toggleScale">切换显示</button>
            <ScaleTransition>
              <div v-if="showScale" style="margin-top: 15px;">
                这个元素会缩放过渡
              </div>
            </ScaleTransition>
          </div>
        </div>
      </section>

      <!-- 弹窗组件 -->
      <section v-show="activeTab === 'modals'" class="section">
        <h2>弹窗组件</h2>
        <div class="component-group">
          <div class="component-card">
            <h3>模态框</h3>
            <button @click="showModal = true">打开模态框</button>
            <Modal :visible="showModal" @close="showModal = false">
              <template #header>
                <h3>模态框标题</h3>
              </template>
              <template #default>
                <p>这是一个模态框的内容</p>
              </template>
              <template #footer>
                <button @click="showModal = false">关闭</button>
              </template>
            </Modal>
          </div>
          <div class="component-card">
            <h3>抽屉组件</h3>
            <button @click="showDrawer = true">打开抽屉</button>
            <Drawer :visible="showDrawer" @close="showDrawer = false">
              <h3>抽屉标题</h3>
              <p>这是抽屉的内容</p>
              <button @click="showDrawer = false">关闭</button>
            </Drawer>
          </div>
          <div class="component-card">
            <h3>气泡弹窗</h3>
            <Popover>
              <template #trigger>
                <button>点击查看气泡</button>
              </template>
              <template #content>
                <div style="padding: 10px;">
                  <p>这是气泡的内容</p>
                </div>
              </template>
            </Popover>
          </div>
        </div>
      </section>

      <!-- 滚动特效 -->
      <section v-show="activeTab === 'scroll'" class="section">
        <h2>滚动特效</h2>
        <div class="component-group">
          <div class="component-card">
            <h3>滚动显示效果</h3>
            <ScrollReveal>
              <div style="padding: 20px;">
                滚动时显示的内容
              </div>
            </ScrollReveal>
          </div>
          <div class="component-card">
            <h3>视差滚动效果</h3>
            <ScrollParallax :speed="0.2">
              <div style="padding: 20px;">
                滚动时产生视差的内容
              </div>
            </ScrollParallax>
          </div>
          <div class="component-card">
            <h3>高级滚动动画</h3>
            <ScrollAnimation animation="slide-up">
              <div style="padding: 20px;">
                滚动时产生动画的内容
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      <!-- 卡片特效 -->
      <section v-show="activeTab === 'cards'" class="section">
        <h2>卡片特效</h2>
        <div class="component-group">
          <div class="component-card">
            <h3>3D翻转卡片</h3>
            <FlipCard :flipped="isFlipped" height="200px" width="250px">
              <template #front>
                <div style="padding: 20px;">
                  <h4>卡片正面</h4>
                  <button @click="isFlipped = true">翻转</button>
                </div>
              </template>
              <template #back>
                <div style="padding: 20px;">
                  <h4>卡片背面</h4>
                  <button @click="isFlipped = false">翻回</button>
                </div>
              </template>
            </FlipCard>
          </div>
          <div class="component-card">
            <h3>3D倾斜卡片</h3>
            <TiltCard :maxTilt="15" :glare="true">
              <div style="padding: 30px; height: 150px;">
                <h4>3D倾斜卡片效果</h4>
                <p>移动鼠标查看效果</p>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      <!-- 图像特效 -->
      <section v-show="activeTab === 'image'" class="section">
        <h2>图像特效</h2>
        <div class="component-group">
          <div class="component-card">
            <h3>图像滤镜效果</h3>
            <FilterImage 
              src="https://picsum.photos/id/237/300/200" 
              alt="示例图片" 
              filter="grayscale" 
              hoverFilter="none"
              width="300px"
              height="200px"
              :rounded="true"
            />
          </div>
          <div class="component-card">
            <h3>图像滤镜效果 - 复古</h3>
            <FilterImage 
              src="https://picsum.photos/id/1002/300/200" 
              alt="示例图片" 
              filter="sepia" 
              hoverFilter="none"
              width="300px"
              height="200px"
              :rounded="true"
            />
          </div>
          <div class="component-card">
            <h3>图像滤镜效果 - 模糊</h3>
            <FilterImage 
              src="https://picsum.photos/id/1015/300/200" 
              alt="示例图片" 
              filter="blur" 
              :amount="50"
              hoverFilter="none"
              width="300px"
              height="200px"
              :rounded="true"
            />
          </div>
        </div>
      </section>

      <!-- 背景特效 -->
      <section v-show="activeTab === 'background'" class="section">
        <h2>背景特效</h2>
        <div class="component-group">
          <div class="component-card">
            <h3>粒子背景特效</h3>
            <div style="position: relative; height: 200px; overflow: hidden; border-radius: 8px;">
              <ParticleBackground 
                :count="50" 
                :speed="0.5" 
                color="#3498db" 
                :linked="true"
                :linkDistance="100"
                :zIndex="1"
              />
              <div style="position: relative; z-index: 2; padding: 20px; text-align: center; height: 100%;">
                <h4>粒子背景效果</h4>
                <p>可以作为网站或组件的背景</p>
              </div>
            </div>
          </div>
          
          <div class="component-card">
            <h3>渐变背景特效</h3>
            <div style="position: relative; height: 200px; overflow: hidden; border-radius: 8px;">
              <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                <GradientBackground 
                  :colors="['#4158D0', '#C850C0', '#FFCC70']"
                  :animated="true"
                  :zIndex="1"
                />
              </div>
              <div style="position: relative; z-index: 2; padding: 20px; text-align: center; height: 100%;">
                <h4>渐变背景效果</h4>
                <p>动态变化的彩色渐变背景</p>
              </div>
            </div>
          </div>
          
          <div class="component-card">
            <h3>波浪背景特效</h3>
            <div style="position: relative; height: 200px; overflow: hidden; border-radius: 8px;">
              <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                <WaveBackground :height="200" :zIndex="1" />
              </div>
              <div style="position: relative; z-index: 2; padding: 20px; text-align: center; height: 100%;">
                <h4>波浪背景效果</h4>
                <p>动态波浪动画背景</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 鼠标特效部分 -->
      
      <!-- 
      <section v-show="activeTab === 'mouse'" class="section">
        <h2>鼠标特效</h2>
        <div class="component-group">
          <div class="component-card">
            <h3>鼠标跟随效果</h3>
            <div style="padding: 20px; text-align: center; height: 200px;">
              <h4>鼠标跟随效果</h4>
              <p>在此区域内移动鼠标查看效果</p>
              <div style="margin-top: 20px;">
                <label>
                  类型:
                  <select v-model="demoMouseFollowerType" class="custom-select">
                    <option value="dot">圆点</option>
                    <option value="ring">圆环</option>
                    <option value="spotlight">聚光</option>
                    <option value="glow">光晕</option>
                    <option value="trail">轨迹</option>
                  </select>
                </label>
                <label style="margin-left: 10px;">
                  大小:
                  <input type="range" min="10" max="100" v-model="demoMouseFollowerSize">
                </label>
              </div>
              <MouseFollower 
                :type="demoMouseFollowerType" 
                :size="parseInt(demoMouseFollowerSize)" 
                :color="isDarkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(52, 152, 219, 0.6)'"
              />
            </div>
          </div>
        </div>
      </section>
      -->

    </main>

    <footer class="footer">
      <p>Vue3 TX 特效组件库 v0.2.0 | <a href="https://github.com/yourusername/vue3-tx-component" target="_blank">GitHub</a></p>
    </footer>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--tx-font-family, 'Helvetica Neue', Helvetica, Arial, sans-serif);
  color: var(--tx-text-color, #333333);
  background-color: var(--tx-bg-color, #f5f7fa);
  line-height: 1.6;
}

.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  min-height: 100vh;
}

.dark-mode {
  --tx-primary-color: #3ea8ff;
  --tx-secondary-color: #4cd97b;
  --tx-text-color: #e0e0e0;
  --tx-bg-color: #1a1a1a;
  --tx-card-bg: #2a2a2a;
  --tx-border-color: #3a3a3a;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
  padding-top: 1rem;
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header h1 {
  font-size: 2rem;
  color: var(--tx-primary-color, #3498db);
  position: relative;
  z-index: 10;
  flex: 1;
  text-align: center;
}

.theme-toggle {
  position: relative;
  z-index: 10;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 10;
  background: var(--tx-card-bg, #ffffff);
  border-radius: 8px;
  padding: 0.75rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.tabs button {
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  color: var(--tx-text-color, #333333);
  cursor: pointer;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tabs button:hover {
  background-color: rgba(var(--tx-primary-color-rgb, 52, 152, 219), 0.1);
}

.tabs button.active {
  color: white;
  background-color: var(--tx-primary-color, #3498db);
}

.section {
  margin-bottom: 3rem;
  position: relative;
  z-index: 5;
}

.section h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--tx-border-color, #eaecef);
  color: var(--tx-primary-color, #3498db);
}

.component-group {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
}

.component-card {
  background-color: var(--tx-card-bg, #ffffff);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--tx-border-color, #eaecef);
  min-height: 200px;
}

.component-card h3 {
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
  color: var(--tx-text-color, #333333);
}

button {
  padding: 0.5rem 1rem;
  background-color: var(--tx-primary-color, #3498db);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 0.5rem;
  transition: all 0.3s ease;
}

button:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.footer {
  margin-top: 3rem;
  text-align: center;
  padding: 1.5rem;
  color: var(--tx-text-color-secondary, #666);
  border-top: 1px solid var(--tx-border-color, #eaecef);
  position: relative;
  z-index: 10;
}

.footer a {
  color: var(--tx-primary-color, #3498db);
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .app {
    padding: 1rem;
  }
  
  .component-group {
    grid-template-columns: 1fr;
  }
  
  .tabs {
    flex-direction: column;
    padding: 0.5rem;
  }
  
  .tabs button {
    width: 100%;
    text-align: center;
    margin-bottom: 0.25rem;
  }
  
  .header {
    flex-direction: column;
    margin-bottom: 1.5rem;
  }
  
  .header h1 {
    margin-bottom: 1rem;
  }
}

/* 新增的控制面板样式 */
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
  background-color: var(--tx-card-bg, #ffffff);
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;
}

.control-group {
  flex: 1;
  min-width: 250px;
}

.control-group h3 {
  margin-bottom: 10px;
  font-size: 1rem;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.button-group button.active {
  background-color: var(--tx-primary-color, #3498db);
  color: white;
}

.custom-select {
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid var(--tx-border-color, #eaecef);
  background-color: var(--tx-card-bg, #ffffff);
  color: var(--tx-text-color, #333333);
  margin: 0 10px;
}

/* 确保深色模式下所有内容都可见 */
.dark-mode .custom-select {
  background-color: #333;
  color: #fff;
  border-color: #555;
}

.dark-mode .control-group,
.dark-mode .button-group button {
  color: var(--tx-text-color);
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
  }
}
</style>
