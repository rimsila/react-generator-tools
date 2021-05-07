/*

 * @Date: 2020-05-07 11:41:44

 * @LastEditTime: 2020-05-20 12:04:03
 */
export default [
  {
    path: '/user',
    component: '../layouts/LoginLayout',
    routes: [
      {
        path: '/user/login',
        component: './login',
        title: 'login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [

      {
        path: '/homepage',
        component: './index',
      },
      {
        path: '/',
        redirect: '/homepage',
      },
      {
        path: '*',
        component: './404',
      },
    ],
  },
];
