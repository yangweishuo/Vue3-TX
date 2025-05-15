<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
}

export default defineComponent({
  name: 'ParticleBackground',
  props: {
    color: {
      type: String,
      default: 'var(--tx-primary-color)'
    },
    count: {
      type: Number,
      default: 50
    },
    speed: {
      type: Number,
      default: 1
    },
    linked: {
      type: Boolean,
      default: true
    },
    linkDistance: {
      type: Number,
      default: 120
    },
    size: {
      type: Number,
      default: 3
    },
    responsive: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: -1
    }
  },
  setup(props) {
    const canvasRef = ref<HTMLCanvasElement | null>(null)
    let ctx: CanvasRenderingContext2D | null = null
    let animationFrameId: number | null = null
    let particles: Particle[] = []
    let width = window.innerWidth
    let height = window.innerHeight

    const createParticles = () => {
      particles = []
      for (let i = 0; i < props.count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * props.size + 1,
          speedX: (Math.random() - 0.5) * props.speed,
          speedY: (Math.random() - 0.5) * props.speed,
          opacity: Math.random() * 0.5 + 0.3
        })
      }
    }

    const updateParticles = () => {
      for (const p of particles) {
        p.x += p.speedX
        p.y += p.speedY

        // 边界反弹
        if (p.x > width || p.x < 0) {
          p.speedX = -p.speedX
        }
        if (p.y > height || p.y < 0) {
          p.speedY = -p.speedY
        }

        // 确保粒子始终在可见区域内
        p.x = Math.max(0, Math.min(width, p.x))
        p.y = Math.max(0, Math.min(height, p.y))
      }
    }

    const drawParticles = () => {
      if (!ctx || !canvasRef.value) return

      ctx.clearRect(0, 0, width, height)
      
      // 绘制粒子
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = props.color
        ctx.globalAlpha = p.opacity
        ctx.fill()
      }

      // 绘制连接线
      if (props.linked) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < props.linkDistance) {
              ctx.beginPath()
              ctx.strokeStyle = props.color
              ctx.globalAlpha = 0.1 * (1 - distance / props.linkDistance)
              ctx.lineWidth = 1
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.stroke()
            }
          }
        }
      }

      ctx.globalAlpha = 1
    }

    const animate = () => {
      updateParticles()
      drawParticles()
      animationFrameId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      if (!canvasRef.value || !props.responsive) return
      
      width = window.innerWidth
      height = window.innerHeight
      canvasRef.value.width = width
      canvasRef.value.height = height
      createParticles()
    }

    onMounted(() => {
      if (!canvasRef.value) return
      
      ctx = canvasRef.value.getContext('2d')
      width = window.innerWidth
      height = window.innerHeight
      canvasRef.value.width = width
      canvasRef.value.height = height
      
      createParticles()
      animate()

      if (props.responsive) {
        window.addEventListener('resize', handleResize)
      }
    })

    onBeforeUnmount(() => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
      
      if (props.responsive) {
        window.removeEventListener('resize', handleResize)
      }
    })

    return {
      canvasRef
    }
  }
})
</script>

<template>
  <canvas 
    ref="canvasRef" 
    class="particle-background"
    :style="{ zIndex: zIndex }"
  ></canvas>
</template>

<style scoped>
.particle-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style> 