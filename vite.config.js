import { defineConfig } from 'vite'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  server: {
    maxHeaderSize: 65536 // 增加请求头大小限制以支持base64图片
  },

    resolve: {
        alias: {
            '@pages': path.resolve(__dirname, 'src/pages')
        }
    },
    optimizeDeps: {
        include: ['element-plus']
    },
    devServer: {
      // 暂时不需要
        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:3000',
        //         changeOrigin: true,
        //         rewrite: (path) => path.replace(/^\/api/, '')
        //     }
        // }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver({ importStyle: 'css' })],
      }),
      Components({
        resolvers: [ElementPlusResolver({ importStyle: 'css' })],
      }),
    ],

  })
