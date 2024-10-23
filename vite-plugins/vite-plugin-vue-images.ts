import ViteImages from 'vite-plugin-vue-images';

/* 自动导入图像，同级目录的文件名不能重复 */

export default function createViteImagesPlugins() {
  return ViteImages({
    dirs: ['src/assets'], // 图像目录的相对路径
    extensions: ['jpg', 'jpeg', 'png', 'svg', 'webp'], // 有效的图像扩展
    customResolvers: [], // 覆盖名称->图像路径解析的默认行为
    customSearchRegex: '([a-zA-Z0-9]+)', // 重写搜索要替换的变量的Regex。
  });
}
