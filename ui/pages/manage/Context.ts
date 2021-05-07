/*

 * @Date: 2020-04-29 11:29:07
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-05-29 14:12:04
 */
import { createContext } from 'react';
import { IUiApi } from '@umijs/ui-types';
import { TemplateType } from '../../../interfaces/common';
import { CascaderOptionType } from 'antd/lib/cascader';
import { BaseClass } from '../../../interfaces/api';

const MainContext = createContext({} as {
  /** main body */
  api: IUiApi;
  templateType?: TemplateType;
  addTemplate: (templateType: TemplateType) => void;
  databases: CascaderOptionType[];
  baseClasses: BaseClass[];
  impConfigJson: string;
  setImpConfigJson: (configJson: string) => void;
  constantConfig: string;
});

export default MainContext;
