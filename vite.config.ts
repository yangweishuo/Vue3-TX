import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import { fileURLToPath } from 'url'

// 解决ESM中缺少__dirname的问题
const __filename = fileURLToPath(import.meta.url)
const __dirname = resolve(__filename, '..')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/effects/index.ts'),
      name: 'Vue3TXComponent',
      fileName: (format) => `vue3-tx-component.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        },
        exports: 'named',
        // 为CSS提供单独的输出目录
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'style.[ext]';
          }
          return assetInfo.name || '';
        }
      }
    },
    sourcemap: true,
    minify: 'terser',
    target: 'es2015',
    cssCodeSplit: true,
    // 确保CSS会被提取出来
    emptyOutDir: true
  }
})
