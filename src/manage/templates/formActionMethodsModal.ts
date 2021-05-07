/*
  * @File description: Generate some method components (modal type) connecting table and form
  * @Author: Liao Jun
  * @Date: 2020-10-10 16:26:10
  * @LastEditors: Liao Jun
  * @LastEditTime: 2020-10-27 14:09:49
  */

export interface Payload {
  initialFetch?: string[];
  generateDetail: boolean;
}

export default ({ initialFetch = [], generateDetail }: Payload) => {
    const apiStr = initialFetch.length === 3 ?
      `API.${initialFetch[0]}.${initialFetch[1]}` : 'API.recruitment.person';
    return `
      import React, { forwardRef } from 'react';
      import { Store } from 'antd/es/form/interface';
      import { useRequest } from 'ahooks';
      import { message } from 'antd';
      import { useImmer } from 'use-immer';
      import Edit from '../Edit';
      ${generateDetail ? `import Detail from '../Detail';` : ''}

      export interface FormActionMethodsInstance {
        onAdd?: () => void;
        onDelete?: (row: Store) => void;
        onEdit?: (row: Store) => void;
        onPreview?: (row: Store) => void;
        onDeleteBatch?: (ids: number[]) => void;
      }

      export default forwardRef<FormActionMethodsInstance, { reload?: () => void }>(({ reload }, ref) => {
        const formActionRef = ref as React.MutableRefObject<FormActionMethodsInstance>;
        const [editModalConfig, setEditModalConfig] = useImmer<{
          visible: boolean;
          formData: Store;
          loading: boolean;
        }>({
          visible: false,
          formData: {},
          loading: false,
        });
        ${generateDetail ? `const [detailModalConfig, setDetailModalConfig] = useImmer<{
          visible: boolean;
          formData: Store;
          loading: boolean;
        }>({
          visible: false,
          formData: {},
          loading: false,
        });` : ''}

        const { run: handleDelete } = useRequest(${apiStr}.remove.fetch, {
          manual: true,
          onSuccess: () => {
            message.success('delete成功');
            reload && reload();
          },
        });

        const { run: handleDeleteBatch } = useRequest(${apiStr}.deleteBatch, {
          manual: true,
          onSuccess: () => {
            message.success('Batch delete成功');
            reload && reload();
          },
        });

        /** Add */
        formActionRef.current.onAdd = () =>
          setEditModalConfig(config => {
            config.visible = true;
            config.formData = {};
          });

        /** delete */
        formActionRef.current.onDelete = (row: Store) => handleDelete(row.id);

        /** 编辑 */
        formActionRef.current.onEdit = (row: Store) =>
          setEditModalConfig(config => {
            config.visible = true;
            config.formData = row;
          });

        ${generateDetail ? `/** View */
        formActionRef.current.onPreview = (row: Store) =>
          setDetailModalConfig(config => {
            config.visible = true;
            config.formData = row;
          });` : ''}

        /** Batch delete */
        formActionRef.current.onDeleteBatch = (ids: number[]) => handleDeleteBatch(ids);

        return (
          <>
            <Edit
              visible={editModalConfig.visible}
              formData={editModalConfig.formData}
              loading={editModalConfig.loading}
              toggleVisible={() =>
                setEditModalConfig(config => {
                  config.visible = false;
                  config.loading = false;
                  config.formData = {};
                })
              }
              reload={reload}
            />
            ${generateDetail ? `<Detail
              visible={detailModalConfig.visible}
              formData={detailModalConfig.formData}
              loading={detailModalConfig.loading}
              toggleVisible={() =>
                setDetailModalConfig(config => {
                  config.visible = false;
                  config.loading = false;
                  config.formData = {};
                })
              }
            />` : ''}
          </>
        );
      });
    `;
}
