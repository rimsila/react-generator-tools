import { DashboardFilled } from '@ant-design/icons';
import { IUiApi } from '@umijs/ui-types';
import ManageConfigPanel from './pages/manage';
import AppConfigPanel from './pages/mobile';
import ScreenConfigPanel from './pages/screen';

export default (api: IUiApi) => {
  api.addPanel({
    title: 'Form and Table',
    path: '/manageConfig',
    icon: <DashboardFilled />,
    component: () => <ManageConfigPanel api={api} />,
  });
  api.addPanel({
    title: 'State and Util',
    path: '/appConfig',
    icon: <DashboardFilled />,
    component: () => <AppConfigPanel api={api} />,
  });
  api.addPanel({
    title: 'Big screen',
    path: '/screenConfig',
    icon: <DashboardFilled />,
    component: () => <ScreenConfigPanel api={api} />,
  });
};
