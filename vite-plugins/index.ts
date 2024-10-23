import vue from '@vitejs/plugin-vue';
import OptimizationPersist from 'vite-plugin-optimize-persist';

import ViteRestart from 'vite-plugin-restart';
import { codeInspectorPlugin } from 'code-inspector-plugin';
// 导入自动导入
import createAutoImport from './auto-import';

// 导入Vue组件
import createVueComponents from './auto-components';
import createViteImagesPlugins from './vite-plugin-vue-images';

// 导出Vite插件
export default function createVitePlugins() {
  // 初始化Vite插件数组

  const vitePlugins = [vue()];
  // 自动导入库插件
  vitePlugins.push(createAutoImport());
  // 添加扩展设置
  // vitePlugins.push(createSetupExtend());

  /* 自动导入组件插件 */
  vitePlugins.push(createVueComponents());

  /* 缓存插件 */
  vitePlugins.push(OptimizationPersist());

  /* 自动导入图像插件 */
  vitePlugins.push(createViteImagesPlugins());

  /* 自动重启插件 */
  vitePlugins.push(
    ViteRestart({
      restart: ['../vite.config.ts'],
    }),
  );

  /* 代码定位插件,快捷键:shift+alt+d */
  vitePlugins.push(
    codeInspectorPlugin({
      bundler: 'vite',
    }),
  );
  // 返回Vite插件
  return vitePlugins;
}
