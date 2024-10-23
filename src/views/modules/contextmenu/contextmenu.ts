import {
  EyeOutlined,
  FileExcelOutlined,
  FileTextOutlined,
  ReloadOutlined,
} from '@ant-design/icons-vue';

export const contextmenuItems: ContextmenuProps[] = [
  {
    title: '查看',
    icon: h(EyeOutlined),
    children: [],
    onClick() {
      console.log('查看');
    },
    type: 'menu',
  },
  {
    type: 'devider',
    title: '分割线测试',
  },
  {
    title: '刷新',
    icon: h(ReloadOutlined),
    children: [],
    onClick() {
      console.log('刷新');
    },
    type: 'menu',
  },
  {
    title: '创建快捷方式',
    icon: '',
    children: [],
    disabled: true,
    onClick() {
      console.log('创建快捷方式');
    },
    type: 'menu',
  },
  {
    title: '实用功能',
    icon: '',
    children: [],
    disabled: false,
    onClick() {
      console.log('实用功能');
    },
    type: 'menu',
  },
  {
    title: '一键整理',
    icon: '',
    children: [],
    disabled: false,
    onClick() {
      console.log('一键整理');
    },
    type: 'menu',
  },
  {
    title: '个性化',
    icon: '',
    children: [],
    disabled: false,
    onClick() {
      console.log('个性化');
    },
    type: 'menu',
  },
  {
    title: '创建',
    icon: '',
    children: [
      {
        title: '文本文件',
        icon: h(FileTextOutlined),
        children: [],
        disabled: false,
        onClick() {
          console.log('文本文件');
        },
        type: 'menu',
      },
      {
        title: 'PPT文件',
        icon: h(FileTextOutlined),
        children: [],
        disabled: false,
        onClick() {
          console.log('PPT文件');
        },
        type: 'menu',
      },
      {
        title: 'EXCEL文件',
        icon: h(FileExcelOutlined),
        children: [
          {
            title: '办公',
            children: [],
            disabled: false,
            onClick() {
              console.log('办公');
            },
            type: 'menu',
          },
          {
            title: 'UI',
            children: [],
            disabled: false,
            onClick() {
              console.log('UI');
            },
            type: 'menu',
          },
          {
            title: '编程',
            children: [],
            disabled: false,
            onClick() {
              console.log('编程');
            },
            type: 'menu',
          },
        ],
        disabled: false,
        onClick() {
          console.log('EXCEL文件');
        },
        type: 'menu',
      },
    ],
    disabled: false,
    onClick() {
      console.log('创建');
    },
    type: 'menu',
  },
];
