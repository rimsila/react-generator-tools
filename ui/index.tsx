import {IUiApi} from'@umijs/ui-types';
import {DashboardFilled} from'@ant-design/icons';
import ManageConfigPanel from'./pages/manage';
import ScreenConfigPanel from'./pages/screen';
import AppConfigPanel from'./pages/mobile';

export default (api: IUiApi) => {
   api.addPanel({
     title:'Form and Table',
     path:'/manageConfig',
     icon: <DashboardFilled />,
     component: () => <ManageConfigPanel api={api} />,
   });
   api.addPanel({
     title:'Big screen',
     path:'/screenConfig',
     icon: <DashboardFilled />,
     component: () => <ScreenConfigPanel api={api} />,
   });
   api.addPanel({
     title:'Mobile terminal',
     path:'/appConfig',
     icon: <DashboardFilled />,
     component: () => <AppConfigPanel api={api} />,
   });
};
