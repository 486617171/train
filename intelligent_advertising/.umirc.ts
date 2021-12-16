import { defineConfig } from 'umi';
import routes from './config/routes';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  // 国际化
  locale:{
    default:'zh-CN'
  },
  dynamicImport: {},
  history: {
    type: 'hash'
  },
  routes,
  fastRefresh: {},
  antd: {},
  layout: {
    name: '智能广告投放',
    locale: true,
    layout: 'side',
    logo: false
  },
});
