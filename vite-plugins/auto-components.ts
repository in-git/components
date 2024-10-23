import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

export default function createAutoImport() {
  return Components({
    //自动加载的组件目录，默认值为 ['src/components']
    dirs: ['src/components'],
    //组件名称包含目录，防止同名组件冲突
    directoryAsNamespace: false,
    //指定类型声明文件，为true时在项目根目录创建
    dts: true,
    /* 自动导入指令 */
    directives: true,
    extensions: ['vue', 'tsx'],
    /* 在解析之前转换路径 */
    // importPathTransform: v => v,
    /* 允许搜索子目录 */
    deep: true,
    resolvers: [
      AntDesignVueResolver({
        importStyle: false,
        resolveIcons: true,
      }),
    ],
  });
}
