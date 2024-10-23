import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import createVitePlugins from './vite-plugins/index';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import PkgConfig from 'vite-plugin-package-config';

/* 配置信息 */
export default defineConfig(() => {
  return {
    base: '/',
    plugins: [createVitePlugins(), PkgConfig()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // or 'modern'
          silenceDeprecations: ['legacy-js-api'],
        },
      },
      postcss: {
        plugins: [tailwindcss, autoprefixer()],
      },
    },
    optimizeDeps: {
      include: ['@ant-design/icons-vue', 'ant-design-vue', 'vue-use', 'vue', 'vue-router'],
    },
    server: {
      /* 是否自动打开，在linux上运行请关闭，否则会报错 */
      open: true,
      port: 4567,
      hmr: true,
      headers: {
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin',
      },
    },
    /* 打包删除console.log */
    esbuild: {
      pure: ['console.log'],
    },
    preview: {
      port: 5000, // 指定开发服务器端口
      strictPort: true, // 若端口已被占用则会直接退出
      open: true, // 启动时自动在浏览器中打开应用程序
      cors: true, // 配置 CORS
    },
    build: {
      target: ['modules'], // 设置最终构建的浏览器兼容目标
      // polyfillModulePreload: true, // 是否自动注入 module preload 的 polyfill
      outDir: 'dist', // 指定输出路径
      assetsDir: 'assets', // 指定生成静态文件目录
      cssCodeSplit: true, // 启用 CSS 代码拆分
      cssTarget: '', // 允许用户为 CSS 的压缩设置一个不同的浏览器 target 与 build.target 一致
      sourcemap: false, // 构建后是否生成 source map 文件
      rollupOptions: {}, // 自定义底层的 Rollup 打包配置
      // lib: false, // 构建为库
      manifest: false, // 当设置为 true，构建后将会生成 manifest.json 文件
      ssrManifest: false, // 构建不生成 SSR 的 manifest 文件
      ssr: undefined, // 生成面向 SSR 的构建
      // minify: 'esbuild', // 指定使用哪种混淆器
      write: true, // 启用将构建后的文件写入磁盘
      emptyOutDir: true, // 构建时清空该目录
      brotliSize: true, // 启用 brotli 压缩大小报告
      chunkSizeWarningLimit: 500, // chunk 大小警告的限制
      watch: null, // 设置为 {} 则会启用 rollup 的监听器
    },
  };
});
