import AutoImport from 'unplugin-auto-import/vite';

export default function createAutoImport() {
  return AutoImport({
    /* 自动导入库, */
    imports: [
      'vue',
      'vue-router',
      '@vueuse/core',
      {
        axios: [['default', 'axios']],
      },
    ],
    /* 生成的文件，需要在tsconfig.ts中导入,否则会报错 */
    dts: '../components.d',
    /* 配置文件夹的路径,路径下所有文件都会被自动导入 */
    dirs: ['src/utils/'],
    vueTemplate: true,
    /* ESLINT配置 */
    eslintrc: {
      /* 是否开启 */
      enabled: true,
      /* 文件路径 */
      // filepath: '/.eslintrc-auto-import.json',
    },
  });
}
