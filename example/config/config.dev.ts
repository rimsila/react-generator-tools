/*

 * @Date: 2020-05-07 11:07:13

 * @LastEditTime: 2020-05-07 11:22:12
 */
import { defineConfig } from 'umi';
import routeConfig from './routeConfig';

export default defineConfig({
  plugins: [require.resolve('../../lib')],
  routes: routeConfig,
});
