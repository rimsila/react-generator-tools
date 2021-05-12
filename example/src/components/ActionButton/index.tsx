import type { PopconfirmProps } from 'antd';
import { Popconfirm, Space, Tooltip } from 'antd';
import type { ReactNode } from 'react';
import React, { memo } from 'react';
import type { INextIconFontProps } from '../NextIconFont';
import { NextIconFont } from '../NextIconFont';

type func = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;

export type IActionButton = {
  addMore?: ReactNode[];
  onClickView?: func;
  onClickEdit?: func;
  delPopconfirmProps?: Partial<PopconfirmProps>;
  operation: {
    check?: boolean;
    isShowCheck?: boolean;
    record: any;
    onClickDefault?: (id: any) => void;
  };
} & Partial<INextIconFontProps>;

const ActionButton = memo((props: IActionButton) => {
  const { addMore = [], operation, onClickView, onClickEdit, delPopconfirmProps, ...rest } = props;
  const { onClickDefault, record } = operation || {};

  const ActionButtonMap = [
    operation?.isShowCheck && (
      <Tooltip key="check" placement="bottomRight" title="Set as default">
        <Popconfirm title="Set as default?" onConfirm={() => onClickDefault && onClickDefault(record?.id)}>
          <NextIconFont
            {...{
              style: { color: '#1890ff' },
              ...rest,
              type: record?.isDefault === true ? 'icon-radoibox_unchecked' : 'icon-radio-unchecked-b-o',
              iconSize: 'md',
            }}
          />
        </Popconfirm>
      </Tooltip>
    ),
    onClickView && (
      <NextIconFont
        {...{
          style: { color: '#1890ff' },
          ...rest,
          key: 'view',
          onClick: onClickView,
          type: 'icon-view-bue',
          iconSize: 'sm',
        }}
      />
    ),
    onClickEdit && (
      <NextIconFont
        {...{
          key: 'edit',
          style: { color: 'orange' },
          iconSize: 28,
          ...rest,
          onClick: onClickEdit,
          type: 'icon-EditSquare',
        }}
      />
    ),
    delPopconfirmProps && (
      <Popconfirm key="del" title="Delete?" {...delPopconfirmProps}>
        <NextIconFont
          {...{
            iconSize: 25,
            style: { color: 'red' },

            ...rest,
            type: 'icon-delete',
          }}
        />
      </Popconfirm>
    ),
    ...addMore,
  ];

  return <Space size="small">{ActionButtonMap}</Space>;
});
export default ActionButton;
