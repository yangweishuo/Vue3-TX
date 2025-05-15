<template>
  <div 
    class="wave-background" 
    :style="{ 
      opacity: opacity,
      zIndex: zIndex
    }"
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      class="waves"
      :style="{
        height: `${height}px`
      }"
    >
      <path 
        :fill="color1" 
        :opacity="wave1Opacity"
        d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        :style="{ animationDuration: `${animationDuration + 2}s` }"
      ></path>
      <path 
        :fill="color2" 
        :opacity="wave2Opacity"
        d="M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,112C672,128,768,192,864,213.3C960,235,1056,213,1152,192C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        :style="{ animationDuration: `${animationDuration}s` }"
      ></path>
      <path 
        :fill="color3" 
        :opacity="wave3Opacity"
        d="M0,256L48,266.7C96,277,192,299,288,282.7C384,267,480,213,576,197.3C672,181,768,203,864,208C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        :style="{ animationDuration: `${animationDuration - 2}s` }"
      ></path>
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WaveBackground',
  props: {
    color1: {
      type: String,
      default: 'rgba(66, 133, 244, 0.6)'
    },
    color2: {
      type: String,
      default: 'rgba(52, 168, 83, 0.6)'
    },
    color3: {
      type: String,
      default: 'rgba(251, 188, 5, 0.6)'
    },
    wave1Opacity: {
      type: Number,
      default: 0.7
    },
    wave2Opacity: {
      type: Number,
      default: 0.5
    },
    wave3Opacity: {
      type: Number,
      default: 0.3
    },
    height: {
      type: Number,
      default: 200
    },
    opacity: {
      type: Number,
      default: 1
    },
    animationDuration: {
      type: Number,
      default: 12
    },
    zIndex: {
      type: Number,
      default: -1
    }
  }
})
</script>

<style scoped>
.wave-background {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  pointer-events: none;
}

.waves {
  position: relative;
  display: block;
  width: 100%;
  min-height: 100px;
}

.waves path {
  animation-name: waveAnimation;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-direction: alternate;
}

@keyframes waveAnimation {
  0% {
    transform: translateX(-25%) scaleY(1);
  }
  50% {
    transform: translateX(-15%) scaleY(0.9);
  }
  100% {
    transform: translateX(0%) scaleY(1.1);
  }
}
</style> 