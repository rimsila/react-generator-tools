import { iconfontUrlDemo } from '@/utils';
import { createFromIconfontCN } from '@ant-design/icons';
import type { IconFontProps } from '@ant-design/icons/lib/components/IconFont';
import React from 'react';

type IconsSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type INextIconFontProps = {
  iconSize?: number | IconsSize;
  iconfontUrl?: string;
} & IconFontProps;

export const NextIconFont = (props: INextIconFontProps) => {
  const { iconSize = 'sm', iconfontUrl, ...rest } = props;

  const getIconSize = () => {
    if (typeof iconSize !== 'number') {
      switch (iconSize) {
        case 'xs':
          return 16;
        case 'sm':
          return 24;
        case 'md':
          return 28;
        case 'lg':
          return 32;
        case 'xl':
          return 36;
        default:
          return 28;
      }
    }
    return iconSize;
  };
  // https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.db775f1f3&manage_type=myprojects&projectId=2221049&keyword=&project_type=&page=
  const AntIcon = createFromIconfontCN({
    scriptUrl: iconfontUrl || iconfontUrlDemo,
  });

  return (
    <AntIcon
      {...{
        ...rest,
        style: {
          fontSize: getIconSize(),
          width: '1em',
          height: '1em',
          verticalAlign: 'middle',
          fill: 'currentColor',
          overflow: 'hidden',
          cursor: rest.onClick ? 'pointer' : 'inherit',
          ...rest.style,
        },
      }}
    />
  );
};
